const KoaRouter = require("@koa/router")

import LoginControll from "../controller/login.controller"
import { verifyLogin } from "../middleware/login.middleware"

const loginRouter = new KoaRouter({ prefix: "/login" })

loginRouter.post("/", verifyLogin, LoginControll.sign)

export { loginRouter }
