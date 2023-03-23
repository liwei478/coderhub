export interface IUser {
  id?: number
  name: string
  password: string
  createAt?: Date
  updateAt?: Date
}

export interface IParams {
  momentId: number
}
