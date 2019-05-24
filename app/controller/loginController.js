const express = require('express')
const { Stories } = require('../model/stories')


const router = express.Router()


router.get('/story' , function(req,res){
    Stories.find()
        .then(function(stories){
            res.send(stories)
        })
        .catch(function(err){
            res.send(err)
        })

})

router.get('/story/:id' , function(req,res){
    const id = req.params.id
    Stories.findOne({
        _id : id
    }).populate('user').populate('topic').populate('tag').populate('response')
        .then(response = (story)=> {
            res.send(story)
        })
        .catch(err => res.send(err))
})

module.exports = {
    loginPublicRouter : router 
}