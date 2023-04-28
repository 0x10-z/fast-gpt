import { useState } from "react";
import { Transition } from "@headlessui/react";
//import { MenuIcon, XIcon } from "@heroicons/react/outline";
import { HiOutlineMenu, HiX } from "react-icons/hi";

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => setIsOpen(!isOpen);

  return (
    <div className="flex h-screen bg-gray-100">
      {/* Botón para abrir/cerrar el sidebar */}
      <button
        className="fixed z-20 inset-0 bg-black opacity-25 transition-opacity"
        onClick={toggleSidebar}
        aria-hidden="true"></button>

      {/* Sidebar */}
      <Transition
        show={isOpen}
        enter="transition ease-in-out duration-300 transform"
        enterFrom="-translate-x-full"
        enterTo="translate-x-0"
        leave="transition ease-in-out duration-300 transform"
        leaveFrom="translate-x-0"
        leaveTo="-translate-x-full">
        <div className="fixed inset-y-0 left-0 z-30 flex-shrink-0 w-64 bg-white border-r overflow-y-auto">
          {/* Contenido del sidebar */}
        </div>
      </Transition>

      {/* Contenido principal */}
      <div className="flex-1 overflow-auto p-10">
        {/* Botón para abrir el sidebar (visible en dispositivos móviles) */}
        <button
          className="fixed z-20 top-4 right-4 p-2 rounded-full bg-gray-800 text-white"
          onClick={toggleSidebar}>
          {isOpen ? (
            <HiX className="h-6 w-6" />
          ) : (
            <HiOutlineMenu className="h-6 w-6" />
          )}
        </button>

        {/* Contenido principal */}
        <h1 className="text-2xl font-bold">Contenido principal</h1>
        <p className="mt-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed eu risus
          eget quam eleifend lacinia at sit amet sapien. Nullam elementum,
          tellus eu ullamcorper dictum, tellus nibh rutrum arcu, vel venenatis
          quam libero vitae nunc. Sed eu lorem ut magna convallis vehicula.
          Praesent fringilla vel erat at vestibulum.
        </p>
      </div>
    </div>
  );
}

export default Sidebar;
