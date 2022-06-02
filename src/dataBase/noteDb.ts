import mongoose from 'mongoose';

interface INote {
    _id: String,
    ownerId: String,
    noteName: String,
    content: String,
    isPublic: Boolean
}

const noteSchema = new mongoose.Schema({
    ownerId: {
        type: String,
        required: true
    },
    noteName: {
        type: String,
        required: true
    },
    content: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        required: true,
        default: false
    }
})

const noteDb = mongoose.model<INote>('Note', noteSchema)

export default noteDb;