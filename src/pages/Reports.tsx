import React from 'react';
import {
  BarChart3,
  TrendingUp,
  Download,
  Users,
  Flame,
  FileText,
  DollarSign,
  PieChart as PieIcon,
  ShieldAlert,
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
  Legend,
} from 'recharts';
import { useApp } from '../context/AppContext';

const COLORS = ['#2563eb', '#0284c7', '#0d9488', '#16a34a', '#d97706', '#dc2626', '#9333ea', '#64748b'];

export const Reports: React.FC = () => {
  const { leads, biddingOpportunities, proposals, activities, stats } = useApp();

  // 1. Leads by Industry
  const industryMap: Record<string, number> = {};
  leads.forEach((l) => {
    industryMap[l.industry] = (industryMap[l.industry] || 0) + 1;
  });
  const industryData = Object.entries(industryMap).map(([name, count]) => ({
    name: name.slice(0, 16),
    count,
  }));

  // 2. Leads by Source
  const sourceMap: Record<string, number> = {};
  leads.forEach((l) => {
    sourceMap[l.source] = (sourceMap[l.source] || 0) + 1;
  });
  const sourceData = Object.entries(sourceMap).map(([name, value]) => ({ name, value }));

  // 3. Bids by Platform
  const platformMap: Record<string, number> = {};
  biddingOpportunities.forEach((b) => {
    platformMap[b.platform] = (platformMap[b.platform] || 0) + 1;
  });
  const platformData = Object.entries(platformMap).map(([name, count]) => ({ name, count }));

  // 4. Proposals by Status
  const propStatusMap: Record<string, number> = {};
  proposals.forEach((p) => {
    propStatusMap[p.status] = (propStatusMap[p.status] || 0) + 1;
  });
  const propStatusData = Object.entries(propStatusMap).map(([name, value]) => ({ name, value }));

  // Conversion calculations with safe zero denominator protection
  const totalLeads = leads.length;
  const qualifiedLeads = leads.filter((l) => l.status === 'Qualified').length;
  const meetingsScheduled = leads.filter((l) => l.status === 'Meeting Scheduled').length;
  const proposalsMade = leads.filter((l) => l.status === 'Proposal' || l.status === 'Negotiation' || l.status === 'Won').length;
  const wonDeals = leads.filter((l) => l.status === 'Won').length;

  const leadToQualRate = totalLeads > 0 ? ((qualifiedLeads / totalLeads) * 100).toFixed(1) : '0';
  const qualToMeetingRate = qualifiedLeads > 0 ? ((meetingsScheduled / qualifiedLeads) * 100).toFixed(1) : '0';
  const meetingToPropRate = meetingsScheduled > 0 ? ((proposalsMade / meetingsScheduled) * 100).toFixed(1) : '0';
  const propToWonRate = proposalsMade > 0 ? ((wonDeals / proposalsMade) * 100).toFixed(1) : '0';

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <BarChart3 className="w-5 h-5 text-brand-600" /> BDE Sales Operations Analytics & Reports
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Real-time pipeline metrics, conversion velocity, platform attribution, and proposal health.
          </p>
        </div>
      </div>

      {/* Analytics Insights */}
      <div className="p-3 bg-slate-100/70 border border-slate-200 rounded-xl text-xs text-slate-700 flex items-start gap-2.5">
        <TrendingUp className="w-4 h-4 text-brand-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Sales Performance Intelligence:</strong> Stage conversion velocity, lead acquisition attribution, and bidding platform distribution calculated from active CRM pipeline records.
        </div>
      </div>

      {/* Funnel Conversion Ratios */}
      <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs space-y-4">
        <h2 className="text-sm font-bold text-slate-900">BDE Stage Conversion Funnel Velocity</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Inquiry → Qualified
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{leadToQualRate}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {qualifiedLeads} qualified out of {totalLeads} prospects
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Qualified → Meeting
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{qualToMeetingRate}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {meetingsScheduled} discovery demos set
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Meeting → Proposal
            </span>
            <div className="text-2xl font-bold text-slate-900 mt-1">{meetingToPropRate}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {proposalsMade} formal quotations sent
            </p>
          </div>

          <div className="bg-slate-50 p-3.5 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">
              Proposal → Won Deal
            </span>
            <div className="text-2xl font-bold text-emerald-600 mt-1">{propToWonRate}%</div>
            <p className="text-[11px] text-slate-500 mt-0.5">
              {wonDeals} deals closed successfully
            </p>
          </div>
        </div>
      </div>

      {/* Analytics Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Industry Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Prospects by Target Industry</h3>
          <p className="text-xs text-slate-500 mb-4">Market vertical concentration</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={industryData} margin={{ top: 10, right: 10, left: -20, bottom: 25 }}>
                <XAxis dataKey="name" tick={{ fontSize: 10 }} angle={-25} textAnchor="end" />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#0284c7" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Lead Source Breakdown */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Lead Acquisition Channel Share</h3>
          <p className="text-xs text-slate-500 mb-4">Volume generated per sourcing channel</p>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={sourceData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  innerRadius={45}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
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
        </div>

        {/* Bidding Platform Distribution */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Bidding Opportunities by Portal</h3>
          <p className="text-xs text-slate-500 mb-4">Upwork, Freelancer, and PeoplePerHour volume</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={platformData} margin={{ top: 10, right: 10, left: -20, bottom: 10 }}>
                <XAxis dataKey="name" tick={{ fontSize: 12 }} />
                <YAxis allowDecimals={false} tick={{ fontSize: 11 }} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: '#0f172a',
                    border: 'none',
                    borderRadius: '8px',
                    color: '#fff',
                    fontSize: '12px',
                  }}
                />
                <Bar dataKey="count" fill="#16a34a" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Proposal Pipeline Health */}
        <div className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs">
          <h3 className="text-sm font-bold text-slate-900 mb-1">Proposal Quotations by Status</h3>
          <p className="text-xs text-slate-500 mb-4">Active quotation pipeline health</p>
          <div className="h-60">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={propStatusData}
                  cx="50%"
                  cy="50%"
                  outerRadius={75}
                  innerRadius={40}
                  paddingAngle={3}
                  dataKey="value"
                  label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                >
                  {propStatusData.map((_, index) => (
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
        </div>
      </div>
    </div>
  );
};
