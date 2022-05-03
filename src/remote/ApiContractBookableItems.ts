export interface BookableItemBase {
  name: string
  type: string
  tags?: string[]
  photos?: string[]
  icon?: string
  relatedProps?: Record<string, any>[]
}

export interface BookableItem extends BookableItemBase {
  readonly id: string
}

export interface ApiContractBookableItems {
  create(bookableItem: BookableItemBase): Promise<BookableItem|undefined>
  readAll(): Promise<BookableItem[]>
  delete(id: string): Promise<void>
}
