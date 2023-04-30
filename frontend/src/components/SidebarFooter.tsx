
import { Globals } from "Globals";
import { useState, useEffect } from "react";

const SidebarFooter = () => {
  const [backendVersion, setBackendVersion] = useState<string>();

  useEffect(() => {
    async function fetchBackendVersion(){
      const response = await Globals.getBackendVersion()
      setBackendVersion(response);
    }

    fetchBackendVersion();
  }, []);
  return (
    <div className="x-3 flex text-white pt-2 pb-3 text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pt-3 md:pb-6">
      <span className="text-center w-full">
        {
          `Frontend v${Globals.FRONTEND_VERSION} -
           Backend v${backendVersion ? backendVersion : "Loading..."}`
        }
      </span>
    </div>
  );
};

export default SidebarFooter;
