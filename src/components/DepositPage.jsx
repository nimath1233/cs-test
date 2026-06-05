/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

// Custom high-quality inline SVGs for payment gateway logos
const Xmlogo = () => (
  <svg className="w-24 h-10" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="40" rx="6" fill="black" />
    <path d="M15 10 L22 20 L15 30 Z" fill="#EF4444" />
    <text x="32" y="27" fill="white" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">XM</text>
  </svg>
);

const Pmlogo = () => (
  <svg className="w-16 h-16" viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="30" cy="30" r="28" fill="#E11D48" />
    <text x="12" y="38" fill="white" fontSize="22" fontWeight="800" fontFamily="serif" italic="true">PM</text>
  </svg>
);

const Netellerlogo = () => (
  <svg className="w-28 h-8" viewBox="0 0 120 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <text x="5" y="23" fill="#84CC16" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="0.5">NETELLER</text>
  </svg>
);

export default function DepositPage({ user, onDepositSubmit, errorMsg, successMsg }) {
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('USD');
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleDepositClick = (methodName) => {
    setSelectedMethod(methodName);
    
    // Auto-verify and submit the deposit using USD mapped to USDT balance
    onDepositSubmit({
      asset: 'USDT',
      amount: parseFloat(amount),
      address: `Simulated ${methodName} gateway deposit transaction`,
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <h2 className="text-3xl font-extrabold text-[#1a1c29] mb-1.5 text-left tracking-tight">
          Deposit
        </h2>
        <p className="text-sm text-slate-500 mb-6 text-left font-medium">
          Select a top up method and amount from below to proceed.
        </p>

        {/* Form Card Container */}
        <div className="bg-[#f8fafc] border border-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col text-left">
          
          {/* Topup Amount Section */}
          <div className="flex flex-col gap-2 mb-6">
            <h4 className="text-sm font-bold text-slate-700">Topup Amount</h4>
            
            <div className="flex gap-4 max-w-md">
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="100"
                className="w-2/3 bg-white border border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-semibold"
              />
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-1/3 bg-white border border-slate-200 focus:border-blue-500 rounded-lg px-4 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all font-bold cursor-pointer"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GBP">GBP</option>
              </select>
            </div>
          </div>

          {/* Recent Topups Section */}
          <div className="flex flex-col gap-2 mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Topups,</h4>
            <div className="inline-flex">
              <span className="bg-slate-200/60 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300/20">
                USD 15.00
              </span>
            </div>
          </div>

          {/* Alert feedbacks */}
          {errorMsg && (
            <div className="mb-6 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg shadow-sm max-w-3xl">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-6 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold rounded-lg shadow-sm max-w-3xl">
              {successMsg}
            </div>
          )}

          {/* Top up Methods Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-700">Top up Method</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
              
              {/* XM Card */}
              <button
                onClick={() => handleDepositClick('XM')}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <div className="h-16 flex items-center justify-center">
                  <Xmlogo />
                </div>
                <span className="text-sm font-bold text-slate-700">XM</span>
              </button>

              {/* Perfect Money Card */}
              <button
                onClick={() => handleDepositClick('Perfect Money')}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <div className="h-16 flex items-center justify-center">
                  <Pmlogo />
                </div>
                <span className="text-sm font-bold text-slate-700">PM</span>
              </button>

              {/* Neteller Card */}
              <button
                onClick={() => handleDepositClick('Neteller')}
                className="bg-white border border-slate-200 hover:border-emerald-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <div className="h-16 flex items-center justify-center">
                  <Netellerlogo />
                </div>
                <span className="text-sm font-bold text-slate-700">Neteller</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
