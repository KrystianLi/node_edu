import express from 'express'
import nunjucks from 'nunjucks'
import bodyParser from 'body-parser'

import config from './config'
import error_log from './middlewares/error_log'
import advertRouter from './router/advert'
import indexRouter from './router/index'

let app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))
app.use('/upload', express.static(config.upload_path))

//配置模板引擎
nunjucks.configure('views', {
    autoescape: true,
    express: app,
    noCache: true
});
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
// parse application/json
app.use(bodyParser.json())

app.use(advertRouter)
app.use(indexRouter)
app.use(error_log)

app.listen(3000,() => {
    console.log('running....')
})
