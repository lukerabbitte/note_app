const express = require('express')
const app = express()
app.use(express.json())
const { uuid } = require('uuidv4')
const morgan = require('morgan')
app.use(morgan('tiny'))
const cors = require('cors')
app.use(cors())
app.use(express.static('dist'))

let notes = [
    {
        "id": "24de8d36-ec96-47f6-a219-6e2554c535b8",
        "content": "EFEFDddddEFEF",
        "important": true
    }
]

app.get('/', (req, res) => {
    res.send('<h1>Hello World!</h1>');
});

app.get('/api/notes', (req, res) => {
    res.json(notes)
})

app.get('/api/notes/:id', (req, res) => {
    const id = req.params.id
    const note = notes.find(note => note.id === id)

    if(note) {
        res.json(note)
    }
    else {
        res.status(404).end()
    }
})

app.delete('/api/notes/:id', (req, res) => {
    const id = req.params.id
    notes = notes.filter(note => note.id !== id)
    res.status(204).end()
})

app.put('/api/notes/:id', (req, res) => {
    const id = req.params.id
    let note = notes.find(note => note.id === id)

    if(!note){
        return res.status(404).json({ error: "Note not found"})
    }

    console.log(`The current important value is ${note.important}.`)
    console.log(`The requested new important value is ${req.body.important}.`)

    note.content = req.body.content || note.content // default option
    if (req.body.important !== undefined) {
        note.important = req.body.important
    }

    console.log(`The final important value is ${note.important}.`)

    res.status(200).json(note)
})

app.post('/api/notes/', (req, res) => {
    const body = req.body
    const content = body.content
    console.log(content)

    if (!content) {
        return res.status(400).json({
            error: 'Content Missing'
        })
    }

    const note = {
        id: uuid(),
        content: req.body.content,
        important: req.body.important
    }

    notes = notes.concat(note)

    res.status(200).json(note)
})

// Define some middleware
const unknownEndpoint = (req, res) => {
    res.status(404).send({ error: 'Unknown Endpoint' })
}

app.use(unknownEndpoint)


const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})