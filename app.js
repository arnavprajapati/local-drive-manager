import express from 'express'

const app = express()

app.use('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

app.get('/', (req, res) => {
    res.json(["test.txt", "image.png"])
})

app.listen(5700, () => {
    console.log("server started at port 5700");
})