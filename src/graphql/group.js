import models from '../models/'
const {
    group:Group
} = models
const typeDefs = `
    type Group {
        id: Int
        name: String
        students: [Student]
    }
`

const queries = `
    group(id:Int): Group
    groups: [Group]
`

const mutations = {

}

const resolvers = {
    Query:{
        group: (root,args,ctx) => models.group.find({where:args}),
        groups: (root,args,ctx) => Group.findAll()
    },
    Group:{
        students: group => group.getStudents()
    }
}

export default {
    queries, typeDefs, mutations, resolvers
}
