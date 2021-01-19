import {
  getByTestId,
  render,
  screen,
  act,
  waitFor,
  fireEvent,
  toBeInTheDocument,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Login from "../src/components/Login";
import React from "react";
import "@testing-library/jest-dom/extend-expect";
import CreateQuestion from "../pages/subject/[subject]/createquestion";

import Router from "next/router";
jest.mock("next/router", () => ({
  push: jest.fn(),
  useRouter() {
    return {
      route: "/Subject/Cooking/createquestion",
      pathname: "/Subject/Cooking/createquestion",
      query: { subject: "Cooking" },
      asPath: "Subject/Cooking/createquestion",
    };
  },
}));

describe("Question", () => {
  it("User login success", async () => {
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

  it("Post question success", async () => {
    // console.log(localStorage.getItem("Token"));
    render(<CreateQuestion />);
    const question = screen.getByTestId("question-input-question");
    fireEvent.change(question, {
      target: { value: "How do I cook Kristian?" },
    });
    expect(question.value).toBe("How do I cook Kristian?");

    const description = screen.getByTestId("question-input-description");
    fireEvent.change(description, {
      target: {
        value: "I want to eat him because I think he looks delicious :)",
      },
    });
    expect(description.value).toBe(
      "I want to eat him because I think he looks delicious :)"
    );

    const tag = screen.getByTestId("question-input-tag0");
    fireEvent.change(tag, {
      target: { value: "Students" },
    });
    expect(tag.value).toBe("Students");

    const plustagButton = screen.getByTestId("question-button-plustag");
    fireEvent.click(plustagButton);

    const tag2 = screen.getByTestId("question-input-tag1");
    fireEvent.change(tag2, {
      target: { value: "Kristian" },
    });
    expect(tag2.value).toBe("Kristian");


    const inputSubmit = screen.getByTestId("question-button-submit");
    fireEvent.click(inputSubmit);

    const header = await screen.findByText("Question created");
    expect(Router.push).toHaveBeenCalledWith("/subject/Cooking/question/26");
  });
});
