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
   product: id
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
    var doc = await axios.get(`http://localhost:3000/api/panier/`);
    var body= document.getElementById("tbody");
    var data = doc.data;
    console.log("data est " + JSON.stringify(data));
    if(data.length>0){
        for (let i = 0; i < data.length; i++) {

body.innerHTML +=`
           
                              
                                    <tr class="text-center">
                                        <td class="product-remove">
                                            <a href="panier.php?action=supprimer&idp=" title="panier - supprimer produit"><i class="fas fa-trash-alt"></i></span></a>
                                        </td>
                                        <td class="image-prod">
                                            
                                        </td>
                                        <td class="product-name">
                                            <h3>${data[i]._id}</h3>
                                        </td>
                                        <td class="price"> ${data[i].prix}</td>
                                        <td class="quantity">
                                            <div class="input-group mb-3">
                                           
                                                <input class="quantity form-control input-number" max="" min="1" name="quantity" id="inputQ" onchange="" type="number" value="">
                                            </div>
                                        </td>
                                        <td class="total"></td>
                                    </tr>
                               `;
                              /*  </tbody>
                            </table>
                            <a class="btn btn-primary py-3 px-4 float-right" href="panier.php">Mettre à jour </a>
                        </div>
                    </div>
                </div>
                <div class="row justify-content-center">
                    <div class="col col-lg-5 col-md-6 mt-5 cart-wrap ftco-animate">
                        <div class="cart-total mb-3">
                            <h3>Totaux du panier</h3>
                            <p class="d-flex"><span>Total</span> <span>.00 DHs</span></p>
                            <p class="d-flex"><span>Livraison</span> <span>20.00 DHs</span></p>
                            <hr>
                            <p class="d-flex total-price"><span>Total</span> <span>.00 DHs</span></p>
                        </div>
                        <p class="text-center"><a class="btn btn-primary py-3 px-4" href="checkout.php" title="Payment">Passer à la caisse</a></p>
                    </div>
                </div>
             
            </div>
        </section>*/
        }
    }else{
        body.innerHTML +=`<tr class="text-center">
        Vide
        </tr>`;
    }
        
body.innerHTML +=`
 </tbody>

`;

}
