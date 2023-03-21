import fs from "fs"
import path from "path"

// 默认情况下相对目录和node程序的启动目录有关系
// const PRIVATE_KEY = fs.readFileSync("./src/config/keys/private.key")
// const PUBLIC_KEY = fs.readFileSync("./src/config/keys/public.key")

const PRIVATE_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/private.key"))
const PUBLIC_KEY = fs.readFileSync(path.resolve(__dirname, "./keys/public.key"))

export { PRIVATE_KEY, PUBLIC_KEY }
