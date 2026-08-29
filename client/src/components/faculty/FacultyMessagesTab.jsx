import React, { useState } from 'react';
import { 
  MessageSquare, 
  Search, 
  Send, 
  User, 
  CheckCircle2, 
  Clock, 
  Sparkles,
  BookOpen
} from 'lucide-react';
import SmartIcon from '../common/SmartIcon';

const CANNED_FACULTY_TEMPLATES = [
  {
    label: 'Reference Lecture Slide',
    text: 'Please refer to Module 4 Lecture Slides (Slide 24-28) in our course catalog repository where the theoretical proof is detailed step-by-step.'
  },
  {
    label: 'Office Hours Invitation',
    text: 'I have office hours scheduled this Thursday at 4:30 PM in Academic Block B Room 308. Bring your code implementation so we can debug together.'
  },
  {
    label: 'Extension Approved (48h)',
    text: 'Your medical concession request has been noted and approved. You are granted a 48-hour submission buffer without late grading penalties.'
  }
];

export default function FacultyMessagesTab({ messages = [], onReplyMessage }) {
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

  const handleSendReply = async (e) => {
    e.preventDefault();
    if (!replyText.trim() || !selectedMessage) return;

    setIsSending(true);
    if (onReplyMessage) {
      await onReplyMessage({ messageId: selectedMessage.id, reply: replyText });
    }
    setLocalMessages(prev => prev.map(m => m.id === selectedMessage.id ? { ...m, status: 'Resolved' } : m));
    if (selectedMessage) {
      setSelectedMessage(prev => ({ ...prev, status: 'Resolved' }));
    }
    setReplyText('');
    setIsSending(false);
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <MessageSquare size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Student Doubts & Academic Inquiries Desk
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Answer conceptual questions, grant assignment waivers & leverage AI Copilot guidance
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setFilterStatus('all')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterStatus === 'all' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              All ({localMessages.length})
            </button>
            <button
              onClick={() => setFilterStatus('pending')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterStatus === 'pending' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              Pending ({localMessages.filter(m => m.status === 'Pending').length})
            </button>
            <button
              onClick={() => setFilterStatus('resolved')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${filterStatus === 'resolved' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              Resolved ({localMessages.filter(m => m.status === 'Resolved').length})
            </button>
          </div>
        </div>
      </div>

      {/* 2-Column Split: Message List (Left 5) & Thread (Right 7) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Left Column (5 Cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl p-4 border border-slate-200 shadow-2xs space-y-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={14} />
            <input
              type="text"
              placeholder="Search doubts..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-3 py-2 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 font-medium"
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
                      ? 'bg-slate-900 text-white border-slate-900 shadow-sm' 
                      : 'bg-white hover:bg-slate-50 border-slate-200'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2">
                    <div className="flex items-center gap-2 min-w-0">
                      <div className={`w-7 h-7 rounded-lg font-bold flex items-center justify-center text-[10px] shrink-0 ${
                        isSelected ? 'bg-white text-slate-900' : 'bg-slate-900 text-white'
                      }`}>
                        {m.avatar}
                      </div>
                      <span className={`font-extrabold text-xs truncate ${isSelected ? 'text-white' : 'text-slate-900'}`}>{m.studentName}</span>
                    </div>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold border ${
                      isSelected 
                        ? 'bg-slate-800 text-white border-slate-700' 
                        : m.status === 'Pending' 
                        ? 'bg-slate-100 text-slate-900 border-slate-300' 
                        : 'bg-white text-slate-600 border-slate-200'
                    }`}>
                      {m.status}
                    </span>
                  </div>

                  <h4 className={`text-xs font-bold mt-2 truncate ${isSelected ? 'text-white' : 'text-slate-800'}`}>{m.subject}</h4>
                  <p className={`text-[11px] line-clamp-2 mt-0.5 font-medium leading-relaxed ${isSelected ? 'text-slate-300' : 'text-slate-500'}`}>
                    {m.content}
                  </p>

                  <div className={`mt-2.5 pt-2 border-t flex items-center justify-between text-[10px] font-medium ${
                    isSelected ? 'border-slate-800 text-slate-400' : 'border-slate-100 text-slate-400'
                  }`}>
                    <span>{m.course}</span>
                    <span>{m.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {filteredMessages.length === 0 && (
              <p className="text-xs text-slate-400 py-8 text-center">No student inquiries found.</p>
            )}
          </div>
        </div>

        {/* Right Column (7 Cols) */}
        {selectedMessage ? (
          <div className="lg:col-span-7 bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs space-y-5">
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded bg-slate-900 text-white text-[10px] font-mono font-bold">
                    {selectedMessage.course}
                  </span>
                  <span className="text-xs text-slate-400">• {selectedMessage.timestamp}</span>
                </div>
                <h3 className="text-base font-extrabold text-slate-900 mt-1">{selectedMessage.subject}</h3>
                <p className="text-xs text-slate-500 font-medium">From: <strong className="text-slate-800">{selectedMessage.studentName}</strong> ({selectedMessage.studentEmail})</p>
              </div>

              <span className={`px-2.5 py-1 rounded-full text-xs font-bold border shrink-0 ${
                selectedMessage.status === 'Pending' ? 'bg-slate-100 text-slate-900 border-slate-300' : 'bg-white text-slate-600 border-slate-200'
              }`}>
                {selectedMessage.status}
              </span>
            </div>

            <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-800 leading-relaxed font-medium">
              "{selectedMessage.content}"
            </div>

            {/* AI Copilot Recommendation */}
            {selectedMessage.aiRecommendation && (
              <div className="p-4 rounded-xl bg-slate-50 border border-slate-300 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-extrabold text-slate-900 flex items-center gap-1.5">
                    <SmartIcon size={15} className="text-slate-800" />
                    AI Teaching Copilot Recommendation
                  </span>
                  <button
                    type="button"
                    onClick={() => setReplyText(selectedMessage.aiRecommendation)}
                    className="text-[11px] font-bold text-slate-900 hover:underline cursor-pointer"
                  >
                    Use in Reply
                  </button>
                </div>
                <p className="text-xs text-slate-700 leading-relaxed font-medium">
                  {selectedMessage.aiRecommendation}
                </p>
              </div>
            )}

            {/* Quick Canned Response Buttons */}
            <div>
              <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block mb-2">
                Quick Canned Faculty Advice
              </span>
              <div className="flex flex-wrap gap-2">
                {CANNED_FACULTY_TEMPLATES.map((t, idx) => (
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
                placeholder="Type your official explanation or guidance..."
                className="w-full p-3.5 bg-slate-50 border border-slate-200 rounded-xl text-xs text-slate-900 outline-none focus:border-slate-900 focus:bg-white transition-all font-medium resize-none leading-relaxed"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={isSending || !replyText.trim()}
                  className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs flex items-center gap-2 transition-all cursor-pointer shadow-xs disabled:opacity-50"
                >
                  <Send size={13} />
                  <span>{isSending ? 'Sending Reply...' : 'Send Resolution'}</span>
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="lg:col-span-7 bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
            Select an inquiry from the left to view details.
          </div>
        )}

      </div>
    </div>
  );
}
