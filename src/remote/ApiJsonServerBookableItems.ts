import type { AxiosInstance } from 'axios'
import type { ApiContractBookableItems, BookableItem, BookableItemBase } from '~/remote/ApiContractBookableItems'

export class ApiJsonServerBookableItems implements ApiContractBookableItems {
  private http
  private endpoint = 'bookableItems'
  constructor(http: AxiosInstance) {
    this.http = http
  }

  async readAll() {
    let responseData: BookableItem[] = []
    try {
      const response = await this.http.get(this.endpoint)
      responseData = response.data
    }
    catch (err) {
    }
    return responseData
  }

  async create(bookableItem: BookableItemBase) {
    try {
      const response = await this.http.post(this.endpoint, bookableItem)
      return response.data
    }
    catch (err) {
    }
  }

  async delete(id: string) {
    try {
      await this.http.delete(`${this.endpoint}\\${id}`)
    }
    catch (err) {
    }
  }
}
