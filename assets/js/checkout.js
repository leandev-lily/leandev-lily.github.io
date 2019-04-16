var productsDefinition = [{
    "name": "LOREM IPSUM DOLOR 15",
    "price": "33900",
    "image": "photo0.jpg",
    "url": "Living Room _ Lorem ipsum dolor 15.html"
},
    {
        "name": "LOREM IPSUM DOLOR 1",
        "price": "28500",
        "image": "photo1.jpg",
        "url": "Living Room _ Lorem ipsum dolor 1.html"
    },
    {
        "name": "LOREM IPSUM DOLOR 10",
        "price": "11000",
        "image": "photo2.jpg",
        "url": "Living Room _ Lorem ipsum dolor 10.html"
    },
    {
        "name": "LOREM IPSUM DOLOR 13",
        "price": "15003",
        "image": "photo3.jpg",
        "url": "Living Room _ Lorem ipsum dolor 13.html"
    },
    {
        "name": "LOREM IPSUM DOLOR 3",
        "price": "10999",
        "image": "photo4.jpg",
        "url": "Living Room _ Lorem ipsum dolor 3.html"
    },
    {
        "name": "LOREM IPSUM DOLOR 7",
        "price": "11000",
        "image": "photo5.jpg",
        "url": "Living Room _ Lorem ipsum dolor 7.html"
    },
    {
        "name": "LOREM IPSUM DOLOR 4",
        "price": "15999",
        "image": "photo6.jpg",
        "url": "Living Room _ Lorem ipsum dolor 4.html"
    },
    {
        "name": "LOREM IPSUM DOLOR 8",
        "price": "14636",
        "image": "photo7.jpg",
        "url": "Living Room _ Lorem ipsum dolor 8.html"
    }];
var totalSum = 0;
jQuery(document).ready(function () {
    var cartProducts  = window.localStorage.getItem("products");
    if(cartProducts != null){
        var products = cartProducts.split(",");
        var tbody = jQuery('#cartTable').find('tbody');
        var list = new Array();
        totalSum = 0;
        for (var i = 0; i < products.length; i++) {
            if(products[i] == ""){
                continue;
            }
            var price = productsDefinition[products[i]].price;
            if(list[products[i]] != null){
                list[products[i]] = list[products[i]] + 1;
                jQuery('#quatity'+products[i]).val(list[products[i]]);
                jQuery('#sum'+products[i]).html(formatPrice(list[products[i]]*price));
            }else{
                var productName = productsDefinition[products[i]].name;
                var image = productsDefinition[products[i]].image;
                var url = productsDefinition[products[i]].url;
                console.log(productName)
                tbody.append('<tr valign="top" class="sectiontableentry1" id="row'+products[i]+'"><td align="left">' +
                    '<span class="cart-images"><img src="./assets/images/'+image+'"></span><a href="'+url+'" class="cart-item-link">'+productName+'</a>' +
                    '<div class="vm-customfield-cart"></div></td><td align="center"><div class="PricesalesPrice vm-display vm-price-value">' +
                    '<span class="vm-price-desc"></span><span class="PricesalesPrice">'+formatPrice(price)+'</span></div></td><td align="right">' +
                    '<div class="cart-product__quantity"><div class="quantity-form"><div><button title="Decrease" onclick="decreaseQuatity(\''+products[i]+'\')" class="quantity-form__decrease-button"></button>' +
                    '<input type="number" min="0" aria-label="Antal" class="quantity-form__quantity-value" value="1" id="quatity'+products[i]+'">' +
                    '<button title="Increase" class="quantity-form__increase-button" onclick="increaseQuatity(\''+products[i]+'\')"></button></div><button onclick="removeProduct(\''+products[i]+'\')" title="Remove" class="quantity-form__delete-button"></button>' +
                    '</div></div></td><td colspan="1" align="right"><div class="PricesalesPrice vm-display vm-price-value"><spanclass="vm-price-desc"></span>' +
                    '<span class="PricesalesPrice" id="sum'+products[i]+'">'+formatPrice(price)+'</span></div></td></tr>');
                list[products[i]] = 1;
            }
            totalSum += parseInt(price);
        }
        tbody.append('<tr class="sectiontableentry2">\n' +
            '                                                <td colspan="3" align="right">Total:</td>\n' +
            '\n' +
            '                                                <td align="right"><strong>\n' +
            '                                                    <div class="PricebillTotal vm-display vm-price-value"><span\n' +
            '                                                            class="vm-price-desc"></span><span class="PricebillTotal">'+formatPrice(totalSum)+'</span>\n' +
            '                                                    </div>\n' +
            '                                                </strong></td>\n' +
            '                                            </tr>');
    }

});

function increaseQuatity(product) {
    var quatity = jQuery('#quatity'+product).val();
    jQuery('#quatity'+product).val(parseInt(quatity) +1);
    var storage = window.localStorage;
    var cartProducts =  storage.getItem("products");
    console.log(cartProducts);
    if(cartProducts != null && cartProducts != ''){
        cartProducts = cartProducts + "," + product;
    }else {
        cartProducts = index;
    }
    storage.setItem("products", cartProducts);
    updateQuatityInCart();
    var price = productsDefinition[product].price;
    jQuery('#sum'+product).html(formatPrice((parseInt(quatity)+1)*price));
    totalSum += parseInt(price);
    jQuery('.PricebillTotal').html(formatPrice(totalSum));
    if(jQuery('#installmentsDiv').is(':visible')){
        selectOtherPayment();
    }

}

function decreaseQuatity(product) {
    var quatity = jQuery('#quatity'+product).val();
    if(quatity == '1'){
        removeProduct(product);
        return;
    }
    jQuery('#quatity'+product).val(parseInt(quatity) -1);
    var storage = window.localStorage;
    var cartProducts =  storage.getItem("products");
    console.log(cartProducts);
    if(cartProducts != null && cartProducts.indexOf(product + ',') != -1){
        cartProducts = cartProducts.replace(product + ',', '');
        console.log(cartProducts);
    }else {
        cartProducts = cartProducts.replace(product, '');
        console.log(cartProducts);
    }
    storage.setItem("products", cartProducts);
    updateQuatityInCart();
    var price = productsDefinition[product].price;
    jQuery('#sum'+product).html(formatPrice((parseInt(quatity)-1)*price));
    totalSum -= parseInt(price);
    jQuery('.PricebillTotal').html(formatPrice(totalSum));
    if(jQuery('#installmentsDiv').is(':visible')){
        selectOtherPayment();
    }
}

function removeProduct(product) {
    var quatity = jQuery('#quatity'+product).val();
    jQuery('#row'+product).remove();
    var storage = window.localStorage;
    var cartProducts =  storage.getItem("products");
    while(cartProducts != null && cartProducts.indexOf(product + ',') != -1){
        cartProducts = cartProducts.replace(product + ',', '');
    }
    while (cartProducts != null && cartProducts.indexOf(','+product) != -1){
        cartProducts = cartProducts.replace(','+product,'');
    }
    while (cartProducts != null && cartProducts.indexOf(product) != -1){
        cartProducts = cartProducts.replace(product,'');
    }


    if(cartProducts != ''){
        storage.setItem("products", cartProducts);
    }else{
        storage.clear();
    }

    jQuery('#itemQuality').html(cartProducts.split(",").length);
    var price = productsDefinition[product].price;
    totalSum -= parseInt(price*quatity);
    jQuery('.PricebillTotal').html(formatPrice(totalSum));
    if(jQuery('#installmentsDiv').is(':visible')){
        selectOtherPayment();
    }
}

function formatPrice(price) {
    return number_format(price,0,'', ' ') + ' kr';
}

function number_format(number, decimals, dec_point, thousands_sep) {
    number = (number + '').replace(/[^0-9+-Ee.]/g, '');
    var n = !isFinite(+number) ? 0 : +number,
        prec = !isFinite(+decimals) ? 2 : Math.abs(decimals),
        sep = (typeof thousands_sep === 'undefined') ? ',' : thousands_sep,
        dec = (typeof dec_point === 'undefined') ? '.' : dec_point,
        s = '',
        toFixedFix = function(n, prec) {
            var k = Math.pow(10, prec);
            return '' + Math.ceil(n * k) / k;
        };

    s = (prec ? toFixedFix(n, prec) : '' + Math.round(n)).split('.');
    var re = /(-?\d+)(\d{3})/;
    while(re.test(s[0])) {
        s[0] = s[0].replace(re, "$1" + sep + "$2");
    }

    if((s[1] || '').length < prec) {
        s[1] = s[1] || '';
        s[1] += new Array(prec - s[1].length + 1).join('0');
    }
    return s.join(dec);
}

function clickLoginButton(){
    jQuery('#addressDiv').show();
    jQuery('#loginForm').hide();
    jQuery('#paymentDiv').show();
}

function selectOtherPayment(){
    jQuery('#activePayment').show();
    jQuery('#installmentsDiv').hide();
}

function show6monthfee() {
    var spin = jQuery('body').createSpin('modal');
    setTimeout(function () {
        jQuery('#rate1').html('5.8%');
        jQuery('#rate2').html('5.5%');
        jQuery('#rate3').html('6.5%');
        jQuery('#mc6').html(formatPrice(totalSum/6)+' sek/month');
        jQuery('#mc12').html(formatPrice(totalSum/12)+' sek/month');
        jQuery('#mc1').html(formatPrice(totalSum/6)+' sek/month');
        jQuery('#mc2').html(formatPrice(totalSum/6)+'sek/month');
        jQuery('#mc3').html(formatPrice(totalSum/6)+' sek/month');
        spin.destroySpin();
    },1000);
}

function show12monthfee() {
    var spin = jQuery('body').createSpin('modal');
    setTimeout(function () {
        jQuery('#rate1').html('3.8%');
        jQuery('#rate2').html('3.5%');
        jQuery('#rate3').html('4.5%');
        jQuery('#mc12').html(formatPrice(totalSum/12)+' sek/month');
        jQuery('#mc1').html(formatPrice(totalSum/12)+' sek/month');
        jQuery('#mc2').html(formatPrice(totalSum/12)+' sek/month');
        jQuery('#mc3').html(formatPrice(totalSum/12)+' sek/month');
        spin.destroySpin();
    },1000);
}
function clickChooseBank() {
    jQuery(".progress-bar-info").css('width','0%');
    jQuery('#progressBar').modal('show');
    jQuery('#progressBarText').html('Processing your application.....');
    var i=1;
    var interval = setInterval(function(){
        jQuery(".progress-bar-info").css('width', (10*i++)+'%');
        jQuery('#progressBarText').html('Processing your application ' + 10*(i-1) + '% completed.....');
        if(i==11){
            jQuery('#progressBar').modal('hide');
            jQuery('#activePayment').hide();
            clearInterval(interval);
            window.location.href='pnsign.html';
        }
    }, 1000);

}

function installmentsClick(){
    jQuery('.payment_options').removeClass('selected');
    jQuery(".progress-bar-info").css('width','0%');
    jQuery('#progressBar').modal('show');
    jQuery('#progressBarText').html('Calculating offerings.....');
    var i=1;
    var interval = setInterval(function(){
        jQuery(".progress-bar-info").css('width', (20*i++)+'%');
        jQuery('#progressBarText').html('Calculating offerings ' + 20*(i-1) + '% completed.....');
        if(i==7){
            jQuery('#progressBar').modal('hide');
            jQuery('#activePayment').hide();
            jQuery('#installmentsDiv').show();
            show6monthfee();
            clearInterval(interval);
        }
    }, 1000);
}

function selectPaymentOption(src){
    jQuery('.payment_options').removeClass('selected');
    src.addClass('selected');
}

jQuery(function ($) {
            SqueezeBox.initialize({});
            SqueezeBox.assign($('a.modal').get(), {
                parse: 'rel'
            });
        });

        window.jModalClose = function () {
            SqueezeBox.close();
        };

        // Add extra modal close functionality for tinyMCE-based editors
        document.onreadystatechange = function () {
            if (document.readyState == 'interactive' && typeof tinyMCE != 'undefined' && tinyMCE) {
                if (typeof window.jModalClose_no_tinyMCE === 'undefined') {
                    window.jModalClose_no_tinyMCE = typeof (jModalClose) == 'function' ? jModalClose : false;

                    jModalClose = function () {
                        if (window.jModalClose_no_tinyMCE) window.jModalClose_no_tinyMCE.apply(this, arguments);
                        tinyMCE.activeEditor.windowManager.close();
                    };
                }

                if (typeof window.SqueezeBoxClose_no_tinyMCE === 'undefined') {
                    if (typeof (SqueezeBox) == 'undefined') SqueezeBox = {};
                    window.SqueezeBoxClose_no_tinyMCE = typeof (SqueezeBox.close) == 'function' ? SqueezeBox.close : false;

                    SqueezeBox.close = function () {
                        if (window.SqueezeBoxClose_no_tinyMCE) window.SqueezeBoxClose_no_tinyMCE.apply(this, arguments);
                        tinyMCE.activeEditor.windowManager.close();
                    };
                }
            }
        };


        jQuery(document).ready(function () {

            jQuery('#VMmenu62_00198 li.VmClose ul').hide();

            jQuery('#VMmenu62_00198 li .VmArrowdown').click(
                function () {


                    if (jQuery(this).parent().next('ul').is(':hidden')) {

                        jQuery('#VMmenu62_00198 ul:visible').delay(500).slideUp(500, 'linear').parents('li').addClass('VmClose').removeClass('VmOpen');

                        jQuery(this).parent().next('ul').slideDown(500, 'linear');

                        jQuery(this).parents('li').addClass('VmOpen').removeClass('VmClose');

                        return false;

                    }

                    if (jQuery(this).parent().next('ul').is(':visible')) {

                        jQuery(this).parent().next('ul').slideUp(500, 'linear');

                        jQuery(this).parents('li').addClass('VmClose').removeClass('VmOpen');

                        return false;

                    }

                });

        });
        jQuery(document).ready(function () {
            jQuery('.hasTooltip').tooltip({"html": true, "container": "body"});
        });
