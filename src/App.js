import './App.css';

const App = () => {
  return (
    <div className="App">
      <header className="App-header">
        iTunes Search App
      </header>

      <div className="App-container">
        <div className="App-search">
          <input type="text" className="app-search" placeholder="Search Band"></input>
          <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
            <li>D</li>
            <li>E</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;
