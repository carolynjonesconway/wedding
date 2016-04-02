
function initMap() {
  var map = new google.maps.Map($("#travel .map")[0], {
        zoom: 8,
        center: { lat: 42.3065913, lng: -71.045 }
      }),
      directionsService = new google.maps.DirectionsService,
      directionsDisplay = new google.maps.DirectionsRenderer;

  directionsDisplay.setMap(map);

  var updateRoute = function() {
    calculateAndDisplayRoute(directionsService, directionsDisplay);
  };

  updateRoute();
  document.getElementById('start').addEventListener('change', updateRoute);
  document.getElementById('end').addEventListener('change', updateRoute);
}

function calculateAndDisplayRoute(directionsService, directionsDisplay) {
  directionsService.route({
    origin: {'placeId': document.getElementById('start').value},
    destination: {'placeId': document.getElementById('end').value},
    travelMode: google.maps.TravelMode.DRIVING
  }, function(response, status) {
    if (status === google.maps.DirectionsStatus.OK) {
      directionsDisplay.setDirections(response);
    } else {
      window.alert('Directions request failed due to ' + status);
    }
  });
}