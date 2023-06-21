<p align="center">
  <h1 align="center">Deliverable</h1>
</p>

<p align="center">
  <a aria-label="Go to the latest Github release" href="https://github.com/betagouv/deliverable/releases">
    <img alt="Latest GitHub release version including pre-releases" src="https://img.shields.io/github/v/release/betagouv/deliverable?include_prereleases&sort=semver&style=for-the-badge&labelColor=000">
  </a>
  <a aria-label="Open the AGPL-3.0 license" href="https://github.com/betagouv/deliverable/blob/main/LICENSE">
    <img alt="AGPL-3.0 license" src="https://img.shields.io/github/license/betagouv/deliverable?style=for-the-badge&labelColor=000">
  </a>
  <a aria-label="Go to the main branch workflow history" href="https://github.com/betagouv/deliverable/actions?query=branch%3Amain+workflow%3AUnit">
    <img alt="Latest workflow status for main branch" src="https://img.shields.io/github/actions/workflow/status/betagouv/deliverable/main.yml?branch=main&label=Build&style=for-the-badge&labelColor=000">
  </a>
</p>

---

What's the most annoying obligation in a developer life other than accounting?

Writing your project deliverables!

You can now de-li-ver (ha-ha-ha) yourself by automatizing this task with **Deliverable**, a CLI tool that does (most of)
the job for you!

**Deliverable** parses either your fancy Github release descriptions, or your pull request subjects, or your
well-written commit messages (which you should ALWAYS have!) from your main branch to generate a well-formatted Markdown
document as well as a DOCX one.

And if you don't have any of those, maybe you should start improving your continuous development practices 😉.

---

- [Install](#install)
- [Usage](#usage)
  - [Advice](#advice)
- [Demo](#demo)
- [Features](#features)
- [Contribute](#contribute)

---

## Install

Since **Deliverable** generates a Markdown document, installing Pandoc is required if you want to subsequently convert
it to a DOCX document so you can easily copy/paste it into LibreOffice, OpenOffice, Google Drive, Word, etc.

If **Deliverable** detects the `pandoc` command, it will automatically use it to convert the generated Markdown document
into a DOCX one.

1. [Install Pandoc](https://pandoc.org/installing.html).
2. [Download your OS standalone binary from the latest release](https://github.com/betagouv/deliverable/releases).
3. Under Linux and macOS, you may need to make the binary executable via `chmod +x deliverable-...`.

Or if you prefer to clone this repo, you can just run it via `yarn && yarn setup && yarn start`.

## Usage

Just run the binary in a CLI (i.e.: `./deliverable-linux-x64-1.0.4`) and you will be prompted to setup your options.

### Advice

> It's generally better to use either **Releases History** or **Merged Pull Requests History**,<br /> rather than
> **Commit Messages History**, since the latter is more verbose and less readable.

## Demo

![Demo](./docs/demo.gif)

## Features

_Unchecked features are not yet implemented._

**Deliverable** can:

- [x] Generate a well-formatted Markdown and DOCX document from your:
  - [x] Releases History
  - [ ] Merged Pull Requests History
  - [x] Commits Messages History
- [x] Retrieve your history between specific dates
- [ ] Handle multiple repositories
- [x] Automatically translate your deliverable from English to another language
- [x] Be used via standalone binaries available for Linux, macOS and Windows

## Contribute

Go to the [CONTRIBUTE.md](./CONTRIBUTE.md) file to learn how to contribute to this project (it's easy!).
