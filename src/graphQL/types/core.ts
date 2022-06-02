import graphql,  {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from "graphql"

export const UserType = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        _id: { type: GraphQLString},
        userName: { type: GraphQLString},
        email: { type: GraphQLString},
        password: { type: GraphQLString},
    })
})