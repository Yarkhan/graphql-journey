import db from '../db'
import Sequelize from 'sequelize'
import Student from './student'
import {resolver, attributeFields, defaultArgs, defaultListArgs} from 'graphql-sequelize'
import * as graphql from 'graphql'


let model = db.define('exam',{
    score: Sequelize.INTEGER,
    class: Sequelize.STRING,
    name: Sequelize.STRING,
    studentId: Sequelize.INTEGER,
    lastUpdatedBy: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER
})

Object.defineProperties(model,{
    student:{
        get: () => model.belongsTo(Student.model)
    }
})

const defaultAttrs = attributeFields(model,{
    exclude: ["createdAt","updatedAt","id"]
})

const fields = () => Object.assign(attributeFields(model),{
    student: {
        type: Student.type,
        resolve: resolver(model.student)
    }
})

const type = new graphql.GraphQLObjectType({
    name: 'exam',
    fields
})

const inputs = {}


inputs.examInput = new graphql.GraphQLInputObjectType({
    name:'examInput',
    fields: Object.assign(defaultAttrs,{
        studentId: {
            type: graphql.GraphQLInt
        }
    })
})

const queries = {
    exams: {
        type: new graphql.GraphQLList(type),
        args: Object.assign(defaultListArgs(model)),
        resolve: resolver(model)
    }
}
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
                    .then(createdExam => student.addExam(createdExam) && createdExam)
            })
        }
    }
}

export default {
    type, model, queries, mutations, inputs
}
