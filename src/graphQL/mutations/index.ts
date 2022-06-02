import graphql,  {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from "graphql"
import {UserType} from '../types/core'

const RootMutation = new GraphQLObjectType({
    name: "RootMutation",
    fields: {
        updateUserName:  {
            type: UserType,
            args: {
                userName: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent, args) {

            }
        },
        updatePassword:  {
            type: UserType,
            args: {
                userName: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent, args) {

            }
        },
        updateEmail:  {
            type: UserType,
            args: {
                userName: {type: GraphQLString},
                email: {type: GraphQLString},
                password: {type: GraphQLString},
            },
            resolve(parent, args) {

            }
        }
    }
})


export default RootMutation;