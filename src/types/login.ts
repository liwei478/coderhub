import Koa from "koa"
import { IParams, IUser } from "../service/types"

export interface ICostumLoginCtx extends Koa.ExtendableContext {
  user: IUser
  params: IParams
}
