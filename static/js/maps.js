"use strict";

function initMap() {
  var map = new google.maps.Map($("#travel .map")[0], {
        zoom: 8,
        center: { lat: 42.3065913, lng: -71.045 },
        mapTypeControl: true,
        mapTypeControlOptions: {
            style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
            position: google.maps.ControlPosition.BOTTOM_CENTER
        },
        fullscreenControl: true,
        fullscreenControlOptions: {
          position: google.maps.ControlPosition.BOTTOM_LEFT
        }
      }),
      directionsService = new google.maps.DirectionsService,
      directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);

  var mapControls = $("#map-controls")[0];
  map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapControls);

  var updateRoute = function() {
    return calculateAndDisplayRoute(directionsService, directionsDisplay);
  };
  updateRoute();
  $("#start").on('change', updateRoute);
  $("#end").on('change', updateRoute);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  var d = $.Deferred();
  directionsService.route({
    origin: { placeId: $("#start").val() },
    destination: { placeId: $("#end").val() },
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      d.resolve();
      directionsDisplay.setDirections(response);
    } else {
      d.reject(response, status);
      var consoleMsg = "Google Maps API warning: Directions failed due to " + status,
          flashMsg = "Oops! Google Directions are currenty unavailable.";
      console.warn ? console.warn(consoleMsg) : console.log(msg);
      flash(flashMsg, {type: "error"});
    }
  });
  return d.promise();
}