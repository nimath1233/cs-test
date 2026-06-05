/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState } from 'react';

// Custom inline SVG logos for withdrawal gateways
const Xmlogo = () => (
  <svg className="w-24 h-10" viewBox="0 0 100 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="100" height="40" rx="6" fill="black" />
    <path d="M15 10 L22 20 L15 30 Z" fill="#EF4444" />
    <text x="32" y="27" fill="white" fontSize="22" fontWeight="900" fontFamily="sans-serif" letterSpacing="1">XM</text>
  </svg>
);

const Binancelogo = () => (
  <svg className="w-12 h-12" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="40" height="40" rx="6" fill="black" />
    <path d="M20 7.5L25.8 13.3L20 19.1L14.2 13.3L20 7.5Z" fill="#F0B90B" />
    <path d="M11 16.5L13.9 19.4L11 22.3L8.1 19.4L11 16.5Z" fill="#F0B90B" />
    <path d="M29 16.5L31.9 19.4L29 22.3L26.1 19.4L29 16.5Z" fill="#F0B90B" />
    <path d="M20 25.1L25.8 30.9L20 36.7L14.2 30.9L20 25.1Z" fill="#F0B90B" />
    <path d="M20 19.1L22.9 22L20 24.9L17.1 22L20 19.1Z" fill="#F0B90B" />
  </svg>
);

const XmRedepositlogo = () => (
  <div className="flex flex-col items-center gap-1">
    <Xmlogo />
    <span className="text-[10px] font-black tracking-widest text-[#1a1c29] uppercase">Redeposit</span>
  </div>
);

export default function WithdrawPage({ user, onWithdrawSubmit, errorMsg, successMsg }) {
  const [amount, setAmount] = useState('100');
  const [currency, setCurrency] = useState('USD');
  const [selectedMethod, setSelectedMethod] = useState('');

  const handleWithdrawClick = (methodName) => {
    setSelectedMethod(methodName);
    
    // Auto-submit the withdrawal using USD mapped to USDT balance
    onWithdrawSubmit({
      asset: 'USDT',
      amount: parseFloat(amount),
      address: `Simulated ${methodName} external wallet withdraw`,
    });
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Header */}
        <h2 className="text-3xl font-extrabold text-[#1a1c29] mb-1.5 text-left tracking-tight">
          Withdraw
        </h2>
        <p className="text-sm text-slate-500 mb-6 text-left font-medium">
          Select a cash out method and amount from below to proceed.
        </p>

        {/* Form Card Container */}
        <div className="bg-[#f8fafc] border border-slate-200/60 rounded-2xl p-6 sm:p-8 flex flex-col text-left">
          
          {/* Cash out Amount Section */}
          <div className="flex flex-col gap-2 mb-6">
            <div className="flex justify-between items-center max-w-md">
              <h4 className="text-sm font-bold text-slate-700">Cash out Amount</h4>
              {user && (
                <span className="text-[10px] text-slate-400 font-bold">
                  Max Available:{' '}
                  <button 
                    type="button"
                    onClick={() => setAmount(user.balances.USDT.toFixed(2))}
                    className="text-emerald-500 hover:underline font-extrabold cursor-pointer"
                  >
                    {user.balances.USDT.toFixed(2)} USD
                  </button>
                </span>
              )}
            </div>
            
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

          {/* Recent Cash outs Section */}
          <div className="flex flex-col gap-2 mb-8">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Recent Cash outs,</h4>
            <div className="inline-flex">
              <span className="bg-slate-200/60 text-slate-700 text-xs font-bold px-3 py-1.5 rounded-lg border border-slate-300/20">
                15.00 USD
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

          {/* Cash out Methods Section */}
          <div className="flex flex-col gap-4">
            <h4 className="text-sm font-bold text-slate-700">Cash out Method</h4>
            
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 max-w-4xl">
              
              {/* XM Card */}
              <button
                onClick={() => handleWithdrawClick('XM')}
                className="bg-white border border-slate-200 hover:border-red-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <div className="h-16 flex items-center justify-center">
                  <Xmlogo />
                </div>
                <span className="text-sm font-bold text-slate-700">XM</span>
              </button>

              {/* Binance Card */}
              <button
                onClick={() => handleWithdrawClick('Binance')}
                className="bg-white border border-slate-200 hover:border-red-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <div className="h-16 flex items-center justify-center">
                  <Binancelogo />
                </div>
                <span className="text-sm font-bold text-slate-700">Binance</span>
              </button>

              {/* XM Redeposit Card */}
              <button
                onClick={() => handleWithdrawClick('XM Redeposit')}
                className="bg-white border border-slate-200 hover:border-red-500 rounded-2xl p-6 flex flex-col items-center justify-center gap-4 cursor-pointer shadow-sm hover:shadow-md transition-all duration-300 focus:outline-none"
              >
                <div className="h-16 flex items-center justify-center">
                  <XmRedepositlogo />
                </div>
                <span className="text-sm font-bold text-slate-700">XM Redeposit</span>
              </button>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
