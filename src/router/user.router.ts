import Koa from "koa"
import KoaRouter from "@koa/router"

// 1. 创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" })

// 2. 定义路由中映射
userRouter.get("/list", (ctx: Koa.BaseContext, next: Koa.Next) => {
  ctx.body = `users list`
})

// 3. 导出路由
export { userRouter }
