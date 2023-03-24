import Koa from "koa"
import { IParams, IUser } from "../service/types"

export interface ILabelName {
  name: string
}

export interface ILabelsAddition {
  labels: string[]
}

export interface ILabelNameId {
  id: number
  name: string
}
export interface ILabels {}
export interface ICustomLabelsReq extends Koa.ExtendableContext {
  user: IUser
  params: IParams
  labels: ILabelNameId[]
}
