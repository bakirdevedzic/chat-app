import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function ProfilePreview() {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div className="flex items-center h-[4rem] justify-between divide-y-2 pl-[1.5rem]">
        <div className="flex items-center">
          <div>
            <p className="text-lg font-semibold">Joe Doe</p>
            <p className="text-sm cursor-pointer" onClick={handleLogout}>
              Log Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilePreview;
