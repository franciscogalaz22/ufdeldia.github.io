
$(document).ready(function() {
    $('#botonCrearTabla').click(function() {
        
        var fechaI= document.getElementById('input_from').value;
        var fechaF=document.getElementById('input_to').value;
        
        
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zBx43V6AhT-fmS6IJPIGkLL502RdznEYrcAtl3V8eq8/edit#gid=261964506', opts);

  // Query
  query.setQuery("select A,B where A >= date '" + fechaI + "' AND A <= date '" + fechaF + "' ORDER BY A");

  // Send the query with a callback function.
  query.send(handleQueryResponse);

        
      }
        
        function handleQueryResponse(response) {
if (response.isError()) {
    alert('Error in query: '+fechaI+fechaF + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
var formatter1 = new google.visualization.DateFormat({pattern: 'dd/MM/yyyy'});

            
  var data = response.getDataTable();
            formatter1.format(data,0);
            
   var grafico = new google.visualization.LineChart(document.getElementById('graficoUF')); 
   var table = new google.visualization.Table(document.getElementById('tablaUF'));
            
            
  //var table = new google.visualization.Table(document.getElementById('tablaUF'));

        //table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
            
  if(document.getElementById('graficoElegido').checked && document.getElementById('tablaElegido').checked) {
    grafico.draw(data,{vAxis: { format:'##.###'} });
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
   }
  else if(document.getElementById('graficoElegido').checked) {
    document.getElementById('tablaUF').innerHTML="";    
    grafico.draw(data, {vAxis: { format:'##.###'} });
    
    } 
  else if(document.getElementById('tablaElegido').checked) {
    document.getElementById('graficoUF').innerHTML="";    
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }   
            
              
  
          
}
    
}
        
      
    );
});






