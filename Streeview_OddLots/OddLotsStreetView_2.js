// 1. change default serach markers to circles
// 2. connect each listing marker to a streetview
// 3. put that streetview into a popup

$(document).ready(function () {
    var map = L.map('map').setView([40.71,-73.93], 12);
	var getStreetView;


// SEARCH LAYER 
    // var searchLayer = L.geoJson(null, {
    //     onEachFeature: function (feature, layer) {
    //         layer.bindPopup(feature.properties.label);
    // 		//where does label come from?
    // 		console.log(feature);
    //         layer.on('click', function(e) {
    //             coordinate = (e.lat,lng);
    //             // console.log(e.lat,lng);	
    //         });
    //     }
    // }).addTo(map);
	
L.tileLayer('http://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}.png',{
attribution: 'Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://www.openstreetmap.org/copyright">ODbL</a>.',
maxZoom: 19
}).addTo(map);
var turfLayer;
	
// MAPZEN SEARCH FUNCTION 	
    $('.search').keyup(function () {
        searchLayer.clearLayers();

        var urlSearch = 'https://search.mapzen.com/v1/search?' + $.param({
            text: $(this).val(),
            api_key: 'search-g79j5Zc',
            size: 5,
            'boundary.circle.lon':'-73.953781',
        	'boundary.circle.lat':'40.704066',
        	'boundary.circle.radius':'35'
        });
            // rectangle bounds : -73.978157,45.335013,-73.297005,45.718885
    	    // center: 45.5544945,-73.8073471, RADIUS 35 KM

    	$.getJSON(urlSearch)
    	.done(function (data) {
    	    searchLayer.addData(data.features);
    	    map.fitBounds(searchLayer.getBounds());
         });
    });

// buffer lots so they are more visible
  turfLayer = L.geoJson(null, {
    style: {
      fillColor: 'red',
      stroke: false
    }
  }).addTo(map);

// LOT POLYGONS, POPUPS with text and  STREETVIEW 
$.getJSON('https://eichnersara.cartodb.com/api/v2/sql?q=SELECT * FROM bkmappluto_lottype &format=GeoJSON', function (data) {
        var oddLotsLayer = L.geoJson(data, {
            onEachFeature: function (feature, layer) {
                layer.bindPopup(feature.properties.address);       
            // Buffer each feature by 250 ft and add the result to turfLayer
                turfLayer.addData(turf.buffer(feature, 250, 'feet'));
            },
            style: {
                stroke: false
            }
        }).addTo(map);
    });
 });

            //     layer.on('click', function() {
            //         console.log('there was a click');
            //         console.log(layer.feature());
            //         console.log(layer.getLatLng());
            //     });
            // }

//     .done(function (data) {
//         L.geoJson(data, {
//        // var lotType = data;
//        // console.log(data);	 
		 
// // // CREATE STYLE LAYER FROM GEOJSON POLYGONS
//     lotStyle: function (feature) {
//         var style = {
//             weight: 3,
//             opacity: 0.9,
//             color: 'red',//lotColor(lotType),
//             fillOpacity: 0.9,
//             fillColor: 'orange' //lotFillColor(lotType)
//         };
//         return style;
//     }
//    }).addTo(map);    
// });
//     });
//             var lotType = feature.properties.lottype
//             var lotStyle = {
//                 weight: 3,
//                 opacity: 0.9,
//                 color: lotColor(lotType),
//                 fillOpacity: 0.9,
//                 fillColor: lotFillColor(lotType)
//             };
//             return lotStyle;
//         }
        
//         // using function for polygon attributes so things are easier to change as project grows
//         function lotColor (lotType) {
//             return  lotType === '1' ? "#fee5d9" :
//                     lotType === '6' ? "#A6D5FF" :
//                     lotType === '7' ? "#40C9C9" :
//                     lotType === '8' ? "#FF8563" :
//                     lotType === '9' ? "#FC923A" :
//                                       "#FC923A" ;
//         }
//           function lotFillColor (lotType) {
//             return  lotType === '1' ? "#fee5d9" :
//                     lotType === '6' ? "#A6D5FF" :
//                     lotType === '7' ? "#40C9C9" :
//                     lotType === '8' ? "#FF8563" :
//                     lotType === '9' ? "#FC923A" :
//                                       "#FC923A" ;
//         }

    //         ){
    //             fillColor = "#fee5d9";
    //             color = "#fee5d9";
    //         }
    //         if(value === '6'){
    //             fillColor = "#A6D5FF";
    //             color = '#A6D5FF';
    //         }
    //         if(value === '7'){
    //             fillColor = "#40C9C9";
    //             color = '#40C9C9';
    //         }
    //         if(value === '9'){
    //             fillColor = "#FC923A";
    //             color = '#FC923A';
    //         }
    //         if(value === '8') { 
    //             fillColor = "#FF8563";
    //             color = '#FF8563';
    //         }
    // return LotStyle;


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
                    $content.text('This lot is located at: ' +  feature.properties.address + ' its bbl # (borough/block/lot) is: ' + feature.properties.bbl + ' and owner name: ' + feature.properties.ownerName );


// STREET VIEW OF LISTING LOCATION called with click, part of onEachFeature       
                    // add an additional div with the streetview and style it separately
                    function getStreetView(latlng) {
                        var lat = latlng.lat;
                        var lng = latlng.lng;
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
    L.geoJson(data).addTo(map);//,//, //{
       style: lotStyle,
       onEachFeature: lotClick
  }).addTo(map);    
});    



GET LISTINGS DATA AND SHOW IN SEPARATE LIST
var url = 'https://eichnersara.cartodb.com/api/v2/sql?' + $.param({
    q: 'SELECT COUNT(bkmappluto_lottype) AS total'
});
$.getJSON(url)

.done(function (data) {
	console.log(url);

    $('.total').text(data.rows[0].total);
	  // $('.average').text(data.rows[0].average);
	  // $('.minimum').text(data.rows[0].minimum);
   //    $('.maximum').text(data.rows[0].maximum);
}); 

