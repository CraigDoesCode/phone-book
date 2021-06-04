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


// test route (will be to index.html in future)
app.get('/', (req,res) => {
    res.send('<h1>Its working</h1>')
})
// Route for info page
app.get('/info', (req,res) => {
    const noOfPersons = persons.length;
    const date = new Date();
    res.send(`<p>Phonebook has infor for ${noOfPersons} people</br></br> ${date}<p>`)
})
// route to full data
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
})



const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})