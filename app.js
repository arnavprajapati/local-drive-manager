import express from 'express'
import { readdir } from 'fs/promises'

const app = express()

// Enabling CORS
app.use('/', (req, res, next) => {
    res.set('Access-Control-Allow-Origin', '*')
    next()
})

// app.use(express.static("storage"))

// Serving Files using dynamic routing 
app.get('/:filename', (req, res, next) => {
    console.log(req.url);
    const { filename } = req.params
    console.log(filename);
    if(req.query.action === 'download'){
        res.set('Content-Disposition', 'attachment')
    }
    res.sendFile(`${import.meta.dirname}/storage/${filename}`)
})

// Serving Directory Content
app.get('/', async (req, res) => {
    const fileList = await readdir("./storage")
    res.json(fileList)
})

app.listen(5700, () => {
    console.log("server started at port 5700");
})