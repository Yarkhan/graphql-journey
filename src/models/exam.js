import db from '../db'
import Sequelize from 'sequelize'
import Student from './student'
import {resolver, attributeFields} from 'graphql-sequelize'
import * as graphql from 'graphql'


let model = db.define('exam',{
    score: Sequelize.INTEGER,
    class: Sequelize.STRING,
    name: Sequelize.STRING,
    lastUpdatedBy: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER,
})

Object.defineProperties(model,{
    student:{
        get: () => model.belongsTo(Student.model,{
            as: 'student'
        })
    }
})

const defaultAttrs = attributeFields(model,{
    exclude: ["createdAt","updatedAt","id","studentId"]
})

const type = new graphql.GraphQLObjectType({
    name: 'exam',
    fields: attributeFields(model)
})

const inputs = {}

inputs.examInput = new graphql.GraphQLInputObjectType({
    name:'examInput',
    fields: Object.assign(defaultAttrs,{
        studentId:{
            type: graphql.GraphQLInt
        }
    })
})

const queries = {}
const mutations = {
    createExam:{
        type,
        args:{
            exam: {
                type: inputs.examInput
            }
        },
        resolve: (root, args, context) => {
            let {studentId, ...exam} = args.exam;
            return Student.model.findById(studentId).then(student => {
                if(!student) return new Error('no student found:'+studentId)
                return model.create(exam)
            })
        }
    }
}

export default {
    type, model, queries, mutations, inputs
}
