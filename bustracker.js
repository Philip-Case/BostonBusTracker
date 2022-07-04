//Written by Philip Case 6/26/2022
//for MIT XPro full time class
var map;
var markers = [];

  // Initialize map
  function init(){
    const mit = { lat:42.3600917, lng: -71.094161111 };
      var myOptions = {
          zoom      : 14,
          center    : mit,
         mapTypeId: 'satellite' //set default to sattelite
      };
      var element = document.getElementById('map');
     map = new google.maps.Map(element, myOptions);
        addMarkers();
       const image = "./mitflag.png"
       const mitmarker = new google.maps.Marker({
       position: mit,
       //label:  "MIT";
       map: map,
       icon: image,
       });
       mitmarker.addListener('mouseover', function() {
        infowindow.open(map, this);
    });
  }
  // Add bus markers to map
  async function addMarkers(){
      // get bus data
      var locations = await getBusLocations();
      // loop through data, add bus markers

      locations.forEach(function(bus){
        var marker = getMarker(bus.id);	({
        })	


          if (marker){  
              moveMarker(marker,bus);

          }
          else{
              addMarker(bus);			
          }



      });
    // timer
      console.log(new Date());
      setTimeout(addMarkers,500);
  }


  // Request bus data from MBTA
  async function getBusLocations(){
      var url = 'https://api-v3.mbta.com/vehicles?api_key=1848b22d5e894286901ae9af19f07554&filter[route]=1&include=trip';	
      var response = await fetch(url);
      var json     = await response.json();
      return json.data;
  }
  function addMarker(bus){
      var icon = getIcon(bus);
      var marker = new google.maps.Marker({
          position: {
              lat: bus.attributes.latitude, 
              lng: bus.attributes.longitude
          },
          map: map,
          icon: icon,
          id: bus.id
      });
      markers.push(marker);
  }
  function getIcon(bus){
      // select icon based on bus direction
      if (bus.attributes.direction_id === 0) {
          return 'red.png';
      }
      return 'blue.png';	
  }
  function moveMarker(marker,bus) {
      // change icon if bus has changed direction
      var icon = getIcon(bus);
      marker.setIcon(icon);
      // move icon to new lat/lon
      marker.setPosition( {
          lat: bus.attributes.latitude, 
          lng: bus.attributes.longitude
      });
  }
  function getMarker(id){
      var marker = markers.find(function(item){
          return item.id === id;
      });
      return marker;
  }

  