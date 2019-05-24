//DB Configuration
const mongoose = require('mongoose')
mongoose.Promise = global.Promise
// mongoose.connect('mongodb://localhost:27017/medium-app',{useNewUrlParser:true})
//mongoose.connect('mongodb://localhost:27017/medium-app1',{useNewUrlParser:true})
mongoose.connect('mongodb://localhost:27017/medium-final',{useNewUrlParser:true})
    .then(function(){
        console.log('Connected to db')
    }) 
    .catch(function(){
        console.log('OOPS !!! Something went wrong in DB Connection')
    })

module.exports={
        mongoose
}