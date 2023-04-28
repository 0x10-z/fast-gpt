import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ChatWindow from "./components/ChatWindow";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import { Transition } from "@headlessui/react";

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
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-100 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-100 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full"
      >
        <div className="fixed h-screen bg-gray-900 inset-y-0 bg-black left-0 z-30 flex-shrink-0 w-64 border-r overflow-y-auto">
          {/* Contenido del sidebar */}
        </div>
      </Transition>
      <div className={`app-content ${isOpen ? "ml-64" : ""}`}>
        <div className="flex-1 max-w-screen-xl m-auto">
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
