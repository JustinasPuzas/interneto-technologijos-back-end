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
const noteMutation = {
    createNote: {
        type: core_1.NoteType,
        args: {
            noteName: { type: graphql_1.GraphQLString },
            content: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!request.user)
                    return null;
                const { noteName, content, isPublic } = args;
                if (!noteName)
                    return null;
                const note = yield noteDb_1.default.create({ ownerId: request.user.id, noteName, content });
                return note;
            });
        },
    },
    updateNoteContent: {
        type: core_1.NoteType,
        args: {
            _id: { type: graphql_1.GraphQLString },
            content: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!request.user)
                    return null;
                const note = yield noteDb_1.default.findOneAndUpdate({ _id: args._id }, { content: args.content }, { new: true });
                if (!note)
                    return false;
                return note;
            });
        }
    },
    updateNoteName: {
        type: core_1.NoteType,
        args: {
            _id: { type: graphql_1.GraphQLString },
            noteName: { type: graphql_1.GraphQLString }
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!request.user)
                    return null;
                const note = yield noteDb_1.default.findOneAndUpdate({ _id: args._id }, { noteName: args.noteName }, { new: true });
                if (!note)
                    return false;
                return note;
            });
        }
    },
    deleteNote: {
        type: core_1.NoteType,
        args: {
            _id: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!request.user)
                    return null;
                const note = yield noteDb_1.default.findOneAndDelete({ _id: args._id });
                if (!note)
                    return false;
                return null;
            });
        }
    }
};
exports.default = noteMutation;
