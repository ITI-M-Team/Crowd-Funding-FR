import React, { useState } from 'react';
import axios from '../apis/config';

const DonationComponent = ({ projectId, onDonationSuccess }) => {
  const [amount, setAmount] = useState('');
  const [message, setMessage] = useState('');

  const handleDonate = async () => {
    try {
      await axios.post('/donations/', { project: projectId, amount });
      setMessage('Thank you for your donation!');
      onDonationSuccess();
    } catch (error) {
      setMessage('Failed to donate. Please try again.');
    }
  };

  return (
    <div className="p-4 border rounded-xl shadow-md">
      <h3 className="text-lg font-semibold mb-2">Make a Donation</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="border p-2 rounded mb-2 w-full"
      />
      <button onClick={handleDonate} className="bg-blue-500 text-white px-4 py-2 rounded">
        Donate
      </button>
      {message && <p className="mt-2 text-sm text-green-700">{message}</p>}
    </div>
  );
};

export default DonationComponent;
