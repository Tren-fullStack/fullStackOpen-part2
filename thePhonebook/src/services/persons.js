import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
    const request = axios.get(baseUrl)
    return request.then(i => i.data)
}

const createPerson = (newObject) => {
    const request = axios.post(baseUrl,newObject)
    return request.then(i => i.data)
  }

const removePerson = (id) => {
  const request = axios.delete(`${baseUrl}/${id}`)
  return request.then(i => i.data)

}

const updatePerson = (id,newObject) => {
  const request = axios.put(`${baseUrl}/${id}`,newObject)
  return request.then(i => i.data)
}

export default ({ getPersons,createPerson,removePerson,updatePerson })