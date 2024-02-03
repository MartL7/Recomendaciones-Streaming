import { Router } from "express"
import { conection } from '../db/db.js'
import { mapContentResults } from '../utils/mapResults.js'
import multer from 'multer'
import sharp from 'sharp'

export const routerContent = Router()

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // -> 5MB
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file type. Only images are allowed.'));
        }
    }
})

routerContent.get('/', async (req, res) => {

    try {
        const result = await conection.query('SELECT * FROM content;')
        
        return res.json(result[0])
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

routerContent.get('/all', async (req, res) => {
    try {
        const result = await conection.query('SELECT * FROM content;')

        const mappedResults = mapContentResults(result[0])

        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

routerContent.get('/id/:id', async (req, res) => {
    const { id } = req.params

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE id = ?;',
            [id]
        )

        const mappedResults = mapContentResults(result[0])
        
        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

routerContent.get('/type/:type', async (req, res) => {
    const { type } = req.params

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE type = ?;',
            [type]
        )

        const mappedResults = mapContentResults(result[0])
        
        return res.json(mappedResults)
    }
    
    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

routerContent.get('/genre/:genre', async (req, res) => {
    const { genre } = req.params

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE genre = ?;',
            [genre]
        )

        const mappedResults = mapContentResults(result[0])

        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

// -> POST /content
routerContent.post('/', upload.single('poster'), async (req, res) => {
    const { title, type, genre } = req.body
    const poster = req.file.buffer

    try {
        const optimizedPoster = await sharp(poster)
            .resize(500)
            .jpeg({ quality: 50 })
            .toBuffer()

        const result = await conection.query(
            'INSERT INTO content (title, poster, type, genre) VALUES (?, ?, ?, ?);',
            [title, optimizedPoster, type, genre]
        )
        return res
        .status(200)
        .header('Content-Type', 'image/jpeg')
        .json({
            id: result[0].insertId,
            title,
            poster: result[0].affectedRows === 1 ? 'imagen guardada' : 'error al guardar imagen',
            type
        })
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

// -> DELETE and PUT /content --> Future ❌