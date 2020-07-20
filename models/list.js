const mongoose = require('mongoose');

const listSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }],
  pokemon: {
    type: Number,
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('List', listSchema);