const db = require("../../models");
const { S3 } = require('../clients');
const { hashFile } = require('../utils/crypto');


const Document = db.Document;

exports.Document = Document;

exports.create = async (req, res) => {
    try{

        if(!req.body.username){
            res.status(400).send({
                message: "Username is required"
            });
        }

        if(!req.files){
            res.status(400).send({
                message: "No files"
            });
        }

        let username = req.body.username;
        let hashedFiles = req.files.map((file)=>{
            return hashFile(file)
        });    

        S3.uploadFiles(req.files, function(err, data){

            if(err.length > 0){
                throw err;
            }else{

                let documentsMetadata = data.map( (object, index) => {
                    console.log('on document metadata')
                    console.log(JSON.stringify(object))
                    
                    console.log(hashedFiles)

                    const document = new Document({
                        documentId: JSON.parse(object.ETag),
                        url: object.Location,
                        extension: object.Key.split('.')[object.Key.match(/\./g).length],
                        filename: object.Key.split('.')[0],
                        owner: username,
                        hash: hashedFiles[index]
                    })
     
                    document.save(document)
                    return document

                });

                res.status(201).send({
                    message: 'Document(s) successfully uploaded',
                    metadata: documentsMetadata
                });                
            }
        });
    } catch(e){
        res.status(500).send({
            message: e
        })
    }
};

exports.findAll = async (req, res, next) => {
    try{

        let Documents = await Document.find()

        S3.retrieveFiles(Documents, function(err, data){
            if(err.length > 0){
                next(err);
            }else{
                console.log('retrieved docs')
                
                let responseObject = []
                Documents.forEach( (document,index) =>{
                    responseObject.push(
                        {
                            file: data[index].Body.toString('utf-8'),
                            hash: document.hash,
                            filename: document.filename + '.' + document.extension,
                            documentId: document.documentId
                        }
                    );
                });
        
                res.status(200).send(responseObject)
            }
        })
    } catch(e){
        res.status(500).send({
            message: e
        })
    }
};

exports.findOne = async (req, res) => {
    try{

        if(!req.params.documentId){
            res.status(400).send({
                messsage: "Document ID is required"
            })
        }
        else{
            let documentId = req.params.documentId
            const document = await Document.find({
                id: documentId
            })
    
            res.status(200).send(document)
        }
      } catch(e){
          res.status(500).send({
              message: e
          })
      }  
};

exports.update = (req, res) => {
  
};

exports.delete = (req, res) => {
  
};

exports.deleteAll = (req, res) => {
  
};

exports.findAllPublished = (req, res) => {
  
};