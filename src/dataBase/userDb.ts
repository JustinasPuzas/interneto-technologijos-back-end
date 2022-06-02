import mongoose from 'mongoose';

interface IUser {
    _id: String,
    userName: String,
    email: String,
    password: String
}

const userSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

const userDb = mongoose.model<IUser>('User', userSchema)

export default userDb;