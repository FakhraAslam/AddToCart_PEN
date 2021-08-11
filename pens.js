var total=0;

(function () {
 
  const cartInfo = document.getElementById("cart-info"); //cartinfo m us element ki sb classes or ids a jayn gi jis m ya id lgi hui h
  const cart = document.getElementById("cart");
  cartInfo.addEventListener("click", function () { 
    cart.classList.toggle("show-cart"); // classList hmy aik collection of css classes return krta h us element ki jis p cart id lgi hui h or phr ham khty hein k un sb classes ki bjay ab aik new class dynamically assign ho to us k liy toogle use hua h
    //toggle m jo css class di gai ho wo check krta h ager wo phly s exist krti h to usy remove kr k false return kr deta h or ager wo phly s exist nai krti us element p to usy add kr k true return krta h 
  });
})(); // junhi document load hota h ya function active ho jata h .


if (document.readyState == "loading") {
  document.addEventListener("DOMContentLoaded", ready);
} else {
  ready();
}

function ready() {
  var addToCartButtons = document.getElementsByClassName("ADD_TO_CART"); //In all elements where ADD-TO-CART is added all the elements with their classes and ids will enlist into addToCartButtons variable
  for (var i = 0; i < addToCartButtons.length; i++) { //in html doc there are 3 buttons containing this ADD-TO-CART id so length will be 3 _ if i will add more products there will more button then length will increase dynamically
    var button = addToCartButtons[i]; //on every iteration it will get a every button turn by turn from all 3 buttons and create a dynamic click listner of that button on every iteration
    button.addEventListener("click", addToCartClicked); //will create a listner for first button on first iteration . listner for 2nd button on second iteration and so on.
  }


  var quantityInputs = document.getElementsByClassName("cart-quantity-input");
  for (var i = 0; i < quantityInputs.length; i++) {
    var input = quantityInputs[i];
    input.addEventListener("change", quantityChanged);
  }

  /*remove items first part*/
  var removeCartItemButtons = document.getElementsByClassName("btn-danger");
  for (var i = 0; i < removeCartItemButtons.length; i++) {
    var button = removeCartItemButtons[i];
    button.addEventListener("click", removeCartItem);
  }
 /*end*/

  document
    .getElementsByClassName("btn-purchase")[0]
    .addEventListener("click", purchaseClicked);
}


function purchaseClicked(){
if(total==0){
  alert("Please Add products to cart to  make purchase");
}else{
  alert("Thank you for your purchase");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  while (cartItems.hasChildNodes()){
    cartItems.removeChild(cartItems.firstChild);
  }
    updateCartTotal();
  updateItemsTotal();
}
  
}



/*remove items second part*/
function removeCartItem(event) { // in above lines removeCartItemButtons is adding a click listener for every Remove button (creating dynamically) when we click particular button the that will trigerr this event and event in argument is identifying element is clicked 
  var buttonClicked = event.target; //event.target will identify what item/element is clicked so buttonClicked variable will hold that button and its IDs and classes (there may be 3 items into cart and three remove buttons it will contain one  button at time which is clicked from all three buttons  )
  buttonClicked.parentElement.parentElement.remove(); //button click hua h ab usy e to remove nai krna us k parent m b kuch classes lgi hui hoti hn so ham n button k uper lgy hr parent ko get krna h to remove them so hmary case m hmy pata h k remove button k uper aik e div element h(isi file m create kia gya h neechy) or jab ya aik div k ander pra remove ka buttons dynamically assign kia gya h to wo aik div ko assign kia gya h jo k dynamically bni h addItemtoCart ki 3rd line m usy cart-row ki css class di gai h so hmary case m hmary button k 2 parents huy unhy bet kr k sb ko us particular click p remove kr dia jay ga
  updateCartTotal();  //the product got removed from cart pop up now have to clear from there and we have to show cleared place to user so this function will call
  updateItemsTotal();
}
 /*end*/

//it will trigerred when we change value of item quantity 
function quantityChanged(event) {
  var input = event.target;
  if (isNaN(input.value) || input.value <= 0) {
    input.value = 1;
  }
  updateCartTotal();
  updateItemsTotal();
}



function addToCartClicked(event) {
  var button = event.target; //it will return a particular element of which the event will be trigerred(means peechy ham n buttons jin par ADD-TO-CART class lgi hui thi us k event listner creat kiy thy ab wo to 3 buttons thy so is m un m s jis particular button p ham n ab click kia hoga us k liy event triger kray ga ya) 
  var product = button.parentElement.parentElement; // is wqt product variable m us button element jis k liy event triggger hua h us k parent element ka name jo k div h or us p lgi ids or classes a gai hn
  var title = product.getElementsByClassName("product-title")[0].innerText; //it will get the text written in the element which have class product-itle which is h5 element in the div parent
  var price = product.getElementsByClassName("product__price")[0].innerText;//it will get the text of element (h3) which have class "product__price" under the div parent
  var imageSrc = product.getElementsByClassName("product__image")[0].src; 
  addItemToCart(title, price, imageSrc); //all above got items will pass to add ItemToCartTotal() function

  updateCartTotal();
   /*missing*/
  updateItemsTotal();

}


function addItemToCart(title, price, imageSrc) {
  var cartRow = document.createElement("div");
  cartRow.classList.add("cart-row");
  var cartItems = document.getElementsByClassName("cart-items")[0];
  var cartItemTitles = cartItems.getElementsByClassName("cart-item-title");
  for (var i = 0; i < cartItemTitles.length; i++) {
    if (cartItemTitles[i].innerText == title) {
      alert("This item is already added to the cart");
      return;
    }
  }
  //creates rows when item added to cart
  var cartRowContents = `
  <div class="cart-item cart-column">
              <img class="cart-item-image" src="${imageSrc}">
              <span class="cart-item-title">${title}</span>
            </div>
            <span class="cart-price cart-column">${price}</span>
            <div class="cart-quantity cart-column">
              <input class="cart-quantity-input" type="number" value="1">
              <button class="btn btn-danger" type="button">REMOVE</button>
            </div>`;
  cartRow.innerHTML = cartRowContents;
  cartItems.append(cartRow);
  cartRow
    .getElementsByClassName("btn-danger")[0]
    .addEventListener("click", removeCartItem);
  cartRow
    .getElementsByClassName("cart-quantity-input")[0]
    .addEventListener("change", quantityChanged);
}


 
function updateCartTotal() { //it will called whenever there will change happen in cart
  var cartItemContainer = document.getElementsByClassName("cart-items")[0]; // there will be div in cartItemContainer variable which is having row
  var cartRows = cartItemContainer.getElementsByClassName("cart-row"); //cart row class aik div ko assign h or us k ander dynamically divs add hoti hein jab ham add to cart kryn wo sb div element apni ids or claasses k sath is variable m get ho jay gay
   total = 0; //initially always zero
  for (var i = 0; i < cartRows.length; i++) { //cart.rows = jitni producs is wqt cart m add hon gi . 
    var cartRow = cartRows[i]; //let say k rows 3 hein yani products 3 hein cart m so ab hr iteration p aik aik product li jay gi is step m
    var priceElement = cartRow.getElementsByClassName("cart-price")[0]; //wo jo product li gi h us div k ander price wala aik span hoga jis m class name cart-price b h wo wala span is variable m ajay ga apni classes and ids k sath
    var quantityElement = cartRow.getElementsByClassName( 
      "cart-quantity-input"
    )[0]; // let say iteration phli prodcut p chl rhi h so us main div m khin koi aik esa element h jis p  "cart-quantity-input" class lgi h us k ander user ka record enter hoga k wo us product k kitny num of orders krna chahta h mtlb aik pen 4 chahiy
    var price = parseFloat(priceElement.innerText.replace("$", "")); //wo jo price uper get ki h us m dollar ka sign b ata h text k sath so yhan us dollar k sign ko aik to khtm kia h dusra ager points m b koi number hua to usy b persist rkhna hoga is line ka mtlb h
    var quantity = quantityElement.value; //product ko kitni tadad m ordder kr rhy hein wo quantityElement m li gai thi uski value yhan get kr li gai h dubara kisi new variable m
    total = total + price * quantity; //let say ager aik pen 10 rupees ka h to 4 pen ki proce b add ki jay gi like 0+10*4 ab ya to agay total k ander agli iteration m agli product ki value is m add hogi like 40+10*4
  }
  total = Math.round(total * 100) / 100; 
  document.getElementsByClassName("cart-total-price")[0].innerText =
    "$" + total; //total ki value update kr di jay gi mgr ziada products ki surt m pura for loop chly ga us k bad ja k ya update hogi
}



function updateItemsTotal() {
  var cartItemContainer = document.getElementsByClassName("cart-items")[0]; //cartItemContainer = div.cart-items
  var cartRows = cartItemContainer.getElementsByClassName("cart-row");//jab ham add item to cart krty hein to aik item ya product k liy dynamically aik row create hoti h jis m 3 chizyn image title price quanitity wgera hogi bnti h wo is variable m ajay gi jab add item to cart kr dyn gy whan s function triger ho k create krny k bad yhan ay ga k usy hmy dikhany ko update b kry
  var total = 0;
  for (let i = 0; i < cartRows.length; i++) { //initially to cart 0 hi hoga lkn jab ager let say m n aik product cart m dali h to yhan length=1 hogi
    var cartRow = cartRows[i]; //ager products aik s ziada "add to cart" ki hein to hr iteration p aik product le ga or us p processing hogi
    var quantityElement = cartRow.getElementsByClassName(
      "cart-quantity-input"
    )[0]; //ab chunk jab product cart m dalni h to us p total b sath show krna hota h so ya yhan e check kr rha h quantity ko jo k zruri b nai
    var quantity = quantityElement.value;
    var total = total + parseInt(quantity);
  }
  document.getElementById("item-count").innerText = total; 
}

