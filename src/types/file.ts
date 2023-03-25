import { Multer } from "multer"
import { RequestHandler } from "express"

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
