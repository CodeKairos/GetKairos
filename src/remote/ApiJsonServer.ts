import axios from 'axios'
import { ApiJsonServerTags } from './ApiJsonServerTags'
import { ApiJsonServerBookableItems } from './ApiJsonServerBookableItems'
import { ApiJsonServerBookableEvents } from './ApiJsonServerBookingEvents'
import type { ApiContract, ApiContractBookingEvents } from '~/remote/ApiContract'

class ApiJsonServer implements ApiContract {
  private baseURL = ''
  private http
  tags: ApiJsonServerTags
  bookableItems: ApiJsonServerBookableItems
  bookingEvents: ApiContractBookingEvents

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-type': 'application/json',
      },
    })
    this.tags = new ApiJsonServerTags(this.http)
    this.bookableItems = new ApiJsonServerBookableItems(this.http)
    this.bookingEvents = new ApiJsonServerBookableEvents(this.http)
  }
}
export { ApiJsonServer }
