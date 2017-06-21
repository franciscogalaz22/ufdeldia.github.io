$(document).ready(function() {
    $('#botonConvertir').click(function() {
        
        var fechaI= document.getElementById('input_from').value;
        var fechaF=document.getElementById('input_to').value;
        
        
        
        
      google.charts.setOnLoadCallback(queryInicial);
        
    //En esta funcion hacemos query  para obtener los valores de UF y USD
      function queryInicial() {
        var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zBx43V6AhT-fmS6IJPIGkLL502RdznEYrcAtl3V8eq8/edit#gid=261964506', opts);

  // Query
  query.setQuery("select B, C where A = date '" + fechaI + "' or A = date '" +fechaF + "'" );

  // Send the query with a callback function.
  query.send(handleQueryResponse);

        
      }
        
//En esta funcion guardamos los valores de Dolar y UF y hacemos la conversión
        function handleQueryResponse(response) {
if (response.isError()) {
    alert('Error in query: '+fechaI + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

           
   //guardo los valores. Si se selecciona misma fecha se usa solo un Row 
   if(Date.parse(fechaI)==Date.parse(fechaF)){
       var dataUFUSD = response.getDataTable();
       var valorUFI = dataUFUSD.getValue(0,0);
       var valorUSDI = dataUFUSD.getValue(0,1);
       var valorUFF = dataUFUSD.getValue(0,0);
       var valorUSDF = dataUFUSD.getValue(0,1); 
   }  
    else {
        var dataUFUSD = response.getDataTable();
        var valorUFI = dataUFUSD.getValue(0,0);
        var valorUSDI = dataUFUSD.getValue(0,1);
        var valorUFF = dataUFUSD.getValue(1,0);
        var valorUSDF = dataUFUSD.getValue(1,1);
    }        
             
  var montoAConvertir = document.getElementById('monto').value;        
      
    //ahora hago la conversión dependiendo de la elección del usuario
            
    //En este caso usar fecha inicial para convertir el valor        
   if(document.getElementById('pesosElegidoI').checked && document.getElementById('ufElegidoF').checked) {
  var montoConvertido=montoAConvertir/valorUFI;
   }
     //Llevar pesos a UF inicial, luego convertir a pesos con UF final y finalmente convertir a Dólares. Si fecha fuera lo mismo, seria lo mismo que conVertir con fecha dolar final.       
   else if(document.getElementById('pesosElegidoI').checked && document.getElementById('dolarElegidoF').checked) {
  var montoConvertido=(montoAConvertir/valorUFI)*valorUFF/valorUSDF;
   }
    
    //En este caso llevamos pesos a otra fecha usando UF (inflación)        
   else if(document.getElementById('pesosElegidoI').checked && document.getElementById('pesosElegidoF').checked) {
  var montoConvertido=(montoAConvertir/valorUFI)*valorUFF;
   }
   
    //En este caso deberiamos "deshabilitar" la fecha Inicial, ya que no se usa
   else if(document.getElementById('ufElegidoI').checked && document.getElementById('pesosElegidoF').checked) {
  var montoConvertido=valorUFF*montoAConvertir;
   }
    //aca usamos valor de la UF final y Dolar Final, por lo que no usamos fecha inicial (deshabilitarla)
   else if(document.getElementById('ufElegidoI').checked && document.getElementById('dolarElegidoF').checked) {
  var montoConvertido=montoAConvertir*valorUFF/valorUSDF;
   }
      //el monto no cambia      
   else if(document.getElementById('ufElegidoI').checked && document.getElementById('ufElegidoF').checked) {
  var montoConvertido=montoAConvertir;
   }
      //En este caso convierto el dolar a UF inicial, luego en fecha final lo convierto a pesos   
   else if(document.getElementById('dolarElegidoI').checked && document.getElementById('pesosElegidoF').checked) {
  var montoConvertido=(montoAConvertir*valorUSDI)/valorUFI*valorUFF;
   }
    //En este caso pasamos el dolar a pesos y despues a UF con fecha Inicial, deshabilitar fecha Final        
   else if(document.getElementById('dolarElegidoI').checked && document.getElementById('ufElegidoF').checked) {
  var montoConvertido=montoAConvertir*valorUSDI/valorUFI;
   }
     //En este caso uso fecha inicial y final, cambio dolar a pesos, y de pesos a UF (Inicial), 
    //Luego Paso UF a pesos y luego a dolar (final) ..Argumento para usar esto: Si alguien escoge esto, es para justamente corregir el valor del dolor
   else if(document.getElementById('dolarElegidoI').checked && document.getElementById('dolarElegidoF').checked) {
  var montoConvertido=((montoAConvertir*valorUSDI/valorUFI)*valorUFF)/valorUSDF;
   }
          
      
    //Aqui formateo el montoConvertido para que se visualice mejor en la pagina. Lo pongo en formato chileno y lo trunco para que se vea mejor.
            
    montoConvertido=truncateDecimals(montoConvertido,4);
            
    montoConvertido =montoConvertido.toString();         
    montoConvertido = montoConvertido.replace(".", ',');
            
    var partes = montoConvertido.toString().split(",");
            partes[0] = partes[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
            montoConvertido=partes.join(",");
            
    if(document.getElementById('pesosElegidoF').checked) {
  document.getElementById('resultado').innerHTML=" <strong>" + montoConvertido + "</strong> CLP";
   }
    else if(document.getElementById('ufElegidoF').checked)  {
  document.getElementById('resultado').innerHTML=" <strong>" + montoConvertido + "</strong> UF";
    }
    else if(document.getElementById('dolarElegidoF').checked)  {
  document.getElementById('resultado').innerHTML=" <strong>" + montoConvertido + "</strong> USD";
    }
  //Aca formateo los valores de la UF y Dolar para que se vea bonito, para ponerlo abajo del monto convertido.
  valorUFI =valorUFI.toString();         
  valorUFI = valorUFI.replace(".", ',');        
  var parts = valorUFI.toString().split(",");
           parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
           valorUFI=parts.join(",");
            
  valorUFF =valorUFF.toString();         
  valorUFF = valorUFF.replace(".", ',');        
  var parts = valorUFF.toString().split(",");
           parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
           valorUFF=parts.join(","); 
            
  valorUSDI =valorUSDI.toString();         
  valorUSDI = valorUSDI.replace(".", ',');        
  var parts = valorUSDI.toString().split(",");
           parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
           valorUSDI=parts.join(","); 
            
  valorUSDF =valorUSDF.toString();         
  valorUSDF = valorUSDF.replace(".", ',');        
  var parts = valorUSDF.toString().split(",");
           parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
           valorUSDF=parts.join(","); 
            
    //Aca inserto los valores para que aparezcan en la pagina        
            
  document.getElementById('valorUFTextoI').innerHTML="<strong>Valor UF Inicial: " + valorUFI + " </strong>";  
  document.getElementById('valorUFTextoF').innerHTML="<strong>Valor UF Final: " + valorUFF + " </strong>";
  document.getElementById('valorDolarTextoI').innerHTML="<strong>Valor Dólar Inicial: " + valorUSDI + " </strong>";
  document.getElementById('valorDolarTextoF').innerHTML="<strong>Valor Dólar Final: " + valorUSDF + " </strong>";
            
  
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
