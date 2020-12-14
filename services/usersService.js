let createId = require("../util/makeid")

module.exports = function Service() {
    let service = {}

    let users = []

    service.getUsers = () => { return users }

    service.getUser = (id) => {
        let user = users.find((u) => u.id === id)
        if (user) {
            return user
        }
        throw new Error("unknown user")
    }

    service.createUser = (user) => {
        if(!user.id){
            user.id = createId()
        }
        users.push(user)
        return user.id
    }

    service.deleteUser = (id) => {
        let user = users.find((u) => u.id === id)
        if (user) {
            users.splice(users.indexOf(user), 1)
            return
        }
        throw new Error("unknown user")
    }

    service.updateUser = (updatedUserData) => {

        let user = users.find((u) => u.id === updatedUserData.id)
        if (user) {
            let idx = users.indexOf(user)
            users[idx] = { ...user, ...updatedUserData }
            return
        }
        throw new Error("unknown user")
    }
    return service
}