/*========================================================================
  VGL --- VTK WebGL Rendering Toolkit

  Copyright 2013 Kitware, Inc.

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
 ========================================================================*/

// Disable console log
// console.log = function() {}
///////////////////////////////////////////////////////////////////////////////
//
// main program
//
///////////////////////////////////////////////////////////////////////////////
function main() {

  var mapOptions = {
    zoom : 1,
    center : ogs.geo.latlng(30.0, 70.0)
  };

  var myMap = ogs.geo.map(document.getElementById("glcanvas"), mapOptions);
  var planeLayer = ogs.geo.featureLayer({
    "opacity" : 1,
    "showAttribution" : 1,
    "visible" : 1
  }, ogs.geo.planeFeature(ogs.geo.latlng(-90.0, 0.0), ogs.geo.latlng(90.0,
  180.0)));

  myMap.addLayer(planeLayer);

  $(myMap).on('mapUpdated', function() {
    // For test purposes only
    console.log("Yohoo.....camera has been moved or something");
  });

  // / Listen for slider slidechange event
  $('#slider-vertical').slider().bind('slide', function(event, ui) {
    planeLayer.setOpacity(ui.value);
    myMap.redraw();
  });
}
