const makeId = require("../util/makeid")
let createId = require("../util/makeid")

module.exports = function Service() {
    let service = {}

    let albums = {}

    service.createAlbum = (userId,albumId) => {

        if(!albumId){
            albumId = createId()
        }

        if (albums[userId] == undefined) {
            albums[userId] = {}
        }
        albums[userId][albumId] = []
        return albumId
    }
    service.getAlbum = (userId, albumId) => {
        if (albums[userId][albumId]) {
            return albums[userId][albumId]
        }
        throw new Error("unknown album")
    }
    service.deleteAlbum = (userId, albumId) => {
        if (albums[userId][albumId]) {
            delete albums[userId][albumId]
            return
        }
        throw new Error("unknown album")
    }

    service.createSnap = (userId, albumId, snap) => {
        try {
            let snaps = albums[userId][albumId]
            if(!snap.id){
                snap.id = createId()
            }
            snaps.push(snap)
            return snap.id
        }
        catch (e) {
            throw new Error("unknown user/album")
        }
    }

    service.getSnap = (userId, albumId, snapId) => {
        try {
            let album = albums[userId][albumId].find((s) => s.id === snapId)
            if (album) {
                return album
            }
            throw new Error("unknown user/album")
        }
        catch (e) {
            throw new Error("unknown user/album/snap")
        }
    }

    service.updateSnap = (userId, albumId, newSnapData) => {
        try {
            let snap = albums[userId][albumId].find((s) => s.id === newSnapData.id)
            let idx = albums[userId][albumId].indexOf(snap)
            if (idx < 0) {
                throw new Error('unknown snap')
            }
            snap = { ...snap, ...newSnapData }
            albums[userId][albumId][idx] = snap
        }
        catch (e) {
            throw new Error("unknown user/album/snap")
        }
    }

    service.deleteSnap = (userId, albumId, snapId) => {
        try {
            let snap = albums[userId][albumId].find((s) => s.id === snapId)
            let idx = albums[userId][albumId].indexOf(snap)
            if (idx < 0) {
                throw new Error('unknown snap')
            }
            albums[userId][albumId].splice(idx, 1)
        }
        catch (e) {
            throw new Error("unknown user/album/snap")
        }
    }
    return service
}