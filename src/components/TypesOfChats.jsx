import { useState } from "react";

function TypesOfChats() {
  const [activeTab, setActiveTab] = useState("All messages");

  const tabs = ["All messages", "Groups"];

  return (
    <div className="flex space-x-4  p-2 text-sm mt-2 mb-2 ml-[1.5rem]">
      {tabs.map((tab) => (
        <button
          key={tab}
          onClick={() => setActiveTab(tab)}
          className={`px-4 py-2 rounded-full ${
            activeTab === tab ? "bg-primary-indigo text-white" : "text-gray-500"
          }`}
        >
          {tab}
        </button>
      ))}
    </div>
  );
}

export default TypesOfChats;
