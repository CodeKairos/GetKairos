export interface User {
  name: string
  readonly id: string
  image?: string
  icon?: string
  tags?: string[]
  role?: string[]
}

export interface ApiContractUsers {
  create(username: string): Promise<string>
  readAll(): Promise<User[]>
  update(updatedUser: User): Promise<void>
  delete(userid: string): Promise<void>
}
