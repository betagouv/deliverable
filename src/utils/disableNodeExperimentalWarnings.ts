// eslint-disable-next-line lines-around-directive, strict
'use strict'

const { emitWarning } = process

process.emitWarning = (warning, ...args) => {
  if (args[0] === 'ExperimentalWarning') {
    return
  }

  if (args[0] && typeof args[0] === 'object' && args[0].type === 'ExperimentalWarning') {
    return
  }

  // eslint-disable-next-line consistent-return
  return emitWarning(warning, ...(args as any))
}
