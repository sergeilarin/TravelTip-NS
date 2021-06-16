

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
                zoom: 15
            })

            console.log('Map!', gMap);
            return gMap
        })

}


function addMarker(loc) {
    var marker = new google.maps.Marker({
        position: loc,
        map: gMap,
        title: 'Hello World!'
    });
    console.log({ marker });
    return marker;
}

function panTo(lat, lng) {
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
    // const termVideosMap = storageService.load(KEY) || {};
    // if (termVideosMap[address]) return Promise.resolve(termVideosMap[address]);

    console.log('Getting from Network');

    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`)
        .then(res => console.log(res.data))
        .then(ytVideos => ytVideos.map(ytVideo => ({
            id: ytVideo.id.videoId,
            title: ytVideo.snippet.title,
            img: {
                url: ytVideo.snippet.thumbnails.default.url,
                width: ytVideo.snippet.thumbnails.default.width,
                height: ytVideo.snippet.thumbnails.default.height,
            }
        })))
        .then(videos => {
            termVideosMap[address] = videos;
            storageService.save(KEY, termVideosMap)
            return videos;
        })

}