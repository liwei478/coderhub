import Koa from "koa"
import momentController from "../controller/moment.controller"
import MomentController from "../controller/moment.controller"
import { verifyLabelExists } from "../middleware/label.middleware"
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

/**
 * 中间件:
 * 1. 是否登录
 * 2. 验证是否有操作这个动态的权限
 * 3. 额外中间件: 验证label的name是否已经存在于label表中
 *    如果存在, 那么直接使用即可
 *    如果没有存在, 那么需要先将label的name添加到label表
 * 4. 最终步骤:
 *    所有的labels都已经在label表中
 *    动态 6, 和 labels关系,添加到关系中
 */
momentRouter.post("/:momentId/labels", verifyAuth, verifyPermission, verifyLabelExists, momentController.addLabels)

// export { momentRouter }
module.exports = momentRouter
