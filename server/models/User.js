const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema({
  facebook_id: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: [true, 'Email already exist!']
  },
  role: String
}, {
  timestamps: true
})

userSchema.pre('save', function(next) {
  this.role = 'client'
  next()
})

const User = mongoose.model('User', userSchema)
module.exports = User