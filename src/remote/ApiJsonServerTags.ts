import type { AxiosInstance } from 'axios'
import type { ApiContractTags } from '~/remote/ApiContractTags'

interface JsonTags {
  id: number
  name: string
}

export class ApiJsonServerTags implements ApiContractTags {
  private http
  constructor(http: AxiosInstance) {
    this.http = http
  }

  async readAll(endpoint: string) {
    let responseData: JsonTags[] = []
    try {
      const response = await this.http.get(endpoint)
      responseData = response.data
    }
    catch (err) {
    }
    return responseData.map((e: JsonTags) => e.name)
  }

  async create(endpoint: string, tagName: string) {
    const data = await this.readAll(endpoint)
    if (!data.includes(tagName))
      await this.http.post(endpoint, { name: tagName })
  }

  async delete(endpoint: string, tagName: string) {
    let responseData: JsonTags[] = []

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
