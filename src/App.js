import React, { Component } from "react";
import logo from "./logo.svg";
import "./App.css";
import db from './fire';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = { nouns: [] };
  }

  componentDidMount() {
    /* Create reference to messages in Firebase Database */
    db.collection("nouns").get().then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        const data = doc.data()
        console.log(`${doc.id} => ${data.de}`);
      });
    });
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Welcome to React</h1>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App; 
