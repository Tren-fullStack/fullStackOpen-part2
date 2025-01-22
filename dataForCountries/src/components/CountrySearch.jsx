//html display of search bar
const CountrySearch = ({value, onChange}) => {
    return (
    <div>
      find countries: <input type='text' value={value} onChange={onChange} id='countryInput'></input>
    </div>
    )
  }

export default CountrySearch