import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        iTunes Search App
      </header>

      <div className="App-container">
        <div className="App-search">
          <input type="text" placeholder="Search Band"></input>
          <ul>
            <li className="result">A</li>
            <li className="result">B</li>
            <li className="result">C</li>
            <li className="result">D</li>
            <li className="result">E</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
