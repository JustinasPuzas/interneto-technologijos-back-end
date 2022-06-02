import graphql, {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    _id: { type: GraphQLString },
    userName: { type: GraphQLString },
    email: { type: GraphQLString },
    password: { type: GraphQLString },
  }),
});

export const NoteType = new GraphQLObjectType({
    name: "Note",
    fields: () => ({
      _id: { type: GraphQLString },
      ownerId: {type: GraphQLString},
      noteName: { type: GraphQLString },
      content: { type: GraphQLString },
      isPublic: { type: GraphQLBoolean },
    }),
  });
