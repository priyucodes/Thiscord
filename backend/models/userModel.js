const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new mongoose.Schema({
  mail: {
    type: String,
    unique: [true, 'hey enough about me lets focus on you'],
    lowercase: true,
    // validate: [validator.isEmail, 'Please enter a valid email'], by installing validator package
  },
  username: { type: String, required: [true, 'Please enter a valid username'] },
  password: { type: String, required: [true, 'Please enter a valid password'] },
  friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
});

module.exports = mongoose.model('User', userSchema);
