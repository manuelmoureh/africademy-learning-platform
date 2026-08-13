import React, { useState } from 'react';
import { X, User, Mail, MapPin, Check, ArrowRight, ShieldCheck, Sparkles } from 'lucide-react';
import { UserAccount } from '../types';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogin: (user: UserAccount) => void;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [location, setLocation] = useState(currentUser.location || 'Nairobi, Kenya');

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim()) return;

    const parts = name.trim().split(' ');
    const initials = parts.length > 1 
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name.slice(0, 2).toUpperCase();

    onLogin({
      name: name.trim(),
      email: email.trim(),
      role: currentUser.plan === 'pro' ? 'Pro Member' : 'Learner',
      initials,
      plan: currentUser.plan,
      location: location.trim()
    });

    onClose();
  };

  const handleQuickProfile = (profileName: string, profileEmail: string, profileLoc: string) => {
    setName(profileName);
    setEmail(profileEmail);
    setLocation(profileLoc);
    
    const parts = profileName.split(' ');
    const initials = `${parts[0][0]}${parts[1][0]}`.toUpperCase();

    onLogin({
      name: profileName,
      email: profileEmail,
      role: currentUser.plan === 'pro' ? 'Pro Member' : 'Learner',
      initials,
      plan: currentUser.plan,
      location: profileLoc
    });

    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12102A]/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white border border-[#12102A]/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden">
        
        {/* Header */}
        <div className="p-6 bg-[#FAF9FC] border-b border-[#12102A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#12102A] text-[#F5A623] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#12102A]">
                {isSignUp ? 'Create Learner Account' : 'Sign In to Africademy'}
              </h3>
              <p className="text-xs text-[#12102A]/60">
                Track your course progress & verified portfolios
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-[#12102A]/40 hover:text-[#12102A] hover:bg-white rounded-lg transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <div>
            <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
              Full Name
            </label>
            <div className="relative">
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Wanjiku Muthoni"
                required
                className="w-full bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="e.g. wanjiku@gmail.com"
              required
              className="w-full bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
              Location / City
            </label>
            <select
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="w-full bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
            >
              <option value="Nairobi, Kenya">Nairobi, Kenya</option>
              <option value="Mombasa, Kenya">Mombasa, Kenya</option>
              <option value="Kisumu, Kenya">Kisumu, Kenya</option>
              <option value="Nakuru, Kenya">Nakuru, Kenya</option>
              <option value="Eldoret, Kenya">Eldoret, Kenya</option>
              <option value="International / Remote">International / Remote</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full py-3 bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            {isSignUp ? 'Create Free Account' : 'Sign In'}
            <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
          </button>

          {/* Quick profile switchers for easy evaluation */}
          <div className="pt-4 border-t border-[#12102A]/10">
            <span className="text-[10px] font-mono font-bold uppercase text-[#12102A]/40 block mb-2">
              Quick Test Profiles:
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => handleQuickProfile('Wanjiku Muthoni', 'wanjiku@africademy.ke', 'Nairobi, Kenya')}
                className="p-2 rounded-lg border border-[#12102A]/10 bg-[#FAF9FC] hover:border-[#F5A623] text-left transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-[#12102A] leading-tight">Wanjiku Muthoni</p>
                <p className="text-[10px] text-[#12102A]/50 font-mono">Nairobi, Kenya</p>
              </button>
              <button
                type="button"
                onClick={() => handleQuickProfile('Juma Omondi', 'juma@africademy.ke', 'Mombasa, Kenya')}
                className="p-2 rounded-lg border border-[#12102A]/10 bg-[#FAF9FC] hover:border-[#F5A623] text-left transition-colors cursor-pointer"
              >
                <p className="text-xs font-bold text-[#12102A] leading-tight">Juma Omondi</p>
                <p className="text-[10px] text-[#12102A]/50 font-mono">Mombasa, Kenya</p>
              </button>
            </div>
          </div>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-xs font-bold text-[#12102A]/70 hover:text-[#12102A] underline cursor-pointer"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up Free"}
            </button>
          </div>
        </form>

      </div>
    </div>
  );
};
