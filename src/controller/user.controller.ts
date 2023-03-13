import Koa from "koa"
import userService from "../service/user.service"

class UserController {
  create(ctx: Koa.ExtendableContext, next: Koa.Next) {
    // 1. 获取用户传递过来的信息
    const user = ctx.request.body
    console.log(user)

    // 2. 将user信息存储到数据库中
    userService.create()

    // 3. 查看存储的结果,告知前端创建成功
    ctx.body = `创建用户成功~~`
  }
}

export default new UserController()
