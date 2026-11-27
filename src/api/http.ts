const BASE_URL = 'http://localhost:3000'

export async function http<T>(
  resource: string,
  options: RequestInit = {}
): Promise<T> {
  const response = await fetch(`${BASE_URL}/${resource}`, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...options.headers
    }
  })

  if (!response.ok) {
    throw new Error(`Request failed: ${response.status}`)
  }

  return response.json()
}