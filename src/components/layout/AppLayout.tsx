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
  ChevronLeft,
  ChevronRight,
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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
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
      <div className="bg-navy-950 text-slate-300 px-3 sm:px-4 py-1.5 text-xs flex flex-wrap items-center justify-between border-b border-navy-900 no-print z-30">
        <div className="flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
          <span className="font-semibold text-white tracking-wide">Nexora Digital Solutions</span>
          <span className="text-slate-400 hidden sm:inline">• BDE Sales Operations Portfolio</span>
        </div>
        <div className="flex items-center gap-3">
          <span className="inline-flex items-center gap-1 text-[11px] text-amber-300 bg-amber-950/60 px-2 py-0.5 rounded border border-amber-800/40">
            <ShieldAlert className="w-3 h-3" /> Fictional Demonstration
          </span>
          <NavLink
            to="/portfolio"
            className="text-xs text-brand-300 hover:text-white underline underline-offset-2 flex items-center gap-1 transition"
          >
            Portfolio View <ExternalLink className="w-3 h-3" />
          </NavLink>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Collapsible Sidebar (Slidebar) */}
        <aside
          className={`${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } bg-slate-900 text-slate-200 hidden md:flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 ease-in-out relative no-print z-20`}
        >
          {/* Header */}
          <div className="p-4 border-b border-slate-800/80 relative">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-sm shadow-md shadow-brand-500/20 shrink-0">
                NX
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden transition-opacity duration-200">
                  <h1 className="font-bold text-sm text-white leading-tight truncate">Nexora Sales Ops</h1>
                  <p className="text-[11px] text-slate-400 truncate">Mohali / Chandigarh Hub</p>
                </div>
              )}
            </div>

            {!sidebarCollapsed && (
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
            )}

            {/* Collapse/Expand Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-slate-800 border border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center shadow-md transition"
              title={sidebarCollapsed ? 'Expand Sidebar' : 'Collapse Sidebar'}
              aria-label="Toggle sidebar collapse"
            >
              {sidebarCollapsed ? (
                <ChevronRight className="w-3.5 h-3.5" />
              ) : (
                <ChevronLeft className="w-3.5 h-3.5" />
              )}
            </button>
          </div>

          {/* Navigation Links */}
          <nav className="flex-1 px-2.5 py-3 space-y-0.5 overflow-y-auto">
            {navItems.map((item) => {
              const Icon = item.icon;
              return (
                <NavLink
                  key={item.path}
                  to={item.path}
                  end={item.path === '/'}
                  title={sidebarCollapsed ? item.label : undefined}
                  className={({ isActive }) =>
                    `flex items-center ${
                      sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-3'
                    } py-2 rounded-lg text-xs font-medium transition ${
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
                    {!sidebarCollapsed && <span className="truncate">{item.label}</span>}
                  </div>
                  {!sidebarCollapsed && item.badge !== undefined && (
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

          {/* Candidate Profile: Keshav Sood */}
          <div className="p-3 border-t border-slate-800 bg-slate-950/40">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-7 h-7 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white shrink-0">
                  KS
                </div>
                {!sidebarCollapsed && (
                  <div className="text-left min-w-0 truncate">
                    <div className="text-xs font-bold text-white truncate">Keshav Sood</div>
                    <div className="text-[10px] text-slate-400 truncate">Business Dev Executive</div>
                  </div>
                )}
              </div>
            </div>
            {!sidebarCollapsed && (
              <button
                onClick={() => setIsResetConfirmOpen(true)}
                className="w-full flex items-center justify-center gap-1.5 px-2.5 py-1.5 text-[11px] font-medium text-slate-400 hover:text-rose-400 bg-slate-800/60 hover:bg-slate-800 rounded-md transition border border-slate-700/60"
              >
                <RefreshCw className="w-3 h-3" /> Reset Demo Dataset
              </button>
            )}
          </div>
        </aside>

        {/* Mobile Slide-over Slidebar (Drawer with Backdrop) */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {/* Dimmed backdrop */}
          <div
            className={`fixed inset-0 bg-slate-950/70 backdrop-blur-xs transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding drawer panel */}
          <div
            className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 text-slate-200 flex flex-col shadow-2xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out z-10 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-2.5">
                <div className="w-7 h-7 rounded-lg bg-brand-600 flex items-center justify-center text-white font-bold text-xs">
                  NX
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">Nexora Sales Ops</span>
                  <span className="text-[10px] text-slate-400">Mohali Hub</span>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-1.5 rounded-lg hover:bg-slate-800"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex-1 p-3 space-y-1 overflow-y-auto">
              {navItems.map((item) => {
                const Icon = item.icon;
                return (
                  <NavLink
                    key={item.path}
                    to={item.path}
                    end={item.path === '/'}
                    onClick={() => setMobileMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center justify-between px-3 py-2.5 rounded-lg text-xs font-medium transition ${
                        isActive ? 'bg-brand-600 text-white shadow-xs' : 'text-slate-300 hover:bg-slate-800'
                      }`
                    }
                  >
                    <div className="flex items-center gap-3">
                      <Icon className="w-4 h-4 shrink-0" />
                      <span>{item.label}</span>
                    </div>
                    {item.badge !== undefined && (
                      <span className="text-[10px] px-2 py-0.5 rounded-full bg-slate-800 text-slate-300 border border-slate-700">
                        {item.badge}
                      </span>
                    )}
                  </NavLink>
                );
              })}
            </nav>

            {/* Drawer Footer with Keshav Sood profile */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 space-y-3">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-brand-600 flex items-center justify-center text-xs font-bold text-white">
                  KS
                </div>
                <div>
                  <div className="text-xs font-bold text-white">Keshav Sood</div>
                  <div className="text-[10px] text-slate-400">Business Development Executive</div>
                </div>
              </div>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  setIsResetConfirmOpen(true);
                }}
                className="w-full py-1.5 text-xs text-rose-400 hover:text-rose-300 bg-slate-800/80 rounded-lg flex items-center justify-center gap-2 border border-slate-700"
              >
                <RefreshCw className="w-3.5 h-3.5" /> Reset Demo Dataset
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-white border-b border-slate-200 px-3 sm:px-6 flex items-center justify-between shrink-0 no-print z-10">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-slate-700 hover:text-slate-900 p-2 rounded-lg border border-slate-200 bg-slate-50 hover:bg-slate-100"
                aria-label="Toggle navigation drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 leading-tight truncate">
                  {getPageTitle()}
                </h2>
                <p className="text-[11px] text-slate-500 hidden sm:block truncate">
                  Nexora Digital Solutions • Mohali BDE Operations Suite
                </p>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="flex items-center gap-1.5 sm:gap-2.5 shrink-0">
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
                className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg transition shadow-xs"
              >
                <Plus className="w-4 h-4" />
                <span className="hidden xs:inline">Add</span> Lead
              </button>
            </div>
          </header>

          {/* Main Scrollable View */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-5 lg:p-7 bg-slate-50">
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
        message="This action will restore all fictional leads, bidding opportunities, proposals, and CRM records back to default starting states."
        confirmLabel="Reset to Default Demo"
        isDestructive={true}
      />
      <ToastContainer />
    </div>
  );
};
