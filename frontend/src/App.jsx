import React, { useState } from 'react';
import axios from 'axios';
import InputForm from './components/InputForm';
import Dashboard from './components/Dashboard';
import './index.css';

function App() {
  const [step, setStep] = useState('input'); // input | result
  const [analysisData, setAnalysisData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleAnalyze = async (formData) => {
    setLoading(true);
    setError(null);
    try {
      // Connect to FastAPI Backend
      // Note: Ensure the backend is running on port 8000
      const response = await axios.post('http://localhost:8000/analyze', formData);
      setAnalysisData(response.data);
      setStep('result');
    } catch (err) {
      console.error(err);
      setError('Failed to analyze data. Please make sure the backend server is running.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setStep('input');
    setAnalysisData(null);
    setError(null);
  };

  return (
    <div className="app-container">
      {error && (
        <div className="error-banner">
          {error}
          <button onClick={() => setError(null)}>✖</button>
        </div>
      )}

      {step === 'input' && (
        <InputForm onAnalyze={handleAnalyze} loading={loading} />
      )}

      {step === 'result' && analysisData && (
        <Dashboard data={analysisData} onReset={handleReset} />
      )}
    </div>
  );
}

export default App;
