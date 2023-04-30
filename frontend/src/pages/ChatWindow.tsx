import { useState, useRef, useEffect } from "react";
import "react-toastify/dist/ReactToastify.css";
import ChatInput from "components/ChatInput";
import MessagesList from "components/MessagesList";
import Footer from "components/Footer";
import { Message, Sender } from "components/Message";
import { ApiService } from "services/ApiService";
import { showErrorNotification } from "utils/utils";
const apiService = new ApiService();

/* eslint-disable no-multi-str */
const defaultMessages = [
  // Message.createMessage("¡Hola! ¿En qué puedo ayudarte hoy?", Sender.Assistant),
  // Message.createMessage("como puedo hacer con python un hola mundo?", Sender.User),
  // Message.createMessage("¡Claro! Para hacer un 'Hola Mundo' en Python, sigue estos pasos:\n\n1. Abre un editor de texto como Notepad, Sublime Text, Visual Studio Code, etc.\n2. Escribe el siguiente código:\n\n```python\nprint('Hola Mundo')\n```\n\n3. Guarda el archivo con el nombre que desees y con la extensión '.py' (por ejemplo, 'hola_mundo.py').\n4. Abre la terminal o línea de comandos y ejecutalo.", Sender.Assistant),
  Message.createMessage("Y en java?", Sender.User),
  Message.createMessage("Para hacer un 'Hola Mundo' en Java, el codigo es el siguiente:\n\n```java\npublic class Main{\n\tpublic static void main(string[] args){\n\t\tSystem.out.println(\"Hola Mundo\");\n\t}\n}\n```", Sender.Assistant),
  // Message.createMessage("Cuentame un cuento", Sender.User),
  // Message.createMessage("\
  //  Había una vez un pequeño ratón llamado Tomás que vivía en una pequeña cueva en el bosque. Tomás era un ratón muy curioso y aventurero, siempre estaba buscando nuevas aventuras y lugares por explorar.\
  //  Un día, mientras caminaba por el bosque, Tomás se encontró con un hermoso jardín lleno de flores y plantas exóticas. El ratón se emocionó tanto que decidió explorar el jardín y descubrir todos sus secretos.\
  //  Mientras exploraba, Tomás se encontró con una hermosa mariposa que estaba atrapada en una telaraña. El ratón decidió ayudar a la mariposa y la liberó de la telaraña. La mariposa estaba muy agradecida y le dijo a Tomás que si alguna vez necesitaba ayuda, ella estaría allí para ayudarlo.\
  //  Unos días después, Tomás se encontró en una situación difícil cuando se perdió en el bosque y no podía encontrar su camino de regreso a casa. Recordando la promesa de la mariposa, Tomás decidió buscarla y pedirle ayuda.\
  //  Finalmente, después de mucho buscar, Tomás encontró a la mariposa y le explicó su situación. La mariposa, recordando la ayuda que Tomás le había brindado, decidió ayudarlo y lo guió de regreso a su cueva en el bosque.\
  //  Desde ese día, Tomás y la mariposa se convirtieron en grandes amigos y siempre estaban allí para ayudarse mutuamente en cualquier situación difícil que pudieran enfrentar. Y así, el pequeño ratón aprendió que la amistad y la ayuda desinteresada son las cosas más valiosas que uno puede tener en la vida.", Sender.Assistant),
]


function ChatWindow() {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const lastMessageRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>(defaultMessages);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const addMessageToState = (message: Message) => {
    setMessages((prevState) => [...prevState.slice(0, -1), message]);
  };

  const handleClick = () => {
    const selectedText = window.getSelection()?.toString();
    if (!selectedText && inputRef.current) {
      inputRef.current.focus();
    }
  };

  const sendMessage = async (message: string) => {
    try {
      setLoading(true);
      const userMessage = Message.createMessage(message, Sender.User);
      setMessages((prevState) => [...prevState, userMessage]);
      const temporalAssistantMessage = Message.createMessage("#...", Sender.Assistant);
      setMessages((prevState) => [...prevState, temporalAssistantMessage]);
      const assistantMessage = await apiService.chatGpt(message);
      addMessageToState(assistantMessage);
      setLoading(false);
    } catch (error: any) {
      showErrorNotification("El backend parece no estar funcionando...");
      const errorMessage = Message.createMessage(error.message, Sender.Assistant);
      addMessageToState(errorMessage);
      setLoading(false);
    }
  };
  
  return (
    <div className="flex flex-col h-screen" onClick={handleClick}>
      <div className="flex flex-col flex-grow overflow-y-auto">
        <MessagesList loading={loading} lastMessageRef={lastMessageRef} messages={messages} />
      </div>
      <div className="mt-auto">
        <ChatInput onSendMessage={sendMessage} inputRef={inputRef} />
        <Footer />
      </div>
    </div>


  );
}



export default ChatWindow;
