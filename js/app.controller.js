import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/utilService.js'

window.onload = onInit;
// window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;

function onInit() {
    mapService.initMap()
        .then((map) => {
            map.addListener('click', (event) => {
                console.log('event', event);
                var { lat, lng } = event.latLng
                var latitude = lat();
                var longitude = lng();
                var place = {
                    id: utilService.makeId(),
                    // name: prompt('The name of the place:') ,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    coords: {
                        latitude,
                        longitude
                    }

                }
                mapService.addMarker({ lat: latitude, lng: longitude })
                console.log(place);
                locService.addLoc(place)
                console.log('Map is ready');
            })
        })
        .catch(() => console.log('Error: cannot init map'));
}

// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
}

// function onAddMarker() {
//     console.log('Adding a marker');
//     mapService.addMarker({ lat: 32.0749831, lng: 34.9120554 });
// }

function onGetLocs() {
    locService.getLocs()
        .then(locs => {
            console.log('Locations:', locs)
            document.querySelector('.locs').innerText = JSON.stringify(locs)
        })
}

function onGetUserPos() {
    getPosition()
        .then(pos => {
            console.log('User position is:', pos.coords);
            document.querySelector('.user-pos').innerText =
                `Latitude: ${pos.coords.latitude} - Longitude: ${pos.coords.longitude}`
        })
        .catch(err => {
            console.log('err!!!', err);
        })
}
function onPanTo(ev) {
    ev.preventDefault()
    console.log('Panning the Map');
    const elInputSearch = document.querySelector('input[name=search]');
    mapService.getlocetion(elInputSearch.value)
        .then(res => console.log(res))

    // wikiTubeService.getVideos(elInputSearch.value)
    // mapService.panTo(35.6895, 139.6917);
}
