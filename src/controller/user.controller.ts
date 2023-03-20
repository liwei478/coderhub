import Koa from "koa"
import { IUser } from "../service/types"
import userService from "../service/user.service"

class UserController {
  async create(ctx: Koa.ExtendableContext, next: Koa.Next) {
    // 1. 获取用户传递过来的信息
    const user = ctx.request.body

    // 2. 验证客户端传递过来的user是否可以保存在数据库中
    // 2.1 验证用户名和密码是否为空
    const { name, password } = user as IUser
    if (!user || !password) {
      ctx.body = {
        code: -1001,
        message: "用户名或者密码不能为空~"
      }
      return
    }

    // 2.2 判断那么是否在数据库中已经存在
    const users = await userService.findUserByName(name)
    if (users.length) {
      ctx.body = {
        code: -1002,
        message: "用户名已经被占用, 不能使用~"
      }
      return
    }

    // 3. 将user信息存储到数据库中
    const result = await userService.create(user as IUser)

    // 4. 查看存储的结果,告知前端创建成功
    ctx.body = {
      message: "创建用户成功~~",
      data: result
    }
  }
}

export default new UserController()
