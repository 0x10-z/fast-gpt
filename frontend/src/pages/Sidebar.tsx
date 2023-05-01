import SidebarFooter from "components/SidebarFooter";
import { motion, AnimatePresence } from "framer-motion";
import { User } from "models/User";
import { ApiService } from "services/ApiService";

const apiService = new ApiService();

interface SidebarProps {
  user: User;
  isOpen: boolean;
  toggleNavbar: () => void;
  handleLogout: () => void;
}

function Sidebar({ user, isOpen, toggleNavbar, handleLogout }: SidebarProps) {
  const handleResetSession = () => {
    apiService.resetSession(user);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          className="fixed inset-y-0 left-0 z-50 w-64 bg-gray-800"
          initial={{ x: -300 }}
          animate={{ x: 0 }}
          exit={{ x: -300 }}
          transition={{ ease: "easeInOut", duration: 0.3 }}
        >
  <div className="fixed h-screen w-80 flex flex-col bg-gray-900 text-gray-100 shadow-lg">
    <div className="flex items-center justify-between px-4 py-3">
      <h1 className="text-2xl font-bold">Hola {user.username}!</h1>
      <button onClick={toggleNavbar} className="text-gray-400 hover:text-white focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
      <div className="flex flex-col space-y-1">
        <a href="#" className="block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-800">Creado: {user.created_at.toDateString()}</a>
        <a href="#" className="block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-800">Tokens disponibles: {user.tokens_available}</a>
        <button onClick={handleResetSession} className="w-full block p-2 transition duration-300 ease-in-out rounded-md bg-yellow-800 hover:bg-gray-500">Reiniciar sesión</button>

      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-3">
      <button onClick={handleLogout} className="w-full block p-2 transition duration-300 ease-in-out rounded-md bg-red-800 hover:bg-gray-500">Salir</button>
      <SidebarFooter />
    </div>
  </div>
  </motion.div>
)}
</AnimatePresence>
  );
}

export default Sidebar;
