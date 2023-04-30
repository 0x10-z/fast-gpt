import { Transition } from "@headlessui/react";
import SidebarFooter from "components/SidebarFooter";
import { motion, AnimatePresence } from "framer-motion";

interface SidebarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
  handleLogout: () => void;
}

function Sidebar({ isOpen, toggleNavbar, handleLogout }: SidebarProps) {
  return (
    <Transition
      show={isOpen}
      enter="transition ease-in-out duration-100 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-100 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
  <div className="fixed h-screen w-80 flex flex-col bg-gray-900 text-gray-100 shadow-lg">
    <div className="flex items-center justify-between px-4 py-3">
      <h1 className="text-2xl font-bold">Hola Iker!</h1>
      <button onClick={toggleNavbar} className="text-gray-400 hover:text-white focus:outline-none">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
    <div className="flex flex-col flex-grow px-4 py-6 overflow-y-auto">
      <div className="flex flex-col space-y-1">
        <a href="#" className="block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-800">Link 1</a>
        <a href="#" className="block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-800">Link 2</a>
        <a href="#" className="block p-2 transition duration-300 ease-in-out rounded-md hover:bg-gray-800">Link 3</a>
      </div>
    </div>
    <div className="flex-shrink-0 px-4 py-3">
      <button onClick={handleLogout} className="w-full block p-2 transition duration-300 ease-in-out rounded-md bg-gray-800 hover:bg-gray-500">Logout</button>
      <SidebarFooter />
    </div>
  </div>
</Transition>

  );
}

export default Sidebar;
