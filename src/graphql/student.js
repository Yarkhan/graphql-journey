import models from '../models/'
import group from './group'
const {
    student:Student,
    group:Group
} = models

const typeDefs = `
    type Student {
        id: Int
        firstName: String
        lastName: String
        group: Group
    }
`

const queries = `
    students: [Student]
`

const mutations = {

}

const resolvers = {
    Query:{
        students: () => Student.findAll()
    },
    Student:{
        group: student => student.getGroup()
    }
}

export default {
    queries, typeDefs, mutations, resolvers
}
