import db from '../db'
import Sequelize from 'sequelize'
import Student from './student'
import {resolver, attributeFields} from 'graphql-sequelize'
import * as graphql from 'graphql'


let model = db.define('phone',{
    number: Sequelize.INTEGER,
    lastUpdatedBy: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER
})

Object.defineProperties(model,{
    student:{
        get: () => model.belongsToMany(Student.model,{
            as: 'student',
            through: 'studentPhones'
        })
    }
})

const defaultAttrs = attributeFields(model,{
    exclude: ["createdAt","updatedAt","id"]
})

const type = new graphql.GraphQLObjectType({
    name: 'phone',
    fields: attributeFields(model)
})

const inputs = {}

inputs.phoneInput = new graphql.GraphQLInputObjectType({
    name:'phoneInput',
    fields: defaultAttrs
})

const queries = {}
const mutations = {}

export default {
    type, model, queries, mutations, inputs
}
