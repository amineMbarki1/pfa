const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const userSchema = mongoose.Schema(
  {
    fullName: String,
    email: { type: String, unique: true },
    phone: { type: String, unique: true },
    vehiculeType: String,
    city: String,
    password: String,
    role: { type: String, default: 'client' },
    profilePic: String,
  },
  {
    toJSON: {
      transform: function (doc, ret) {
        delete ret.__v;
        delete ret.password;
      },
    },
  }
);

userSchema.pre('save', function (next) {
  if (this.password) this.password = bcrypt.hashSync(this.password, 10);
  next();
});

userSchema.methods.generateToken = function () {
  return jwt.sign({ id: this._id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRESIN,
  });
};

userSchema.methods.comparePassword = function (passowrd) {
  return bcrypt.compareSync(passowrd, this.password);
};

module.exports = mongoose.model('User', userSchema);
