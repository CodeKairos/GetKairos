interface BookableItem {
  id: number
  name: string
  type: string
  tags?: string[]
  photos?: string[]
  icon?: string
  relatedProps?: Record<string, any>[]
}

interface User {
  id: number
  name: string
  image?: string
  sm_image?: string
  tags?: string[]
}

interface relatedUser extends User {
  role: string
}

interface BookingEvent {
  id: number
  bookableItemId: number
  start: string
  end: string
  creator: User
  relatedUsers: relatedUser[]
  tags?: string[]
}

export { BookableItem, User, BookingEvent }

export interface ApiContract {
  addBookableType(name: string): Promise<void>
  getAllBookableTypes(): Promise<string[]>
  deleteBookableType(name: string): Promise<void>
}
