export interface ApiContractBookableItem {
  id: string
  name: string
  type: string
  tags?: string[]
  photos?: string[]
  icon?: string
  relatedProps?: Record<string, any>[]
}
