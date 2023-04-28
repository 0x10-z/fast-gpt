import { FaSpinner } from "react-icons/fa";

function Loader() {
  return (
    <div className="flex justify-center items-center">
      <FaSpinner className="animate-spin h-5 w-5 mr-3" />
      <span>Cargando...</span>
    </div>
  );
}

export default Loader;
