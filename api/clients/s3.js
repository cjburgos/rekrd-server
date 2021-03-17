const AWS = require('aws-sdk');
const config = require('../../config');

const DOCUMENTS_BUCKET = config.DOCUMENTS_BUCKET;

const s3 = new AWS.S3({
    accessKeyId: config.aws.key,
    secretAccessKey: config.aws.secret,
    region: config.aws.s3.region
})

function uploadFiles(files, callback){
    let uploaded = []
    let errors = []
    files.map((item,index) => {
        var params = {
            Bucket: DOCUMENTS_BUCKET,
            Key: item.originalname,
            Body: item.buffer
        };
        console.log('Invoking S3 upload with Params: ', params);
        s3.upload(params,function(err,data){
            if(err){
                errors.push(err)
            }
            else{
                uploaded.push(data)
            }
            if(uploaded.length == files.length){
                callback(errors,uploaded)
            }
        });
    });
};

function retrieveFiles(files, callback){
    let retrieved = [];
    let errors = [];
    files.map((file,index) => {
        var params = {
            Bucket: DOCUMENTS_BUCKET,
            Key:   file.filename + '.' + file.extension
        }
        console.log('Invoking S3 upload with Params: ', params);
        s3.getObject(params,function(err,data){
            if(err){
                errors.push(err)
                retrieved.push({})
            }
            else{
                retrieved.push(data)
            }
            if(retrieved.length == files.length){
                callback(errors, retrieved)
            }   
        });
    });
}

module.exports = {
    uploadFiles,
    retrieveFiles
}