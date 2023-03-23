import Koa from "koa"
import { MOMENT_IS_NOT_EXISTS, OPERATION_IS_NOT_ALLOWED } from "../config/error"
import permissionService from "../service/permission.service"
import { ICostumLoginCtx } from "../types/login"

// 验证: 验证登录用户是否有操作moment的权限
// export const verifyMomentPermission = async (ctx: ICostumLoginCtx, next: Koa.Next) => {
//   // 1. 获取登录用户的id/修改动态的id
//   const { momentId } = ctx.params
//   const { id } = ctx.user

//   // 2. 查询user的id是否有修改momentId的权限
//   const isPermission = await permissionService.checkMoment(momentId, id as number)
//   if (!isPermission) {
//     return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx)
//   }

//   // 3. 执行下一个中间件
//   await next()
// }

// export const verifyPermission = (resource: string) => {
//   return async (ctx: ICostumLoginCtx, next: Koa.Next) => {
//     // 1. 获取登录用户的id/修改动态的id
//     const { momentId } = ctx.params
//     const { id } = ctx.user

//     // 2. 查询user的id是否有修改momentId的权限
//     const isPermission = await permissionService.checkMoment(momentId, id as number)
//     if (!isPermission) {
//       return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx)
//     }

//     // 3. 执行下一个中间件
//     await next()
//   }
// }

export const verifyPermission = async (ctx: ICostumLoginCtx, next: Koa.Next) => {
  // 1. 获取登录用户的id/修改动态的id
  const { id } = ctx.user

  // 3. 获取资源的name/id
  // name => moment/user/comment/label
  // params: { momentId: 4}
  // keyName => momentId
  const keyName = Object.keys(ctx.params)[0]
  const resourceId = ctx.params[keyName]
  const resourceName = keyName.replace("Id", "")

  // 4. 查询是否含有此评论
  const isExisted = await permissionService.hasMoment(resourceName, resourceId)
  if (!isExisted) {
    return ctx.app.emit("error", MOMENT_IS_NOT_EXISTS, ctx)
  }

  // 5. 查询user的id是否有修改momentId的权限
  const isPermission = await permissionService.checkResource(resourceName, resourceId, id as number)
  if (!isPermission) {
    return ctx.app.emit("error", OPERATION_IS_NOT_ALLOWED, ctx)
  }

  // 6. 执行下一个中间件
  await next()
}
