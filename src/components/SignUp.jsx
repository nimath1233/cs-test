import { useState } from 'react';

export default function SignUp({ onRegister, onGoHome, onNavigateToLogin, errorMsg, successMsg }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobileNumber: '',
    dob: '',
    language: 'English',
    address: '',
    street: '',
    city: '',
    zipCode: '',
    country: 'Sri Lanka',
    password: '',
    confirmPassword: '',
  });

  const [mobileError, setMobileError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    
    // Clear validation messages on edit
    if (e.target.name === 'mobileNumber') setMobileError('');
    if (e.target.name === 'password' || e.target.name === 'confirmPassword') setPasswordError('');
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setMobileError('');
    setPasswordError('');

    // Basic mobile validation (must contain 9 digits for SL after +94)
    const rawMobile = formData.mobileNumber.replace(/\D/g, '');
    if (rawMobile.length < 9) {
      setMobileError('Please enter a valid mobile number');
      return;
    }

    // Password confirmation validation
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    // Call the parent register function
    onRegister({
      firstName: formData.firstName,
      lastName: formData.lastName,
      email: formData.email,
      password: formData.password,
      mobileNumber: `+94 ${formData.mobileNumber}`,
      dob: formData.dob,
      language: formData.language,
      address: formData.address,
      street: formData.street,
      city: formData.city,
      zipCode: formData.zipCode,
      country: formData.country,
    });
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
      <div className="hidden lg:flex lg:w-[40%] bg-[#1d1b2a] items-center justify-center p-12 relative overflow-hidden select-none">
        <div className="absolute top-[-10%] left-[-10%] w-[350px] h-[350px] bg-slate-800/10 rounded-full blur-[80px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[400px] h-[400px] bg-slate-800/10 rounded-full blur-[80px]" />

        <div className="w-full max-w-sm flex flex-col items-center justify-center z-10">
          <img
            src="/signup_vector.png"
            alt="Sign Up Illustration"
            className="w-full h-auto drop-shadow-[0_15px_30px_rgba(0,0,0,0.3)] animate-pulse"
            style={{ animationDuration: '4s' }}
            draggable="false"
          />
        </div>
      </div>

      {/* Right Column: Form */}
      <div className="w-full lg:w-[60%] flex items-center justify-center p-6 sm:p-12 lg:p-16 overflow-y-auto">
        <div className="w-full max-w-xl flex flex-col my-8">
          
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-4xl font-extrabold text-[#1d1b2a] tracking-tight mb-2">
              Sign Up
            </h2>
            <p className="text-xs text-slate-500 font-medium mb-1">
              Sign up to create a new account
            </p>
            <p className="text-sm text-slate-500 font-medium">
              Already registered?{' '}
              <button 
                onClick={onNavigateToLogin}
                className="text-[#0fa958] font-bold hover:underline bg-transparent border-none cursor-pointer focus:outline-none"
              >
                Sign in
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
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Grid 1: First & Last Name */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  First Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="firstName"
                  required
                  value={formData.firstName}
                  onChange={handleChange}
                  placeholder="Enter first name"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Last Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="lastName"
                  required
                  value={formData.lastName}
                  onChange={handleChange}
                  placeholder="Enter last name"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            {/* Grid 2: Email & Mobile */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Email <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Mobile Number <span className="text-red-500">*</span>
                </label>
                <div className="relative flex items-center">
                  {/* Flag and prefix decoration */}
                  <div className="absolute left-3 flex items-center gap-1.5 select-none pointer-events-none">
                    <img 
                      src="https://flagcdn.com/w20/lk.png" 
                      alt="Sri Lanka Flag" 
                      className="w-5 h-auto rounded-sm border border-slate-200" 
                    />
                    <span className="text-xs font-semibold text-slate-500">+94</span>
                  </div>
                  <input
                    type="text"
                    name="mobileNumber"
                    required
                    value={formData.mobileNumber}
                    onChange={handleChange}
                    placeholder="Mobile number"
                    className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg pl-18 pr-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                  />
                </div>
                {mobileError && (
                  <span className="text-[10px] text-red-500 font-semibold mt-0.5">
                    {mobileError}
                  </span>
                )}
              </div>
            </div>

            {/* Grid 3: DOB & Language */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Date of Birth <span className="text-red-500">*</span>
                </label>
                <input
                  type="date"
                  name="dob"
                  required
                  value={formData.dob}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Language <span className="text-red-500">*</span>
                </label>
                <select
                  name="language"
                  required
                  value={formData.language}
                  onChange={handleChange}
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
                >
                  <option value="English">English</option>
                  <option value="Sinhala">Sinhala</option>
                  <option value="Tamil">Tamil</option>
                </select>
              </div>
            </div>

            {/* Grid 4: Address & Street */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  required
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Enter address"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Street <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="street"
                  required
                  value={formData.street}
                  onChange={handleChange}
                  placeholder="Enter street"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            {/* Grid 5: City/Town & Zip */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  City/Town <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  required
                  value={formData.city}
                  onChange={handleChange}
                  placeholder="Enter city"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Zip Code <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="zipCode"
                  required
                  value={formData.zipCode}
                  onChange={handleChange}
                  placeholder="Enter zip code"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            {/* Country Selector */}
            <div className="flex flex-col gap-1.5 text-left">
              <label className="text-xs font-bold text-slate-700">
                Country <span className="text-red-500">*</span>
              </label>
              <select
                name="country"
                required
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all cursor-pointer"
              >
                <option value="Sri Lanka">Sri Lanka</option>
                <option value="India">India</option>
                <option value="Maldives">Maldives</option>
                <option value="Singapore">Singapore</option>
                <option value="United Kingdom">United Kingdom</option>
              </select>
            </div>

            {/* Grid 6: Password & Confirm Password */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
              <div className="flex flex-col gap-1.5 text-left">
                <label className="text-xs font-bold text-slate-700">
                  Confirm Password <span className="text-red-500">*</span>
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  required
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Enter password"
                  className="w-full bg-[#f8fafc] border border-slate-200 focus:border-[#3b82f6] focus:bg-white rounded-lg px-3.5 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-blue-500/10 transition-all"
                />
              </div>
            </div>

            {passwordError && (
              <div className="text-left text-xs font-semibold text-red-500">
                {passwordError}
              </div>
            )}

            {/* Submit right-aligned button */}
            <div className="flex justify-end pt-3">
              <button
                type="submit"
                className="px-8 py-3.5 bg-[#0fa958] hover:bg-emerald-600 active:scale-98 text-white font-bold text-sm rounded-lg shadow-md hover:shadow-lg transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-emerald-500/30"
              >
                Sign up
              </button>
            </div>

          </form>

        </div>
      </div>

    </div>
  );
}
