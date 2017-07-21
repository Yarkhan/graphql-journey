import Sequelize from 'sequelize'
import db from '../db.js'
import graphQLModel from '../graphql-model.js'
import Student from './student'
import {resolver} from 'graphql-sequelize'
import {GraphQLList} from 'graphql'

const attributes = {
    name: Sequelize.STRING
}

let model = db.define('course',attributes)

Object.defineProperties(model,{
    'students':{
        get:() => model.hasMany(Student.model,{as: 'student'})
    },
    'teacher':{
        get:() => model.belongsTo(Teacher.model,{as:'teacher'})
    }
})

export default graphQLModel.create({
    model: model,
    fields:() => ({
        students:{
            type: new GraphQLList(Student.type),
            resolve: resolver(model.students)
        }
    })
})
