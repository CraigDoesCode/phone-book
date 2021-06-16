//import express
const { response } = require('express')
const express = require('express')
//create express app
const app = express()

app.use(express.json())

// Middleware - log all requests
/*const requestLogger = (request, response, next) => {
    console.log('Method:', request.method)
    console.log('Path:  ', request.path)
    console.log('Body:  ', request.body)
    console.log('---')
    next()
}
app.use(requestLogger)*/

// import morgan request logger

const morgan = require('morgan')

morgan.token('person', (request, response) => {return JSON.stringify(request.body)})
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :person'))

//store data
let persons = [
    {
        id: 1,
        name: 'Atro Hellas',
        number: '040-123456',
        quantity: 9
    },
    {
        id: 2,
        name: 'Ada Lovelace',
        number: '39-44-5323532',
        quantity: 6
    },
    {
        id: 3,
        name: 'Mary Poppendick',
        number: '39-23-6423122',
        quantity: 7
    }
]


// test route (will be to index.html in future)
app.get('/', (request,response) => {
    response.send('<h1>Its working</h1>')
})
// Route for info page 
app.get('/info', (request,response) => {
    const noOfPersons = persons.length;
    const date = new Date();
    response.send(`<p>Phonebook has info for ${noOfPersons} people</br></br> ${date}<p>`)
})
// route to full data
app.get('/api/persons', (request, response) => {
    response.json(persons)
})
// route for individual elements
app.get('/api/persons/:id', (request,response) => {
    const id = Number(request.params.id)
    const person = persons.find(person => person.id === id)

    if (person){
        response.json(person)
    } else {
        response.status(404).end()
    }
})
// route to delete items
app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)

    response.status(204).end()
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
app.post('/api/persons', (request,response) => {
    const body = request.body
    // input error handling
    if (!body.name || !body.number){
        return response.status(400).json({
            error: `${!body.name ? !body.number ? 'Person must have a name and number': 'person must have a name' : 'person must have a number'}`
        })
    }
    //check if name already exist
    for (const person of persons){
        //console.log(person)
        if (person.name === body.name){
            return response.status(400).json({
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

    response.json(newPerson)

})

// route to update items

app.put('/api/persons', (request, response) => {
    const body = request.body
    const id = Number(body.id)
    const numSold = body.numSold
    console.log("ID:", id)
    for(const person of persons){
        console.log('person:', person.id)
        if (person.id === id){
            console.log('before:', person)
            person.quantity = person.quantity - numSold
            console.log('After:', person)
            break
        }
    }
    response.send('this is an update')

})

 //Middleware -  
const unknownEndpoint = (request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
  }
  
  app.use(unknownEndpoint)


const PORT = 3000;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})