// Custom inline SVG icons to prevent dependency bloat and ensure fast rendering

const DepositIcon = () => (
  <svg
    className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:translate-y-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cash Bill */}
    <rect x="3" y="4" width="18" height="10" rx="1.5" />
    <circle cx="12" cy="9" r="1.5" />
    {/* Inbox / Deposit Tray */}
    <path d="M22 14v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-4" />
    <path d="M2 14h6l2 2.5h4l2-2.5h6" />
    {/* Small arrow pointing down */}
    <path d="M12 9v4m-2.5-2.5L12 13l2.5-2.5" strokeWidth="1.5" />
  </svg>
);

const WithdrawIcon = () => (
  <svg
    className="w-5 h-5 mr-2.5 transition-transform duration-300 group-hover:-translate-y-0.5"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    {/* Cash Bill */}
    <rect x="3" y="10" width="18" height="10" rx="1.5" />
    <circle cx="12" cy="15" r="1.5" />
    {/* Outbox / Withdrawal Tray */}
    <path d="M22 12V8a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v4" />
    <path d="M2 12h6l2-2.5h4l2 2.5h6" />
    {/* Small arrow pointing up */}
    <path d="M12 15v-4m-2.5 2.5L12 11l2.5 2.5" strokeWidth="1.5" />
  </svg>
);

export default function DashboardHero({ user, onOpenModal, onNavigate }) {
  return (
    <>
      <section className="relative w-full min-h-[calc(100vh-80px)] flex items-center justify-center overflow-hidden bg-gradient-to-b from-[#0b0c10] via-[#0d0e15] to-[#08090d] py-16 lg:py-24 px-4 sm:px-6 lg:px-8">
        
        {/* Decorative luxury gradient blobs for depth */}
        <div className="absolute top-[20%] left-[10%] w-[350px] h-[350px] rounded-full bg-red-600/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[20%] right-[10%] w-[450px] h-[450px] rounded-full bg-emerald-500/5 blur-[150px] pointer-events-none" />
        <div className="absolute top-[30%] right-[30%] w-[300px] h-[300px] rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />
        
        {/* Subtle grid pattern overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1f293708_1px,transparent_1px),linear-gradient(to_bottom,#1f293708_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

        <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center relative z-10">
          
          {/* Left Side: Text and CTA Action buttons */}
          <div className="col-span-12 lg:col-span-6 flex flex-col items-center lg:items-start text-center lg:text-left space-y-6 sm:space-y-8">
            
            {/* Welcome Tag */}
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/60 border border-slate-800/80 backdrop-blur-md">
              <span className="w-2 h-2 rounded-full bg-red-500 animate-ping" />
              <span className="text-xs font-semibold tracking-wider text-slate-300 uppercase">
                {user ? `Active Terminal ID: ${user.accountId}` : 'Secure Web3 Client Terminal'}
              </span>
            </div>

            <div className="space-y-3 sm:space-y-4 max-w-xl">
              {user ? (
                /* Authenticated View */
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight select-none">
                    Welcome Back!
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-slate-400 font-medium leading-relaxed">
                    Deposit and withdraw cryptocurrencies with ease.
                  </p>

                  {/* Balance cards grid (shown only when logged in) */}
                  <div className="grid grid-cols-2 gap-4 pt-4 mt-2">
                    <div className="bg-slate-900/55 border border-slate-800/80 rounded-xl p-4 flex flex-col text-left">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Tether Balance</span>
                      <span className="text-xl sm:text-2xl font-black text-emerald-400 mt-1">
                        {user.balances.USDT.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} <span className="text-xs font-normal text-slate-400">USDT</span>
                      </span>
                    </div>
                    <div className="bg-slate-900/55 border border-slate-800/80 rounded-xl p-4 flex flex-col text-left">
                      <span className="text-[10px] uppercase tracking-wider text-slate-500 font-bold">Bitcoin Balance</span>
                      <span className="text-xl sm:text-2xl font-black text-amber-500 mt-1">
                        {user.balances.BTC.toFixed(4)} <span className="text-xs font-normal text-slate-400">BTC</span>
                      </span>
                    </div>
                  </div>
                </>
              ) : (
                /* Unauthenticated Landing View */
                <>
                  <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-white tracking-tight leading-tight select-none">
                    Exchange Your Digital Currencies Seamlessly And Securely
                  </h1>
                  <p className="text-base sm:text-lg lg:text-xl text-slate-400 font-medium leading-relaxed">
                    Explore a diverse range of digital assets with our secured exchange. Seamlessly convert your crypto holdings with ease.
                  </p>
                </>
              )}
            </div>

            {/* Action Buttons Row */}
            <div className="flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto w-full">
              {user ? (
                /* Authenticated actions */
                <>
                  <button
                    onClick={() => onNavigate('deposit')}
                    className="group flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(16,185,129,0.25)] hover:shadow-[0_8px_30px_rgba(16,185,129,0.4)] active:scale-98 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <DepositIcon />
                    Deposit
                  </button>
                  <button
                    onClick={() => onNavigate('withdraw')}
                    className="group flex items-center justify-center w-full sm:w-auto px-7 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-bold rounded-xl shadow-[0_4px_20px_rgba(239,68,68,0.25)] hover:shadow-[0_8px_30px_rgba(239,68,68,0.4)] active:scale-98 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer"
                  >
                    <WithdrawIcon />
                    Withdraw
                  </button>
                </>
              ) : (
                /* Unauthenticated landing action */
                <button
                  onClick={() => onOpenModal('register')}
                  className="group flex items-center justify-center w-full sm:w-auto px-8 py-4 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_4px_25px_rgba(16,185,129,0.3)] hover:shadow-[0_8px_35px_rgba(16,185,129,0.45)] active:scale-98 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200 cursor-pointer text-base focus:outline-none"
                >
                  Get Started
                  <svg
                    className="w-5 h-5 ml-2.5 transition-transform duration-300 group-hover:translate-x-1"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3" />
                  </svg>
                </button>
              )}
            </div>

            {/* Quick trust/security indicators */}
            <div className="pt-4 border-t border-slate-900 w-full flex flex-wrap justify-center lg:justify-start gap-x-8 gap-y-2.5 text-xs text-slate-500">
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Fully Encrypted
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                Instant Settlement
              </span>
              <span className="flex items-center gap-1.5">
                <svg className="w-4 h-4 text-emerald-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                Zero Gas Fees
              </span>
            </div>

          </div>

          {/* Right Side: Floating 3D Cryptocurrency Coins */}
          <div className="col-span-12 lg:col-span-6 flex items-center justify-center relative min-h-[360px] sm:min-h-[440px] select-none">
            
            {/* Inner decorative light rings */}
            <div className="absolute w-[280px] sm:w-[380px] h-[280px] sm:h-[380px] border border-slate-800/30 rounded-full pointer-events-none" />
            <div className="absolute w-[360px] sm:w-[480px] h-[360px] sm:h-[480px] border border-slate-800/10 rounded-full border-dashed pointer-events-none" />

            {/* Prominent green Tether (USDT) token coin (left, floating) */}
            <div className="absolute left-[8%] sm:left-[12%] md:left-[15%] lg:left-[5%] top-[20%] w-[160px] sm:w-[220px] animate-float-slow hover:scale-105 hover:rotate-3 transition-transform duration-500 cursor-pointer">
              <img
                src="/usdt.png"
                alt="Tether USDT 3D Asset"
                className="w-full h-auto drop-shadow-[0_20px_45px_rgba(16,185,129,0.35)]"
                draggable="false"
              />
            </div>

            {/* Prominent gold Bitcoin (BTC) token coin (right, floating higher) */}
            <div className="absolute right-[8%] sm:right-[12%] md:right-[15%] lg:right-[5%] top-[10%] w-[160px] sm:w-[220px] animate-float-medium hover:scale-105 hover:-rotate-3 transition-transform duration-500 cursor-pointer">
              <img
                src="/btc.png"
                alt="Bitcoin BTC 3D Asset"
                className="w-full h-auto drop-shadow-[0_20px_45px_rgba(245,158,11,0.35)]"
                draggable="false"
              />
            </div>

          </div>

        </div>
      </section>

      {/* Latest News Section */}
      <section className="w-full bg-[#f8fafc] text-slate-800 py-16 px-4 sm:px-6 lg:px-8 border-t border-slate-200">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-left mb-10">
            <h2 className="text-2xl font-black text-slate-900 tracking-tight flex items-center gap-1.5">
              Latest <span className="text-emerald-600">News</span>
            </h2>
            <p className="text-xs font-semibold text-slate-400 mt-1 uppercase tracking-wider">
              Stay informed with our latest news updates
            </p>
          </div>

          {/* Cards Stack */}
          <div className="space-y-8">
            
            {/* Card 1: Happy Independence Day */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col text-left">
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div className="w-9 h-9 rounded-full bg-[#1e1e2d] flex items-center justify-center text-white font-bold text-sm">
                    H
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Happy Independence Day Sri Lanka
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  2026-02-04
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed font-medium mb-5">
                Today, we proudly celebrate 78 years of independence, honoring the courage, resilience, and unity that shaped Sri Lanka's journey as a sovereign nation. From heritage to progress, our nation continues to rise with hope and determination. Let this day remind us to work together for peace, prosperity, and a stronger future for generations to come with pride, responsibility, and national purpose.
              </p>

              {/* Image banner */}
              <div className="w-full overflow-hidden rounded-xl border border-slate-100">
                <img 
                  src="/news_independence.png" 
                  alt="Happy Independence Day Sri Lanka Banner" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

            {/* Card 2: Final Approach Begins */}
            <div className="bg-white border border-slate-200/80 rounded-2xl p-6 sm:p-8 shadow-sm flex flex-col text-left">
              {/* Header inside card */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                  {/* Avatar circle */}
                  <div className="w-9 h-9 rounded-full bg-[#1e1e2d] flex items-center justify-center text-white font-bold text-sm">
                    F
                  </div>
                  <h3 className="text-sm font-bold text-slate-800">
                    Final Approach Begins
                  </h3>
                </div>
                <span className="text-[10px] font-mono text-slate-400">
                  2026-01-13
                </span>
              </div>

              {/* Description */}
              <p className="text-xs text-slate-500 leading-relaxed font-medium mb-5">
                The journey to our most anticipated gathering has officially begun. Symposium 2026 is set for an evening of insight, partnerships, and future-focused conversations. This exclusive event will unite our valued partners, leaders, and innovators under one vision. Save the date and prepare for an unforgettable experience.
              </p>

              {/* Image banner */}
              <div className="w-full overflow-hidden rounded-xl border border-slate-100">
                <img 
                  src="/news_symposium.png" 
                  alt="Symposium 2026 Announcement Banner" 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
