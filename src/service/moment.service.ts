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
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url, 'createTime', u.createAt, 'updateTime', u.updateAt) user,
      (SELECT COUNT(*) FROM comment WHERE comment_id = m.id) commentCount,
      (SELECT COUNT(*) FROM moment_label ml WHERE ml.moment_id = m.id) labelCount
    FROM moment m
    LEFT JOIN user u ON u.id = m.user_id
    LIMIT ? OFFSET ?;`
    const [result] = await connection.execute(statement, [String(size), String(offset)])
    return result
  }
  async queryById(id: number) {
    const statement = `SELECT 
      m.id id, m.content content, m.createAt createTime, m.updateAt updateTime,
      JSON_OBJECT('id', u.id, 'name', u.name, 'avatarURL', u.avatar_url,  'createTime', u.createAt, 'updateTime', u.updateAt) user,
      (
        SELECT
          JSON_ARRAYAGG(JSON_OBJECT(
            'id', c.id, 'content', c.content, 'commentId', c.comment_id,
            'user', JSON_OBJECT('id', cu.id, 'name', cu.name, 'avatarURL', u.avatar_url)
          ))
        FROM comment c
        LEFT JOIN user cu ON c.user_id = cu.id
        WHERE c.moment_id = m.id
      ) comments,
      (
        JSON_ARRAYAGG(JSON_OBJECT(
          'id', l.id, 'name', l.name
        ))
      ) labels
    FROM moment m
    LEFT JOIN user u ON u.id = m.user_id
    LEFT JOIN moment_label ml ON ml.moment_id = m.id
    LEFT JOIN label l ON ml.label_id = l.id
    WHERE m.id = 6
    GROUP BY m.id;`
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
  async hasLabel(momentId: number, labelId: number) {
    const statement = "SELECT * FROM moment_label WHERE moment_id = ? AND label_id = ?;"
    const result = await connection.execute(statement, [momentId, labelId])
    return !!result.length
  }
  async addLabel(momentId: number, labelId: number) {
    const statement = "INSERT INTO moment_label (moment_id, label_id) VALUES (?, ?);"
    const result = await connection.execute(statement, [momentId, labelId])
    return result
  }
}

export default new MomentService()
