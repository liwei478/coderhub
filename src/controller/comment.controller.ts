import Koa from "koa"
import { ICostumLoginCtx } from "../types/login"
import { ICommentParams } from "../types/comment"
import commentService from "../service/comment.service"

class CommentController {
  async create(ctx: ICostumLoginCtx, next: Koa.Next) {
    // 1. 获取body中参数
    const { content, momentId } = ctx.request.body as ICommentParams
    const { id } = ctx.user

    // 2. 操作数据库, 将数据进行存储
    const result = await commentService.create(content, momentId, id as number)

    ctx.body = {
      code: 0,
      message: "发表评论成功~",
      data: result
    }
  }
}

export default new CommentController()
