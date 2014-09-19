///testing_Github v2

require([
  'esri/map',
  'esri/layers/ArcGISImageServiceLayer',
  'esri/dijit/Geocoder',

  'dojo/query',
  'dojo/on',

  'IdentifyTiles',

  'dojo/domReady!'

], function(
  Map,
  ArcGISImageServiceLayer,
  Geocoder,

  query,
  on,

  IdentifyTiles

  ) {
  console.log('hello');


  //VARIABLES//

  //Set BaseUrl variable to be utilized later as the base directory in the variable property;
  var baseUrl = "http://mapserv.utah.gov/ArcGIS/rest/services/";
  //Set urls variable to call locations of images online;
  var urls = {
      hro2012: baseUrl + "AerialPhotography_Color/HRO2012Color6Inch_4Band/ImageServer",
      hro2009: baseUrl + "AerialPhotography_Color/HRO2009_Color1Foot/ImageServer",
      uao2003: baseUrl + "AerialPhotography_Color/UAO2003_Color1Foot/ImageServer",
      doq1990: baseUrl + "AerialPhotography_BlackWhite/DOQ1990s_1Meter/ImageServer"
  };
  //Add rest of the layers to the map to be accessed by a function
  var layers = {
      hro2012: null,
      hro2009: null,
      uao2003: null,
      doq1990: null
  };
  //Add variable to keep track of what layer is currently turned on
  var currentLayer;
  //Variable to identify using IdentifyTiles.js
  var identify;

  //FUNCTIONS//

  //Set up wireEvents function
  function wireEvents() {
    console.log('wireEvents fired');
    query("input[type='radio']").on('click', onRadioClicked);
  }
  //Set up onRadioClicked to control radio button control
  function onRadioClicked(evt) {
    console.log('onRadioClicked fired');
    currentLayer.hide();
    currentLayer = layers[evt.target.value];
    currentLayer.show();
    identify.switchCurrentLayer(evt.target.value);
  }
  //Set up init function
  function init() {
    console.log('init fired');
    var map = new Map('map');
    layers.hro2012 = new ArcGISImageServiceLayer(urls.hro2012);
    layers.hro2009 = new ArcGISImageServiceLayer(urls.hro2009, {visible: false});
    layers.uao2003 = new ArcGISImageServiceLayer(urls.uao2003, {visible: false});
    layers.doq1990 = new ArcGISImageServiceLayer(urls.doq1990, {visible: false});
    map.addLayer(layers.hro2012);
    map.addLayer(layers.hro2009);
    map.addLayer(layers.uao2003);
    map.addLayer(layers.doq1990);
    currentLayer = layers.hro2012;
    identify = new IdentifyTiles(map);
    wireEvents();
    // Insert esri Geocoder
    geocoder = new esri.dijit.Geocoder({
      map: map,
      autoComplete: true,
      arcgisGeocoder: {
        name: "Utah Imagery Geocoder",
        suffix: " Utah"
      }
    }, "search");
    geocoder.startup();
  }
  init();
});
