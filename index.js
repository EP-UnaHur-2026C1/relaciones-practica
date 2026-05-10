const express = require('express')
const {sequelize, Libro, Autor} = require('./db/models')
const app = express()
const PORT = process.env.PORT || 3001


app.get('/autores', async (req, res) => {
    const autores = await Autor.findAll({
    })
    res.json(autores)
})

app.get('/autores/:id', async (req, res) => {
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

app.get('/libros/:id', async(req, res) => {
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
