import { useState, useEffect } from "react";

import RotatingList from "./components/RotatingList";
import SearchField from "./components/SearchField";

import './App.css';

const App = () => {
  const initialList = ["A", "B", "C", "D", "E"];

  const [itemsList, setItemsList] = useState(initialList);

  const [data, setData] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [previousRes, setPreviousRes] = useState([]);

  // Fetching data
  const fetchData = (value) => {
    setData([]);
    fetch(`https://itunes.apple.com/search?term=${value}`,
    {
      mode: 'cors',
      headers: {
        'Access-Control-Allow-Origin':'*'
      }
    })
      .then(response => {
        return response.json();
      })
      .then(data => {
        setData(data.results);
        console.log("Data fetched: ", data);
      })
      .catch(error => {
        console.error("Error fetching data: ", error.message);
      })
  }

  // Parse data 
  const parseAlbums = (results) => {
    let albums = [];

    if (results && results.length > 0) {
      results.map(a => {
        if (a.collectionName
          && albums.indexOf(a.collectionName) < 0
          && previousRes.indexOf(a.collectionName) < 0
        ) {
          albums.push(a.collectionName);
        } else {
          console.log("Repeated result or collectionName is not set!");
        }
      })
    }
    albums.sort();
    return albums.slice(0, 5);
  }

  // Parse albums when data fetched
  useEffect(() => {
    const albums = parseAlbums(data);
    setAlbums(albums);
    setPreviousRes([...previousRes, ...albums]);
  }, [data])


  // Replace albums when new data is fetched
  useEffect(() => {
    if (albums.length > 0) {
      let counter = 0;
      let newItemList = itemsList.map(e => {
        if (initialList.indexOf(e) > -1) {
          return e;
        } else {
          const repl = albums[counter];
          counter++;
          return repl;
        }
      })

      if (newItemList.length !== 5) {
        setItemsList([...newItemList]);
      } else {
        setItemsList([...itemsList, ...albums]);
      }
    }
  }, [albums])

  // App render
  return (
    <div className="App">
      <header className="App-header">
        iTunes Search App
      </header>

      <div className="App-container">
        <div className="App-search">
          <SearchField 
            fetchData={fetchData}
          />
          <RotatingList 
            itemsList={itemsList}
            setItemsList={setItemsList}
          />
        </div>
      </div>
    </div>
  );
}

export default App;
