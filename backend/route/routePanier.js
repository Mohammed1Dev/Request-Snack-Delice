const express= require('express');
const panier= require('../controllers/Panier.controller');
const fs = require('fs');
var easyinvoice = require('easyinvoice');
const route = express.Router();
route.get("/panier",panier.listPanier);
route.get("/panierProduct",panier.listPanierProduct)
route.post("/addPanier",panier.Add);
route.post("/updatePanier/:id",panier.updatePanier);
route.get("/removePanier/:id",panier.deletePanier);
route.get("/removeAllPanier",panier.removeAllPanier)

route.get("/createPdf/:produitName",panier.Createpdf);

route.get('/', (req, res) => {

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
    "products":listProduct,
    "bottomNotice": `Kindly pay your invoice within 15 days and Price Total  = "La commande : ${commande}  .`
};

//Create your invoice! Easy!
easyinvoice.createInvoice(data, async function (result) {
    //The response will contain a base64 encoded PDF file
   
    // let pdfName ="" +  today  +'.pdf'
    await fs.writeFileSync('commande.pdf', result.pdf, 'base64');
   // res.send(data);
});

  
});
module.exports=route;