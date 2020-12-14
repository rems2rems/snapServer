const express = require('express')

function createApp() {
    let app = express()

    let bodyParser = require("body-parser")
    app.use(bodyParser.urlencoded({ limit: "20mb", extended: false }))
    app.use(bodyParser.json({ limit : "20mb", extended: false }))

    let methodOverride = require("method-override")

    //fonctionne avec form action="....?_method=PUT" (+method="POST")
    // app.use(methodOverride("_method"))

    //fonctionne avec input(type="hidden" name="_method" value="PUT")
    //dans le formulaire (+method="POST")
    app.use(methodOverride(function (req, res) {
        if (req.body && typeof req.body === 'object' && '_method' in req.body) {
            var method = req.body._method
            delete req.body._method
            console.log("ok....");
            return method
        }
    }))

    app.use(express.static(__dirname + '/public'))
    app.set('view engine', 'pug');
    app.set('views', __dirname + '/vues');

    return app
}

module.exports = createApp
