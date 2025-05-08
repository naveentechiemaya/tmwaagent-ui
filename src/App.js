import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import './App.css';

// Connect to the backend socket.io server
const socket = io('https://tmwaagent.onrender.com'); // Adjust your backend URL if needed

function App() {
  const [qrCode, setQrCode] = useState(null);  // State to store QR code image URL
  const [ready, setReady] = useState(false);   // State to track if the client is ready

  // Listen for 'qr' and 'ready' events from the backend
  useEffect(() => {
    socket.on('qr', (qr) => {
      setQrCode(qr); // Update the state with the QR code image URL
    });

    socket.on('ready', () => {
      setReady(true); // Mark the client as ready
    });

    // Cleanup the socket event listeners on component unmount
    return () => {
      socket.off('qr');
      socket.off('ready');
    };
  }, []);

  return (
    <div className="App">
      <h1>WhatsApp Web Client</h1>

      {/* Show the QR code if it's not ready */}
      {!ready ? (
        <div>
          <h2>Scan the QR Code</h2>
          {qrCode ? (
            <div>
              <img src={qrCode} alt="Scan QR Code" style={{ width: '200px', height: '200px' }} />
            </div>
          ) : (
            <p>Loading QR code...</p>
          )}
        </div>
      ) : (
        <div>
          <h2>WhatsApp Client is Ready</h2>
          <p>You can now start sending messages!</p>
        </div>
      )}
    </div>
  );
}

export default App;
