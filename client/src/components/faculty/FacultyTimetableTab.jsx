import React, { useState } from 'react';
import { 
  Calendar, 
  Clock, 
  Printer, 
  MapPin, 
  Users, 
  Layers
} from 'lucide-react';

const DAYS = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'];

export default function FacultyTimetableTab({ timetable = [] }) {
  const [selectedDay, setSelectedDay] = useState('All');

  const filteredSlots = timetable.filter(slot => {
    if (selectedDay === 'All') return true;
    return slot.day === selectedDay;
  });

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-2xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-slate-100 text-slate-900 border border-slate-200 font-bold text-sm flex items-center justify-center">
              <Calendar size={20} />
            </span>
            <div>
              <h2 className="text-xl font-extrabold text-slate-900 tracking-tight">
                Weekly Teaching Timetable & Lab Slots
              </h2>
              <p className="text-xs text-slate-500 mt-0.5">
                Official lecture slots, lab practicums, and office hours for Fall Semester 2026
              </p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Day Filters */}
          <div className="flex items-center p-1 bg-slate-100 rounded-xl border border-slate-200 text-xs font-bold">
            <button
              onClick={() => setSelectedDay('All')}
              className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedDay === 'All' ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
            >
              All Week
            </button>
            {DAYS.map(d => (
              <button
                key={d}
                onClick={() => setSelectedDay(d)}
                className={`px-3 py-1.5 rounded-lg transition-all cursor-pointer ${selectedDay === d ? 'bg-slate-900 text-white shadow-xs' : 'text-slate-600'}`}
              >
                {d.slice(0, 3)}
              </button>
            ))}
          </div>

          <button
            onClick={() => window.print()}
            className="px-3.5 py-2 bg-white hover:bg-slate-100 border border-slate-300 text-slate-900 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer shadow-2xs"
          >
            <Printer size={14} className="text-slate-700" />
            <span>Print Schedule</span>
          </button>
        </div>
      </div>

      {/* Timetable Schedule Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredSlots.map((slot, idx) => (
          <div 
            key={idx}
            className="bg-white rounded-2xl p-5 border border-slate-200 shadow-2xs hover:border-slate-300 transition-all flex flex-col justify-between space-y-3"
          >
            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs font-black uppercase tracking-wider bg-slate-100 text-slate-900 px-2.5 py-0.5 rounded border border-slate-200">
                  {slot.day}
                </span>
                <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${
                  slot.type === 'Lab' 
                    ? 'bg-slate-900 text-white' 
                    : slot.type === 'Office Hours'
                    ? 'bg-slate-200 text-slate-800'
                    : 'bg-slate-100 text-slate-900 border border-slate-300'
                }`}>
                  {slot.type}
                </span>
              </div>

              <h3 className="text-base font-extrabold text-slate-900 mt-2">{slot.course}</h3>
              
              <div className="mt-3 pt-3 border-t border-slate-100 space-y-1.5 text-xs text-slate-600 font-medium">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Time Slot:</span>
                  <strong className="text-slate-900 flex items-center gap-1">
                    <Clock size={12} className="text-slate-700" />
                    {slot.time}
                  </strong>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Allocated Venue:</span>
                  <span className="text-slate-900 font-bold flex items-center gap-1">
                    <MapPin size={12} className="text-slate-700" />
                    {slot.room}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Batch Code:</span>
                  <span className="text-slate-900 font-semibold">{slot.batch}</span>
                </div>
              </div>
            </div>
          </div>
        ))}

        {filteredSlots.length === 0 && (
          <div className="col-span-2 bg-white rounded-2xl p-12 text-center border border-slate-200 text-slate-400 text-xs">
            No teaching slots scheduled for {selectedDay}.
          </div>
        )}
      </div>
    </div>
  );
}
