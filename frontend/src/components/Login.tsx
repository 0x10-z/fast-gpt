import { useState } from "react";
import { ApiService } from "services/ApiService";
import { showErrorNotification } from "utils/utils";
import { User } from "models/User";

const apiService = new ApiService();

interface LoginProps {
  onLoginSuccess: (user: User) => void;
}

function LoginForm({onLoginSuccess}: LoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const user = await apiService.login(username, password);
    if (user){
      onLoginSuccess(user)
    }else{
      showErrorNotification("El nombre de usuario o contraseña son incorrectos.")
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-100 sm:justify-center items-center pt-6 sm:pt-0">
      <div className="w-full sm:max-w-md mt-6 px-6 py-4 bg-white shadow-md overflow-hidden sm:rounded-lg">
        <h2 className="text-center font-semibold text-3xl lg:text-4xl text-gray-800 mb-4">
          Iniciar sesión
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="username">
              Usuario
            </label>
            <input
              autoFocus
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              id="username"
              type="username"
              name="username"
              placeholder="Ingresa tu username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="password">
              Contraseña
            </label>
            <input
              className="w-full px-4 py-2 border rounded-md text-gray-700 focus:outline-none focus:border-blue-500"
              id="password"
              type="password"
              name="password"
              placeholder="Ingresa tu contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex items-center justify-between">
            <button
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
              type="submit"
            >
              Iniciar sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginForm;
