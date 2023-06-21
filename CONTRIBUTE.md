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

## Create a new release

Creating new releases is entirely automated via Github Actions when a `feat:` or a `fix:` is merged into `main` branch.

That's why commit messages are linted and must follow [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/), specifically [the Angular convention](https://github.com/angular/angular/blob/68a6a07/CONTRIBUTING.md#commit) which is,
by far, the most popular one.

Release notes and version bumping are also auto-pull-requested and merged into `main` branch via Github Actions.
