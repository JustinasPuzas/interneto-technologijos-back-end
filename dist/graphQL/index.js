"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const querys_1 = __importDefault(require("./querys"));
const mutations_1 = __importDefault(require("./mutations"));
const MyGraphQLSchema = new graphql_1.GraphQLSchema({ query: querys_1.default, mutation: mutations_1.default });
exports.default = MyGraphQLSchema;
