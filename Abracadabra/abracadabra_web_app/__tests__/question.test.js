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
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import Router from "next/router";
jest.mock("next/router", () => ({ push: jest.fn() }));

describe("Question", () => {
  it("Login account success", async () => {
    render(<Login />);

    const inputEmail = screen.getByTestId("login-input-email");
    fireEvent.change(inputEmail, { target: { value: "expert@gmail.com" } });
    expect(inputEmail.value).toBe("expert@gmail.com");

    const inputPassword = screen.getByTestId("login-input-password");
    fireEvent.change(inputPassword, { target: { value: "Password@2" } });
    expect(inputPassword.value).toBe("Password@2");

    const inputSubmit = screen.getByTestId("login-button-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText("Login successful");
    expect(Router.push).toHaveBeenCalledWith("/");
  });
});
