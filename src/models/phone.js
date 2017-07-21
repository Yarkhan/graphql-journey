import db from '../db'
import Sequelize from 'sequelize'
import Course from './course'
import Student from './student'
import {resolver} from 'graphql-sequelize'
import graphQLModel from '../graphql-model'

const attributes = {
    number: Sequelize.STRING
}

let model = db.define('phone',attributes)

Object.defineProperties(model,{
    student:{
        get: () => model.belongsTo(Student.model,{
            as: 'phones'
        })
    }
})

export default graphQLModel.create({
    model,
    fields: () => ({
        students: {
            type: Student.type,
            resolve: resolver(model.student)
        }
    })
})
