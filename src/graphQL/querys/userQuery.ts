import graphql, {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UserType } from "../types/core";
import userDb from "../../dataBase/userDb";

const userQuery: graphql.Thunk<graphql.GraphQLFieldConfigMap<any, any>> = {
  getAllUsers: {
    // return all registered users in Array
    type: new GraphQLList(UserType),
    args: {},
    async resolve(parent, args) {
      const UserArray = await userDb.find();
      return UserArray;
    },
  },

  getUser: {
    type: UserType,
    args: {},
    async resolve(parent, args, request){
        if(!request.user) return null
        const user = await userDb.findOne({_id: request.user.id})
        return user
    }
  },

  getUserByEmail: {
    // return single user by email
    type: UserType,
    args: { email: { type: GraphQLString } },
    async resolve(parent, args, request) {
      const User = await userDb.findOne({ email: args.email });

      return User;
    },
  },

  getUserByUserName: {
    // return list of users with same userName
    type: new GraphQLList(UserType),
    args: { userName: { type: GraphQLString } },
    async resolve(parent, args, request) {
      const UserArray = await userDb.find({ userName: args.userName });

      return UserArray;
    },
  },

  getUserById: {
    // returns one User by _Id
    type: UserType,
    args: { id: { type: GraphQLString } },
    async resolve(parent, args, request) {
      const User = await userDb.findOne({ _id: args.id });

      return User;
    },
  },
};

export default userQuery;
