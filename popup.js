
$(document).ready(function(){
    var ws = new WebSocket('wss://ws.binaryws.com/websockets/v3?app_id=3534');

    var auth = {
        "authorize": "xNPheF6PRHEJyJl"
    };




    ws.onopen = function(evt) {
        ws.send(JSON.stringify(auth));
    };

    ws.onmessage = function(msg) {

        console.log(JSON.parse(msg.data));


    };
})