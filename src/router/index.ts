import fs from "fs"
import Koa from "koa"

export const registerRouter = (app: Koa<Koa.DefaultState, Koa.DefaultContext>) => {
  const files = fs.readdirSync(__dirname)
  // 遍历所有的文件
  for (const file of files) {
    if (!file.endsWith(".router.ts")) {
      continue
    }
    const router = require(`./${file}`)
    app.use(router.routes())
    app.use(router.allowedMethods())
  }
}
