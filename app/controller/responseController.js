const express = require('express')
const router = express.Router()
const { authenticateUser } = require('../middlewares/authentication')
const { Response} = require('../model/response')
const {Stories } =require('../model/stories')

router.get('/:id',function(req, res){
    const id= req.params.id
    Stories.findById(id).populate('responses.user')
    .then((story) => res.send(story.responses))
    .catch((err) => res.send(err))
 
 
 })
 

router.post('/:id',authenticateUser, function(req, res){
        const body =req.body
        const id= req.params.id
        const response= new Response(body)
        response.user = req.user._id
        Stories.findById(id)
            .then((story) => {
                    story.responses.push(response)
                    story.save()
                        .then(story => res.send(story.responses))
                        .catch((err) => res.send(err))


            })
            .catch((err) => {
                 res.send(err)
            })
       
})



module.exports ={
    responseRouter : router
}