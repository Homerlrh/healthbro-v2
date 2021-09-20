import "./App.css";
import { Route, Switch, Redirect } from "react-router-dom";

function App() {
  // const click = async () => {
  //   const body = {
  //     email: "123@123.com",
  //     password: "123321",
  //   };
  //   //const result = await axios.get(`http://localhost:3333`);
  //   const result = await axios.post("http://localhost:3333/auth/login", body);
  //   console.log(result);
  // };
  return (
    <div className="App">
      <header className="App-header">
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
