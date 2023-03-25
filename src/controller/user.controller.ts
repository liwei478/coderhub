import Koa from "koa"
import fs from "fs"
import fileService from "../service/file.service"
import { IUser, IUserFileParams } from "../service/types"
import userService from "../service/user.service"
import { UPLOAD_PATH } from "../config/path"
import { IUserReq } from "../types/user"

class UserController {
  async create(ctx: Koa.ExtendableContext, next: Koa.Next) {
    // 1. 获取用户传递过来的信息
    const user = ctx.request.body

    // 2. 将user信息存储到数据库中
    const result = await userService.create(user as IUser)

    // 3. 查看存储的结果,告知前端创建成功
    ctx.body = {
      message: "创建用户成功~~",
      data: result
    }
  }

  async showAvatarImage(ctx: IUserReq, next: Koa.Next) {
    // 1. 获取用户的id
    const { userId } = ctx.params

    // 2. 获取userId对应的头像信息
    const avatarInfo = await fileService.queryAvatarWithUserId(userId)

    // 3. 读取头像所在的文件
    const { filename, mimetype } = avatarInfo
    ctx.type = mimetype
    ctx.body = fs.createReadStream(`${UPLOAD_PATH}/${filename}`)
  }
}

export default new UserController()
