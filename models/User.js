const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please add a name']
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please add an email'],
    match: [
      /^\w+([.-]?\w+)*@\w+\1*(\.\w{2,3})+$/,
      'Please add a valid email'
    ]
  },
  password: {
    type: String,
    required: [true, 'Please add a password'],
    minlength: 6,
    select: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  triggeredBy: {
    type: String,
    default: 'Daniel Simão'
  }
});

// Encrypt Password
UserSchema.pre('save', () => {
  const saltRounds = 10;
  const salt = bcrypt.genSaltSync(saltRounds);
  const hash = bcrypt.hashSync(this.password, salt);

  this.password = hash;
});

export.modules = mongoose.model('User', UserSchema);
