const mongoose = require('mongoose');
const {ObjectId} = require('mongodb');
const schema = mongoose.Schema;

const PanierSchema = new schema({

    
         
      
            Quantity: {
                type: Number,
                required: true,
                trim: true
        },
         produit: {
            type: ObjectId,
            ref: 'Products'
        }
     
}, 
{
  versionKey: false
});


module.exports = mongoose.model('Panier', PanierSchema);