import { render, screen } from "@testing-library/react";
import Footer from "components/Footer";

describe("Footer", () => {
  test("renders footer text", () => {
    render(<Footer />);
    const linkElements = screen.getAllByRole("link");
    expect(linkElements[0]).toHaveAttribute(
      "href",
      "https://chat.openai.com/"
    );
    expect(linkElements[1]).toHaveAttribute("href", "https://es.react.dev/");
    expect(linkElements[2]).toHaveAttribute(
      "href",
      "https://tailwindcss.com/"
    );
    expect(screen.getByText(/El frontend de este cliente de/i)).toBeInTheDocument();
  });
});
