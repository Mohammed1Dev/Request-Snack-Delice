const Panier = require('../models/Panier.model');
const Product =require('../models/Product.model');
const { response } = require('express');
const { json } = require('body-parser');


//list Product 
const listPanierProduct= async(req,resp,next)=>{
   let listPanier= Panier.find();
   try{

    let listProduit = await Product.find({_id:'60216c18f47b620994743b2b'});
   }catch(err){
       res.json({
           message:"error"
       });
   }
    
    try{
        resp.json(response=>{
            listProduit
        });
    }catch(err){
       resp.json({
           message: "Sorry table Panier  vide"
       });
    }
}
//List Panier
const listPanier= async(req,resp,next)=>{
    
    let list = await Panier.find({produit: req.panier.produit,
    _id: {$ne: req.panier._id}})
    .populate('produit');
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
module.exports={
    listPanier,Add,listPanierProduct
}