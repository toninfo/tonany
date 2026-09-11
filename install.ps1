# install.ps1 — 从 GitHub Releases 安装 TonAny 预编译二进制到用户 PATH（Windows）。
#
#   irm https://raw.githubusercontent.com/toninfo/tonany/main/install.ps1 | iex
#
# 参数 / 环境变量：
#   -Version     例如 v0.85.2（默认：latest）
#   -InstallDir  默认：$env:LOCALAPPDATA\tonany
#   -BinDir      默认：$env:LOCALAPPDATA\tonany\bin（会加入用户 PATH）
#   -Repo        默认：toninfo/tonany

[CmdletBinding()]
param(
    [string]$Version = $env:TONANY_VERSION,
    [string]$InstallDir = $(if ($env:TONANY_INSTALL_DIR) { $env:TONANY_INSTALL_DIR } else { Join-Path $env:LOCALAPPDATA "tonany" }),
    [string]$BinDir = $(if ($env:TONANY_BIN_DIR) { $env:TONANY_BIN_DIR } else { Join-Path $env:LOCALAPPDATA "tonany\bin" }),
    [string]$Repo = $(if ($env:TONANY_REPO) { $env:TONANY_REPO } else { "toninfo/tonany" })
)

$ErrorActionPreference = "Stop"

function Get-Arch {
    # Release 资产：windows-x64 / windows-arm64
    switch ($env:PROCESSOR_ARCHITECTURE) {
        "AMD64" { "x64"; break }
        "ARM64" { "arm64"; break }
        default { throw "不支持的架构: $($env:PROCESSOR_ARCHITECTURE)" }
    }
}

function Resolve-Tag([string]$ver) {
    if ($ver) {
        if ($ver -notmatch '^v') { return "v$ver" }
        return $ver
    }
    # Prefer /releases/latest redirect — api.github.com 常被限流
    try {
        $resp = Invoke-WebRequest -Uri "https://github.com/$Repo/releases/latest" `
            -MaximumRedirection 0 -ErrorAction SilentlyContinue -UseBasicParsing
    } catch {
        $resp = $_.Exception.Response
    }
    if ($resp -and $resp.Headers["Location"]) {
        $loc = [string]$resp.Headers["Location"]
        $tag = ($loc -split "/")[-1]
        if ($tag -match '^v\d') { return $tag }
    }
    try {
        $rel = Invoke-RestMethod -Uri "https://api.github.com/repos/$Repo/releases/latest"
        if ($rel.tag_name) { return $rel.tag_name }
    } catch {
        # fall through
    }
    throw "无法解析 $Repo 的 latest release（可设 -Version v0.85.2 重试）"
}

function Ensure-UserPath([string]$dir) {
    $userPath = [Environment]::GetEnvironmentVariable("Path", "User")
    if (-not $userPath) { $userPath = "" }
    $parts = $userPath -split ';' | Where-Object { $_ -and $_.Trim() -ne "" }
    if ($parts -contains $dir) {
        return $false
    }
    $newPath = if ($userPath.TrimEnd(';')) { "$userPath;$dir" } else { $dir }
    [Environment]::SetEnvironmentVariable("Path", $newPath, "User")
    # 当前会话立刻可用
    if (-not (($env:Path -split ';') -contains $dir)) {
        $env:Path = "$dir;$env:Path"
    }
    return $true
}

$arch = Get-Arch
$tag = Resolve-Tag $Version
$platform = "windows-$arch"
$archive = "pi-$platform.zip"
$url = "https://github.com/$Repo/releases/download/$tag/$archive"

Write-Host "==> 下载 $url"
$tmp = Join-Path ([System.IO.Path]::GetTempPath()) ("tonany-install-" + [guid]::NewGuid().ToString("N"))
New-Item -ItemType Directory -Path $tmp | Out-Null
try {
    $zipPath = Join-Path $tmp $archive
    Invoke-WebRequest -Uri $url -OutFile $zipPath -UseBasicParsing

    Write-Host "==> 解压到 $InstallDir"
    if (Test-Path $InstallDir) {
        Remove-Item -Recurse -Force $InstallDir
    }
    New-Item -ItemType Directory -Path $InstallDir | Out-Null
    Expand-Archive -Path $zipPath -DestinationPath $InstallDir -Force

    # zip 根目录直接是文件（pi.exe），不是外层 pi/
    $exe = Join-Path $InstallDir "pi.exe"
    if (-not (Test-Path $exe)) {
        # 容错：若带了一层目录
        $nested = Get-ChildItem -Path $InstallDir -Filter "pi.exe" -Recurse -ErrorAction SilentlyContinue | Select-Object -First 1
        if ($nested) {
            $exe = $nested.FullName
            $InstallDir = Split-Path -Parent $exe
        } else {
            throw "未找到 pi.exe（归档布局异常）"
        }
    }

    New-Item -ItemType Directory -Path $BinDir -Force | Out-Null

    # 可执行文件依赖同目录旁路资源（theme/assets/native/wasm），因此 PATH 上放 shim，
    # 实际跑 InstallDir\pi.exe，避免孤立拷贝后找不到资源。
    $abs = $exe.Replace('"', '""')
    Set-Content -Path (Join-Path $BinDir "tonany.cmd") -Value "@ECHO off`r`n`"$abs`" %*`r`n" -Encoding ASCII
    Set-Content -Path (Join-Path $BinDir "pi.cmd") -Value "@ECHO off`r`n`"$abs`" %*`r`n" -Encoding ASCII

    $pathAdded = Ensure-UserPath $BinDir

    Write-Host "==> 已安装 TonAny $tag"
    Write-Host "  程序目录: $InstallDir"
    Write-Host "  命令:     $BinDir\tonany.cmd"
    if ($pathAdded) {
        Write-Host "  已把 $BinDir 写入用户 PATH（新开终端后全局可用）"
    }

    & (Join-Path $InstallDir "pi.exe") --version
    Write-Host "==> 启动: tonany"
}
finally {
    Remove-Item -Recurse -Force $tmp -ErrorAction SilentlyContinue
}
