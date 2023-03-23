import Koa from "koa"
import { OPERATION_IS_NOT_ALLOWED } from "../config/error"
import permissionService from "../service/permission.service"
import { ICostumLoginCtx } from "../types/login"

export const verifyMomentPermission = async (ctx: ICostumLoginCtx, next: Koa.Next) => {
  // 1. 获取登录用户的id/修改动态的id
  const { momentId } = ctx.params
  const { id } = ctx.user

  // 2. 查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkMoment(momentId, id as number)
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx)
  }

  // 3. 执行下一个中间件
  await next()
}
