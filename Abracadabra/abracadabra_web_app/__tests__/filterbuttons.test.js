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
  const QuestionPageNew = require("../pages/subject/[subject]/index");
  const QuestionPageExpertAnswered = require("../pages/subject/[subject]/expert");
  const QuestionPageTrending = require("../pages/subject/[subject]/trending");
  const QuestionPageUnanswered = require("../pages/subject/[subject]/unanswered");
  const QuestionPageAnswered = require("../pages/subject/[subject]/answered");
  import QuestionPageRenderNew from "../pages/subject/[subject]/index";
  import QuestionPageRenderTrending from "../pages/subject/[subject]/trending";
  import QuestionPageRenderExpertAnswered from "../pages/subject/[subject]/expert";
  import QuestionPageRenderUnanswered from "../pages/subject/[subject]/unanswered";
  import QuestionPageRenderAnswered from "../pages/subject/[subject]/answered";
  import "@testing-library/jest-dom/extend-expect";
  
  
  jest.mock("next/router", () => ({
    useRouter() {
      return {
        route: "/Subject/Cooking/",
        pathname: "/Subject/Cooking/",
        query: "",
        asPath: "Subject/Cooking/",
      };
    },
  }));
  
  describe("Filter buttons", () => {
    it("Expert Answered Button returns expert answered question", async () => {
    

      const params = { subject: "Cooking" };
  
      var response = await QuestionPageExpertAnswered.getServerSideProps({ params });
      render(
        <QuestionPageRenderExpertAnswered
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getByTestId("question-label-title");
      console.log(responded)
      expect(responded.textContent).toBe(" How to make spaghetti? ");
    });
    it("New Button returns newest question", async () => {
    
      const params = { subject: "Cooking" };
  
      var response = await QuestionPageNew.getServerSideProps({ params });
      render(
        <QuestionPageRenderNew
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getAllByTestId("question-label-title")[0];
      console.log(responded)
      expect(responded.textContent).toBe(" How to make spaghetti? ");
    });
    it("Hot button returns Boil Water as hottest question", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPageTrending.getServerSideProps({ params });
      render(
        <QuestionPageRenderTrending
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
     
      const responded = screen.getAllByTestId("question-label-title")[0]
      expect(responded.textContent).toBe(' How to make spaghetti? ')
    });
    it("Unanswered button returns question with 0 people responded", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPageUnanswered.getServerSideProps({ params });
      render(
        <QuestionPageRenderUnanswered
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );

      const responded = screen.getAllByTestId("question-label-answers")
      expect(responded[0].textContent).toBe("0 people responded")
      expect(responded[1].textContent).toBe("0 people responded")
      expect(responded[2].textContent).toBe("0 people responded")
    });
    it("Answered button returns answered question ", async () => {
      const params = { subject: "Cooking" };
  
      var response = await QuestionPageAnswered.getServerSideProps({ params });
      render(
        <QuestionPageRenderAnswered
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
  
      const responded = screen.getAllByTestId("question-label-answers")[0]
      const respondedTitle = screen.getAllByTestId("question-label-title")[0]
      expect(responded.textContent).toBe("2 people responded")
      expect(respondedTitle.textContent).toBe(" Boil water ")
    });
    it("Error handeling new", async () => {
    
      const params = { subject: "Cooking2" };
  
      var response = await QuestionPageNew.getServerSideProps({ params });
      render(
        <QuestionPageRenderNew
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getByText("This page could not be found.");
      expect(responded).toBeInTheDocument();
    });
    it("Error handeling Trending", async () => {
    
      const params = { subject: "Cooking2" };
  
      var response = await QuestionPageTrending.getServerSideProps({ params });
      render(
        <QuestionPageRenderTrending
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getByText("This page could not be found.");
      expect(responded).toBeInTheDocument();
    });
    it("Error handeling Answered", async () => {
    
      const params = { subject: "Cooking2" };
  
      var response = await QuestionPageAnswered.getServerSideProps({ params });
      render(
        <QuestionPageRenderAnswered
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getByText("This page could not be found.");
      expect(responded).toBeInTheDocument();
    });
    it("Error handeling Unanswered", async () => {
    
      const params = { subject: "Cooking2" };
  
      var response = await QuestionPageUnanswered.getServerSideProps({ params });
      render(
        <QuestionPageRenderUnanswered
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getByText("This page could not be found.");
      expect(responded).toBeInTheDocument();
    });
    it("Error handeling Expert", async () => {
    
      const params = { subject: "Cooking2" };
  
      var response = await QuestionPageExpertAnswered.getServerSideProps({ params });
      render(
        <QuestionPageRenderExpertAnswered
          subjectName={response.props.subjectName}
          response={response.props.response}
        />
      );
      const responded = screen.getByText("This page could not be found.");
      expect(responded).toBeInTheDocument();
    });
   });
  