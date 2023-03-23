import CommentController from "../controller/comment.controller"
import { verifyAuth } from "../middleware/login.middleware"

const KoaRouter = require("@koa/router")

const commentRouter = new KoaRouter({ prefix: "/comment" })

// 增: 新增评论
commentRouter.post("/", verifyAuth, CommentController.create)
// 增: 回复评论
commentRouter.post("/reply", verifyAuth, CommentController.reply)

// export { commentRouter }
module.exports = commentRouter
