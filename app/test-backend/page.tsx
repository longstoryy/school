'use client';

import { useState } from 'react';

export default function TestBackend() {
  const [result, setResult] = useState('');
  const [loading, setLoading] = useState(false);

  const testConnection = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'admin@school.com',
          password: 'admin123'
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setResult(`✅ SUCCESS!\n\n${JSON.stringify(data, null, 2)}`);
      } else {
        const errorData = await response.text();
        setResult(`❌ ERROR ${response.status}:\n\n${errorData}`);
      }
    } catch (error) {
      setResult(`❌ NETWORK ERROR: ${error}`);
    }
    setLoading(false);
  };

  const testWrongCredentials = async () => {
    setLoading(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';
      const response = await fetch(`${apiUrl}/api/auth/token/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: 'wrong@example.com',
          password: 'wrongpass'
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setResult(`❌ UNEXPECTED SUCCESS:\n\n${JSON.stringify(data, null, 2)}`);
      } else {
        const errorData = await response.text();
        setResult(`✅ EXPECTED ERROR ${response.status}:\n\n${errorData}`);
      }
    } catch (error) {
      setResult(`❌ NETWORK ERROR: ${error}`);
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Backend Connection Test</h1>
        
        <div className="space-y-4 mb-8">
          <button
            onClick={testConnection}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 disabled:opacity-50"
          >
            {loading ? '🔄 Testing...' : '🚀 Test Backend Connection'}
          </button>
          
          <button
            onClick={testWrongCredentials}
            disabled={loading}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 disabled:opacity-50 ml-4"
          >
            {loading ? '🔄 Testing...' : '❌ Test Wrong Credentials'}
          </button>
        </div>
        
        <div className="bg-white p-4 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Result:</h2>
          <pre className="bg-gray-100 p-4 rounded overflow-auto text-sm">
            {result || 'Click a button to test'}
          </pre>
        </div>
        
        <div className="mt-8 bg-yellow-50 p-4 rounded-lg">
          <h3 className="font-semibold mb-2">Environment Variables:</h3>
          <p><strong>NEXT_PUBLIC_API_URL:</strong> {process.env.NEXT_PUBLIC_API_URL}</p>
        </div>
      </div>
    </div>
  );
}
