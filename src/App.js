import React from "react";

import { Card } from "./components/Card";
import { HeroLogin } from "./components/";
import { Filters } from "./components/Forms/";
// import { Favs } from "./components/Favs";

import { getAllPets } from "api/";

import capitalize from "lodash.capitalize";

export class App extends React.Component {
  state = {
    // Will be either dogs or cats
    activeFilter: "",
    pets: [],
    savedSearches: [],
  };

  async componentDidMount() {
    try {
      const { animals } = await getAllPets();
      this.setState({ pets: animals });
      console.log("testing save");
    } catch (error) {
      console.error(error);
    }
  }

  handleChange = (selectedFilter) => {
    this.setState({ activeFilter: capitalize(selectedFilter).slice(0, -1) });
  };

  renderCards = (animals) =>
    animals.map((animal, index) => <Card animal={animal} key={index} />);

  render() {
    const activeFilter = this.state.activeFilter;
    const filteredPets = activeFilter
      ? this.state.pets.filter(
          ({ type }) => console.log(type, activeFilter) || type === activeFilter
        )
      : this.state.pets;

    return this.state.pets.length ? (
      <div className="container">
        <HeroLogin />
        <Filters onChange={this.handleChange} />
        <div className="columns is-multiline">
          {this.renderCards(filteredPets)}
        </div>
      </div>
    ) : (
      <progress className="progress is-large is-info" max="100">
        60%
      </progress>
    );
  }
}
