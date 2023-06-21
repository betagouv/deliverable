#!/bin/bash

# Exit when any command fails
set -e

echo ""
echo ">>> Installing Git hooks..."
husky install

if [ ! -f ./.env ]; then
  echo ""
  echo ">>> Creating .env file..."
  cp ./.env.example ./.env
fi

echo ""
echo ">>> Done."

echo ""
echo "1. Go to https://github.com/settings/tokens/new."
echo "2. Generate a new token with no scope selected."
echo "3. Copy the token and paste it in the .env file."
echo ""
