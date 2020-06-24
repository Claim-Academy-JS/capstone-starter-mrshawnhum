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
        labelText: "Username",
      },
      {
        inputType: "password",
        labelText: "Password",
      },
    ],
    isLogged: false,
    password: "",
    username: "",
  };

  registrationInputs = [
    {
      inputType: "text",
      labelText: "Name",
    },
    {
      inputType: "email",
      labelText: "Email",
    },
  ];

  checkIsRegistration() {
    return this.state.inputs.length > 2;
  }

  handleSubmit = async (e) => {
    e.preventDefault();

    console.log("submitted");

    const endpoint = this.checkIsRegistration() ? "/register" : "/login";

    const newUserData = this.checkIsRegistration()
      ? JSON.stringify({
          ...this.processFormData(e.target),
          ...{ savedSearches: [] },
        })
      : JSON.stringify(this.processFormData(e.target));

    console.log(newUserData);

    const res = await fetch(`http://localhost:3001/api/users${endpoint}`, {
      method: "POST",
      cors: "*cors",
      headers: {
        "Content-Type": "application/json",
      },
      body: newUserData,
    });

    console.log(await res);
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
    return (
      <form onSubmit={this.handleSubmit}>
        {this.renderInputs(this.state.inputs)}
        <Button buttonClass="button" buttonText={this.state.buttonTexts[0]} />
        <Button
          buttonClass="plain"
          buttonText={this.state.buttonTexts[1]}
          type="button"
          onClick={this.handleButtonToggle}
        />
      </form>
    );
  }
}
