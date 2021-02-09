const mongoose = require('mongoose');
const schema = mongoose.Schema;

const SousCategory = new schema(
    {
      nom: {
        type: String,
        required: true,
        trim: true
      },
      image :{
        type: String 
      },
      category: {
          type: mongoose.Schema.Types.ObjectId,
          ref : 'Category'
        }
    },
    {
      versionKey: false
  }
  );


  module.exports = mongoose.model("SousCategory", SousCategory);