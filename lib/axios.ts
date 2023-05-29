import axios from 'axios'

export interface Resonse<T> {
  data?: T
  error?: boolean
}

const instance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL
})

export async function call<T>(url: string, data?: any): Promise<Resonse<T>> {
  try {
    const res = await instance.post(url, data)

    return res
  } catch (e) {
    console.error('Axios call ERROR', e)
    return {
      error: true
    }
  }
}
