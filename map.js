require([
  "esri/Map",
  "esri/views/MapView",
  "esri/layers/CSVLayer"
], function (Map, MapView, CSVLayer) {

  const popupTemplate = {
    content: "{place}"
  };

  let iconRenderer = {
  type: "simple",  // autocasts as new SimpleRenderer()
  symbol: {
    type: "simple-marker",  // autocasts as new SimpleFillSymbol()
    size:30,
    color: [ 255, 128, 0, 0.5 ],
    outline: {  // autocasts as new SimpleLineSymbol()
      width: 1,
      color: "white"
    }
  }

  }

  let locationLabels = {
    symbol: {
      type: "text",
      color: "#000000",
      haloColor: "#FFFFFF",
      haloSize: "1px",
      font: {
        size: "15px",
        family: "Arial",
        style: "normal",
        weight: "bold"
      }
    },
    labelPlacement: "center-center",
    labelExpressionInfo: {
      expression: "$feature.place"
    }
  };




  document.getElementById("USAbutton").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "USA.csv",
      center: [-95.7129, 37.0902], // longitude, latitude
      zoom: 3
    });
  });

  document.getElementById("WorldButton").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "World.csv",
      center: [44.525455,1.677438], // longitude, latitude
      zoom: 2
    });
  });

  function SetMap(mapConfiguration) {
    let map = new Map({
      basemap: "topo"
    });

    let view = new MapView({
      container: "view",
      map: map,
      center: mapConfiguration.center, 
      zoom: mapConfiguration.zoom
    });

    let csvLayer = new CSVLayer({
      url: mapConfiguration.csvUrl,
      labelingInfo: [locationLabels],
      renderer: iconRenderer,
      popupTemplate: popupTemplate
    });

    map.add(csvLayer);

  }

});

