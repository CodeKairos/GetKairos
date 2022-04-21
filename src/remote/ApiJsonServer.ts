import axios from 'axios'
import { ApiJsonServerTags } from './ApiJsonServerTags'
import type { ApiContract } from '~/remote/ApiContract'

class ApiJsonServer implements ApiContract {
  private baseURL = ''
  private http
  tags: ApiJsonServerTags

  constructor(baseURL: string) {
    this.baseURL = baseURL
    this.http = axios.create({
      baseURL: this.baseURL,
      headers: {
        'Content-type': 'application/json',
      },
    })
    this.tags = new ApiJsonServerTags(this.http)
  }
}
export { ApiJsonServer }
