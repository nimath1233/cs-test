/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react';
import DashboardHeader from './components/DashboardHeader';
import DashboardHero from './components/DashboardHero';
import SupportHelp from './components/SupportHelp';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import DepositPage from './components/DepositPage';
import WithdrawPage from './components/WithdrawPage';
import TransactionsPage from './components/TransactionsPage';
import LoyaltyPage from './components/LoyaltyPage';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5005/api';

function App() {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem('token') || '');
  const [activeModal, setActiveModal] = useState(null);
  const [currentView, setCurrentView] = useState('dashboard');
  const [txHistory, setTxHistory] = useState([]);
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  
  // Form input states
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    asset: 'USDT',
    amount: '',
    address: '',
  });

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken('');
    setUser(null);
    setActiveModal(null);
  };

  const fetchUserProfile = async (authToken) => {
    try {
      const response = await fetch(`${API_BASE_URL}/user/profile`, {
        headers: {
          Authorization: `Bearer ${authToken}`,
        },
      });
      const resData = await response.json();
      if (resData.success) {
        setUser(resData.data);
      } else {
        // Token invalid or expired
        handleLogout();
      }
    } catch (_err) {
      console.error('Fetch Profile Error:', _err);
    }
  };

  const fetchTransactionHistory = async () => {
    if (!token) return;
    try {
      const response = await fetch(`${API_BASE_URL}/transactions/history`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const resData = await response.json();
      if (resData.success) {
        setTxHistory(resData.data);
      }
    } catch (_err) {
      console.error('Fetch History Error:', _err);
    }
  };

  // Load profile on start or token change
  useEffect(() => {
    if (token) {
      fetchUserProfile(token);
    } else {
      setUser(null);
    }
  }, [token]);

  useEffect(() => {
    if (activeModal === 'history') {
      fetchTransactionHistory();
    }
  }, [activeModal]);

  useEffect(() => {
    setErrorMsg('');
    setSuccessMsg('');
  }, [currentView]);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (email, password) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        localStorage.setItem('token', resData.data.token);
        setToken(resData.data.token);
        setUser(resData.data);
        setSuccessMsg('Successfully logged in!');
        setTimeout(() => {
          setCurrentView('dashboard');
          setErrorMsg('');
          setSuccessMsg('');
        }, 1000);
      } else {
        setErrorMsg(resData.message || 'Authentication failed. Please check inputs.');
      }
    } catch (_err) {
      setErrorMsg('Server connection failed. Make sure port 5005 is active.');
    }
  };

  const handleRegister = async (registrationData) => {
    setErrorMsg('');
    setSuccessMsg('');
    try {
      const response = await fetch(`${API_BASE_URL}/auth/register`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(registrationData),
      });
      const resData = await response.json();
      if (response.ok && resData.success) {
        localStorage.setItem('token', resData.data.token);
        setToken(resData.data.token);
        setUser(resData.data);
        setSuccessMsg('Successfully registered!');
        setTimeout(() => {
          setCurrentView('dashboard');
          setErrorMsg('');
          setSuccessMsg('');
        }, 1000);
      } else {
        setErrorMsg(resData.message || 'Registration failed. Please check inputs.');
      }
    } catch (_err) {
      setErrorMsg('Server connection failed. Make sure port 5005 is active.');
    }
  };

  const handleTxSubmit = async (e, type) => {
    e.preventDefault();
    setErrorMsg('');
    setSuccessMsg('');

    if (!formData.amount || parseFloat(formData.amount) <= 0) {
      setErrorMsg('Please enter a valid amount greater than zero.');
      return;
    }
    if (!formData.address) {
      setErrorMsg('Wallet address is required.');
      return;
    }

    const endpoint = type === 'deposit' ? '/transactions/deposit' : '/transactions/withdraw';

    try {
      const response = await fetch(`${API_BASE_URL}${endpoint}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset: formData.asset,
          amount: formData.amount,
          address: formData.address,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg(resData.message);
        
        // Refresh profile to update balances and points in the header/hero
        if (resData.data.updatedBalances) {
          setUser(prev => ({
            ...prev,
            balances: resData.data.updatedBalances,
            trustPoints: resData.data.trustPoints !== undefined ? resData.data.trustPoints : prev.trustPoints
          }));
        }

        setTimeout(() => {
          setActiveModal(null);
          setFormData(prev => ({
            ...prev,
            amount: '',
            address: '',
          }));
          setSuccessMsg('');
        }, 1500);
      } else {
        setErrorMsg(resData.message || 'Transaction processing failed.');
      }
    } catch (_err) {
      setErrorMsg('Network error. Transaction failed.');
    }
  };

  const handleDepositSubmit = async (depositData) => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!depositData.amount || depositData.amount <= 0) {
      setErrorMsg('Please enter a valid amount greater than zero.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/transactions/deposit`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset: depositData.asset,
          amount: depositData.amount,
          address: depositData.address,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg(resData.message);
        
        // Refresh profile to update balances and points
        if (resData.data.updatedBalances) {
          setUser(prev => ({
            ...prev,
            balances: resData.data.updatedBalances,
            trustPoints: resData.data.trustPoints !== undefined ? resData.data.trustPoints : prev.trustPoints
          }));
        }

        setTimeout(() => {
          setSuccessMsg('');
          setErrorMsg('');
        }, 3000);
      } else {
        setErrorMsg(resData.message || 'Deposit processing failed.');
      }
    } catch (_err) {
      setErrorMsg('Network error. Deposit failed.');
    }
  };

  const handleWithdrawSubmit = async (withdrawData) => {
    setErrorMsg('');
    setSuccessMsg('');

    if (!withdrawData.amount || withdrawData.amount <= 0) {
      setErrorMsg('Please enter a valid amount greater than zero.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/transactions/withdraw`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          asset: withdrawData.asset,
          amount: withdrawData.amount,
          address: withdrawData.address,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg(resData.message);
        
        // Refresh profile to update balances
        if (resData.data.updatedBalances) {
          setUser(prev => ({
            ...prev,
            balances: resData.data.updatedBalances,
            trustPoints: resData.data.trustPoints !== undefined ? resData.data.trustPoints : prev.trustPoints
          }));
        }

        setTimeout(() => {
          setSuccessMsg('');
          setErrorMsg('');
        }, 3000);
      } else {
        setErrorMsg(resData.message || 'Withdrawal processing failed.');
      }
    } catch (_err) {
      setErrorMsg('Network error. Withdrawal failed.');
    }
  };

  const handlePointsRedeem = async (redeemData) => {
    setErrorMsg('');
    setSuccessMsg('');

    try {
      const response = await fetch(`${API_BASE_URL}/transactions/redeem-points`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          points: redeemData.points,
          method: redeemData.method,
        }),
      });

      const resData = await response.json();

      if (response.ok && resData.success) {
        setSuccessMsg(resData.message);
        
        // Refresh profile to update balances and trust points
        if (resData.data.updatedBalances) {
          setUser(prev => ({
            ...prev,
            balances: resData.data.updatedBalances,
            trustPoints: resData.data.trustPoints !== undefined ? resData.data.trustPoints : prev.trustPoints
          }));
        }

        setTimeout(() => {
          setSuccessMsg('');
          setErrorMsg('');
        }, 3000);
      } else {
        setErrorMsg(resData.message || 'Redemption processing failed.');
      }
    } catch (_err) {
      setErrorMsg('Network error. Redemption failed.');
    }
  };

  const openModal = (modalName) => {
    setErrorMsg('');
    setSuccessMsg('');
    if (modalName === 'login' || modalName === 'register') {
      setCurrentView(modalName);
    } else {
      setActiveModal(modalName);
    }
  };

  if (currentView === 'login') {
    return (
      <SignIn
        onLogin={handleLogin}
        onGoHome={() => setCurrentView('dashboard')}
        onNavigateToRegister={() => setCurrentView('register')}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    );
  }

  if (currentView === 'register') {
    return (
      <SignUp
        onRegister={handleRegister}
        onGoHome={() => setCurrentView('dashboard')}
        onNavigateToLogin={() => setCurrentView('login')}
        errorMsg={errorMsg}
        successMsg={successMsg}
      />
    );
  }

  return (
    <div className="min-h-screen bg-[#0b0c10] flex flex-col justify-start text-white relative">
      <DashboardHeader user={user} onLogout={handleLogout} onOpenModal={openModal} onNavigate={setCurrentView} />
      <main className="flex-grow">
        {currentView === 'dashboard' && (
          <DashboardHero user={user} onOpenModal={openModal} onNavigate={setCurrentView} />
        )}
        {currentView === 'help' && (
          <SupportHelp onGoHome={() => setCurrentView('dashboard')} />
        )}
        {currentView === 'deposit' && (
          <DepositPage 
            user={user} 
            onDepositSubmit={handleDepositSubmit} 
            errorMsg={errorMsg} 
            successMsg={successMsg} 
          />
        )}
        {currentView === 'withdraw' && (
          <WithdrawPage 
            user={user} 
            onWithdrawSubmit={handleWithdrawSubmit} 
            errorMsg={errorMsg} 
            successMsg={successMsg} 
          />
        )}
        {currentView === 'transactions' && (
          <TransactionsPage token={token} />
        )}
        {currentView === 'loyalty' && (
          <LoyaltyPage 
            user={user} 
            onPointsRedeem={handlePointsRedeem} 
            errorMsg={errorMsg} 
            successMsg={successMsg} 
          />
        )}
      </main>

      {/* ================= MODALS CONTAINER ================= */}
      {activeModal && (
        <div className="fixed inset-0 z-50 bg-[#07080c]/85 backdrop-blur-md flex items-center justify-center p-4 overflow-y-auto">
          
          {/* 3. DEPOSIT MODAL */}
          {activeModal === 'deposit' && (
            <div className="bg-[#0f111a] border border-slate-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-white mb-1.5">Deposit Crypto</h3>
              <p className="text-xs text-slate-400 mb-6">Instantly top-up your client wallet balance.</p>

              {errorMsg && <div className="mb-4 p-3 bg-red-950/35 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg">{errorMsg}</div>}
              {successMsg && <div className="mb-4 p-3 bg-emerald-950/35 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg">{successMsg}</div>}

              <form onSubmit={(e) => handleTxSubmit(e, 'deposit')} className="space-y-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-300">Select Crypto Asset *</label>
                  <select
                    name="asset"
                    value={formData.asset}
                    onChange={handleInputChange}
                    className="w-full bg-[#050608] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors cursor-pointer"
                  >
                    <option value="USDT">Tether (USDT)</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-300">Amount to Deposit *</label>
                  <input
                    type="number"
                    step="any"
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="e.g. 500"
                    className="w-full bg-[#050608] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-300">Sender Wallet Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="e.g. 0x71C765... or 1A1zP1e..."
                    className="w-full bg-[#050608] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                  />
                  <span className="text-[10px] text-slate-500 leading-normal">
                    Provide the wallet address from which you are sending funds for verification.
                  </span>
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-emerald-900/10 focus:outline-none"
                >
                  Verify and Deposit
                </button>
              </form>
            </div>
          )}

          {/* 4. WITHDRAWAL MODAL */}
          {activeModal === 'withdraw' && (
            <div className="bg-[#0f111a] border border-slate-800 rounded-2xl w-full max-w-md p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200">
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-white mb-1.5">Withdraw Crypto</h3>
              <p className="text-xs text-slate-400 mb-6">Request withdrawal to your external wallet address.</p>

              {errorMsg && <div className="mb-4 p-3 bg-red-950/35 border border-red-500/20 text-red-400 text-xs font-semibold rounded-lg">{errorMsg}</div>}
              {successMsg && <div className="mb-4 p-3 bg-emerald-950/35 border border-emerald-500/20 text-emerald-400 text-xs font-semibold rounded-lg">{successMsg}</div>}

              <form onSubmit={(e) => handleTxSubmit(e, 'withdraw')} className="space-y-4">
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-300">Select Crypto Asset *</label>
                  <select
                    name="asset"
                    value={formData.asset}
                    onChange={handleInputChange}
                    className="w-full bg-[#050608] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors cursor-pointer"
                  >
                    <option value="USDT">Tether (USDT)</option>
                    <option value="BTC">Bitcoin (BTC)</option>
                  </select>
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <div className="flex justify-between items-center">
                    <label className="text-xs font-bold text-slate-300">Amount to Withdraw *</label>
                    {user && (
                      <span className="text-[10px] text-slate-400">
                        Max:{' '}
                        <button 
                          type="button"
                          onClick={() => setFormData({ ...formData, amount: formData.asset === 'USDT' ? user.balances.USDT.toString() : user.balances.BTC.toString() })}
                          className="text-emerald-400 hover:underline font-bold cursor-pointer"
                        >
                          {formData.asset === 'USDT' ? `${user.balances.USDT.toFixed(2)} USDT` : `${user.balances.BTC.toFixed(4)} BTC`}
                        </button>
                      </span>
                    )}
                  </div>
                  <input
                    type="number"
                    step="any"
                    name="amount"
                    required
                    value={formData.amount}
                    onChange={handleInputChange}
                    placeholder="e.g. 200"
                    className="w-full bg-[#050608] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                  />
                </div>
                <div className="flex flex-col gap-1.5 text-left">
                  <label className="text-xs font-bold text-slate-300">Target Wallet Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter recipient's external address"
                    className="w-full bg-[#050608] border border-slate-800 focus:border-emerald-500 rounded-xl px-4 py-3 text-sm font-mono text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/10 transition-colors"
                  />
                </div>
                <button 
                  type="submit"
                  className="w-full py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl transition-all duration-200 cursor-pointer shadow-md shadow-rose-900/10 focus:outline-none"
                >
                  Submit Withdrawal
                </button>
              </form>
            </div>
          )}

          {/* 5. HISTORY MODAL */}
          {activeModal === 'history' && (
            <div className="bg-[#0f111a] border border-slate-800 rounded-2xl w-full max-w-2xl p-6 sm:p-8 shadow-2xl relative animate-in zoom-in-95 duration-200 max-h-[85vh] flex flex-col">
              <button 
                onClick={() => setActiveModal(null)}
                className="absolute top-4 right-4 text-slate-400 hover:text-white cursor-pointer"
              >
                ✕
              </button>
              <h3 className="text-2xl font-bold text-white mb-1">Transaction History</h3>
              <p className="text-xs text-slate-400 mb-6">View your recent ledger events on MongoDB.</p>

              <div className="flex-grow overflow-y-auto mt-2 border border-slate-800/80 rounded-xl bg-[#050608] max-h-[400px]">
                {txHistory.length > 0 ? (
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-slate-800/80 bg-slate-900/30 text-[10px] uppercase font-bold tracking-wider text-slate-400">
                        <th className="p-3">Type</th>
                        <th className="p-3">Asset</th>
                        <th className="p-3">Amount</th>
                        <th className="p-3">Wallet Address</th>
                        <th className="p-3">Status</th>
                        <th className="p-3">Date</th>
                      </tr>
                    </thead>
                    <tbody className="text-xs font-medium text-slate-300 divider-y divider-slate-800/50">
                      {txHistory.map((tx) => (
                        <tr key={tx._id} className="border-b border-slate-800/40 hover:bg-slate-900/10 transition-colors">
                          <td className="p-3 capitalize">
                            <span className={`px-2 py-0.5 rounded-md text-[10px] font-bold ${
                              tx.type === 'deposit' ? 'bg-emerald-500/10 text-emerald-400' : 'bg-rose-500/10 text-rose-400'
                            }`}>
                              {tx.type}
                            </span>
                          </td>
                          <td className="p-3 font-bold">{tx.asset}</td>
                          <td className="p-3">{tx.amount.toLocaleString(undefined, { minimumFractionDigits: 2 })}</td>
                          <td className="p-3 font-mono text-slate-400 max-w-[120px] truncate" title={tx.address}>
                            {tx.address}
                          </td>
                          <td className="p-3 capitalize">
                            <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                              tx.status === 'completed' 
                                ? 'bg-emerald-950/20 border border-emerald-500/20 text-emerald-400' 
                                : tx.status === 'pending'
                                ? 'bg-amber-950/20 border border-amber-500/20 text-amber-400'
                                : 'bg-red-950/20 border border-red-500/20 text-red-400'
                            }`}>
                              {tx.status}
                            </span>
                          </td>
                          <td className="p-3 text-[10px] text-slate-500 font-mono">
                            {new Date(tx.createdAt).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="p-8 text-center text-xs text-slate-500 font-medium">
                    No transactions recorded on MongoDB yet.
                  </div>
                )}
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
}

export default App;
