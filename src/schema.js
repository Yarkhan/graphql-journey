import {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList
} from 'graphql'

import db from './db.js'
import Models from './models'
import {resolver, defaultArgsList} from 'graphql-sequelize'

const query = new GraphQLObjectType({
    name: "Query",
    description: "Root Query Type",
    fields: () => Object.assign({},...Object.keys(Models).map(name => Models[name].queries))
})

const mutation = new GraphQLObjectType({
    name: "Mutation",
    description: "Root Mutation Type",
    fields: () => Object.assign({},...Object.keys(Models).map(name => Models[name].mutations))
})

db.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(function(results) {
   return db.sync({force:true})
}).then(function(){
    db.query('SET FOREIGN_KEY_CHECKS = 1',{raw: true})
})

export default new GraphQLSchema({
    query, mutation
})
