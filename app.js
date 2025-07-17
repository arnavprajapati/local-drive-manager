import express from 'express'
import { readdir, rm } from 'fs/promises'

const app = express()

// Enabling CORS
app.use('/', (req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*'
    })
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

app.delete('/:filename', async (req, res, next) => {
    const { filename } = req.params
    const filePath = `./storage/${filename}`
    try{
        await rm(filePath)
        res.json({"message": "file deleted successfully"})
    }catch(err){
        res.status(404).message({"message": "file not found"})
    }
})

// Serving Directory Content
app.get('/', async (req, res) => {
    const fileList = await readdir("./storage")
    res.json(fileList)
})

app.listen(5700, () => {
    console.log("server started at port 5700");
})