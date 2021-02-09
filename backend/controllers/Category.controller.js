const Category = require('../models/Category.model');
const { response } = require('express');

//List Category
const listCategory= async(req,resp,next)=>{
    let list = await Category.find();
    try{
        resp.json(list);
    }catch(err){
       resp.json({
           message: "Sorry table Categorie  vide"
       });
    }
}
//Add Categorie 
const Add= (req,res,next)=>{
    let category= new Category({
      nom : req.body.nom  
    });
    category.save().then(
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
module.exports={
    listCategory,Add
}