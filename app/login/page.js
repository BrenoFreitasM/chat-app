export default function LoginPage() {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-900 text-white">
        <div className="w-full max-w-md p-6 bg-gray-800 rounded-lg shadow-md">
          <h2 className="text-2xl font-bold text-center">Login</h2>
          <form className="mt-4">
            <div>
              <label className="block text-sm font-medium">Email</label>
              <input
                type="email"
                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="seuemail@email.com"
              />
            </div>
            <div className="mt-3">
              <label className="block text-sm font-medium">Senha</label>
              <input
                type="password"
                className="w-full mt-1 p-2 bg-gray-700 border border-gray-600 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="••••••"
              />
            </div>
            <button
              type="submit"
              className="w-full mt-4 bg-blue-600 hover:bg-blue-700 py-2 rounded text-white font-bold transition"
            >
              Entrar
            </button>
          </form>
        </div>
      </div>
    );
  }
  