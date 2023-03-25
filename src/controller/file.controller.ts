import Koa from "koa"

class FileController {
  async create(ctx: Koa.ExtendableContext, next: Koa.Next) {
    // console.log(ctx.request.file as any)
    ctx.body = `文件上传成功~`
  }
}

export default new FileController()
