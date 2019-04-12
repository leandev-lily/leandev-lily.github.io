
jQuery(document).ready(function () {
    updateQuatityInCart();
});

function updateQuatityInCart() {
    var products = window.localStorage.getItem("products");
    console.log(products);
    if(products == 'undefined' || products == ''){
        products = null;
        window.localStorage.clear();
    }
    if(products != null && products.indexOf(',') != -1){
        jQuery('#itemQuality').html(products.split(",").length);
    }else if(products != null && products.trim() != ''){
        jQuery('#itemQuality').html('1');
    }else{
        jQuery('#itemQuality').html('0');
    }
}
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
    updateQuatityInCart();
    jQuery('#addToCartModel').modal('show');
}

function removeFromCart(index) {
    var storage = window.localStorage;
    var cartProducts =  storage.getItem("products");
    if(cartProducts != null && cartProducts.indexOf(index+',') != -1){
        cartProducts = cartProducts.replace(index + ',', '');
    }else{
        cartProducts = cartProducts.replace(index, '');
    }
    storage.setItem("products", cartProducts);
    jQuery('#itemQuality').html(window.localStorage.getItem("products").split(",").length -1);
}
function continueShopping() {
    jQuery('#addToCartModel').modal('hide');
}

