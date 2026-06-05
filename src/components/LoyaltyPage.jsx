import { useState } from 'react';

// Custom inline SVG for gold star trophy icon
const TrophyIcon = () => (
  <svg className="w-14 h-14 text-amber-500 animate-bounce" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
  </svg>
);

// Custom inline SVG representing people celebrating around a trophy cup
const CelebratingIllustration = () => (
  <svg className="w-full max-w-[280px] h-auto" viewBox="0 0 200 150" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* Trophy Cup */}
    <rect x="85" y="85" width="30" height="6" fill="#F59E0B" rx="2" />
    <path d="M90 85L93 55H107L110 85H90Z" fill="#F59E0B" />
    <path d="M75 20h50v35a25 25 0 0 1-50 0V20z" fill="#FBBF24" />
    <circle cx="100" cy="45" r="10" fill="#F59E0B" />
    <path d="M70 25c-5 0-8 3-8 8s3 8 8 8v-2c-3 0-6-2-6-6s3-6 6-6V25z" fill="#FBBF24" />
    <path d="M130 25c5 0 8 3 8 8s-3 8-8 8v-2c3 0 6-2 6-6s-3-6-6-6V25z" fill="#FBBF24" />
    
    {/* Confetti */}
    <circle cx="50" cy="30" r="2" fill="#EF4444" />
    <circle cx="150" cy="40" r="2" fill="#10B981" />
    <circle cx="120" cy="15" r="1.5" fill="#3B82F6" />
    <circle cx="80" cy="10" r="2.5" fill="#FBBF24" />
    <circle cx="160" cy="90" r="2" fill="#EF4444" />

    {/* Little vector people */}
    <circle cx="55" cy="80" r="6" fill="#3B82F6" />
    <path d="M45 105c0-10 5-15 10-15s10 5 10 15H45z" fill="#3B82F6" />
    <path d="M52 86l-10-8M58 86l10-8" stroke="#3B82F6" strokeWidth="2.5" strokeLinecap="round" />

    <circle cx="145" cy="85" r="6" fill="#10B981" />
    <path d="M135 110c0-10 5-15 10-15s10 5 10 15h-20z" fill="#10B981" />
    <path d="M142 91l-8-10M148 91l8-10" stroke="#10B981" strokeWidth="2.5" strokeLinecap="round" />
  </svg>
);

export default function LoyaltyPage({ user, onPointsRedeem, errorMsg, successMsg }) {
  const [points, setPoints] = useState('');
  const [paymentOption, setPaymentOption] = useState('');
  const [validationError, setValidationError] = useState('');

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    setValidationError('');

    const parsedPoints = parseInt(points);

    if (isNaN(parsedPoints) || parsedPoints <= 0) {
      setValidationError('Please enter a valid number of points.');
      return;
    }

    if (user && user.trustPoints < parsedPoints) {
      setValidationError('Insufficient trust points balance.');
      return;
    }

    if (!paymentOption) {
      setValidationError('Please select a payment option.');
      return;
    }

    // Call callback to redeem points (e.g. 10,000 points -> 10 USD)
    onPointsRedeem({
      points: parsedPoints,
      method: paymentOption,
    });

    setPoints('');
  };

  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-[#1a1c29] mb-8 text-left tracking-tight">
          Loyalty Points
        </h2>

        {/* Top summary row: Balance & Progress Gauge */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-8 text-left">
          
          {/* Left: Trust Point Balance */}
          <div className="md:col-span-8 bg-white border border-slate-200/80 rounded-2xl p-6 flex items-center justify-between shadow-sm relative overflow-hidden">
            <div className="flex items-center gap-4">
              <TrophyIcon />
              <div>
                <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Trust Point Balance</span>
                <h3 className="text-3xl font-black text-[#1a1c29] mt-0.5">
                  {user ? user.trustPoints : 0}
                </h3>
              </div>
            </div>
            
            {/* Exchange rate label */}
            <div className="px-5 py-2.5 bg-[#004d4d] text-white font-bold text-xs rounded-xl shadow-sm select-none">
              💰 10,000 Trust Points = 10 USD
            </div>
          </div>

          {/* Right: Circular Progress Gauge */}
          <div className="md:col-span-4 bg-white border border-slate-200/80 rounded-2xl p-6 flex flex-col items-center justify-center text-center shadow-sm">
            {/* SVG Circular progress */}
            <div className="relative w-20 h-20 flex items-center justify-center mb-1">
              <svg className="w-full h-full transform -rotate-90">
                {/* Background Ring */}
                <circle cx="40" cy="40" r="32" stroke="#e2e8f0" strokeWidth="6" fill="transparent" />
                {/* Active Segment (1% progress) */}
                <circle cx="40" cy="40" r="32" stroke="#5d9e9c" strokeWidth="6" fill="transparent" 
                        strokeDasharray="201" strokeDashoffset="199" strokeLinecap="round" />
              </svg>
              {/* Inner Label */}
              <span className="absolute text-sm font-bold text-slate-800">1%</span>
            </div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Normal Level</span>
          </div>

        </div>

        {/* Middle Affiliate status box */}
        <div className="bg-slate-100 border border-slate-200/60 rounded-xl p-4 mb-8 text-left">
          <h4 className="text-xs font-bold text-slate-700 mb-1">Standard user with affiliate</h4>
          <ul className="list-disc list-inside text-[11px] text-slate-500 font-medium">
            <li>Recognized with affiliate users</li>
          </ul>
        </div>

        {/* Bottom tab forms card */}
        <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col text-left">
          
          {/* Tab buttons */}
          <div className="flex border-b border-slate-100 pb-3 mb-6">
            <button className="pb-2 text-sm font-bold text-indigo-600 border-b-2 border-indigo-600 focus:outline-none cursor-pointer">
              Withdraw
            </button>
            <button className="pb-2 text-sm font-bold text-slate-400 hover:text-slate-600 ml-8 focus:outline-none cursor-pointer">
              Transaction History
            </button>
          </div>

          {/* Form Content */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left form block */}
            <form onSubmit={handleWithdrawSubmit} className="col-span-12 lg:col-span-7 space-y-5">
              
              <h5 className="text-xs font-bold text-slate-500 uppercase tracking-wide">Enter number of points to withdraw</h5>
              
              {/* Points Input */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">Points</label>
                <input
                  type="number"
                  value={points}
                  onChange={(e) => setPoints(e.target.value)}
                  placeholder="Enter number of points"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-slate-800 placeholder-slate-400 focus:outline-none transition-all"
                />
              </div>

              {/* Select Option */}
              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-bold text-slate-700">
                  Select account details{' '}
                  <span className="text-[10px] text-slate-400 font-medium font-sans italic">
                    (Please click on the account you want points to be withdrawn to)
                  </span>
                </label>
                <select
                  value={paymentOption}
                  onChange={(e) => setPaymentOption(e.target.value)}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-indigo-500 rounded-lg px-4 py-2.5 text-sm text-slate-600 focus:outline-none transition-all cursor-pointer"
                >
                  <option value="">Select Payment Option</option>
                  <option value="USDT">USDT Balance (Credited to Wallet)</option>
                  <option value="XM">XM Gateway Account</option>
                  <option value="Neteller">Neteller Account</option>
                </select>
              </div>

              {/* Alert validations */}
              {validationError && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg">
                  {validationError}
                </div>
              )}
              {errorMsg && (
                <div className="p-2.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg">
                  {errorMsg}
                </div>
              )}
              {successMsg && (
                <div className="p-2.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold rounded-lg">
                  {successMsg}
                </div>
              )}

              {/* Submit btn */}
              <div className="flex justify-end pt-2">
                <button
                  type="submit"
                  className="px-6 py-2.5 bg-[#0fa958] hover:bg-emerald-600 text-white font-bold text-xs rounded-lg shadow-sm transition-all cursor-pointer focus:outline-none"
                >
                  Withdraw
                </button>
              </div>

            </form>

            {/* Right illustration block */}
            <div className="hidden lg:col-span-5 lg:flex items-center justify-center p-4">
              <CelebratingIllustration />
            </div>

          </div>

        </div>

      </div>
    </div>
  );
}
