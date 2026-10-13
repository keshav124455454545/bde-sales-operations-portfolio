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
  Sparkles,
  Zap,
  Globe2,
  PhoneCall,
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

const COLORS = ['#3b82f6', '#06b6d4', '#10b981', '#8b5cf6', '#f59e0b', '#ec4899', '#6366f1', '#64748b'];

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
    <div className="space-y-6 max-w-7xl mx-auto">
      {/* Executive Hero Cockpit */}
      <div className="bg-gradient-to-r from-white via-slate-50 to-blue-50/50 dark:from-[#0f172a] dark:via-[#111827] dark:to-[#1e1b4b]/30 p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col lg:flex-row lg:items-center justify-between gap-5 transition-all">
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-brand-50 text-brand-700 dark:bg-brand-950/80 dark:text-brand-300 border border-brand-200 dark:border-brand-800">
              <Sparkles className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
              BDE Sales Operations Cockpit
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              Mohali Phase 8B & Chandigarh IT Park
            </span>
          </div>

          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Welcome back, Keshav Sood
          </h1>

          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
            Centralized operations for <strong className="text-slate-800 dark:text-slate-200">Nexora Digital Solutions</strong>. Managing cross-border IT client acquisition across USA, UK, Nordics, DACH, and GCC across 8 core service categories.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-1 text-xs text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <Globe2 className="w-3.5 h-3.5 text-brand-500" /> Target Markets: US, UK, EU, UAE, AU
            </span>
            <span>•</span>
            <span className="flex items-center gap-1.5 text-emerald-600 dark:text-emerald-400 font-medium">
              <Zap className="w-3.5 h-3.5" /> High Velocity Pipeline: ${(stats.pipelineValue / 1000).toFixed(1)}k
            </span>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-2.5 shrink-0">
          <button
            onClick={() => setIsAddLeadOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl transition shadow-md shadow-brand-500/20"
          >
            <Plus className="w-4 h-4" /> Add Prospect
          </button>
          <button
            onClick={() => setIsLogActivityOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 rounded-xl transition border border-slate-200 dark:border-slate-700 shadow-2xs"
          >
            <Calendar className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Log Activity
          </button>
          <button
            onClick={() => setIsResetConfirmOpen(true)}
            className="inline-flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-slate-500 hover:text-rose-600 dark:text-slate-400 dark:hover:text-rose-400 bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-xl transition border border-slate-200 dark:border-slate-700 shadow-2xs"
            title="Reset data back to factory baseline state"
          >
            <RefreshCw className="w-3.5 h-3.5" /> Reset
          </button>
        </div>
      </div>

      {/* Top 6 High-Impact Metric Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
        {/* Card 1: Total Prospects */}
        <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Prospects</span>
            <div className="p-2 rounded-xl bg-blue-500/10 text-blue-600 dark:text-blue-400">
              <Users className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.totalLeads}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 flex items-center gap-1">
            <span className="text-emerald-600 dark:text-emerald-400 font-semibold">+{stats.newLeads}</span> new inquiries
          </div>
        </div>

        {/* Card 2: Active Pipeline */}
        <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Pipeline</span>
            <div className="p-2 rounded-xl bg-emerald-500/10 text-emerald-600 dark:text-emerald-400">
              <TrendingUp className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">
            ${(stats.pipelineValue / 1000).toFixed(1)}k
          </div>
          <div className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Weighted deal value
          </div>
        </div>

        {/* Card 3: Qualified Leads */}
        <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">ICP Qualified</span>
            <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-600 dark:text-cyan-400">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.qualifiedLeads}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Score &ge; 75/100
          </div>
        </div>

        {/* Card 4: Meetings Set */}
        <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Discovery</span>
            <div className="p-2 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400">
              <Calendar className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.meetingScheduled}</div>
          <div className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
            Calls scheduled
          </div>
        </div>

        {/* Card 5: Proposals */}
        <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Proposals</span>
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400">
              <FileText className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-extrabold text-slate-900 dark:text-white">{stats.proposalsSubmitted}</div>
          <div className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            {stats.proposalsDrafted} drafting
          </div>
        </div>

        {/* Card 6: Overdue Actions */}
        <div className="bg-white dark:bg-[#0f172a] p-4 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all">
          <div className="flex items-center justify-between text-slate-500 dark:text-slate-400 mb-2">
            <span className="text-[11px] font-semibold uppercase tracking-wider">Overdue</span>
            <div className="p-2 rounded-xl bg-rose-500/10 text-rose-600 dark:text-rose-400">
              <AlertCircle className="w-4 h-4" />
            </div>
          </div>
          <div className={`text-2xl font-extrabold ${stats.overdueFollowUps > 0 ? 'text-rose-600 dark:text-rose-400' : 'text-slate-900 dark:text-white'}`}>
            {stats.overdueFollowUps}
          </div>
          <div className="text-[11px] text-rose-500 font-medium mt-1">
            Urgent actions
          </div>
        </div>
      </div>

      {/* Visual Analytics Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Pipeline Stages Bar Chart */}
        <div className="lg:col-span-2 bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Pipeline Stage Velocity</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Distribution of active prospective deals across 8 stages</p>
            </div>
            <button
              onClick={() => navigate('/pipeline')}
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold flex items-center gap-1"
            >
              Open Kanban <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="h-64 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={stageData} margin={{ top: 10, right: 10, left: -20, bottom: 20 }}>
                <defs>
                  <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#3b82f6" stopOpacity={0.9} />
                    <stop offset="100%" stopColor="#6366f1" stopOpacity={0.7} />
                  </linearGradient>
                </defs>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#94a3b8' }} angle={-25} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11, fill: '#94a3b8' }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                    boxShadow: '0 10px 25px -5px rgba(0,0,0,0.3)',
                  }}
                />
                <Bar dataKey="count" fill="url(#barGradient)" radius={[6, 6, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Distribution Donut Chart */}
        <div className="bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Lead Acquisition Channels</h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">Multi-channel source attribution</p>
            </div>
            <button
              onClick={() => navigate('/leads')}
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold flex items-center gap-1"
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
                  innerRadius={55}
                  outerRadius={78}
                  paddingAngle={4}
                  dataKey="value"
                >
                  {sourceData.map((_, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    borderColor: '#334155',
                    borderRadius: '12px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-2 pt-3 border-t border-slate-100 dark:border-slate-800 text-[11px]">
            {sourceData.slice(0, 6).map((item, idx) => (
              <div key={item.name} className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 truncate">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: COLORS[idx % COLORS.length] }}
                />
                <span className="truncate">{item.name}:</span>
                <span className="font-bold text-slate-900 dark:text-white ml-auto">{item.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Operational Task Center */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Urgent Follow-Ups */}
        <div className="bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-rose-500 animate-ping"></div>
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Urgent Follow-Up Queue</h2>
            </div>
            <span className="text-xs bg-rose-50 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 font-semibold px-2.5 py-0.5 rounded-full border border-rose-200 dark:border-rose-800">
              {urgentFollowUps.length} Pending
            </span>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
            {urgentFollowUps.length === 0 ? (
              <div className="py-8 text-center text-xs text-slate-400">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2 opacity-80" />
                All active follow-ups are up to date!
              </div>
            ) : (
              urgentFollowUps.map((lead) => (
                <div key={lead.id} className="py-3.5 first:pt-0 last:pb-0">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <h4 className="text-xs font-bold text-slate-900 dark:text-white">{lead.companyName}</h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {lead.contactPerson} • {lead.serviceOfInterest}
                      </p>
                    </div>
                    <Badge variant="stage" value={lead.status} />
                  </div>
                  <div className="mt-2 bg-slate-50 dark:bg-slate-800/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-700/60 text-[11px] text-slate-600 dark:text-slate-300">
                    <strong className="text-slate-800 dark:text-slate-200">Action:</strong> {lead.nextAction}
                  </div>
                  <div className="mt-2.5 flex items-center justify-between text-[11px]">
                    <span className="text-rose-600 dark:text-rose-400 font-semibold flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" /> Due: {lead.nextFollowUpDate}
                    </span>
                    <button
                      onClick={() => navigate(`/leads?id=${lead.id}`)}
                      className="text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold flex items-center gap-1"
                    >
                      Execute Action →
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>

        {/* Bidding Opportunities Snapshot */}
        <div className="bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Flame className="w-4 h-4 text-amber-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Bidding Portals Radar</h2>
            </div>
            <button
              onClick={() => navigate('/bidding')}
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold flex items-center gap-1"
            >
              All Bids ({biddingOpportunities.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
            {biddingOpportunities.slice(0, 4).map((bid) => (
              <div key={bid.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="platform" value={bid.platform} />
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    ${bid.proposedPrice.toLocaleString()}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white mt-1.5 line-clamp-1">
                  {bid.jobTitle}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  <span>Fit Score: <strong className="text-slate-800 dark:text-slate-200 font-bold">{bid.fitScore}%</strong></span>
                  <span className="bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-full text-slate-700 dark:text-slate-300 font-medium border border-slate-200 dark:border-slate-700">
                    {bid.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Commercial Proposals Snapshot */}
        <div className="bg-white dark:bg-[#0f172a] p-5 sm:p-6 rounded-2xl border border-slate-200/90 dark:border-slate-800 shadow-sm flex flex-col">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <FileText className="w-4 h-4 text-indigo-500" />
              <h2 className="text-sm font-bold text-slate-900 dark:text-white">Active Proposals</h2>
            </div>
            <button
              onClick={() => navigate('/proposals')}
              className="text-xs text-brand-600 dark:text-brand-400 hover:text-brand-700 font-semibold flex items-center gap-1"
            >
              Proposals ({proposals.length}) <ArrowUpRight className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="divide-y divide-slate-100 dark:divide-slate-800 flex-1">
            {proposals.map((prop) => (
              <div key={prop.id} className="py-3 first:pt-0 last:pb-0">
                <div className="flex items-center justify-between gap-2">
                  <Badge variant="proposal" value={prop.status} />
                  <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                    ${prop.totalEstimatedPrice.toLocaleString()}
                  </span>
                </div>
                <h4 className="text-xs font-semibold text-slate-900 dark:text-white mt-1.5 line-clamp-1">
                  {prop.clientCompany}
                </h4>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 line-clamp-1 mt-0.5">
                  {prop.serviceName}
                </p>
                <div className="mt-2 flex items-center justify-between text-[11px]">
                  <span className="text-slate-400 font-mono text-[10px]">{prop.id}</span>
                  <button
                    onClick={() => navigate(`/proposals?id=${prop.id}`)}
                    className="text-brand-600 dark:text-brand-400 hover:underline font-semibold"
                  >
                    View Document →
                  </button>
                </div>
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
        title="Reset Baseline Dataset"
        message="Restore all lead, bid, and proposal records back to the factory seed baseline?"
        confirmLabel="Yes, Reset"
      />
    </div>
  );
};
