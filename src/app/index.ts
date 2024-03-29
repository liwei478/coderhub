import Koa from "koa"
import bodyParser from "koa-bodyparser"
import { registerRouter } from "../router"
// import { loginRouter } from "../router/login.router"
// import { userRouter } from "../router/user.router"

// 1. 创建app
const app = new Koa()

// 2. 对app使用中间件
app.use(bodyParser())
registerRouter(app)
// app.use(userRouter.routes())
// app.use(userRouter.allowedMethods())
// app.use(loginRouter.routes())
// app.use(loginRouter.allowedMethods())

// 3. 导出app
export { app }
