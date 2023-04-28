import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LoginForm from "./components/Login";

import ChatWindow from "./components/ChatWindow";

function App() {
  return (
    <div className="flex h-screen">
      <div className="w-100 min-w-100 bg-gray-900">
        {/* Navbar de 100px de ancho */}
        <div className="w-chat-window">
          <LoginForm />
        </div>
      </div>
      <div className="flex-1 max-w-screen-xl m-auto">
        {/* Contenido principal con ancho máximo de pantalla */}
        <div className="w-chat-window">
          <ChatWindow />
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
