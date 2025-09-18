// Dashboard.js
import React from "react";
import { useAuth } from "../../Contex/Authcontext";

function Dashboard() {
  const { user } = useAuth();
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold">Welcome, {user?.name || "Guest"} 🎉</h1>
    </div>
  );
}

export default Dashboard;
