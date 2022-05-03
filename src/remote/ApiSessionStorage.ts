import type { ApiContractBookableItems, BookableItem, BookableItemBase } from './ApiContractBookableItems'
import type { ApiContractBookingEvents, BookingEvent, BookingEventBase } from './ApiContractBookingEvents'
import type { ApiContract } from '~/remote/ApiContract'
import type { ApiContractTags } from '~/remote/ApiContractTags'
const prefix = 'kairos-'
// const users = 'users'
async function setData(path: string, data: any): Promise<void> {
  window.sessionStorage.setItem(prefix + path, JSON.stringify(data))
}

// function uid() {
//   return (performance.now().toString(36) + Math.random().toString(36)).replace(/\./g, '')
// }

class ApiSessionStorageTags implements ApiContractTags {
  async readAll(tagCloudName: string) {
    return JSON.parse(window.sessionStorage.getItem(prefix + tagCloudName) || '[]')
  }

  async create(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.readAll(tagCloudName)
    if (!data.includes(tagName)) data.push(tagName)
    setData(tagCloudName, data)
  }

  async delete(tagCloudName: string, tagName: string): Promise<void> {
    const data = await this.readAll(tagCloudName)
    const filteredData = data.filter((e: string) => e !== tagName)
    setData(tagCloudName, filteredData)
  }

  // // User management
  // async createUser(name?: string): Promise<string> {
  //   if (!name) name = ''
  //   const userId = uid() // TODO test uid is unique
  //   const newUser: User = { name, id: userId }
  //   window.sessionStorage.setItem(prefix + users, JSON.stringify(newUser))
  //   return userId
  // }
}

class ApiSessionStorageBookableItems implements ApiContractBookableItems {
  private endpoint = 'bookableItems'
  async readAll() {
    const response: BookableItem[] = JSON.parse(window.sessionStorage.getItem(prefix + this.endpoint) || '[]')
    return response
  }

  async create(bookableItem: BookableItemBase) {
    const data = await this.readAll()
    const newItem: BookableItem = { ...bookableItem, id: (Math.random() + 1).toString(36).substring(7) }
    data.push(newItem)
    setData(this.endpoint, data)
    return newItem
  }

  async delete(id: string) {
    const data = await this.readAll()
    const filteredData = data.filter(e => e.id !== id)
    setData(this.endpoint, filteredData)
  }
}

class ApiSessionStorageBookingEvents implements ApiContractBookingEvents {
  private endpoint = 'bookingEvents'
  async readAll() {
    const response: BookingEvent[] = JSON.parse(window.sessionStorage.getItem(prefix + this.endpoint) || '[]')
    return response
  }

  async create(bookingEvent: BookingEventBase) {
    const data = await this.readAll()
    const newItem: BookingEvent = { ...bookingEvent, id: (Math.random() + 1).toString(36).substring(7) }
    data.push(newItem)
    setData(this.endpoint, data)
    return newItem
  }

  async delete(id: string) {
    const data = await this.readAll()
    const filteredData = data.filter(e => e.id !== id)
    setData(this.endpoint, filteredData)
  }
}

class ApiSessionStorage implements ApiContract {
  tags: ApiContractTags
  bookableItems: ApiSessionStorageBookableItems
  bookingEvents: ApiSessionStorageBookingEvents
  constructor() {
    this.tags = new ApiSessionStorageTags()
    this.bookableItems = new ApiSessionStorageBookableItems()
    this.bookingEvents = new ApiSessionStorageBookingEvents()
  }
}
export { ApiSessionStorage }
