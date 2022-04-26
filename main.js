const express = require('express');

const app = express()

app.get("/", (req, res) => {
    console.log("OK")
    res.status(200).send()
})

app.listen(4000, () => console.log("Connecté"))