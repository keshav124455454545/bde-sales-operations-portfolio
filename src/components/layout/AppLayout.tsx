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
  ChevronLeft,
  ChevronRight,
  Sun,
  Moon,
  Sparkles,
  Zap,
} from 'lucide-react';
import { useApp } from '../../context/AppContext';
import { AddLeadModal } from '../modals/AddLeadModal';
import { LogActivityModal } from '../modals/LogActivityModal';
import { ConfirmModal } from '../common/ConfirmModal';
import { ToastContainer } from '../common/ToastContainer';

interface NavItem {
  path: string;
  label: string;
  icon: React.ComponentType<{ className?: string }>;
  badge?: string | number;
  badgeColor?: string;
  highlight?: boolean;
}

interface NavCategory {
  category: string;
  items: NavItem[];
}

export const AppLayout: React.FC = () => {
  const { stats, resetData, theme, toggleTheme } = useApp();
  const navigate = useNavigate();
  const location = useLocation();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [isAddLeadOpen, setIsAddLeadOpen] = useState(false);
  const [isLogActivityOpen, setIsLogActivityOpen] = useState(false);
  const [isResetConfirmOpen, setIsResetConfirmOpen] = useState(false);

  const navCategories: NavCategory[] = [
    {
      category: 'Core Operations',
      items: [
        { path: '/', label: 'Dashboard', icon: LayoutDashboard },
        { path: '/leads', label: 'Leads & Prospects', icon: Users, badge: stats.totalLeads },
        { path: '/pipeline', label: 'Sales Pipeline', icon: Kanban },
      ],
    },
    {
      category: 'Acquisition & Channels',
      items: [
        { path: '/prospecting', label: 'Prospecting Workspace', icon: Compass },
        { path: '/bidding', label: 'Bidding Opportunities', icon: Flame, badge: stats.activeBids },
        { path: '/network', label: 'Network & Contacts', icon: Share2 },
      ],
    },
    {
      category: 'Closing & Execution',
      items: [
        { path: '/services', label: 'Services Catalogue', icon: Layers },
        { path: '/proposals', label: 'Proposals Builder', icon: FileText },
        {
          path: '/activities',
          label: 'Activities & Reminders',
          icon: CalendarCheck,
          badge: stats.overdueFollowUps > 0 ? `${stats.overdueFollowUps} due` : undefined,
          badgeColor: 'bg-rose-500 text-white',
        },
      ],
    },
    {
      category: 'Analytics & System',
      items: [
        { path: '/reports', label: 'Analytics & Reports', icon: BarChart3 },
        { path: '/market-research', label: 'Market Research', icon: Search },
        { path: '/portfolio', label: 'Executive Portfolio', icon: Briefcase, highlight: true },
        { path: '/settings', label: 'Settings & Data', icon: Settings },
      ],
    },
  ];

  // Flat items for title lookup
  const allNavItems = navCategories.flatMap((c) => c.items);

  const getPageTitle = () => {
    const item = allNavItems.find((n) => n.path === location.pathname);
    return item ? item.label : 'Sales Operations Workspace';
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#0b0f19] flex flex-col font-sans text-slate-800 dark:text-slate-100 transition-colors duration-200">
      {/* Top Operations Header Bar */}
      <div className="bg-navy-950 dark:bg-[#020617] text-slate-300 px-3 sm:px-6 py-2 text-xs flex flex-wrap items-center justify-between border-b border-navy-900 dark:border-slate-900 no-print z-30 transition-colors">
        <div className="flex items-center gap-2.5">
          <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-[11px] font-medium">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
            <span>Live Workspace</span>
          </div>
          <span className="font-semibold text-white tracking-wide">Nexora Digital Solutions</span>
          <span className="text-slate-500 hidden md:inline">•</span>
          <span className="text-slate-400 hidden md:inline">Phase 8B, Mohali & Chandigarh IT Park</span>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden lg:flex items-center gap-2 text-[11px] text-slate-400">
            <span>Weighted Pipeline:</span>
            <span className="font-bold text-emerald-400">${stats.pipelineValue.toLocaleString()} USD</span>
          </div>

          <NavLink
            to="/portfolio"
            className="inline-flex items-center gap-1.5 px-2.5 py-1 text-xs font-semibold text-brand-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-lg border border-slate-700/80 transition"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Recruiter Portfolio</span>
            <ExternalLink className="w-3 h-3" />
          </NavLink>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden relative">
        {/* Desktop Collapsible Sidebar (Slidebar) */}
        <aside
          className={`${
            sidebarCollapsed ? 'w-20' : 'w-64'
          } bg-slate-900 dark:bg-[#0f172a] text-slate-200 hidden md:flex flex-col border-r border-slate-800 shrink-0 transition-all duration-300 ease-in-out relative no-print z-20 shadow-xl`}
        >
          {/* Sidebar Agency Header */}
          <div className="p-4 border-b border-slate-800/90 relative">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-white font-extrabold text-sm shadow-md shadow-brand-500/25 shrink-0">
                NX
              </div>
              {!sidebarCollapsed && (
                <div className="overflow-hidden transition-opacity duration-200">
                  <h1 className="font-bold text-sm text-white leading-tight truncate">Nexora Sales Ops</h1>
                  <p className="text-[11px] text-slate-400 truncate flex items-center gap-1 mt-0.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                    <span>Mohali IT Park Hub</span>
                  </p>
                </div>
              )}
            </div>

            {/* Collapse/Expand Toggle Button */}
            <button
              onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
              className="absolute -right-3 top-5 w-6 h-6 rounded-full bg-slate-800 dark:bg-slate-700 border border-slate-700 dark:border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center shadow-lg transition-all z-30"
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

          {/* Candidate Profile Card: Keshav Sood (Prominently Placed at Top) */}
          <div className="p-3 border-b border-slate-800/80 bg-slate-950/40 dark:bg-[#0a0f1d]">
            <div
              className={`flex items-center ${
                sidebarCollapsed ? 'justify-center p-1' : 'gap-2.5 p-2'
              } rounded-xl bg-slate-800/40 border border-slate-700/50 transition-all`}
            >
              <div className="relative shrink-0">
                <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-white/10">
                  KS
                </div>
                <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
              </div>
              {!sidebarCollapsed && (
                <div className="text-left min-w-0 flex-1 truncate">
                  <div className="text-xs font-bold text-white truncate flex items-center justify-between gap-1">
                    <span className="truncate">Keshav Sood</span>
                    <span className="text-[9px] uppercase font-bold text-brand-300 bg-brand-500/20 px-1.5 py-0.2 rounded border border-brand-500/30 shrink-0">
                      BDE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate">
                    Online Bidding Specialist
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Grouped Navigation Links */}
          <nav className="flex-1 px-3 py-3 space-y-4 overflow-y-auto">
            {navCategories.map((group, groupIdx) => (
              <div key={groupIdx} className="space-y-1">
                {!sidebarCollapsed && (
                  <div className="px-3 pt-1 pb-1.5 text-[10px] font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500">
                    {group.category}
                  </div>
                )}
                {group.items.map((item) => {
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
                        } py-2 rounded-xl text-xs font-medium transition-all ${
                          isActive
                            ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold shadow-md shadow-brand-500/20'
                            : item.highlight
                            ? 'text-brand-300 hover:bg-slate-800 hover:text-white border border-brand-500/30'
                            : 'text-slate-300 hover:bg-slate-800/80 hover:text-white'
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
              </div>
            ))}
          </nav>
        </aside>

        {/* Mobile Slide-over Slidebar (Drawer with Backdrop) */}
        <div
          className={`fixed inset-0 z-50 md:hidden transition-all duration-300 ease-in-out ${
            mobileMenuOpen ? 'visible pointer-events-auto' : 'invisible pointer-events-none'
          }`}
        >
          {/* Dimmed backdrop */}
          <div
            className={`fixed inset-0 bg-slate-950/80 backdrop-blur-xs transition-opacity duration-300 ${
              mobileMenuOpen ? 'opacity-100' : 'opacity-0'
            }`}
            onClick={() => setMobileMenuOpen(false)}
          />

          {/* Sliding drawer panel */}
          <div
            className={`fixed inset-y-0 left-0 w-72 max-w-[85vw] bg-slate-900 dark:bg-[#0f172a] text-slate-200 flex flex-col shadow-2xl border-r border-slate-800 transform transition-transform duration-300 ease-in-out z-10 ${
              mobileMenuOpen ? 'translate-x-0' : '-translate-x-full'
            }`}
          >
            {/* Drawer Header */}
            <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-950/80">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-brand-600 flex items-center justify-center text-white font-bold text-xs shadow-md">
                  NX
                </div>
                <div>
                  <span className="font-bold text-white text-sm block">Nexora Sales Ops</span>
                  <p className="text-[10px] text-slate-400">Mohali IT Park Hub</p>
                </div>
              </div>
              <button
                onClick={() => setMobileMenuOpen(false)}
                className="text-slate-400 hover:text-white p-2 rounded-xl hover:bg-slate-800 transition"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Candidate Profile at Top of Mobile Drawer */}
            <div className="p-3 border-b border-slate-800 bg-slate-950/60">
              <div className="flex items-center gap-3 p-2 rounded-xl bg-slate-800/40 border border-slate-700/50">
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-sm ring-1 ring-white/10">
                    KS
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-400 border-2 border-slate-900"></span>
                </div>
                <div className="min-w-0 flex-1">
                  <div className="text-xs font-bold text-white flex items-center justify-between gap-1">
                    <span className="truncate">Keshav Sood</span>
                    <span className="text-[9px] uppercase font-bold text-brand-300 bg-brand-500/20 px-1.5 py-0.2 rounded border border-brand-500/30">
                      BDE
                    </span>
                  </div>
                  <div className="text-[10px] text-slate-400 truncate mt-0.5">
                    Online Bidding Specialist
                  </div>
                </div>
              </div>
            </div>

            {/* Drawer Navigation Links */}
            <nav className="flex-1 p-3 space-y-4 overflow-y-auto">
              {navCategories.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-1">
                  <div className="px-3 pt-1 pb-1 text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    {group.category}
                  </div>
                  {group.items.map((item) => {
                    const Icon = item.icon;
                    return (
                      <NavLink
                        key={item.path}
                        to={item.path}
                        end={item.path === '/'}
                        onClick={() => setMobileMenuOpen(false)}
                        className={({ isActive }) =>
                          `flex items-center justify-between px-3 py-2.5 rounded-xl text-xs font-medium transition ${
                            isActive
                              ? 'bg-gradient-to-r from-brand-600 to-indigo-600 text-white font-semibold shadow-md'
                              : 'text-slate-300 hover:bg-slate-800'
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
                </div>
              ))}
            </nav>

            {/* Mobile Drawer Footer with Dark Mode Toggle */}
            <div className="p-4 bg-slate-950 border-t border-slate-800">
              <button
                onClick={toggleTheme}
                className="w-full py-2 px-3 text-xs font-semibold text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-800 rounded-xl flex items-center justify-center gap-2 border border-slate-700 transition"
              >
                {theme === 'dark' ? (
                  <>
                    <Sun className="w-4 h-4 text-amber-400" /> Switch to Light Mode
                  </>
                ) : (
                  <>
                    <Moon className="w-4 h-4 text-indigo-300" /> Switch to Dark Mode
                  </>
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Main Workspace Area */}
        <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Top Header */}
          <header className="h-16 bg-white dark:bg-[#0f172a] border-b border-slate-200/80 dark:border-slate-800/80 px-3 sm:px-6 flex items-center justify-between shrink-0 no-print z-10 transition-colors">
            <div className="flex items-center gap-2.5 sm:gap-3 min-w-0">
              <button
                onClick={() => setMobileMenuOpen(true)}
                className="md:hidden text-slate-700 dark:text-slate-300 hover:text-slate-900 p-2 rounded-xl border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 transition"
                aria-label="Toggle navigation drawer"
              >
                <Menu className="w-5 h-5" />
              </button>
              <div className="min-w-0">
                <h2 className="text-sm sm:text-base lg:text-lg font-bold text-slate-900 dark:text-white leading-tight truncate">
                  {getPageTitle()}
                </h2>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate">
                  Nexora Digital Solutions • Mohali BDE Operations Suite
                </p>
              </div>
            </div>

            {/* Header Right Actions */}
            <div className="flex items-center gap-2 sm:gap-3 shrink-0">
              {/* Recruiter Active Badge */}
              <div className="hidden xl:flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/80 text-xs">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-emerald-800 dark:text-emerald-300 font-semibold">Keshav Sood</span>
                <span className="text-emerald-600 dark:text-emerald-400">• Mohali / Chandigarh Candidate</span>
              </div>

              {/* Dark Mode Toggle Button */}
              <button
                onClick={toggleTheme}
                className="p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-700/80 transition shadow-2xs"
                title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
                aria-label="Toggle dark mode"
              >
                {theme === 'dark' ? (
                  <Sun className="w-4 h-4 text-amber-400 transition-transform rotate-0 hover:rotate-45" />
                ) : (
                  <Moon className="w-4 h-4 text-slate-700 transition-transform" />
                )}
              </button>

              <button
                onClick={() => setIsLogActivityOpen(true)}
                className="hidden lg:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 rounded-xl transition border border-slate-200 dark:border-slate-700 shadow-2xs"
              >
                <PhoneCall className="w-3.5 h-3.5 text-slate-600 dark:text-slate-400" />
                <span>Log Activity</span>
              </button>

              <button
                onClick={() => navigate('/proposals')}
                className="hidden sm:inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/60 hover:bg-brand-100 dark:hover:bg-brand-900/60 rounded-xl transition border border-brand-200 dark:border-brand-800 shadow-2xs"
              >
                <FileText className="w-3.5 h-3.5 text-brand-600 dark:text-brand-400" />
                <span>New Proposal</span>
              </button>

              <button
                onClick={() => setIsAddLeadOpen(true)}
                className="inline-flex items-center gap-1 px-3 sm:px-3.5 py-1.5 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl transition shadow-md shadow-brand-500/20"
              >
                <Plus className="w-4 h-4" />
                <span>Add Prospect</span>
              </button>

              {/* Candidate Profile Chip */}
              <div className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800">
                <div className="relative shrink-0">
                  <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-brand-500 to-indigo-600 flex items-center justify-center text-xs font-bold text-white shadow-xs">
                    KS
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-2 h-2 rounded-full bg-emerald-400 border-2 border-white dark:border-[#0f172a]"></span>
                </div>
                <div className="hidden sm:block text-left min-w-0">
                  <div className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Keshav Sood
                  </div>
                  <div className="text-[10px] text-slate-500 dark:text-slate-400 leading-tight">
                    BDE Specialist
                  </div>
                </div>
              </div>
            </div>
          </header>

          {/* Page Outlet Container */}
          <main className="flex-1 overflow-y-auto p-3 sm:p-6 bg-slate-50/70 dark:bg-[#0b0f19] transition-colors">
            <Outlet />
          </main>
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
        message="Are you sure you want to restore the standard baseline dataset? Any newly created leads or test records will be reset."
        confirmLabel="Yes, Reset Records"
      />
      <ToastContainer />
    </div>
  );
};
