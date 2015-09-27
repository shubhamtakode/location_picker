/*
Author: Shubham S Takode
Website: shubhsblog.com
*/



var geocoder; // To fetch geocoding data from Google Map
var marker; // Marker on Map
var infowindow;      
var map;	  
var source_lat=21.252261982263345;
var source_long=77.94387617382813;

// intializing map
function initialize() {
        var mapOptions = {
          center: { lat: source_lat, lng: source_long },
          zoom: 8,
		  mapTypeId: google.maps.MapTypeId.TERRAIN
        };
         map = new google.maps.Map(document.getElementById('map-canvas'),
            mapOptions);
      }
	  
google.maps.event.addDomListener(window, 'load', initialize);  
geocoder = new google.maps.Geocoder;
infowindow = new google.maps.InfoWindow;
	  

// to show marker on map	  
function showmarker(){	  
var myLatlng = new google.maps.LatLng(source_lat,source_long);
var mapOptions = {
  zoom: 4,
  center: myLatlng
}

marker = new google.maps.Marker({
    position: myLatlng,
	draggable:true,  
    title:"Drag Marker to Set Location"
});


google.maps.event.addListener(marker, 'dragend', function(evt){
document.getElementById('location_lat').value = evt.latLng.lat();
document.getElementById('location_long').value = evt.latLng.lng();
var myLatlng1 = new google.maps.LatLng(evt.latLng.lat(),evt.latLng.lng());
geocodeLatLng(geocoder, map, infowindow,myLatlng1 );
 
});
	 
marker.setMap(map); 
 
}
	  	
function geocodeLatLng(geocoder, map, infowindow, myLatlng ) {
 
  var latlng = myLatlng;
  geocoder.geocode({'location': latlng}, function(results, status) {
    if (status === google.maps.GeocoderStatus.OK) {
      if (results[1]) {
        map.setZoom(11);
      
        infowindow.setContent(results[1].formatted_address);
        infowindow.open(map, marker);
		document.getElementById('location_name').value=results[1].formatted_address;
		
      } else {
       console.log('Unable to Identify Location');
      }
    } else {
      console.log('Location Picker failed due to: ' + status);
    }
  });
}
	
window.onload=function(){ showmarker(); };
