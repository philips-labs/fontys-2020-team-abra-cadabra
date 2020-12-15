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

const QuestionPage = require("../pages/subject/[subject]/question/[id]");
import QuestionPageRender from "../pages/subject/[subject]/question/[id]";
import React from "react";
import "@testing-library/jest-dom/extend-expect";

import Router from "next/router";
jest.mock("next/router", () => ({ push: jest.fn() }));

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/Subject/Cooking/question/1",
      pathname: "/Subject/Cooking/question/1",
      query: "",
      asPath: "/Subject/Cooking/question/1",
    };
  },
}));

const token = "";

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

    const token = localStorage.getItem("Token");
    console.log(token);
  });

  it("Get list of subjects", async () => {
    const params = { subject: "Cooking", id: 1 };

    var response = await QuestionPage.getServerSideProps({ params });
    render(
      <QuestionPageRender
        subjectName={response.props.subjectName}
        response={response.props.response}
      />
    );

    const header = await screen.findByText("How to make spaghetti?");
    expect(header).toBeInTheDocument();
  });
});
