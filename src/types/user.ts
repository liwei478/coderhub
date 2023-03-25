import Koa from "koa"
import { IUserFileParams } from "../service/types"
export interface IUserReq extends Koa.ExtendableContext {
  params: IUserFileParams
}
