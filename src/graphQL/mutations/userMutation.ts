import graphql, {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UserType } from "../types/core";
import userDb from "../../dataBase/userDb";

const userMutation: graphql.Thunk<graphql.GraphQLFieldConfigMap<any, any>> = {
  updateUserName: {
    type: UserType,
    args: {
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parent, args) {},
  },
  updatePassword: {
    type: UserType,
    args: {
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parent, args) {},
  },
  updateEmail: {
    type: UserType,
    args: {
      userName: { type: GraphQLString },
      email: { type: GraphQLString },
      password: { type: GraphQLString },
    },
    resolve(parent, args) {},
  },
};

export default userMutation;
