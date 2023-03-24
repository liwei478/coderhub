import Koa from "koa"
import labelService from "../service/label.service"
import { ICustomLabelsReq, ILabelsAddition } from "../types/label"

export const verifyLabelExists = async (ctx: ICustomLabelsReq, next: Koa.Next) => {
  // 1. 获取客户端传递过来所有的labels
  const { labels } = ctx.request.body as ILabelsAddition

  // 2. 判断所有的labels中的name是否已经存在于label表
  const newLabels = []
  for (const name of labels) {
    const result = await labelService.queryLabelByName(name)
    const labelObj = { name, id: 0 }
    if (result) {
      // 获取name对应的label的id
      labelObj.id = result.id // => {name： '篮球', id: 7}
    } else {
      // 插入name, 并且获取插入之后的id
      const insertResult = await labelService.create(name)
      labelObj.id = insertResult.insertId // => {name: '爱情', id: 8}
    }
    newLabels.push(labelObj)
  }

  // 3. 所有的labels都变成[{name: '爱情', id: 7 }, {name: '友情', id: 8 }]
  ctx.labels = newLabels

  await next()
}
