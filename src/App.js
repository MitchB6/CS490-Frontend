import React, {useState, useEffect} from 'react'

function App() {
   const [data, setData] = useState([{}])
   useEffect(() =>{
      fetch("/healthcheck").then(
         res => res.json()
      ).then(
         data => {
            setData(data)
            console.log(data)
         }
      )
   }, [])
  return (
    <div>
      {(data.print[1])}
      {/* <p>{data.results && data.results[0] && data.results[0].output}</p> */}
      {/* test */}
    </div>
  )
}

export default App