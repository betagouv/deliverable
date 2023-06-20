#!/bin/bash

# Exit when any command fails
set -e

if [ $# -eq 0 ]; then
  echo "You must pass a version number (\`sh ./scripts/release.sh X.Y.Z\`)." >&2
  exit 1
fi

NEXT_VERSION="$1"

echo ">>> Versionning binary files to v${NEXT_VERSION}..."
mv ./dist/deliverable-linux-x64 "./dist/deliverable-linux-x64-v${NEXT_VERSION}"
mv ./dist/deliverable-macos-x64 "./dist/deliverable-macos-x64-v${NEXT_VERSION}"
mv ./dist/deliverable-windows-x64.exe "./dist/deliverable-windows-x64-v${NEXT_VERSION}.exe"

echo ">>> Bumping npm version to v${NEXT_VERSION}..."
npm version --no-git-tag-version "${NEXT_VERSION}" && yarn
yarn
