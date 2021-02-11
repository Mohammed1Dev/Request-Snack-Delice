const Panier = require('../models/Panier.model');
const Product =require('../models/Product.model');
const { response } = require('express');
const { json } = require('body-parser');
const { db } = require('../models/Product.model');


//list Product 
const listPanierProduct= async(req,resp,next)=>{
Panier.aggregate([{
        $lookup: {
            from: 'products', // collection name in db
            localField: 'produit',
            foreignField: '_id',
            as: 'product_panier'
        }
    }
]).exec(function(err, produits) {
        resp.json(produits);
       
    });

}
//List Panier
const listPanier= async(req,resp,next)=>{
    
    let list = await Panier.find();
    try{
        resp.json(list);
    }catch(err){
       resp.json({
           message: "Sorry table Panier  vide"
       });
    }
}

//Add Panier 
const Add= (req,res,next)=>{
    let panier= new Panier({
      Quantity:req.body.Quantity,
      produit : req.body.produit 
    });
    panier.save().then(response=>{
            res.json({
                message:"Ajouter Avec Succesfuly"
            });
        }).catch(err=>{
            res.json({
                message:"Error !" 
            });
        });
}
/*const findPanierProduct= (req,res,next)=>{
    var produit = req.body.produit;
    Panier.find({
        produit:produit
    }).then(response=>{
        res.json(response);
    }).then(err=>{
        res.json({
            message:"error"
        });
    })
}
*/
const updatePanier=(req,res,next)=>{
    let  id =req.params.id;
    let Updatepanier= {
        Quantity:req.body.Quantity
      };
    Panier.findByIdAndUpdate(id,{$set:Updatepanier}).then(response=>{
        res.json({
            message:"Update Successfuly"
        });
    }).catch(error=>{
        res.json({
            message:"Dont Update this Employee"
        });
    });
}

const deletePanier = (req,res,next)=>{
    let id = req.params.id;
    Panier.findByIdAndRemove(id).then(response=>{
        res.json({
            message:"supprimer avec success"
        });
    }).catch(err=>{
        res.json({
            message:"error ! "
        });
    })
}

//removeAll in panier

const removeAllPanier=(req,res,next)=>{
    Panier.remove().then(response=>{
        res.json({
            message:"remove all"
        });
    }).catch(err=>{
res.json({
   message:"Error ! "
})
    });
}
module.exports={
    listPanier,Add,listPanierProduct,updatePanier,deletePanier,removeAllPanier
}