import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import { doc, setDoc } from "firebase/firestore";

function Register() {
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [username, setUsername] = useState();
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = auth.currentUser;
      console.log(user);
      if (user) {
        navigate("/chat/new_user");
        await setDoc(doc(db, "users", user.uid), {
          email: user.email,
          privateChats: [],
          groupChats: [],
          uid: user.uid,
          username: username,
        });
      }
    } catch (error) {
      setError(error.message);
    }
  }
  return (
    <div className="bg-gray-50 text-[#333]">
      <div className="min-h-screen flex flex-col items-center justify-center py-6 px-4">
        <div className="max-w-md w-full border py-8 px-6 rounded border-gray-300 bg-white">
          <h2 className="text-center text-3xl font-extrabold">Register</h2>
          <form className="mt-10 space-y-4">
            <div>
              <input
                name="username"
                type="text"
                required
                className="w-full text-sm px-4 py-3 rounded outline-none border-2 focus:border-blue-500"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
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
                Register
              </button>
            </div>

            {error && (
              <div className="h-10 flex items-center justify-center text-red-600">
                <p>{error}</p>
              </div>
            )}
          </form>
          <div className="h-10 flex items-center justify-center">
            <button onClick={() => navigate("/login")}>
              Already have account?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Register;
