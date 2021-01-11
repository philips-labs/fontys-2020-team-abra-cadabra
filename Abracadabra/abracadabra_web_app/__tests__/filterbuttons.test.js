import {
    getByTestId,
    render,
    screen,
    waitFor,
    act,
    fireEvent,
    toBeInTheDocument,
  } from "@testing-library/react";
  import { MemoryRouter } from "react-router-dom";
  const QuestionPage = require("../pages/subject/[subject]/index");
  import QuestionPageRender from "../pages/subject/[subject]/index";
  import "@testing-library/jest-dom/extend-expect";
  
  jest.mock("next/router", () => ({
    useRouter() {
      return {
        route: "/Subject/Cooking",
        pathname: "/Subject/Cooking",
        query: "",
        asPath: "Subject/Cooking",
      };
    },
  }));
  
  
  describe("Filter buttons", () => {
    it("Expert Answered Button returns expert answered question", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPage.getServerSideProps({ params });
      render(
        <QuestionPageRender
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const newButton = await screen.findByTestId("question-button-expert");
      fireEvent.click(newButton)
      const responded = await screen.getAllByTestId("question-label-title")[0];
      console.log(responded)
      expect(responded.textContent).toBe(" How to make spaghetti? ");
    });
    it("Hot button returns Boil Water as hottest question", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPage.getServerSideProps({ params });
      render(
        <QuestionPageRender
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const newButton = await screen.findByTestId("question-button-trending");
      await act(async () => {
      fireEvent.click(newButton)
      });
      const responded = screen.getAllByTestId("question-label-title")[0]
      console.log(responded)
      expect(responded.textContent).toBe("Boil Water")
    });
    it("Unanswered button returns question with 0 people responded", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPage.getServerSideProps({ params });
      render(
        <QuestionPageRender
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const newButton = await screen.findByTestId("question-button-unanswered");
      await act(async () => {
      fireEvent.click(newButton)
      });
      const responded = screen.getAllByTestId("question-label-answers")
      console.log(responded)
      expect(responded[0].textContent).toBe("0 people responded")
      expect(responded[1].textContent).toBe("0 people responded")
      expect(responded[2].textContent).toBe("0 people responded")
      expect(responded[3].textContent).toBe("0 people responded")
    });
    it("Answered button returns Boil Water & 2 people responded", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPage.getServerSideProps({ params });
      render(
        <QuestionPageRender
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const newButton = screen.getByTestId("question-button-answered");
      await act(async () => {
      fireEvent.click(newButton)
      });
      const responded = screen.getAllByTestId("question-label-answers")[0]
      const respondedTitle = screen.getAllByTestId("question-label-title")[0]
      console.log(responded)
      expect(responded.textContent).toBe("2 people responded")
      expect(respondedTitle.textContent).toBe("Boil Water")
    });
  });
  