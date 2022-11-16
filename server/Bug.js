const mongoose = require('mongoose')

const bugSchema = new mongoose.Schema({
    id:{
        type:Number
    },
  title: {
    type: String
  },
  description: {
    type: String
  },
  priority: {
    type: String
  },
  status: {
    type: String
  },
  done: {
    type: Boolean,
    default: false
  }
})

module.exports = mongoose.model('Bug', bugSchema);