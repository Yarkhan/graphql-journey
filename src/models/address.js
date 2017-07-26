import db from '../db'
import Sequelize from 'sequelize'
import Student from './student'
import {resolver, attributeFields} from 'graphql-sequelize'
import * as graphql from 'graphql'


let model = db.define('address',{
    state: Sequelize.STRING,
    city: Sequelize.STRING,
    town: Sequelize.STRING,
    number: Sequelize.STRING,
    code: Sequelize.STRING,
    street: Sequelize.STRING,
    lastUpdatedBy: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER
})

Object.defineProperties(model,{
    student:{
        get: () => model.belongsToMany(Student.model,{
            as: 'student',
            through: 'studentAddresses'
        })
    }
})

const defaultAttrs = attributeFields(model,{
    exclude: ["createdAt","updatedAt","id"]
})

const type = new graphql.GraphQLObjectType({
    name: 'address',
    fields: attributeFields(model)
})

const inputs = {}

inputs.addressInput = new graphql.GraphQLInputObjectType({
    name:'addressInput',
    fields: defaultAttrs
})

const queries = {

}
const mutations = {

}

export default {
    type, model, queries, mutations, inputs
}
