import express from 'express'
import advert from '../models/advert'

const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('index.html')
})

//adver page
router.get('/advert',(req,res) => {
    advert.find((err,data) => {
        if(err){
            return next(err)
        }
        res.send(data)
    })
})

// findOne advert by id
router.get('/advert/one/:advertId',(req,res,next) => {
    advert.findOne({_id:req.params.advertId},(err,data) => {
        if(err){
            return next(err)
        }
        res.send(data)
    })
})

// advert insert page
router.get('/advert/add',(req,res) => {
})

//advert insert request
router.post('/advert/add',(req,res,next) => {
    let advertDoc = new advert(req.body)
    advertDoc.save(err => {
        if(err){
            return next(err)
        }
        res.send('success')
    })
})

//advert edite page
router.get('/advert/edite/:advertId',(req,res) => {
    advert.findOne({_id:req.params.advertId},(err,data) => {
        if(err){
            return next(err)
        }
        res.send(data)
    })
})

//advert edite request
router.post('/advert/edite',(req,res,next) => {
    advert.findByIdAndUpdate(req.body.id,req.body,(err,data) => {
        if(err){
            return next(err)
        }
        res.send(data)
    })
})

//advert delete request
router.get('/advert/del/:advertId',(req,res,next) => {
    advert.deleteOne({_id:req.params.advertId},(err,data) => {
        if(err){
            return next(err)
        }
        res.send(data)
    })
})

export default router
