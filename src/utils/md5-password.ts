import crypto from "crypto"

export const md5password = (password: string) => {
  const md5 = crypto.createHash("md5")
  const md5pwd = md5.update(password).digest("hex")
  return md5pwd
}
