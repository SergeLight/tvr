
function sendProp(ws, prop){

    ws.send(JSON.stringify(prop))
}

function buy(ws, id) {

    var buy = {
        "buy": id,
        "price": 100
    };

    ws.send(JSON.stringify(buy));

}

function sell(ws, id) {

    var sell = {
        "sell": id,
        "price": 100
    };

    ws.send(JSON.stringify(sell));

}

function getProposal(name){

    var ret;
    
    var prop = {
        "buy1minCall": {
            "proposal": 1,
            "amount": "1",
            "basis": "payout",
            "contract_type": "CALL",
            "currency": "USD",
            "duration": "60",
            "duration_unit": "s",
            "symbol": "frxUSDJPY"
        }
        ,
        "sell1minCall":  {
            "proposal": 1,
            "amount": "1",
            "basis": "payout",
            "contract_type": "CALL",
            "currency": "USD",
            "duration": "60",
            "duration_unit": "s",
            "symbol": "frxUSDJPY"
        }
    };


    for (var key in prop){

        if (prop.hasOwnProperty(name)){
            ret =  prop[key];
        }
    }

    console.log(ret);
    
    return ret;
}

function authorize () {

    // var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=3534');
    //
    //
    // var auth = {
    //     "authorize": "xNPheF6PRHEJyJl"
    // };
    //
    // ws.onopen = function(evt) {
    //     ws.send(JSON.stringify(auth));
    // };


    // ws.onmessage = function(msg) {
    //
    //     var data = JSON.parse(msg.data);
    //
    //     console.log(data);
    //
    //     if( data.hasOwnProperty('error')){
    //
    //         var message = "Dear TVR user: " + data.error.code + data.error.message
    //         console.log(message);
    //
    //     }else{
    //         if (data.msg_type === 'proposal'){
    //
    //             if(data.proposal.id){
    //                 buy(data.proposal.id)
    //             }else{
    //                 console.log('No proposal id');
    //             }
    //
    //         }else{
    //             console.log(data);
    //         }
    //
    //     }
    // };

}


$(document).ready(function(){

    var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=3534');

    var auth = {
        "authorize": "xNPheF6PRHEJyJl"
    };

    ws.onopen = function(evt) {
        ws.send(JSON.stringify(auth));
    };

    ws.onmessage = function(msg) {

        var data = JSON.parse(msg.data);

        console.log(data);

        if( data.hasOwnProperty('error')) {
            var message = "Dear TVR user: " + data.error.code + data.error.message;
            console.log(message);

        } else if (data.hasOwnProperty('authorize')) {

            console.log('Authorize Successfull');

        }else if (data.msg_type === 'proposal'){

                if(data.proposal.id){
                    buy(ws, data.proposal.id)
                }else{
                    console.log('No proposal id');
                }


        }
    };


    $(document).on('click', '.button', function () {

        var prop = getProposal('buy1minCall');

        sendProp(ws,prop);

    });

});