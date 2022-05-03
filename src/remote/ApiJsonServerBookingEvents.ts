import type { AxiosInstance } from 'axios'
import type { ApiContractBookingEvents, BookingEvent, BookingEventBase } from '~/remote/ApiContractBookingEvents'

export class ApiJsonServerBookableEvents implements ApiContractBookingEvents {
  private http
  private endpoint = 'bookingEvents'
  constructor(http: AxiosInstance) {
    this.http = http
  }

  async readAll() {
    let responseData: BookingEvent[] = []
    try {
      const response = await this.http.get(this.endpoint)
      responseData = response.data
    }
    catch (err) {
    }
    return responseData
  }

  async create(bookingEvent: BookingEventBase) {
    try {
      const response = await this.http.post(this.endpoint, bookingEvent)
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
