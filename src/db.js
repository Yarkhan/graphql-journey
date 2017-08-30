import Sequelize from 'sequelize'

const db = new Sequelize('database', 'username', 'password', {
  host: 'localhost',
  dialect: 'sqlite',
  storage: './database.sqlite'
});

export default db
