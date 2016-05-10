
(function ($) {
'use strict';

$.fn.storymap = function(options) {

var defaults = {
    selector: '[data-place]',
    breakpointPos: '33.333%',

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
// moved commented code above doc.ready and local variables
    // (function ($) {
    // 'use strict';


    // $.fn.storymap = function(options) {

    //     var defaults = {
    //         selector: '[data-place]',
    //         breakpointPos: '33.333%',
    //         createMap: function () {
 


    //             return map;
    //         }
    //     };

        var settings = $.extend(defaults, options);


        if (typeof(L) === 'undefined') {
            throw new Error('Storymap requires Laeaflet');
        }
        if (typeof(_) === 'undefined') {
            throw new Error('Storymap requires underscore.js');
        }

        function getDistanceToTop(elem, top) {
            var docViewTop = $(window).scrollTop();

            var elemTop = $(elem).offset().top;

            var dist = elemTop - docViewTop;

            var d1 = top - dist;

            if (d1 < 0) {
                return $(window).height();
            }
            return d1;

        }

        function highlightTopPara(paragraphs, top) {

            var distances = _.map(paragraphs, function (element) {
                var dist = getDistanceToTop(element, top);
                return {el: $(element), distance: dist};
            });

            var closest = _.min(distances, function (dist) {
                return dist.distance;
            });

            _.each(paragraphs, function (element) {
                var paragraph = $(element);
                if (paragraph[0] !== closest.el[0]) {
                    paragraph.trigger('notviewing');
                }
            });

            if (!closest.el.hasClass('viewing')) {
                closest.el.trigger('viewing');
            }
        }

        function watchHighlight(element, searchfor, top) {
            var paragraphs = element.find(searchfor);
            highlightTopPara(paragraphs, top);
            $(window).scroll(function () {
                highlightTopPara(paragraphs, top);
            });
        }

        var makeStoryMap = function (element, markers) {

            var topElem = $('<div class="breakpoint-current"></div>')
                .css('top', settings.breakpointPos);
            $('body').append(topElem);

            var top = topElem.offset().top - $(window).scrollTop();

            var searchfor = settings.selector;

            var paragraphs = element.find(searchfor);

            paragraphs.on('viewing', function () {
                $(this).addClass('viewing');
            });

            paragraphs.on('notviewing', function () {
                $(this).removeClass('viewing');
            });

            watchHighlight(element, searchfor, top);

            var map = settings.createMap();

            var initPoint = map.getCenter();
            var initZoom = map.getZoom();

            var fg = L.featureGroup().addTo(map);

            function showMapView(key) {

                fg.clearLayers();
                if (key === 'overview') {
                    map.setView(initPoint, initZoom, true);
                } else if (markers[key]) {
                    var marker = markers[key];
                    var layer = marker.layer;
                    if(typeof layer !== 'undefined'){
                      fg.addLayer(layer);
                    };
                    fg.addLayer(L.marker([marker.lat, marker.lon]));

                    map.setView([marker.lat, marker.lon], marker.zoom, 1);
                }

            }

            paragraphs.on('viewing', function () {
                showMapView($(this).data('place'));
            });
        };

        makeStoryMap(this, settings.markers);

        return this;
    }

}(jQuery));
