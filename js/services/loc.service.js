'use strict'
import { storageService } from './storage.service.js'

export const locService = {
    getLocs,
    addLoc,
    arrLocs,
    removeloc
}
 const gLocs = []
 
function arrLocs(){
   return gLocs
}

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

function removeloc(locId){
    var locIdx = gLocs.findIndex( (loc)=> {
        return locId === loc.id
    })
    gLocs.splice(locIdx, 1)
    storageService.saveToStorage('locs', gLocs)
}
