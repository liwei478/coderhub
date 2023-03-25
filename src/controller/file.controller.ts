import Koa from "koa"
import { SERVER_HOST, SERVER_PORT } from "../config/server"
import fileService from "../service/file.service"
import userService from "../service/user.service"
import { ICustomFileReq } from "../types/file"

class FileController {
  async create(ctx: ICustomFileReq, next: Koa.Next) {
    // 1. 获取对应的信息
    const { filename, mimetype, size } = ctx.request.file
    const { id } = ctx.user

    // 2. 将图片信息和id结合起来进行存储
    const result = await fileService.create(filename, mimetype, size, id as number)

    // 3. 将头像的地址信息, 保存到user表中
    const avatarUrl = `${SERVER_HOST}:${SERVER_PORT}/user/avatar/${id}`
    const result2 = await userService.updateUserAvatar(avatarUrl, id as number)

    // 4. 返回结果
    ctx.body = {
      code: 0,
      message: "头像上传成功, 可以查看~",
      data: avatarUrl
    }
  }
}

export default new FileController()
