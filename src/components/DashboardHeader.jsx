import { useState, useEffect, useRef } from 'react';

export default function DashboardHeader({ user, onLogout, onOpenModal, onNavigate }) {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on click outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsProfileOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Set navigation links based on auth state
  const navLinks = user
    ? [
        { label: 'Home', action: () => onNavigate('dashboard') },
        { label: 'Deposit', action: () => onNavigate('deposit') },
        { label: 'Withdrawal', action: () => onNavigate('withdraw') },
        { label: 'Transactions', action: () => onNavigate('transactions') },
        { label: 'Loyalty', action: () => onNavigate('loyalty') },
        { label: 'Help', action: () => onNavigate('help') }
      ]
    : [
        { label: 'Home', action: () => onNavigate('dashboard') },
        { label: 'Help', action: () => onNavigate('help') }
      ];

  return (
    <header className="relative w-full z-50 bg-[#0b0c10]/95 border-b border-slate-800/80 backdrop-blur-md transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          
          {/* Left: Brand Logo */}
          <div 
            onClick={() => onNavigate('dashboard')}
            className="flex-shrink-0 flex items-center cursor-pointer group"
          >
            {/* Abstract red/white accent geometric icon */}
            <svg
              className="w-7 h-7 mr-2.5 transition-transform duration-500 group-hover:rotate-180"
              viewBox="0 0 32 32"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M16 2L6 12H16V22L26 12H16V2Z"
                fill="#EF4444"
                className="transition-colors duration-300 group-hover:fill-red-500"
              />
              <path
                d="M16 30L26 20H16V10L6 20H16V30Z"
                fill="#FFFFFF"
                className="transition-colors duration-300 group-hover:fill-slate-200"
              />
            </svg>
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-slate-100 transition-colors duration-300">
              iTrust<span className="text-red-500">LD</span>
            </span>
          </div>

          {/* Center: Navigation Links (Desktop) */}
          <nav className="hidden md:flex space-x-6 lg:space-x-8">
            {navLinks.map((link) => (
              <button
                key={link.label}
                onClick={link.action}
                className="text-sm font-medium text-slate-300 hover:text-white transition-all duration-200 opacity-85 hover:opacity-100 relative group py-2 cursor-pointer bg-transparent border-none focus:outline-none"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-red-500 transition-all duration-300 group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          {/* Right: Profile Dropdown or Auth Buttons */}
          <div className="flex items-center space-x-4">
            {user ? (
              /* Authenticated: Profile Dropdown Pill */
              <div className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className={`flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-slate-800/40 hover:bg-slate-800/70 border border-slate-700/50 hover:border-slate-600/60 transition-all duration-200 cursor-pointer focus:outline-none focus:ring-2 focus:ring-red-500/50 ${
                    isProfileOpen ? 'bg-slate-800/80 border-slate-600' : ''
                  }`}
                >
                  {/* Gray profile avatar icon */}
                  <div className="w-6 h-6 rounded-full bg-slate-600 flex items-center justify-center text-slate-200 overflow-hidden">
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                      />
                    </svg>
                  </div>
                  
                  {/* Display Name */}
                  <span className="text-sm font-semibold text-slate-100 hidden sm:inline select-none">
                    {user.firstName}
                  </span>
                  
                  {/* Chevron */}
                  <svg
                    className={`w-3.5 h-3.5 text-slate-400 transition-transform duration-300 ${
                      isProfileOpen ? 'rotate-180 text-white' : ''
                    }`}
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2.5"
                      d="M19 9l-7 7-7-7"
                    />
                  </svg>
                </button>

                {/* Profile Dropdown Box */}
                {isProfileOpen && (
                  <div className="absolute right-0 mt-3.5 w-76 bg-slate-900/98 border border-slate-800 rounded-2xl shadow-2xl p-5 z-50 origin-top-right transition-all duration-300 animate-in fade-in slide-in-from-top-2">
                    
                    {/* User Profile Detail Header */}
                    <div className="flex items-start gap-3 pb-4 border-b border-slate-800/60">
                      <div className="w-11 h-11 rounded-full bg-slate-800 border border-slate-700/50 flex items-center justify-center text-slate-200">
                        <svg
                          className="w-6 h-6 text-slate-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                          />
                        </svg>
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-white leading-tight">
                          {user.firstName} {user.lastName}
                        </h4>
                        <p className="text-xs text-slate-400 leading-normal mt-0.5 break-all">
                          {user.email}
                        </p>
                        <p className="text-[10px] text-slate-500 font-mono mt-1">
                          ID: {user.accountId}
                        </p>
                      </div>
                    </div>

                    {/* Verification Alert Section */}
                    {user.verificationStatus !== 'verified' && (
                      <div className="mt-3 bg-red-950/20 border border-red-500/20 rounded-xl p-3 flex flex-col gap-1.5">
                        <div className="flex items-center gap-1.5 text-xs text-red-400 font-semibold">
                          <svg
                            className="w-3.5 h-3.5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2.5"
                              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
                            />
                          </svg>
                          Verification Status
                        </div>
                        <p className="text-[11px] text-slate-300">
                          Verification not completed.{' '}
                          <a
                            href="#"
                            className="text-red-400 hover:text-red-300 underline font-semibold transition-colors duration-150"
                          >
                            Verify now.
                          </a>
                        </p>
                      </div>
                    )}

                    {/* Trust Points Display Section */}
                    <div className="mt-3 bg-slate-800/30 border border-slate-700/30 rounded-xl px-4 py-3 flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <svg
                          className="w-4 h-4 text-amber-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.907c.961 0 1.371 1.24.588 1.81l-3.97 2.883a1 1 0 00-.364 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.971-2.883a1 1 0 00-1.18 0l-3.97 2.883c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h4.908a1 1 0 00.951-.69l1.519-4.674z"
                          />
                        </svg>
                        <span className="text-xs font-semibold text-slate-300">Trust Points</span>
                      </div>
                      <span className="text-sm font-bold text-red-500">{user.trustPoints}</span>
                    </div>

                    {/* Options List */}
                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex flex-col gap-1">
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          onNavigate('transactions');
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-slate-300 hover:text-white rounded-lg hover:bg-slate-800/40 transition-colors duration-150 cursor-pointer"
                      >
                        Transaction History
                      </button>
                      <button
                        onClick={() => {
                          setIsProfileOpen(false);
                          onLogout();
                        }}
                        className="w-full text-left px-2.5 py-1.5 text-xs text-red-400 hover:text-red-300 rounded-lg hover:bg-rose-500/10 transition-colors duration-150 mt-1 cursor-pointer"
                      >
                        Log Out
                      </button>
                    </div>

                  </div>
                )}
              </div>
            ) : (
              /* Unauthenticated: Login & Register Buttons */
              <div className="flex items-center gap-3">
                {/* Login Button */}
                <button
                  onClick={() => onOpenModal('login')}
                  className="flex items-center gap-2 px-4 py-1.8 text-sm font-medium border border-emerald-500 text-emerald-500 hover:bg-emerald-500/10 rounded-lg transition-all duration-200 cursor-pointer focus:outline-none"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 01-3-3h7a3 3 0 013 3v1"
                    />
                  </svg>
                  Login
                </button>
                {/* Register Button */}
                <button
                  onClick={() => onOpenModal('register')}
                  className="flex items-center gap-2 px-4 py-1.8 text-sm font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg transition-all duration-200 cursor-pointer focus:outline-none shadow-md shadow-emerald-900/20"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
                    />
                  </svg>
                  Register
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu Panel */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-[#0d0e15] border-b border-slate-800 py-3 px-4 flex flex-col gap-2 transition-all duration-300">
          {navLinks.map((link) => (
            <button
              key={link.label}
              onClick={() => {
                setIsMobileMenuOpen(false);
                link.action();
              }}
              className="w-full text-left px-3 py-2.5 rounded-lg text-base font-medium text-slate-300 hover:text-white hover:bg-slate-800/40 transition-all duration-150 cursor-pointer"
            >
              {link.label}
            </button>
          ))}
        </div>
      )}
    </header>
  );
}
