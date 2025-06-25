let mapOptions = {
    center:[16.61278, 120.31871],
    zoom:5
}

let map = new L.map('map' , mapOptions);

let layer = new L.TileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png',{maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'});
map.addLayer(layer);

let marker = null;

map.on('click', (event)=>{

    if(marker!=null){

    map.removeLayer(marker);
    
    }
    marker = L.marker([event.latlng.lat,event.latlng.lng]).addTo(map);
    // return  event.latlng.lat;
});