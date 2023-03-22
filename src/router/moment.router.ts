import MomentController from "../controller/moment.controller"
import { verifyAuth } from "../middleware/login.middleware"

const KoaRouter = require("@koa/router")

const momentRouter = new KoaRouter({ prefix: "/moment" })

momentRouter.post("/", verifyAuth, MomentController.create)
momentRouter.get("/", MomentController.list)
momentRouter.get("/:momentId", MomentController.detail)

// export { momentRouter }
module.exports = momentRouter
