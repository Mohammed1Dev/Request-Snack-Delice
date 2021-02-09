const { response } = require('express');
const SouCategory = require('../models/SouCategory.model');
//List Category
const listSouCategory= async(req,resp,next)=>{
    let list = await SouCategory.find();
    try{
        resp.json(list);
    }catch(err){
       resp.json({
           message: "Sorry table SouCategory  vide"
       });
    }
}
//List souCategory =>Category
const SouCat=(req,resp,next)=>{
  let IdCategory = req.params.id;
    SouCategory.find({
        category:IdCategory
    }).then(response =>{
        resp.json({
            response
        });
    }).catch(err=>{
        resp.json({
            message:"list categorie et vide "
        });
    })
}
//Add Categorie 
const Add= (req,res,next)=>{
    let souCategory= new SouCategory({
      nom : req.body.nom,
      image:req.body.image,
      category: req.body.category,
    });
    souCategory.save().then(
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
const deleteSouCategorie = (req,res,next)=>{
const idSouCategory = req.params.id;
SouCategory.findByIdAndRemove(idSouCategory).then(()=>{
    res.json({
        message:"supprimer avec succes"
    })
}).catch(err=>{
    res.json({
        message :"Error !"
    })
})
}
module.exports={
    listSouCategory,Add,SouCat,deleteSouCategorie
}