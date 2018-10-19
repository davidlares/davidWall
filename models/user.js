// dependencies
const mongoose = require('mongoose')
const findOrCreate = require('mongoose-findorcreate')
const Schema = mongoose.Schema

// connect to database
mongoose.connect('mongodb://localhost/davidwall');
// define user Schema
var userSchema = new Schema({
  name: String,
  provider: String,
  uid: String,
  accessToken: String
});

// setting up findOrCreate Schema
userSchema.plugin(findOrCreate)
// create Model
var User = mongoose.model('user', userSchema)
// export Model
module.exports = User
