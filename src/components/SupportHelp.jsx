

export default function SupportHelp({ onGoHome }) {
  return (
    <div className="w-full min-h-[calc(100vh-80px)] bg-slate-50 text-slate-800 py-10 px-4 sm:px-6 lg:px-8 relative">
      <div className="max-w-5xl mx-auto">
        
        {/* Page Title */}
        <h2 className="text-3xl font-extrabold text-[#1a1c29] mb-6 text-left tracking-tight">
          Support & Help
        </h2>

        {/* Main Support Card */}
        <div className="bg-white border border-slate-200 rounded-2xl shadow-sm p-6 sm:p-10 flex flex-col items-center text-center">
          
          <h3 className="text-2xl sm:text-3xl font-bold text-[#1a1c29] mb-3">
            Get in Touch
          </h3>
          <p className="text-sm text-slate-500 max-w-2xl leading-relaxed mb-8">
            We're here to help! Reach out to us through any of the channels below. Our support
            team is available 24/7 to assist you with any questions or concerns.
          </p>

          {/* Action Buttons Row */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto mb-6">
            
            {/* 24/7 Support */}
            <button className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 bg-[#0fa958] hover:bg-emerald-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-emerald-800/10 cursor-pointer focus:outline-none">
              <svg
                className="w-5 h-5 text-white"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                />
              </svg>
              24/7 Support
            </button>

            {/* Email Support */}
            <button className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300 font-bold rounded-xl transition-all duration-200 shadow-sm cursor-pointer focus:outline-none">
              <svg
                className="w-5 h-5 text-slate-500 group-hover:text-slate-700"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              Email Support
            </button>

            {/* Phone Support */}
            <button className="group flex items-center justify-center gap-2.5 w-full sm:w-auto px-6 py-3 bg-[#0fa958] hover:bg-emerald-600 text-white font-bold rounded-xl transition-all duration-200 shadow-md shadow-emerald-800/10 cursor-pointer focus:outline-none">
              <svg
                className="w-5 h-5 text-white animate-pulse"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 5a2 2 0 012-2h3.28a1 1 0 01.94.725l.548 2.2a1 1 0 01-.321.988l-1.305.98a10.582 10.582 0 004.872 4.872l.98-1.305a1 1 0 01.988-.321l2.2.548a1 1 0 01.725.94V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                />
              </svg>
              +94 117 751 751
            </button>

          </div>

          {/* Details Metadata Row */}
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-slate-500 mb-10 pb-6 border-b border-slate-100 w-full max-w-3xl">
            <span>
              Email:{' '}
              <a
                href="mailto:support@itrustld.com"
                className="font-bold text-[#1a1c29] hover:underline transition-colors"
              >
                support@itrustld.com
              </a>
            </span>
            <span>
              Phone:{' '}
              <span className="font-bold text-[#1a1c29]">+94 117 751 751</span>
            </span>
            <span>
              Response Time:{' '}
              <span className="font-bold text-[#0fa958]">Less than 2 hours</span>
            </span>
          </div>

          {/* Live Chat Banner */}
          <div className="bg-[#0fa958] text-white rounded-2xl p-6 sm:p-8 w-full max-w-3xl text-left flex flex-col gap-4 shadow-sm relative overflow-hidden">
            {/* Soft decorative background circles */}
            <div className="absolute -right-10 -bottom-10 w-40 h-40 bg-white/5 rounded-full" />
            <div className="absolute right-20 -top-10 w-28 h-28 bg-white/5 rounded-full" />

            <h4 className="text-xl font-bold">Live Chat Available</h4>
            
            <p className="text-sm text-emerald-50 leading-relaxed max-w-2xl">
              You have access to our live chat feature! For immediate support and real-time assistance,
              navigate to your account dashboard where you'll find the live chat widget. Our support
              agents are available 24/7 to help you with any questions or issues you may have.
            </p>

            <button
              onClick={onGoHome}
              className="inline-flex items-center text-sm font-bold text-white hover:text-slate-100 underline hover:no-underline transition-all duration-200 mt-2 bg-transparent border-none cursor-pointer focus:outline-none self-start"
            >
              Go to Dashboard
            </button>
          </div>

        </div>

      </div>

      {/* Floating Chat Widget (Bottom Right) */}
      <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3 animate-bounce shadow-lg">
        {/* Widget Pill Label */}
        <div className="bg-white border border-slate-200 rounded-full px-4 py-2 text-xs font-bold text-slate-700 shadow-sm flex items-center gap-1.5 select-none">
          Chat with us 👋
        </div>
        {/* Circular Chat Button with red badge */}
        <button className="relative w-14 h-14 bg-[#008080] hover:bg-teal-700 text-white rounded-full flex items-center justify-center shadow-lg transition-transform duration-300 hover:scale-105 cursor-pointer focus:outline-none">
          {/* Chat Icon */}
          <svg
            className="w-7 h-7"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            />
          </svg>
          {/* Red Notification Badge */}
          <span className="absolute -top-1.5 -right-1.5 w-6 h-6 bg-red-600 border border-white text-[10px] font-black text-white rounded-full flex items-center justify-center select-none shadow">
            1
          </span>
        </button>
      </div>

    </div>
  );
}
