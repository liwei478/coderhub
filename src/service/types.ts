export interface IUser {
  id?: number
  name: string
  password: string
  createAt?: Date
  updateAt?: Date
}

export interface IDynamicId {
  [key: string]: number
}

export interface IParams extends IDynamicId {
  momentId: number
}
