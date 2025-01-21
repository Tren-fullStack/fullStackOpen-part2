import {useState, useEffect} from 'react'
import countryService from './services/countries'

//html display of search bar
const CountrySearch = ({value, onChange}) => {
  return (
  <div>
    find countries: <input type='text' value={value} onChange={onChange} id='countryInput'></input>
  </div>
  )
}

//html display when too many countries fit search criteria
const TooMany = () => {
  return(
  <div>
    Too many matches, specify another filter
  </div>
  )
}

const CountryList = ({ countries }) => {  
  return(
    countries.map(country => 
      <div key={country}>
        <li>{country}</li>
      </div>
    )
  )
}

const CapitalArea = ({ indexData,countryName }) => {
  return(
    <div>
      <h1>{countryName}</h1>
      <p>Capital: {indexData.capital}</p>
      <p>Area: {indexData.area}</p>
      <h3>languages:</h3>
    </div>
  )
}

const Languages = ({ languages }) => {
  return(
    //languages are in dict, therefore must use this map method
    Object.entries(languages).map( ([key,lang]) =>
      <div>
        <li>{lang}</li>
      </div>
    )
  )
}

const Flag = ({ flagImage, countryName }) => {
  //alt text incase flag does not dispay
  const altText = `flag of ${countryName}`
  return (
    <div>
      <img src={flagImage} alt={altText}/>
    </div>
  )
}

const CountryInfo = ({ countries, search }) => {
  //updates list of country names filtered by search
  const countryCommonNames = countries.map(country => country.name.common) 
  console.log(countryCommonNames)
  const filteredCountryNames = countryCommonNames.filter(commonName => commonName.toLowerCase().includes(search.toLowerCase()))
  console.log('Filtered countries:',filteredCountryNames)
  console.log('Search input:',search)

  if (filteredCountryNames.length>=10) {
    return(<TooMany />)

  } else if (filteredCountryNames.length==1) {
    //get index of the country to find information besides name
    const index = countryCommonNames.findIndex(name=>name==filteredCountryNames)
    const indexData = countries[index]
    const languages = indexData.languages
    const flagImage = indexData.flags.png

    console.log('filtered name:',filteredCountryNames)
    console.log('same name:',countryCommonNames[index])
    console.log('Index data:',indexData)
    console.log('Languages:',indexData.languages)

    return (
      <div>
        <CapitalArea indexData={indexData} countryName={filteredCountryNames}/>
        <Languages languages={languages} />
        <Flag flagImage={flagImage} />
      </div>
    )
  } else {
    return(
      <CountryList countries={filteredCountryNames} />
    )
  } 
}

const App = () => {
  //initialize input to be empty
  const [countries, setCountries] = useState('')
  const [search, setSearch] = useState('')
  
  //get API country name data
  useEffect(() => {
    countryService
      .getCountries()
      .then(response => setCountries(response))
  }, []) 
  console.log('Country data:', countries)

  //updates search bar from user input
  const handleChange = (event) => {
    setSearch(event.target.value)
  }

  //displays country information when there is input in search
  if (search!='') {
    return (
      <>
      <CountrySearch value={search} onChange={handleChange} />
      <CountryInfo countries={countries} search={search} />
      </>
    )
  } else if (countries==''){
  return (
    <>Retrieving Country Data...</>
  )} else {
  return(
    <><CountrySearch value={search} onChange={handleChange} /></>
  )}
}

export default App