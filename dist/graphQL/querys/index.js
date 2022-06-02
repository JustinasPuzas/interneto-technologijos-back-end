"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const userQuery_1 = __importDefault(require("./userQuery"));
const noteQuery_1 = __importDefault(require("./noteQuery"));
const RootQuery = new graphql_1.GraphQLObjectType({
    name: "RootQueryType",
    fields: Object.assign(Object.assign({}, userQuery_1.default), noteQuery_1.default),
});
exports.default = RootQuery;
