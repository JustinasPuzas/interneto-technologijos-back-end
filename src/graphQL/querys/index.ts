import graphql,  {GraphQLObjectType, GraphQLInt, GraphQLString, GraphQLList} from "graphql"
import {UserType} from '../types/core'
import userDb from "../../dataBase/userDb"


const RootQuery = new GraphQLObjectType({
    name: "RootQueryType",
    fields: {

        getAllUsers: { // return all registered users in Array
            type: new GraphQLList(UserType),
            args: {},
            async resolve(parent, args){
                    const UserArray = await userDb.find()
                return UserArray;}},

        getUserByEmail: { // return single user by email
            type: UserType,
            args: {email: { type: GraphQLString}},
            async resolve(parent, args){
                const User = await userDb.findOne({email: args.email});
                
                return User;}},

        getUserByUserName: { // return list of users with same userName
            type: new GraphQLList(UserType),
            args: {userName: { type: GraphQLString}},
            async resolve(parent, args){
                const UserArray = await userDb.find({userName: args.userName});
                
                return UserArray;}},

        getUserById: { // returns one User by _Id
            type: UserType,
            args: {id: { type: GraphQLString}},
            async resolve(parent, args){
                const User = await userDb.findOne({_id: args.id});
                
                return User; }},
        
        
        
    }
})

export default RootQuery;