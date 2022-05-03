import { TagCloudName } from './ApiContractTags'
import type { ApiContractTags } from './ApiContractTags'
import type { ApiContractUsers, User } from './ApiContractUsers'
import type { ApiContractBookableItems, BookableItem, BookableItemBase } from './ApiContractBookableItems'
import type { ApiContractBookingEvents, BookingEvent, BookingEventBase } from './ApiContractBookingEvents'

export interface ApiContract {
  tags: ApiContractTags
  bookableItems: ApiContractBookableItems
  bookingEvents: ApiContractBookingEvents
}

export type {
  ApiContractBookableItems, BookableItemBase, BookableItem,
  ApiContractBookingEvents, BookingEventBase, BookingEvent,
  ApiContractUsers, User,
  ApiContractTags,
}

export { TagCloudName }
