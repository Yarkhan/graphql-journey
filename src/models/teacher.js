import db from '../db'
import Sequelize from 'sequelize'
import Course from './course'
import Phone from './phone'
import {resolver} from 'graphql-sequelize'
import graphQLModel from '../graphql-model'

const attributes = {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
}

let model = db.define('teacher',attributes)

Object.defineProperties(model,{
    course:{
        get: () => model.hasMany(Course.model,{as: 'course'})
    },
    phones:{
        get: () => model.hasMany(Phone.model, {as: 'phones'})
    }
})

export default graphQLModel.create({
    model: model,
    fields: () => ({
        course: {
            type: Course.type,
            resolve: resolver(model.course)
        }
    })
})
