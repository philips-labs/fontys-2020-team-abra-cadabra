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
