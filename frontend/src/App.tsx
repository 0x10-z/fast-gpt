import "styles/App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useState } from "react";
import ChatWindow from "./pages/ChatWindow";
import { HiOutlineMenu, HiX } from "react-icons/hi";
import Sidebar from "./pages/Sidebar";
import LoginForm from "components/Login";
import { User } from "models/User";
import { Auth } from "utils/auth";
import { ApiService } from "services/ApiService";

const apiService = new ApiService();

function App() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(User.from_dict(Auth.getToken()));

  const toggleNavbar = () => {
    setIsOpen(!isOpen);
  };

  const handleLoginSuccess  = (user: User) => {
    setUser(user);
    Auth.setToken(JSON.stringify(user.toDict()))
  };

  const handleResetSession = () => {
    apiService.resetSession(user!);
    user!.resetSession();
    setUser(user);
    Auth.setToken(JSON.stringify(user!.toDict()))
    window.location.reload();
  };

  const handleLogout = () => {
    setUser(null);
    Auth.removeToken();
    setIsOpen(false);
  };

  return (
    <div className="app-container bg-gradient-to-t from-gray-900 to-gray-200">
      { user && 
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
      }
      <Sidebar user={user!} isOpen={isOpen} toggleNavbar={toggleNavbar} handleLogout={handleLogout} handleResetSession={handleResetSession} />
      <div className={`app-content ${isOpen ? "ml-80 hidden md:block" : ""} `}>
        <div className="flex-1 max-w-screen-xl m-auto bg-white">
          {user ? (
            <div className="w-chat-window">
              <ChatWindow user={user}/>
            </div>
          ) : (
            <div className="w-chat-window">
              <LoginForm onLoginSuccess={handleLoginSuccess} />
            </div>
          )}
        </div>
        <ToastContainer />
      </div>
    </div>
  );
}

export default App;
