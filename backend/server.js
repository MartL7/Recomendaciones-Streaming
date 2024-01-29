import express, { json } from 'express'
import cors from 'cors'
//import { validateMovie, validatePartialMovie } from './schemas/movies.js'
import multer from 'multer' // --> Middleware para subir archivos
import sharp from 'sharp' // --> Optimizar imagenes
import { conection } from './db/db.js'

// Falta mostrar info sobre el contenido en las tarjetas -> ❌

// Metodos 
// GET --> Obtener datos
// POST --> Crear un nuevo elemento/recurso en el server ./movie
// PUT --> Actualizar totalmente un elemento si ya existe o crearlo si no existe ./movie/:id
// PATCH --> Actualizar parcialmente un elemento/recurso ./movie/:id
// DELETE --> Eliminar datos ./movie/:id

const storage = multer.memoryStorage() // Almacenar la imagen en memoria para acceder a ella fácilmente
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

app.use(cors({
    origin: (origin, callback) => {
        const ACCEPTED_ORIGINS = [
        'http://localhost:8080',
        'http://localhost:1234',
        'http://localhost:5173',
        'https://movies.com',
        'https://midu.dev'
        ]

        if (ACCEPTED_ORIGINS.includes(origin)) {
            return callback(null, true)
        }

        if (!origin) {
            return callback(null, true)
        }

        return callback(new Error('Not allowed by CORS'))
    }
}))

app.disable('x-powered-by') // desabilita o header x-powered-by de express

app.get('/content', async (req, res) => {

    try {
        const result = await conection.query(
            'SELECT * FROM content;'
        )
        return res.json(result[0])
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
        return res.json(result[0])
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.get('/content/:genre', async (req, res) => {
    const { genre } = req.params

    try {
        const result = await conection.query(
            'SELECT * FROM content WHERE genre = ?;',
            [genre]
        )
        return res.json(result[0])
    }

    catch(error) {
        return res.status(500).json({ error: error.message })
    }
})

app.post('/content', upload.single('poster'), async (req, res) => {
    const { title, type, genre } = req.body
    const poster = req.file.buffer // -> La imagen se recupera del buffer

    try {
        // Optimizar la imagen
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
