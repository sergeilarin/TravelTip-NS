import { locService } from './loc.service.js'
import { utilService } from './utilService.js'

export const mapService = {
    initMap,
    addMarker,
    panTo,
    getlocetion
}

const API_KEY = 'AIzaSyCCDS3tCCPJQoWT-ZNIBLHdpHAajIqke_o';
var gMap;


function initMap(lat = 32.0749831, lng = 34.9120554) {
    console.log('InitMap');
    console.log(lat, lng, 'locs');
    return _connectGoogleApi()
        .then(() => {
            console.log('google available');
            gMap = new google.maps.Map(
                document.querySelector('#map'), {
                center: { lat, lng },
                zoom: 13
            })

            console.log('Map!', gMap);
            return gMap
        })

}


function addMarker(loc) {
    console.log(loc);
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    console.log({ marker });
    return marker;
}

function panTo(lat, lng, address) {
    const place = {
        id: utilService.makeId(),
        name:address,
        createdAt: Date.now(),
        updatedAt: Date.now(),
        lat: lat,
        lng: lng

    };
    locService.addLoc(place)
    var laLatLng = new google.maps.LatLng(lat, lng);
    gMap.panTo(laLatLng);
}



function _connectGoogleApi() {
    if (window.google) return Promise.resolve()
    var elGoogleApi = document.createElement('script');
    elGoogleApi.src = `https://maps.googleapis.com/maps/api/js?key=${API_KEY}`;
    elGoogleApi.async = true;
    document.body.append(elGoogleApi);

    return new Promise((resolve, reject) => {
        elGoogleApi.onload = resolve;
        elGoogleApi.onerror = () => reject('Google script failed to load')
    })
}

function getlocetion(address) {

    console.log('Getting from Network');

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => res.data.results)
        .then(place => place[0].geometry.location)
        .then(cord => {
            addMarker(cord)
            panTo(cord.lat, cord.lng, address)})



}