import db from '../db'
import Sequelize from 'sequelize'
import Course from './course'
import Phone from './phone'
import {resolver} from 'graphql-sequelize'
import graphQLModel from '../graphql-model'
import {GraphQLList, GraphQLInt, GraphQLString} from 'graphql'
const attributes = {
    name: Sequelize.STRING,
    age: Sequelize.INTEGER
}

let model = db.define('student',attributes)

Object.defineProperties(model,{
    course:{
        get: () => model.belongsTo(Course.model,{as: 'course'})
    },
    phones:{
        get: () => model.hasMany(Phone.model, {as: 'phones'})
    }
})

export default graphQLModel.create({
    model: model,
    create:{
        fields: () =>({
            name: GraphQLString
        }),
        resolve: () => ({
            name: 'toba',
            id: 666
        })
    },
    fields: () => ({
        course: {
            type: Course.type,
            resolve: resolver(model.course)
        },
        phones:{
            type: new GraphQLList(Phone.type),
            resolve: resolver(model.phones)
        }
    })
})
