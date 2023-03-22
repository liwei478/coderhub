const KoaRouter = require("@koa/router")

import LoginControll from "../controller/login.controller"
import { verifyAuth, verifyLogin } from "../middleware/login.middleware"

const loginRouter = new KoaRouter({ prefix: "/login" })

loginRouter.post("/", verifyLogin, LoginControll.sign)
loginRouter.get("/test", verifyAuth, LoginControll.test)

// 由于在index文件中使用CommonJs方式导入,所以这里必须使用module方式导出
// export { loginRouter }
module.exports = loginRouter
