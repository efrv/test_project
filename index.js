const express = require('express')
const db = require("typeorm");
const typeormConfig = require('./src/config/typeormconfig').default

const route_index = require('./src/routes/index')
const route_counterparts = require('./src/routes/counterparts.js')
const middlewares =  require("./src/middlewares/index");

//const http = require('http');

//const handlers = require('./back/handlers')

db.createConnection(typeormConfig).then(async connection =>{
    const app = express()

    init(app)

    setRoutes(app)

    errorHandling(app)

    const PORT = process.env.PORT || 3000;
    app.listen(PORT, () => {
        console.log(`Server has been started on port ${PORT}...`)
    })

}).catch(error => console.log("TypeORM connection error: ", error));


function init(app){
    //http.createServer(app)
    app.set('views', __dirname + '/src/views');
    //app.set('view engine', 'html');
    app.use('/static', express.static(__dirname +'/src/views/static'))
    app.use(express.json())
}

function setRoutes(app){
    app.use('/', route_index)
    app.use('/api/counterparts', route_counterparts)
}

function errorHandling(app){
    app.use(middlewares.errors.logErrors)
    app.use(middlewares.errors.clientErrorHandler)
    app.use(middlewares.errors.errorHandler)
}
