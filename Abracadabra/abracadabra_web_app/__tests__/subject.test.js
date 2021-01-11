// const {
//   interopDefault,
// } = require("next/dist/next-server/server/load-components");
// const SubjectRouting = require("../pages/subject/[subject]/index");

// import { render, screen, waitFor } from "@testing-library/react";
// import { MemoryRouter } from "react-router-dom";
// import SubjectService from "../src/services/SubjectService";

// jest.mock("../src/services/SubjectService");

// describe("Subject routing tests", () => {
//   it("Should return 404 if subject not found", async () => {
//     SubjectService.GetSubjectByID.mockRejectedValue({
//       response: {
//         status: 404,
//       },
//     });

//     const params = {};
//     const received = await SubjectRouting.getServerSideProps({ params });
//     expect(received.props.response).toEqual(404);
//   });

//   it("Return page when routed to it with subject/{subjectname}", async () => {
//     SubjectService.GetSubjectByID.mockResolvedValue({
//       response: { status: 200 },
//       data: {
//         id: 1,
//         subjectName: "cooking",
//         questions: [
//           {
//             title: "how to dice onion?",
//             description: "step 1: hello, step 2: hello",
//           },
//         ],
//       },
//     });

//     const params = { subject: "cooking" };
//     const received = await SubjectRouting.getServerSideProps({ params });
//     expect(received.props.response.subjectName).toEqual("cooking");
//   });

//   // it.only('Test if Navbar renders with subject name in it.', async () => {
//   //     render(<subjectRouting />);
//   //     await waitFor( () => expect(screen.getByTestId("navbar")).toBeInTheDocument()  );
//   // });
// });

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

describe("SubjectList", () => {
  it("Get list of subjects", async () => {
    const params = { subject: "Cooking" };

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
// describe("Filter buttons", () => {
//   it("Expert Answered Button returns expert answered question", async () => {
//     const params = { subject: "Cooking" };

//     var response = await QuestionPage.getServerSideProps({ params });
//     render(
//       <QuestionPageRender
//         subjectName={response.props.subjectName}
//         response={response.props.response}
//       />
//     );
//     const newButton = await screen.findByText("Expert Answered");
//     fireEvent.click(newButton)
//     const responded = await screen.findByText("How to make spaghetti?");
//     console.log(responded)
//     expect(responded).toBeInTheDocument();
//   });
//   it("Hot button returns Boil Water as hottest question", async () => {
//     const params = { subject: "Cooking" };

//     var response = await QuestionPage.getServerSideProps({ params });
//     render(
//       <QuestionPageRender
//         subjectName={response.props.subjectName}
//         response={response.props.response}
//       />
//     );
//     const newButton = await screen.findByText("Hot");
//     await act(async () => {
//     fireEvent.click(newButton)
//     });
//     const responded = screen.getAllByTestId("question-label-title")[0]
//     console.log(responded)
//     expect(responded.textContent).toBe("Boil Water")
//   });
//   it("Unanswered button returns question with 0 people responded", async () => {
//     const params = { subject: "Cooking" };

//     var response = await QuestionPage.getServerSideProps({ params });
//     render(
//       <QuestionPageRender
//         subjectName={response.props.subjectName}
//         response={response.props.response}
//       />
//     );
//     const newButton = await screen.findByText("Unanswered");
//     await act(async () => {
//     fireEvent.click(newButton)
//     });
//     const responded = screen.getAllByTestId("question-label-answers")
//     console.log(responded)
//     expect(responded[0].textContent).toBe("0 people responded")
//     expect(responded[1].textContent).toBe("0 people responded")
//     expect(responded[2].textContent).toBe("0 people responded")
//     expect(responded[3].textContent).toBe("0 people responded")
//   });
//   it("Answered button returns Boil Water & 2 people responded", async () => {
//     const params = { subject: "Cooking" };

//     var response = await QuestionPage.getServerSideProps({ params });
//     render(
//       <QuestionPageRender
//         subjectName={response.props.subjectName}
//         response={response.props.response}
//       />
//     );
//     const newButton = await screen.findByText("Answered");
//     await act(async () => {
//     fireEvent.click(newButton)
//     });
//     const responded = screen.getByTestId("question-label-answers")[0]
//     const respondedTitle = screen.getByTestId("question-label-title")[0]
//     console.log(responded)
//     expect(responded.textContent).toBe("2 people responded")
//     expect(respondedTitle.textContent).toBe("Boil Water")
//   });
// });
