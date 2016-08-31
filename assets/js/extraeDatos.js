
$(document).ready(function() {
    $('#botonCrearTabla').click(function() {
        
        var fechaI= document.getElementById('input_from').value;
        var fechaF=document.getElementById('input_to').value;
        
        google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zBx43V6AhT-fmS6IJPIGkLL502RdznEYrcAtl3V8eq8/edit#gid=261964506', opts);

  // Optional request to return only column C and the sum of column B, grouped by C members.
  query.setQuery("select A,B where A >= date '" + fechaI +"' AND date '" + fechaF + "' <= A ORDER BY A");

  // Send the query with a callback function.
  query.send(handleQueryResponse);

        
      }
        
        function handleQueryResponse(response) {
if (response.isError()) {
    alert('Error in query: '+fechaI+fechaF + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var table = new google.visualization.Table(document.getElementById('tablaUF'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
    
}
        
      
    );
});





/*document.getElementById("botonCrearTabla").addEventListener("click",buscarDatos($('#input_from').val,$('#input_to').val));

function buscarDatos(fechaI, fechaF){
google.charts.load('current', {'packages':['table']});
      google.charts.setOnLoadCallback(drawTable);

      function drawTable() {
        var opts = {sendMethod: 'auto'};
  // Replace the data source URL on next line with your data source URL.
  var query = new google.visualization.Query('https://docs.google.com/spreadsheets/d/1zBx43V6AhT-fmS6IJPIGkLL502RdznEYrcAtl3V8eq8/edit#gid=261964506', opts);

  // Optional request to return only column C and the sum of column B, grouped by C members.
  query.setQuery("select A,B where A >= date '" + fechaI +"' AND date '" + fechaF + "' <= A ORDER BY A");

  // Send the query with a callback function.
  query.send(handleQueryResponse);

        
      }
        
        function handleQueryResponse(response) {
if (response.isError()) {
    alert('Error in query: '+fechaI+fechaF + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }

  var data = response.getDataTable();
  var table = new google.visualization.Table(document.getElementById('tablaUF'));

        table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
}
    
}
*/
