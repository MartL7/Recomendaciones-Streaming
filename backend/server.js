import express, { json } from 'express'
import cors from 'cors'
import multer from 'multer'
import sharp from 'sharp'
import { conection } from './db/db.js'
import { truncateBase64 } from './utils/truncate.js'

const storage = multer.memoryStorage()
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB
    },
    fileFilter: (req, file, callback) => {
        if (file.mimetype.startsWith('image/')) {
            callback(null, true)
        } else {
            callback(new Error('Invalid file type. Only images are allowed.'));
        }
    }
})

const app = express()
app.use(json()) 

app.use(cors({ origin: '*' })) // habilita CORS para todos los origenes

app.disable('x-powered-by')

app.get('/content', async (req, res) => {

    try {
        const result = await conection.query('SELECT * FROM content;')
        
        return res.json(result[0])
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/allcontent', async (req, res) => {
    
    try {
        const result = await conection.query('SELECT * FROM content;')

        const mappedResults = result[0].map(item => {
            const posterBuffer = item.poster instanceof Buffer ? item.poster : Buffer.from(item.poster, 'binary')
            const base64String = posterBuffer.toString('base64')
        
            const truncatedBase64 = truncateBase64(base64String, 50)

            return { ...item, poster: truncatedBase64 }
        })

        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/content/:type', async (req, res) => {
    const { type } = req.params ?? req.query

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE type = ?;',
            [type]
        )

        const mappedResults = result[0].map(item => {
            const posterBuffer = item.poster instanceof Buffer ? item.poster : Buffer.from(item.poster, 'binary')
            const base64String = posterBuffer.toString('base64')
        
            const truncatedBase64 = truncateBase64(base64String, 50)

            return { ...item, poster: truncatedBase64 }
        })

        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/content/:id', async (req, res) => {

    const { id } = req.params

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE id = ?;',
            [id]
        )

        const mappedResults = result[0].map(item => {
            const posterBuffer = item.poster instanceof Buffer ? item.poster : Buffer.from(item.poster, 'binary')
            const base64String = posterBuffer.toString('base64')
        
            const truncatedBase64 = truncateBase64(base64String, 50)

            return { ...item, poster: truncatedBase64 }
        })

        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/content/:genre', async (req, res) => {
    const { genre } = req.params ?? req.query

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE genre = ?;',
            [genre]
        )

        const mappedResults = result[0].map(item => {
            const posterBuffer = item.poster instanceof Buffer ? item.poster : Buffer.from(item.poster, 'binary')
            const base64String = posterBuffer.toString('base64')
        
            const truncatedBase64 = truncateBase64(base64String, 50)

            return { ...item, poster: truncatedBase64 }
        })

        return res.json(mappedResults)
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.post('/content', upload.single('poster'), async (req, res) => {
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

const port = process.env.PORT ?? 3000

app.listen(port, () => {
  console.log(`Server running on port ${port}`)
})
