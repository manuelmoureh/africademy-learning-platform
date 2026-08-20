import React, { useEffect, useRef, useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Loader2,
  CheckCircle2,
  Clock,
  XCircle,
  LogOut,
  ArrowRight,
  ExternalLink,
  ShieldCheck,
} from 'lucide-react';
import { Track, UserAccount } from '../types';
import { Header } from './Header';
import {
  updateProfile,
  uploadAvatar,
  fetchUserPortfolioSubmissions,
  PortfolioSubmissionRow,
} from '../lib/db';

interface ProfilePageProps {
  tracks: Track[];
  user: UserAccount;
  userId: string | null;
  isAuthenticated: boolean;
  authLoading?: boolean;
  purchasedTrackIds: string[];
  searchQuery: string;
  onSearchChange: (value: string) => void;
  onSearchSubmit: () => void;
  onGoHome: () => void;
  onEnterApp: () => void;
  onSelectCourse: (trackId: string) => void;
  onContinueTrack: (trackId: string) => void;
  onOpenVerifiedWork: () => void;
  onOpenAbout: () => void;
  onOpenAuth: () => void;
  onSignOut: () => void;
  onProfileUpdated: (updates: Partial<UserAccount>) => void;
}

const LOCATIONS = [
  'Nairobi, Kenya',
  'Mombasa, Kenya',
  'Kisumu, Kenya',
  'Nakuru, Kenya',
  'Eldoret, Kenya',
  'International / Remote',
];

const STATUS_STYLES: Record<PortfolioSubmissionRow['status'], { label: string; className: string; icon: React.ReactNode }> = {
  pending: { label: 'In Review', className: 'bg-[#F5A623]/10 text-[#F5A623]', icon: <Clock className="w-3.5 h-3.5" /> },
  verified: { label: 'Verified', className: 'bg-[#10B981]/10 text-[#10B981]', icon: <ShieldCheck className="w-3.5 h-3.5" /> },
  rejected: { label: 'Needs Changes', className: 'bg-red-100 text-red-600', icon: <XCircle className="w-3.5 h-3.5" /> },
};

export const ProfilePage: React.FC<ProfilePageProps> = ({
  tracks,
  user,
  userId,
  isAuthenticated,
  authLoading,
  purchasedTrackIds,
  searchQuery,
  onSearchChange,
  onSearchSubmit,
  onGoHome,
  onEnterApp,
  onSelectCourse,
  onContinueTrack,
  onOpenVerifiedWork,
  onOpenAbout,
  onOpenAuth,
  onSignOut,
  onProfileUpdated,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [name, setName] = useState(user.name);
  const [location, setLocation] = useState(user.location);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [submissions, setSubmissions] = useState<PortfolioSubmissionRow[]>([]);

  useEffect(() => {
    setName(user.name);
    setLocation(user.location);
  }, [user.name, user.location]);

  useEffect(() => {
    if (!userId) return;
    fetchUserPortfolioSubmissions(userId).then(setSubmissions);
  }, [userId]);

  const isDirty = name.trim() !== user.name || location !== user.location;

  const handleSave = async () => {
    if (!userId || !isDirty) return;
    setSaving(true);
    const { error } = await updateProfile(userId, { name: name.trim(), location });
    setSaving(false);
    if (!error) {
      onProfileUpdated({ name: name.trim(), location });
      setSaved(true);
      setTimeout(() => setSaved(false), 2000);
    }
  };

  const handleAvatarPick = () => fileInputRef.current?.click();

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !userId) return;
    setUploading(true);
    const url = await uploadAvatar(userId, file);
    setUploading(false);
    if (url) onProfileUpdated({ avatarUrl: url });
    e.target.value = '';
  };

  const unlockedTracks = tracks.filter((t) => purchasedTrackIds.includes(t.id));
  const lessonsCompleted = tracks.reduce((sum, t) => sum + t.completedSteps, 0);
  const overallProgress = unlockedTracks.length
    ? Math.round(unlockedTracks.reduce((sum, t) => sum + t.progress, 0) / unlockedTracks.length)
    : 0;

  return (
    <div className="min-h-screen bg-[#F0EEF6] text-[#12102A]">
      <Header
        tracks={tracks}
        activeNav="profile"
        user={user}
        isAuthenticated={isAuthenticated}
        authLoading={authLoading}
        searchQuery={searchQuery}
        onSearchChange={onSearchChange}
        onSearchSubmit={onSearchSubmit}
        onGoHome={onGoHome}
        onEnterApp={onEnterApp}
        onSelectCourse={onSelectCourse}
        onOpenVerifiedWork={onOpenVerifiedWork}
        onOpenAbout={onOpenAbout}
        onOpenAuth={onOpenAuth}
      />

      {!isAuthenticated ? (
        <div className="max-w-md mx-auto px-6 py-24 text-center space-y-4">
          <h1 className="text-xl font-black">Sign in to view your profile</h1>
          <p className="text-sm text-[#12102A]/60">
            Track your progress, manage your account, and see your verified portfolio submissions.
          </p>
          <button
            onClick={onOpenAuth}
            className="px-5 py-2.5 rounded-full bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold cursor-pointer transition-colors"
          >
            Sign In
          </button>
        </div>
      ) : (
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: 'easeOut' }}
          className="max-w-4xl mx-auto px-6 lg:px-12 py-10 md:py-14 space-y-8"
        >
          {/* Identity card */}
          <div className="bg-white border border-[#12102A]/10 rounded-2xl p-6 flex flex-col sm:flex-row gap-6 sm:items-center">
            <div className="relative shrink-0 mx-auto sm:mx-0">
              <div className="w-24 h-24 rounded-full overflow-hidden bg-[#12102A]/10 flex items-center justify-center">
                {user.avatarUrl ? (
                  <img src={user.avatarUrl} alt={user.name} className="w-full h-full object-cover" />
                ) : (
                  <span className="text-2xl font-black text-[#12102A]">{user.initials}</span>
                )}
              </div>
              <button
                type="button"
                onClick={handleAvatarPick}
                disabled={uploading}
                aria-label="Change profile photo"
                className="absolute bottom-0 right-0 w-8 h-8 rounded-full bg-[#F5A623] hover:bg-[#e4971c] text-[#12102A] flex items-center justify-center shadow-md cursor-pointer transition-colors disabled:opacity-60"
              >
                {uploading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Camera className="w-4 h-4" />}
              </button>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/png,image/jpeg,image/webp"
                onChange={handleAvatarChange}
                className="hidden"
              />
            </div>

            <div className="flex-1 min-w-0 space-y-3">
              <div className="grid sm:grid-cols-2 gap-3">
                <div>
                  <label className="text-[10px] font-bold uppercase font-mono text-[#12102A]/50 block mb-1">Full Name</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#12102A] focus:outline-none focus:border-[#F5A623]"
                  />
                </div>
                <div>
                  <label className="text-[10px] font-bold uppercase font-mono text-[#12102A]/50 block mb-1">Location</label>
                  <select
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full bg-[#F0EEF6] border border-[#12102A]/10 rounded-xl px-3.5 py-2.5 text-sm font-semibold text-[#12102A] focus:outline-none focus:border-[#F5A623]"
                  >
                    {LOCATIONS.map((loc) => (
                      <option key={loc} value={loc}>{loc}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase font-mono text-[#12102A]/50 block mb-1">Email</label>
                <p className="text-sm font-semibold text-[#12102A]/60">{user.email}</p>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <button
                  type="button"
                  onClick={handleSave}
                  disabled={!isDirty || saving}
                  className="px-4 py-2 rounded-full bg-[#12102A] hover:bg-[#1c1940] text-white text-xs font-bold cursor-pointer transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center gap-1.5"
                >
                  {saving && <Loader2 className="w-3.5 h-3.5 animate-spin" />}
                  Save Changes
                </button>
                {saved && (
                  <span className="text-xs font-bold text-[#10B981] flex items-center gap-1">
                    <CheckCircle2 className="w-3.5 h-3.5" /> Saved
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            {[
              { label: 'Systems Unlocked', value: unlockedTracks.length },
              { label: 'Lessons Completed', value: lessonsCompleted },
              { label: 'Overall Progress', value: `${overallProgress}%` },
            ].map((stat) => (
              <div key={stat.label} className="bg-white border border-[#12102A]/10 rounded-2xl p-4 text-center">
                <p className="text-2xl font-black text-[#12102A]">{stat.value}</p>
                <p className="text-[10px] font-bold uppercase font-mono text-[#12102A]/50 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>

          {/* Unlocked systems */}
          <div>
            <h2 className="text-sm font-black uppercase font-mono text-[#12102A]/60 mb-3">Your Systems</h2>
            {unlockedTracks.length === 0 ? (
              <div className="bg-white border border-dashed border-[#12102A]/15 rounded-2xl p-6 text-center">
                <p className="text-sm text-[#12102A]/60 mb-3">You haven't unlocked any systems yet.</p>
                <button
                  onClick={onEnterApp}
                  className="text-xs font-bold text-[#F5A623] hover:underline cursor-pointer"
                >
                  Browse systems
                </button>
              </div>
            ) : (
              <div className="space-y-3">
                {unlockedTracks.map((track) => (
                  <div key={track.id} className="bg-white border border-[#12102A]/10 rounded-2xl p-4 flex items-center gap-4">
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-bold text-[#12102A] truncate">{track.title}</p>
                      <div className="flex items-center gap-2 mt-1.5">
                        <div className="flex-1 h-1.5 rounded-full bg-[#12102A]/10 overflow-hidden max-w-xs">
                          <div className="h-full bg-[#10B981]" style={{ width: `${track.progress}%` }} />
                        </div>
                        <span className="text-[10px] font-mono font-bold text-[#12102A]/50 shrink-0">
                          {track.completedSteps}/{track.totalSteps}
                        </span>
                      </div>
                    </div>
                    <button
                      onClick={() => onContinueTrack(track.id)}
                      className="shrink-0 px-3.5 py-2 rounded-full bg-[#F0EEF6] hover:bg-[#12102A]/10 text-[#12102A] text-xs font-bold cursor-pointer transition-colors flex items-center gap-1"
                    >
                      Continue
                      <ArrowRight className="w-3 h-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Portfolio submissions */}
          <div>
            <h2 className="text-sm font-black uppercase font-mono text-[#12102A]/60 mb-3">Verified Portfolio Submissions</h2>
            {submissions.length === 0 ? (
              <div className="bg-white border border-dashed border-[#12102A]/15 rounded-2xl p-6 text-center">
                <p className="text-sm text-[#12102A]/60">
                  Finish a system and submit your build to earn a verified portfolio entry.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {submissions.map((sub) => {
                  const track = tracks.find((t) => t.id === sub.track_id);
                  const style = STATUS_STYLES[sub.status];
                  return (
                    <div key={sub.id} className="bg-white border border-[#12102A]/10 rounded-2xl p-4 flex items-center gap-4">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold text-[#12102A] truncate">{track?.title || sub.track_id}</p>
                        <a
                          href={sub.project_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-xs text-[#12102A]/50 hover:text-[#F5A623] flex items-center gap-1 mt-0.5 truncate"
                        >
                          {sub.project_url}
                          <ExternalLink className="w-3 h-3 shrink-0" />
                        </a>
                      </div>
                      <span className={`shrink-0 text-[10px] font-bold font-mono px-2.5 py-1 rounded-full flex items-center gap-1 ${style.className}`}>
                        {style.icon}
                        {style.label}
                      </span>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          <div className="pt-2">
            <button
              type="button"
              onClick={() => { onSignOut(); onGoHome(); }}
              className="px-4 py-2.5 rounded-full border border-[#12102A]/10 bg-white hover:bg-[#F0EEF6] text-xs font-bold text-[#12102A] cursor-pointer transition-colors flex items-center gap-1.5"
            >
              <LogOut className="w-3.5 h-3.5" />
              Sign Out
            </button>
          </div>
        </motion.div>
      )}
    </div>
  );
};
