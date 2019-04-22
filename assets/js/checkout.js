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
    return number_format(price,2,',', ' ') + ' kr';
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
    jQuery('.installmentDetail').hide();
}

var bankInterestAndFeeDefinition = {
    "nordnet":{
        "12month":{
            "interest":0,
            "invoiceFee":29,
            "startupFee":495
        },
        "24month":{
            "interest":0.04,
            "invoiceFee":0,
            "startupFee":0
        }
    },
    "nordax":{
        "12month":{
            "interest":0,
            "invoiceFee":29,
            "startupFee":495
        },
        "24month":{
            "interest":0.045,
            "invoiceFee":0,
            "startupFee":0
        }
    },
    "resurs":{
        "12month":{
            "interest":0.0699,
            "invoiceFee":29,
            "startupFee":495
        },
        "24month":{
            "interest":0.1299,
            "invoiceFee":29,
            "startupFee":0
        }
    }
}

function calculateStatementFeeActual(startupFee, invoiceFee, nperiod) {
    return startupFee/nperiod + invoiceFee;
}

function PMT(rate, nperiod, pv, fv, type) {
    if (!fv) fv = 0;
    if (!type) type = 0;

    if (rate == 0) return -(pv + fv)/nperiod;

    var pvif = Math.pow(1 + rate, nperiod);
    var pmt = rate / (pvif - 1) * -(pv * pvif + fv);

    if (type == 1) {
        pmt /= (1 + rate);
    };

    return pmt;
}

function calculateAnnuityAmount(yearlyInterestRate, nperiod, loanAmount, startupFee) {
    return PMT(yearlyInterestRate/nperiod, nperiod, -loanAmount-startupFee);
}

function calculateMonthlyCost(yearlyInterestRate, nperiod, loanAmount, startupFee, invoiceFee) {
    return calculateAnnuityAmount(yearlyInterestRate, nperiod, loanAmount, startupFee) + calculateStatementFeeActual(startupFee, invoiceFee, nperiod);
}

function calculateRate(periods, payment, present, future, type, guess) {
    guess = (guess === undefined) ? 0.01 : guess;
    future = (future === undefined) ? 0 : future;
    type = (type === undefined) ? 0 : type;

    // Set maximum epsilon for end of iteration
    var epsMax = 1e-10;

    // Set maximum number of iterations
    var iterMax = 10;

    // Implement Newton's method
    var y, y0, y1, x0, x1 = 0,
        f = 0,
        i = 0;
    var rate = guess;
    if (Math.abs(rate) < epsMax) {
        y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
    } else {
        f = Math.exp(periods * Math.log(1 + rate));
        y = present * f + payment * (1 / rate + type) * (f - 1) + future;
    }
    y0 = present + payment * periods + future;
    y1 = present * f + payment * (1 / rate + type) * (f - 1) + future;
    i = x0 = 0;
    x1 = rate;
    while ((Math.abs(y0 - y1) > epsMax) && (i < iterMax)) {
        rate = (y1 * x0 - y0 * x1) / (y1 - y0);
        x0 = x1;
        x1 = rate;
        if (Math.abs(rate) < epsMax) {
            y = present * (1 + periods * rate) + payment * (1 + rate * type) * periods + future;
        } else {
            f = Math.exp(periods * Math.log(1 + rate));
            y = present * f + payment * (1 / rate + type) * (f - 1) + future;
        }
        y0 = y1;
        y1 = y;
        ++i;
    }
    return rate;
}

function calculateEffectiveRate(nperiod, monthlyCost, loanAmount) {
    var nominalRate = calculateRate(nperiod, monthlyCost, -loanAmount, 0, 0)*nperiod;
    return Math.pow(1+(nominalRate/nperiod), nperiod) -1;
}


function displayBankCost(nperiod) {
    var spin = jQuery('body').createSpin('modal');
    var allBanks = ['nordnet', 'nordax', 'resurs'];
    var startCost = Number.MAX_VALUE;
    allBanks.forEach(function (bankId) {
        var yearInterest = bankInterestAndFeeDefinition[bankId][nperiod+'month']['interest'];
        var startupFee = bankInterestAndFeeDefinition[bankId][nperiod+'month']['startupFee'];
        var invoiceFee = bankInterestAndFeeDefinition[bankId][nperiod+'month']['invoiceFee'];
        var monthlyCost = calculateMonthlyCost(yearInterest, nperiod, totalSum, startupFee, invoiceFee);
        jQuery('#'+bankId+'MonthlyCost').html(number_format(monthlyCost.toFixed(0),0, '', ' '));
        jQuery('#'+bankId+'TotalAmount').html(number_format(monthlyCost.toFixed(0)*nperiod,0, '', ' '));

        var effectiveRate = calculateEffectiveRate(nperiod, monthlyCost, totalSum);
        jQuery('#'+bankId+'EffectiveInterestRate').html((effectiveRate * 100).toFixed(2) + '%');
        jQuery('#'+bankId+'AnnualInterestRate').html((yearInterest*100).toFixed(2) + '%');
        jQuery('#'+bankId+'StartupFee').html(startupFee);
        jQuery('#'+bankId+'AdminFee').html(invoiceFee);
        if(startCost > monthlyCost){
            startCost = monthlyCost;
        }
    });

    jQuery('#startCostFor' + nperiod + 'Month').html(number_format(startCost.toFixed(0),0,'', ' '));
    spin.destroySpin();
}

function clickChooseBank() {
    jQuery(".progress-bar-info").css('width','0%');
    jQuery('#signModal').modal('show');
    jQuery('#signInfo').html('Starting BankId Client.....');
    var i=1;
    var interval = setInterval(function(){
        jQuery(".progress-bar-info").css('width', (25*i++)+'%');
        jQuery('#signInfo').html('Starting BankId Client.....');
        if(i>6){
            jQuery('#signInfo').html('Signing.....');
        }
        if(i>=11){
            jQuery('#signInfo').html('Sign Completed.');
        }
        if(i>=12){
            jQuery('#signModal').modal('hide');
            jQuery('#activePayment').hide();
            clearInterval(interval);
            window.location.href="success.html";
        }
    }, 1000);

}

function installmentsClick(){
    jQuery('.installmentDetail').show();
}

function getTheOffers() {
    jQuery('.payment_options').removeClass('selected');
    jQuery(".progress-bar-info").css('width','0%');
    jQuery('#progressBar').modal('show');
    jQuery('#progressBarText').html('Calculating offerings.....');
    jQuery('#nordnetBankIcon').hide();
    jQuery('#nordaxBankIcon').hide();
    jQuery('#resursBankIcon').hide();
    var i=1;
    var interval = setInterval(function(){
        jQuery(".progress-bar-info").css('width', (20*i++)+'%');
        jQuery('#progressBarText').html('Calculating offerings ' + 20*(i-1) + '% completed.....');
        if(i>2){
            jQuery('#nordnetBankIcon').show();
        }
        if(i>3){
            jQuery('#nordaxBankIcon').show();
        }
        if(i>5){
            jQuery('#resursBankIcon').show();
        }
        if(i==7){
            jQuery('#progressBar').modal('hide');
            jQuery('#activePayment').hide();
            jQuery('#installmentsDiv').show();
            displayBankCost(24);
            displayBankCost(12);
            clearInterval(interval);
        }
    }, 1000);
}

function selectPaymentOption(src){
    jQuery('.payment_options').removeClass('selected');
    src.addClass('selected');
    jQuery('.installmentDetail').hide();
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
