fillLang(localStorage.getItem('Lang'));
 
  
async function getMenu() {
 var Category= document.getElementById('CategoryMenu');
 
 
  var doc = await axios.get('http://127.0.0.1:3000/api/Menu/');
  var data = doc.data;

 var  listCategory=` <li><a onclick="ListSouCategorie();" name="tout" id="SouCategoryList" >Tout</a></li>`;
  for (let i = 0; i < data.length; i++) {
     
     listCategory +=`<li><a onclick="getSouCategory('${data[i]._id}')" name="${data[i].nom}"  >${data[i].nom}</a></li>`;
   
  }
  Category.innerHTML += listCategory;
   document.getElementById('SouCategoryList').click();
}
//List SouCategorie
async function ListSouCategorie(){
   var SouCategory= document.getElementById('menu');
   SouCategory.innerHTML="";
   var list = await axios.get('http://127.0.0.1:3000/api/souCategory/');
  var data = list.data;
  var listCategory="";
  for (let i = 0; i < data.length; i++) {
     
      listCategory += `<a href="#" onclick="getListProduct('${data[i]._id}')"  >
           <img src="public/img/${data[i].image}" alt="" >
           <span>${data[i].nom}</span>
       </a>`;
    
   }
   SouCategory.innerHTML += listCategory;
}

//get list sous Categorie
async function getSouCategory(id) {
var SouCategory= document.getElementById('menu');
SouCategory.innerHTML="";
  var doc = await axios.get(`http://127.0.0.1:3000/api/souCategory/${id}`);
  var data = doc.data.response;
  var  listSouCategory ="";
for (let i = 0; i < data.length; i++) {
      console.log("data[i] " + data[i].nom);
       listSouCategory += `<a href="#" onclick="getListProduct('${data[i]._id}')" >
           <img src="public/img/${data[i].image}" alt="">
           <span>${data[i].nom}</span>
       </a>`;
       
  }
  SouCategory.innerHTML += listSouCategory;
  
}
//get list Product 
async function getListProduct(id) {
var product= document.getElementById('menu');
product.innerHTML="";
  var doc = await axios.get(`http://127.0.0.1:3000/api/product/${id}`);
  var data = doc.data.response;
if(data.length>0){
for (let i = 0; i < data.length; i++) {
      console.log("data[i] " + data[i].nom);
     var  listSouCategory = `<a href="#" onclick="ShowCart('${data[i]._id}');" data-toggle="modal" data-target="#exampleModalCenter" >
           <img src="public/img/${data[i].image}" alt="data[i].nom">
           <span><b>${data[i].nom}</b><br>
               </span>
           
       </a>`;
       product.innerHTML += listSouCategory;
  }
}else{
   product.innerHTML="<div style='margin:auto;'>Vide !</div> ";
}
  
}



//function Cart 
async function ShowCart(id){
  var modelPopup = document.getElementById('Model_body');
  modelPopup.innerHTML="";

  var doc = await axios.get(`http://127.0.0.1:3000/api/productDetails/${id}`);
  var data = doc.data;
if(data.length>0){
for (let i = 0; i < data.length; i++) {
      console.log("data[i] " + data[i].nom);
     var  showProduct = `  
 <div class="form-group">
<div class="row">
       <div class="col-md-6"><img src="public/img/${data[i].image}" class="png" alt="data[i].nom"></div>
       <div class="col-md ">
           <span><b>${data[i].nom}</b></span><br> </div
       </div>
        <div class="col-md-12">
           <div class="row">    
           <div class="col-md-12 mt-3"><p><b>ingrediens : </b><span> ${data[i].ingrediens}</span> </p></div>
           <div class="col-md-12 mt-3 "><p><b>Prix : </b><span> ${data[i].prix} DH</span> </p></div>

               </div>
               </div>
                  <div class="col-md-12">
                  <button type="submit" class="btn mx-auto" onclick="addPanier('${data[i]._id}');nbrPanier()" style=" background:linear-gradient(to right top, #65dfc9, #6cdbeb);" m-auto">Ajouter Panier</button>
             </div>
       </div>
       `;
       modelPopup.innerHTML += showProduct;
  }
}else{
   modelPopup.innerHTML="<div style='margin:auto;'>Vide !</div> ";
}
}

function addPanier(id){
axios.post('http://localhost:3000/api/addPanier', {
   Quantity:1,
   produit: id
   })
   .then(function (response) {
    console.log(response);
   })
.catch(function (error) {
   console.log(error);
   });
}

async function nbrPanier(){
       var NbrPanier = document.getElementById('panierNomber');
           

    var doc = await axios.get(`http://127.0.0.1:3000/api/panier/`);
    var data = doc.data;
    NbrPanier.innerHTML=data.length;
   ///console.log("this is " + data.length);
}


async function getAllPanier(){
    var doc = await axios.get(`http://localhost:3000/api/panierProduct/`);
    var body= document.getElementById("tbody");
    body.innerHTML="";
    var data = doc.data;
    console.log("data est " + JSON.stringify(data));

    if(data.length>0){
        for (let i = 0; i < data.length; i++) {
            console.log("data est : " + data[i].product_panier[0]);
    for(let j=0;j<data[i].product_panier.length;j++){
body.innerHTML +=`
           
                              
                                    <tr class="text-center">
                                        <td class="product-remove">
                                            <a href="#" title="delete - supprimer produit" onclick="deletePanierProduct('${data[i]._id}')"><img src="public/img/delete.png" style="width: 50px;" ></a>
                                        </td>
                                        <td class="image-prod">
										<div class="img" style="background-image:url(public/img/${data[i].product_panier[j].image});     width: 80px;
                                        height: 60px;
                                        background-size: cover;
                                        background-repeat: no-repeat;"></div>
									</td>
                                        <td class="product-name">
                                            <h3 class="produit_name">${data[i].product_panier[j].nom}</h3>
                                        </td>
                                        <td class="price"> ${data[i].product_panier[j].prix}</td>
                                        <td class="quantity">
                                            <div class="input-group mb-3">
                                           
                                                <input class="quantityPanier form-control input-number" max="${data[i].product_panier[j].Quantity}" min="1" onchange="changeFunction('${data[i]._id}',${data[i].product_panier[j].Quantity},this.value)" name="quantity" id="inputQ${data[i].product_panier[j]._id}"  type="number" value="${data[i].Quantity}">
                                            <input type="hidden" value="${data[i].product_panier[j]._id}" class="idProduit">
                                            <input type="hidden" value="${data[i].product_panier[j].Quantity}" class="lengthQuantity">
                                            
                                                </div>
                                        </td>
                                        <td class="total">
                                        <h3 ><span class="prixTotal" >${data[i].product_panier[j].prix * data[i].Quantity}</span> DH</h3>
                                        </td>
                                    </tr>
                               `;
                        

    }
        }
    }else{
        body.innerHTML +=`<tr class="text-center">
        Vide
        </tr>`;
    }
        
}


function prixTotalProduct(){
    let ListPromo=["12345","AZERTY"];
    var priceTotal=0;
    var total=0;
    var codePromo=document.getElementById("codePromo");
    var valuePromo=document.getElementById("Valuecode");
    var PrixTotalProduit=document.getElementsByClassName("prixTotal");
    var TotalPrixProduit=document.getElementById("Total");
    if(PrixTotalProduit.length>0){
for(var i=0;i<PrixTotalProduit.length;i++){
    if(codePromo.value === ListPromo[0]){

        priceTotal += parseInt(PrixTotalProduit[i].innerHTML)-parseInt(PrixTotalProduit[i].innerHTML)*0.1;
        total +=parseInt(PrixTotalProduit[i].innerHTML);
        TotalPrixProduit.innerHTML = total  + "DH";
        valuePromo.innerHTML="10";
        TotalPrixProduit.style = "text-decoration:line-through";
        document.getElementById("priceTotal").innerHTML= priceTotal + " DHs ";

    }else if(codePromo.value==ListPromo[1]){
        priceTotal +=parseInt(PrixTotalProduit[i].innerHTML)-parseInt(PrixTotalProduit[i].innerHTML)*0.3;
        total +=parseInt(PrixTotalProduit[i].innerHTML);
        TotalPrixProduit.innerHTML = total  + "DH";
        valuePromo.innerHTML="30";
        TotalPrixProduit.style = "text-decoration:line-through";
        document.getElementById("priceTotal").innerHTML= priceTotal + " DHs ";

    }else{
        priceTotal +=parseInt(PrixTotalProduit[i].innerHTML);
        TotalPrixProduit.style = "text-decoration:none";
        valuePromo.innerHTML="0";
         TotalPrixProduit.innerHTML =priceTotal + "DH";
         document.getElementById("priceTotal").innerHTML= priceTotal + ".00 DHs ";

    }
}
    
}
   
}

    //Change Quantity
    function changeFunction(id,quantityTota,quantite){
        var idp = id;
       // quantite = document.getElementById("inputQ" + idp).value;
        console.log("klkl " + quantite);
        if(quantityTota<=quantite && quantite<=0){
            alert("Sorry le nombre de quantity not exist ");
        }
        if(quantityTota>quantite){
     axios.post(`http://localhost:3000/api/updatePanier/${idp}`,{
            Quantity:quantite
    }).then(function(response){
        console.log("Update " + response);
        getAllPanier();
    }).catch(function(err){
        console.log(err);
    });
   
    
    }
}

//delete panier
async function deletePanierProduct(idp){
    var doc = await axios.get(`http://localhost:3000/api/removePanier/${idp}`);
    var supprimer = doc.data;
    getAllPanier();
   // location.href="MealsMenu.html";
}

//panier vider 

async function PanierVider(){
    var doc =await axios.get(`http://localhost:3000/api/removeAllPanier/`);
    document.getElementById("codePromo").innerHTML="";
    document.getElementById("Valuecode").innerHTML=""
 document.getElementsByClassName("prixTotal").innerHTML=""
   document.getElementById("Total").innerHTML="";
   document.getElementById("ShowModel").innerHTML="<p> Commande Valider ! ";
    var supprimer = doc.data;
  

}
//Download pdf Client - Side 

async function pdfDownload() {
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    

    today = mm + '-' + dd + '-' + yyyy;
    var valuePromo=document.getElementById("Valuecode");
    var price =   document.getElementsByClassName("price");
    var total = document.getElementsByClassName("prixTotal");
    var quantity =  document.getElementsByClassName("quantityPanier");
    var Produit_nom= document.getElementsByClassName("produit_name");
    var PrixTotal =document.getElementById("priceTotal");
    var TotalPrixProduit=document.getElementById("Total");
    var commande=``;
    var listProduct =[];
    var produitName="";
    for(var i=0;i<price.length;i++){
      var  product =  {
            "quantity": `${quantity[i].value}`,
            "description": `${Produit_nom[i].innerHTML}`,
            "tax": "%",
            "price": `${price[i].innerHTML} `
        }
        listProduct.push(product);
        produitName +=Produit_nom[i].innerHTML +" x " + quantity[i].value + " = " +total[i].innerHTML  + " ******** ";
    }
   produitName +="****  => Le prix Total est : = " + TotalPrixProduit.innerHTML+ " ,  Value promo : " +  valuePromo.innerHTML + " Prix Total (Value promo) est : " + PrixTotal.innerHTML + " **** ";
    commande =` ****  => Le prix Total est : = ${TotalPrixProduit.innerHTML} ,  Le Value promo :  ${valuePromo.innerHTML} %  , 
     le prix total(value promo ) : ${PrixTotal.innerHTML} `; 
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
        "bottomNotice": `Kindly pay your invoice within 15 days and Price Total  = ${commande} .`
    };
    
    //Create your invoice! Easy!
    easyinvoice.createInvoice(data, function (result) {
        easyinvoice.download("commande.pdf");
    });
    console.log("product " + produitName);
    var doc = await axios.get(`http://localhost:3000/api/createPdf/${produitName}`);
    
}

 function commandePasser() {

    var idProduit =   document.getElementsByClassName("idProduit");
    var lengthQuantity = document.getElementsByClassName("lengthQuantity");
    var  quantite=document.getElementsByClassName("quantityPanier");
    for(var i=0;i<idProduit.length;i++){
      axios.post(`http://localhost:3000/api/commandePasser/${idProduit[i].value}/${lengthQuantity[i].value}`,{
        Quantity:quantite[i].value
            }).then(function(response){
    PanierVider();
    }).catch(err=>{
    console.log("Error ! ");
    });
}

}


