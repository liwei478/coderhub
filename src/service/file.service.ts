import { connection } from "../app/database"

class FileService {
  async create(filename: string, mimetype: string, size: number, id: number) {
    const statement = "INSERT INTO avatar (filename, mimetype, size, user_id) VALUES (?, ?, ?, ?);"
    const [result] = await connection.execute(statement, [filename, mimetype, size, id])
    return result
  }

  async queryAvatarWithUserId(userId: number) {
    const statement = "SELECT * FROM avatar WHERE user_id = ?;"
    const [result] = await connection.execute(statement, [userId])
    return result.pop()
  }
}

export default new FileService()
