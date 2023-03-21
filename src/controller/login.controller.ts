import Koa from "koa"
import { IUser } from "../service/types"
import { ICostumLoginCtx } from "../types/login"
import jwt from "jsonwebtoken"
import { PRIVATE_KEY, PUBLIC_KEY } from "../config/secret"
import { UNAUTHORIZATION } from "../config/error"

class LoginController {
  sign(ctx: ICostumLoginCtx, next: Koa.Next) {
    const { id, name } = ctx.user

    // 4. 颁发令牌, 传入token
    const token = jwt.sign({ id, name }, PRIVATE_KEY, {
      expiresIn: 24 * 60 * 60,
      algorithm: "RS256"
    })
    ctx.body = {
      code: 0,
      data: {
        token,
        id,
        name
      }
    }
  }
  test(ctx: Koa.ExtendableContext, next: Koa.Next) {}
}

export default new LoginController()
