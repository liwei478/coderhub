import labelController from "../controller/label.controller"
import { verifyAuth } from "../middleware/login.middleware"

const KoaRouter = require("@koa/router")

const labelRouter = new KoaRouter({ prefix: "/label" })

labelRouter.post("/", verifyAuth, labelController.create)

// export { labelRouter }
module.exports = labelRouter
