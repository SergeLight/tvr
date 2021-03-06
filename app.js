
function sendProp(ws, prop){ ws.send(JSON.stringify(prop))}

function trade(query) {

    var ws      = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=3534');
    var auth    = { "authorize": "xNPheF6PRHEJyJl" };
    var prop    = getProposal(query);
    ws.onopen   = function(evt) { ws.send(JSON.stringify(auth));};

    ws.onmessage = function(msg) {

        var data = JSON.parse(msg.data);

        if( data.hasOwnProperty('error')) {
            var message = "Dear TVR user: " + data.error.code + ' ' + data.error.message;
            console.log(message);

        } else if (data.hasOwnProperty('authorize')) {

            console.log('Authorize Successfull');
            
            sendProp(ws,prop);

        }else if (data.msg_type === 'proposal'){

            if(data.proposal.id) buy(ws, data.proposal.id);
            else console.log('No proposal id');
        }
    };
}

function buy(ws, id) {

    var buyJson = {
        "buy": id,
        "price": 100
    };

    ws.send(JSON.stringify(buyJson));
}

function getProposal(name){

    var ret;

    var prop = {
        "buy1minCall": {
            "proposal": 1,
            "amount": "10",
            "basis": "payout",
            "contract_type": "CALL",
            "currency": "USD",
            "duration": "60",
            "duration_unit": "s",
            "symbol": "R_100"
        }
        ,
        "sell1minCall":  {
            "proposal": 1,
            "amount": "10",
            "basis": "payout",
            "contract_type": "PUT",
            "currency": "USD",
            "duration": "60",
            "duration_unit": "s",
            "symbol": "R_100"
        }
    };

    for (var key in prop)
        if (key === name) ret =  prop[key];
    
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
    //
    // var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=3534');
    //
    // var auth = {
    //     "authorize": "xNPheF6PRHEJyJl"
    // };
    //
    // ws.onopen = function(evt) {
    //     ws.send(JSON.stringify(auth));
    // };
    //
    // ws.onmessage = function(msg) {
    //
    //     var data = JSON.parse(msg.data);
    //
    //     console.log(data);
    //
    //     if( data.hasOwnProperty('error')) {
    //         var message = "Dear TVR user: " + data.error.code + data.error.message;
    //         console.log(message);
    //
    //     } else if (data.hasOwnProperty('authorize')) {
    //
    //         console.log('Authorize Successfull');
    //
    //     }else if (data.msg_type === 'proposal'){
    //
    //             if(data.proposal.id){
    //                 buy(ws, data.proposal.id)
    //             }else{
    //                 console.log('No proposal id');
    //             }
    //
    //
    //     }
    // };


    $(document).on('click', '.button', function () {

        var prop = getProposal('buy1minCall');

        sendProp(ws,prop);

    });

});