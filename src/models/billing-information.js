import db from '../db'
import Sequelize from 'sequelize'
import Student from './student'
import {resolver, attributeFields} from 'graphql-sequelize'
import * as graphql from 'graphql'


let model = db.define('billingInformation',{
    name: Sequelize.STRING,
    lastName: Sequelize.STRING,
    birthDate: Sequelize.STRING,
    birthPlace: Sequelize.STRING,
    cpf: Sequelize.STRING,
    rg: Sequelize.STRING,
    rgEmitter: Sequelize.STRING,
    motherName: Sequelize.STRING,
    lastUpdatedBy: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER
})

Object.defineProperties(model,{
    student:{
        get: () => model.belongsTo(Student.model,{
            as: 'student'
        })
    }
})

const defaultAttrs = attributeFields(model,{
    exclude: ["createdAt","updatedAt","id"]
})

const type = new graphql.GraphQLObjectType({
    name: 'billingInformation',
    fields: attributeFields(model)
})

const inputs = {}

inputs.billingInformationInput = new graphql.GraphQLInputObjectType({
    name:'billingInformationInput',
    fields: defaultAttrs
})

const queries = {

}
const mutations = {

}

export default {
    type, model, queries, mutations, inputs
}
