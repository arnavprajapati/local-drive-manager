import express from 'express'
import { createWriteStream } from 'fs'
import { readdir, rename, rm, stat } from 'fs/promises'
import cors from "cors"

const app = express()

app.use(express.json())

app.use(cors())

app.get('/directory/:dirname?', async (req, res) => {
    const { dirname } = req.params
    // console.log(dirname);
    const fullPathDir = `./storage/${dirname ? dirname : ""}`
    const fileList = await readdir(fullPathDir)
    const resData = []
    for(const item of fileList){
        const stats = await stat(`${fullPathDir}/${item}`)
        resData.push({"name": item, "isDirectory": stats.isDirectory() })
    }
    // console.log(resData);
    res.json(resData)
})

app.get('/files/*', (req, res, next) => {
    const { 0: filepath } = req.params
    console.log(filepath);
    if(req.query.action === 'download'){
        res.set('Content-Disposition', 'attachment')
    }
    res.sendFile(`${import.meta.dirname}/storage/${filepath}`)
})

app.post('/files/:filename', (req, res, next) => {
    const { filename } = req.params
    // console.log(filename);
    const writeStream = createWriteStream(`./storage/${filename}`)
    req.pipe(writeStream)
    req.on('end', () => {
        res.json({"message": "uploaded successfully"})
    })
})

app.delete('/files/:filename', async (req, res, next) => {
    const { filename } = req.params
    const filePath = `./storage/${filename}`
    try{
        await rm(filePath)
        res.json({"message": "file deleted successfully"})
    }catch(err){
        res.status(404).message({"message": "file not found"})
    }
})

app.patch('/files/:filename', async (req, res, next) => {
    const { filename } = req.params
    // console.log(filename);
    // console.log(req.body);
    const oldPath = `./storage/${filename}`;
    const newPath = `./storage/${req.body.newFileName}`;
    await rename(oldPath, newPath);
    res.send({"message": "rename successfully"})
})


app.listen(5700, () => {
    // console.log("server started at port 5700");
})