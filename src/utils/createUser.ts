import { User } from "../db/models.js";
import { UserSchema, UserType } from "../db/schemas/user.js";

export const createUser = async (user: UserType): Promise<Record<string, unknown>> => {
    console.log('Creating user')
    try {
        await User.create({
            name: user.name,
            email: user.email,
            password: user.password
        })
        return{
            message: 'Created user succesfully',
            status: 200
        }
    } catch(err) {
        return {
            message: (err as Error).message,
            status: 400
        }
    }
}