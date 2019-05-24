const express = require('express')
const router = express.Router()

const {Stories} = require('../model/stories')

router.get('/',function(req,res){
    // will return all the documenst in the collection
    Stories.find()
        .then(function(stories){
            res.send(stories)
        })
        .catch(function(err){

                res.send(err)
        })
    })
    
  
router.get('/:id', function(req, res){
    const id=req.params.id
    console.log(id)
    Stories.findOne({
        _id:id
    }).populate('topic').populate('user').populate('tag').populate('responses')
        .then(function(story){
           console.log(story)
            res.send(story)
        })
        .catch((err)=>{
            res.send(err)
        })
})


router.get('/loginstory/:id' , function(req,res){
    const id = req.params.id
    Stories.findOne({
        _id : id
    }).populate('user').populate('topic').populate('tag').populate('response')
        .then(response = (story)=> {
            res.send(story)
        })
        .catch(err => res.send(err))
})
module.exports ={
    publicRouter : router
}