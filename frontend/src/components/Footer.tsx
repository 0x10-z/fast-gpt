
import { FRONTEND_VERSION } from "Globals";

const Footer = () => {
  return (
    <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pt-3 md:pb-6">
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
        Frontend v{ FRONTEND_VERSION }
      </span>
    </div>
  );
};

export default Footer;
