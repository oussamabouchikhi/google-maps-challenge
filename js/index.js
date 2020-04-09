
window.onload = function() {
    displayStores();
}

var map;
var markers = [];
var infoWindow;

function initMap() {
    // pick center coordinates for your map
    var losAngeles = {
        lat: 34.063380, 
        lng: -118.358080
    };

    // create map and say which HTML element it should appear in
    map = new google.maps.Map(document.getElementById('map'), {
        center: losAngeles,
        zoom: 11,
        mapTypeId: 'roadmap',
    });

    // Initiallize the info window
    infoWindow = new google.maps.InfoWindow();
    showStoresMarkers();
    

    // create marker and set its position
    var marker = new google.maps.Marker({
        map: map,
        position: losAngeles,
        icon: storeIcon,
        title: 'losAngeles'
    });

}


function displayStores(){
    var storesHtml = '';
    for(var [index, store] of stores.entries()){
        var address = store['addressLines'];
        var phone = store['phoneNumber'];
        storesHtml += `
            <div class="store-container">
                <div class="store-info-container">
                    <div class="store-address">
                        <span>${address[0]}</span>
                        <span>${address[1]}</span>
                    </div>
                    <div class="store-phone-number">${phone}</div>
                </div>
                <div class="store-number-container">
                    <div class="store-number">
                        ${index+1}
                    </div>
                </div>
            </div>
        `
        document.querySelector('.stores-list').innerHTML = storesHtml;
    }
}

/******** */
// document.querySelector('.store-container').innerHTML = {
      
// }
/******** */

// Show stores markers on the map
function showStoresMarkers(){
    var bounds = new google.maps.LatLngBounds();
    for(var [index, store] of stores.entries()){
        var latlng = new google.maps.LatLng(
            store["coordinates"]["latitude"],
            store["coordinates"]["longitude"]);
        var name = store["name"];
        var address = store["addressLines"][0];

        bounds.extend(latlng);
        createMarker(latlng, name, address, index+1)
    }
    map.fitBounds(bounds);
}

function createMarker(latlng, name, address, index){
    const exploreIcon = '<i class="fas fa-search" style="color: #1785A1"></i>';
    const phoneIcon = '<i class="fas fa-phone" style="color: #1785A1"></i>';
    var openStatusText = stores['openStatusText'];
    var html = `
        <b> ${name} </b> <br/> 
        OPen at 86pm <br/> <hr> <br/> 
        ${exploreIcon} ${address} <br />
        ${phoneIcon} ${stores.phone}
    `;
    var marker = new google.maps.Marker({
      map: map,
      position: latlng,
      label: index.toString(),
      icon: 'images/store2.png'
    });
    google.maps.event.addListener(marker, 'click', function() {
      infoWindow.setContent(html);
      infoWindow.open(map, marker);
    });
    markers.push(marker);
}
