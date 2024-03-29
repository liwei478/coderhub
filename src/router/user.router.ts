import KoaRouter from "@koa/router"
import userController from "../controller/user.controller"
import { handlePassword, verifyUser } from "../middleware/user.middleware"

// 1. 创建路由对象
const userRouter = new KoaRouter({ prefix: "/users" })

// 2.1 定义路由中映射
userRouter.post("/", verifyUser, handlePassword, userController.create)
// 2.2 为用户提供头像
userRouter.get("/avatar/:userId", userController.showAvatarImage)

// 3. 导出路由
// export { userRouter }
module.exports = userRouter
