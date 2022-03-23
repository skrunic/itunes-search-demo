import { useRef, useState } from "react";
import uuid from "react-uuid";
import './App.css';

const App = () => {
  const initialList = ["A", "B", "C", "D", "E"];
  const delay = useRef(null);

  const [itemsList, setItemsList] = useState(initialList);
  const [searchValue, setSearchValue] = useState("");

  // Update value on change
  const onChange = (e) => {
    clearTimeout(delay.current);

    let value = e.currentTarget.value;
    setSearchValue(value);

    delay.current = setTimeout(() => {
      console.log(`API search for: ${value}`);
    }, 1000);
  }

  return (
    <div className="App">
      <header className="App-header">
        iTunes Search App
      </header>

      <div className="App-container">
        <div className="App-search">
          <input type="text" placeholder="Search Band" onChange={onChange} value={searchValue}></input>
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
