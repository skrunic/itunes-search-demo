import { useState } from "react";
import uuid from "react-uuid";
import './App.css';

const App = () => {
  const initialList = ["A", "B", "C", "D", "E"];

  const [itemsList, setItemsList] = useState(initialList); 

  return (
    <div className="App">
      <header className="App-header">
        iTunes Search App
      </header>

      <div className="App-container">
        <div className="App-search">
          <input type="text" placeholder="Search Band"></input>
          <ul>
            {
                itemsList.length > 0 ?
                    itemsList.map(i => {
                        return (<li key={uuid()} className="result">{i}</li>)
                    })
                    : <li className="result">No result</li>
            }
        </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
