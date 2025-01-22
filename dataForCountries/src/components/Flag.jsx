const Flag = ({ flagImage, countryName }) => {
    //alt text incase flag does not dispay
    const altText = `flag of ${countryName}`
    return (
      <div>
        <img src={flagImage} alt={altText}/>
      </div>
    )
  }

export default Flag