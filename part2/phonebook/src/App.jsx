import { useState } from 'react'

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
        <div key={person.id}>{person.name} {person.number}</div>
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
    if (props.persons.map(person => person.name).includes(props.newName)) {
      alert(`${props.newName} is already added to phonebook`)
      return
    } else {
      props.setPersons(props.persons.concat(personObject))
      props.setNewName('')
      props.setNewNumber('')
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

  // Filter persons
  const personsToShow = persons.filter(person =>
    person.name.toLowerCase().includes(newFilter.toLowerCase())
  )

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
      <Persons persons={personsToShow}/>
    </div>
  )
}

export default App