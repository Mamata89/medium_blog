const express =require('express')
const mongoose = require('mongoose')
const Schema = mongoose.Schema
const { User } = require('./User')

const { Topic } = require('./topic')
const { Tags } = require('./tags')
const{ responseSchema } = require('./response')

const storiesSchema = new Schema({
        title:{
            type:String,
            required:true,
       
        },
        body:{
            type:String,
            required:true,
            unique:true
        },
        createdAt:{
                type:Date,
                default:Date.now
            },
       
        user:{
            type:Schema.Types.ObjectId,
            ref: 'User'
        },
        topic:{
            type:Schema.Types.ObjectId,
            ref: 'Topic'
        },
        tag:[{
            type:Schema.Types.ObjectId,
            ref: 'Tags'
        }],
        storyImage:{
            type:String, required:true
        },
        responses:[responseSchema]
})


const Stories= mongoose.model('Stories',storiesSchema )
module.exports = {
    Stories
}