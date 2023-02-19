import './App.css';
import Content from './components/Content'

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <h1>Simple To Do List</h1>
        <p>Today is awesome day. The weather is awesome, you are awesome too!</p>
      </header>
      <Content></Content>
      <footer className="App-footer">
        <p className="App-footer__made">Made with ❤️ at nFactorial in 2022.</p>
        <p className="App-footer__credits">Credits: icons from Icons8.</p>
      </footer>
    </div>
  );
}

export default App;
