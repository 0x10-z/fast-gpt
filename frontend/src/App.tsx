import "styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ChatWindow from "./pages/ChatWindow";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Sidebar from "./pages/Sidebar";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="app-container">
      <button
        className="fixed z-20 top-4 right-4 p-2 rounded-full bg-gray-800 text-white"
        onClick={toggleNavbar}
      >
        {isOpen ? (
          <HiX className="h-6 w-6" />
        ) : (
          <HiOutlineMenu className="h-6 w-6" />
        )}
      </button>
      <Sidebar isOpen={isOpen} toggleNavbar={toggleNavbar} />
      <div className={`app-content ${isOpen ? "ml-80 hidden md:block" : ""} bg-gradient-to-t from-gray-900 to-gray-200`}>
        <div className="flex-1 max-w-screen-xl m-auto bg-white">
          <div className="w-chat-window">
            <ChatWindow />
          </div>
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;