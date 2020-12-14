
let createApp = require("./createApp")

let app = createApp()

let usersService = require("./services/usersService")()
let usersRouter = require('./routes/usersRouter')(usersService)
app.use('/api/v1', usersRouter)

let snapsService = require("./services/snapsService")()
let snapsRouter = require('./routes/snapsRouter')(snapsService, usersService)
app.use('/api/v1', snapsRouter)

app.all('*', (request, response) => {
    response.status(404).json("unknown route")
})

app.listen(3000, () => {
    usersService.createUser({ name: "john doe", id: "8h8cv9" })
    snapsService.createAlbum("8h8cv9", "nHya2t")
    snapsService.createSnap("8h8cv9", "nHya2t", { id: "yj9jKq", desc: "nice pic!", location: { lon: -0.56419, lat: 45.0672991 } })
    snapsService.createSnap("8h8cv9", "nHya2t", { id: "e2lki8", desc: "another pic!", location: { lon: -0.56419, lat: 45.0672991 } })
    console.log("listening on http://localhost:3000 ...");
})