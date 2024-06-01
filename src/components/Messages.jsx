import Message from "./Message";

const msg1 = {
  user: "Mike",
  message: "hello",
  date: "15:43",
};
const msg2 = {
  user: "Joe",
  message: "hi",
  date: "15:44",
};

const msg3 = {
  user: "Mike",
  message: "how are you",
  date: "15:45",
};

function Messages() {
  return (
    <div className="flex flex-col-reverse bg-slate-50 overflow-y-scroll">
      <Message message={msg3} />
      <Message message={msg2} />
      <Message message={msg1} />
    </div>
  );
}

export default Messages;
