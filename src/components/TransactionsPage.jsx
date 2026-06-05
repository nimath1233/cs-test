/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

export default function TransactionsPage({ token }) {
  const [activeTab, setActiveTab] = useState('deposit'); // 'deposit' or 'withdrawal'
  const [history, setHistory] = useState([]);
  const [filteredHistory, setFilteredHistory] = useState([]);
  const [filterCriteria, setFilterCriteria] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [method, setMethod] = useState('');

  // Fetch transaction history from backend
  const fetchHistory = async () => {
    try {
      const apiBase = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api';
      const response = await fetch(`${apiBase}/transactions/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (resData.success) {
        setHistory(resData.data);
      }
    } catch (err) {
      console.error('Fetch Transactions Error:', err);
    }
  };

  useEffect(() => {
    fetchHistory();
  }, [token]);

  // Filter local history whenever the active tab, fromDate, toDate or list changes
  useEffect(() => {
    let list = history.filter((item) => item.type === activeTab);

    if (fromDate) {
      const start = new Date(fromDate);
      list = list.filter((item) => new Date(item.createdAt) >= start);
    }
    if (toDate) {
      const end = new Date(toDate);
      end.setHours(23, 59, 59, 999); // set to end of day
      list = list.filter((item) => new Date(item.createdAt) <= end);
    }

    setFilteredHistory(list);
  }, [history, activeTab, fromDate, toDate]);

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-[#1a1c29] mb-6 text-left tracking-tight">
          Transactions
        </h2>

        {/* Tabs Bar */}
        <div className="flex border-b border-slate-200 mb-8">
          <button
            onClick={() => setActiveTab('deposit')}
            className={`pb-3.5 px-2 text-sm font-bold border-b-2 transition-all cursor-pointer focus:outline-none ${
              activeTab === 'deposit'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Deposit History
          </button>
          <button
            onClick={() => setActiveTab('withdrawal')}
            className={`pb-3.5 px-2 text-sm font-bold border-b-2 ml-8 transition-all cursor-pointer focus:outline-none ${
              activeTab === 'withdrawal'
                ? 'border-indigo-600 text-indigo-600'
                : 'border-transparent text-slate-400 hover:text-slate-600'
            }`}
          >
            Withdrawal History
          </button>
        </div>

        {/* Filter Controls Row */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm mb-6 flex flex-col gap-6 text-left">
          
          <div className="grid grid-cols-1 sm:grid-cols-4 gap-4 w-full">
            {/* Filter Criteria */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Filter Criteria</label>
              <select
                value={filterCriteria}
                onChange={(e) => setFilterCriteria(e.target.value)}
                className="bg-[#f8fafc] border border-slate-200 focus:border-indigo-500 rounded-lg px-3 py-2.5 text-xs text-slate-600 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="amount">Amount</option>
                <option value="status">Status</option>
              </select>
            </div>

            {/* From Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">From</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="bg-[#f8fafc] border border-slate-200 focus:border-indigo-500 rounded-lg px-3 py-2.5 text-xs text-slate-600 font-semibold focus:outline-none cursor-pointer"
              />
            </div>

            {/* To Date */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">To</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="bg-[#f8fafc] border border-slate-200 focus:border-indigo-500 rounded-lg px-3 py-2.5 text-xs text-slate-600 font-semibold focus:outline-none cursor-pointer"
              />
            </div>

            {/* Transaction Method */}
            <div className="flex flex-col gap-1.5">
              <label className="text-xs font-bold text-slate-500">Transaction Method</label>
              <select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
                className="bg-[#f8fafc] border border-slate-200 focus:border-indigo-500 rounded-lg px-3 py-2.5 text-xs text-slate-600 font-semibold focus:outline-none cursor-pointer"
              >
                <option value="">Select</option>
                <option value="USDT">USDT Gateway</option>
                <option value="BTC">BTC Gateway</option>
                <option value="XM">XM Gateway</option>
              </select>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex gap-3">
            <button className="flex items-center gap-1.5 px-6 py-2.5 bg-[#004d4d] hover:bg-[#003636] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer focus:outline-none">
              Filter
            </button>
            
            <div className="relative">
              <button className="flex items-center gap-1.5 px-6 py-2.5 bg-[#004d4d] hover:bg-[#003636] text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer focus:outline-none">
                Export
                <svg className="w-3.5 h-3.5 text-white" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
              </button>
            </div>
          </div>

        </div>

        {/* Transactions Table List */}
        <div className="bg-white border border-slate-200/80 rounded-2xl overflow-hidden shadow-sm">
          {filteredHistory.length > 0 ? (
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="border-b border-slate-200/60 bg-slate-50 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                  <th className="p-4">Reference ID</th>
                  <th className="p-4">Asset</th>
                  <th className="p-4">Amount</th>
                  <th className="p-4">Wallet/Gateway Detail</th>
                  <th className="p-4">Status</th>
                  <th className="p-4">Creation Date</th>
                </tr>
              </thead>
              <tbody className="text-xs font-semibold text-slate-600 divide-y divide-slate-100">
                {filteredHistory.map((item) => (
                  <tr key={item._id} className="hover:bg-slate-50/50 transition-colors">
                    <td className="p-4 font-mono text-[10px] text-slate-400">{item._id}</td>
                    <td className="p-4 font-bold text-slate-800">{item.asset}</td>
                    <td className="p-4 font-bold text-indigo-600">{item.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                    <td className="p-4 max-w-[180px] truncate font-medium text-slate-500" title={item.address}>{item.address}</td>
                    <td className="p-4">
                      <span className={`px-2 py-0.8 rounded text-[10px] font-bold ${
                        item.status === 'completed'
                          ? 'bg-emerald-50 text-emerald-600 border border-emerald-100'
                          : item.status === 'pending'
                          ? 'bg-amber-50 text-amber-600 border border-amber-100'
                          : 'bg-rose-50 text-rose-600 border border-rose-100'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                    <td className="p-4 text-[10px] text-slate-400 font-mono">
                      {new Date(item.createdAt).toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="p-10 text-center text-sm font-medium text-slate-400">
              No transaction ledger events found on your account.
            </div>
          )}
        </div>

      </div>
    </div>
  );
}
