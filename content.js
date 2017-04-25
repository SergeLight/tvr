var firstHref = $("a[href^='http']").eq(0).attr("href");

function checkAlert() {
  console.log('running');
  var elm  = $('.alert-event-description');

  if(elm.length > 0 ){
    console.log('found element')


    var text = elm.text();

    console.log(text)

  }
}

window.setInterval(checkAlert, 2000);
