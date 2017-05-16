
function checkAlert() {
    var elm1  = $('.tv-alert-single-notification-dialog__message');

    if(elm1.length > 0 ){

        var text = elm1.text();

        trade(text);

        clearInterval(looper);
    }
}

function checkAlertMultiple() {
    // console.log('running');

    var elm2 = $('.tv-alerts-multiple-notifications-dialog__row.js-item-row').first();

    if(elm2.length > 0 ){
        var get = 0;
        lastTextElm = elm2.find('.tv-alerts-multiple-notifications-dialog__table-cell-wrap.apply-overflow-tooltip.apply-overflow-tooltip--allow-text');
        lastNumNew = elm2.find('.js-fired-count').text();

        // console.log(lastTextElm)

        lastTextElm.each(function(){
            if (get === 0){ symbolNew = $(this).text(); }
            if (get === 1){ lastTextNew = $(this).text(); }
            get++;
        });

        if (symbol !== symbolNew || lastText !== lastTextNew || lastNum !== lastNumNew){

            trade(lastTextNew);

            symbol = symbolNew;
            lastText = lastTextNew;
            lastNum = lastNumNew;

        }else{
            symbol = symbolNew;
            lastText = lastTextNew;
            lastNum = lastNumNew;
        }
    }
}


var symbol;
var lastText;
var lastNum;

var looper  =  window.setInterval(checkAlert, 4000);
var loopMul =  window.setInterval(checkAlertMultiple, 4000);
