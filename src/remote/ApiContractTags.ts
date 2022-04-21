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

export type { ApiContractTags }
export { TagCloudName }
