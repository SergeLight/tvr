
$(document).ready(function(){
    var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=3534');

    var auth = {
        "authorize": "xNPheF6PRHEJyJl"
    };

    var prop = {
        "proposal": 1,
        "amount": "1",
        "basis": "payout",
        "contract_type": "CALL",
        "currency": "USD",
        "duration": "60",
        "duration_unit": "s",
        "symbol": "R_100"

    };

    function sendProp(){
        ws.send(JSON.stringify(prop))
    }
    
    function buy(id) {
        
        var buy = {
            "buy": id,
            "price": 100
        };

        ws.send(JSON.stringify(buy));

    }


    ws.onopen = function(evt) {
        ws.send(JSON.stringify(auth));
    };

    ws.onmessage = function(msg) {

        var data = JSON.parse(msg.data);

        console.log(data);

        if( data.hasOwnProperty('error')){
            
            var message = "Dear TVR user: " + data.error.code + data.error.message
            console.log(message);
            
        }else{
            if (data.msg_type === 'proposal'){

                if(data.proposal.id){
                    buy(data.proposal.id)
                }else{
                    console.log('No proposal id');
                }

            }else{
                console.log(data);
            }

        }





    };


    $(document).on('click', '.button', function () {
        sendProp();
    });







});