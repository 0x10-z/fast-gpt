import TextareaAutosize from "react-textarea-autosize";

interface InputProps {
  inputRef: React.RefObject<HTMLTextAreaElement>;
  message: string;
  setMessage: (message: string) => void;
  handleKeyDown: (event: React.KeyboardEvent<HTMLTextAreaElement>) => void;
  handleSendMessage: () => void;
}

function Input({
  inputRef,
  message,
  setMessage,
  handleKeyDown,
  handleSendMessage,
}: InputProps) {
  return (
    <div className="flex flex-col w-full py-2 flex-grow md:py-3 md:pl-4 border border-black/10 bg-white dark:border-gray-900/50 dark:text-white dark:bg-gray-700 rounded-md shadow-[0_0_10px_rgba(0,0,0,0.10)] dark:shadow-[0_0_15px_rgba(0,0,0,0.10)] relative">
      <TextareaAutosize
        autoFocus
        ref={inputRef}
        minRows={1}
        maxRows={8}
        placeholder="Escribe aquí tu mensaje..."
        style={{ height: 10 }}
        className="m-0 w-full h-auto border-0 bg-transparent p-0 pr-7 focus:ring-0 focus-visible:ring-0 dark:bg-transparent pl-2 md:pl-0"
        value={message}
        onChange={(event: { target: { value: string } }) =>
          setMessage(event.target.value)
        }
        onKeyDown={handleKeyDown}
      />
      <div className="absolute inset-y-0 right-0 flex items-center pr-2">
        <button type="button" onClick={handleSendMessage}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 text-gray-500 hover:text-blue-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}

export default Input;
