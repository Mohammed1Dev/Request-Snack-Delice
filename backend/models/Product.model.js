const mongoose = require('mongoose');
const schema = mongoose.Schema;

const Product = new schema({

    
        nom: {
            type: String,
            required: true,
            trim: true
        },
        prix: {
            type: Number,
            required: true
           
        },
        ingrediens: {
            type: String,
            required: true,
            trim: true
        },
        Quantity: {
            type: Number,
            required: true,
            trim: true
        },
        codePromo: {
            type: String,
        },
        image: {
            type: String
        }, 
        souCategory: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'SousCategory'
        }
     
}, 
{
  versionKey: false
});


module.exports = mongoose.model('Product', Product);