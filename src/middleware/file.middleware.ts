import multer from "@koa/multer"

// 上传头像的中间件
const uploadAvatar = multer({
  dest: "./uploads"
})
const handleAvatar = uploadAvatar.single("avatar")

// 上传其他图片
// ...

export { handleAvatar }
