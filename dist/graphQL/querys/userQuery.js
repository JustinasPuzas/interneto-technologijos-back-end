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
const userDb_1 = __importDefault(require("../../dataBase/userDb"));
const userQuery = {
    getAllUsers: {
        // return all registered users in Array
        type: new graphql_1.GraphQLList(core_1.UserType),
        args: {},
        resolve(parent, args) {
            return __awaiter(this, void 0, void 0, function* () {
                const UserArray = yield userDb_1.default.find();
                return UserArray;
            });
        },
    },
    getUser: {
        type: core_1.UserType,
        args: {},
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                if (!request.user)
                    return null;
                const user = yield userDb_1.default.findOne({ _id: request.user.id });
                return user;
            });
        }
    },
    getUserByEmail: {
        // return single user by email
        type: core_1.UserType,
        args: { email: { type: graphql_1.GraphQLString } },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                const User = yield userDb_1.default.findOne({ email: args.email });
                return User;
            });
        },
    },
    getUserByUserName: {
        // return list of users with same userName
        type: new graphql_1.GraphQLList(core_1.UserType),
        args: { userName: { type: graphql_1.GraphQLString } },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                const UserArray = yield userDb_1.default.find({ userName: args.userName });
                return UserArray;
            });
        },
    },
    getUserById: {
        // returns one User by _Id
        type: core_1.UserType,
        args: { id: { type: graphql_1.GraphQLString } },
        resolve(parent, args, request) {
            return __awaiter(this, void 0, void 0, function* () {
                const User = yield userDb_1.default.findOne({ _id: args.id });
                return User;
            });
        },
    },
};
exports.default = userQuery;
