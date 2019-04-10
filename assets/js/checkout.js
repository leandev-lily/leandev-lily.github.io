function clickLoginButton(){
    jQuery('#addressDiv').show();
    jQuery('#loginForm').hide();
    jQuery('#activePayment').show();
    jQuery('#inactivePayment').hide();
}

function selectOtherPayment(){
    jQuery('#activePayment').show();
    jQuery('#installmentsDiv').hide();
}

function show6monthfee() {
    jQuery('#rate1').html('5.8%');
    jQuery('#rate2').html('5.5%');
    jQuery('#rate3').html('6.5%');
    jQuery('#mc1').html('3170 sek/month');
    jQuery('#mc2').html('3161 sek/month');
    jQuery('#mc3').html('3191 sek/month');


}

function show12monthfee() {
    jQuery('#rate1').html('3.8%');
    jQuery('#rate2').html('3.5%');
    jQuery('#rate3').html('4.5%');
    jQuery('#mc1').html('1555 sek/month');
    jQuery('#mc2').html('1550 sek/month');
    jQuery('#mc3').html('1565 sek/month');
}

function installmentsClick(){
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
            clearInterval(interval);
        }
    }, 1000);
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
