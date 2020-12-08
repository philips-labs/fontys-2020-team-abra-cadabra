import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
  toBeInTheDocument,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Register from "../src/components/Register";
import Login from "../src/components/Login";
import AccountService from "../src/services/AccountService";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import Router from "next/router";
jest.mock("next/router", () => ({ push: jest.fn() }));

describe("Register", () => {
  it.only("Register account", async () => {
    render(<Register />);

    const inputEmail = screen.getByTestId("register-input-email");
    fireEvent.change(inputEmail, { target: { value: "test@email.com" } });
    expect(inputEmail.value).toBe("test@email.com");

    const inputUsername = screen.getByTestId("register-input-username");
    fireEvent.change(inputUsername, { target: { value: "tester" } });
    expect(inputUsername.value).toBe("tester");

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
});
