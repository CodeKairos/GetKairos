import { TagCloudName } from './ApiContractTags'
import type { ApiContractTags } from './ApiContractTags'
import type { ApiContractUsers, User } from './ApiContractUsers'
import type { ApiContractBookableItem } from './ApiContractBookableItem'
import type { ApiContractBookingEvent } from './ApiContractBookingEvent'

export interface ApiContract {
  tags: ApiContractTags

}

export type {
  ApiContractBookableItem,
  ApiContractBookingEvent,
  ApiContractUsers, User,
  ApiContractTags,
}

export { TagCloudName }
