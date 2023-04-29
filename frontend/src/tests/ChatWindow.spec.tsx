import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ChatWindow from "pages/ChatWindow";

describe("ChatWindow", () => {
  test("renders the chat window and sends a message", async () => {
    // Render the ChatWindow component
    render(<ChatWindow />);
    
    // Get the chat input element and type a message
    const input = screen.getByPlaceholderText("Escribe un mensaje...");
    fireEvent.change(input, { target: { value: "Hola" } });
    
    // Get the send button element and click it
    const sendButton = screen.getByText("Enviar");
    fireEvent.click(sendButton);
    
    // Wait for the assistant to respond
    await waitFor(() => screen.getByText("Asistente:"));
    
    // Check that the assistant message is displayed
    expect(screen.getByText("Asistente:")).toBeInTheDocument();
  });
});
