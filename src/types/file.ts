import Koa from "koa"
import { Multer } from "multer"
import { RequestHandler } from "express"
import { IUser, IUserFileParams } from "../service/types"

interface Field {
  name: string
  maxCount?: number | undefined
}

export interface IMulter extends Multer {
  single(fieldName: string): RequestHandler

  array(fieldName: string, maxCount?: number): RequestHandler

  fields(fields: ReadonlyArray<Field>): RequestHandler

  any(): RequestHandler

  none(): RequestHandler
}

export interface IFileParams {
  filename: string
  mimetype: string
  size: number
}

export interface ICustomFileReq extends Koa.ExtendableContext {
  user: IUser
}
