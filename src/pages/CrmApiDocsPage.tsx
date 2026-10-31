import React, { useState } from 'react';
import { Database, ShieldCheck, CheckCircle, Copy, Check } from 'lucide-react';

export const CrmApiDocsPage: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'overview' | 'schema' | 'postman' | 'tester'>('overview');
  const [copied, setCopied] = useState(false);

  // Live test state
  const [testOutput, setTestOutput] = useState<any>(null);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleRunMockEndpoint = (endpoint: string) => {
    switch (endpoint) {
      case 'health':
        setTestOutput({
          status: 200,
          time: '18ms',
          response: {
            success: true,
            message: 'Neon database connection is healthy',
            data: { db: 'connected' },
          },
        });
        break;
      case 'register':
        setTestOutput({
          status: 201,
          time: '42ms',
          response: {
            success: true,
            message: 'Employee registered successfully',
            data: {
              token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
              employee: {
                id: 1,
                name: 'Counselor Priya',
                email: 'priya.counselor@crm.org',
                createdAt: new Date().toISOString(),
              },
            },
          },
        });
        break;
      case 'unclaimed':
        setTestOutput({
          status: 200,
          time: '38ms',
          response: {
            success: true,
            message: 'Unclaimed enquiries retrieved successfully',
            data: {
              enquiries: [
                {
                  id: 101,
                  name: 'Rahul Sharma',
                  email: 'rahul.s@example.com',
                  phone: '+91 98765 43210',
                  courseInterest: 'Full Stack Web Development',
                  claimedBy: null,
                  claimedAt: null,
                  createdAt: '2026-10-29T10:30:00.000Z',
                },
                {
                  id: 102,
                  name: 'Sneha Patel',
                  email: 'sneha.p@example.com',
                  phone: '+91 91234 56780',
                  courseInterest: 'Data Science & Machine Learning',
                  claimedBy: null,
                  claimedAt: null,
                  createdAt: '2026-10-29T09:45:00.000Z',
                },
              ],
              pagination: { total: 2, page: 1, limit: 10, totalPages: 1 },
            },
          },
        });
        break;
      case 'claim':
        setTestOutput({
          status: 200,
          time: '51ms',
          response: {
            success: true,
            message: 'Enquiry claimed successfully',
            data: {
              id: 101,
              name: 'Rahul Sharma',
              email: 'rahul.s@example.com',
              phone: '+91 98765 43210',
              courseInterest: 'Full Stack Web Development',
              claimedBy: 1,
              claimedAt: new Date().toISOString(),
              createdAt: '2026-10-29T10:30:00.000Z',
            },
          },
        });
        break;
      case 'my':
        setTestOutput({
          status: 200,
          time: '29ms',
          response: {
            success: true,
            message: 'Your claimed enquiries retrieved successfully',
            data: {
              enquiries: [
                {
                  id: 101,
                  name: 'Rahul Sharma',
                  email: 'rahul.s@example.com',
                  phone: '+91 98765 43210',
                  courseInterest: 'Full Stack Web Development',
                  claimedBy: 1,
                  claimedAt: '2026-10-29T10:45:12.000Z',
                  createdAt: '2026-10-29T10:30:00.000Z',
                },
              ],
              pagination: { total: 1, page: 1, limit: 10, totalPages: 1 },
            },
          },
        });
        break;
      case 'public':
        setTestOutput({
          status: 201,
          time: '34ms',
          response: {
            success: true,
            message: 'Enquiry submitted successfully',
            data: {
              id: 103,
              name: 'Ananya Verma',
              email: 'ananya@example.com',
              phone: '+91 98112 34567',
              courseInterest: 'UI/UX Design Masterclass',
              createdAt: new Date().toISOString(),
            },
          },
        });
        break;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6 bg-white rounded-2xl shadow-sm border border-gray-100 my-4">
      {/* Top Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-4 border-b border-gray-100 gap-3">
        <div>
          <div className="flex items-center gap-2">
            <span className="bg-orange-100 text-[#FF5A00] text-xs font-bold px-2 py-0.5 rounded-full">
              PostgreSQL on Neon + JWT
            </span>
            <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-0.5 rounded-full">
              Atomic Claim Logic
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 mt-1">
            CRM System REST API Backend
          </h1>
          <p className="text-xs sm:text-sm text-gray-500">
            Node.js, Express, Neon PostgreSQL, parameterized SQL ($1, $2), and Postman collection
          </p>
        </div>

        {/* Tab Buttons */}
        <div className="flex items-center bg-gray-100 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'overview' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            Endpoints
          </button>
          <button
            onClick={() => setActiveTab('schema')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'schema' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            SQL Schema
          </button>
          <button
            onClick={() => setActiveTab('postman')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'postman' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            Postman JSON
          </button>
          <button
            onClick={() => setActiveTab('tester')}
            className={`px-3 py-1.5 rounded-lg transition-all ${
              activeTab === 'tester' ? 'bg-white text-gray-900 shadow-xs' : 'text-gray-600'
            }`}
          >
            Live Tester
          </button>
        </div>
      </div>

      {/* Tab: Overview / Endpoints Table */}
      {activeTab === 'overview' && (
        <div className="mt-6 space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-orange-50/60 border border-orange-100 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-[#FF5A00] uppercase tracking-wide">
                <ShieldCheck className="w-4 h-4" /> Auth & Employees
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Counselor registration and login with bcryptjs password hashing and JWT issuance.
              </p>
            </div>

            <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-blue-700 uppercase tracking-wide">
                <Database className="w-4 h-4" /> Atomic Claiming
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Zero race conditions via parameterized single-statement UPDATE with RETURNING.
              </p>
            </div>

            <div className="bg-emerald-50/60 border border-emerald-100 rounded-xl p-4">
              <div className="flex items-center gap-2 text-xs font-bold text-emerald-700 uppercase tracking-wide">
                <CheckCircle className="w-4 h-4" /> Uniform Responses
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Always responds with <code>{`{ success, message, data }`}</code> and standard HTTP codes.
              </p>
            </div>
          </div>

          {/* Endpoints Table */}
          <div className="overflow-x-auto rounded-xl border border-gray-200">
            <table className="w-full text-left text-xs sm:text-sm">
              <thead className="bg-gray-50 border-b border-gray-200 text-gray-700 font-semibold">
                <tr>
                  <th className="py-2.5 px-3">Method</th>
                  <th className="py-2.5 px-3">Route</th>
                  <th className="py-2.5 px-3">Auth</th>
                  <th className="py-2.5 px-3">Description</th>
                  <th className="py-2.5 px-3">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100 font-mono text-xs">
                <tr>
                  <td className="py-2.5 px-3 text-blue-600 font-bold">GET</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/health</td>
                  <td className="py-2.5 px-3 text-gray-500 font-sans">No</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">Runs SELECT 1 on Neon database to verify health</td>
                  <td className="py-2.5 px-3 font-sans">200 / 500</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">POST</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/auth/register</td>
                  <td className="py-2.5 px-3 text-gray-500 font-sans">No</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">Register employee (name, email, password)</td>
                  <td className="py-2.5 px-3 font-sans">201 / 409</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">POST</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/auth/login</td>
                  <td className="py-2.5 px-3 text-gray-500 font-sans">No</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">Login employee &rarr; returns JWT + info</td>
                  <td className="py-2.5 px-3 font-sans">200 / 401</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-emerald-600 font-bold">POST</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/enquiries/public</td>
                  <td className="py-2.5 px-3 text-gray-500 font-sans">No</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">Public enquiry form submission</td>
                  <td className="py-2.5 px-3 font-sans">201 / 400</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-blue-600 font-bold">GET</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/enquiries/unclaimed</td>
                  <td className="py-2.5 px-3 text-amber-600 font-sans font-semibold">Bearer JWT</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">All enquiries where claimed_by IS NULL (?page=1&limit=10)</td>
                  <td className="py-2.5 px-3 font-sans">200 / 401</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-amber-600 font-bold">PATCH</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/enquiries/:id/claim</td>
                  <td className="py-2.5 px-3 text-amber-600 font-sans font-semibold">Bearer JWT</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">Atomic claim enquiry for logged-in employee</td>
                  <td className="py-2.5 px-3 font-sans">200 / 404 / 409</td>
                </tr>
                <tr>
                  <td className="py-2.5 px-3 text-blue-600 font-bold">GET</td>
                  <td className="py-2.5 px-3 font-semibold text-gray-800">/api/enquiries/my</td>
                  <td className="py-2.5 px-3 text-amber-600 font-sans font-semibold">Bearer JWT</td>
                  <td className="py-2.5 px-3 text-gray-600 font-sans">Enquiries where claimed_by = employee id (?page=1&limit=10)</td>
                  <td className="py-2.5 px-3 font-sans">200 / 401</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Tab: SQL Schema */}
      {activeTab === 'schema' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-gray-500">
              File: <code>crm-backend/sql/schema.sql</code>
            </span>
            <button
              onClick={() =>
                copyToClipboard(
                  `CREATE TABLE IF NOT EXISTS employees (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(150) UNIQUE NOT NULL,\n    password VARCHAR(255) NOT NULL,\n    created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE TABLE IF NOT EXISTS enquiries (\n    id SERIAL PRIMARY KEY,\n    name VARCHAR(100) NOT NULL,\n    email VARCHAR(150) NOT NULL,\n    phone VARCHAR(20),\n    course_interest VARCHAR(150) NOT NULL,\n    claimed_by INTEGER REFERENCES employees(id) ON DELETE SET NULL,\n    claimed_at TIMESTAMP NULL,\n    created_at TIMESTAMP DEFAULT NOW()\n);\n\nCREATE INDEX IF NOT EXISTS idx_enquiries_claimed_by ON enquiries(claimed_by);\nCREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);`
                )
              }
              className="flex items-center gap-1.5 text-xs text-[#FF5A00] font-semibold hover:underline"
            >
              {copied ? <Check className="w-3.5 h-3.5" /> : <Copy className="w-3.5 h-3.5" />}
              {copied ? 'Copied' : 'Copy Schema'}
            </button>
          </div>

          <pre className="p-4 bg-gray-900 text-gray-100 rounded-xl text-xs font-mono overflow-x-auto leading-relaxed">
{`-- 1. Create employees table
CREATE TABLE IF NOT EXISTS employees (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 2. Create enquiries table
CREATE TABLE IF NOT EXISTS enquiries (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(150) NOT NULL,
    phone VARCHAR(20),
    course_interest VARCHAR(150) NOT NULL,
    claimed_by INTEGER REFERENCES employees(id) ON DELETE SET NULL,
    claimed_at TIMESTAMP NULL,
    created_at TIMESTAMP DEFAULT NOW()
);

-- 3. Add index on enquiries(claimed_by)
CREATE INDEX IF NOT EXISTS idx_enquiries_claimed_by ON enquiries(claimed_by);
CREATE INDEX IF NOT EXISTS idx_enquiries_created_at ON enquiries(created_at DESC);`}
          </pre>
        </div>
      )}

      {/* Tab: Postman Collection */}
      {activeTab === 'postman' && (
        <div className="mt-6 space-y-4">
          <div className="flex items-center justify-between">
            <p className="text-xs text-gray-600">
              The complete Postman Collection is located at <code>crm-backend/postman_collection.json</code>.
            </p>
            <a
              href={`data:text/json;charset=utf-8,${encodeURIComponent(
                JSON.stringify({
                  info: {
                    name: 'CRM System API (PostgreSQL + JWT)',
                    schema: 'https://schema.getpostman.com/json/collection/v2.1.0/collection.json',
                  },
                })
              )}`}
              download="crm_postman_collection.json"
              className="text-xs font-semibold text-[#FF5A00] hover:underline"
            >
              Download Collection JSON
            </a>
          </div>

          <div className="p-4 bg-gray-50 border border-gray-200 rounded-xl space-y-2 text-xs text-gray-700">
            <p className="font-bold text-gray-900">How to use in Postman:</p>
            <ol className="list-decimal list-inside space-y-1">
              <li>Open Postman and click <strong>Import</strong>.</li>
              <li>Select <code>crm-backend/postman_collection.json</code>.</li>
              <li>Set collection variable <code>base_url</code> to your server URL (default <code>http://localhost:5001</code>).</li>
              <li>Run <strong>Register Employee</strong> or <strong>Login Employee</strong> — the JWT token is saved automatically into <code>jwt_token</code>.</li>
              <li>Execute <strong>Get Unclaimed</strong>, <strong>Claim Enquiry</strong>, and <strong>My Enquiries</strong> seamlessly.</li>
            </ol>
          </div>
        </div>
      )}

      {/* Tab: Live Tester */}
      {activeTab === 'tester' && (
        <div className="mt-6 space-y-4">
          <p className="text-xs text-gray-600">
            Click any button below to simulate the API endpoint response:
          </p>

          <div className="flex flex-wrap gap-2">
            <button
              onClick={() => handleRunMockEndpoint('health')}
              className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-semibold cursor-pointer"
            >
              GET /api/health
            </button>
            <button
              onClick={() => handleRunMockEndpoint('register')}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer"
            >
              POST /api/auth/register
            </button>
            <button
              onClick={() => handleRunMockEndpoint('public')}
              className="text-xs px-3 py-1.5 bg-gray-100 hover:bg-gray-200 rounded-lg font-semibold cursor-pointer"
            >
              POST /api/enquiries/public
            </button>
            <button
              onClick={() => handleRunMockEndpoint('unclaimed')}
              className="text-xs px-3 py-1.5 bg-blue-50 text-blue-700 hover:bg-blue-100 rounded-lg font-semibold cursor-pointer"
            >
              GET /api/enquiries/unclaimed
            </button>
            <button
              onClick={() => handleRunMockEndpoint('claim')}
              className="text-xs px-3 py-1.5 bg-orange-50 text-[#FF5A00] hover:bg-orange-100 rounded-lg font-semibold cursor-pointer"
            >
              PATCH /api/enquiries/1/claim
            </button>
            <button
              onClick={() => handleRunMockEndpoint('my')}
              className="text-xs px-3 py-1.5 bg-emerald-50 text-emerald-700 hover:bg-emerald-100 rounded-lg font-semibold cursor-pointer"
            >
              GET /api/enquiries/my
            </button>
          </div>

          {testOutput && (
            <div className="mt-3">
              <div className="flex items-center justify-between text-xs font-semibold py-1 px-3 bg-gray-800 text-gray-300 rounded-t-lg">
                <span>HTTP Response ({testOutput.status})</span>
                <span className="text-emerald-400">{testOutput.time}</span>
              </div>
              <pre className="p-4 bg-gray-900 text-emerald-400 rounded-b-lg text-xs font-mono overflow-x-auto">
                {JSON.stringify(testOutput.response, null, 2)}
              </pre>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
