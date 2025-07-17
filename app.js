import express from 'express'
import { readdir } from 'fs/promises'

const app = express()

// Enabling CORS
app.use('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

// app.use(express.static("storage"))

// Serving Files 
app.use((req, res, next) => {
    console.log(req.query.action);
    if(req.query.action === 'download'){
        res.set('Content-Disposition', 'attachment')
    }
    express.static("storage")(req, res, next)
})

// Serving Directory Content
app.get('/', async (req, res) => {
    const fileList = await readdir("./storage")
    res.json(fileList)
})

app.listen(5700, () => {
    console.log("server started at port 5700");
})