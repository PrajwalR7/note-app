import { Model } from "mongoose"

export const upsertData = async (newData: unknown, model: typeof Model) => {
    await model.init()
    await model.create(newData)
}