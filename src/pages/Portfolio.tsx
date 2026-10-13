import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Briefcase,
  CheckCircle2,
  ExternalLink,
  Code2,
  Layers,
  ArrowRight,
  FileText,
  Workflow,
  Sparkles,
  Building,
  Target,
  Award,
} from 'lucide-react';
import { useApp } from '../context/AppContext';

export const Portfolio: React.FC = () => {
  const { proposals } = useApp();
  const navigate = useNavigate();

  const jdResponsibilities = [
    {
      num: 1,
      title: 'Actively seek out new sales opportunities',
      module: 'Prospecting Workspace & Dashboard',
      route: '/prospecting',
      description:
        'Established proactive multi-channel prospecting methods, tracking high-intent accounts and daily sales velocity queues.',
    },
    {
      num: 2,
      title: 'Understand bidding portals (Upwork, Freelancer, PPH)',
      module: 'Bidding Opportunities Tracker',
      route: '/bidding',
      description:
        'Tracked and qualified competitive job posts across Upwork, Freelancer, and PeoplePerHour with fit scoring and deadline management.',
    },
    {
      num: 3,
      title: 'Generate leads through LinkedIn & Sales Navigator',
      module: 'Prospecting & ICP Scoring Engine',
      route: '/prospecting',
      description:
        'Applied a 0–100 rule-based Ideal Customer Profile (ICP) qualification framework and personalized multi-touch outreach copywriting.',
    },
    {
      num: 4,
      title: 'Build and maintain a strong sales pipeline',
      module: '8-Stage Sales Pipeline (Kanban)',
      route: '/pipeline',
      description:
        'Structured deals across 8 pipeline milestones from New Lead to Won/Lost with stalled deal detection and conversion analytics.',
    },
    {
      num: 5,
      title: 'Conduct market research to identify selling possibilities',
      module: 'Market Research & Competitive Intel',
      route: '/market-research',
      description:
        'Executed 7-step market discovery worksheets identifying competitor gaps and Nexora differentiation across US, UK, and Nordic verticals.',
    },
    {
      num: 6,
      title: 'Develop and manage business-development networks',
      module: 'Network & Relationship Management',
      route: '/network',
      description:
        'Maintained structured contact directories for referral agencies, technology partners, and local industry associations with follow-up cadences.',
    },
    {
      num: 7,
      title: 'Maintain deep knowledge of company product/service offerings',
      module: 'Services Knowledge Library',
      route: '/services',
      description:
        'Mastered detailed technical capabilities, discovery questions, objections handling, and indicative pricing across core Nexora IT service offerings.',
    },
    {
      num: 8,
      title: 'Write new business proposals',
      module: 'Interactive Proposal Builder',
      route: '/proposals',
      description:
        'Authored comprehensive commercial proposals featuring phased scopes of work, deliverables, payment milestones, and print-ready PDF styling.',
    },
    {
      num: 9,
      title: 'Keep client database and CRM updated',
      module: 'Leads Database & Activity Logs',
      route: '/leads',
      description:
        'Maintained a complete CRM database with CSV import/export, interaction logs (calls, emails, meetings), and overdue follow-up tracking.',
    },
  ];

  return (
    <div className="space-y-8 max-w-5xl mx-auto pb-12">
      {/* Hero Header */}
      <div className="figma-card p-6 sm:p-10 rounded-2xl space-y-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-50 border border-brand-200 text-brand-700 text-xs font-semibold">
          <Award className="w-3.5 h-3.5" /> BDE Sales Operations Portfolio Project
        </div>

        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
          BDE Sales Operations & IT Services Proposal Portfolio
        </h1>

        <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 leading-relaxed">
          A centralized, production-ready B2B Sales Operations Platform and Bidding Management System engineered by <strong>Keshav Sood</strong> for IT services, SaaS expansion, and international online client acquisition.
        </p>

        {/* Executive Operations Overview Card */}
        <div className="p-4 bg-emerald-50/80 border border-emerald-200/80 rounded-xl text-xs text-emerald-900 flex items-start gap-3">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
          <div className="leading-relaxed">
            <strong>Executive Sales Operations Workspace:</strong> Centralized operations and proposal management platform engineered by <strong>Keshav Sood</strong> for <strong>Nexora Digital Solutions</strong> (Phase 8B, Industrial Area, Mohali). Built to manage end-to-end prospecting, freelance portal bidding, RFP proposals, pipeline velocity, and international client acquisition cadences.
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-3 border-t border-slate-100 text-xs">
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Candidate:</span>
            <span className="font-bold text-slate-800">Keshav Sood</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Roles:</span>
            <span className="font-bold text-slate-800">BDE / IT Sales / Online Bidding</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Target Hubs:</span>
            <span className="font-bold text-slate-800">Mohali & Chandigarh IT Park</span>
          </div>
          <div>
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Represented Agency:</span>
            <span className="font-bold text-brand-700">Nexora Digital Solutions</span>
          </div>
        </div>
      </div>

      {/* Section 1: JD Responsibilities Mapping */}
      <div className="figma-card p-6 sm:p-8 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <Target className="w-5 h-5 text-brand-600" /> Target Job Description & Workflow Alignment
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Every responsibility from the target BDE job specification is directly represented by a functional application module:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {jdResponsibilities.map((item) => (
            <div
              key={item.num}
              className="p-4 bg-slate-50/80 dark:bg-slate-800/50 rounded-xl border border-slate-200/80 dark:border-slate-700/80 flex flex-col justify-between space-y-3 hover:border-brand-400 transition"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-1.5">
                  <span className="w-5 h-5 rounded-full bg-brand-600 text-white font-bold text-[10px] flex items-center justify-center shrink-0">
                    {item.num}
                  </span>
                  <span className="text-[10px] font-semibold text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {item.module}
                  </span>
                </div>
                <h3 className="font-bold text-slate-900 dark:text-white text-xs">{item.title}</h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-1.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              <button
                onClick={() => navigate(item.route)}
                className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1 pt-2 border-t border-slate-200/60"
              >
                Inspect Live Module <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Section 2: Technology Stack & Architectural Decisions */}
      <div className="figma-card p-6 sm:p-8 rounded-2xl space-y-6">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Code2 className="w-5 h-5 text-brand-600" /> Technology Stack & Engineering Architecture
        </h2>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Frontend:</span>
            <span className="font-bold text-slate-900 dark:text-white">React 18 & TypeScript</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Strict typed models for leads, bids & proposals</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Styling:</span>
            <span className="font-bold text-slate-900 dark:text-white">Tailwind CSS</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Enterprise navy & clean B2B SaaS layout</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Persistence:</span>
            <span className="font-bold text-slate-900 dark:text-white">LocalStorage v1</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Automated seeding & JSON backup/restore</p>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200">
            <span className="text-slate-400 block text-[10px] uppercase font-semibold">Visuals:</span>
            <span className="font-bold text-slate-900 dark:text-white">Recharts & Lucide</span>
            <p className="text-[10px] text-slate-500 mt-0.5">Interactive data visual charts</p>
          </div>
        </div>
      </div>

      {/* Section 3: 3 Sample Proposal Previews */}
      <div className="figma-card p-6 sm:p-8 rounded-2xl space-y-6">
        <div>
          <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
            <FileText className="w-5 h-5 text-brand-600" /> Commercial Proposal Previews
          </h2>
          <p className="text-xs text-slate-500 mt-0.5">
            Three complete, executive client proposals engineered according to international B2B proposal standards:
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {proposals.map((prop) => (
            <div
              key={prop.id}
              className="p-4 bg-slate-50 rounded-xl border border-slate-200 flex flex-col justify-between space-y-3"
            >
              <div>
                <span className="text-[10px] font-mono text-slate-400 font-bold block mb-1">
                  {prop.id}
                </span>
                <h3 className="font-bold text-slate-900 text-sm">{prop.clientCompany}</h3>
                <div className="text-xs font-semibold text-brand-700 mt-0.5">
                  {prop.serviceName}
                </div>
                <p className="text-[11px] text-slate-600 mt-2 line-clamp-2">
                  {prop.clientProblem}
                </p>
              </div>

              <div className="pt-3 border-t border-slate-200 flex items-center justify-between text-xs">
                <span className="font-bold text-emerald-700">
                  ${prop.totalEstimatedPrice.toLocaleString()} USD
                </span>
                <button
                  onClick={() => navigate(`/proposals?id=${prop.id}`)}
                  className="text-xs text-brand-600 font-semibold hover:underline flex items-center gap-1"
                >
                  View Document <ArrowRight className="w-3 h-3" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Section 4: End-to-End Sales Workflow Narrative */}
      <div className="bg-white p-6 sm:p-8 rounded-2xl border border-slate-200 shadow-sm space-y-4 text-xs">
        <h2 className="text-lg font-bold text-slate-900 dark:text-white flex items-center gap-2">
          <Workflow className="w-5 h-5 text-brand-600" /> BDE Operational Sales Lifecycle
        </h2>
        <div className="space-y-3 text-slate-700 leading-relaxed">
          <p>
            <strong>Phase 1: Opportunity Discovery & Portal Radar</strong> — Sourcing high-potential prospects through Upwork, Freelancer, PeoplePerHour, and LinkedIn Sales Navigator filters. Evaluating requirements against Nexora's core engineering capabilities.
          </p>
          <p>
            <strong>Phase 2: Qualification & ICP Scoring</strong> — Applying the 0–100 rubric to verify company size, geography budget suitability, and explicit technical pain points before committing outreach hours.
          </p>
          <p>
            <strong>Phase 3: Multi-Touch Outreach & Discovery</strong> — Deploying personalized value-led messaging, sharing relevant architecture benchmarks, and securing 20-minute video discovery sessions.
          </p>
          <p>
            <strong>Phase 4: Proposal Engineering & Closing</strong> — Translating client requirements into formal milestone-based proposals with phased scopes, clear deliverable criteria, and transparent pricing.
          </p>
        </div>
      </div>
    </div>
  );
};
