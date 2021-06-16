'use strict'
import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc
}


const gLocs = [
    { name: 'Greatplace', lat: 32.047104, lng: 34.832384 },
    { name: 'Neveragain', lat: 32.047201, lng: 34.832581 }
]

function getLocs() {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(gLocs);
        }, 2000)
    });
}



function addLoc(place) {
    gLocs.push(place)
    storageService.saveToStorage('locs', gLocs)
   
}
