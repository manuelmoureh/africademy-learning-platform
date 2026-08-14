import React, { useState } from 'react';
import { MessageSquare, ThumbsUp, Send, User, Sparkles, CheckCircle2, ShieldCheck } from 'lucide-react';
import { UserAccount } from '../types';

interface CommunityViewProps {
  user: UserAccount;
}

export const CommunityView: React.FC<CommunityViewProps> = ({ user }) => {
  const [posts, setPosts] = useState([
    {
      id: 1,
      author: 'Wanjiku Muthoni',
      role: 'Pro Member • Nairobi',
      initials: 'WM',
      time: '1 hour ago',
      title: 'How I reduced out-of-stock hallucination to 0.0% in Step 06',
      content: 'I formatted the live Nairobi store inventory array with explicit KES pricing and structured negative constraints into the Gemini 3.7 Flash system prompt. The bot now passes the SME rubric with 100% accuracy!',
      likes: 28,
      replies: 9
    },
    {
      id: 2,
      author: 'Brian Kiprono',
      role: 'Alumni • Eldoret',
      initials: 'BK',
      time: '4 hours ago',
      title: 'Connecting Safaricom Daraja STK Push to Meta WhatsApp Cloud API',
      content: 'Important tip for Step 08: always acknowledge the Meta WhatsApp webhook with HTTP 200 within 2 seconds using an async queue, then trigger the Daraja Lipa Na M-Pesa Online STK push in the background.',
      likes: 45,
      replies: 14
    },
    {
      id: 3,
      author: 'Amina Hassan',
      role: 'Pro Member • Mombasa',
      initials: 'AH',
      time: 'Yesterday',
      title: 'Sheng and Swahili tokenization patterns in retail sales',
      content: 'Including common Kenyan commerce greeting phrases like "Niko na sanduku", "Bei ya mwisho ni ngapi", and "Weka kando" in your few-shot prompts dramatically improved conversion for Nairobi and Mombasa shoppers.',
      likes: 36,
      replies: 8
    }
  ]);

  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostText, setNewPostText] = useState('');

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPostText.trim()) return;

    setPosts([
      {
        id: Date.now(),
        author: user.name,
        role: `${user.plan === 'pro' ? 'Pro Member' : 'Learner'} • ${user.location}`,
        initials: user.initials,
        time: 'Just now',
        title: newPostTitle.trim() || 'Kenya AI Automation Question',
        content: newPostText.trim(),
        likes: 1,
        replies: 0
      },
      ...posts
    ]);
    setNewPostTitle('');
    setNewPostText('');
  };

  return (
    <div className="p-6 lg:p-10 space-y-6 max-w-4xl">
      <div>
        <div className="flex items-center gap-2 mb-1">
          <span className="text-[10px] font-bold text-[#F5A623] uppercase tracking-widest font-mono">
            Afridemy Community Hub
          </span>
          <span className="text-[9px] font-bold font-mono px-2 py-0.5 bg-[#12102A] text-white rounded">
            NAIROBI & REGIONAL DEVELOPERS
          </span>
        </div>
        <h1 className="text-3xl font-black text-[#12102A] tracking-tight">
          Learner Discussions & Agent Showcases
        </h1>
        <p className="text-xs text-[#12102A]/60 mt-1 font-medium">
          Share prompt breakthroughs, discuss Safaricom M-Pesa webhooks, and benchmark verified portfolios.
        </p>
      </div>

      {/* Post creator */}
      <form onSubmit={handleCreatePost} className="bg-white border border-[#12102A]/10 rounded-2xl p-5 shadow-xs space-y-3">
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="Topic / Question title (e.g. Daraja STK Push Callback Handling)"
          className="w-full text-xs font-bold text-[#12102A] p-2.5 bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl focus:outline-hidden focus:border-[#F5A623]"
        />
        <textarea
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
          placeholder="Share your breakthrough, prompt technique, or question for Nairobi AI engineers..."
          rows={3}
          className="w-full text-xs text-[#12102A] p-2.5 bg-[#FAF9FC] border border-[#12102A]/10 rounded-xl focus:outline-hidden focus:border-[#F5A623] leading-relaxed resize-none font-medium"
        />
        <div className="flex items-center justify-between pt-1">
          <span className="text-[11px] text-[#12102A]/50 font-mono">
            Posting as <b>{user.name}</b> ({user.location})
          </span>
          <button
            type="submit"
            disabled={!newPostText.trim()}
            className="px-4 py-2 bg-[#12102A] hover:bg-[#1c1940] disabled:opacity-40 text-white text-xs font-bold rounded-xl flex items-center gap-1.5 cursor-pointer transition-colors shadow-xs"
          >
            <Send className="w-3.5 h-3.5 text-[#F5A623]" />
            Post Discussion
          </button>
        </div>
      </form>

      {/* Post list */}
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white border border-[#12102A]/10 rounded-2xl p-6 shadow-xs">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-full bg-[#12102A] text-[#F5A623] flex items-center justify-center font-black text-xs font-mono">
                  {post.initials}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-[#12102A] leading-none">{post.author}</h4>
                  <span className="text-[10px] text-[#12102A]/50 font-mono mt-0.5 block">{post.role} • {post.time}</span>
                </div>
              </div>
            </div>

            <h3 className="text-sm font-bold text-[#12102A] mt-2 mb-1">{post.title}</h3>
            <p className="text-xs text-[#12102A]/80 leading-relaxed font-medium">{post.content}</p>

            <div className="flex items-center gap-4 mt-4 pt-3 border-t border-[#12102A]/5 text-xs text-[#12102A]/60 font-semibold">
              <button 
                onClick={() => {
                  setPosts(posts.map(p => p.id === post.id ? { ...p, likes: p.likes + 1 } : p));
                }}
                className="flex items-center gap-1.5 hover:text-[#F5A623] transition-colors cursor-pointer"
              >
                <ThumbsUp className="w-3.5 h-3.5" />
                {post.likes} Upvotes
              </button>
              <button className="flex items-center gap-1.5 hover:text-[#12102A] transition-colors cursor-pointer">
                <MessageSquare className="w-3.5 h-3.5" />
                {post.replies} Replies
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
