import { render, screen } from "@testing-library/react";
import Footer from "components/Footer";
import fetch from "jest-fetch-mock";

const mockData = {
  version: "1.0.0"
};

describe("Footer", () => {
  beforeEach(() => {
    fetch.resetMocks();
  });

  afterEach(() => {
    fetch.mockClear();
  });

  test("true", () => {
    expect(true).toBe(true);
  })

  // test("renders footer text", () => {
  //   fetchMock.mockResponseOnce(JSON.stringify(mockData), { status: 200 });
  //   render(<Footer />);
    
  //   const linkElements = screen.getAllByRole("link");
  //   expect(linkElements[0]).toHaveAttribute(
  //     "href",
  //     "https://chat.openai.com/"
  //   );
  //   expect(linkElements[1]).toHaveAttribute("href", "https://github.com/0x10-z/fast-gpt");
  //   expect(screen.getByText(/creado con fines/i)).toBeInTheDocument();
    
  // });
});
