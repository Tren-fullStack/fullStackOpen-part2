import { useState, useEffect } from 'react'
import personService from './services/persons' 
import Persons from './components/Persons'
import PersonForm from './components/PersonForm'
import Filter from './components/Filter'
import Added from './components/Added'

const App = () => {
  //initializes empty state of persons list and objects associated with persons
  const [persons, setPersons] = useState([])
  const [newPerson, setNewPerson] = useState('')
  const [newNumber,setNewNumber] = useState('')
  const [newSearch, setNewSearch] = useState('')
  const[newMessage, setNewMessage] = useState(null)

  //gives initial list of persons taken from server hosting db.json

  useEffect(() => {
    personService
      .getPersons()
      .then(data => setPersons(data) )
  }, [])

  //updates the name bar from user 'event' input
  const handleNewPerson = (event) => {
    console.log(`Person: ${event.target.value}`)
    setNewPerson(event.target.value)
  }

  //updates the number bar from user 'event' input
  const handleNewNumber = (event) => {
    console.log(`Number: ${event.target.value}`)
    setNewNumber(event.target.value)
  }

  //updates the search bar from user 'event' input
  const handleNewSearch = (event) => {
    console.log(`Filter: ${event.target.value}`)
    setNewSearch(event.target.value)
    console.log(filterPersons)
  }

  //sends new personObject to db.json hosted on server when user clicks button
  const addPerson = (event) => {
    event.preventDefault()
    const personObject = {
      name: newPerson,
      number: newNumber,
    }
    //checks if personObject's name or number already exists in persons array
    const personExists = persons.some(i=> i.name==newPerson)
    const numberExists = persons.some(i=>i.number==newNumber)

    //posts to server if objects of personObject do not exist, alerts user if exists
    if (!numberExists&&!personExists) {
      personService
        .createPerson(personObject)
        .then(data => {
          setPersons(persons.concat(data))
          setNewPerson('')
          setNewNumber('')
          setNewMessage(`Added ${data.name}`)
          setTimeout(() => {
            setNewMessage(null)
          }, 4000)
        })
        .catch(error => {
          setNewMessage(`Information of ${data.name} was already deleted from server`)
          setTimeout(() => {
            setNewMessage(null)
          }, 3000)
        })
 
    }else if (personExists&&!numberExists){
        const confirmed = confirm(`${newPerson} is already added to phonebook, replace the old number with a new one?`)
        let personData = persons.filter(person =>person.name===newPerson)
        let restOfPersons = persons.filter(person =>person.name!==newPerson)
        console.log(restOfPersons)
        console.log('index',persons.indexOf(personData))
        if (confirmed) {
          personService
            .updatePerson(personData.map(i=>i.id),personObject)
            .then(data => {
              setPersons(restOfPersons.concat(data))
              setNewPerson('')
              setNewNumber('')
              setNewMessage(`Updated ${data.name} phone number`)
              setTimeout(() => {
                setNewMessage(null)
              }, 4000)
            })
            .catch(error => {
              setNewMessage(`Information of ${data.name} was already deleted from server`)
              setTimeout(() => {
                setNewMessage(null)
              }, 3000)
            })
        } else {
          setNewPerson('')
          setNewNumber('')
        }
    }
    else {window.alert(`phone number: ${newNumber}, is already added to the phonebook`)}
  }

  const deletePerson = (id) => {
    const deletedName = persons.filter(person => person.id===id)
    const confirmed = confirm(`Delete ${deletedName.map(i=>i.name)}?`)

    if (confirmed) {
    personService
      .removePerson(id)
      .then(()=> {
        setPersons(persons.filter(person=>person.id !== id))
      })
    } 
    else {}
  }
  
  //returns objects in persons array that includes characters from filter function's user input
  const filterPersons = persons.filter(i => i.name.toLowerCase().includes(newSearch.toLowerCase()))
 
  //final html display
  return (
    <div>
      <h2>Phonebook</h2>
        <Added message={newMessage} />
        <Filter text='filter shown with: ' value={newSearch} onChange={handleNewSearch}/>
      <h3>Add a new</h3>
        <PersonForm onSubmit={addPerson} name={newPerson} number={newNumber} personChange={handleNewPerson}
        numberChange={handleNewNumber} type='submit' />
      <h3>Numbers</h3>
      <div>
          <Persons filterPersons={filterPersons} deletePerson={deletePerson}/>
      </div>
    </div>
  )
}

export default App