
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
  query.setQuery("select A,B, C where A >= date '" + fechaI + "' AND A <= date '" + fechaF + "' ORDER BY A");

  // Send the query with a callback function.
  query.send(handleQueryResponse);

        
      }
        
        function handleQueryResponse(response) {
if (response.isError()) {
    alert('Error in query: '+fechaI+fechaF + response.getMessage() + ' ' + response.getDetailedMessage());
    return;
  }
            
            //creo el formato para las fechas
var formatter1 = new google.visualization.DateFormat({pattern: 'dd/MM/yyyy'});

    //Guardo la info en data y le aplico el formato a las fechas           
            
  var data = response.getDataTable();
            formatter1.format(data,0);
            
    //Creo las opciones del grafico de Linea para que tenga dos ejes verticales        
           var options = {vAxes:[
      {title: 'UF', titleTextStyle: {color: '#000000'}, maxValue: 10}, // Left axis
      {title: 'USD/CLP', titleTextStyle: {color: '#000000'}, maxValue: 20} // Right axis
    ],series:[
                {targetAxisIndex:0},
                {targetAxisIndex:1}
    ]
                   
        };
            
    //Creo los objetos y los asigno al espacio de HTML        
   var grafico = new google.visualization.LineChart(document.getElementById('graficoUF')); 
   var table = new google.visualization.Table(document.getElementById('tablaUF'));
            
            
  
            
  if(document.getElementById('graficoElegido').checked && document.getElementById('tablaElegido').checked) {
    grafico.draw(data,options);
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
   }
  else if(document.getElementById('graficoElegido').checked) {
    document.getElementById('tablaUF').innerHTML="";    
    grafico.draw(data, options);
    
    } 
  else if(document.getElementById('tablaElegido').checked) {
    document.getElementById('graficoUF').innerHTML="";    
    table.draw(data, {showRowNumber: true, width: '100%', height: '100%'});
    }   
            
              
  
          
}
    
}
        
      
    );
});






