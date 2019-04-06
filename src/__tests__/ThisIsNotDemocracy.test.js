import React from "react";
import PollBar from "../PollBar";
import { render as rtlRender, cleanup, fireEvent } from "react-testing-library";
import { PollContext } from "../context";
import PollContainer from "../PollContainer";
import moment from "moment";

afterEach(cleanup);

function render(ui) {
  const polls = {
    question:
      "Siapakah Presiden yang akan memimpin Indonesia di periode selanjutnya?",
    contestants: [
      {
        label: "Jokowi - Ma'ruf",
        value: "jm"
      },
      {
        label: "Prabowo - Sandi",
        value: "ps"
      },
      {
        label: "Nurhadi - Aldo",
        value: "na"
      }
    ],
    until: moment(new Date()).add(2, "hours")
  };

  function Wrapper(props) {
    return <PollContext.Provider value={{ state: polls }} {...props} />;
  }

  return rtlRender(ui, { wrapper: Wrapper });
}

// describe("render properly", () => {
//   const { getByText, getAllByTestId, getByTestId } = render(<PollContainer />);

//   it("should have the question", () => {
//     expect(
//       getByText(
//         /Siapakah Presiden yang akan memimpin Indonesia di periode selanjutnya?/
//       )
//     ).toBeTruthy();
//   });

//   it("should render 3 contestants", () => {
//     expect(getAllByTestId(/pollbar/)).toHaveLength(3);
//     expect(getByText(/Jokowi - Ma'ruf/)).toBeTruthy();
//     expect(getByText(/Prabowo - Sandi/)).toBeTruthy();
//     expect(getByText(/Nurhadi - Aldo/)).toBeTruthy();
//   });

//   it("should contains total votes of 0", () => {
//     expect(getByText(/0 votes/)).toBeTruthy();
//   });

//   it("should contains the duration of the vote", () => {
//     expect(getByText(/2 hours left/)).toBeTruthy();
//   });

//   it("should hide the percentage bar", () => {
//     expect(getByTestId(/bar-percentage/).getAttribute("style")).toContain(
//       "display: none"
//     );
//   });
// });

describe("view after click", () => {
  const { getByText, getByTestId } = render(<PollContainer />);

  fireEvent.click(getByText(/Nurhadi - Aldo/));

  it("should show the percentage bar", () => {
    expect(getByTestId(/bar-percentage/).getAttribute("style")).toContain(
      "display: block"
    );
  });

  it("should contains total votes of 1", () => {
    expect(getByText(/1 votes/)).toBeTruthy();
  });

  it("should show the percentage number", () => {
    expect(getByText(/100%/));
  });
});
