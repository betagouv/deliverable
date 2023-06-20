export async function waitFor(inMs: number): Promise<void> {
  console.debug(`Waiting for ${inMs / 1000}s...`)

  return new Promise(resolve => {
    setTimeout(resolve, inMs)
  })
}
