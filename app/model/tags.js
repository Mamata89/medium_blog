const mongoose = require('mongoose')

const Schema=mongoose.Schema

const tagsSchema = new Schema({
    tag : {
        type :String,
        required : true 
    }
})

const Tags = mongoose.model('Tags',tagsSchema)

module.exports ={
    Tags
}