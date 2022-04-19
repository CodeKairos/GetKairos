import type { AxiosInstance } from 'axios'
import axios from 'axios'
import type { ApiContract } from '~/remote/apiContract'
const bookableTypes = '/bookableTypes'

async function getAllTags(http: AxiosInstance, endpoint: string) {
  let responseData: { id: number; name: string }[] = []
  try {
    const response = await http.get(endpoint)
    responseData = response.data
  }
  catch (err) {
  }
  return responseData.map((e: { id: number; name: string }) => e.name)
}

async function addTag(http: AxiosInstance, endpoint: string, tagName: string) {
  await http.post(endpoint, { name: tagName })
}

async function deleteTag(http: AxiosInstance, endpoint: string, tagName: string) {
  let responseData: { id: number; name: string }[] = []

  try {
    const response = await http.get(endpoint)
    responseData = response.data
  }
  catch (err) {
  }
  for (const record of responseData) {
    if (record.name === tagName) {
      // console.log(record, 'to delete:', name, ' request:', `${bookableTypes}/${record.id}`)
      await http.delete(`${endpoint}\\${record.id}`)
    }
  }
}

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

  async getAllBookableTypes() {
    return await getAllTags(this.http, bookableTypes)
  }

  async addBookableType(typeName: string): Promise<void> {
    await addTag(this.http, bookableTypes, typeName)
  }

  async deleteBookableType(typeName: string): Promise<void> {
    await deleteTag(this.http, bookableTypes, typeName)
  }
}
export { ApiJsonServer }
