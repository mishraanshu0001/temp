import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  CheckCircle2, 
  Clock, 
  ArrowRight,
  Sparkles,
  BookOpen
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

const CANNED_ADVISOR_TEMPLATES = [
  {
    label: 'Tutoring Center Referral',
    text: 'Please visit the Peer Tutoring Lab at Academic Block B Room 204 (Mon-Thu 4-6 PM) to review course concepts with our department teaching assistants.'
  },
  {
    label: 'Office Hours Invitation',
    text: 'I have set aside 30 minutes during my office hours this Wednesday at 3:00 PM in Room 304. Please bring your course assignments so we can map out a study plan.'
  },
  {
    label: 'Medical Waiver Endorsement',
    text: 'I have reviewed your medical discharge certificate. Your attendance concession request has been officially endorsed and submitted to the Academic Registrar.'
  }
];

export default function AdvisorMessagesTab({ messages = [] }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [selectedMessage, setSelectedMessage] = useState(messages[0] || null);
  const [replyText, setReplyText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [localMessages, setLocalMessages] = useState(messages);

  const filteredMessages = localMessages.filter(m => {
    const matchesSearch = m.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          m.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filterStatus === 'all' || m.status.toLowerCase() === filterStatus.toLowerCase();
    return matchesSearch && matchesFilter;
  });

  const handleSendReply = (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setIsSending(true);
    setTimeout(() => {
      setLocalMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, status: 'Resolved' } : m));
      if (selectedMessage) {
        setSelectedMessage(prev => ({ ...prev, status: 'Resolved' }));
      }
      setReplyText('');
      setIsSending(false);
    }, 400);
  };

  const handleApplyAiResponse = (text) => {
    setReplyText(text);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-sky-50 text-sky-900 border border-sky-200 font-bold text-sm flex items-center justify-center">
              <MessageSquare size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Advisee Communication & Inquiries
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Resolve academic concerns, grant approvals & send tailored counseling guidance
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Filter Status Tabs */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterStatus === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              All ({localMessages.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterStatus === 'pending' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              Pending ({localMessages.filter(m => m.status === 'Pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1.5 rounded-lg transition-all ${filterStatus === 'resolved' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              Resolved ({localMessages.filter(m => m.status === 'Resolved').length})
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Message List (Left 5) & Thread Details (Right 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column: Messages List (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-sky-100 shadow-2xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-sky-50/40 border border-sky-200/80 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 font-medium"
            />
          </div>

          <div className="space-y-2 max-h-[600px] overflow-y-auto pr-1">
            {filteredMessages.map((m) => {
              const isSelected = selectedMessage?.id === m.id;
              return (
                <div
                  key={m.id}
                  onClick={() => setSelectedMessage(m)}
                  className={`p-3.5 rounded-xl border transition-all cursor-pointer text-left ${
                    isSelected 
                      ? 'bg-sky-50 border-sky-300 ring-1 ring-sky-300' 
                      : 'bg-white hover:bg-sky-50/30 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className="w-7 h-7 rounded-lg bg-slate-900 text-white font-bold flex items-center justify-center text-[10px] shrink-0">
                        {m.avatar}
                      </div>
                      <span className="font-extrabold text-xs text-slate-900 truncate">{m.studentName}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      m.status === 'Pending' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
                    }`}>
                      {m.status}
                    </span>
                  </div>

                  <h4 className="text-xs font-bold text-slate-800 mt-2 truncate">{m.subject}</h4>
                  <p className="text-[11px] text-slate-500 line-clamp-2 mt-0.5 font-medium leading-relaxed">
                    {m.content}
                  </p>

                  <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between text-[10px] text-slate-400 font-medium">
                    <span>{m.course}</span>
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {filteredMessages.length === 0 && (
              <p className="text-xs text-slate-400 py-8 text-center">No inquiries found.</p>
            )}
          </div>
        </div>

        {/* Right Column: Conversation View & AI Copilot (7 Cols) */}
        {selectedMessage ? (
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-sky-100 shadow-2xs space-y-5">
            {/* Thread Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-sky-50 text-sky-900 border border-sky-200 text-[10px] font-bold uppercase">
                    {selectedMessage.course}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedMessage.timestamp}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedMessage.subject}</h3>
                <p className="text-xs text-slate-500 font-medium">From: <strong className="text-slate-800">{selectedMessage.studentName}</strong> ({selectedMessage.studentEmail})</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${
                selectedMessage.status === 'Pending' ? 'bg-amber-50 text-amber-900 border-amber-200' : 'bg-emerald-50 text-emerald-900 border-emerald-200'
              }`}>
                {selectedMessage.status}
              </span>
            </div>

            {/* Student Message Body */}
            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200/80 text-xs text-slate-800 leading-relaxed font-medium">
              "{selectedMessage.content}"
            </div>

            {/* AI Copilot Recommended Solution */}
            {selectedMessage.aiRecommendation && (
              <div className="p-4 rounded-xl bg-sky-50/70 border border-sky-200 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-sky-950 flex items-center gap-1.5">
                    <SmartIcon size={15} className="text-sky-700" />
                    AI Advisory Copilot Recommendation
                  </span>
                  <button
                    type="button"
                    onClick={() => handleApplyAiResponse(selectedMessage.aiRecommendation)}
                    className="text-[11px] font-bold text-sky-900 hover:text-sky-950 underline cursor-pointer"
                  >
                    Use in Reply
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed">
                  {selectedMessage.aiRecommendation}
                </p>
              </div>
            )}

            {/* Quick Canned Responses */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Canned Advice Templates
              </span>
              <div className="flex flex-wrap gap-2">
                {CANNED_ADVISOR_TEMPLATES.map((t, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setReplyText(t.text)}
                    className="px-3 py-1.5 rounded-lg bg-slate-50 hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-semibold transition-all cursor-pointer shadow-2xs"
                  >
                    {t.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Reply Input Form */}
            <form onSubmit={handleSendReply} className="space-y-3 pt-2">
              <textarea
                rows={4}
                required
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your official counseling reply to the student..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium resize-none leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSending || !replyText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>{isSending ? 'Sending Reply...' : 'Send Advisory Response'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl p-12 text-center border border-sky-100 text-slate-400">
            Select an inquiry from the left to view details.
          </div>
        )}

      </div>
    </div>
  );
}
