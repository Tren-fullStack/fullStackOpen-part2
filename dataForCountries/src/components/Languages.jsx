const Languages = ({ languages }) => {
    return(
      //languages are in dict, therefore must use this map method
      Object.entries(languages).map( ([key,lang]) =>
        <div key={lang}>
          <li>{lang}</li>
        </div>
      )
    )
  }

export default Languages