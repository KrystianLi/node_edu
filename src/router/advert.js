import express from 'express'
import advert from '../models/advert'
import formidable from 'formidable'
import config from '../../src/config'
import path, { basename } from 'path'
const router = express.Router()


//adver page
router.get('/advert', (req, res) => {
    const totalSize = 3
    const page =  Number.parseInt(req.query.page,10) || 1
    advert
        .find()
        .skip((page-1) * totalSize)
        .limit(totalSize)
        .exec((err, adverts) => {
            advert.count((err,data) => {
                const pageSize = Math.ceil(data / totalSize)  
                res.render('advert_list.html', {
                    adverts,
                    pageSize,
                    page
                })
            })
            
        })
})

// findOne advert by id
router.get('/advert/one/:advertId', (req, res, next) => {
    advert.findOne({ _id: req.params.advertId }, (err, data) => {
        if (err) {
            return next(err)
        }
        res.send(data)
    })
})

// advert insert page
router.get('/advert/add', (req, res) => {
    res.render('advert_add.html')
})

//advert insert request
router.post('/advert/add', (req, res, next) => {
    var form = new formidable.IncomingForm();
    form.uploadDir = config.upload_path // 配置 formidable 文件上传接收路径
    form.keepExtensions = true // 配置保持文件原始的扩展名
    form.parse(req, function (err, fields, files) {
        if (err) {
            return next(err)
        }
        fields.image = basename(files.image.path)
        let advertDoc = new advert(fields)
        advertDoc.save(err => {
            if (err) {
                return next(err)
            }
            res.json({
                error: 0
            })
        })

    });


})

//advert edite page
router.get('/advert/edite/:advertId', (req, res) => {
    advert.findOne({ _id: req.params.advertId }, (err, data) => {
        if (err) {
            return next(err)
        }
        res.send(data)
    })
})

//advert edite request
router.post('/advert/edite', (req, res, next) => {
    advert.findByIdAndUpdate(req.body.id, req.body, (err, data) => {
        if (err) {
            return next(err)
        }
        res.send(data)
    })
})

//advert delete request
router.get('/advert/del/:advertId', (req, res, next) => {
    advert.deleteOne({ _id: req.params.advertId }, (err, data) => {
        if (err) {
            return next(err)
        }
        res.redirect('/advert')
    })
})

export default router
