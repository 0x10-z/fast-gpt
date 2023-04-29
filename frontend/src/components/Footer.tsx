
const Footer = () => {
  return (
    <div className="px-3 pt-2 pb-3 text-center text-xs text-gray-600 dark:text-gray-300 md:px-4 md:pt-3 md:pb-6">
      <span>
        El frontend de este cliente de{" "}
        <a
          href="https://chat.openai.com/"
          target="_blank"
          rel="noreferrer"
          className="underline">
          ChatGPT
        </a>{" "}
        se ha construido con ayuda del propio ChatGPTv3.5, basado en{" "}
        <a
          href="https://es.react.dev/"
          target="_blank"
          rel="noreferrer"
          className="underline">
          React
        </a>{" "}
        y{" "}
        <a
          href="https://tailwindcss.com/"
          target="_blank"
          rel="noreferrer"
          className="underline">
          Tailwind CSS
        </a>
        .{" "}
      </span>
    </div>
  );
};

export default Footer;
