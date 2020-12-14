import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
  toBeInTheDocument,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/components/Login";
import Register from "../src/components/Register";
import AccountService from "../src/services/AccountService";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import Router from "next/router";
jest.mock("next/router", () => ({ push: jest.fn() }));

describe("Login", () => {
  it("Seed account", async () => {
    render(<Register />);

    const inputEmail = screen.getByTestId("register-input-email");
    fireEvent.change(inputEmail, { target: { value: "testing@email.com" } });
    expect(inputEmail.value).toBe("testing@email.com");

    const inputUsername = screen.getByTestId("register-input-username");
    fireEvent.change(inputUsername, { target: { value: "testing" } });
    expect(inputUsername.value).toBe("testing");

    const inputPassword = screen.getByTestId("register-input-password");
    fireEvent.change(inputPassword, { target: { value: "secretP@ssw0rd!" } });
    expect(inputPassword.value).toBe("secretP@ssw0rd!");

    const inputRepeatPassword = screen.getByTestId(
      "register-input-repeat-password"
    );
    fireEvent.change(inputRepeatPassword, {
      target: { value: "secretP@ssw0rd!" },
    });
    expect(inputRepeatPassword.value).toBe("secretP@ssw0rd!");

    const inputSubmit = screen.getByTestId("register-input-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText("Account created");
    // expect(header).toBeInTheDocument();
    expect(Router.push).toHaveBeenCalledWith("/loginpage");
  });

  it("Login account success", async () => {
    render(<Login />);

    const inputEmail = screen.getByTestId("login-input-email");
    fireEvent.change(inputEmail, { target: { value: "testing@email.com" } });
    expect(inputEmail.value).toBe("testing@email.com");

    const inputPassword = screen.getByTestId("login-input-password");
    fireEvent.change(inputPassword, { target: { value: "secretP@ssw0rd!" } });
    expect(inputPassword.value).toBe("secretP@ssw0rd!");

    const inputSubmit = screen.getByTestId("login-button-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText("Login successful");
    expect(Router.push).toHaveBeenCalledWith("/");
  });

  it("Login wrong account fail", async () => {
    render(<Login />);

    const inputEmail = screen.getByTestId("login-input-email");
    fireEvent.change(inputEmail, { target: { value: "tester@email.com" } });
    expect(inputEmail.value).toBe("tester@email.com");

    const inputPassword = screen.getByTestId("login-input-password");
    fireEvent.change(inputPassword, { target: { value: "secretP@ssw0rd!" } });
    expect(inputPassword.value).toBe("secretP@ssw0rd!");

    const inputSubmit = screen.getByTestId("login-button-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText(
      "Account information does not match"
    );

    expect(header).toBeInTheDocument();
  });
});
