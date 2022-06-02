"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("graphql");
const core_1 = require("../types/core");
const userMutation = {
    updateUserName: {
        type: core_1.UserType,
        args: {
            userName: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) { },
    },
    updatePassword: {
        type: core_1.UserType,
        args: {
            userName: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) { },
    },
    updateEmail: {
        type: core_1.UserType,
        args: {
            userName: { type: graphql_1.GraphQLString },
            email: { type: graphql_1.GraphQLString },
            password: { type: graphql_1.GraphQLString },
        },
        resolve(parent, args) { },
    },
};
exports.default = userMutation;
