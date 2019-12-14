//错误日志记录，此中间件一定要使用再路由挂载之后
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost:27017/edu', { useNewUrlParser: true });

const Schema = mongoose.Schema

const errorSchema = new Schema({
    name: {
        type: String
    },
    message: {
        type: String
    },
    stack: {
        type: String
    },
    time: {
        type: Date,
        default: Date.now
    }
})

const Error = mongoose.model('Error_log', errorSchema)

export default (error_log, req, res, next) => {
    let errorDoc = new Error({
        name: error_log.name,
        message: error_log.message,
        stack: error_log.stack,
    })
    errorDoc.save(err => {
        res.json({
            err_code: 500,
            message: error_log.message
        })
    })
} 