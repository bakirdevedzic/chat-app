import { useState } from "react";

function TypesOfChats() {
  const [activeTab, setActiveTab] = useState("All messages");

  const tabs = ["All messages", "Groups"];

  return (
    <div className="flex space-x-4 bg-white p-2 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full ${
            activeTab === tab ? "bg-blue-500 text-white" : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TypesOfChats;
