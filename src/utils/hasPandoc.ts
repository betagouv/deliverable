import which from 'which'

export async function hasPandoc() {
  try {
    await which('pandoc')

    return true
  } catch (error) {
    return false
  }
}
