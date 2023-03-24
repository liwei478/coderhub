import { connection } from "../app/database"

class LabelService {
  async create(name: string) {
    const statement = "INSERT INTO label (name) VALUES (?)"
    const [result] = await connection.execute(statement, [name])
    return result
  }

  async queryLabelByName(name: string) {
    const statement = "SELECT * FROM label WHERE name = ?;"
    const [result] = await connection.execute(statement, [name])
    return result[0]
  }
}

export default new LabelService()
