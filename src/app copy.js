import express from 'express'
import nunjucks from 'nunjucks'
import queryString from 'querystring'

import config from './config'
import router from './router'

let app = express()

app.use('/node_modules', express.static(config.node_modules_path))
app.use('/public', express.static(config.public_path))

//配置模板引擎
nunjucks.configure('views', {
    autoescape: true,
    express: app
});

//自定义中间件，类似于body-parse
app.use((req,res,next) => {
    let data = ''

    req.on('data', chunk => {
        data += chunk
    })

    req.on('end', () => {
        req.bodys = queryString.parse(data)
        next()
    })
})

app.use(router)

app.listen(3000,() => {
    console.log('running....')
})
