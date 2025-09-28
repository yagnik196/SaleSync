// src/pages/FlipkartProofing.js

import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import {useAuth}  from "../../Contex/Authcontext"// Make sure path is correct
import CameraFeed from "../reusables/Camerafeed";

// --- UI Component for Status Overlay ---
const StatusOverlay = ({ status }) => {
  const messages = {
    recording: "🔴 Recording...",
    saving: "⏳ Saving, please wait...",
    success: "✅ Saved!",
    error: "❌ Error: Save Failed!",
  };

  if (!messages[status]) return null;

  return (
    <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <h2 className="text-white text-3xl font-bold">{messages[status]}</h2>
    </div>
  );
};


function FlipkartProofing() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("idle"); // idle, recording, saving, success, error
  const [stream, setStream] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const recordedChunksRef = useRef([]);
  const orderIdInputRef = useRef(null);
  
  const { token } = useAuth(); // Get auth token from context

  // --- 1. Start Camera on Component Load ---
  useEffect(() => {
    const startCamera = async () => {
      try {
        const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true});
        setStream(mediaStream);
      } catch (err) {
        console.error("Error accessing camera:", err);
        alert("Camera access denied or not available.");
      }
    };
    startCamera();
    
    // Focus the input field on load
    orderIdInputRef.current?.focus();

    // Cleanup when component unmounts
    return () => {
      stream?.getTracks().forEach((track) => track.stop());
    };
  }, []);

  // --- 2. Handle 's' Key to Start Recording ---
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key.toLowerCase() === 's' && status === 'idle' && orderIdInputRef.current !== document.activeElement) {
        handleStartRecording();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [status, stream]);

  // --- 3. Auto-reset UI after success or error ---
  useEffect(() => {
    if (status === 'success' || status === 'error') {
      const timer = setTimeout(() => {
        setOrderId("");
        setStatus('idle');
        orderIdInputRef.current?.focus();
      }, 2000); // Reset after 2 seconds
      return () => clearTimeout(timer);
    }
  }, [status]);


  const handleStartRecording = () => {
    if (status !== 'idle' || !stream) return;

    setStatus('recording');
    recordedChunksRef.current = [];
    mediaRecorderRef.current = new MediaRecorder(stream, { mimeType: "video/webm" });

    mediaRecorderRef.current.ondataavailable = (event) => {
      if (event.data.size > 0) {
        recordedChunksRef.current.push(event.data);
      }
    };

    mediaRecorderRef.current.start();
  };

  // --- 4. Handle Form Submission (Barcode Scan 'Enter') ---
  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (status !== 'recording' || !orderId.trim()) return;

    mediaRecorderRef.current.onstop = async () => {
      setStatus('saving');
      const videoBlob = new Blob(recordedChunksRef.current, { type: "video/webm" });
      
      const formData = new FormData();
      formData.append('video', videoBlob, `${orderId}.webm`);
      formData.append('orderId', orderId);

      try {
        await axios.post("http://127.0.0.1:8000/api/save-video/", formData, {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          }
        });
        setStatus('success');
      } catch (err) {
        console.error("Failed to save video:", err);
        setStatus('error');
      }
    };

    mediaRecorderRef.current.stop();
  };


  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">📦 Flipkart Proofing</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="relative">
          <CameraFeed stream={stream} />
          <StatusOverlay status={status} />
        </div>

        <div className="bg-white p-4 rounded-xl shadow">
          <h2 className="text-lg font-semibold mb-3">Order Details:</h2>
          <form onSubmit={handleFormSubmit}>
            <div className="flex flex-col">
              <label htmlFor="orderId" className="text-gray-700 font-medium mb-1">
                Order ID
              </label>
              <input
                ref={orderIdInputRef}
                type="text"
                id="orderId"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                placeholder="Scan barcode or type Order ID and press Enter"
                className="border border-gray-300 rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-primary transition"
                // Disable input when not in the idle or recording state
                disabled={status !== 'idle' && status !== 'recording'}
                required
              />
            </div>
            <p className="text-sm text-gray-500 mt-4">
              Press the **'S'** key on your keyboard to start recording.
            </p>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FlipkartProofing;