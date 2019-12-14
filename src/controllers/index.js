import express from 'express'
import advert from '../models/advert'

const router = express.Router()

router.get('/',(req,res,next) => {
    res.render('index.html')
})

export default router
