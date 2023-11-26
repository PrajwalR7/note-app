import { Model } from "mongoose"

export const upsertData = async (newData: Record<string, unknown>, model: typeof Model) => {
    await model.init()
    await model.create(newData)
}