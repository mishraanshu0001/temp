import React from 'react';
import { Users } from 'lucide-react';

export default function CourseCard({ course, onSelect }) {
  const fillPercentage = Math.round((course.enrolled / course.maxCapacity) * 100);

  return (
    <div 
      onClick={() => onSelect && onSelect(course)}
      className="group bg-white rounded-2xl border border-slate-200 shadow-2xs hover:shadow-md hover:border-slate-300 transition-all duration-200 cursor-pointer overflow-hidden flex flex-col justify-between"
    >
      {/* Top Image Banner */}
      <div className="relative h-36 w-full bg-slate-100 overflow-hidden">
        <img 
          src={course.image} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          loading="lazy"
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=600&auto=format&fit=crop&q=80';
          }}
        />
        {/* Floating Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-1.5">
          <span className="bg-slate-900/90 backdrop-blur-xs text-white text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
            {course.code}
          </span>
        </div>

        <div className="absolute top-3 right-3">
          <span className="bg-white/95 backdrop-blur-xs text-slate-900 text-xs font-bold px-2.5 py-1 rounded-md shadow-xs">
            {course.credits} Credits
          </span>
        </div>
      </div>

      {/* Card Content - Clear & Readable */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-bold text-sm text-slate-900 group-hover:text-slate-700 transition-colors line-clamp-1 leading-snug">
            {course.title}
          </h3>
          <p className="text-xs text-slate-500 font-medium mt-1 truncate">
            {course.instructor} • {course.department}
          </p>
        </div>

        {/* Enrollment & Footer */}
        <div className="mt-4 pt-3 border-t border-slate-100 space-y-2">
          <div className="flex justify-between items-center text-xs text-slate-600 font-medium">
            <span className="flex items-center gap-1.5">
              <Users size={13} className="text-slate-400" />
              {course.enrolled} / {course.maxCapacity} Enrolled
            </span>
            <span className="font-bold text-slate-800">{fillPercentage}%</span>
          </div>

          <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
            <div 
              className="h-full bg-slate-900 rounded-full transition-all duration-300"
              style={{ width: `${Math.min(fillPercentage, 100)}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
