const KoaRouter = require("@koa/router")

import LoginControll from "../controller/login.controller"
import { verifyAuth, verifyLogin } from "../middleware/login.middleware"

const loginRouter = new KoaRouter({ prefix: "/login" })

loginRouter.post("/", verifyLogin, LoginControll.sign)
loginRouter.get("/test", verifyAuth, LoginControll.test)

export { loginRouter }
