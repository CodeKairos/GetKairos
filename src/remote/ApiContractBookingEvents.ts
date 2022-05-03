export interface BookingEventBase {
  bookableItemId: string
  start: string
  end: string
  creatorId: string
  relatedUserId?: string[]
  tags?: string[]
}

export interface BookingEvent extends BookingEventBase{
  readonly id: string
}

export interface ApiContractBookingEvents {
  create(bookableItem: BookingEventBase): Promise<BookingEvent|undefined>
  readAll(): Promise<BookingEvent[]>
  delete(id: string): Promise<void>
}
