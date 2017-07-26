import Sequelize from 'sequelize'

const db = new Sequelize('cec', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

db.query('SET FOREIGN_KEY_CHECKS = 0', {raw: true}).then(function(results) {
   return db.sync({force:true})
}).then(function(){
    db.query('SET FOREIGN_KEY_CHECKS = 1',{raw: true})
})

export default db
