import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Users,
  Compass,
  FileText,
  DollarSign,
  TrendingUp,
  AlertCircle,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowUpRight,
  Plus,
  RefreshCw,
  Award,
  Flame,
  Search,
} from 'lucide-react';
import {
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
} from 'recharts';
import { useApp } from '../context/AppContext';
import { Badge } from '../components/common/Badge';
import { AddLeadModal } from '../components/modals/AddLeadModal';
import { LogActivityModal } from '../components/modals/LogActivityModal';
import { ConfirmModal } from '../components/common/ConfirmModal';

const COLORS = ['#2563eb', '#0284c7', '#0d9488', '#16a34a', '#d97706', '#dc2626', '#9333ea', '#64748b'];

export const Dashboard: React.FC = () => {
  const {
    leads,
    biddingOpportunities,
    proposals,
    activities,
    stats,
    updateLeadStage,
    resetData,
  } = useApp();
  const navigate = useNavigate();

  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  // Group leads by stage for stage chart
  const stageData = [
    { name: 'New Lead', count: leads.filter((l) => l.status === 'New Lead').length },
    { name: 'Contacted', count: leads.filter((l) => l.status === 'Contacted').length },
    { name: 'Qualified', count: leads.filter((l) => l.status === 'Qualified').length },
    { name: 'Meeting', count: leads.filter((l) => l.status === 'Meeting Scheduled').length },
    { name: 'Proposal', count: leads.filter((l) => l.status === 'Proposal').length },
    { name: 'Negotiation', count: leads.filter((l) => l.status === 'Negotiation').length },
    { name: 'Won', count: leads.filter((l) => l.status === 'Won').length },
    { name: 'Lost', count: leads.filter((l) => l.status === 'Lost').length },
  ];

  // Group leads by source for donut chart
  const sourceMap: Record<string, number> = {};
  leads.forEach((l) => {
    sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
  });
  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

  // Filter urgent follow-ups
  const today = new Date().toISOString().slice(0, 10);
  const urgentFollowUps = leads
    .filter((l) => l.status !== 'Won' && l.status !== 'Lost' && l.nextFollowUpDate <= today)
    .slice(0, 5);

  const upcomingLeads = leads
    .filter((l) => l.status !== 'Won' && l.status !== 'Lost' && l.nextFollowUpDate > today)
    .sort((a, b) => a.nextFollowUpDate.localeCompare(b.nextFollowUpDate))
    .slice(0, 4);

  return (
    <div className="space-y-6">
      {/* Welcome & Simulation Context Header */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl font-bold text-slate-900">
              Welcome back, Keshav
            </h1>
            <span className="text-xs bg-brand-50 text-brand-700 px-2.5 py-0.5 rounded-full font-medium border border-brand-200">
              BDE Practice Session
            </span>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            Simulating Business Development & Sales Operations for{' '}
            <strong className="text-slate-700">Nexora Digital Solutions</strong>.
            All client figures, pipelines, and proposals below are derived from active local data.
          </p>
        </div>

        <div className="flex items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition shadow-xs"
          >
            <Plus className="w-4 h-4" /> Add Prospect
          </button>
          <button
            onClick={() => setIsLogActivityOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition border border-slate-200"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500" /> Log Activity
          </button>
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-600 hover:text-rose-600 bg-white hover:bg-rose-50 rounded-lg transition border border-slate-200"
            title="Reset data back to factory demo state"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset Data
          </button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Total Prospects</span>
            <Users className="w-4 h-4 text-brand-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.totalLeads}</div>
          <div className="text-[11px] text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 font-medium">+{stats.newLeads}</span> new inquiries
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Active Pipeline</span>
            <TrendingUp className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">
            ${(stats.pipelineValue / 1000).toFixed(1)}k
          </div>
          <div className="text-[11px] text-slate-400 mt-1">
            Illustrative estimate
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Qualified Leads</span>
            <CheckCircle2 className="w-4 h-4 text-cyan-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.qualifiedLeads}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Met ICP criteria
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Meetings Set</span>
            <Calendar className="w-4 h-4 text-purple-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.meetingScheduled}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            Discovery calls
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Proposals Active</span>
            <FileText className="w-4 h-4 text-amber-600" />
          </div>
          <div className="text-2xl font-bold text-slate-900">{stats.proposalsSubmitted}</div>
          <div className="text-[11px] text-slate-400 mt-1">
            {stats.proposalsDrafted} in drafting
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs">
          <div className="flex items-center justify-between text-slate-500 mb-2">
            <span className="text-xs font-medium">Overdue Actions</span>
            <AlertCircle className="w-4 h-4 text-rose-500" />
          </div>
          <div className={`text-2xl font-bold ${stats.overdueFollowUps > 0 ? 'text-rose-600' : 'text-slate-900'}`}>
            {stats.overdueFollowUps}
          </div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">
            Requires attention
          </div>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Stages Bar Chart */}
        <div className="lg:col-span-2 bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Pipeline Stage Distribution</h2>
              <p className="text-xs text-slate-500">Live breakdown of deals across standard BDE pipeline milestones</p>
            </div>
            <button
              onClick={() => navigate('/pipeline')}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
            >
              Open Kanban <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#64748b' }} angle={-25} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#2563eb" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Distribution Donut Chart */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900">Lead Sourcing Channels</h2>
              <p className="text-xs text-slate-500">Origin channel attribution</p>
            </div>
            <button
              onClick={() => navigate('/leads')}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
            >
              View Leads <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="h-48 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={75}
                  paddingAngle={3}
                  dataKey="value"
                >
                  {sourceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100 text-[11px]">
            {sourceData.slice(0, 6).map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 text-slate-600 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="truncate">{item.name}:</span>
                <span className="font-semibold text-slate-800 ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Task Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent & Today's Follow-Ups */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-rose-500 animate-ping"></div>
              <h2 className="text-sm font-bold text-slate-900">Urgent Follow-Ups</h2>
            </div>
            <span className="text-xs bg-rose-50 text-rose-700 font-medium px-2 py-0.5 rounded-full border border-rose-200">
              {urgentFollowUps.length} Pending
            </span>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {urgentFollowUps.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                All active follow-ups are up to date!
              </div>
            ) : (
              urgentFollowUps.map((lead) => (
                <div key={lead.id} className="py-3 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900">{lead.companyName}</h4>
                      <p className="text-[11px] text-slate-500 mt-0.5">
                        {lead.contactPerson} • {lead.serviceOfInterest}
                      </p>
                    </div>
                    <Badge variant="stage" value={lead.status} />
                  </div>
                  <div className="mt-2 bg-slate-50 p-2 rounded-md border border-slate-100 text-[11px] text-slate-600">
                    <strong className="text-slate-800">Action:</strong> {lead.nextAction}
                  </div>
                  <div className="mt-2 flex items-center justify-between text-[11px]">
                    <span className="text-rose-600 font-medium flex items-center gap-1">
                      <Clock className="w-3 h-3" /> Due: {lead.nextFollowUpDate}
                    </span>
                    <button
                      onClick={() => navigate(`/leads?id=${lead.id}`)}
                      className="text-brand-600 hover:text-brand-700 font-medium"
                    >
                      Take Action →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bidding Opportunities Snapshot */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900">Bidding Portal Radar</h2>
            </div>
            <button
              onClick={() => navigate('/bidding')}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
            >
              All Bids ({biddingOpportunities.length}) <ArrowUpRight className="w-3 h-3" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {biddingOpportunities.slice(0, 4).map((bid) => (
              <div key={bid.id} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="platform" value={bid.platform} />
                  <span className="text-[11px] font-semibold text-emerald-600">
                    ${bid.proposedPrice.toLocaleString()}
                  </span>
                </div>
                <h4 className="text-xs font-medium text-slate-900 mt-1 line-clamp-1">
                  {bid.jobTitle}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 mt-1.5">
                  <span>Fit Score: <strong className="text-slate-700">{bid.fitScore}%</strong></span>
                  <span className="bg-slate-100 px-1.5 py-0.2 rounded text-slate-700 font-medium">
                    {bid.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent CRM Activities */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-brand-600" />
              <h2 className="text-sm font-bold text-slate-900">Recent CRM Log</h2>
            </div>
            <button
              onClick={() => navigate('/activities')}
              className="text-xs text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
            >
              Full Log <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 flex-1">
            {activities.slice(0, 4).map((act) => (
              <div key={act.id} className="py-2.5 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-800">{act.type}</span>
                  <span className="text-slate-400">{act.dateTime}</span>
                </div>
                <div className="text-xs font-medium text-brand-700 mt-0.5">
                  {act.relatedTitle}
                </div>
                <p className="text-[11px] text-slate-600 line-clamp-2 mt-0.5">
                  {act.summary}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Global Modals */}
      <AddLeadModal isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} />
      <LogActivityModal isOpen={isLogActivityOpen} onClose={() => setIsLogActivityOpen(false)} />
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetData}
        title="Reset Demo Data?"
        message="This will restore all demonstration leads, proposals, bids, and activities to their initial realistic seed state."
        confirmLabel="Reset Demo Data"
        isDestructive={true}
      />
    </div>
  );
};
