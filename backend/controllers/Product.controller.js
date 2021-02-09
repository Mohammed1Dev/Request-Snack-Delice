const { response } = require('express');
const { count } = require('../models/Category.model');
const Category = require('../models/Category.model');
const SouCategory= require('../models/Category.model');
const Product= require('../models/Product.model');
//List Category
const listProduct= async(req,resp,next)=>{
    let list = await Product.find();
    try{
        resp.json(list);
    }catch(err){
       resp.json({
           message: "Sorry table Product vide"
       });
    }
}
const removeAll=(req,res,next)=>{
     Product.remove().then(response=>{
         res.json({
             message:"remove all"
         });
     }).catch(err=>{
res.json({
    message:"Error ! "
})
     });
}
//list Product => SouCategory
const ProductSouCategorie= (req,res,next)=>{
    let IdSouCategory= req.params.id;
    Product.find({
        souCategory:IdSouCategory
    }).then(response =>{
        res.json({
        response })
    }).catch(err=>{
        res.json({
            message:"Sorry dont find this id "
        });
    })
}

//Add product 
const Add= (req,res,next)=>{
    let product= new Product({
      nom : req.body.nom,
      prix:req.body.prix,
      ingrediens:req.body.ingrediens,
      Quantity:req.body.Quantity,
      codePromo:req.body.codePromo,
      image:req.body.image,
      souCategory: req.body.souCategory,
    });
    product.save().then(
        ()=>{
            res.json({
                message:"Ajouter Avec Succesfuly"
            });
        }).catch(err=>{
            res.json({
                message:"Error !" 
            });
        });
}
const UpdateProduct=(req,res,next)=>{
    let IdProduct= req.params.id;
    let UpdateProduit={
        nom : req.body.nom,
        prix:req.body.prix,
        ingrediens:req.body.ingrediens,
        Quantity:req.body.Quantity,
        codePromo:req.body.codePromo,
        image:req.body.image,
        souCategory: req.body.souCategory
    };
    Product.findByIdAndUpdate(IdProduct,{$set:UpdateProduit}).then(response =>{
        res.json({
        message:"update avec succes" });
    }).catch(err=>{
        res.json({
            message:"Sorry dont find this id "
        });
    })
}
var productDetail= (req,res,next)=>{
    let idProduct = req.params.id;
    Product.find({
        _id:idProduct
    }).then(response=>{
res.json(response);
    }).catch(err=>{
        res.json({
            message:"sorry dont find this product !"
        });
    })

}
module.exports={
    listProduct,ProductSouCategorie,Add,removeAll,UpdateProduct,productDetail
}