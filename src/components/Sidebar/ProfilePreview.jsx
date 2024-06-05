import { useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../../firebase";
import toast from "react-hot-toast";
import { useContext } from "react";
import { mainContext } from "../../context/MainContext";

function ProfilePreview() {
  const { userData } = useContext(mainContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    }
  };

  return (
    <div>
      <div className="flex items-center h-[4rem] justify-between divide-y-2 pl-[1.5rem]">
        <div className="flex items-center">
          <div>
            <p className="text-lg font-semibold">{userData?.username}</p>
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
