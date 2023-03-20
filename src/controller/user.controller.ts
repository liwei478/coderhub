import Koa from "koa"
import { IUser } from "../service/types"
import userService from "../service/user.service"

class UserController {
  async create(ctx: Koa.ExtendableContext, next: Koa.Next) {
    // 1. 获取用户传递过来的信息
    const user = ctx.request.body
    console.log(user)

    // 2. 将user信息存储到数据库中
    const result = await userService.create(user as IUser)

    // 3. 查看存储的结果,告知前端创建成功
    ctx.body = {
      message: "创建用户成功~~",
      data: result
    }
  }
}

export default new UserController()
