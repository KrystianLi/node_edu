import express from 'express'

import formidable from '../middlewares/formidable'
import advert from '../models/advert'
import config from '../../src/config'
import { basename } from 'path'
const router = express.Router()


//adver page  Sync
// router.get('/advert', (req, res) => {
//     const totalSize = 3
//     const page = Number.parseInt(req.query.page, 10) || 1
//     let adverts;
//     advert
//         .find()
//         .skip((page - 1) * totalSize)
//         .limit(totalSize)
//         .then(data => {
//             adverts = data
//             return advert.countDocuments()
//         })
//         .then(data => {
//             const pageSize = Math.ceil(data / totalSize)
//             res.render('advert_list.html', {
//                 adverts,
//                 pageSize,
//                 page
//             })
//         })
// })
//advert page asyns
router.get('/advert',(req,res) => {
    res.render('advert_list.html')
})

//get advert pageSize
router.get('/advert/count', (req, res) => {
    let {totalSize} = req.query
    advert
        .countDocuments()
        .then(data => {
            const pageSize = Math.ceil(data / totalSize)
            res.json({
                error_code:0,
                pageSize
            })
        })
})

//get total page data
router.get('/advert/list', (req,res,next) => {
    let {totalPage,totalSize} = req.query
    totalPage = Number.parseInt(totalPage,10)
    totalSize = Number.parseInt(totalSize,10)
    advert
        .find()
        .skip((totalPage-1) * totalSize)
        .limit(totalSize)
        .then(data => {
            res.json({
                adverts:data
            })
        })
})


// findOne advert by id
router.get('/advert/one/:advertId', (req, res, next) => {
    advert
        .findOne({ _id: req.params.advertId })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
})

// advert insert page
router.get('/advert/add', (req, res) => {
    res.render('advert_add.html')
})

//advert insert request
router.post('/advert/add', (req, res, next) => {

    formidable(req)
        .then(data => {
            const [fields, files] = data
            fields.image = basename(files.image.path)
            let advertDoc = new advert(fields)
            return advertDoc.save()
        })
        .then(data => {
            res.json({
                error: 0
            })
        })
        .catch(err => {
            next(err)
        })
})

//advert edite page
router.get('/advert/edite/:advertId', (req, res, next) => {
    advert
        .findOne({ _id: req.params.advertId })
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
})

//advert edite request
router.post('/advert/edite', (req, res, next) => {
    advert
        .findByIdAndUpdate(req.body.id, req.body)
        .then(data => {
            res.send(data)
        })
        .catch(err => {
            next(err)
        })
})

//advert delete request
router.get('/advert/del/:advertId', (req, res, next) => {
    advert
        .deleteOne({ _id: req.params.advertId })
        .then(data => {
            res.redirect('/advert')
        })
        .catch(err => {
            next(err)
        })
})

export default router
