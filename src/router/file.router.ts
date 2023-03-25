import KoaRouter from "@koa/router"
import { verifyAuth } from "../middleware/login.middleware"
import { handleAvatar } from "../middleware/file.middleware"
import fileController from "../controller/file.controller"

const fileRouter = new KoaRouter({ prefix: "/file" })

// file/avatar => 上传头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, fileController.create)

// export { fileRouter }
module.exports = fileRouter
