import React, { useEffect, useState } from "react";
import logo from "./logo.svg";
import "./App.css";

/**
 * Local, on development environment
 * API: http://localhost:3001/api/users
 * React App: http://localhost:3000
 *
 * Cloud, on production environment
 * API: http://localhost:3000/api/users | https://dashboard.heroku.com/apps/nome-do-meu-app/api/users
 * React App: http://localhost:3000 | https://dashboard.heroku.com/apps/nome-do-meu-app
 */

function App() {
  const [users, setUsers] = useState([]);
  const url =
    process.env.NODE_ENV === "production"
      ? "/api"
      : "http://localhost:3001/api";

  useEffect(() => {
    fetch(`${url}/users`)
      .then(function (response) {
        return response.json();
      })
      .then(setUsers);
  }, [url]);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
        <p>{JSON.stringify(users)}</p>
      </header>
    </div>
  );
}

export default App;
