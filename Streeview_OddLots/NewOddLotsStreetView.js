$(document).ready(function () {
var map = L.map('map').setView([40.71,-73.93], 12);

L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
maxZoom: 19
}).addTo(map);

 // console.log('anything');
var bufferDataGeoJSON;
var lotGroupsGeoJSON;
var streetViewGeoJSON;
var getStreetView;

addBufferData(); 

function addBufferData() {
//function addBufferedData() {
 $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT ST_Transform(ST_Buffer(the_geom_webmercator, 20), 4326) AS the_geom FROM oddlots_brooklyn &format=GeoJSON')
   .done(function (data) {
    console.log(data);
    var bufferData = data;
   
    var bufferStyle = function (feature, latlng) {

        var style = {
           weight: 0,
           //stroke: false,
           color:'White',// "#1381ab",
            opacity: 0.5,
            fillColor: 'White',
            fillOpacity: 0.5
        };
        return style;
    };
  
    bufferDataGeoJSON = L.geoJson(bufferData, {
        style: bufferStyle,
     }).addTo(map);

   // addGroupData();
  });
}


// NEW ATTEMPT AT STREET VIEW FOR POLYGONS
// CREATE LISTENER LAYER TO CONNECT LISTINGS POINTS TO POPUP WINDOWS
var lotClick = function (feature, layer) {
        //onEachFeature: function(feature, layer){
        // add an event handler and eventually put a streetview in it
  layer.on('click', function () {
    console.log(layer.getLatLng());

    // divs that will hold popup content:
    var $content = $('<div></div>');
    //var $streetViewDiv = $('<br/><div></div>');
    // need jquery funciton here to add new html element to content for streetview
     $content.text('lot address: ' +  feature.properties.address + ' bbl # (borough/block/lot): ' + feature.properties.bbl + ' owner : ' + feature.properties.ownerName );


// STREET VIEW OF LISTING LOCATION called with click, part of onEachFeature       
                    // add an additional div with the streetview and style it separately
    function getStreetView(latlng) {
      var lat = features.coordinates[1];
      var lng = features.coordinates[0];
      var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?' + $.param({
                            size: '300x200',
                            location: lat + ',' + lng
                        });
                        var $image = $('<img></img>');
                        console.log(streetviewUrl);
                        $image.attr('src', streetviewUrl);
                        $content.append($image)                
                    }

                getStreetView(layer.getLatLng());
                layer.bindPopup ($content.html()).openPopup();
            });  
        } 
    L.geoJson(data) //).addTo(map);//,//, //{
       style: lotStyle
 //      onEachFeature: lotClick
  }).addTo(map);    

// GET LISTINGS DATA AND SHOW IN SEPARATE LIST
  var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT * FROM oddlots_brooklyn'
    });
    $.getJSON(url)

     .done(function (data) {
    console.log(url);
    });
//}); 


// ******* old STREET VIEW just contains pupup I think, and maybe lat long but not accessing it because these are polygons so needs to be feature.coordinates
function addStreetView() {
  $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT * FROM oddlots_brooklyn &format=GeoJSON')
  .done(function (data) {
    var lotData = data;
    console.log(data);

    var lotStyle = function (feature) {
      var style = {
        weight: 2,
        color: "red",
        fillColor: "red",
        fillOpacity: 0.5
      };
      return style;
    }

    // trying to add location to 
    // I need to create a var = span here
    // do I need an onEachFeature as well? not if event populates a span or list.
    // ran out of time
    map.on('click', function(e) {
    $('.location').append($('<span></span>').text(e.latlng)); // e is an event object 
    });
        //  $.each(data.rows, function () {
       streetViewGeoJSON = L.geoJson(lotData, {
    //  onEachFeature: locationClick,
      style:lotStyle,
    }).addTo(map);

    bufferDataGeoJSON.addTo(map);
    //lotGroupsGeoJSON.addTo(map);
    streetViewGeoJSON.addTo(map);
    map.fitBounds(lotGroupsGeoJSON.getBounds());
  });
  }



//}); 
    // gave up on following: STREETVIEW
  //// I wanted to add street view photos of closest location to lot here:
  // how do I add the lat long from console.log(data):which returns:
  // 
  // Object {type: "FeatureCollection", features: Array[439]}
      // features:
      // Array[439]
      // [0 … 99]
      // [100 … 199]
      // 100
      // :
    
      // coordinates
      // Array[2]
      // 0
      // :
      // -73.931959
      // 1
      // :
      // 40.684937
      // length
      // :
      // 2
   // var getStreetView = function (lat, lng) {
  //    var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?' + $.param({
  //    size: '300x300',
  //    location: lat + ',' + lng
  //    });
//      $('.streetview').attr('src', streetviewUrl);
//    }

   // var locationClick = function (Feature, latlng) {
   //     var popupContent = getStreetViewPhoto;
   //     layer.bindPopup(popupContent)
   //   }
    //    .done(function(data) {
    //   searchLayer.addData(data.features);
    //   map.fitBounds(searchLayer.getBounds());

    //   var coordinates = data.features[0].geometry.coordinates;
    //   getStreetview(coordinates[1], coordinates[0]);
    // });


//});






