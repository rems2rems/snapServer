function SnapsRouter(snapsService,usersService) {

    let router = require('express').Router()

    router.route("/albums/:userId")
        .post((req, res) => {
            try {
                let user = usersService.getUser(req.params.userId)
                let id = snapsService.createAlbum(req.params.userId)
                res.status(200).send({ id: id })
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }

        })
    router.route("/albums/:userId/:albumId")
        .get((req, res) => {
            try {
                let user = usersService.getUser(req.params.userId)
                res.json(snapsService.getAlbum(req.params.userId, req.params.albumId))
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
        .post((req, res) => {
            try {
                let user = usersService.getUser(req.params.userId)
                let album = snapsService.getAlbum(req.params.userId,req.params.albumId)
                let snap = req.body
                let id = snapsService.createSnap(req.params.userId, req.params.albumId, snap)
                res.status(200).send({ id: id })
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
        .delete((req, res) => {
            try {
                res.json(snapsService.deleteAlbum(req.params.userId, req.params.albumId))
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
    router.route("/albums/:userId/:albumId/:snapId")
        .get((req, res) => {
            try {
                let user = usersService.getUser(req.params.userId)
                let album = service.getAlbum(req.params.userId,req.params.albumId)
                res.json(snapsService.getSnap(req.params.userId, req.params.albumId, req.params.snapId))
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
        .put((req, res) => {
            try {
                let user = usersService.getUser(req.params.userId)
                let album = snapsService.getAlbum(req.params.userId,req.params.albumId)
                let snap = req.body
                snap = { ...snap, id: req.params.snapId }
                let id = snapsService.updateSnap(req.params.userId, req.params.albumId, snap)
                res.status(200).send({ id: id })
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
        .delete((req, res) => {
            try {
                res.json(snapsService.deleteSnap(req.params.userId, req.params.albumId, req.params.snapId))
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
    return router
}
module.exports = SnapsRouter
