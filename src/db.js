import Sequelize from 'sequelize'

const db = new Sequelize('cec', 'root', '', {
    host: 'localhost',
    dialect: 'mysql'
})

export default db
