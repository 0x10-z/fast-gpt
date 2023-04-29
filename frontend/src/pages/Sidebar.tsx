import { Transition } from "@headlessui/react";
import LoginForm from "components/Login";

interface SidebarProps {
  isOpen: boolean;
  toggleNavbar: () => void;
}

function Sidebar({ isOpen, toggleNavbar }: SidebarProps) {
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
      <div className="fixed h-screen bg-gray-900 inset-y-0 bg-black left-0 z-30 flex-shrink-0 w-80 border-r overflow-y-auto">
        {/* Contenido del sidebar */}
        <LoginForm />
      </div>
    </Transition>
  );
}

export default Sidebar;
