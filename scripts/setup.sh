#!/bin/bash

# Exit when any command fails
set -e

echo ">>> Creating .env file..."
cp ./.env.example ./.env

echo ">>> Done."

echo ""
echo "1. Go to https://github.com/settings/tokens/new."
echo "2. Generate a new token with no scope selected."
echo "3. Copy the token and paste it in the .env file."
echo ""
