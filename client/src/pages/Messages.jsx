import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { 
  MessageSquare, 
  Send, 
  Bot, 
  CheckCircle2, 
  Clock, 
  User,
  Search,
  Check,
  CornerDownLeft,
  FileCode,
  Paperclip,
  CheckCircle,
  HelpCircle
} from 'lucide-react';
import SmartIcon from '../components/common/SmartIcon';

export default function Messages() {
  const { user } = useAuth();
  const [selectedDoubtId, setSelectedDoubtId] = useState(1);
  const [replyText, setReplyText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all'); // 'all' | 'open' | 'answered'
  const [toast, setToast] = useState(null);

  const [doubts, setDoubts] = useState([
    { 
      id: 1, 
      studentName: 'Aarav Sharma',
      studentAvatar: 'AS',
      studentEmail: 'aarav.sharma@univ.edu',
      subject: 'CS301', 
      courseTitle: 'Advanced Python & Software Architecture',
      topic: 'Time Complexity of DFS Traversal', 
      status: 'answered', 
      aiResolved: true,
      timestamp: '2 hours ago',
      query: "I don't understand why DFS is O(V + E) when represented as an adjacency list, but O(V^2) for an adjacency matrix. Can someone explain the loop execution?",
      aiResponse: "In an Adjacency List, we only iterate over the actual edges connected to each vertex, summing to 2E across all V vertices -> O(V + E). In an Adjacency Matrix, for each vertex we must check all V possible array columns regardless of edge existence -> O(V * V) = O(V^2).",
      facultyReply: "Exactly as summarized by the AI Copilot above. Remember that each vertex is visited once (O(V)), and during its visit we only loop through its actual neighbors in the list (O(E))."
    },
    { 
      id: 2, 
      studentName: 'Priya Patel',
      studentAvatar: 'PP',
      studentEmail: 'priya.patel@univ.edu',
      subject: 'CS201', 
      courseTitle: 'Data Structures & Algorithms',
      topic: 'Red-Black Tree Balance Invariants', 
      status: 'open', 
      aiResolved: false,
      timestamp: '4 hours ago',
      query: "Why do red nodes require both children to be black? Does violating this break the black-height property?",
      aiResponse: "If two red nodes are consecutive (a red child under a red parent), the longest possible root-to-leaf path would exceed twice the shortest path length, violating the balanced O(log n) height invariant.",
      facultyReply: null
    },
    { 
      id: 3, 
      studentName: 'Rohan Gupta',
      studentAvatar: 'RG',
      studentEmail: 'rohan.gupta@univ.edu',
      subject: 'CS402', 
      courseTitle: 'Machine Learning & Neural Networks',
      topic: 'Backpropagation Vectorization in Batch Norm', 
      status: 'answered', 
      aiResolved: false,
      timestamp: 'Yesterday',
      query: "How do we compute the gradient w.r.t mini-batch variance without computing redundant outer products in PyTorch?",
      aiResponse: "Batch normalization gradients can be vectorized by factoring out the mean subtraction term, reducing the calculation to two element-wise matrix multiplications.",
      facultyReply: "Refer to Module 4, Slide 28 where we derive the Jacobian factorization without allocating intermediate N×D outer product matrices."
    }
  ]);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const selectedDoubt = doubts.find(d => d.id === selectedDoubtId) || doubts[0];

  const handleSendReply = (e) => {
    if (e) e.preventDefault();
    if (!replyText.trim()) return;

    setDoubts(prev => prev.map(d => {
      if (d.id === selectedDoubt.id) {
        return {
          ...d,
          status: 'answered',
          facultyReply: replyText
        };
      }
      return d;
    }));

    setReplyText('');
    showToast('Reply submitted and sent to student.');
  };

  const handleInsertAIResponse = () => {
    if (selectedDoubt?.aiResponse) {
      setReplyText(selectedDoubt.aiResponse);
      showToast('AI response copied into reply box.');
    }
  };

  const filteredDoubts = doubts.filter(d => {
    const matchesSearch = d.topic.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          d.studentName.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          d.subject.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || d.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const openCount = doubts.filter(d => d.status === 'open').length;
  const answeredCount = doubts.filter(d => d.status === 'answered').length;

  return (
    <div className="max-w-7xl mx-auto space-y-6 pb-12">
      {/* Toast Notification */}
      {toast && (
        <div className="fixed bottom-6 right-6 z-50 p-4 rounded-xl shadow-lg bg-slate-900 border border-slate-700 text-white flex items-center gap-2.5 animate-in slide-in-from-bottom-5 text-sm font-semibold">
          <CheckCircle2 size={18} className="text-emerald-400" />
          {toast}
        </div>
      )}

      {/* Header Banner */}
      <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-900 text-white font-bold text-sm flex items-center justify-center">
              <MessageSquare size={20} />
            </span>
            <h1 className="text-2xl font-extrabold text-slate-900 tracking-tight">
              Student Inquiries & Doubts Hub
            </h1>
          </div>
          <p className="text-sm text-slate-500 mt-1">
            Real-time student academic doubt resolution queue with automated AI Copilot answers.
          </p>
        </div>

        <div className="flex items-center gap-2.5">
          <div className="px-3.5 py-2 rounded-xl bg-amber-50 border border-amber-200 text-xs font-bold text-amber-800 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-amber-500" />
            {openCount} Open Questions
          </div>
          <div className="px-3.5 py-2 rounded-xl bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            {answeredCount} Answered
          </div>
        </div>
      </div>

      {/* Main Inbox Communication Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 min-h-[640px]">
        {/* Left Side: Question Queue List (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-slate-200 shadow-2xs flex flex-col overflow-hidden">
          {/* Queue Header & Search */}
          <div className="p-4 border-b border-slate-100 bg-slate-50/70 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm font-extrabold text-slate-900">Student Doubts Queue</span>
              <span className="text-xs font-bold text-slate-500 bg-white border border-slate-200 px-2 py-0.5 rounded-md">
                {doubts.length} Total
              </span>
            </div>

            {/* Search Input */}
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={15} />
              <input
                type="text"
                placeholder="Search by topic, student, course..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-3 py-2 bg-white border border-slate-200 rounded-xl text-xs outline-none focus:border-slate-900 transition-all"
              />
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 pt-1">
              <button
                onClick={() => setStatusFilter('all')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  statusFilter === 'all' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                All ({doubts.length})
              </button>
              <button
                onClick={() => setStatusFilter('open')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  statusFilter === 'open' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Open ({openCount})
              </button>
              <button
                onClick={() => setStatusFilter('answered')}
                className={`px-3 py-1 text-xs font-bold rounded-lg transition-all ${
                  statusFilter === 'answered' ? 'bg-slate-900 text-white' : 'bg-white text-slate-600 hover:bg-slate-100 border border-slate-200'
                }`}
              >
                Answered ({answeredCount})
              </button>
            </div>
          </div>

          {/* Doubts List Items */}
          <div className="divide-y divide-slate-100 overflow-y-auto flex-1">
            {filteredDoubts.map((d) => {
              const isSelected = selectedDoubt.id === d.id;
              const isOpen = d.status === 'open';

              return (
                <div
                  key={d.id}
                  onClick={() => setSelectedDoubtId(d.id)}
                  className={`p-4 cursor-pointer transition-all ${
                    isSelected ? 'bg-slate-50 border-l-4 border-slate-900' : 'hover:bg-slate-50/60'
                  }`}
                >
                  <div className="flex items-center justify-between gap-2 mb-1.5">
                    <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 border border-slate-200 px-2 py-0.5 rounded">
                      {d.subject}
                    </span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isOpen ? 'bg-amber-50 text-amber-800 border border-amber-200' : 'bg-slate-100 text-slate-800 border border-slate-200'
                    }`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${isOpen ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                      {isOpen ? 'Open' : 'Answered'}
                    </span>
                  </div>

                  <h4 className="font-extrabold text-sm text-slate-900 line-clamp-1 leading-snug">{d.topic}</h4>
                  <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">{d.query}</p>

                  <div className="mt-3 flex items-center justify-between text-xs text-slate-400 font-medium">
                    <div className="flex items-center gap-1.5">
                      <div className="w-5 h-5 rounded-full bg-slate-200 text-slate-800 font-bold text-[10px] flex items-center justify-center">
                        {d.studentAvatar}
                      </div>
                      <span className="text-slate-700 font-semibold">{d.studentName}</span>
                    </div>
                    <span>{d.timestamp}</span>
                  </div>
                </div>
              );
            })}

            {filteredDoubts.length === 0 && (
              <div className="p-8 text-center text-slate-400 text-xs">
                No doubts match your search.
              </div>
            )}
          </div>
        </div>

        {/* Right Side: Conversation & Resolution Workspace (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-2xl border border-slate-200 shadow-2xs p-6 flex flex-col justify-between">
          <div className="space-y-5">
            {/* Conversation Header */}
            <div className="flex items-start justify-between pb-4 border-b border-slate-100 gap-4">
              <div>
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-white bg-slate-900 px-2.5 py-0.5 rounded">
                    {selectedDoubt.subject}
                  </span>
                  <span className="text-xs text-slate-500 font-medium">{selectedDoubt.courseTitle}</span>
                </div>
                <h3 className="font-extrabold text-lg text-slate-900 mt-1.5 leading-snug">{selectedDoubt.topic}</h3>
                <p className="text-xs text-slate-400 mt-0.5">
                  Asked by <strong className="text-slate-800">{selectedDoubt.studentName}</strong> ({selectedDoubt.studentEmail}) • {selectedDoubt.timestamp}
                </p>
              </div>

              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold shrink-0 ${
                selectedDoubt.status === 'open' 
                  ? 'bg-amber-50 text-amber-800 border border-amber-200' 
                  : 'bg-emerald-50 text-emerald-800 border border-emerald-200'
              }`}>
                <span className={`w-2 h-2 rounded-full ${selectedDoubt.status === 'open' ? 'bg-amber-500' : 'bg-emerald-500'}`} />
                {selectedDoubt.status === 'open' ? 'Pending Response' : 'Answered'}
              </span>
            </div>

            {/* Student Question Box */}
            <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-slate-200 text-slate-900 font-extrabold text-xs flex items-center justify-center">
                    {selectedDoubt.studentAvatar}
                  </div>
                  <div>
                    <span className="text-sm font-bold text-slate-900 block">{selectedDoubt.studentName}</span>
                    <span className="text-xs text-slate-400 font-medium">Student Inquiry</span>
                  </div>
                </div>
                <span className="text-xs text-slate-400 font-medium">{selectedDoubt.timestamp}</span>
              </div>
              <p className="text-sm text-slate-800 leading-relaxed font-normal">{selectedDoubt.query}</p>
            </div>

            {/* AI Copilot Solution Box (Smart Icon Powered) */}
            {selectedDoubt.aiResponse && (
              <div className="p-5 rounded-2xl bg-slate-50/90 border border-slate-200 space-y-2.5">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm font-bold text-slate-900">
                    <SmartIcon size={18} className="text-slate-900" />
                    <span>AI Copilot Verified Solution</span>
                  </div>
                  <button
                    onClick={handleInsertAIResponse}
                    className="px-2.5 py-1 rounded-lg bg-white hover:bg-slate-100 border border-slate-200 text-slate-800 text-xs font-bold shadow-2xs flex items-center gap-1 transition-all cursor-pointer"
                    title="Insert AI solution into your reply editor"
                  >
                    <CornerDownLeft size={13} />
                    <span>Use in Reply</span>
                  </button>
                </div>
                <p className="text-sm text-slate-700 leading-relaxed">{selectedDoubt.aiResponse}</p>
              </div>
            )}

            {/* Faculty / HOD Official Reply Box */}
            {selectedDoubt.facultyReply && (
              <div className="p-5 rounded-2xl bg-slate-100 border border-slate-200">
                <div className="flex items-center gap-2 mb-2">
                  <span className="w-2 h-2 rounded-full bg-slate-900" />
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-600">Faculty Official Answer</span>
                </div>
                <p className="text-sm text-slate-900 font-medium leading-relaxed">{selectedDoubt.facultyReply}</p>
              </div>
            )}
          </div>

          {/* Quick Response Templates & Reply Composer */}
          <div className="mt-8 pt-5 border-t border-slate-100 space-y-3">
            <div className="flex items-center justify-between text-xs text-slate-500 font-semibold">
              <span>Send Official Response</span>
              <div className="flex items-center gap-2">
                <span className="text-slate-400">Quick responses:</span>
                <button
                  type="button"
                  onClick={() => setReplyText("Approved. Please review the recommended derivation in the lecture slides.")}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
                >
                  Slide Reference
                </button>
                <button
                  type="button"
                  onClick={() => setReplyText("Great question! Let's review this together during Friday's office hours session.")}
                  className="px-2 py-0.5 rounded bg-slate-100 hover:bg-slate-200 text-slate-700 text-[11px] font-medium"
                >
                  Office Hours
                </button>
              </div>
            </div>

            <form onSubmit={handleSendReply} className="space-y-3">
              <textarea
                rows={3}
                value={replyText}
                onChange={(e) => setReplyText(e.target.value)}
                placeholder="Type your explanation or review notes for the student..."
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:border-slate-900 focus:bg-white transition-all resize-none"
              />

              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-400">
                  Pressing <strong>Reply & Resolve</strong> notifies the student immediately via email.
                </span>
                <button
                  type="submit"
                  disabled={!replyText.trim()}
                  className="px-6 py-2.5 bg-slate-900 hover:bg-slate-800 disabled:opacity-50 text-white font-bold text-sm rounded-xl flex items-center gap-2 transition-all cursor-pointer shadow-xs"
                >
                  <Send size={15} />
                  Reply & Resolve
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
