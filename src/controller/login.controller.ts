import Koa from "koa"
import { IUser } from "../service/types"
import { ICostumLoginCtx } from "../types/login"
import jwt from "jsonwebtoken"
import { PRIVATE_KEY } from "../config/secret"

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
}

export default new LoginController()
