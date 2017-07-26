// This may be useful - but it is on hold, for now
import {GraphQLObjectType,GraphQLInputObjectType,GraphQLList,GraphQLBoolean,GraphQLInt} from 'graphql'
import {attributeFields, resolver, defaultArgs, defaultListArgs} from 'graphql-sequelize'

const typeMaker = (model,config) => new GraphQLObjectType({
    name: model.options.name.singular,
    description: config.description,
    fields: () => Object.assign(
        attributeFields(model,config),
        config.fields && config.fields()
    )
})

const queryMaker = (model, config) => {
    let name = model.options.name,
        queries = {},
        mutations = {}

    queries[name.singular] = {
        description: `A single ${name.singular}`,
        type: config.type,
        resolve: resolver(model),
        args: Object.assign(
            defaultArgs(model)
        )
    }
    queries[name.plural] = {
        description: `A list of ${name.plural}`,
        type: new GraphQLList(config.type),
        resolve: resolver(model),
        args: Object.assign(
            defaultArgs(model),
            defaultListArgs(model)
        )
    }

    if(config.create != false){
        let create = config.create

        mutations[`${name.singular}Create`] = {
            name: create && create.name ||`${name.singular}Create`,
            description: create && create.description || `Creates a ${name.singular}`,
            type: create && create.type || config.type,
            args: Object.assign(
                attributeFields(model,{
                    exclude: ['id','createdAt','updatedAt']
                }),
                create && create.fields()
            ),
            resolve: (root,args,context,info) => (
                create && create.resolve(root,args,context,info) || model.create(args)
            )
        }
    }

    if(config.update != false){
        let update = config.update

        mutations[`${name.singular}Update`] = {
            name: update && update.name || `${name.singular}Update`,
            description: update && update.description || `updates a ${name.singular}`,
            type: update && update.type || config.type,
            args: Object.assign(
                attributeFields(model, update && update.config || {
                    exclude: ['createdAt','updatedAt']
                }),
                update && update.fields
            ),
            resolve: update && update.resolve || ((root,{id,...args},context,info) => {
                return model.update(args,{
                    where:{id}
                }).then(()=>{
                    return model.findOne({where:{id}})
                })
            })
        }
    }

    if(config.delete != false){
        let del = config.delete
        mutations[`${name.singular}Delete`] = {
            name: del && del.name || `${name.singular}Delete`,
            type: del && del.type || GraphQLBoolean,
            description: del && del.name || `deletes a ${name.singular}`,
            args: del && del.args || {
                id: {
                    type: GraphQLInt,
                    description: `${name.singular} to be deleted`
                }
            },
            resolve: del && del.resolve || ((root,{id}) => model.destroy({where:{id}}).then(Boolean))
        }
    }
    return {
        mutations: Object.assign(mutations,config.mutations),
        queries: Object.assign(queries,config.queries)
    }
}

const create = config => {
    config.type = typeMaker(config.model,config)
    let {queries,mutations} = queryMaker(config.model,config)
    return {
        type:config.type, queries, mutations, model:config.model, input: new GraphQLInputObjectType(config.type)
    }
}

export default {create}
