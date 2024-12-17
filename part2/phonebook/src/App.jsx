import { useState, useEffect } from 'react'
import personService from './services/personService'

const Filter = (props) => {
  const handleFilterChange = (event) => {
    props.setNewFilter(event.target.value)
  }
  return (
    <div>
      filter shown with <input 
                          value={props.newFilter}
                          onChange={handleFilterChange}/>
    </div>
  )
}

const Persons = (props) => {
  return (
    <div>
      {props.persons.map(person => 
        <div key={person.id}>
          {person.name} {person.number}
          <button onClick={() => props.handleDelete(person.id)}>delete</button>
        </div>
      )}
    </div>
  )
}

const PersonForm = (props) => {
  // onChange event handler
  const handleNameChange = (event) => {
    props.setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    props.setNewNumber(event.target.value)
  }

  // onSubmit event handler
  const addPerson = (event) => {
    event.preventDefault()
    console.log('button clicked', event.target)
    const personObject = {
      name: props.newName,
      number: props.newNumber
    }
  // Check if the name is already in the phonebook
  const existingPerson = props.persons.find(person => person.name === props.newName)
  if (existingPerson) {
    if (window.confirm(`${props.newName} is already added to phonebook, replace the old number with a new one?`)) {
      // Update the existing person
      personService
        .update(existingPerson.id, personObject)
        .then(returnedPerson => {
          props.setPersons(props.persons.map(person => person.id !== existingPerson.id ? person : returnedPerson))
          props.setNewName('')
          props.setNewNumber('')
        })
    }
  } else {
    // Save the new person to the server
    personService
      .create(personObject)
      .then(returnedPerson => {
        props.setPersons(props.persons.concat(returnedPerson))
        props.setNewName('')
        props.setNewNumber('')
      })
  }
}

  return (
    <form onSubmit={addPerson} >
      <div>
        name: <input 
                value={props.newName}
                onChange={handleNameChange}
              />
      </div>
      <div>
        number: <input 
                  value={props.newNumber}
                  onChange={handleNumberChange}/>
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  )
}

const App = () => {
  const [persons, setPersons] = useState([
    { name: 'Arto Hellas', number: '040-123456', id: 1 },
    { name: 'Ada Lovelace', number: '39-44-5323523', id: 2 },
    { name: 'Dan Abramov', number: '12-43-234345', id: 3 },
    { name: 'Mary Poppendieck', number: '39-23-6423122', id: 4 }
  ]) 
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [newFilter, setNewFilter] = useState('')

  // Fetch data from server
  useEffect(() => {
    console.log('effect')
    personService
      .getAll()
      .then(initialPersons => {
        console.log('promise fulfilled')
        setPersons(initialPersons)
      })
  }, [])

  // Filter persons
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

  const handleDelete = (id) => {
    if (window.confirm('Do you really want to delete this person?')) {
      personService
        .deletePerson(id)
        .then(() => {
          setPersons(persons.filter(person => person.id !== id))
        })
    }
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter newFilter={newFilter}
              setNewFilter={setNewFilter}
      />
      <h2>Add a new</h2>
      <PersonForm 
                  persons={persons}
                  newName={newName}
                  newNumber={newNumber}
                  setPersons={setPersons}
                  setNewName={setNewName}
                  setNewNumber={setNewNumber}
      />
      <div>debug: {newName} {newNumber}</div>
      <h2>Numbers</h2>
      <Persons persons={personsToShow} handleDelete={handleDelete} />
    </div>
  )
}

export default App