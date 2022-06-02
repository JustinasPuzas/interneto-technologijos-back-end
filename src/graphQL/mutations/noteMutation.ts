import graphql, {
    GraphQLObjectType,
    GraphQLInt,
    GraphQLString,
    GraphQLList,
    GraphQLBoolean,
  } from "graphql";
  import { UserType, NoteType } from "../types/core";
  import noteDb from "../../dataBase/noteDb";
  
  const noteMutation: graphql.Thunk<graphql.GraphQLFieldConfigMap<any, any>> = {
    createNote: {
      type: NoteType,
      args: {
        noteName: { type: GraphQLString },
        content: { type: GraphQLString },
      },
      async resolve(parent, args, request) {
        if(!request.user) return null;
        const {noteName, content, isPublic} = args;
        if(!noteName) return null;
        const note = await noteDb.create({ownerId: request.user.id, noteName, content})
        return note;
      },
    },

    updateNoteContent: {
        type: NoteType,
        args: {
            _id: { type: GraphQLString },
            content: {type: GraphQLString}
        },
        async resolve(parent, args, request){
            if(!request.user) return null;
            const note = await noteDb.findOneAndUpdate({_id: args._id},{content: args.content},{new: true})
            if(!note) return false
            return note
        }
    },

    updateNoteName: {
        type: NoteType,
        args: {
            _id: { type: GraphQLString },
            noteName: {type: GraphQLString}
        },
        async resolve(parent, args, request){
            if(!request.user) return null;
            const note = await noteDb.findOneAndUpdate({_id: args._id},{noteName: args.noteName},{new: true})
            if(!note) return false
            return note
        }
    },

    deleteNote: {
        type: NoteType,
        args: {
            _id: { type: GraphQLString },
        },
        async resolve(parent, args, request){
            if(!request.user) return null;
            const note = await noteDb.findOneAndDelete({_id: args._id})
            if(!note) return false
            return null
        }
    }

  };
  
  export default noteMutation;
  