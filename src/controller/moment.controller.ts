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
  async list(ctx: ICostumLoginCtx, next: Koa.Next) {
    // 从数据库动态获取列表
    const result = await momentService.queryList()

    // 返回数据
    ctx.body = {
      code: 0,
      data: result
    }
  }
  async detail(ctx: ICostumLoginCtx, next: Koa.Next) {
    // 1. 获取动态的id
    const { momentId } = (ctx as any).params

    // 2. 根据id查询动态详情
    const result = await momentService.queryById(momentId)

    // 返回数据
    ctx.body = {
      code: 0,
      data: result[0]
    }
  }
}

export default new MomentController()
