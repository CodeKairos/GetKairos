export interface ApiContract {
  name: string
  addBookableType(name: string): void
  getAllBookableTypes(): string[]
  deleteBookableType(name: string): void
  deleteAllBookableTypes(): void
}
