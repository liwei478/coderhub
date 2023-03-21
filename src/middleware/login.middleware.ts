import Koa from "koa"
import { NAME_IS_NOT_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED, PASSWORD_IS_INCORRECT } from "../config/error"
import { IUser } from "../service/types"
import userService from "../service/user.service"
import { ICostumLoginCtx } from "../types/login"
import { md5password } from "../utils/md5-password"

export const verifyLogin = async (ctx: ICostumLoginCtx, next: Koa.Next) => {
  const { name, password } = ctx.request.body as IUser

  // 1. 判断用户名和密码是否为空
  if (!name || !password) {
    return ctx.app.emit("error", NAME_OR_PASSWORD_IS_REQUIRED, ctx)
  }

  // 2. 查询该用户是否在数据库中存在
  const users = await userService.findUserByName(name)
  const user = users[0]
  if (!user) {
    return ctx.app.emit("error", NAME_IS_NOT_EXISTS, ctx)
  }

  // 3. 查询数据库中密码和用户名传递的密码是否一致
  if (user.password !== md5password(password)) {
    return ctx.app.emit("error", PASSWORD_IS_INCORRECT, ctx)
  }

  // 4. 将user信息保存在ctx
  ctx.user = user

  // 验证成功, 执行下一个中间件
  await next()
}
