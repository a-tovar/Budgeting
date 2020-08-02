const mongoose = require('mongoose');

const Schema = mongoose.Schema;

// Create Schema
const DefaultCategorySchema = new Schema({
  name: {
    type: String,
    required: true,
  },
},
{
  timestamps: true
});

module.exports = DefaultCategory = mongoose.model('default_category', DefaultCategorySchema);
