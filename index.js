//import express
const { response } = require('express')
const express = require('express')
//create express app
const app = express()

app.use(express.json())

//store data
let persons = [
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
        id: 3,
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
    res.send(`<p>Phonebook has info for ${noOfPersons} people</br></br> ${date}<p>`)
})
// route to full data
app.get('/api/persons', (req, res) => {
    res.json(persons)
})
// route for individual elements
app.get('/api/persons/:id', (req,res) => {
    const id = Number(req.params.id)
    const person = persons.find(person => person.id === id)
    res.json(person)
})
// route to delete items
app.delete('/api/persons/:id', (req, res) => {
    const id = Number(req.params.id)
    persons = persons.filter(person => person.id !== id)

    res.status(204).end()
})

// Generate unique ID number
const generateId = () => {
    id = Math.floor(Math.random()*10000)
    for (const person in persons){
        if (person.id === id){
            return generateId
        }
    }
    return id;
}

// route to post items
app.post('/api/persons', (req,res) => {
    const body = req.body
    // input error handling
    if (!body.name || !body.number){
        return res.status(400).json({
            error: `${!body.name ? !body.number ? 'Person must have a name and number': 'person must have a name' : 'person must have a number'}`
        })
    }
    //check if name already exist
    for (let person in persons){
        if (person.name === body.name){
            return res.status(400).json({
                error: 'Name already exists'
            })        
        }
    }
    //console.log(body)
    const newPerson = {
        id: generateId(),
        name: body.name,
        number: body.number
    }
    //console.log(newPerson);
    persons = persons.concat(newPerson)

    res.json(newPerson)

})


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})