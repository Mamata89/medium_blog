//nnmpm install --save express
const express = require('express')
const cors = require('cors')


const {mongoose} = require('./config/database')


const {usersRouter} = require('./app/controller/UsersController')

const {topicsRouter} = require('./app/controller/topicController')
const {storiesRouter} = require('./app/controller/storiesController')
const {tagsRouter} = require('./app/controller/tagscontroller')
const  {responseRouter} = require('./app/controller/responseController')
const { publicRouter} = require('./app/controller/publicController')
// const {loginPublicRouter} = require('./app/controller/loginController')
const port =  3005
const app = express()

app.use(express.json())
app.use(cors())
// app.use('/contacts',contactsRouter)
// app.use('/notes',notesRouter)
app.use('/uploads', express.static(__dirname + '/uploads'));
app.use('/users',usersRouter)
app.use('/topics',topicsRouter)
app.use('/stories',storiesRouter)
// app.use('/login',loginPublicRouter)
app.use('/story',publicRouter)
app.use('/tags',tagsRouter)
app.use('/responses',responseRouter)

app.listen(port,function(){
    console.log("listening to port",port)
})





