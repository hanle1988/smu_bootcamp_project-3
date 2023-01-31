var filterBoolean = false;
$(document).ready(function () {
  // init map
  
  debugger;
  doWork();
  
  console.log(filterBoolean)
  // button click
  
  $("#filterButton").on("click", function () {
    debugger;
    filterBoolean = true;
    console.log(filterBoolean)
    doWork();
  });

});

function doWork() {
  debugger;
  // Store our API endpoint as queryUrl.
  let queryUrl = `crime_location.json`;
  console.log(filterBoolean)
  // reset map container
  $("#mapContainer").empty();
  $("#mapContainer").append("<div id='map'></div>")

  // Perform a GET request to the query URL.
  d3.json(queryUrl).then(function (data) {
    debugger
    if (filterBoolean) {
      data = filterData(document.getElementById("hloffer").value,document.getElementById("locale").value, data);
    }
    console.log(data)
    let coordinates = data.map(x => [x.latitude, x.longitude])
    // Using the features array sent back in the API data, create a GeoJSON layer, and add it to the map.
    makeMap(coordinates);

  });
}

function filterData(crime_type, district, data){
  debugger
  console.log("made it")
  let filteredData = []
  data.forEach(function(crime) {
    if(crime.primary_type == crime_type && crime.district == district) {
      filteredData.push(crime)
    }
  });
  return filteredData;
}

// make map
function makeMap(data) {

  // STEP 1: CREATE THE BASE LAYERS

  let street = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  })

  let topo = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });


  // STEP 2: CREATE THE OVERLAY/DATA LAYERS
  let crimes = L.markerClusterGroup();
  let coords = [];

  for (let i = 0; i < data.length; i++) {
    

    if (location) {
      let marker = L.marker([data[i][0], data[i][1]]);
      crimes.addLayer(marker)

      coords.push([data[i][0], data[i][1]]);
    }
  }

  let heatLayer = L.heatLayer(coords)

  // STEP 3: CREATE THE LAYER CONTROL OBJECTS

  let baseMaps = {
    Street: street,
    Topography: topo
  };

  // Overlays that can be toggled on or off
  let overlayMaps = {
    Markers: crimes,
    Heatmap: heatLayer
  };


  // STEP 4: INITIALIZE MAP
  let myMap = L.map("map", {
    center: [41.8781, -87.6298],
    zoom: 10,
    layers: [street, heatLayer]
  });

  // STEP 5: ADD LAYER CONTROL TO MAP

  // Create a layer control that contains our baseMaps and overlayMaps, and add them to the map.
  L.control.layers(baseMaps, overlayMaps).addTo(myMap);

}
