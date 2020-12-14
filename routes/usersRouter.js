function UsersRouter(service) {

    let router = require('express').Router()

    router.route("/users")
        .get((req, res) => {
            res.json(service.getUsers())
        })
        .post((req, res) => {
            let id = service.createUser(req.body)
            res.status(200).send({id : id})
        })
    router.route("/users/:userId")
        .get((req, res) => {
            try {

                res.json(service.getUser(req.params.userId))
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
        .put((req, res) => {
            let user = req.body
            user = { ...user, id: req.params.userId }
            service.updateUser(user)
            res.status(200).send()
        })
        .delete((req, res) => {
            try {
                service.deleteUser(req.params.userId)
                res.status(200).send()
            }
            catch (e) {
                console.log(e);
                res.status(404).json(e.message)
            }
        })
    return router
}
module.exports = UsersRouter