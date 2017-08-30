import db from '../db.js'
import Sequelize from 'sequelize'

let model = db.define('student',{
        firstName: Sequelize.STRING,
        lastName: Sequelize.STRING,
        birthDate: Sequelize.DATE
})
model.associate = models => {
    model.group = model.belongsTo(models.group)
}
Object.defineProperties(model.prototype,{
    treta:{
        get: () => 'mds, que treta'
    }
})
export default model
