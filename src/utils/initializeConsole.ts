import packageJson from '../../package.json' assert { type: 'json' }

const INTRO = `

  █▄─▄▄▀█▄─▄▄─█▄─▄███▄─▄█▄─█─▄█▄─▄▄─█▄─▄▄▀██▀▄─██▄─▄─▀█▄─▄███▄─▄▄─█
  ██─██─██─▄█▀██─██▀██─███▄▀▄███─▄█▀██─▄─▄██─▀─███─▄─▀██─██▀██─▄█▀█
  ▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▄▄▀▄▄▄▀▀▀▄▀▀▀▄▄▄▄▄▀▄▄▀▄▄▀▄▄▀▄▄▀▄▄▄▄▀▀▄▄▄▄▄▀▄▄▄▄▄▀

  v%s

`

export function initializeConsole() {
  console.clear()

  console.log(INTRO, packageJson.version)
}
