require([
  "esri/config",
  "esri/Map",
  "esri/views/MapView",
  "esri/Basemap",
  "esri/layers/VectorTileLayer",
  "esri/layers/CSVLayer"
], function (esriConfig, Map, MapView, Basemap, VectorTileLayer, CSVLayer) {
  esriConfig.apiKey = "AAPKb919287c9b034eab86067b6ccb2731dc46Mq8yqPflHvQErye8Vcgc6SVQpZ2QFPp_NOBvdihwlC_-h100B-EXrij5pJ-KIu";

  const basemap = new Basemap({
    baseLayers: [
      new VectorTileLayer({
        portalItem: {
          id: "ba00d602b11b4ff380153948523fb984"
        }
      })
    ]
  });

  const popupTemplate = {
    content: "{place}"
  };

  const iconRendererBaseMap = {
    type: "simple",
    symbol: {
      type: "simple-marker",

      color: [
        42, 120, 173
      ],
      size: 30,
      xoffset: 0,
      yoffset: 15,
      path: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z"

    }
  }

  const iconRendererUserMap = {
    type: "simple",
    symbol: {
      type: "simple-marker",

      color: [
        255, 255, 255
      ],
      size: 30,
      xoffset: 0,
      yoffset: 15,
      path: "M16,3.5c-4.142,0-7.5,3.358-7.5,7.5c0,4.143,7.5,18.121,7.5,18.121S23.5,15.143,23.5,11C23.5,6.858,20.143,3.5,16,3.5z M16,14.584c-1.979,0-3.584-1.604-3.584-3.584S14.021,7.416,16,7.416S19.584,9.021,19.584,11S17.979,14.584,16,14.584z"

    }
  }

  const locationLabels = {
    symbol: {
      type: "text",
      color: "#FFFFFF",
      haloColor: "#000000",
      haloSize: "1px",
      font: {
        size: "15px",
        family: "sans-serif",
        style: "normal",
        weight: "bold"
      }
    },
    labelPlacement: "center-center",
    labelExpressionInfo: {
      expression: "$feature.place"
    }
  };

  var isSmallScreen = window.innerWidth < 800;
  document.getElementById('Loading').style.display = "none"
  var isBrowserEligible = checkIfBrowserEligible()

  function checkIfBrowserEligible() {
    var browserInfo = getBrowserInfo();
    if (browserInfo.browser == "Opera" && browserInfo.version < 55) {
      document.getElementById('BrowserInfo').innerHTML = "Please update Opera version to atleast 55."
      return false;
    }
    if (browserInfo.browser == "Chrome" && browserInfo.version < 70) {
      document.getElementById('BrowserInfo').innerHTML = "Please update chrome version to atleast 70."
      return false;
    }
    if (browserInfo.browser == "Safari" && browserInfo.version < 11) {
      document.getElementById('BrowserInfo').innerHTML = "Please update safari version to atleast 11."
      return false;
    }
    if (browserInfo.browser == "Firefox" && browserInfo.version < 50) {
      document.getElementById('BrowserInfo').innerHTML = "Please update Firefox version to atleast 50."
      return false;
    }
    if (browserInfo.browser != "Opera" && browserInfo.browser != "Chrome" && browserInfo.browser != "Safari" && browserInfo.browser != "Firefox") {
      document.getElementById('BrowserInfo').innerHTML = "Not supported in these browser."
      return false;
    }
    return true
  }

  function getBrowserInfo() {
    var nVer = navigator.appVersion;
    var nAgt = navigator.userAgent;
    var browserName = navigator.appName;
    var fullVersion = '' + parseFloat(navigator.appVersion);
    var majorVersion = parseInt(navigator.appVersion, 10);
    var verOffset, ix;

    if ((verOffset = nAgt.indexOf("Opera")) != -1) {
      browserName = "Opera";
      fullVersion = nAgt.substring(verOffset + 6);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((verOffset = nAgt.indexOf("Chrome")) != -1) {
      browserName = "Chrome";
      fullVersion = nAgt.substring(verOffset + 7);
    }
    else if ((verOffset = nAgt.indexOf("Safari")) != -1) {
      browserName = "Safari";
      fullVersion = nAgt.substring(verOffset + 7);
      if ((verOffset = nAgt.indexOf("Version")) != -1)
        fullVersion = nAgt.substring(verOffset + 8);
    }
    else if ((verOffset = nAgt.indexOf("Firefox")) != -1) {
      browserName = "Firefox";
      fullVersion = nAgt.substring(verOffset + 8);
    }
    // trim the fullVersion string at semicolon/space if present
    if ((ix = fullVersion.indexOf(";")) != -1)
      fullVersion = fullVersion.substring(0, ix);
    if ((ix = fullVersion.indexOf(" ")) != -1)
      fullVersion = fullVersion.substring(0, ix);

    majorVersion = parseInt('' + fullVersion, 10);
    if (isNaN(majorVersion)) {
      fullVersion = '' + parseFloat(navigator.appVersion);
      majorVersion = parseInt(navigator.appVersion, 10);
    }

    return {
      browser: browserName,
      version: majorVersion
    }
  }

  document.getElementById("USAUserCreated").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "USA.csv",
      center: [-95.7129, 37.0902], // longitude, latitude
      zoom: isSmallScreen ? 2 : 3,
      basemap: basemap,
      Note: "USA user created map. Follow the steps in CustomMaps.odt to create your own map if not done before"
    });
  });

  document.getElementById("WorldUserCreated").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "World.csv",
      center: [44.525455, 1.677438], // longitude, latitude
      zoom: isSmallScreen ? 0 : 1,
      basemap: basemap,
      Note: "World user created map. Follow the steps in CustomMaps.odt to create your own map if not done before"
    });
  });

  document.getElementById("USABaseMap").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "USA.csv",
      center: [-95.7129, 37.0902], // longitude, latitude
      zoom: 3,
      basemap: "topo",
      Note: "User map created from one of the predefined arcgis maps"
    });
  });

  document.getElementById("WorldBaseMap").addEventListener("click", function () {
    SetMap({
      // If CSV files are not on the same domain as your website, a CORS enabled server
      // or a proxy is required.
      csvUrl: "World.csv",
      center: [44.525455, 1.677438], // longitude, latitude
      zoom: isSmallScreen ? 1 : 2,
      basemap: "topo",
      Note: "World map created from one of the predefined arcgis maps"
    });
  });

  function SetMap(mapConfiguration) {
    if (!isBrowserEligible) {
      return;
    }
    document.getElementById('Note').innerHTML = mapConfiguration.Note
    document.getElementById('Loading').style.display = "block"

    var map = new Map({
      basemap: mapConfiguration.basemap
    });

    var view = new MapView({
      container: "view",
      map: map,
      center: mapConfiguration.center,
      zoom: mapConfiguration.zoom
    });

    var csvLayer = new CSVLayer({
      url: mapConfiguration.csvUrl,
      labelingInfo: [locationLabels],
      renderer: mapConfiguration.basemap == "topo" ? iconRendererBaseMap : iconRendererUserMap,
      popupTemplate: popupTemplate
    });

    map.add(csvLayer);

    view.when(function () {
      document.getElementById('Loading').style.display = "none"
    }, function (error) {
    });


  }

});