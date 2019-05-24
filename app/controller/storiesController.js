const express = require('express')
const  multer = require('multer')


const router= express.Router()
const { Stories } = require('../model/stories')

const { authenticateUser } = require('../middlewares/authentication')

const storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, './uploads/')
    },
    filename:function(req,file, cb){
        cb(null,  file.originalname)
    }
 
    
})


const fileFilter = (req,file, cb) => {
    //to reject a file if it is not of proper format

    if(file.mimetype === 'image/jpeg' || file.mimetype === 'image/png'){
        cb(null,true)
    }else{
        cb(null, false)
    }
  

   
}
const upload = multer({
    storage : storage,
    limits:{
        fileSize: 1024 * 1024 * 5
    },
    fileFilter : fileFilter
})

router.get('/', authenticateUser , function(req, res){
    Stories.find({
        user : req.user._id
    })
        .then(function(stories){
            res.send(stories)
        })
        .catch(function(err){
            res.send(err)
        })
})


router.get('/public' , function(req,res){
    Stories.find()
        .then(function(stories){
            res.send(stories)
        })
        .catch(function(err){
            res.send(err)
        })

})
// router.get('/public' , function(req,res){
//     Stories.find()
//         .then(function(stories){
//             res.send(stories)
//         })
//         .catch(function(err){
//             res.send(err)
//         })

// })

// router.get('public/:id' , function(req,res){
//     const id = req.params.id
//     Stories.findOne({
//         _id : id
//     }).populate('user').populate('topic').populate('tag').populate('response')
//         .then(response = (story)=> {
//             res.send(story)
//         })
//         .catch(err => res.send(err))
// })
  
router.get('/:id', authenticateUser ,function(req, res){
    const id=req.params.id

    Stories.findOne({
        user : req.user._id,
        _id : id
    }).populate('topic').populate('user').populate('tag').populate('responses')
        .then(function(story){
            console.log(story)
            if(story){
                res.send(story)
            }else{
                res.send({})
            }
        })
        .catch(function(err){
            res.send(err)
        })
})

router.post('/',upload.single('storyImage'),authenticateUser ,function(req, res){
   console.log(req.file)
 const imageUrl = "http://localhost:3005"+req.file.destination.slice(1, (req.file.destination.length))+req.file.filename
   console.log(imageUrl)
   // const body = req.body
    
    const story=new Stories({
        title : req.body.title,
        createdAt: req.body.createdAt,
        body : req.body.body,
        topic : req.body.topic,
        tag : req.body.tag,
        storyImage : imageUrl
    })
    console.log("story details",story)
    story.user = req.user._id

    
    story.save()
        .then(function(story){
            res.send(story)
            
        })
        .catch(function(err){
            res.send(err)
        })
})

router.delete('/:id', authenticateUser ,function(req, res){
    const id=req.params.id
    
    Stories.findOneAndDelete(
        {
            user : req.user._id,
            _id : id
        }
    )
        .then(function(story){
            res.send(story)
        })
        .catch(function(err){
            res.send(err)
        })
})

router.put('/:id', authenticateUser ,function(req, res){
    const id=req.params.id
    const body=req.body
    Stories.findOneAndUpdate({
        user : req.user._id,
        _id : id
    } , {$set : body} , {new: true , runValidators : true})
        .then(function(story){
            res.send(story)
        })
        .catch(function(err){
            res.send(err)
        })
})

module.exports = {
    storiesRouter : router
}


