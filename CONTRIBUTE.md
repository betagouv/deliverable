# Contribute

## Getting Started

1. Run `yarn && yarn setup`.
2. Follow the CLI instructions.
3. Run `yarn start` to run the CLI tool in development mode while .

You can also try to run `yarn dev` to run the CLI tool while watching for code changes, but that doesn't work very well.
And using `nodemon` would make it even worst than using `chokidar`.

## Run unit tests

Run `yarn test` or `yarn test:watch`.

## Generate a binary executable

Run `yarn dist:linux`, `yarn dist:macos` or `yarn dist:windows`.

_Be aware you can't generate a binary executable for a platform other than the one you're running on, unless you're
using virtual machines._
