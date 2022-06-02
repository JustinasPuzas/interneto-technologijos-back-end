"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const userMutation_1 = __importDefault(require("./userMutation"));
const noteMutation_1 = __importDefault(require("./noteMutation"));
const RootMutation = new graphql_1.GraphQLObjectType({
    name: "mutation",
    fields: Object.assign(Object.assign({}, userMutation_1.default), noteMutation_1.default),
});
exports.default = RootMutation;
