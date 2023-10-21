const mongoose = require('mongoose') 

const dataSchema = mongoose.Schema({
    title:{
        type: String,
        required: true
    },
    genre:{
        type: String,
        required: true
    },
    duration: {
        type: String,
        required: true
    },
    banner: {
        type: String,
        required: true
    },
    description:{
        type: String,
        required: true
    },
})

const DataModel = mongoose.model('moviesRecord', dataSchema)

module.exports = DataModel