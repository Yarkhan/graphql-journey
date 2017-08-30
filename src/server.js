import express from 'express';
import bodyParser from 'body-parser';
import { graphqlExpress, graphiqlExpress } from 'apollo-server-express';
import {makeExecutableSchema, addResolveFunctionsToSchema} from 'graphql-tools'
import * as models from './models'
import student from './graphql/student.js'
import group from './graphql/group.js'

const test = [student,group]
var app = express();

app.use('/graphql', bodyParser.json(), graphqlExpress({
  schema: makeExecutableSchema({
    typeDefs: `
      type Query{
          hello: String
          ${test.map(a => a.queries).join("\n")}
      }
      type Mutation{
          login: String
      }
      ${test.map(a => a.typeDefs).join("\n")}
    `,
    resolvers: Object.assign({},{
        Query: Object.assign(
            {hello: () => 'world'},
            ...test.map(a => a.resolvers.Query)
        ),
        Mutation:{
            login: () => ''
        },
        ...test.reduce((a,b)=>{
            const {Query,Mutation,...resolvers} = b.resolvers
            return Object.assign(a,resolvers)
        },{})
    })
  })
}))
app.use('/graphiql', graphiqlExpress({
  endpointURL: '/graphql',
}));

export default app
