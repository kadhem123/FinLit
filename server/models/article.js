const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

var articleSchema = new mongoose.Schema({
   
    title: {
        type: String,
        required: 'Body can\'t be empty',
        unique: true
    },
    category: {
        type: String,
        
    },
    body: {
        type: String,
        required: 'Body can\'t be empty',
    },
  
    saltSecret: String
});
mongoose.model('Article', articleSchema);