import { IoIosSend } from "react-icons/io";

function NewMessageBox() {
  return (
    <div className="h-full bg-white flex items-center justify-center">
      <div className="flex items-center w-[90%]  bg-white rounded-lg px-4 py-2">
        <input
          type="text"
          placeholder="Send message"
          className="border-2 outline-none bg-gray-200 rounded-lg w-full h-14 py-3 px-4 mr-2"
        />
        <div className="text-3xl flex justify-center items-center text-white w-12 h-12 bg-blue-700 rounded-full">
          <IoIosSend />
        </div>
      </div>
    </div>
  );
}

export default NewMessageBox;
