// src/components/pages/MeeshoProofing.js
import React from "react";
import CameraFeed from "../reusables/Camerafeed";

function MeeshoProofing() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">🛍️ Meesho Proofing</h1>
      <p className="text-gray-600 mb-6">
        Validate and proof Meesho catalog details with live video checks.
      </p>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Camera Feed */}
        <div>
          <h2 className="text-lg font-semibold mb-2">Live Camera Feed</h2>
          <CameraFeed />
        </div>

        {/* Side Panel */}
        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Tasks</h2>
          <ul className="space-y-2">
            <li className="p-2 border rounded-md hover:bg-gray-100">
              Verify catalog images 🖼️
            </li>
            <li className="p-2 border rounded-md hover:bg-gray-100">
              Validate price tags 💰
            </li>
            <li className="p-2 border rounded-md hover:bg-gray-100">
              Check product descriptions ✍️
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default MeeshoProofing;
