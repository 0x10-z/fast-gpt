
import { FRONTEND_VERSION } from "Globals";

const SidebarFooter = () => {
  return (
    <div className="x-3 flex text-white pt-2 pb-3 text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pt-3 md:pb-6">
      <span className="text-center w-full">
      Frontend v{ FRONTEND_VERSION }
      </span>
    </div>
  );
};

export default SidebarFooter;
