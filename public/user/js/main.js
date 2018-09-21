resetPSA();

setInterval(function(){
  resetPSA();
}, 5000);

function resetPSA(){
  fetch("/psa").then(raw=>raw.json()).then(function(json){
    $("#psaDisplay").text(json.psa);
  });
}
