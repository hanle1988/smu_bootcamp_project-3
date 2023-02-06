$(document).ready( function () {
    
  var districts = ["District 6", "District 4", "District 8", "District 25", "District 11"]
  var crimes = ["Battery", "Theft", "Criminal Damage", "Assault", "Deceptive Practice"]  

  var trace1 = {
    x: districts,
    y: [12, 15, 13, 15, 17],
    name: crimes[0],
    type: 'bar',
    marker:{
      color: ['#41B6E6', '#41B6E6', '#41B6E6', '#41B6E6', '#41B6E6']
    }
  };
      
  var trace2 = {
    x: districts,
    y: [8, 9, 10, 7, 3],
    name: crimes[1],
    type: 'bar',
    marker:{
      color: ['#000000', '#000000', '#000000', '#000000', '#000000']
    }
  };

  var trace3 = {
    x: districts,
    y: [10, 11, 6, 10, 5],
    name: crimes[2],
    type: 'bar',
    marker:{
      color: ['#FFF200', '#FFF200', '#FFF200', '#FFF200', '#FFF200']
    }
  };

  var trace4 = {
    x: districts,
    y: [8, 4, 10, 2, 3],
    name: crimes[3],
    type: 'bar',
    marker:{
      color: ['#005899', '#005899', '#005899', '#005899', '#005899']
    }
  };

  var trace5 = {
    x: districts,
    y: [5, 7, 7, 3, 3],
    name: crimes[4],
    type: 'bar',
    marker:{
      color: ['#E4002B', '#E4002B', '#E4002B', '#E4002B', '#E4002B']
    }
  };
      
  var data = [trace1, trace2, trace3, trace4, trace5];
      
  var layout = {barmode: 'stack'};
      
  Plotly.newPlot('myDiv', data, layout);

});