import dotenv from 'dotenv'

const result = dotenv.config().parsed

export const envs = {
    MONGO_PASSWORD: result.MONGO_PASSWORD,
    MONGO_USERNAME: result.MONGO_USERNAME,
    AUTH_SECRET: result.AUTH_SECRET
}