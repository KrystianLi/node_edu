import formidable from 'formidable'
import config from '../config'

export default function (req) {
    return new Promise((resolve, reject) => {
        var form = new formidable.IncomingForm()
        form.uploadDir = config.upload_path // 配置 formidable 文件上传接收路径
        form.keepExtensions = true // 配置保持文件原始的扩展名
        form.parse(req, function (err, fields, files) {
            if(err){
                reject(err)
            }
            resolve([fields,files])
        })
    })
}
