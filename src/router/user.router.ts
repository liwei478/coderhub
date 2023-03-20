import Koa from "koa"
import KoaRouter from "@koa/router"
import userController from "../controller/user.controller"

// 1. 创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" })

// 2. 定义路由中映射
userRouter.post("/", userController.create)

// 3. 导出路由
export { userRouter }
