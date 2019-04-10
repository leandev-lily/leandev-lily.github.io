var products = [{
    "name":"LOREM IPSUM DOLOR 15",
    "price":"33900"
},
    {

    }];
function addToCart(index) {
    var storage = window.localStorage;
    var cartProducts =  storage.getItem("products");
    console.log(cartProducts);
    if(cartProducts != null){
        cartProducts = cartProducts + "," + index;
    }else {
        cartProducts = index;
    }
    storage.setItem("products", cartProducts);
    jQuery('.itemQuality').html(window.localStorage.getItem("products").split(",").length -1);
    jQuery('#addToCartModel').modal('show');
}
function continueShopping() {
    jQuery('#addToCartModel').modal('hide');
}

jQuery(document).ready(function () {
    jQuery('.itemQuality').html(window.localStorage.getItem("products").split(",").length -1);
});