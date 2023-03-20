import { connection } from "../app/database"
import { IUser } from "./types"

class UserService {
  async create(user: IUser) {
    // 1. 获取用户user
    const { name, password } = user

    // 2. 拼接statement
    const statement = "INSERT INTO `user` (name, password) VALUES (?, ?);"

    // 3. 执行sql语句
    const [result] = await connection.execute(statement, [name, password])
    return result
  }

  async findUserByName(name: string) {
    const statement = "SELECT * FROM `user` WHERE name = ?;"
    const [values] = await connection.execute(statement, [name])
    return values
  }
}

export default new UserService()
