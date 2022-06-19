import graphql, {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLBoolean,
} from "graphql";
import { UserType, NoteType } from "../types/core";
import noteDb from "../../dataBase/noteDb";

const MAX_NOTE_NAME_LENGTH = 100;

const noteMutation: graphql.Thunk<graphql.GraphQLFieldConfigMap<any, any>> = {
  createNote: {
    type: NoteType,
    args: {
      noteName: { type: GraphQLString },
      content: { type: GraphQLString },
    },
    async resolve(parent, args, request) {
      try {
        if (!request.user) throw new Error(`User isn't loged in`);

        const { noteName, content } = args;

        if (!noteName) throw new Error(`Note name wasn't provided`);
        if (noteName.length > MAX_NOTE_NAME_LENGTH)
          throw new Error(`Note name length can't be longer than 100 symbols`);

        return await noteDb.create({
          ownerId: request.user.id,
          noteName,
          content,
        });
      } catch (err) {
        throw new Error(`${err}`);
      }
    },
  },

  updateNoteContent: {
    type: NoteType,
    args: {
      _id: { type: GraphQLString },
      content: { type: GraphQLString },
    },
    async resolve(parent, args, request) {
      try {
        if (!request.user) throw new Error(`User isn't loged in`);

        const note = await noteDb.findOne({ _id: args._id });
        if (!note) throw new Error(`Couldn't find a note with id: ${args._id}`);

        if (note.ownerId != request.user.id)
          throw new Error(`You don't have permission to edit this note`);

        return await noteDb.findOneAndUpdate(
          { _id: args._id },
          { content: args.content },
          { new: true }
        );
      } catch (err) {
        throw new Error(`${err}`);
      }
    },
  },

  updateNoteName: {
    type: NoteType,
    args: {
      _id: { type: GraphQLString },
      noteName: { type: GraphQLString },
    },
    async resolve(parent, args, request) {
      try {
        if (!request.user) throw new Error(`User isn't loged in`);

        const note = await noteDb.findOne({ _id: args._id });
        if (!note) throw new Error(`Couldn't find a note with id: ${args._id}`);
        if (note.ownerId != request.user.id)
          throw new Error(`You don't have permission to edit this note`);

        if (args.noteName.length > MAX_NOTE_NAME_LENGTH)
          throw new Error(
            `Note name cannot br longer than ${MAX_NOTE_NAME_LENGTH} symbols`
          );

        return await noteDb.findOneAndUpdate(
          { _id: args._id },
          { noteName: args.noteName },
          { new: true }
        );
      } catch (err) {
        console.log(err)
        throw new Error(`${err}`);
      }
    },
  },

  deleteNote: {
    type: NoteType,
    args: {
      _id: { type: GraphQLString },
    },
    async resolve(parent, args, request) {
      try {
        if (!request.user) throw new Error(`User isn't loged in`);

        const note = await noteDb.findOne({ _id: args._id });
        if (!note) throw new Error(`Couldn't find a note with id: ${args._id}`);
        if (note.ownerId != request.user.id) throw new Error(`You don't have permission to edit this note`);

        return await noteDb.findOneAndDelete({ _id: args._id });
      } catch (err) {
        throw new Error(`${err}`);
      }
    },
  },
};

export default noteMutation;
