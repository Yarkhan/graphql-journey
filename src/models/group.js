import db from '../db'
import Sequelize from 'sequelize'
import Course from './course'
import Student from './student'
import {resolver} from 'graphql-sequelize'
import graphQLModel from '../graphql-model'

const attributes = {
    name: Sequelize.STRING
}

let model = db.define('group',attributes)

Object.defineProperties(model,{
    'course':{
        get: () => model.belongsTo(Course.model,{as: 'course'})
    },
    'students':{
        get: () => model.hasMany(Student.model,{as: 'students'})
    }
})

export default graphQLModel.create({
    model,
    fields: () => ({
        course: {
            type: Course.type,
            resolve: resolver(model.course)
        },
        students: {
            type: Student.type,
            resolve: resolver(model.students)
        }
    })
})
