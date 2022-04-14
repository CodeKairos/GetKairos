import axios from 'axios'
import type { ApiContract } from '~/remote/apiContract'
const bookableTypes = '/bookableTypes'

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
    let responseOld: { id: number; type: string }[] = []
    try {
      const response = await this.http.get(bookableTypes)
      responseOld = response.data
    }
    catch (err) {
    }
    // console.log('getAll:',
    //   responseOld.map((e: { id: number; type: string }) => e.type),
    // )
    return responseOld.map((e: { id: number; type: string }) => e.type)
  }

  async addBookableType(name: string): Promise<void> {
    const postData = {
      type: name,
    }
    // try {
    //   // const response =
    //   await this.http.get(bookableTypes)
    //   // responseOld = response.data
    // }
    // catch (err) {
    // }
    // const res =
    await this.http.post(bookableTypes, postData)
    // const result = {
    //   status: `${res.status}-${res.statusText}`,
    //   headers: res.headers,
    //   data: res.data,
    // }
    // console.log(result)
  }

  async deleteBookableType(name: string): Promise<void> {
    let responseOld: { id: number; type: string }[] = []
    try {
      const response = await this.http.get(bookableTypes)
      responseOld = response.data
    }
    catch (err) {
    }
    for (const record of responseOld) {
      if (record.type === name) {
        // console.log(record, 'to delete:', name, ' request:', `${bookableTypes}/${record.id}`)
        await this.http.delete(`${bookableTypes}\\${record.id}`)
      }
    }
  }
}
export { ApiJsonServer }
