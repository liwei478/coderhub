import Koa from "koa"

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
export interface ICustomLabelsReq extends Koa.ExtendableContext {
  labels: ILabelNameId[]
}
