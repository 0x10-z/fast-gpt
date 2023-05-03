
import { Globals } from "Globals";
import { useState, useEffect } from "react";

const Footer = () => {
  const [backendVersion, setBackendVersion] = useState<string>();

  useEffect(() => {
    async function fetchBackendVersion(){
      const response = await Globals.getBackendVersion()
      setBackendVersion(response);
    }

    fetchBackendVersion();
  }, []);
  return (
    <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-600 md:px-4 md:pt-3 md:pb-6">
      <span>
        Cliente {" "}
        <a
          href="https://chat.openai.com/"
          target="_blank"
          rel="noreferrer"
          className="underline">
          ChatGPT
        </a>{" "}
        creado con fines educativos. Código disponible en{" "}
        <a
          href="https://github.com/0x10-z/fast-gpt"
          target="_blank"
          rel="noreferrer"
          className="underline">
          Github
        </a>.{" "}
        Frontend v{ Globals.FRONTEND_VERSION }{" - "}
        Backend v{backendVersion}
      </span>
    </div>
  );
};

export default Footer;
