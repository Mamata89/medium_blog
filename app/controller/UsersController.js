const express = require('express')


const router = express.Router()
const { User } = require('../model/User') 
const { authenticateUser } = require('../middlewares/authentication') 




//localhost:3000/users/register
router.post('/register',function(req, res){
    const body = req.body
    const user = new User(body)
   console.log(user.isNew)
    user.save()
        .then(function(user){
            // console.log(user.isNew)
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.get('/users' , function(req,res){
    User.find()
        .then(function(user){
            res.send(user)
        })
        .catch(function(err){
            res.send(err)
        })
})


//localhost:3000/users/login
router.post('/login',function(req, res){
    const body = req.body
    User.findByCredentials(body.email,body.password)
        .then(function(user){
            return user.generateToken()
        })
        .then(function(token){
           // res.send(token)
           res.send({token})
        })
        .catch(function(err){
            
            res.send(err)
        })
})
router.post('/bookmark' , authenticateUser , function(req,res){
    const story_id = req.body.id
    User.findOne({
          _id : req.user._id
      })
          .then(function(user){
              user.bookmark.push(story_id)
              user.save()
                   .then(function(user){
                      res.send(user)
                  })
          })
          .catch(function(err){
              res.send(err)
          })
   })
   router.post('/follow' , authenticateUser , function(req , res){
    const id = req.body.id   //geeeta  story
          
   User.updateOne({
       _id : req.user._id  // mamata
   } , {
       $push : {
           following : id
           
       }
   }).populate('following').populate('followers')
   .then(function(user){
       res.send(user)
   })
   .catch(function(err){
       console.log("error", err)
   })

   User.updateOne({
       _id : id
   } , {
       $push : {
           followers : req.user._id
       }
   }).populate('following').populate('followers')
   .then(function(user){
       res.send(user)
   })
   .catch(function(err){
       console.log("error", err)
   })
  
})

router.get('/bookmark' , authenticateUser , function(req,res){
    User.findOne(
        { _id : req.user._id}
        ).populate('bookmark')
           .then(function(user){
               res.send(user.bookmark)
           })
           .catch(function(err){
               res.send(err)
           })
})
//localhost:3000/users/account
router.get('/account',authenticateUser,function(req,res){
    const { user } =req
     res.send(user)
  
})


//localhost:3000/users/logout
router.delete('/logout',authenticateUser,function(req,res){
   
    const { user, token } = req
    User.findByIdAndUpdate(user._id,{ $pull : {tokens :{token : token }}})
        .then(function(){
                res.send({notice : "successfully logegd out"})
        })
        .catch(function(err){
                res.send(err)
        })
})
module.exports = {
    usersRouter : router
}