import { AnyKeys, Model } from "mongoose"

export const upsertData = async (newData: unknown, model: typeof Model) => {
    console.log('upserting data')
    await model.init()
    return await model.create<AnyKeys<typeof Model>>(newData)
}