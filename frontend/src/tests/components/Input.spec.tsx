import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Input from "components/Input";

// automock the entire CartService module
jest.mock('react-textarea-autosize');

describe("Input", () => {
  it("renders correctly", () => {
    const mockInputRef = { current: document.createElement("textarea") } as React.RefObject<HTMLTextAreaElement>;
    const mockHandleKeyDown = jest.fn((event) =>{
      console.log("event!!"+event)
    });
    const mockHandleSendMessage = jest.fn(() =>{
      console.log("event!!")
    });


    render(
      <Input
        inputRef={mockInputRef}
        message=""
        setMessage={() => {}}
        handleKeyDown={mockHandleKeyDown}
        handleSendMessage={mockHandleSendMessage}
      />
    );

    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("calls mockHandleSendMessage when a key is pressed", () => {
    const mockInputRef = { current: document.createElement("textarea") } as React.RefObject<HTMLTextAreaElement>;
    const mockHandleKeyDown = jest.fn();
    const mockHandleSendMessage = jest.fn();

    render(
      <Input
        inputRef={mockInputRef}
        message=""
        setMessage={() => {}}
        handleKeyDown={mockHandleKeyDown}
        handleSendMessage={mockHandleSendMessage}
      />
    );

    userEvent.click(screen.getByRole("button"));

    expect(mockHandleSendMessage).toHaveBeenCalled();
  });
});
