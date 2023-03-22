import Koa from "koa"
import momentService from "../service/moment.service"
import { ICostumLoginCtx } from "../types/login"
import { IMomentParams } from "../types/moment"

class MomentController {
  async create(ctx: ICostumLoginCtx, next: Koa.Next) {
    // 1. 获取动态的内容
    const { content } = ctx.request.body as IMomentParams

    // 2. 动态由谁发布(token => id/name)
    const { id } = ctx.user

    // 3. 将动态相关的数据保存在数据库
    const result = await momentService.create(content, id as number)

    ctx.body = {
      code: 0,
      message: "创建用户动态成功~",
      data: result
    }
  }
}

export default new MomentController()