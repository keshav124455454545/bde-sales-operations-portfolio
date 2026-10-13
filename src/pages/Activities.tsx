import React, { useState, useMemo } from 'react';
import {
  CalendarCheck,
  Search,
  Filter,
  Plus,
  PhoneCall,
  Mail,
  Users,
  Clock,
  CheckCircle2,
  AlertCircle,
  Calendar,
  Trash2,
  ExternalLink,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Activity, ActivityType } from '../types';
import { LogActivityModal } from '../components/modals/LogActivityModal';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const Activities: React.FC = () => {
  const { activities, toggleActivityCompleted, deleteActivity } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isLogOpen, setIsLogOpen] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const todayStr = new Date().toISOString().slice(0, 10);

  const filteredActivities = useMemo(() => {
    return activities.filter((act) => {
      const matchSearch =
        searchQuery === '' ||
        act.relatedTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        act.outcome.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = typeFilter === 'all' || act.type === typeFilter;
      return matchSearch && matchType;
    });
  }, [activities, searchQuery, typeFilter]);

  // Overdue follow-ups
  const overdueFollowUps = useMemo(() => {
    return activities.filter(
      (a) => !a.completed && a.nextFollowUpDate && a.nextFollowUpDate <= todayStr
    );
  }, [activities, todayStr]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <CalendarCheck className="w-5 h-5" />
            </div>
            CRM Activities & Follow-Up Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Log calls, emails, LinkedIn messaging cadences, discovery calls, and manage upcoming reminders.
          </p>
        </div>

        <button
          onClick={() => setIsLogOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
        >
          <Plus className="w-4 h-4" /> Log New Activity
        </button>
      </div>

      {/* Overdue Alert Banner if any */}
      {overdueFollowUps.length > 0 && (
        <div className="bg-rose-50 border border-rose-200 rounded-xl p-4 flex items-start gap-3 text-xs text-rose-800">
          <AlertCircle className="w-5 h-5 text-rose-600 shrink-0 mt-0.5" />
          <div className="flex-1">
            <h4 className="font-bold text-rose-900">
              {overdueFollowUps.length} Overdue Follow-Up Touchpoints Require Immediate Attention
            </h4>
            <p className="text-rose-700 mt-0.5">
              Consistent follow-up discipline is key to closing international B2B deals. Review pending tasks below.
            </p>
          </div>
        </div>
      )}

      {/* Filter and Search */}
      <div className="figma-card p-5 rounded-2xl flex flex-col sm:flex-row gap-3 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search activity notes, client names, or outcomes..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border rounded-lg focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
          >
            <option value="all">All Activity Types</option>
            <option value="Call">Calls</option>
            <option value="Email">Emails</option>
            <option value="LinkedIn Message">LinkedIn Messages</option>
            <option value="Meeting">Meetings</option>
            <option value="Research">Research</option>
            <option value="Proposal Prep">Proposal Prep</option>
            <option value="Follow-up">Follow-up</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Activity Timeline List */}
      <div className="figma-card rounded-2xl divide-y divide-slate-100 dark:divide-slate-800 overflow-hidden">
        {filteredActivities.map((act) => {
          const isOverdue =
            !act.completed && act.nextFollowUpDate && act.nextFollowUpDate <= todayStr;

          return (
            <div key={act.id} className="p-4 sm:p-5 flex items-start gap-4 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition">
              <button
                onClick={() => toggleActivityCompleted(act.id)}
                className={`mt-1 p-1 rounded-full transition ${
                  act.completed
                    ? 'text-emerald-600 bg-emerald-50'
                    : 'text-slate-300 hover:text-slate-500'
                }`}
                title={act.completed ? 'Mark uncompleted' : 'Mark completed'}
              >
                <CheckCircle2 className="w-5 h-5" />
              </button>

              <div className="flex-1 space-y-2 text-xs">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-slate-900 dark:text-white bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-lg text-[11px] border border-slate-200/60 dark:border-slate-700">
                      {act.type}
                    </span>
                    <span className="font-bold text-brand-700 text-sm">
                      {act.relatedTitle}
                    </span>
                    <span className="text-[11px] text-slate-400">({act.relatedType})</span>
                  </div>

                  <span className="text-slate-400 text-[11px] font-mono">{act.dateTime}</span>
                </div>

                <p className="text-slate-700 leading-relaxed font-medium">{act.summary}</p>

                <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-100 space-y-1">
                  <div>
                    <strong className="text-slate-700">Outcome:</strong> {act.outcome}
                  </div>
                  <div>
                    <strong className="text-slate-700">Next Action:</strong> {act.nextAction}
                  </div>
                </div>

                {act.nextFollowUpDate && (
                  <div className="flex items-center justify-between pt-1">
                    <span
                      className={`flex items-center gap-1 font-semibold text-[11px] ${
                        isOverdue ? 'text-rose-600' : 'text-slate-500'
                      }`}
                    >
                      <Clock className="w-3.5 h-3.5" /> Follow-Up Due: {act.nextFollowUpDate}
                      {isOverdue && (
                        <span className="bg-rose-100 text-rose-700 px-1.5 rounded text-[10px] font-bold ml-1">
                          OVERDUE
                        </span>
                      )}
                    </span>

                    <button
                      onClick={() => setDeletingId(act.id)}
                      className="text-slate-400 hover:text-rose-600 p-1"
                      title="Remove activity log"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      <LogActivityModal isOpen={isLogOpen} onClose={() => setIsLogOpen(false)} />

      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) deleteActivity(deletingId);
        }}
        title="Delete Activity Log?"
        message="Are you sure you want to delete this CRM activity history?"
        confirmLabel="Delete Activity"
        isDestructive={true}
      />
    </div>
  );
};
