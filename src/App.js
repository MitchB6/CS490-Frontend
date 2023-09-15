import React, {useState, useEffect} from 'react'

function App() {
   const [data, setData] = useState("Loading...")
   useEffect(() =>{
      fetch("https://main--capable-gumption-8655c3.netlify.app/heathcheck")
         .then(res => {
         // res => res.json()
            if (res.status === 200){
               return res.json();
            }else{
               throw new Error(`Recived status code ${res.status}`)
            }
         })
         .then(data => {
            setData(data.print)
            // console.log(data.print)
         }
      )
      .catch(error => {
         console.error("Fetch failed:", error)
         setData("Error")
      })
   }, [])
  return (
    <div>
      {(data)}
      {/* <p>{data.results && data.results[0] && data.results[0].output}</p> */}
      {/* test */}
    </div>
  )
}

export default App