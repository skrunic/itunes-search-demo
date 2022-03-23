import { useRef, useState, useEffect } from "react";
import uuid from "react-uuid";
import './App.css';

const App = () => {
  const initialList = ["A", "B", "C", "D", "E"];
  const delay = useRef(null);
  const [timer, setTimer] = useState(0);

  const [itemsList, setItemsList] = useState(initialList);
  const [searchValue, setSearchValue] = useState("");

  const [data, setData] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [previousRes, setPreviousRes] = useState([]);

  // Update value on change
  const onChange = (e) => {
    clearTimeout(delay.current);

    let value = e.currentTarget.value;
    setSearchValue(value);

    delay.current = setTimeout(() => {
      console.log(`API search for: ${value}`);
      if (value.length >= 3) fetchData(value);
    }, 1000);
  }

  // Fetching data
  const fetchData = (value) => {
    setData([]);
    fetch(`https://itunes.apple.com/search?term=${value}`)
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
    //console.log("Parsed albums: ", albums);
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

  // Rotate array members
  const rotateArray = (array, from, to) => {
    let elem = array.splice(from, 1)[0];
    array.splice(to, 0, elem);
    return array;
  }

  // Refresh interval to rotate list items
  useEffect(() => {
    const interval = setInterval(() => {
      //let albumList = [...itemsList, ...albums];
      let newArr = rotateArray(itemsList, 0, itemsList.length - 1);
      console.log("Album list: ", itemsList);
      setItemsList(newArr);
      setTimer(timer => timer + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [timer, itemsList]);

  // App render
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
