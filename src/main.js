
import server from './server.js'
// import Student from './models/student'
// import Group from './models/group'
import db from './db.js'
//
const startServer = ()=>{
    server.listen(3000);
    // Student.model.create({
    //     firstName: 'Foo',
    //     group:{
    //         name: 'Fooa'
    //     }
    // },{
    //     include: ['group']
    // })

}

db.sync({force:false}).then(startServer)

// import Models from './models'
// console.log(Models)
