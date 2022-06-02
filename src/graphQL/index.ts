import {GraphQLSchema} from "graphql"

import RootQuery from "./querys";
import RootMutation from './mutations'

const MyGraphQLSchema = new GraphQLSchema({query: RootQuery, mutation: RootMutation})

export default MyGraphQLSchema;