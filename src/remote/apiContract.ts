export interface ApiContract {
  addBookableType(name: string): Promise<void>
  getAllBookableTypes(): Promise<string[]>
  deleteBookableType(name: string): Promise<void>
}
