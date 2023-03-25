import KoaRouter from "@koa/router"
import multer, { Multer } from "multer"
import { verifyAuth } from "../middleware/login.middleware"
import Koa from "koa"
import { handleAvatar } from "../middleware/file.middleware"
import FileController from "../controller/file.controller"

const fileRouter = new KoaRouter({ prefix: "/file" })

// file/avatar => 上传头像
fileRouter.post("/avatar", verifyAuth, handleAvatar, FileController.create)

// export { fileRouter }
module.exports = fileRouter
