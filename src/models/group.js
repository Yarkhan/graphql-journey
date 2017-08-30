import db from '../db.js'
import Sequelize from 'sequelize'

let model = db.define('group',{
        name: Sequelize.STRING
})
model.associate = models => {
    model.group = model.hasMany(models['student'])
}
export default model
