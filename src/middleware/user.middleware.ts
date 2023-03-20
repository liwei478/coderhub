import Koa from "koa"
import { IUser } from "../service/types"
import userService from "../service/user.service"
import { md5password } from "../utils/md5-password"

export const verifyUser = async (ctx: Koa.ExtendableContext, next: Koa.Next) => {
  //  验证客户端传递过来的user是否可以保存在数据库中
  // 1. 验证用户名和密码是否为空
  const { name, password } = ctx.request.body as IUser
  if (!name || !password) {
    return ctx.app.emit("error", "NAME_OR_PASSWORD_IS_REQUIRED", ctx)
  }

  // 2. 判断那么是否在数据库中已经存在
  const users = await userService.findUserByName(name)
  if (users.length) {
    return ctx.app.emit("error", "NAME_IS_ALREADY_EXISTS", ctx)
  }

  // 3.执行下一个中间件
  await next()
}

export const handlePassword = async (ctx: Koa.ExtendableContext, next: Koa.Next) => {
  // 1. 取出密码
  const user: IUser = ctx.request.body as IUser
  const { password } = user

  // 2. 对密码进行加密
  user.password = md5password(password)

  // 3. 执行下一个中间件
  await next()
}
