//import express
const express = require('express')
//create express app
const app = express()

//store data
const persons = [
    {
        id: 1,
        name: 'Atro Hellas',
        number: '040-123456'
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323532'
    },
    {
        id: 1,
        name: 'Mary Poppendick',
        number: '39-23-6423122'
    }
]


// test route 
app.get('/', (req,res) => {
    res.send('<h1>Its working</h1>')
})

app.get('/api/persons', (req, res) => {
    res.json(persons)
})



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})