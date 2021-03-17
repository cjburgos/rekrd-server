module.exports = mongoose => {
    const Document = mongoose.model(
        'Document',
        mongoose.Schema({
            documentId: String,
            url: String,
            extension: String,
            filename: String,
            owner: String,
            hash: String
        },
        {
            timestamps: true
        })
    );

    return Document
    
}