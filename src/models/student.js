import db from '../db'
import Sequelize from 'sequelize'
import Phone from './phone'
import Address from './address'
import BillingInformation from './billing-information'
import {resolver, attributeFields, defaultListArgs, defaultArgs} from 'graphql-sequelize'
import graphQLModel from '../graphql-model'
import {GraphQLList, GraphQLInt, GraphQLString, GraphQLInputObjectType, GraphQLObjectType} from 'graphql'
import Exam from './exam'
// Sequelize model definition
let model = db.define('student',{
    name: Sequelize.STRING,
    birthDate: Sequelize.INTEGER,
    lastUpdatedBy: Sequelize.INTEGER,
    createdBy: Sequelize.INTEGER,
})

//Sequelize model associations
Object.defineProperties(model,{
    phones:{
        get: () => model.belongsToMany(Phone.model,{
            as: 'phones',
            through: 'studentPhones'
        })
    },
    addresses:{
        get: () => model.belongsToMany(Address.model,{
            as: 'addresses',
            through: 'studentAddresses'
        })
    },
    billingInformation:{
        get: () => model.hasOne(BillingInformation.model)
    },
    exams:{
        get: () => model.hasMany(Exam.model,{
            as: 'exams'
        })
    }
})

//GraphQL type fields
const fields = () => Object.assign(attributeFields(model),{
    phones:{
        type: new GraphQLList(Phone.type),
        resolve: resolver(model.phones)
    },
    addresses:{
        type: new GraphQLList(Address.type),
        resolve: resolver(model.addresses)
    },
    billingInformation:{
        type: BillingInformation.type,
        resolve: resolver(model.billingInformation)
    },
    exams:{
        type: Exam.type,
        resolve: resolver(model.exams)
    }
})

//GraphQL Type definition
const type = new GraphQLObjectType({
    name: 'Student',
    description: 'A Student',
    fields
})

const mutations = {
    createStudent:{
        type,
        args:Object.assign({
            get phones() {
                return {type:new GraphQLList(Phone.inputs.phoneInput)}
            },
            get addresses(){
                return {type: new GraphQLList(Address.inputs.addressInput)}
            },
            get billingInformation(){
                return {type: BillingInformation.inputs.billingInformationInput}
            }
        },attributeFields(model,{
            exclude:["createdAt","updatedAt","id"]
        })),
        resolve: (root, args, context) => model.create(args,{
            include:[
                model.phones, model.addresses, model.billingInformation
            ]
        })
    }
}

const queries = {
    students:{
        type: new GraphQLList(type),
        description: 'list of students',
        args: Object.assign(defaultListArgs(model)),
        resolve: resolver(model)
    },
    student:{
        type,
        description: 'a student',
        args: Object.assign(defaultArgs(model)),
        resolve: resolver(model)
    }
}

export default {
    model, type, mutations, queries
}
