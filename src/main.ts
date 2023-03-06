import Koa from "koa"
import KoaRouter from "@koa/router"

const app = new Koa()

const useRouter = new KoaRouter({ prefix: "/users" })
useRouter.get("/list", (ctx: Koa.BaseContext, next: Koa.Next) => {
  ctx.body = `users list`
})

app.use(useRouter.routes())
app.use(useRouter.allowedMethods())

app.listen(8000, () => {
  console.log("coderhub服务器启动成功~")
})
