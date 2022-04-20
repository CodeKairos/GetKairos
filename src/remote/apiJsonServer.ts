import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { ApiContract, TagsApi } from '~/remote/apiContract'

class TagsJson implements TagsApi {
  private http
  constructor(http: AxiosInstance) {
    this.http = http
  }

  async getAll(endpoint: string) {
    let responseData: { id: number; name: string }[] = []
    try {
      const response = await this.http.get(endpoint)
      responseData = response.data
    }
    catch (err) {
    }
    return responseData.map((e: { id: number; name: string }) => e.name)
  }

  async add(endpoint: string, tagName: string) {
    await this.http.post(endpoint, { name: tagName })
  }

  async delete(endpoint: string, tagName: string) {
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

class ApiJsonServer implements ApiContract {
  private baseURL = ''
  private http
  tags: TagsJson

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-type': 'application/json',
      },
    })
    this.tags = new TagsJson(this.http)
  }
}
export { ApiJsonServer }
