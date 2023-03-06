// 1. 导入app
import { app } from "./app"
import { SERVER_PORT } from "./config/server"

// 2. 将app启动起来
app.listen(SERVER_PORT, () => {
  console.log("coderhub服务器启动成功~")
})
