import graphql, { GraphQLObjectType } from "graphql";
import userQuery from "./userQuery";
import noteQuery from "./noteQuery";

const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    ...userQuery,
    ...noteQuery
  },
});

export default RootQuery;
