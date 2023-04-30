import { Transition } from "@headlessui/react";
import SidebarFooter from "components/SidebarFooter";

interface SidebarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
  handleLogout: () => void;
}

function Sidebar({ isOpen, toggleNavbar, handleLogout }: SidebarProps) {
  return (
    <Transition
      show={isOpen}
      enter="transition ease-in-out duration-300 transform"
      enterFrom="-translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-in-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="-translate-x-full"
    >
      <div className="fixed flex h-full flex-col justify-between items-center h-screen bg-gray-900 inset-y-0 bg-black left-0 z-30 flex-shrink-0 w-80 border-r overflow-y-auto">
        {/* Sidebar content */}
        <div className="w-full">
          <button
            onClick={handleLogout}
            className="bg-orange-500 text-white font-bold py-2 px-4 w-full">
            Logout
          </button>
        </div>
        
        <ul className="bg-gray-100 rounded-lg p-4">
          <li className="flex justify-between items-center py-2 border-b">
            <span className="text-lg font-medium">Título 1</span>
            <span className="text-sm text-gray-500">25 de mayo, 2022 asdsadasd sad</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b">
            <span className="text-lg font-medium">Título 2</span>
            <span className="text-sm text-gray-500">26 de mayo, 2022</span>
          </li>
          <li className="flex justify-between items-center py-2 border-b">
            <span className="text-lg font-medium">Título 3</span>
            <span className="text-sm text-gray-500">27 de mayo, 2022</span>
          </li>
        </ul>

        {/* Sidebar content */}
        <div className="flex flex-col">
          {/* Sidebar menu items */}
          {/* ... */}

          {/* Sidebar footer */}
          <SidebarFooter />
        </div>
      </div>
    </Transition>
  );
}

export default Sidebar;
