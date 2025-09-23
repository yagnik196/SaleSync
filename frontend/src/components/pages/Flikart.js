import React from "react";
import CameraFeed from "../reusables/Camerafeed";

function FlipkartProofing() {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Flipkart Proofing</h1>
      <p className="text-gray-600 mb-6">
        Manage and verify Flipkart product listings with live camera capture.
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
              Verify product packaging 📦
            </li>
            <li className="p-2 border rounded-md hover:bg-gray-100">
              Check barcode alignment 🔍
            </li>
            <li className="p-2 border rounded-md hover:bg-gray-100">
              Capture product images 📸
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default FlipkartProofing;
