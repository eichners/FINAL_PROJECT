
var brooklynTaxLotLayer;
var queensTaxLotLayer;
var brooklynOddLotLayer;
var queensOddLotLayer;

$(document).ready(function () {
  cartodb.createVis('map', 'https://eichnersara.cartodb.com/api/v2/viz/83b96ef2-13b1-11e6-953b-0e787de82d45/viz.json', {
    cartodb_logo: false
  })
  .done(function (vis, layers) {
    // layers and sublayers not available outside of this createVus().done() function)
    var map = vis.getNativeMap();
    brooklynTaxLotLayer = layers[1].getSubLayer(0);
            sublayer.setInteraction(true);
            tooltip:false;
    queensTaxLotLayer = layers[1].getSubLayer(1);
            //sublayer.setInteraction(true);
            tooltip:false;
    brooklynOddLotLayer= layers[1].getSubLayer(2);
            //sublayer.setInteraction(true);
           
    queensOddLotLayer= layers[1].getSubLayer(3);
            //sublayer.setInteraction(true);
            //option:option;
  });
});


// **** QUESTIONS:
//      - WHY ISN'T GOOGLE FONTS API WORKING? 
//      - WHY ISN'T IMAGE LOADING? IS THIS BECAUSE OF THE CARTODB.JS VIS THING?
//      - have centroids, not separated by comma. How can I separate to latlng for streetview with query?
//      - SELECT *, ST_AsText(ST_Centroid(the_geom)) FROM matta_clark_lots_queens


//// USE JQUERY STORY PAN PLUGIN TO MOVE FROM LOT TO LOT RE. TEXT ABOUT GMC
//// CALCULATE CENTROIDS OF LOTS FOR STREETVIEW
//// STYLE POPUPS WITH CORRESPONDING BACKGROUND COLOR
//// DO SOME CALCULATIONS AND FEED RESULTS TO MUSTACHE TEMPLATE
//// HOW MANY LOTS ARE OWNED BY PARKS AND RECREATION?
//// HOW MANY ARE SUBMERGED?
//// HOW MANY ARE SMALLER THAN 100SQ FEET?
//// CREATE SPANS BELOW TEXT FOR THIS INFO, OR WITHIN IT





// ////////////// STREET VIEW FUNCTION
// lotClick = function (feature, layer) {

// 	layer.on(layer, function (){
// 		console.log(feature.geometry);
// 		var $content = $('<div></div>');
// 		$content.text("<strong>" + feature.properties.address + "<br/" + "</strong>" + 
//         "owner: " + "<strong>" + feature.properties.ownername + "</strong>");
        
//         function getStreetView(latlng) {
//         	console.log(lat, lng);
//         		var lat = feature.geometry.coordinates[1];
//                 var lng = feature.geometry.coordinates[0];
//                 console.log(feature.geometry.coordinates);
//                 var streetviewUrl = 'https://maps.googleapis.com/maps/api/streetview?' + $.param({
//                     size: '300x200',
//                     location: lat + ',' + lng
//                 });
// 	    		var $image = $('<img></img>');
//                     console.log(streetviewUrl);
//                     $image.attr('src', streetviewUrl);
//                     $content.append($image)                
//                 }
//                 getStreetView(layer.lat, lng());
//                 layer.bindPopup ($content.html()).openPopup();
//             });  
//       }
// L.geoJson(lotDataset, {
// 	onEachFeature: lotClick,
// 	style: lotStyle
// }).addTo(map); 
// });



// // GORDON MATTA-CLARK FAKE ESTATE LOTS
// var gmclotDatageoJSON;
// //var gmclotStyle;
// $.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT * FROM matta_clark_lots_queens&format=GeoJSON', function(data){
// 	var oddLots = data;
//     plotDataset(oddLots);
//     console.log(data);
//     //create the sidebar with links to fire polygons on the map
//     //createDropdown(oddLots);
// });

// function plotDataset(oddLots) {
// 	gmclotDatageoJSON = L.geoJson(oddLots, {
// 		style: lotStyle,
// 		onEachFeature: lotClick
// 	}).addTo(map); 
// }



// function lotColor (lottype) {
// 	return  lottype === '0' ? 'black':
// 			lottype === '1' ? '#FF2900':
// 			lottype === '6' ? '#FF2900':
// 			lottype === '7' ? '#FF2900':
// 			lottype === '8' ? '#229A00':
// 			lottype === '9' ? '#3E7BB6':
// 							  '#FF2900';
// }
// function lotFillColor (lottype) {
// 	return  lottype === '0' ? 'black':
// 			lottype === '1' ? '#FF2900':
// 			lottype === '6' ? '#FF2900':
// 			lottype === '7' ? '#FF2900':
// 			lottype === '8' ? '#229A00':
// 			lottype === '9' ? '#3E7BB6':
// 							  '#FF2900';
// }

// // ON EACH FEATURE FUNCTION
// // lotClick = function (feature, layer) {
// //     layer.bindPopup("This odd lot address is " + 
// //         "<strong>" + feature.properties.address + "</strong>" + 
// //         " and it is owned by " + 
// //         "<strong>" + feature.properties.ownername + "</strong>");
// // }

