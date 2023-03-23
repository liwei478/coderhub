import CommentController from "../controller/comment.controller"
import { verifyAuth } from "../middleware/login.middleware"

const KoaRouter = require("@koa/router")

const commentRouter = new KoaRouter({ prefix: "/comment" })

// 增: 新增评论
commentRouter.post("/", verifyAuth, CommentController.create)

// export { commentRouter }
module.exports = commentRouter
