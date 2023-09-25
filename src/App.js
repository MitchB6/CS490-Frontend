import './styles.css';
import React, {useState, useEffect} from 'react'

function App() {
  const [data, setData] = useState("Loading...")
  const [listItems, setListItems] = useState(null)
  useEffect(() => {
    fetch("http://localhost:5000/", {
      method: "get",
      headers: {
        "Content-Type": "application/json",
        // "Access-Control-Allow-Origin": "main--capable-gumption-8655c3.netlify.app"
      }
    }).then(res => {
      if (res != null) {
        return res.json();
      } else { // console.log(res)
        throw new Error(`Received status code ${res}`)
      }
    }).then(data => {
      setData(data)
      const items = data.map((rowData) => <li key={rowData[0]}>{rowData}</li>);
      setListItems(items)
    }).catch(error => {
      console.error("Fetch failed:", error)
      setData("Error")
    })
  }, [])
  return (
    <div> {
      data === "Error" ? (
        console.log("An error occurred while fetching the data.")
      ) : (
        <ul>{listItems}</ul>
      )
    }
      <a href="/">
        <h1 className="top">Home</h1>
      </a>
      <div className="row">
        <a href="https://google.com/">
          <h2 className="subsection">Movies</h2>
        </a>
        <a href="https://yahoo.com/">
          <h2 className="subsection">Customers</h2>
        </a>
        <a href="https://bing.com/">
          <h2 className="subsection">Reports</h2>
        </a>
      </div>

    </div>
  )
}

export default App
