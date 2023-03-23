import MomentController from "../controller/moment.controller"
import { verifyAuth } from "../middleware/login.middleware"
import { verifyPermission } from "../middleware/permission.middleware"

const KoaRouter = require("@koa/router")

const momentRouter = new KoaRouter({ prefix: "/moment" })

// 编写接口
// 1. 增: 新增动态
momentRouter.post("/", verifyAuth, MomentController.create)
// 1. 查: 查询动态
momentRouter.get("/", MomentController.list)
momentRouter.get("/:momentId", MomentController.detail)
// 3. 删: 删除动态
momentRouter.delete("/:momentId", verifyAuth, verifyPermission, MomentController.remove)
// 4. 改: 修改动态
// 验证: 登录的用户才能修改动态
momentRouter.patch("/:momentId", verifyAuth, verifyPermission, MomentController.update)

// export { momentRouter }
module.exports = momentRouter
