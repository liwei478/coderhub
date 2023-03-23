import { connection } from "../app/database"

class PersmissionService {
  async hasMoment(resourceName: string, resourceId: number) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ?;`
    const [result] = await connection.execute(statement, [resourceId])
    return !!result.length
  }
  async checkMoment(momentId: number, userId: number) {
    const statement = "SELECT * FROM moment WHERE id = ? AND user_id = ?;"
    const [result] = await connection.execute(statement, [momentId, userId])
    return !!result.length
  }
  async checkResource(resourceName: string, resourceId: number, userId: number) {
    const statement = `SELECT * FROM ${resourceName} WHERE id = ? AND user_id = ?;`
    const [result] = await connection.execute(statement, [resourceId, userId])
    return !!result.length
  }
}

export default new PersmissionService()
