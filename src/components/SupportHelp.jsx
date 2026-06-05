/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';

export default function SupportHelp({ token, user, onGoHome }) {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(false);
  const [formError, setFormError] = useState('');
  const [formSuccess, setFormSuccess] = useState('');

  const apiBaseUrl = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api';

  const fetchTickets = async () => {
    if (!token) return;
    setLoadingTickets(true);
    try {
      const response = await fetch(`${apiBaseUrl}/support/tickets`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (resData.success) {
        setTickets(resData.data);
      }
    } catch (err) {
      console.error('Error fetching tickets:', err);
    } finally {
      setLoadingTickets(false);
    }
  };

  useEffect(() => {
    if (token) {
      fetchTickets();
    } else {
      setTickets([]);
    }
  }, [token]);

  const handleTicketSubmit = async (e) => {
    e.preventDefault();
    setFormError('');
    setFormSuccess('');

    if (!subject.trim() || !message.trim()) {
      setFormError('Subject and message details are required.');
      return;
    }

    try {
      const response = await fetch(`${apiBaseUrl}/support/tickets`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ subject, message }),
      });
      const resData = await response.json();
      if (resData.success) {
        setFormSuccess('Your support ticket has been logged on MongoDB successfully.');
        setSubject('');
        setMessage('');
        fetchTickets();
      } else {
        setFormError(resData.message || 'Failed to submit support ticket.');
      }
    } catch (err) {
      setFormError('Network error trying to submit ticket.');
      console.error(err);
    }
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-[#1a1c29] text-left tracking-tight">
          Support & Help
        </h2>

        {/* Main Support Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* Left Column: Direct Contacts */}
          <div className="lg:col-span-5 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col justify-between">
            <div>
              <h3 className="text-xl font-bold text-[#1a1c29] mb-3 text-left">
                Get in Touch
              </h3>
              <p className="text-xs text-slate-500 leading-relaxed mb-6 text-left">
                We're here to help! Reach out to us through any of the channels below. Our support
                team is available 24/7 to assist you.
              </p>

              <div className="flex flex-col gap-3 mb-6">
                {/* 24/7 Support */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Live Chat</p>
                    <p className="text-xs font-bold text-[#1a1c29]">Available 24/7 on Dashboard</p>
                  </div>
                </div>

                {/* Email Support */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center text-indigo-600">
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Email Support</p>
                    <a href="mailto:support@itrustld.com" className="text-xs font-bold text-[#1a1c29] hover:underline">
                      support@itrustld.com
                    </a>
                  </div>
                </div>

                {/* Phone Support */}
                <div className="flex items-center gap-3 p-3 bg-slate-50 rounded-xl border border-slate-100">
                  <div className="w-8 h-8 rounded-lg bg-teal-500/10 flex items-center justify-center text-teal-600">
                    <svg className="w-4 h-4 animate-pulse" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div className="text-left">
                    <p className="text-[10px] text-slate-400 font-bold uppercase">Phone Hotline</p>
                    <p className="text-xs font-bold text-[#1a1c29]">+94 117 751 751</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Response metadata banner */}
            <div className="bg-[#0fa958] text-white rounded-xl p-4 text-left relative overflow-hidden">
              <div className="absolute -right-5 -bottom-5 w-16 h-16 bg-white/5 rounded-full" />
              <h4 className="text-xs font-bold mb-1">Guaranteed Response</h4>
              <p className="text-[10px] text-emerald-50 leading-relaxed">
                Tickets are reviewed by support agents within 2 hours.
              </p>
              <button
                onClick={onGoHome}
                className="mt-3 text-[10px] font-bold text-white underline hover:no-underline cursor-pointer bg-transparent border-none focus:outline-none"
              >
                Go to Dashboard
              </button>
            </div>
          </div>

          {/* Right Column: Support Ticketing System (Stored XSS Demo) */}
          <div className="lg:col-span-7 bg-white border border-slate-200 rounded-2xl shadow-sm p-6 flex flex-col gap-6 text-left">
            <div>
              <h3 className="text-xl font-bold text-[#1a1c29] mb-1">
                Support Tickets
              </h3>
              <p className="text-xs text-slate-500">
                Log a secure support query to the database.
              </p>
            </div>

            {token ? (
              /* Authenticated View */
              <div className="space-y-6">
                {/* Form to submit a ticket */}
                <form onSubmit={handleTicketSubmit} className="space-y-4">
                  {formError && (
                    <div className="p-3 bg-rose-50 border border-rose-200 text-rose-600 text-xs font-semibold rounded-lg">
                      {formError}
                    </div>
                  )}
                  {formSuccess && (
                    <div className="p-3 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold rounded-lg">
                      {formSuccess}
                    </div>
                  )}

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Subject *</label>
                    <input
                      type="text"
                      value={subject}
                      onChange={(e) => setSubject(e.target.value)}
                      placeholder="e.g. Withdrawal Delay"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[10px] uppercase tracking-wider font-bold text-slate-400">Message / Description *</label>
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Describe your issue or paste support details. (Vulnerable to Stored XSS!)"
                      rows="4"
                      className="w-full bg-slate-50 border border-slate-200 focus:border-emerald-500 rounded-xl px-4 py-3 text-xs text-slate-800 focus:outline-none transition-colors resize-none"
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-3 bg-[#0fa958] hover:bg-emerald-600 text-white font-bold rounded-xl transition-all duration-200 cursor-pointer text-xs shadow-sm focus:outline-none"
                  >
                    Submit Support Ticket
                  </button>
                </form>

                {/* Submitted Tickets Ledger */}
                <div className="border-t border-slate-100 pt-6">
                  <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">
                    Your Ticket Logs ({tickets.length})
                  </h4>

                  {loadingTickets ? (
                    <p className="text-xs text-slate-400">Loading tickets...</p>
                  ) : tickets.length > 0 ? (
                    <div className="space-y-4 max-h-[300px] overflow-y-auto pr-1">
                      {tickets.map((t) => (
                        <div key={t._id} className="p-4 bg-slate-50 rounded-xl border border-slate-100 flex flex-col gap-2">
                          <div className="flex justify-between items-center">
                            <span className="text-xs font-bold text-slate-800">{t.subject}</span>
                            <span className="text-[9px] font-mono text-slate-400">
                              {new Date(t.createdAt).toLocaleDateString()}
                            </span>
                          </div>
                          
                          {/* VULNERABILITY: Stored XSS trigger point */}
                          <div
                            className="text-xs text-slate-600 leading-relaxed font-medium bg-white p-3 rounded-lg border border-slate-100"
                            dangerouslySetInnerHTML={{ __html: t.message }}
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="text-xs text-slate-400">No support tickets logged in MongoDB yet.</p>
                  )}
                </div>
              </div>
            ) : (
              /* Unauthenticated View */
              <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 flex flex-col items-center justify-center gap-3">
                <svg className="w-8 h-8 text-slate-300" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                <p className="text-xs text-slate-500 font-semibold">
                  Authentication Required
                </p>
                <p className="text-[11px] text-slate-400 max-w-xs leading-normal">
                  Please sign in or register to submit support tickets and view your logged queries.
                </p>
              </div>
            )}

          </div>

        </div>

      </div>

      {/* Floating Chat Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-bounce shadow-lg">
        <div className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5 select-none">
          Chat with us 👋
        </div>
        <button className="relative w-14 h-14 bg-[#008080] hover:bg-teal-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none">
          <svg className="w-7 h-7" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 border border-white text-[10px] font-black text-white rounded-full flex items-center justify-center select-none shadow">
            1
          </span>
        </button>
      </div>

    </div>
  );
}
