"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const noteSchema = new mongoose_1.default.Schema({
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
});
const noteDb = mongoose_1.default.model('Note', noteSchema);
exports.default = noteDb;
