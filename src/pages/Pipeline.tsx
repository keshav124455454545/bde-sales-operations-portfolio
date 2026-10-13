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
  ShieldAlert,
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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Kanban className="w-5 h-5 text-brand-600" /> Sales Pipeline Velocity (Kanban)
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Visualize client journey from discovery through contract closing across 8 structured milestones.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
          >
            <Plus className="w-4 h-4" /> Add Deal Card
          </button>
        </div>
      </div>

      {/* Commercial Summary Pill */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-6 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Active Pipeline:</span>
            <span className="text-lg font-extrabold text-emerald-600">
              ${stats.pipelineValue.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-slate-400 block">Illustrative estimate</span>
          </div>

          <div className="border-l border-slate-200 pl-6">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Won Contract Value:</span>
            <span className="text-lg font-extrabold text-slate-900">
              ${stats.wonDealValue.toLocaleString()} USD
            </span>
            <span className="text-[10px] text-slate-400 block">{stats.dealsWon} closed deals</span>
          </div>
        </div>

        {/* Filters */}
        <div className="flex items-center gap-3 text-xs">
          <div>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
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
              className="px-2.5 py-1.5 text-xs border border-slate-300 rounded-lg bg-white"
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
      <div className="overflow-x-auto pb-4">
        <div className="flex gap-3.5 min-w-[1700px] items-start">
          {STAGES.map((stage) => {
            const stageLeads = filteredLeads.filter((l) => l.status === stage);
            const stageValue = stageLeads.reduce((acc, l) => acc + (l.estimatedDealValue || 0), 0);

            return (
              <div
                key={stage}
                className="w-72 bg-slate-100/90 rounded-xl border border-slate-200/90 flex flex-col max-h-[78vh] shrink-0"
              >
                {/* Column Header */}
                <div className="p-3 border-b border-slate-200/80 bg-white/70 rounded-t-xl">
                  <div className="flex items-center justify-between">
                    <Badge variant="stage" value={stage} />
                    <span className="text-xs font-bold text-slate-700 bg-slate-200/80 px-2 py-0.5 rounded-full">
                      {stageLeads.length}
                    </span>
                  </div>
                  <div className="text-[11px] font-semibold text-slate-500 mt-2 flex justify-between">
                    <span>Est. Value:</span>
                    <span className="text-slate-800 font-bold">${stageValue.toLocaleString()}</span>
                  </div>
                </div>

                {/* Card List */}
                <div className="p-2 space-y-2.5 overflow-y-auto flex-1">
                  {stageLeads.length === 0 ? (
                    <div className="py-8 text-center text-[11px] text-slate-400 italic">
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
                          className={`bg-white p-3 rounded-lg border shadow-2xs hover:shadow-xs transition ${
                            stalled ? 'border-amber-300 bg-amber-50/20' : 'border-slate-200'
                          }`}
                        >
                          {/* Stalled deal warning */}
                          {stalled && (
                            <div className="mb-1.5 flex items-center gap-1 text-[10px] text-amber-700 font-semibold bg-amber-100/70 px-1.5 py-0.5 rounded">
                              <AlertTriangle className="w-3 h-3 text-amber-600" /> Stalled (&gt;7d inactive)
                            </div>
                          )}

                          <div className="flex items-start justify-between gap-1 mb-1">
                            <h4
                              onClick={() => navigate(`/leads?id=${lead.id}`)}
                              className="font-bold text-slate-900 text-xs hover:text-brand-600 cursor-pointer line-clamp-1"
                              title={lead.companyName}
                            >
                              {lead.companyName}
                            </h4>
                            <Badge variant="priority" value={lead.priority} />
                          </div>

                          <div className="text-[11px] text-slate-500">
                            {lead.contactPerson}
                          </div>

                          <div className="text-[11px] font-medium text-brand-700 truncate mt-1">
                            {lead.serviceOfInterest}
                          </div>

                          <div className="mt-2 pt-2 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-emerald-700">
                            <span>${lead.estimatedDealValue.toLocaleString()}</span>
                            <span className="text-[10px] font-normal text-slate-400">
                              {lead.source}
                            </span>
                          </div>

                          {/* Next follow-up info */}
                          <div
                            className={`mt-1.5 text-[10px] flex items-center gap-1 ${
                              isOverdue ? 'text-rose-600 font-semibold' : 'text-slate-400'
                            }`}
                          >
                            <Clock className="w-3 h-3" />
                            <span>Due: {lead.nextFollowUpDate}</span>
                          </div>

                          {/* Move stage controls */}
                          <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between gap-1">
                            <button
                              disabled={stage === 'New Lead'}
                              onClick={() => handleMoveStage(lead.id, lead.status, 'prev')}
                              className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 disabled:opacity-30 disabled:pointer-events-none"
                              title="Move to previous stage"
                            >
                              <ChevronLeft className="w-3.5 h-3.5" />
                            </button>

                            <button
                              onClick={() => navigate(`/leads?id=${lead.id}`)}
                              className="text-[10px] text-brand-600 hover:underline font-medium"
                            >
                              Details
                            </button>

                            <button
                              disabled={stage === 'Lost'}
                              onClick={() => handleMoveStage(lead.id, lead.status, 'next')}
                              className="p-1 rounded text-slate-400 hover:text-brand-600 hover:bg-brand-50 disabled:opacity-30 disabled:pointer-events-none"
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
