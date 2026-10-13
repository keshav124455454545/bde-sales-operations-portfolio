import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Kanban,
  DollarSign,
  AlertTriangle,
  ChevronRight,
  ChevronLeft,
  Calendar,
  Clock,
  Filter,
  ArrowRight,
  Plus,
  ExternalLink,
  Sparkles,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Lead, PipelineStage } from '../types';
import { Badge } from '../components/common/Badge';
import { AddLeadModal } from '../components/modals/AddLeadModal';

const STAGES: PipelineStage[] = [
  'New Lead',
  'Contacted',
  'Qualified',
  'Meeting Scheduled',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];

export const Pipeline: React.FC = () => {
  const { leads, updateLeadStage, services, stats } = useApp();
  const navigate = useNavigate();

  const [serviceFilter, setServiceFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);

  // Filter leads
  const filteredLeads = useMemo(() => {
    return leads.filter((l) => {
      const matchService = serviceFilter === 'all' || l.serviceOfInterest === serviceFilter;
      const matchPriority = priorityFilter === 'all' || l.priority === priorityFilter;
      return matchService && matchPriority;
    });
  }, [leads, serviceFilter, priorityFilter]);

  // Stage transitions
  const handleMoveStage = (leadId: string, currentStage: PipelineStage, direction: 'prev' | 'next') => {
    const currentIndex = STAGES.indexOf(currentStage);
    if (currentIndex === -1) return;
    const nextIndex = direction === 'next' ? currentIndex + 1 : currentIndex - 1;
    if (nextIndex >= 0 && nextIndex < STAGES.length) {
      updateLeadStage(leadId, STAGES[nextIndex]);
    }
  };

  // Helper to detect stalled deals (>7 days inactive)
  const isStalled = (lead: Lead) => {
    if (lead.status === 'Won' || lead.status === 'Lost') return false;
    const lastDate = new Date(lead.lastContactDate).getTime();
    const now = Date.now();
    const diffDays = (now - lastDate) / (1000 * 3600 * 24);
    return diffDays > 7;
  };

  return (
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Kanban className="w-5 h-5" />
            </div>
            Sales Pipeline Kanban
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Visual deal flow across 8 international sales milestones with velocity tracking and stalled deal alerts.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Add Deal Card
          </button>
        </div>
      </div>

      {/* Commercial Summary Banner */}
      <div className="bg-white dark:bg-[#131c2e] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm flex flex-wrap items-center justify-between gap-4 transition-all">
        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
              Active Pipeline:
            </span>
            <span className="text-xl font-extrabold text-emerald-600 dark:text-emerald-400 mt-0.5 block">
              ${stats.pipelineValue.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Weighted pipeline total</span>
          </div>

          <div className="border-l border-slate-200 dark:border-slate-800 pl-6">
            <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-bold tracking-wider">
              Closed Won:
            </span>
            <span className="text-xl font-extrabold text-slate-900 dark:text-white mt-0.5 block">
              ${stats.wonDealValue.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-slate-500 dark:text-slate-400 block">{stats.dealsWon} contracts secured</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 text-xs flex-wrap">
          <div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Services</option>
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>
      </div>

      {/* Kanban Board Columns Container */}
      <div className="overflow-x-auto pb-6">
        <div className="flex gap-4 min-w-[1750px] items-start">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            const stageValue = stageLeads.reduce((acc, l) => acc + (l.estimatedDealValue || 0), 0);

            return (
              <div
                key={stage}
                className="w-72 bg-slate-100/70 dark:bg-[#0f172a]/90 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 flex flex-col max-h-[78vh] shrink-0 shadow-sm"
              >
                {/* Column Header */}
                <div className="p-3.5 border-b border-slate-200/80 dark:border-slate-800 bg-white/80 dark:bg-[#131c2e]/90 rounded-t-2xl">
                  <div className="flex items-center justify-between">
                    <Badge variant="stage" value={stage} />
                    <span className="text-xs font-bold text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800 px-2.5 py-0.5 rounded-full border border-slate-200/80 dark:border-slate-700">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 mt-2.5 flex justify-between">
                    <span>Est. Value:</span>
                    <span className="text-slate-900 dark:text-white font-bold">${stageValue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Card List */}
                <div className="p-2.5 space-y-3 overflow-y-auto flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="py-12 text-center text-[11px] text-slate-400 dark:text-slate-500 italic">
                      No active deals
                    </div>
                  ) : (
                    stageLeads.map((lead) => {
                      const stalled = isStalled(lead);
                      const isOverdue =
                        lead.status !== 'Won' &&
                        lead.status !== 'Lost' &&
                        lead.nextFollowUpDate <= new Date().toISOString().slice(0, 10);

                      return (
                        <div
                          key={lead.id}
                          className={`bg-white dark:bg-[#131c2e] p-3.5 rounded-xl border shadow-card hover:shadow-card-hover hover:-translate-y-0.5 transition-all ${
                            stalled
                              ? 'border-amber-300 dark:border-amber-700/80 bg-amber-50/20 dark:bg-amber-950/20'
                              : 'border-slate-200/80 dark:border-slate-800'
                          }`}
                        >
                          {/* Stalled deal warning */}
                          {stalled && (
                            <div className="mb-2 flex items-center gap-1.5 text-[10px] text-amber-700 dark:text-amber-300 font-semibold bg-amber-100/70 dark:bg-amber-950/70 px-2 py-0.5 rounded-md">
                              <AlertTriangle className="w-3 h-3 text-amber-600 dark:text-amber-400" /> Stalled (&gt;7d inactive)
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-1 mb-1.5">
                            <h4
                              onClick={() => navigate(`/leads?id=${lead.id}`)}
                              className="font-bold text-slate-900 dark:text-white text-xs hover:text-brand-600 dark:hover:text-brand-400 cursor-pointer line-clamp-1 transition"
                              title={lead.companyName}
                            >
                              {lead.companyName}
                            </h4>
                            <Badge variant="priority" value={lead.priority} />
                          </div>

                          <div className="text-[11px] text-slate-500 dark:text-slate-400">
                            {lead.contactPerson}
                          </div>

                          <div className="text-[11px] font-medium text-brand-600 dark:text-brand-400 truncate mt-1">
                            {lead.serviceOfInterest}
                          </div>

                          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs font-bold text-emerald-600 dark:text-emerald-400">
                            <span className="bg-emerald-50 dark:bg-emerald-950/60 px-2 py-0.5 rounded-md border border-emerald-200/80 dark:border-emerald-800/80">
                              ${lead.estimatedDealValue.toLocaleString()}
                            </span>
                            <span className="text-[10px] font-normal text-slate-400 dark:text-slate-500">
                              {lead.source}
                            </span>
                          </div>

                          {/* Next follow-up info */}
                          <div
                            className={`mt-2 text-[10px] flex items-center gap-1 ${
                              isOverdue ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-slate-400 dark:text-slate-500'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            <span>{lead.nextFollowUpDate}</span>
                          </div>

                          {/* Action controls */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between">
                            <button
                              onClick={() => handleMoveStage(lead.id, lead.status, 'prev')}
                              disabled={STAGES.indexOf(lead.status) === 0}
                              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent"
                              title="Move to previous stage"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => navigate(`/leads?id=${lead.id}`)}
                              className="text-[10px] font-semibold text-brand-600 dark:text-brand-400 hover:underline"
                            >
                              Details
                            </button>

                            <button
                              onClick={() => handleMoveStage(lead.id, lead.status, 'next')}
                              disabled={STAGES.indexOf(lead.status) === STAGES.length - 1}
                              className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 dark:text-slate-500 disabled:opacity-30 disabled:hover:bg-transparent"
                              title="Advance to next stage"
                            >
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        </div>
                      );
                    })
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <AddLeadModal isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} />
    </div>
  );
};
