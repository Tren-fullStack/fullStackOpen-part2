import {useState, useEffect} from 'react'
import countryService from './services/countries'
import weatherService from './services/weather'
import CountrySearch from './components/CountrySearch'
import TooMany from './components/TooMany'
import CountryList from './components/CountryList'
import CapitalArea from './components/CapitalArea'
import Languages from './components/Languages'
import Flag from './components/Flag'
 
const CountryInfo = ({ countries, search }) => {
  //updates list of country names filtered by search
  const countryCommonNames = countries.map(country => country.name.common) 
  console.log(countryCommonNames)
  console.log('Search input:',search) 

  //state for weather daya
  const [weather, setWeather] = useState('')
  const [clicked, setClicked] = useState(false)

  //returns list of countries that match search
  const filterCountries = (commonNames,search) => {
    const filteredCountryNames = commonNames.filter(commonName => commonName.toLowerCase().includes(search.toLowerCase()))
    return (filteredCountryNames)
  }
  const filteredCountryNames = filterCountries(countryCommonNames,search)

  //sets clicked to country associated with clicked button
  const handleClick = (key) => {
    console.log('button shows,',key)
    setClicked([key])
  }

  /*useEffect(() => {
    weatherService
      .getWeather(29.5,45.75)
      .then(response => setWeather(response))
  }, []) 
  console.log('Weather data:', weather)*/
  
  if (filteredCountryNames.length >= 10) {
    return(
      <TooMany />
    )
  } else if (filteredCountryNames.length == 1 || clicked) {
    //if clicked exists it will use that clicked country for findIndex, else use filter
    const clickOrFilter = (filteredCountryNames,clicked) => {
      if (clicked) {return(clicked)}
      else {return(filteredCountryNames)}
    }
    const chosenCountry = clickOrFilter(filteredCountryNames,clicked)

    //get index of the country to find information besides name
    const index = countryCommonNames.findIndex(name=>name==chosenCountry)
    const indexData = countries[index]
    const languages = indexData.languages
    const flagImage = indexData.flags.png
    //needed for weatherService
    const latitude = indexData.latlng[0]
    const longitude = indexData.latlng[1]

    console.log('filtered name:',filteredCountryNames)
    console.log('same name:',countryCommonNames[index])
    console.log('Index data:',indexData)
    console.log('Latitude:',latitude)
    console.log('Longitude:',longitude)

    return (
      <div>
        <CapitalArea indexData={indexData} countryName={chosenCountry}/>
        <Languages languages={languages} />
        <Flag flagImage={flagImage} />
        {/*<Weather weather={weather} /> */}
      </div>
    )
  } else {
    return(
      <CountryList countries={filteredCountryNames} onClick={handleClick} />
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
  const handleChange = (event) => setSearch(event.target.value)

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