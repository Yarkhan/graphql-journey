import {
    GraphQLBoolean,
    GraphQLString,
    GraphQLInt,
    GraphQLFloat,
    GraphQLObjectType,
    GraphQLInputObjectType,
    GraphQLSchema,
    GraphQLID,
    GraphQLNonNull,
    GraphQLList,
    printSchema
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

const inputs = Object.assign({},...Object.keys(Models).map(name => Models[name].inputs))

export default new GraphQLSchema({
    query, mutation, inputs
})
