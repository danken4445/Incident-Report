import React, { useState } from 'react';
import { database } from '../firebase-config';
import { ref, set, get } from 'firebase/database';

const IncidentReportForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    incident: '',
    date: '',
    time: '',
    status: 'pending pa lods',
    ticketNumber: '',
    ticketNumberInput: '',
  });
  const [incidentStatus, setIncidentStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const generateTicketNumber = () => {
    const ticketNumber = Math.floor(Math.random() * 1000000) + 1;
    setFormData({ ...formData, ticketNumber: ticketNumber.toString() });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const dbRef = ref(database, 'incidentReports');
    try {
      const { ticketNumber, ...formDataWithoutTicket } = formData; // Remove ticketNumber from form data
      await set(ref(database, `incidentReports/${ticketNumber}`), {
        ...formDataWithoutTicket,
        ticketNumber,
      }); // Set data with ticketNumber as the key
      alert('Incident Report Submitted');
      setFormData({
        name: '',
        incident: '',
        date: '',
        time: '',
        status: 'pending',
        ticketNumber: '',
        ticketNumberInput: '',
      });
    } catch (error) {
      console.error('Error adding document:', error);
    }
  };

  const trackIncidentStatus = async (ticketNumber) => {
    setIsLoading(true);
    setError(null);
    try {
      const dbRef = ref(database, `incidentReports/${ticketNumber}`);
      const snapshot = await get(dbRef);
      if (snapshot.exists()) {
        const incidentData = snapshot.val();
        const { status } = incidentData;
        setIncidentStatus(status);
      } else {
        setIncidentStatus('Ticket number not found');
      }
    } catch (error) {
      setError('Error tracking incident status: ' + error.message);
      console.error('Error tracking incident status:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleTrackStatus = async () => {
    const { ticketNumberInput } = formData;
    await trackIncidentStatus(ticketNumberInput);
  };

  return (
    <div className="max-w-lg mx-auto">
      <h1 className="text-3xl font-bold text-center mb-6">Incident Report Form</h1>
      <form onSubmit={handleSubmit} className="border rounded-md shadow-md p-4">
        {/* Form  */}
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Incident:</label>
          <textarea
            name="incident"
            value={formData.incident}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Date:</label>
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Time:</label>
          <input
            type="time"
            name="time"
            value={formData.time}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-bold mb-2">Ticket Number:</label>
          <input
            type="text"
            name="ticketNumber"
            value={formData.ticketNumber}
            onChange={handleChange}
            onFocus={generateTicketNumber}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            readOnly
          />
        </div>
        {/* Submit button */}
        <div className="flex justify-center">
          <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
            Submit
          </button>
        </div>
      </form>
      {/* Track status input/button container */}
      <div className="flex items-center mt-4">
        <input
          type="text"
          name="ticketNumberInput"
          value={formData.ticketNumberInput}
          onChange={handleChange}
          className="shadow appearance-none border rounded-l w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          placeholder="Enter Ticket Number"
        />
        <button
          type="button"
          onClick={handleTrackStatus}
          className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded-r focus:outline-none focus:shadow-outline"
          disabled={isLoading}
        >
          {isLoading ? 'Loading...' : 'Track Status'}
        </button>
      </div>
      {incidentStatus && <p className="mt-4">Current status: {incidentStatus}</p>}
      {error && <p className="text-red-500">Error: {error}</p>}
    </div>
  );
};

export default IncidentReportForm;
