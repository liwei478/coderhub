import { app } from "../app"
import { MOMENT_IS_NOT_EXISTS, NAME_IS_ALREADY_EXISTS, NAME_IS_NOT_EXISTS, NAME_OR_PASSWORD_IS_REQUIRED, OPERATION_IS_NOT_ALLOWED, PASSWORD_IS_INCORRECT, UNAUTHORIZATION } from "../config/error"

app.on("error", (error, ctx) => {
  let code = 0
  let message = ""

  switch (error) {
    case NAME_OR_PASSWORD_IS_REQUIRED:
      code = -1001
      message = "用户名或密码不能为空~"
      break
    case NAME_IS_ALREADY_EXISTS:
      code = -1002
      message = "用户名已经被占用, 不能使用~"
      break
    case NAME_IS_NOT_EXISTS:
      code = -1003
      message = "用户名不存在, 请检查用户名~"
      break
    case PASSWORD_IS_INCORRECT:
      code = -1004
      message = "密码输入错误, 请检查密码~"
      break
    case UNAUTHORIZATION:
      code = -1005
      message = "无效的token或者token已经过期~"
      break
    case OPERATION_IS_NOT_ALLOWED:
      code = -2001
      message = "没有操作该资源的权限~"
      break
    case MOMENT_IS_NOT_EXISTS:
      code = -2002
      message = "不存在该评论~"
      break
  }

  ctx.body = { code, message }
})
