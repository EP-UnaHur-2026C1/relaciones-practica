const express = require('express')
const {sequelize, Libro, Autor} = require('./db/models')
const middleware = require('./middlewares/existe.middleware')
const schemaValidator = require('./middlewares/schemaValidator')
const autorSchema = require('./schemas/autor.schema')
const app = express()
const PORT = process.env.PORT || 3001


app.use(express.json())

app.get('/autores', async (req, res) => {
    const autores = await Autor.findAll({
    })
    res.json(autores)
})

app.post('/autores', schemaValidator(autorSchema), async (req, res) => {
    const result = await Autor.create(req.body)
    res.status(201).json(result)
})

app.get('/autores/:id',  
        middleware.validaPathParameterMiddleware,
        middleware.validaExisteMiddleware(Autor), 
     async (req, res) => {
    const autor = await Autor.findByPk(req.params.id, {
        include: [
            {
                model: Libro,
                as: 'libros'
            }
        ]
    })
    res.json(autor)
})

app.get('/libros/:id', 
    middleware.validaPathParameterMiddleware,   
    middleware.validaExisteMiddleware(Libro), 
    async(req, res) => {
    const libro = await Libro.findByPk(req.params.id, {
        include: [
            {
                model: Autor,
                as: 'autor'
            }
        ]
    })
    res.status(200).json(libro)
})


app.listen(PORT, async (err)=> {
    if(err) {
        console.error(err.message)
        process.exit(1)
    }
    await sequelize.sync({})
    console.log(`App iniciada en el puerto ${PORT}`)
})
