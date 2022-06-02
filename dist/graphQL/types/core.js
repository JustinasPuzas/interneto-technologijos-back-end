"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteType = exports.UserType = void 0;
const graphql_1 = require("graphql");
exports.UserType = new graphql_1.GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: graphql_1.GraphQLString },
        userName: { type: graphql_1.GraphQLString },
        email: { type: graphql_1.GraphQLString },
        password: { type: graphql_1.GraphQLString },
    }),
});
exports.NoteType = new graphql_1.GraphQLObjectType({
    name: "Note",
    fields: () => ({
        _id: { type: graphql_1.GraphQLString },
        ownerId: { type: graphql_1.GraphQLString },
        noteName: { type: graphql_1.GraphQLString },
        content: { type: graphql_1.GraphQLString },
        isPublic: { type: graphql_1.GraphQLBoolean },
    }),
});
