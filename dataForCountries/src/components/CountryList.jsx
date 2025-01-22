//html display when less than 10 but more than 1 countries fit search
const CountryList = ({ countries,onClick }) => { 
    
    return(
      countries.map(country => 
        <div key={country}>
          <li>{country} <button onClick={()=>onClick(country)} >show</button></li>
        </div>
      )
    )
  }

export default CountryList