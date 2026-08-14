import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, User, Lock, ArrowRight, Loader2, LogOut } from 'lucide-react';
import { UserAccount } from '../types';
import { supabase } from '../lib/supabase';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentUser: UserAccount;
  onLogin: (user: UserAccount) => void;
  isAuthenticated?: boolean;
  onSignOut?: () => void;
}

interface ProfileRow {
  name: string;
  email: string;
  plan: string;
  location: string | null;
}

function buildUserAccount(profile: ProfileRow): UserAccount {
  const parts = profile.name.trim().split(' ');
  const initials = parts.length > 1
    ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
    : profile.name.slice(0, 2).toUpperCase();
  return {
    name: profile.name,
    email: profile.email,
    role: profile.plan === 'pro' ? 'Pro Member' : 'Learner',
    initials,
    plan: profile.plan === 'pro' ? 'pro' : 'free',
    location: profile.location || 'Nairobi, Kenya',
  };
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  currentUser,
  onLogin,
  isAuthenticated,
  onSignOut,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [location, setLocation] = useState('Nairobi, Kenya');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    if (!email.trim() || !password) return;
    setLoading(true);

    try {
      if (isSignUp) {
        if (!name.trim()) {
          setError('Enter your full name.');
          setLoading(false);
          return;
        }
        const { data, error: signUpError } = await supabase.auth.signUp({
          email: email.trim(),
          password,
          options: { data: { name: name.trim() } },
        });
        if (signUpError) throw signUpError;
        if (!data.user) {
          setError('Check your email to confirm your account, then sign in.');
          setLoading(false);
          return;
        }
        await supabase.from('profiles').update({ location }).eq('id', data.user.id);
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('name, email, plan, location')
          .eq('id', data.user.id)
          .single();
        if (profileError) throw profileError;
        onLogin(buildUserAccount(profile as ProfileRow));
        onClose();
      } else {
        const { data, error: signInError } = await supabase.auth.signInWithPassword({
          email: email.trim(),
          password,
        });
        if (signInError) throw signInError;
        const { data: profile, error: profileError } = await supabase
          .from('profiles')
          .select('name, email, plan, location')
          .eq('id', data.user.id)
          .single();
        if (profileError) throw profileError;
        onLogin(buildUserAccount(profile as ProfileRow));
        onClose();
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong. Try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
    <motion.div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-[#12102A]/60 backdrop-blur-xs"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="bg-white border border-[#12102A]/10 rounded-2xl w-full max-w-md shadow-2xl overflow-hidden"
        initial={{ opacity: 0, scale: 0.96, y: 12 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.96, y: 12 }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      >

        {/* Header */}
        <div className="p-6 bg-[#F0EEF6] border-b border-[#12102A]/10 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-[#12102A] text-[#F5A623] flex items-center justify-center">
              <User className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-base text-[#12102A]">
                {isSignUp ? 'Create Learner Account' : 'Sign In to Afridemy'}
              </h3>
              <p className="text-xs text-[#12102A]/60">
                Track your progress & verified portfolios
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

        {isAuthenticated ? (
          <div className="p-6 space-y-4">
            <div className="p-4 rounded-xl bg-[#F0EEF6] border border-[#12102A]/10 flex items-center gap-3">
              <div className="w-9 h-9 rounded-full bg-[#12102A] text-[#F5A623] flex items-center justify-center font-black text-xs shrink-0">
                {currentUser.initials}
              </div>
              <div className="min-w-0">
                <p className="text-sm font-bold text-[#12102A] truncate">{currentUser.name}</p>
                <p className="text-xs text-[#12102A]/60 truncate">{currentUser.email}</p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => { onSignOut?.(); onClose(); }}
              className="w-full py-3 bg-white hover:bg-[#F0EEF6] border border-[#12102A]/10 text-[#12102A] text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        ) : (
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {isSignUp && (
            <div>
              <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g. Wanjiku Muthoni"
                required={isSignUp}
                className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
              />
            </div>
          )}

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
              className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
              Password
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="At least 6 characters"
              required
              minLength={6}
              className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
            />
          </div>

          {isSignUp && (
            <div>
              <label className="text-xs font-bold uppercase font-mono text-[#12102A]/60 block mb-1.5">
                Location / City
              </label>
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-xs text-[#12102A] font-semibold focus:outline-hidden focus:border-[#F5A623]"
              >
                <option value="Nairobi, Kenya">Nairobi, Kenya</option>
                <option value="Mombasa, Kenya">Mombasa, Kenya</option>
                <option value="Kisumu, Kenya">Kisumu, Kenya</option>
                <option value="Nakuru, Kenya">Nakuru, Kenya</option>
                <option value="Eldoret, Kenya">Eldoret, Kenya</option>
                <option value="International / Remote">International / Remote</option>
              </select>
            </div>
          )}

          {error && (
            <p className="text-xs font-semibold text-red-600 bg-red-50 border border-red-100 rounded-lg px-3 py-2">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold rounded-xl flex items-center justify-center gap-1.5 cursor-pointer transition-colors shadow-xs disabled:opacity-60 disabled:cursor-not-allowed"
          >
            {loading ? (
              <Loader2 className="w-3.5 h-3.5 animate-spin" />
            ) : (
              <>
                {isSignUp ? 'Create Free Account' : 'Sign In'}
                <ArrowRight className="w-3.5 h-3.5 text-[#F5A623]" />
              </>
            )}
          </button>

          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => { setIsSignUp(!isSignUp); setError(null); }}
              className="text-xs font-bold text-[#12102A]/70 hover:text-[#12102A] underline cursor-pointer"
            >
              {isSignUp ? 'Already have an account? Sign In' : "Don't have an account? Sign Up Free"}
            </button>
          </div>
        </form>
        )}

      </motion.div>
    </motion.div>
      )}
    </AnimatePresence>
  );
};
