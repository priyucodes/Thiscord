const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: [true, 'hey enough about me lets focus on you'],
    lowercase: true,
    // validate: [validator.isEmail, 'Please enter a valid email'], by installing validator package
  },
  username: { type: String, required: [true, 'Please enter a valid username'] },
  password: { type: String, required: [true, 'Please enter a valid password'] },
});

module.exports = mongoose.model('user', userSchema);
