import express from 'express'
import { readdir } from 'fs/promises'

const app = express()


app.use('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})


app.get('/', async (req, res) => {
    const fileList = await readdir("./storage")
    res.json(fileList)
})

app.listen(5700, () => {
    console.log("server started at port 5700");
})
app.use(express.static("storage"))