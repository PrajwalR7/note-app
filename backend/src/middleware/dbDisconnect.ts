import mongoose from "mongoose"

export const dbDisconnect = async () => {
    await mongoose.disconnect()
}