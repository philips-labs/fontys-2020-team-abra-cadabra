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
  it("Register account success", async () => {
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

  it("Register account false double account", async () => {
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

    const header = await screen.findByText(
      "Something went wrong, try again in a few minutes ..."
    );
    expect(header).toBeInTheDocument();
  });

  it("Register account false wrong password", async () => {
    render(<Register />);

    const inputEmail = screen.getByTestId("register-input-email");
    fireEvent.change(inputEmail, { target: { value: "test@email.com" } });
    expect(inputEmail.value).toBe("test@email.com");

    const inputUsername = screen.getByTestId("register-input-username");
    fireEvent.change(inputUsername, { target: { value: "tester" } });
    expect(inputUsername.value).toBe("tester");

    const inputPassword = screen.getByTestId("register-input-password");
    fireEvent.change(inputPassword, { target: { value: "password" } });
    expect(inputPassword.value).toBe("password");

    const inputRepeatPassword = screen.getByTestId(
      "register-input-repeat-password"
    );
    fireEvent.change(inputRepeatPassword, {
      target: { value: "password" },
    });
    expect(inputRepeatPassword.value).toBe("password");

    const inputSubmit = screen.getByTestId("register-input-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText("Must contain a capital letter");
    expect(header).toBeInTheDocument();
  });

  it("Register account false different wrong password", async () => {
    render(<Register />);

    const inputEmail = screen.getByTestId("register-input-email");
    fireEvent.change(inputEmail, { target: { value: "tester@email.com" } });
    expect(inputEmail.value).toBe("tester@email.com");

    const inputUsername = screen.getByTestId("register-input-username");
    fireEvent.change(inputUsername, { target: { value: "tester" } });
    expect(inputUsername.value).toBe("tester");

    const inputPassword = screen.getByTestId("register-input-password");
    fireEvent.change(inputPassword, { target: { value: "password" } });
    expect(inputPassword.value).toBe("password");

    const inputRepeatPassword = screen.getByTestId(
      "register-input-repeat-password"
    );
    fireEvent.change(inputRepeatPassword, {
      target: { value: "passwords" },
    });
    expect(inputRepeatPassword.value).toBe("passwords");

    const inputSubmit = screen.getByTestId("register-input-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText("Passwords don't match");
    expect(header).toBeInTheDocument();
  });

  it("Register account false email account", async () => {
    render(<Register />);

    const inputEmail = screen.getByTestId("register-input-email");
    fireEvent.change(inputEmail, { target: { value: "test" } });
    expect(inputEmail.value).toBe("test");

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

    const header = await screen.findByText("Not a valid e-mail address");
    expect(header).toBeInTheDocument();
  });
});
