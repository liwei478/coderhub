import Koa from "koa"
import { IUser } from "../service/types"

export interface ICostumLoginCtx extends Koa.ExtendableContext {
  user: IUser
}
