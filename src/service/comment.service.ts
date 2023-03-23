import { connection } from "../app/database"

class CommentService {
  async create(content: string, momentId: number, userId: number) {
    const statement = "INSERT INTO comment (content, moment_id, user_id) VALUES (?, ?, ?);"
    const [result] = await connection.execute(statement, [content, momentId, userId])
    return result
  }
}

export default new CommentService()
