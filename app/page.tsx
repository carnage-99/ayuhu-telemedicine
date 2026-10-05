'use client';

import { useState } from 'react';

interface Doctor {
  id: number;
  name: string;
  specialty: string;
  rating: number;
  image: string;
  availability: string;
  price: number;
}

interface Appointment {
  doctorId: number;
  date: string;
  time: string;
  reason: string;
}

const doctors: Doctor[] = [
  {
    id: 1,
    name: "Dr. Rajesh Patel",
    specialty: "General Practice",
    rating: 4.8,
    image: "👨‍⚕️",
    availability: "Available Today",
    price: 499
  },
  {
    id: 2,
    name: "Dr. Priya Sharma",
    specialty: "Cardiology",
    rating: 4.9,
    image: "👩‍⚕️",
    availability: "Available in 30 min",
    price: 799
  },
  {
    id: 3,
    name: "Dr. Amit Verma",
    specialty: "Dermatology",
    rating: 4.7,
    image: "👨‍⚕️",
    availability: "Available Tomorrow",
    price: 599
  },
  {
    id: 4,
    name: "Dr. Neha Gupta",
    specialty: "Psychiatry",
    rating: 4.9,
    image: "👩‍⚕️",
    availability: "Available Today",
    price: 699
  }
];

export default function Home() {
  const [page, setPage] = useState<'home' | 'doctors' | 'appointment' | 'consultation' | 'confirmation' | 'about' | 'services' | 'signin'>('home');
  const [selectedDoctor, setSelectedDoctor] = useState<Doctor | null>(null);
  const [appointment, setAppointment] = useState<Appointment>({
    doctorId: 0,
    date: '',
    time: '',
    reason: ''
  });
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [authMethod, setAuthMethod] = useState<'email' | 'phone' | null>(null);
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [otp, setOtp] = useState('');
  const [generatedOtp, setGeneratedOtp] = useState('');
  const [verificationSent, setVerificationSent] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSelectDoctor = (doctor: Doctor) => {
    setSelectedDoctor(doctor);
    setPage('appointment');
  };

  const handleScheduleAppointment = () => {
    if (appointment.date && appointment.time && appointment.reason) {
      setAppointment({ ...appointment, doctorId: selectedDoctor?.id || 0 });
      setPage('confirmation');
    } else {
      alert('Please fill in all fields');
    }
  };

  const handleStartConsultation = () => {
    if (!isLoggedIn) {
      alert('Please sign in first to book a consultation');
      setPage('signin');
      return;
    }
    setPage('doctors');
  };

  const handleStartCall = () => {
    setPage('consultation');
  };

  const handleBackHome = () => {
    setPage('home');
    setSelectedDoctor(null);
    setAppointment({ doctorId: 0, date: '', time: '', reason: '' });
    setMobileMenuOpen(false);
  };

  const generateOTP = () => {
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedOtp(otp);
    return otp;
  };

  const handleSendVerification = () => {
    if (authMethod === 'email' && !email) {
      alert('Please enter your email address');
      return;
    }
    if (authMethod === 'phone' && !phone) {
      alert('Please enter your phone number');
      return;
    }

    const newOtp = generateOTP();
    setVerificationSent(true);

    if (authMethod === 'email') {
      alert(`✓ Verification code sent to ${email}\n\nDemo OTP: ${newOtp}`);
    } else {
      alert(`✓ Verification code sent to ${phone}\n\nDemo OTP: ${newOtp}`);
    }
  };

  const handleVerifyOTP = () => {
    if (!otp) {
      alert('Please enter the verification code');
      return;
    }

    if (otp === generatedOtp) {
      const name = authMethod === 'email' ? email.split('@')[0] : phone.slice(-4);
      setUserName(name);
      setIsLoggedIn(true);
      alert(`✓ Login successful!\nWelcome, ${name}!`);
      setPage('home');
      setEmail('');
      setPhone('');
      setOtp('');
      setVerificationSent(false);
      setAuthMethod(null);
    } else {
      alert('❌ Invalid verification code. Please try again.');
    }
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setUserName('');
    setPage('home');
  };

  // Home Page - Nuvica Design
  if (page === 'home') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 via-blue-300 to-blue-200">
        {/* Navigation */}
        <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16 sm:h-20">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-lg flex items-center justify-center text-white font-bold text-lg">💚</div>
                <span className="text-xl sm:text-2xl font-bold text-gray-900">Ayuhu</span>
              </div>

              {/* Desktop Menu */}
              <div className="hidden md:flex items-center gap-8">
                <button onClick={() => setPage('about')} className="text-gray-700 hover:text-blue-600 font-medium transition">About</button>
                <button onClick={() => setPage('services')} className="text-gray-700 hover:text-blue-600 font-medium transition">Services</button>
                <button onClick={() => setPage('doctors')} className="text-gray-700 hover:text-blue-600 font-medium transition">Doctors</button>
              </div>

              {/* Auth Buttons */}
              <div className="flex items-center gap-2 sm:gap-4">
                {isLoggedIn ? (
                  <div className="flex items-center gap-2 sm:gap-4">
                    <span className="hidden sm:inline text-gray-700 font-semibold text-sm">👤 {userName}</span>
                    <button onClick={handleLogout} className="px-3 sm:px-6 py-2 bg-red-500 text-white rounded-full hover:bg-red-600 transition font-medium text-sm sm:text-base">Logout</button>
                  </div>
                ) : (
                  <button onClick={() => setPage('signin')} className="px-3 sm:px-6 py-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition font-medium text-sm sm:text-base">Sign In</button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden text-2xl">☰</button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
              <div className="md:hidden bg-white border-t border-gray-200 py-4 px-4 space-y-3">
                <button onClick={() => { setPage('about'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">About</button>
                <button onClick={() => { setPage('services'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">Services</button>
                <button onClick={() => { setPage('doctors'); setMobileMenuOpen(false); }} className="block w-full text-left text-gray-700 hover:text-blue-600 font-medium py-2">Doctors</button>
              </div>
            )}
          </div>
        </nav>

        {/* Hero Section */}
        <div className="pt-24 sm:pt-32 pb-12 sm:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              {/* Left Content */}
              <div className="text-white">
                <div className="inline-block bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full mb-6">
                  <span className="text-sm font-semibold">✨ Fast Treatment</span>
                </div>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                  QUICK & SMART MEDIC
                </h1>
                <p className="text-lg sm:text-xl text-white/90 mb-8 leading-relaxed">
                  Ayuhu is your destination for world-class treatments, compassionate doctors, and precise diagnostics all under one roof.
                </p>
                <button
                  onClick={handleStartConsultation}
                  className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold transition inline-flex items-center gap-2 text-sm sm:text-base"
                >
                  Explore More →
                </button>
              </div>

              {/* Right Visual */}
              <div className="relative h-64 sm:h-96 md:h-full flex items-center justify-center">
                <div className="absolute inset-0 bg-white/10 backdrop-blur-sm rounded-3xl"></div>
                <div className="relative z-10 text-center">
                  <div className="text-8xl sm:text-9xl mb-4 animate-pulse">👨‍⚕️</div>
                  <div className="bg-white/20 backdrop-blur-sm px-6 py-4 rounded-2xl inline-block">
                    <div className="text-sm text-white/80">Experience</div>
                    <div className="text-3xl sm:text-4xl font-bold text-white">22 Years</div>
                  </div>
                  <div className="absolute -bottom-8 right-0 bg-white rounded-2xl shadow-lg p-4 w-32 sm:w-40">
                    <div className="text-sm text-gray-600 font-semibold">Consultation</div>
                    <div className="text-2xl sm:text-3xl font-bold text-blue-600">6700+</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Services Grid */}
        <div className="px-4 sm:px-6 lg:px-8 pb-12 sm:pb-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {[
                { icon: '🧠', title: 'Brain Health Check', color: 'from-green-400' },
                { icon: '🫘', title: 'Liver Function Test', color: 'from-green-400' },
                { icon: '🫘', title: 'Kidney Health Scan', color: 'from-blue-600' },
                { icon: '❤️', title: 'Heart Screening', color: 'from-red-400' }
              ].map((service, i) => (
                <div key={i} className={`bg-gradient-to-br ${service.color} to-blue-500 rounded-3xl p-6 sm:p-8 text-white shadow-lg hover:shadow-xl transition transform hover:scale-105`}>
                  <div className="flex justify-between items-start mb-6">
                    <div className="text-4xl sm:text-5xl">{service.icon}</div>
                    <div className="bg-white/30 backdrop-blur-sm rounded-full p-2">
                      <span className="text-xl">✓</span>
                    </div>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold">{service.title}</h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* About Section */}
        <div className="bg-white/95 px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-12 items-center">
              <div className="bg-gradient-to-br from-blue-300 to-blue-500 rounded-3xl h-64 sm:h-80 flex items-center justify-center">
                <div className="text-7xl sm:text-9xl">🏥</div>
              </div>
              <div>
                <div className="inline-block bg-green-100 text-green-700 px-4 py-2 rounded-full mb-4 font-semibold text-sm">ABOUT US</div>
                <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">YOUR AYUHU MEDICAL HOSPITAL</h2>
                <p className="text-gray-700 text-lg mb-8 leading-relaxed">
                  We combine Clinical Expertise, Innovative Technology, and a Patient-First Approach to ensure accurate diagnosis and effective treatment. With 22 years of experience, we've served 20M+ patients globally.
                </p>
                <button onClick={handleStartConsultation} className="bg-blue-700 hover:bg-blue-800 text-white px-8 py-4 rounded-lg font-bold transition inline-flex items-center gap-2">
                  Learn More →
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-700 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8 text-center">
              <div>
                <div className="text-3xl sm:text-5xl font-bold">$250M</div>
                <div className="text-sm sm:text-base text-white/80 mt-2">In Healthcare Funding</div>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-bold">20M+</div>
                <div className="text-sm sm:text-base text-white/80 mt-2">Patients Served Globally</div>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-bold">95%</div>
                <div className="text-sm sm:text-base text-white/80 mt-2">Patient Satisfaction Rate</div>
              </div>
              <div>
                <div className="text-3xl sm:text-5xl font-bold">200+</div>
                <div className="text-sm sm:text-base text-white/80 mt-2">Medical Professionals</div>
              </div>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-white px-4 sm:px-6 lg:px-8 py-12 sm:py-20">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-6">Don't Let Your Health Take a Back Seat!</h2>
            <p className="text-xl text-gray-600 mb-8">Get expert medical advice today. Affordable, fast, and convenient.</p>
            <button
              onClick={handleStartConsultation}
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 sm:px-12 py-4 rounded-lg font-bold transition inline-flex items-center gap-2 text-lg"
            >
              Start Consultation →
            </button>
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-gray-900 text-white px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center font-bold">💚</div>
                  <span className="text-xl font-bold">Ayuhu</span>
                </div>
                <p className="text-gray-400 text-sm">Your trusted telemedicine partner</p>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 mb-4">Services</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><button onClick={() => { setPage('services'); setMobileMenuOpen(false); }} className="hover:text-white transition">Consultations</button></li>
                  <li><button onClick={() => { setPage('doctors'); setMobileMenuOpen(false); }} className="hover:text-white transition">Find Doctors</button></li>
                  <li>Digital Prescriptions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 mb-4">Company</h4>
                <ul className="space-y-2 text-gray-400 text-sm">
                  <li><button onClick={() => { setPage('about'); setMobileMenuOpen(false); }} className="hover:text-white transition">About Us</button></li>
                  <li>Privacy Policy</li>
                  <li>Terms & Conditions</li>
                </ul>
              </div>
              <div>
                <h4 className="font-bold text-blue-400 mb-4">Contact</h4>
                <p className="text-gray-400 text-sm">📧 support@ayuhu.com</p>
                <p className="text-gray-400 text-sm">📞 1800-AYUHU-1</p>
              </div>
            </div>
            <div className="border-t border-gray-700 pt-8 text-center text-gray-400 text-sm">
              <p>© 2024 Ayuhu. All rights reserved. | HIPAA Compliant</p>
            </div>
          </div>
        </footer>
      </div>
    );
  }

  // Sign In Page
  if (page === 'signin') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center px-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center space-x-2 mb-4">
                <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold text-lg">💚</div>
                <span className="text-2xl font-bold text-gray-900">Ayuhu</span>
              </div>
              <h1 className="text-3xl font-bold text-gray-900">Sign In</h1>
              <p className="text-gray-600 mt-2">Access your healthcare account</p>
            </div>

            {!authMethod ? (
              <div className="space-y-4">
                <button
                  onClick={() => setAuthMethod('email')}
                  className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                >
                  📧 Sign In with Email
                </button>
                <button
                  onClick={() => setAuthMethod('phone')}
                  className="w-full px-6 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                >
                  📱 Sign In with Phone
                </button>
              </div>
            ) : (
              <form className="space-y-6">
                {!verificationSent ? (
                  <>
                    {authMethod === 'email' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Email Address</label>
                        <input
                          type="email"
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@example.com"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600"
                        />
                      </div>
                    )}

                    {authMethod === 'phone' && (
                      <div>
                        <label className="block text-sm font-semibold text-gray-900 mb-2">Phone Number</label>
                        <input
                          type="tel"
                          value={phone}
                          onChange={(e) => setPhone(e.target.value)}
                          placeholder="+91 98765 43210"
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-600"
                        />
                      </div>
                    )}

                    <button
                      type="button"
                      onClick={handleSendVerification}
                      className="w-full px-6 py-4 bg-blue-600 text-white rounded-lg text-lg font-semibold hover:bg-blue-700 transition"
                    >
                      Send Verification Code
                    </button>
                  </>
                ) : (
                  <>
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-sm text-gray-600">Verification code sent to<br /><span className="font-semibold text-gray-900">{authMethod === 'email' ? email : phone}</span></p>
                    </div>

                    <div>
                      <label className="block text-sm font-semibold text-gray-900 mb-2">Enter Verification Code</label>
                      <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value.slice(0, 6))}
                        placeholder="000000"
                        maxLength={6}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-center text-2xl tracking-widest"
                      />
                    </div>

                    <button
                      type="button"
                      onClick={handleVerifyOTP}
                      className="w-full px-6 py-4 bg-green-600 text-white rounded-lg text-lg font-semibold hover:bg-green-700 transition"
                    >
                      Verify & Sign In
                    </button>

                    <button
                      type="button"
                      onClick={() => { setVerificationSent(false); setOtp(''); setAuthMethod(null); }}
                      className="w-full px-6 py-2 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
                    >
                      Back
                    </button>
                  </>
                )}
              </form>
            )}

            <button
              onClick={handleBackHome}
              className="w-full mt-6 px-6 py-3 bg-gray-100 text-gray-900 rounded-lg font-semibold hover:bg-gray-200 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Doctors Page
  if (page === 'doctors') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-200">
        <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
            <button onClick={handleBackHome} className="flex items-center gap-2 hover:text-blue-600">
              <span className="text-2xl">←</span>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Ayuhu</span>
            </button>
            <button onClick={handleBackHome} className="px-4 sm:px-6 py-2 text-gray-700 hover:text-blue-600 font-medium">Back</button>
          </div>
        </nav>

        <main className="pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">Select Your Doctor</h1>
            <p className="text-xl text-white/90 mb-12">Choose from our network of RCI-registered healthcare professionals</p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
              {doctors.map((doctor) => (
                <div
                  key={doctor.id}
                  onClick={() => handleSelectDoctor(doctor)}
                  className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition transform hover:scale-105 cursor-pointer p-6 sm:p-8"
                >
                  <div className="text-6xl sm:text-7xl mb-4 text-center">{doctor.image}</div>
                  <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 text-center">{doctor.name}</h3>
                  <p className="text-blue-600 font-semibold text-sm mb-3 text-center">{doctor.specialty}</p>
                  <div className="flex items-center justify-center mb-3">
                    <span className="text-yellow-400">⭐</span>
                    <span className="ml-2 text-gray-700 font-medium">{doctor.rating}</span>
                  </div>
                  <p className="text-xs text-gray-500 mb-4 text-center">{doctor.availability}</p>
                  <div className="bg-blue-50 p-3 rounded-lg text-center">
                    <p className="text-2xl font-bold text-blue-600">₹{doctor.price}</p>
                    <p className="text-xs text-gray-600">per consultation</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Appointment Page
  if (page === 'appointment' && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-200">
        <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
            <button onClick={() => setPage('doctors')} className="flex items-center gap-2 hover:text-blue-600">
              <span className="text-2xl">←</span>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Ayuhu</span>
            </button>
          </div>
        </nav>

        <main className="pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-2xl mx-auto">
            <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-10">
              <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">Schedule Your Consultation</h1>
              <p className="text-gray-600 mb-8">with {selectedDoctor.name}</p>

              <div className="bg-blue-50 p-6 rounded-xl mb-8">
                <div className="flex items-center space-x-4">
                  <div className="text-6xl sm:text-7xl">{selectedDoctor.image}</div>
                  <div>
                    <p className="font-bold text-lg text-gray-900">{selectedDoctor.name}</p>
                    <p className="text-blue-600 font-semibold">{selectedDoctor.specialty}</p>
                    <p className="text-gray-700 font-bold mt-2">₹{selectedDoctor.price}</p>
                  </div>
                </div>
              </div>

              <form className="space-y-6">
                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">📅 Preferred Date</label>
                  <input
                    type="date"
                    value={appointment.date}
                    onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">⏰ Preferred Time</label>
                  <select
                    value={appointment.time}
                    onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
                  >
                    <option value="">Select a time slot</option>
                    <option value="09:00">9:00 AM</option>
                    <option value="10:00">10:00 AM</option>
                    <option value="11:00">11:00 AM</option>
                    <option value="14:00">2:00 PM</option>
                    <option value="15:00">3:00 PM</option>
                    <option value="16:00">4:00 PM</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-bold text-gray-900 mb-2">🏥 Reason for Consultation</label>
                  <textarea
                    value={appointment.reason}
                    onChange={(e) => setAppointment({ ...appointment, reason: e.target.value })}
                    placeholder="Describe your symptoms or concerns..."
                    className="w-full px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-500 h-28 resize-none"
                  />
                </div>

                <button
                  type="button"
                  onClick={handleScheduleAppointment}
                  className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition"
                >
                  ✓ Confirm & Book
                </button>
              </form>
            </div>
          </div>
        </main>
      </div>
    );
  }

  // Confirmation Page
  if (page === 'confirmation' && selectedDoctor) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-400 to-blue-200 flex items-center justify-center px-4 pt-20 sm:pt-0">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl shadow-2xl p-8 sm:p-10 text-center">
            <div className="text-6xl mb-4 animate-pulse">✓</div>
            <h1 className="text-3xl font-bold text-blue-600 mb-2">Booking Confirmed!</h1>
            <p className="text-gray-600 mb-8">Your video consultation has been scheduled</p>

            <div className="bg-blue-50 p-6 rounded-lg mb-8 text-left space-y-4">
              <div>
                <p className="text-xs font-bold text-gray-600 uppercase">Doctor</p>
                <p className="font-bold text-lg text-gray-900">{selectedDoctor.name}</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-bold text-gray-600 uppercase">Date & Time</p>
                <p className="font-bold text-lg text-gray-900">{appointment.date} at {appointment.time}</p>
              </div>
              <div className="border-t border-gray-200 pt-4">
                <p className="text-xs font-bold text-gray-600 uppercase">Fee</p>
                <p className="font-bold text-2xl text-blue-600">₹{selectedDoctor.price}</p>
              </div>
            </div>

            <button
              onClick={handleStartCall}
              className="w-full px-8 py-4 bg-blue-600 text-white rounded-lg text-lg font-bold hover:bg-blue-700 transition mb-4"
            >
              🎥 Start Video Consultation
            </button>

            <button
              onClick={handleBackHome}
              className="w-full px-8 py-4 bg-gray-200 text-gray-900 rounded-lg text-lg font-semibold hover:bg-gray-300 transition"
            >
              Back to Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Video Consultation Page
  if (page === 'consultation') {
    return (
      <div className="min-h-screen bg-gray-900 flex flex-col">
        <div className="bg-gray-800 border-b-2 border-blue-600 px-4 sm:px-8 py-4 flex items-center justify-between gap-4">
          <div className="flex items-center gap-4 min-w-0">
            <span className="text-2xl flex-shrink-0">🏥</span>
            <div className="min-w-0">
              <p className="font-bold text-white text-lg truncate">Dr. {selectedDoctor?.name.split(' ')[1]}</p>
              <p className="text-sm text-gray-300 truncate">{selectedDoctor?.specialty}</p>
            </div>
          </div>
          <div className="text-white text-sm font-semibold flex-shrink-0">⏱️ 2:34</div>
        </div>

        <div className="flex-1 flex items-center justify-center p-4 sm:p-8">
          <div className="w-full max-w-4xl">
            <div className="bg-black rounded-lg p-6 sm:p-8 aspect-video flex flex-col items-center justify-center mb-6 sm:mb-8 border-4 border-blue-600">
              <div className="text-6xl sm:text-8xl mb-4 animate-pulse">📹</div>
              <p className="text-white text-xl sm:text-2xl font-bold mb-2 text-center">Dr. {selectedDoctor?.name.split(' ')[1]}'s Video</p>
              <p className="text-blue-400 font-semibold">🟢 Connected & Recording</p>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {[
                { icon: '🎤', label: 'Mute', action: () => alert('🎤 Microphone toggled') },
                { icon: '📹', label: 'Camera', action: () => alert('📹 Camera toggled') },
                { icon: '💬', label: 'Chat', action: () => alert('💬 Chat opened') },
                { icon: '📋', label: 'Reports', action: () => alert('📋 Prescription will be sent to your email') }
              ].map((btn, i) => (
                <button
                  key={i}
                  onClick={btn.action}
                  className="px-4 sm:px-6 py-3 sm:py-4 bg-gray-700 hover:bg-gray-600 text-white rounded-lg font-semibold transition flex items-center gap-2 text-sm sm:text-base"
                >
                  {btn.icon} {btn.label}
                </button>
              ))}
              <button
                onClick={handleBackHome}
                className="px-4 sm:px-6 py-3 sm:py-4 bg-red-600 hover:bg-red-700 text-white rounded-lg font-semibold transition flex items-center gap-2 text-sm sm:text-base"
              >
                📞 End Call
              </button>
            </div>

            <div className="mt-6 sm:mt-8 bg-gray-800 p-4 sm:p-6 rounded-lg border border-blue-600">
              <p className="text-white text-xs sm:text-sm">
                💡 Your consultation will be recorded & available for 30 days. Digital prescription & medical reports sent within 24 hours.
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // About & Services Pages
  if (page === 'about' || page === 'services') {
    const isAbout = page === 'about';
    return (
      <div className="min-h-screen bg-white">
        <nav className="fixed w-full top-0 z-50 bg-white/95 backdrop-blur-sm shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16 sm:h-20">
            <button onClick={handleBackHome} className="flex items-center gap-2 hover:text-blue-600">
              <span className="text-2xl">←</span>
              <span className="text-xl font-bold text-gray-900 hidden sm:inline">Ayuhu</span>
            </button>
            <button onClick={handleBackHome} className="px-4 sm:px-6 py-2 text-gray-700 hover:text-blue-600 font-medium">Back</button>
          </div>
        </nav>

        <main className="pt-24 sm:pt-32 pb-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">{isAbout ? 'About Ayuhu' : 'Our Services'}</h1>

            {isAbout ? (
              <div className="space-y-8">
                <div className="bg-blue-50 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-4">Our Mission</h2>
                  <p className="text-lg text-gray-700 leading-relaxed">
                    At Ayuhu, we believe quality healthcare should be accessible to everyone. We connect patients with certified healthcare professionals through secure, convenient video consultations.
                  </p>
                </div>

                <div className="bg-white border-2 border-gray-200 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">Why Choose Ayuhu?</h2>
                  <div className="space-y-4">
                    {[
                      '✓ RCI Registered Doctors',
                      '✓ HIPAA Compliant Security',
                      '✓ 24/7 Availability',
                      '✓ Affordable Transparent Pricing'
                    ].map((item, i) => (
                      <p key={i} className="text-lg text-gray-700 font-semibold">{item}</p>
                    ))}
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {[
                  { icon: '🩺', title: 'General Checkup', price: '₹499' },
                  { icon: '❤️', title: 'Specialist Care', price: '₹599-799' },
                  { icon: '🧠', title: 'Mental Health', price: '₹699' },
                  { icon: '💊', title: 'Digital Prescriptions', price: 'Free' }
                ].map((service, i) => (
                  <div key={i} className="bg-white border-2 border-gray-200 rounded-lg p-6 hover:shadow-lg transition">
                    <div className="text-5xl mb-4">{service.icon}</div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{service.title}</h3>
                    <p className="text-blue-600 font-bold text-lg">{service.price}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
        </main>
      </div>
    );
  }

  return null;
}
