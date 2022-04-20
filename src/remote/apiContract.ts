enum TagCloudName {
  // e.g. meeting room, lab equipment, shared place, software license, etc.
  bookableTypes = 'bookableTypes',
  // e.g. managment, group meeting, education, some project, etc.
  eventTypes = 'eventTypes',
  // e.g. admin, by team, by department, etc.
  userGroups = 'userGroups',
  // e.g. blackboard, beamer, web conference
  meetingRoomEquipment = 'meetingRoomEquipment',
}

interface User {
  id: number
  name: string
  image?: string
  sm_image?: string
  tags?: string[]
}

interface RelatedUser extends User {
  role: string
}

interface BookableItem {
  id: number
  name: string
  type: string
  tags?: string[]
  photos?: string[]
  icon?: string
  relatedProps?: Record<string, any>[]
}

interface BookingEvent {
  id: number
  bookableItemId: number
  start: string
  end: string
  creator: User
  relatedUsers?: RelatedUser[]
  tags?: string[]
}

interface TagsApi {
  add(tagCloudName: string, tagName: string): Promise<void>
  getAll(tagCloudName: string): Promise<string[]>
  delete(tagCloudName: string, tagName: string): Promise<void>
}

interface ApiContract {
  tags: TagsApi
}

export {
  TagCloudName,
  BookableItem, BookingEvent,
  User, RelatedUser,
  ApiContract,
  TagsApi,
}
