import express from 'express'
import { createWriteStream } from 'fs'
import { mkdir, readdir, rename, rm, stat } from 'fs/promises'
import { join } from 'path'

const app = express()
const TOTAL_LIMIT = 10 * 1024 * 1024 * 1024; 

app.use((req, res, next) => {
    res.set({
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': '*',
        'Access-Control-Allow-Headers': '*'
    })
    next()
})

app.use(express.json())

async function getFolderSize(dirPath) {
    let totalSize = 0;
    try {
        const items = await readdir(dirPath);
        for (const item of items) {
            const itemPath = join(dirPath, item);
            const itemStat = await stat(itemPath);
            if (itemStat.isDirectory()) {
                totalSize += await getFolderSize(itemPath);
            } else {
                totalSize += itemStat.size;
            }
        }
    } catch (err) {
        console.error('Error calculating size:', err);
    }
    return totalSize;
}

function formatBytes(bytes) {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + ' ' + sizes[i];
}

app.get('/directory/?*', async (req, res, next) => {
    const { 0: dirname } = req.params
    const fullDirPath = `./storage/${dirname ? dirname : ""}`
    try {
        const readDirectory = await readdir(`${fullDirPath}`)
        const data = []
        for (const item of readDirectory) {
            const itemPath = `${fullDirPath}/${item}`;
            const fileStat = await stat(itemPath)
            let size = fileStat.size;
            
            if (fileStat.isDirectory()) {
                size = await getFolderSize(itemPath);
            }
            
            data.push({
                'name': item,
                'isDirectory': fileStat.isDirectory(),
                'size': size
            })
        }
        res.json(data)
    } catch (err) {
        res.status(500).json({ error: 'Failed to read directory' })
    }
})

app.post('/directory/?*', async (req, res) => {
    const { 0: dirName } = req.params
    await mkdir(`./storage/${dirName}`)
    res.json({"message": "directory created successfully"})
})

app.get('/files/?*', (req, res, next) => {
    const { 0: filename } = req.params
    console.log(filename);
    if (req.query.action === 'download') {
        res.set('Content-Disposition', 'attachment')
    }
    res.sendFile(`${import.meta.dirname}/storage/${filename}`)
})

app.post('/files/*', (req, res) => {
    const { 0: filename } = req.params
    const writeFile = createWriteStream(`./storage/${filename}`)
    req.pipe(writeFile)
    res.json({"message": "file uplaoded successfully"})
})

app.patch('/files/*', async (req, res, next) => {
    const { 0: filename } = req.params
    const { newFileName } = req.body
    const oldFilenamePath = `./storage/${filename}`
    const newFilenamePath = `./storage/${newFileName}`
    try {
        await rename(oldFilenamePath, newFilenamePath)
        res.json({"message": "rename file successfully"})
    } catch(err) {
        res.status(400).json({ "message": "rename failed", error: err.message })
    }
})

app.delete('/files/*', async (req, res) => {
    const { 0: filename } = req.params
    console.log(req.params);
    try {
        const filePath = `./storage/${filename}`
        await rm(filePath, {recursive: true})
        res.json({ "message": "file deleted successfully" })
    } catch (err) {
        res.status(400).json({ "message": "file not found" })
    }
})

app.get('/storage/stats', async (req, res) => {
    try {
        const totalBytes = await getFolderSize('./storage');
        res.json({
            used: totalBytes,
            total: TOTAL_LIMIT,
            usedFormatted: formatBytes(totalBytes),
            totalFormatted: formatBytes(TOTAL_LIMIT),
            percentage: Math.round((totalBytes / TOTAL_LIMIT) * 100)
        });
    } catch (err) {
        res.status(500).json({ error: 'Failed to calculate storage' });
    }
});

app.listen('3000', () => {
    console.log("server started at port 3000");
})