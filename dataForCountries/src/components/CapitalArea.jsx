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

export default CapitalArea