const Panier = require('../models/Panier.model');
const Product =require('../models/Product.model');
const { response } = require('express');
const { json } = require('body-parser');
const { db } = require('../models/Product.model');
const fs = require('fs');
var easyinvoice = require('easyinvoice');
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
    
       res.json(response);
       
    }).catch(error=>{
        res.json({
            message:"Dont Update this panier"
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

//create pdf 
var i =1;
var Createpdf=(req, res, next)=>{
    //res.send('PDF');

    const produitName = req.params.produitName;
    //const lname = req.params;

    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    
    today = mm + '-' + dd + '-' + yyyy;
       
     // let id  = 33
     var data = {
        //"documentTitle": "RECEIPT", //Defaults to INVOICE
        "currency": "USD",
        "taxNotation": "vat", //or gst
        "marginTop": 25,
        "marginRight": 25,
        "marginLeft": 25,
        "marginBottom": 25,
        "logo": "../public/img/logo.png", //or base64
        //"logoExtension": "png", //only when logo is base64
        "sender": {
            "company": "Your Welcome",
            "address": "MOROCCO ",
            "zip": "1234 SAFI",
            "city": "SAFI",
            "country": "MOROCCO"
        },
        "client": {
               "company": "Client ",
               "address": "city safi MOROCCO  ",
               "zip": "4567 CD",
               "city": "SAFI",
               "country": "MOROCCO"
        },
        "invoiceNumber": "2020.0001",
        "invoiceDate": `${today}`,
        "bottomNotice": `produit | quantity | prix |  Value promo | prix Total  => "La commande : ${produitName}  .`
    };

    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, async function (result) {
        
        await fs.writeFileSync(`commande${i+1}.pdf`, result.pdf, 'base64');
       
    });

  
}
module.exports={
    listPanier,Add,listPanierProduct,updatePanier,deletePanier,removeAllPanier,Createpdf
}