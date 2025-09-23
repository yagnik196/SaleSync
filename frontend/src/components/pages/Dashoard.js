// Dashboard.js
import React from "react";
import { useAuth } from "../../Contex/Authcontext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const workflows = [
    { id: 1, str:"Flipkart" ,name: "Flipkart Proofing", description: "Manage and verify Flipkart product listings" ,avail:true},
    { id: 2, str:"Meesho" ,name: "Meesho Proofing", description: "Check and validate Meesho catalog details" ,avail:true },
    { id: 3, str:"others" ,name: "Website Proofing", description: "Proof content for your official website" ,avail:false },
  ];

const handleproof = (flow) => {
  if(!flow.avail){
    alert("\n 🚧Under Devlopment!!");
  }
  else{
    navigate(`/${flow.str}`)
  }
}
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">
        Welcome, {user?.name || "Guest"} 🎉
      </h1>

      <h2 className="text-xl font-semibold mb-4">Available Proofings</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {workflows.map((flow) => (
          <div
            key={flow.id}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition cursor-pointer bg-white"
          >
            <h3 className="text-lg font-bold">{flow.name}</h3>
            <p className="text-gray-600 text-sm">{flow.description}</p>
            <button className="mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" onClick={() => handleproof(flow)}>
              Start
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Dashboard;
