const mongoose = require('mongoose');

const profileSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  list: {
    type: [Number],
    default: [],
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Profile', profileSchema);