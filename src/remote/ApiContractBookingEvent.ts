export interface ApiContractBookingEvent {
  id: string
  bookableItemId: string
  start: string
  end: string
  creatorId: string
  relatedUserId?: string[]
  tags?: string[]
}
