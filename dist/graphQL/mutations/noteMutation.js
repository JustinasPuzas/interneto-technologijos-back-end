"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const core_1 = require("../types/core");
const noteDb_1 = __importDefault(require("../../dataBase/noteDb"));
const MAX_NOTE_NAME_LENGTH = 100;
const noteMutation = {
    createNote: {
        type: core_1.NoteType,
        args: {
            noteName: { type: graphql_1.GraphQLString },
            content: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!request.user)
                        throw new Error(`User isn't loged in`);
                    const { noteName, content } = args;
                    if (!noteName)
                        throw new Error(`Note name wasn't provided`);
                    if (noteName.length > MAX_NOTE_NAME_LENGTH)
                        throw new Error(`Note name length can't be longer than 100 symbols`);
                    return yield noteDb_1.default.create({
                        ownerId: request.user.id,
                        noteName,
                        content,
                    });
                }
                catch (err) {
                    throw new Error(`${err}`);
                }
            });
        },
    },
    updateNoteContent: {
        type: core_1.NoteType,
        args: {
            _id: { type: graphql_1.GraphQLString },
            content: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!request.user)
                        throw new Error(`User isn't loged in`);
                    const note = yield noteDb_1.default.findOne({ _id: args._id });
                    if (!note)
                        throw new Error(`Couldn't find a note with id: ${args._id}`);
                    if (note.ownerId != request.user.id)
                        throw new Error(`You don't have permission to edit this note`);
                    return yield noteDb_1.default.findOneAndUpdate({ _id: args._id }, { content: args.content }, { new: true });
                }
                catch (err) {
                    throw new Error(`${err}`);
                }
            });
        },
    },
    updateNoteName: {
        type: core_1.NoteType,
        args: {
            _id: { type: graphql_1.GraphQLString },
            noteName: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!request.user)
                        throw new Error(`User isn't loged in`);
                    const note = yield noteDb_1.default.findOne({ _id: args._id });
                    if (!note)
                        throw new Error(`Couldn't find a note with id: ${args._id}`);
                    if (note.ownerId != request.user.id)
                        throw new Error(`You don't have permission to edit this note`);
                    if (args.noteName.length > MAX_NOTE_NAME_LENGTH)
                        throw new Error(`Note name cannot br longer than ${MAX_NOTE_NAME_LENGTH} symbols`);
                    return yield noteDb_1.default.findOneAndUpdate({ _id: args._id }, { noteName: args.noteName }, { new: true });
                }
                catch (err) {
                    console.log(err);
                    throw new Error(`${err}`);
                }
            });
        },
    },
    deleteNote: {
        type: core_1.NoteType,
        args: {
            _id: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                try {
                    if (!request.user)
                        throw new Error(`User isn't loged in`);
                    const note = yield noteDb_1.default.findOne({ _id: args._id });
                    if (!note)
                        throw new Error(`Couldn't find a note with id: ${args._id}`);
                    if (note.ownerId != request.user.id)
                        throw new Error(`You don't have permission to edit this note`);
                    return yield noteDb_1.default.findOneAndDelete({ _id: args._id });
                }
                catch (err) {
                    throw new Error(`${err}`);
                }
            });
        },
    },
};
exports.default = noteMutation;
