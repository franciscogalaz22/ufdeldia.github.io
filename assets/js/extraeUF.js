$(document).ready(function() {
   
        
        //primero conseguimos la fecha de hoy
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1; //January is 0!
        var yyyy = today.getFullYear();

        if(dd<10) {
            dd='0'+dd
        } 

        if(mm<10) {
            mm='0'+mm
        } 

        today = yyyy + '-' + mm + '-' + dd; 
    
         
        
        google.charts.load('current', {'packages':['table','corechart']});
      google.charts.setOnLoadCallback(mandarQueryUF);

      function mandarQueryUF() {
        var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zBx43V6AhT-fmS6IJPIGkLL502RdznEYrcAtl3V8eq8/edit#gid=261964506', opts);

  // Query

  query.setQuery("select B where A = date '" + today + "'" );

  // Send the query with a callback function.
  query.send(respuestaQueryUF);

        
      }
        
        function respuestaQueryUF(response) {
if (response.isError()) {
    alert('Error in query: '+ response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  //guardo resultado de query en data
  var data = response.getDataTable();
  
  var formatter2 = new google.visualization.NumberFormat({ prefix: '$',decimalSymbol: '.', groupingSymbol: '.' });
    formatter2.format(data,0);
            
  //guardo valor de UF en valor, y utilizo un pequeño codigo para formatearlo y que tenga "," en los miles. -->13-06-2017 Ya no editaré el numero, lo dejare la coma como decimal.         
  var valor = data.getValue(0,0);
  
    //var parts = valor.toString().split(".");
    //parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    //valor=parts.join(".");
  
  //doy formato a la fecha          
  today= dd + '/' + mm + '/' + yyyy;
  
  //escribo el valor de la UF y la fecha en el elemento escogido          
  document.getElementById('ufDeHoy').innerHTML="" + today + " <strong>" + valor + "</strong>";
       
 
        
}
    

        
      

});
