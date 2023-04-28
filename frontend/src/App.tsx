import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./components/Login";
import Sidebar from "./components/Siderbar";
import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <Sidebar />
    /*
    <div className="flex h-screen">
      <div className="w-100 min-w-100 bg-gray-900">
        }
        <div className="w-chat-window">
          <LoginForm />
        </div>
      </div>
      <div className="flex-1 max-w-screen-xl m-auto">
        <div className="w-chat-window">
          <ChatWindow />
        </div>
      </div>
      <ToastContainer />
    </div>
    */
  );
}

export default App;
