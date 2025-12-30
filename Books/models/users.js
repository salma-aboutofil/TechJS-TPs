const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  }
});

userSchema.pre('save', async function (next) {
  const user = this;

  if (user.isModified('password')) {
    const salt = await bcrypt.genSalt(10); 
    user.password = await bcrypt.hash(user.password, salt); 
  }

  next();
});
const User = mongoose.model('users', userSchema);

module.exports = User;
