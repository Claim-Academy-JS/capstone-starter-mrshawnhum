import React from "react";
import "./App.css";
import { Home } from "components";
import { Main } from "components";

export class App extends React.Component {
  render() {
    return (
      <main>
        <div>
          {<Main />}
          {<Home />}
        </div>
      </main>
    );
  }
}
