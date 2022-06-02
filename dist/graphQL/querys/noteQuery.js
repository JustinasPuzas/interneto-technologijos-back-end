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
const noteQuery = {
    getUserNotes: {
        type: new graphql_1.GraphQLList(core_1.NoteType),
        args: {},
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!request.user)
                    return null;
                const notes = yield noteDb_1.default.find({ ownerId: request.user.id });
                return notes;
            });
        },
    },
    getNote: {
        type: new graphql_1.GraphQLList(core_1.NoteType),
        args: {
            _id: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                const note = yield noteDb_1.default.findOne({ _id: args._id });
                if (note === null || note === void 0 ? void 0 : note.isPublic)
                    return note;
                if ((note === null || note === void 0 ? void 0 : note.ownerId) == (request === null || request === void 0 ? void 0 : request.user.id))
                    return note;
                return null;
            });
        },
    },
};
exports.default = noteQuery;
