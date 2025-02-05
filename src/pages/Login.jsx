import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase";

function Login() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const [error, setError] = useState(null);
  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/chat/logged_in");
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="bg-gray-50 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">
            Log in to your account
          </h2>
          <form className="mt-10 space-y-4">
            <div>
              <input
                name="email"
                type="email"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Email address"
              />
            </div>
            <div>
              <input
                name="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                placeholder="Password"
              />
            </div>

            <div className="!mt-10">
              <button
                type="button"
                className="w-full py-2.5 px-4 text-sm rounded text-white bg-blue-600 hover:bg-blue-700 focus:outline-none"
                onClick={handleSubmit}
              >
                Log in
              </button>
            </div>
            {error && (
              <div className="h-10 flex items-center justify-center text-red-600">
                <p>{error}</p>
              </div>
            )}
          </form>
          <div className="h-10 flex items-center justify-center">
            <button onClick={() => navigate("/register")}>
              Don&apos;t have account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
