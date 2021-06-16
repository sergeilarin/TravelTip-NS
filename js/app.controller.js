import { locService } from './services/loc.service.js'
import { mapService } from './services/map.service.js'
import { utilService } from './services/utilService.js'

window.onload = onInit;
// window.onAddMarker = onAddMarker;
window.onPanTo = onPanTo;
window.onGetLocs = onGetLocs;
window.onGetUserPos = onGetUserPos;
window.onRemoveloc = onRemoveloc
window.onGoloc = onGoloc
window.onGetPosition = onGetPosition

function onInit() {
    renderLocsTab()
    mapService.initMap()
        .then((map) => {
            map.addListener('click', (event) => {
                var { lat, lng } = event.latLng
                var latitude = lat();
                var longitude = lng();
                var place = {
                    id: utilService.makeId(),
                    name: 'yallaa',
                    // name: prompt('The name of the place:') ,
                    createdAt: Date.now(),
                    updatedAt: Date.now(),
                    lat: latitude,
                    lng: longitude
                }
               
                mapService.addMarker({ lat: latitude, lng: longitude });
                locService.addLoc(place)
                renderLocsTab()
            })

        })
        .catch(() => console.log('Error: cannot init map'));
}

function renderLocsTab() {
    const locs = locService.arrLocs()
    var strHTML = `<tr>
        <th class="th">Place name</th>
        <th  class="th">Id</th>
        <th  class="th">latitude</th>
        <th  class="th">longitude</th>
        <th  class="th">Go</th>
        <th  class="th">Delete</th>
        </tr>`;
    var strHTMLS = locs.map(loc => {
        console.log(loc, 'loc');
        return `<tr>
                 <td>${loc.name}</td>
                 <td>${loc.id}</td>
                 <td>${loc.lat}</td>
                 <td>${loc.lng}</td>
                 <td> <button class="go" type="button" onclick="onGoloc('${loc.lat}','${loc.lng}')">Go</button></td>
                 <td> <button class="delete" type="button" onclick="onRemoveloc('${loc.id}','${loc}')">Delete</button></td>
                     </tr>`
    })
    document.querySelector('.tabel').innerHTML = strHTML + strHTMLS.join('')
}

function onGetPosition() {
    getPosition()
}

function showLocation(position) {
    console.log(position);
    mapService.initMap(position.coords.latitude, position.coords.longitude)
    mapService.addMarker({ lat: position.coords.latitude, lng: position.coords.longitude })
}

function onGoloc(lat,lng) {
    console.log(lat, lng, 'locs');
    mapService.initMap(lat,lng)
    mapService.addMarker(lat,lng)
}

function onRemoveloc(locId) {
    locService.removeloc(locId)
    renderLocsTab()
}


// This function provides a Promise API to the callback-based-api of getCurrentPosition
function getPosition() {
    if (!navigator.geolocation) {
        alert("HTML5 Geolocation is not supported in your browser.");
        return;
    }
    console.log('Getting Pos');
    return new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject)
    })
    .then(showLocation)
}



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
    console.log(elInputSearch.value);
}
