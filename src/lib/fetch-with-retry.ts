// One retry smooths over transient network/DNS blips during builds and revalidation
export async function fetchWithRetry(url: string, init?: RequestInit): Promise<Response> {
  try {
    return await fetch(url, init)
  } catch {
    await new Promise(resolve => setTimeout(resolve, 1000))
    return fetch(url, init)
  }
}
