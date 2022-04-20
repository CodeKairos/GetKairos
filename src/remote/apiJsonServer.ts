import axios from 'axios'
import type { ApiContract } from '~/remote/apiContract'

class ApiJsonServer implements ApiContract {
  private baseURL = ''
  private http
  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-type': 'application/json',
      },
    })
  }

  async getAllTags(endpoint: string) {
    let responseData: { id: number; name: string }[] = []
    try {
      const response = await this.http.get(endpoint)
      responseData = response.data
    }
    catch (err) {
    }
    return responseData.map((e: { id: number; name: string }) => e.name)
  }

  async addTag(endpoint: string, tagName: string) {
    await this.http.post(endpoint, { name: tagName })
  }

  async deleteTag(endpoint: string, tagName: string) {
    let responseData: { id: number; name: string }[] = []

    try {
      const response = await this.http.get(endpoint)
      responseData = response.data
    }
    catch (err) {
    }
    for (const record of responseData) {
      if (record.name === tagName) {
        // console.log(record, 'to delete:', name, ' request:', `${bookableTypes}/${record.id}`)
        await this.http.delete(`${endpoint}\\${record.id}`)
      }
    }
  }
}
export { ApiJsonServer }
