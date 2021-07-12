const mongoose = require('mongoose')

const setupSchema = mongoose.Schema({
  mode: {type: String, required: true},
  urlEndpoint: {type:String, required: true}
})

module.exports = mongoose.model('Setup', setupSchema)


