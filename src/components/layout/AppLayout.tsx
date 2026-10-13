import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  Compass,
  Flame,
  Kanban,
  Search,
  Share2,
  Layers,
  FileText,
  CalendarCheck,
  BarChart3,
  Briefcase,
  Settings,
  Plus,
  RefreshCw,
  Menu,
  X,
  PhoneCall,
  ExternalLink,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AddLeadModal } from '../modals/AddLeadModal';
import { LogActivityModal } from '../modals/LogActivityModal';
import { ConfirmModal } from '../common/ConfirmModal';
import { ToastContainer } from '../common/ToastContainer';

export const AppLayout: React.FC = () => {
  const { stats, resetData } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutDashboard },
    { path: '/leads', label: 'Leads & Prospects', icon: Users, badge: stats.totalLeads },
    { path: '/prospecting', label: 'Prospecting Workspace', icon: Compass },
    { path: '/bidding', label: 'Bidding Opportunities', icon: Flame, badge: stats.activeBids },
    { path: '/pipeline', label: 'Sales Pipeline', icon: Kanban },
    { path: '/market-research', label: 'Market Research', icon: Search },
    { path: '/network', label: 'Network & Contacts', icon: Share2 },
    { path: '/services', label: 'Services Catalogue', icon: Layers },
    { path: '/proposals', label: 'Proposals Builder', icon: FileText },
    {
      path: '/activities',
      label: 'Activities & Reminders',
      icon: CalendarCheck,
      badge: stats.overdueFollowUps > 0 ? `${stats.overdueFollowUps} due` : undefined,
      badgeColor: 'bg-rose-500 text-white',
    },
    { path: '/reports', label: 'Analytics & Reports', icon: BarChart3 },
    { path: '/portfolio', label: 'Portfolio Documentation', icon: Briefcase, highlight: true },
    { path: '/settings', label: 'Settings & Data Backup', icon: Settings },
  ];

  const getPageTitle = () => {
    const item = navItems.find((n) => n.path === location.pathname);
    return item ? item.label : 'Sales Operations Workspace';
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans text-slate-800">
      {/* Simulation Banner */}
      <div className="bg-navy-950 text-slate-300 px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-navy-900 no-print">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">Nexora Digital Solutions</span>
          <span className="text-slate-400 hidden sm:inline">• BDE Sales Operations & Proposal Portfolio</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
            <ShieldAlert className="w-3 h-3" /> Fictional Demonstration Dataset
          </span>
          <NavLink
            to="/portfolio"
            className="text-xs text-brand-300 hover:text-white underline underline-offset-2 flex items-center gap-1 transition"
          >
            Candidate Portfolio View <ExternalLink className="w-3 h-3" />
          </NavLink>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Desktop Sidebar */}
        <aside className="w-64 bg-slate-900 text-slate-200 hidden md:flex flex-col border-r border-slate-800 shrink-0 no-print">
          <div className="p-4 border-b border-slate-800/80">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-500/20">
                NX
              </div>
              <div>
                <h1 className="font-bold text-sm text-white leading-tight">Nexora Sales Ops</h1>
                <p className="text-[11px] text-slate-400">Mohali / Chandigarh Hub</p>
              </div>
            </div>
            <div className="mt-3 p-2 rounded-lg bg-slate-800/60 border border-slate-700/50 text-[11px]">
              <div className="text-slate-400 flex justify-between">
                <span>Active Pipeline:</span>
                <span className="font-semibold text-emerald-400">
                  ${stats.pipelineValue.toLocaleString()}
                </span>
              </div>
              <div className="text-slate-400 flex justify-between mt-1">
                <span>Won Deals:</span>
                <span className="font-semibold text-white">
                  ${stats.wonDealValue.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-3 py-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  className={({ isActive }) =>
                    `flex items-center justify-between px-3 py-2 rounded-lg text-xs font-medium transition ${
                      isActive
                        ? 'bg-brand-600 text-white shadow-xs'
                        : item.highlight
                        ? 'text-brand-300 hover:bg-slate-800 hover:text-white border border-brand-500/30'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`
                  }
                >
                  <div className="flex items-center gap-2.5 min-w-0">
                    <Icon className="w-4 h-4 shrink-0" />
                    <span className="truncate">{item.label}</span>
                  </div>
                  {item.badge !== undefined && (
                    <span
                      className={`text-[10px] px-1.5 py-0.2 rounded-full font-semibold shrink-0 ${
                        item.badgeColor || 'bg-slate-800 text-slate-300 border border-slate-700'
                      }`}
                    >
                      {item.badge}
                    </span>
                  )}
                </NavLink>
              );
            })}
          </nav>

          {/* User profile & reset */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-full bg-slate-700 flex items-center justify-center text-xs font-semibold text-slate-200">
                  SS
                </div>
                <div className="text-left">
                  <div className="text-xs font-medium text-white">Simranjit Singh</div>
                  <div className="text-[10px] text-slate-400">Business Dev Executive</div>
                </div>
              </div>
            </div>
            <button
              onClick={() => setIsResetConfirmOpen(true)}
              className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:text-rose-400 bg-slate-800/60 hover:bg-slate-800 rounded-md transition border border-slate-700/60"
            >
              <RefreshCw className="w-3 h-3" /> Reset Demo Dataset
            </button>
          </div>
        </aside>

        {/* Mobile Header and Drawer */}
        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-slate-900/80 md:hidden flex flex-col">
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                  NX
                </div>
                <span className="font-bold text-white text-sm">Nexora Sales Ops</span>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1"
              >
                <X className="w-6 h-6" />
              </button>
            </div>
            <nav className="flex-1 p-4 space-y-1 overflow-y-auto bg-slate-900">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium transition ${
                        isActive ? 'bg-brand-600 text-white' : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-5 h-5" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-xs px-2 py-0.5 rounded-full bg-slate-800 text-slate-300">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResetConfirmOpen(true);
                }}
                className="w-full py-2 text-xs text-rose-400 bg-slate-800 rounded-lg flex items-center justify-center gap-2"
              >
                <RefreshCw className="w-4 h-4" /> Reset Demo Dataset
              </button>
            </div>
          </div>
        )}

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-slate-200 px-4 sm:px-6 flex items-center justify-between shrink-0 no-print">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-slate-500 hover:text-slate-700 p-1.5 rounded-lg border border-slate-200"
                aria-label="Toggle navigation menu"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div>
                <h2 className="text-base sm:text-lg font-bold text-slate-900 leading-tight">
                  {getPageTitle()}
                </h2>
                <p className="text-xs text-slate-500 hidden sm:block">
                  Fictional IT Services Sales Operations Hub • Mohali & Chandigarh
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-2 sm:gap-3">
              <button
                onClick={() => setIsLogActivityOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition border border-slate-200 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-600" />
                <span>Log Activity</span>
              </button>

              <button
                onClick={() => navigate('/proposals')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-brand-700 bg-brand-50 hover:bg-brand-100 rounded-lg transition border border-brand-200 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-brand-600" />
                <span>New Proposal</span>
              </button>

              <button
                onClick={() => setIsAddLeadOpen(true)}
                className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span>Add Lead</span>
              </button>
            </div>
          </header>

          {/* Main Scrollable View */}
          <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 bg-slate-50">
            <Outlet />
          </main>
        </div>
      </div>

      {/* Global Modals */}
      <AddLeadModal isOpen={isAddLeadOpen} onClose={() => setIsAddLeadOpen(false)} />
      <LogActivityModal
        isOpen={isLogActivityOpen}
        onClose={() => setIsLogActivityOpen(false)}
      />
      <ConfirmModal
        isOpen={isResetConfirmOpen}
        onClose={() => setIsResetConfirmOpen(false)}
        onConfirm={resetData}
        title="Reset Demo Dataset?"
        message="This action will restore all fictional leads, bidding opportunities, proposals, and CRM records back to default starting states. Any customized test records you created will be reset."
        confirmLabel="Reset to Default Demo"
        isDestructive={true}
      />
      <ToastContainer />
    </div>
  );
};
