// main.jsx or index.js (where your main entry point is)

import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App'; // Make sure your App component is imported correctly
import './index.css'; // Ensure Tailwind CSS styles are imported


// Use createRoot instead of ReactDOM.render
const root = createRoot(document.getElementById('root'));
root.render(<App />);
