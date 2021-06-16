'use strict'
import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc
}


const gLocs = []

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
    console.log(gLocs);
   
}
