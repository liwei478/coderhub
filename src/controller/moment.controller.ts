import Koa from "koa"
import momentService from "../service/moment.service"
import { ICustomLabelsReq, ILabelNameId } from "../types/label"
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
    const { momentId } = ctx.params

    // 2. 根据id查询动态详情
    const result = await momentService.queryById(momentId)

    // 返回数据
    ctx.body = {
      code: 0,
      data: result[0]
    }
  }
  async remove(ctx: ICostumLoginCtx, next: Koa.Next) {
    // 1. 获取动态的id
    const { momentId } = ctx.params

    // 2. 根据id查询动态详情
    const result = await momentService.remove(momentId)

    // 返回数据
    ctx.body = {
      code: 0,
      message: "删除动态成功~",
      data: result
    }
  }
  async update(ctx: ICostumLoginCtx, next: Koa.Next) {
    // 1. 获取动态的id
    const { momentId } = ctx.params
    // 2. 修改的内容
    const { content } = ctx.request.body as any

    // 2. 根据id查询动态详情
    const result = await momentService.update(content, momentId)

    // 返回数据
    ctx.body = {
      code: 0,
      message: "修改动态成功~",
      data: result
    }
  }
  async addLabels(ctx: ICustomLabelsReq, next: Koa.Next) {
    // 1. 获取一些参数
    const labels = ctx.labels
    const { momentId } = ctx.params

    // 2. 将moment_id和label_id添加到moment_label关系
    try {
      for (const label of labels) {
        // 2.1 判断label_id是否已经和moment_id已经存在该数据
        const isExists = await momentService.hasLabel(momentId, label.id)
        if (!isExists) {
          // 2.2 不存在改moment_id和label_id的关系数据
          const result = await momentService.addLabel(momentId, label.id)
        }
      }

      ctx.body = {
        code: 0,
        message: "为动态添加标签成功~"
      }
    } catch (error) {
      ctx.body = {
        code: -3001,
        message: "为动态添加标签失败, 请检测数据~"
      }
    }

    ctx.body = {
      labels,
      momentId
    }
  }
}

export default new MomentController()
