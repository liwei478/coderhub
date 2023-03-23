import { connection } from "../app/database"

class PersmissionService {
  async checkMoment(momentId: number, userId: number) {
    const statement = "SELECT * FROM moment WHERE id = ? AND user_id = ?;"
    const [result] = await connection.execute(statement, [momentId, userId])
    return !!result.length
  }
}

export default new PersmissionService()
