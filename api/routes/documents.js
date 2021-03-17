const express = require('express');
const controller = require('../controller');
var multer = require('multer');

const documents = new express.Router();

var storage = multer.memoryStorage({
    destination: function(req,file,callback){
        callback(null,'');
    }
});

var multipleUpload = multer({ storage: storage }).array('file');

/**
 * @typedef Document
 * @property {string} owner.required
 * @property {string} file.required
 */

/**
 * @typedef PostNewDocuments
 * @property {Array.<Document>} Document.required
 */

 /**
 * Get All Documents
 * @group Documents
 * @route Get /documents
 * @produces application/json
 * @operationId retrieveAllDocuments
 * @returns {string} 200 - Success
 * @returns {Error} 500 - Internal server error
 */
documents.get('/', ( req, res, next) => {
    console.log('HTTP GET /documents')
    controller.documents.findAll(req,res,next)
})

/**
 * Create New Document
 * @group Documents
 * @route POST /documents
 * @produces application/json
 * @operationId createNewDocument(s)
 * @param {PostNewDocuments.model} body.body.required - request body
 * @returns {string} 201 - Created
 * @returns {Error} 500 - Internal server error
 */
documents.post('/', multipleUpload, ( req, res, next) => {
    console.log('HTTP POST /documents')
    console.log('Request received:',req.body)
    controller.documents.create(req,res,next)
})

module.exports = documents