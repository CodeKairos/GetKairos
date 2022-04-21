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

interface ApiContractTags {
  create(tagCloudName: string, tagName: string): Promise<void>
  readAll(tagCloudName: string): Promise<string[]>
  delete(tagCloudName: string, tagName: string): Promise<void>
}

interface ApiContract {
  tags: ApiContractTags

  // // Users
  // createUser(name?: string): Promise<string>
  // getUserById(userId: string): Promise<User>
  // deleteUser(userId: string): Promise<void>
}

export {
  TagCloudName,
  BookableItem, BookingEvent,
  User,
  ApiContract,
  ApiContractTags,
}
