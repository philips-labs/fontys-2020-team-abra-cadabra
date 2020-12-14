import {
  getByTestId,
  render,
  screen,
  waitFor,
  fireEvent,
  toBeInTheDocument,
} from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import SubjectList from "../src/components/SubjectList";
import "@testing-library/jest-dom/extend-expect";

describe("SubjectList", () => {
  it.skip("Get list of subjects", async () => {
    render(<SubjectList />);

    const header = await screen.findByText("Cooking");
    expect(header).toBeInTheDocument();
  });
});
