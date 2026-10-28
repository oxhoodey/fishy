#!/usr/bin/env bash
# FISHY · one-command update
# Usage (Git Bash / UCRT64):  bash push.sh "pesan commit"
# What it does: take the newest fishy*.zip in Downloads, unpack it over the fishy repo
# (your .git history stays), show what changed, commit and push to GitHub -> Railway redeploys.
set -e
DL="/c/Users/Elbama_PC/Downloads"
REPO="$DL/fishy"
REMOTE="https://github.com/oxhoodey/fishy.git"
MSG="${1:-Update FISHY $(date '+%Y-%m-%d %H:%M')}"

cd "$DL"
ZIP="$(ls -t fishy*.zip 2>/dev/null | head -1)"
if [ -z "$ZIP" ]; then echo "X  Tidak ada fishy*.zip di $DL"; exit 1; fi
echo ">> Zip  : $ZIP  (diunduh $(date -r "$ZIP" '+%d/%m %H:%M'))"

TMP="$(mktemp -d)"
if command -v unzip >/dev/null 2>&1; then
  unzip -q -o "$ZIP" -d "$TMP"
else
  powershell.exe -NoProfile -Command "Expand-Archive -Path '$(cygpath -w "$DL/$ZIP")' -DestinationPath '$(cygpath -w "$TMP")' -Force"
fi
if [ ! -d "$TMP/fishy" ]; then echo "X  Isi zip tidak berisi folder fishy/"; rm -rf "$TMP"; exit 1; fi

mkdir -p "$REPO"
cp -rf "$TMP/fishy/." "$REPO/"
rm -rf "$TMP"
cd "$REPO"

if [ ! -d .git ]; then
  echo ">> Menyambungkan folder ke $REMOTE"
  git init -q && git branch -M main
  git remote add origin "$REMOTE"
  git fetch -q origin main && git reset -q --soft origin/main || true
fi

git add -A
if git diff --cached --quiet; then
  echo "!  Tidak ada perubahan. Kemungkinan zip ini versi lama atau sudah pernah di-push."
  echo "   Commit terakhir: $(git log --oneline -1)"
  exit 0
fi

echo ">> File yang berubah:"
git status --short | head -30
git commit -q -m "$MSG"
git push -u origin main
echo "OK Selesai. Railway akan deploy: $(git log --oneline -1)"
