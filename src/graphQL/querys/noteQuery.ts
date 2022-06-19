import graphql, {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
} from "graphql";
import { UserType, NoteType } from "../types/core";
import noteDb from "../../dataBase/noteDb";

const noteQuery: graphql.Thunk<graphql.GraphQLFieldConfigMap<any, any>> = {
  getUserNotes: {
    type: new GraphQLList(NoteType),
    args: {},
    async resolve(parent, args, request) {
      if (!request.user) return null;
      
      const notes = await noteDb.find({ ownerId: request.user.id });
      return notes;
    },
  },

  getNote: {
    type: new GraphQLList(NoteType),
    args: {
      _id: { type: GraphQLString },
    },
    async resolve(parent, args, request) {
      const note = await noteDb.findOne({ _id: args._id });
      if (note?.isPublic) return note;
      if (note?.ownerId == request?.user.id) return note;
      return null;
    },
  },
};

export default noteQuery;
