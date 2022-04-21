import type { ApiContractTags } from './ApiContractTags'
import { TagCloudName } from './ApiContractTags'

interface User {
  id: string
  name: string
  image?: string
  sm_image?: string
  tags?: string[]
  role?: string[]
}

interface BookableItem {
  id: string
  name: string
  type: string
  tags?: string[]
  photos?: string[]
  icon?: string
  relatedProps?: Record<string, any>[]
}

interface BookingEvent {
  id: string
  bookableItemId: string
  start: string
  end: string
  creatorId: string
  relatedUserId?: string[]
  tags?: string[]
}

interface ApiContract {
  tags: ApiContractTags

  // // Users
  // createUser(name?: string): Promise<string>
  // getUserById(userId: string): Promise<User>
  // deleteUser(userId: string): Promise<void>
}

export type {
  BookableItem, BookingEvent,
  User,
  ApiContract,
  ApiContractTags,
}

export { TagCloudName }
