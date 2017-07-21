import path from 'path'
import express from 'express'
import graphqlHTTP from 'express-graphql'
import schema from './schema.js'
var app = express();
app.use('/graphql', graphqlHTTP((req,res)=>({
    schema: schema,
    graphiql: true
})));
app.listen(4000);

// import Models from './models'

// console.log(
//     Object.assign({},...Object.keys(Models).map(name => Models[name].queries))
// )
