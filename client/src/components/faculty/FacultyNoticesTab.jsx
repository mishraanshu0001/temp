import React, { useState } from 'react';
import { 
  Bell, 
  Plus, 
  Search, 
  Calendar, 
  CheckCircle2, 
  X, 
  Send,
  AlertCircle
} from 'lucide-react';

export default function FacultyNoticesTab({ notices = [], onCreateNotice }) {
  const [searchQuery, setSearchQuery] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    courseCode: 'All Courses',
    priority: 'Important',
    content: ''
  });
  const [submitting, setSubmitting] = useState(false);

  const filteredNotices = notices.filter(n => {
    const matchesSearch = n.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          n.content.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || n.priority.toLowerCase() === priorityFilter.toLowerCase();
    return matchesSearch && matchesPriority;
  });

  const handleCreateSubmit = async (e) => {
    e.preventDefault();
    if (!formData.title.trim() || !onCreateNotice) return;
    setSubmitting(true);
    await onCreateNotice(formData);
    setSubmitting(false);
    setShowModal(false);
    setFormData({ title: '', courseCode: 'All Courses', priority: 'Important', content: '' });
  };

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <Bell size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Course Notices & Class Announcements
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Broadcast urgent assignment updates, lab credentials & exam instructions to students
              </p>
            </div>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* Priority Filters */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            {['all', 'urgent', 'important', 'general'].map(p => (
              <button
                key={p}
                onClick={() => setPriorityFilter(p)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer capitalize ${
                  priorityFilter === p ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                {p}
              </button>
            ))}
          </div>

          <button
            onClick={() => setShowModal(true)}
            className="px-4 py-2 bg-slate-900 hover:bg-slate-800 text-white rounded-xl text-xs font-bold transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Plus size={15} />
            <span>Post New Notice</span>
          </button>
        </div>
      </div>

      {/* Notices Feed List */}
      <div className="space-y-4">
        {filteredNotices.map((n) => (
          <div 
            key={n.id}
            className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all space-y-3"
          >
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-2">
              <div className="flex items-center gap-2.5">
                <span className={`px-2.5 py-0.5 rounded text-[11px] font-bold border ${
                  n.priority === 'Urgent' 
                    ? 'bg-slate-900 text-white border-slate-900' 
                    : n.priority === 'Important'
                    ? 'bg-slate-100 text-slate-900 border-slate-300'
                    : 'bg-white text-slate-600 border-slate-200'
                }`}>
                  {n.priority}
                </span>
                <span className="font-mono text-xs font-bold bg-slate-100 text-slate-900 px-2 py-0.5 rounded">
                  {n.courseCode}
                </span>
                <span className="text-xs text-slate-400">• {n.date}</span>
              </div>
            </div>

            <h3 className="text-base font-extrabold text-slate-900">{n.title}</h3>
            <p className="text-sm text-slate-700 leading-relaxed font-medium">
              {n.content}
            </p>
          </div>
        ))}

        {filteredNotices.length === 0 && (
          <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
            No announcements found in this view.
          </div>
        )}
      </div>

      {/* Post Notice Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 bg-slate-900/40 backdrop-blur-xs flex items-center justify-center p-4">
          <div className="w-full max-w-lg bg-white rounded-3xl shadow-2xl p-6 space-y-5 border border-slate-200">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-extrabold text-slate-900 text-base flex items-center gap-2">
                <Bell size={18} className="text-slate-800" />
                Publish Course Announcement
              </h3>
              <button 
                onClick={() => setShowModal(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-800 hover:bg-slate-100"
              >
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateSubmit} className="space-y-3.5 text-xs">
              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Notice Title
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Lab 4 Submission Buffer Extension"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Target Section
                  </label>
                  <select
                    value={formData.courseCode}
                    onChange={(e) => setFormData({ ...formData, courseCode: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                  >
                    <option value="All Courses">All My Courses</option>
                    <option value="CS301">CS301: Cloud Computing</option>
                    <option value="CS204">CS204: Distributed Systems</option>
                    <option value="CS402">CS402: HPC Systems</option>
                  </select>
                </div>
                <div>
                  <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                    Priority Level
                  </label>
                  <select
                    value={formData.priority}
                    onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-semibold outline-none focus:border-slate-900"
                  >
                    <option value="Important">Important</option>
                    <option value="Urgent">Urgent</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block font-bold text-slate-700 uppercase tracking-wider mb-1">
                  Announcement Details
                </label>
                <textarea
                  rows={4}
                  required
                  value={formData.content}
                  onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                  placeholder="Detailed instructions or syllabus references..."
                  className="w-full p-2.5 bg-slate-50 border border-slate-200 rounded-xl text-slate-900 font-medium outline-none focus:border-slate-900 resize-none leading-relaxed"
                />
              </div>

              <div className="pt-3 flex items-center justify-end gap-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="px-4 py-2 rounded-xl text-slate-600 hover:bg-slate-100 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="px-5 py-2 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all shadow-xs cursor-pointer"
                >
                  {submitting ? 'Publishing...' : 'Broadcast Notice'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
