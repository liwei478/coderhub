import { connection } from "../app/database"

class MomentService {
  async create(content: string, userId: number) {
    const statement = "INSERT INTO moment (content, user_id) VALUES (?, ?);"
    const [result] = await connection.execute(statement, [content, userId])
    return result
  }
  async queryList(offset = 0, size = 10) {
    // 格式必须是下面这种,否则会报错500
    const statement = `SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE comment_id = m.id) commentCount
    FROM moment m
    LEFT JOIN user u ON u.id = m.user_id
    LIMIT ? OFFSET ?;`
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }
  async queryById(id: number) {
    const statement = `SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
      (
        JSON_ARRAYAGG(JSON_OBJECT(
          'id', c.id, 'content', c.content, 'commentId', c.comment_id, 'createTime', c.createAt,
          'user', JSON_OBJECT('id', cu.id, 'name', cu.name)
        ))
      ) comments
    FROM moment m
    LEFT JOIN user u ON u.id = m.user_id
    LEFT JOIN comment c ON c.moment_id = m.id
    LEFT JOIN user cu ON cu.id = c.user_id
    WHERE m.id = ?
    GROUP BY m.id;
    `
    const [result] = await connection.execute(statement, [id])
    return result
  }
  async update(content: string, id: number) {
    const statement = `UPDATE moment SET content = ? WHERE id = ?;`
    const [result] = await connection.execute(statement, [content, id])
    return result
  }
  async remove(id: number) {
    const statement = `DELETE FROM moment WHERE id = ?;`
    const [result] = await connection.execute(statement, [id])
    return result
  }
}

export default new MomentService()
