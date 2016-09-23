$(document).ready(function() {
    $('#botonConvertir').click(function() {
        
        var fechaI= document.getElementById('input_from').value;
        
        
        
      google.charts.setOnLoadCallback(mandarQueryValor);

      function mandarQueryValor() {
        var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zBx43V6AhT-fmS6IJPIGkLL502RdznEYrcAtl3V8eq8/edit#gid=261964506', opts);

  // Query
  query.setQuery("select B where A = date '" + fechaI + "'" );

  // Send the query with a callback function.
  query.send(handleQueryResponse);

        
      }
        
        function handleQueryResponse(response) {
if (response.isError()) {
    alert('Error in query: '+fechaI + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }


            
  var dataUF = response.getDataTable();
  var valorUF = dataUF.getValue(0,0);
  var montoAConvertir = document.getElementById('monto').value;        
      

   if(document.getElementById('pesosElegido').checked) {
  var montoConvertido=valorUF*montoAConvertir;
   }
    else  {
  var montoConvertido=montoAConvertir/valorUF;
    } 
    //Aqui formateo el montoConvertido para que se visualiza mejor en la pagina. Le pongo comas y trunco el numero.
    montoConvertido=truncateDecimals(montoConvertido,4);        
    var partes = montoConvertido.toString().split(".");
            partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            montoConvertido=partes.join(".");
            
    if(document.getElementById('pesosElegido').checked) {
  document.getElementById('resultado').innerHTML=" <strong>" + montoConvertido + "</strong> CLP";
   }
    else  {
  document.getElementById('resultado').innerHTML=" <strong>" + montoConvertido + "</strong> UF";
    }
  //Aca formateo el valor de la UF para que se vea bonito, para ponerlo abajo del monto convertido.
  var parts = valorUF.toString().split(".");
            parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
            valorUF=parts.join(".");  
  document.getElementById('valorUFTexto').innerHTML="<strong>Valor de la UF: " + valorUF + "</strong>";          
            
  
}
    
}
        
      
    );
});

function truncateDecimals (num, digits) {
    var numS = num.toString(),
        decPos = numS.indexOf('.'),
        substrLength = decPos == -1 ? numS.length : 1 + decPos + digits,
        trimmedResult = numS.substr(0, substrLength),
        finalResult = isNaN(trimmedResult) ? 0 : trimmedResult;

    return parseFloat(finalResult);
}
