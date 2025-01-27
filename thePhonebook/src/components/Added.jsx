const Added = ({ message }) => {
    const footerStyle = {
        color: 'green',
        background: 'lightgrey',
        fontSize: 15,
        borderStyle: 'solid',
        borderRadius: 5,
        padding: 10,
        marginBottom: 15
      }

    if (message === null) {
        return null
      }
    
      return (
        <div style={footerStyle}>
          {message}
        </div>
      )
}

export default Added