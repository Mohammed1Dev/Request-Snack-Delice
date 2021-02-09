const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Category = new schema(
    {
      nom: {
        type: String,
        required: true,
        trim: true,
        minlenght: 3
      }
      
    },
    {
      versionKey: false
  }
  );
  
 
  module.exports =  mongoose.model("Category", Category);