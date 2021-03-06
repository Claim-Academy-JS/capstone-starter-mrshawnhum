import React from "react";

import { Button } from "components/Button";
import { Form } from "./Form";

// import { authenticateUser } from "../api/";

export class Login extends Form {
  state = {
    buttonTexts: ["Login", "Register"],
    inputs: [
      {
        inputType: "text",
        labelSrOnly: true,
        labelText: "Username",
      },
      {
        inputType: "password",
        labelSrOnly: true,
        labelText: "Password",
      },
    ],
    password: "",
    username: "",
    user: {},
  };

  registrationInputs = [
    {
      inputType: "text",
      labelSrOnly: true,
      labelText: "Name",
    },
    {
      inputType: "email",
      labelSrOnly: true,
      labelText: "Email",
    },
  ];

  checkIsRegistration() {
    return this.state.inputs.length > 2;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    const endpoint = this.checkIsRegistration() ? "/register" : "/login";

    const newUserData = this.checkIsRegistration()
      ? JSON.stringify({
          ...this.processFormData(e.target),
          ...{ savedSearches: [] },
        })
      : JSON.stringify(this.processFormData(e.target));

    const res = await fetch(`http://localhost:3001/api/users${endpoint}`, {
      method: "POST",
      cors: "*cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: newUserData,
    });

    this.setState({ user: await res.json() });
  };

  handleButtonToggle = () => {
    const currentInputs = this.state.inputs;
    this.setState({
      buttonTexts: [...this.state.buttonTexts].reverse(),
      inputs:
        currentInputs.length > 2
          ? currentInputs.slice(0, 2)
          : currentInputs.concat(this.registrationInputs),
    });
  };

  render() {
    return this.state.user.name ? (
      <p className="has-text-success has-background-light	is-size-2 px-3 py-3">
        Welcome {this.state.user.name}!
      </p>
    ) : (
      <form className="box is-centered" onSubmit={this.handleSubmit}>
        {this.renderInputs(this.state.inputs)}
        <Button
          buttonText={this.state.buttonTexts[0]}
          buttonClass="button is-success mr-3"
        />
        <Button
          buttonText={this.state.buttonTexts[1]}
          buttonClass="button is-primary"
          type="button"
          onClick={this.handleButtonToggle}
        />
      </form>
    );
  }
}
