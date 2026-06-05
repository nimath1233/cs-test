import { useState } from 'react';

export default function SignIn({ onLogin, onGoHome, onNavigateToRegister, errorMsg, successMsg }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <div className="w-full min-h-screen bg-white flex text-slate-800 font-sans relative">
      
      {/* Absolute Back Button */}
      <button 
        onClick={onGoHome}
        className="absolute top-6 left-6 flex items-center gap-2 text-slate-400 hover:text-slate-600 cursor-pointer focus:outline-none z-50 text-sm font-semibold transition-colors"
      >
        <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
        </svg>
        Back to Home
      </button>

      {/* Left Column: Dark Vector Illustration */}
      <div className="hidden lg:flex lg:w-[45%] bg-[#1d1b2a] items-center justify-center p-12 relative overflow-hidden select-none">
        {/* Soft decorative background circles */}
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-slate-800/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-slate-800/10 rounded-full blur-[80px]" />

        <div className="w-full max-w-md flex flex-col items-center justify-center z-10">
          <img
            src="/signin_vector.png"
            alt="Sign In Illustration"
            className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] animate-pulse"
            style={{ animationDuration: '4s' }}
            draggable="false"
          />
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-[55%] flex items-center justify-center p-8 sm:p-16 lg:p-24 overflow-y-auto">
        <div className="w-full max-w-md flex flex-col">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-[#1d1b2a] tracking-tight mb-2">
              Sign In
            </h2>
            <p className="text-sm text-slate-500 font-medium leading-normal">
              Don't have an account?{' '}
              <button 
                onClick={onNavigateToRegister}
                className="text-[#0fa958] font-bold hover:underline bg-transparent border-none cursor-pointer focus:outline-none"
              >
                Sign up
              </button>
            </p>
          </div>

          {/* Alert messages */}
          {errorMsg && (
            <div className="mb-5 p-3.5 bg-red-50 border border-red-200 text-red-600 text-xs font-semibold rounded-lg shadow-sm">
              {errorMsg}
            </div>
          )}
          {successMsg && (
            <div className="mb-5 p-3.5 bg-emerald-50 border border-emerald-200 text-emerald-600 text-xs font-semibold rounded-lg shadow-sm">
              {successMsg}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email input */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-bold text-slate-700">
                Email <span className="text-red-500">*</span>
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter email"
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>

            {/* Password input */}
            <div className="flex flex-col gap-2 text-left">
              <label className="text-sm font-bold text-slate-700">
                Password <span className="text-red-500">*</span>
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-4 py-3 text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
              />
            </div>

            {/* Links Helper */}
            <div className="text-left text-xs font-bold text-slate-500 pt-1">
              Forgot your password?{' '}
              <a href="#" className="text-[#0fa958] hover:underline">
                Reset Now.
              </a>
            </div>

            {/* Submit right-aligned button */}
            <div className="flex justify-end pt-2">
              <button
                type="submit"
                className="px-8 py-3 bg-[#0fa958] hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                Sign in
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}
