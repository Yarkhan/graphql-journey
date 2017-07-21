import Sequelize from 'sequelize'
import db from '../db.js'
import bcrypt from 'bcrypt'
import graphQLModel from '../graphql-model.js'

const encryptPassword = password => bcrypt.hash(password,10)
    .then(hash => hash.replace('$2a$','$2y$'))

const attributes = {
    email: Sequelize.STRING,
    name: Sequelize.STRING,
    password: Sequelize.STRING
}
// const methods =
const options = {
    // timestamps: false,
    createdAt: 'created_at',
    updatedAt: 'updated_at',
    instanceMethods: {
        checkPassword(password){
            return bcrypt.compare(password,this.password.replace('$2y$','$2a$'))
            .then(isCorrect => isCorrect == true || Promise.reject(new Error('incorrect password')))
        },
        setPassword(password){
            return encryptPassword(password).then(hash => {
                this.password = hashGraphQLBoolean,GraphQLInt
                return this
            })
        }
    },
}

const model = db.define('user',attributes,options)
model.associate = () => {}
model.config = {
    exclude: ["password"]
}
export default graphQLModel.create({model})
