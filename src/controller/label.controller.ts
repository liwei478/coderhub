import Koa from "koa"
import labelService from "../service/label.service"
import { ILabelName } from "../types/label"

class LabelController {
  async create(ctx: Koa.ExtendableContext, next: Koa.Next) {
    // 1. 获取标签的名称
    const { name } = ctx.request.body as ILabelName

    // 2. 操作数据库存储name
    const result = await labelService.create(name)

    // 3. 返回结果
    ctx.body = {
      code: 0,
      message: "创建标签成功",
      data: result
    }
  }
}

export default new LabelController()
