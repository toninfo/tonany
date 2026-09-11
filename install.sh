#!/usr/bin/env bash
# install.sh — 从 GitHub Releases 安装 TonAny 预编译二进制到 PATH。
#
#   curl -fsSL https://raw.githubusercontent.com/toninfo/tonany/main/install.sh | bash
#
# 环境变量：
#   TONANY_VERSION      例如 v0.85.2（默认：latest）
#   TONANY_INSTALL_DIR  安装根目录（默认：~/.local/share/tonany）
#   TONANY_BIN_DIR      PATH 目录（默认：~/.local/bin）
#   TONANY_REPO         owner/repo（默认：toninfo/tonany）
#
# 依赖：curl、tar（Windows Git Bash 装 zip 请改用 install.ps1）

set -euo pipefail

REPO="${TONANY_REPO:-toninfo/tonany}"
INSTALL_DIR="${TONANY_INSTALL_DIR:-${HOME}/.local/share/tonany}"
BIN_DIR="${TONANY_BIN_DIR:-${HOME}/.local/bin}"

info() { printf '==> %s\n' "$*"; }
warn() { printf 'warn: %s\n' "$*" >&2; }
die()  { printf 'error: %s\n' "$*" >&2; exit 1; }

need() {
  command -v "$1" >/dev/null 2>&1 || die "缺少命令: $1"
}

on_path() {
  case ":${PATH}:" in
    *":$1:"*) return 0 ;;
    *) return 1 ;;
  esac
}

detect_os() {
  case "$(uname -s 2>/dev/null || echo unknown)" in
    Linux*)  echo linux ;;
    Darwin*) echo darwin ;;
    MINGW*|MSYS*|CYGWIN*) die "Windows 请用: irm https://raw.githubusercontent.com/${REPO}/main/install.ps1 | iex" ;;
    *) die "不支持的 OS: $(uname -s)" ;;
  esac
}

detect_arch() {
  # Release 资产用 x64 / arm64，不是 amd64
  case "$(uname -m 2>/dev/null || echo unknown)" in
    x86_64|amd64) echo x64 ;;
    aarch64|arm64) echo arm64 ;;
    *) die "不支持的架构: $(uname -m)" ;;
  esac
}

resolve_tag() {
  if [ -n "${TONANY_VERSION:-}" ]; then
    case "$TONANY_VERSION" in
      v*) echo "$TONANY_VERSION" ;;
      *)  echo "v${TONANY_VERSION}" ;;
    esac
    return
  fi
  need curl

  effective="$(curl -fsSL -o /dev/null -w '%{url_effective}' \
    "https://github.com/${REPO}/releases/latest" 2>/dev/null || true)"
  tag="${effective##*/}"
  case "$tag" in
    v[0-9]*)
      echo "$tag"
      return
      ;;
  esac

  body="$(curl -fsSL "https://api.github.com/repos/${REPO}/releases/latest" 2>/dev/null || true)"
  tag="$(printf '%s' "$body" | sed -n 's/.*"tag_name":[[:space:]]*"\([^"]*\)".*/\1/p' | head -n1)"
  case "$tag" in
    v[0-9]*)
      echo "$tag"
      return
      ;;
  esac

  die "无法解析 ${REPO} 的 latest release（可设 TONANY_VERSION=v0.85.2 重试）"
}

main() {
  need curl
  need tar

  OS="$(detect_os)"
  ARCH="$(detect_arch)"
  TAG="$(resolve_tag)"
  PLATFORM="${OS}-${ARCH}"
  ARCHIVE="pi-${PLATFORM}.tar.gz"
  URL="https://github.com/${REPO}/releases/download/${TAG}/${ARCHIVE}"

  info "下载 ${URL}"
  TMP="$(mktemp -d "${TMPDIR:-/tmp}/tonany-install.XXXXXX")"
  cleanup() { rm -rf "$TMP"; }
  trap cleanup EXIT

  curl -fsSL -o "${TMP}/${ARCHIVE}" "$URL"

  info "解压到 ${INSTALL_DIR}"
  rm -rf "$INSTALL_DIR"
  mkdir -p "$INSTALL_DIR"
  tar -xzf "${TMP}/${ARCHIVE}" -C "$TMP"
  # 归档根目录是 pi/，内含可执行文件 pi（CLI 名仍是 tonany）
  if [ -d "${TMP}/pi" ]; then
    cp -a "${TMP}/pi/." "$INSTALL_DIR/"
  else
    die "归档布局异常：缺少 pi/ 目录"
  fi

  if [ ! -x "${INSTALL_DIR}/pi" ]; then
    die "未找到可执行文件: ${INSTALL_DIR}/pi"
  fi

  mkdir -p "$BIN_DIR"
  ln -sfn "${INSTALL_DIR}/pi" "${BIN_DIR}/tonany"
  # 兼容旧习惯；可选手动删
  ln -sfn "${INSTALL_DIR}/pi" "${BIN_DIR}/pi"

  info "已安装 TonAny ${TAG}"
  info "  程序目录: ${INSTALL_DIR}"
  info "  命令:     ${BIN_DIR}/tonany"

  if ! on_path "$BIN_DIR"; then
    warn "${BIN_DIR} 不在 PATH 中。把下面一行加进 shell 配置后重开终端："
    warn "  export PATH=\"${BIN_DIR}:\$PATH\""
  fi

  if command -v tonany >/dev/null 2>&1; then
    info "版本: $(tonany --version 2>/dev/null || true)"
  else
    info "验证: ${BIN_DIR}/tonany --version"
    "${BIN_DIR}/tonany" --version || true
  fi

  info "启动: tonany"
}

main "$@"
