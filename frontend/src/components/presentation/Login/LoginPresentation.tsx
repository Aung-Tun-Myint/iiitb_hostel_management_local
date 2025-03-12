// src/components/presentation/Login/LoginPresentation.tsx
import React from 'react';
import { FaGithub, FaFacebook, FaTwitter, FaLinkedin, FaYoutube } from 'react-icons/fa';
import { MdMailOutline, MdPassword } from 'react-icons/md';
import iiitLogo from '../../../assets/iiit_logo.png';
interface LoginPresentationProps {
  email: string;
  password: string;
  onEmailChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onPasswordChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (e: React.FormEvent) => void;
  isLoading?: boolean;
}

const LoginPresentation: React.FC<LoginPresentationProps> = ({
  email,
  password,
  onEmailChange,
  onPasswordChange,
  onSubmit,
  isLoading = false,
}) => {
  return (
    <div className="min-h-screen bg-[#E6EDF3] flex items-center justify-center p-4">
      <div className="w-full max-w-7xl h-auto md:h-[90vh] bg-white rounded-[38px] overflow-hidden shadow-lg border border-[#CED4DA] flex flex-col md:flex-row">
        {/* Left Side - Gradient Background */}
        <div className="w-full md:w-[55%] bg-gradient-to-b from-[#025492] to-[#022484] rounded-t-[38px] md:rounded-l-[38px] md:rounded-tr-none relative flex flex-col justify-between p-6 md:p-10">
          {/* Logo and Title Section */}
          <div className="flex flex-col items-center pt-6 md:pt-10">
            {/* Logo */}
            <div className="w-20 h-20 md:w-24 md:h-28 mb-4">
              <img src={iiitLogo} alt="IIIT-B Logo" className="w-full h-full object-contain" />
            </div>
            
            {/* Institute Name */}
            <h1 className="text-white text-xl md:text-2xl font-medium text-center mb-4 max-w-md">
              International Institute of Information Technology Bangalore
            </h1>
          </div>
          
          {/* System Name - Centered */}
          {/*  -mt-8 md:-mt-10 */}
          <div className="flex-grow flex items-center justify-center">
            <h2 className="text-white text-xl md:text-3xl font-semibold uppercase text-center tracking-wider">
              HOSTEL MANAGEMENT SYSTEM
            </h2>
          </div>
          
          {/* Footer Section */}
          <div className="mt-auto">
            {/* Divider */}
            <div className="w-full h-[2px] bg-white mb-4"></div>
            
            {/* Social Icons */}
            <div className="flex justify-center space-x-6 mb-4">
              <a href="https://github.com/IIITBangalore" aria-label="GitHub" className="text-[#509CDB] hover:text-white">
                <FaGithub size={28} />
              </a>
              <a href="https://www.facebook.com/IIITBofficial" aria-label="Facebook" className="text-[#509CDB] hover:text-white">
                <FaFacebook size={28} />
              </a>
              <a href="https://x.com/IIITB_official" aria-label="Twitter" className="text-[#509CDB] hover:text-white">
                <FaTwitter size={28} />
              </a>
              <a href="https://www.linkedin.com/school/iiitbofficial/posts/?feedView=all" aria-label="LinkedIn" className="text-[#509CDB] hover:text-white">
                <FaLinkedin size={28} />
              </a>
              <a href="https://www.youtube.com/@IIITB_official" aria-label="YouTube" className="text-[#509CDB] hover:text-white">
                <FaYoutube size={28} />
              </a>
            </div>
            
            {/* Copyright */}
            <p className="text-white text-sm md:text-base text-center">
              © 2024 Copyright: International Institute of Information Technology - Bangalore<br />
              Technical Support - application@iiitb.ac.in
            </p>
          </div>
        </div>
        
        {/* Right Side - Login Form */}
        <div className="w-full md:w-[45%] p-6 md:p-10 flex flex-col justify-center">
          <div className="max-w-md mx-auto w-full">
            <h3 className="text-[#074E85] font-semibold text-2xl mb-8">
              Login Form
            </h3>
            
            <form onSubmit={onSubmit}>
              {/* Email Input */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdMailOutline className="text-[#A4AAAE]" size={18} />
                </div>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={onEmailChange}
                  className="w-full py-3 pl-10 pr-4 text-[#A4AAAE] bg-white border border-[#CED4DA] rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#0575E6] shadow-sm"
                  placeholder="Email Address"
                  required
                />
              </div>
              
              {/* Password Input */}
              <div className="relative mb-6">
                <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                  <MdPassword className="text-[#A4AAAE]" size={18} />
                </div>
                <input
                  type="password"
                  id="password"
                  value={password}
                  onChange={onPasswordChange}
                  className="w-full py-3 pl-10 pr-4 text-[#A4AAAE] bg-white border border-[#CED4DA] rounded-[14px] focus:outline-none focus:ring-1 focus:ring-[#0575E6] shadow-sm"
                  placeholder="Password"
                  required
                />
              </div>
              
              {/* Login Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-[#0575E6] text-white py-3 rounded-[14px] font-medium text-lg shadow-md hover:bg-[#0468cc] transition-colors mb-6 disabled:bg-[#8bb8ec] disabled:cursor-not-allowed"
              >
                {isLoading ? 'Logging in...' : 'Login'}
              </button>
            </form>
            
            {/* Forgot Password Link */}
            <div className="text-center mt-4">
              <a href="#" className="text-[#599FD5] underline text-lg">
                Forgot Password?
              </a>
            </div>
            
            {/* Change Password Link */}
            <div className="text-center mt-4">
              <p className="text-[#6C757D] text-sm">
                To Change Password, <a href="#" className="hover:underline">Click here</a>.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPresentation;