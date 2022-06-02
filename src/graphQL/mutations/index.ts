import graphql, { GraphQLObjectType } from "graphql";
import userMutation from "./userMutation";
import noteMutation from "./noteMutation";

const RootMutation = new GraphQLObjectType({
  name: "mutation",
  fields: {
    ...userMutation,
    ...noteMutation
  },
});

export default RootMutation;
