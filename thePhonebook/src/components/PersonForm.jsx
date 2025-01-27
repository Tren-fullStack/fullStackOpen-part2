//html form for adding name and/or number of person
const PersonForm = ({ onSubmit,name,number,personChange,numberChange,type }) => {
    return(
      <>
      <form onSubmit = {onSubmit}>
        <div>name: <input value={name} onChange={personChange}/></div>
        <div>number: <input value={number} onChange={numberChange} /></div>
        <div><button type={type}>add</button></div>
      </form>
      </>
    )
}

export default PersonForm