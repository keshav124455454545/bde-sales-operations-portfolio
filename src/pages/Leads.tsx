import React, { useState, useMemo } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  Users,
  Search,
  Filter,
  Download,
  Upload,
  Plus,
  ArrowUpDown,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Briefcase,
  Globe,
  Mail,
  Phone,
  CheckCircle2,
  FileText,
  PhoneCall,
  History,
  X,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Lead, PipelineStage, Priority, LeadSource } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { EmptyState } from '../components/common/EmptyState';
import { AddLeadModal } from '../components/modals/AddLeadModal';
import { LogActivityModal } from '../components/modals/LogActivityModal';
import { exportLeadsToCSV, parseLeadsCSV } from '../services/storage';

export const Leads: React.FC = () => {
  const { leads, updateLead, deleteLead, updateLeadStage, importLeads, services, showToast } =
    useApp();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  // Selected lead for detail drawer
  const targetId = searchParams.get('id');
  const [selectedLeadId, setSelectedLeadId] = useState<string | null>(targetId);

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [deletingLeadId, setDeletingLeadId] = useState<string | null>(null);
  const [isImportOpen, setIsImportOpen] = useState(false);
  const [importText, setImportText] = useState('');
  const [importErrors, setImportErrors] = useState<string[]>([]);
  const [activityLead, setActivityLead] = useState<Lead | null>(null);

  // Filters and search
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sourceFilter, setSourceFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  const [serviceFilter, setServiceFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'date' | 'value' | 'company' | 'followup'>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Filtered & sorted leads
  const filteredLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const matchesSearch =
          searchQuery === '' ||
          lead.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.contactPerson.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.industry.toLowerCase().includes(searchQuery.toLowerCase()) ||
          lead.serviceOfInterest.toLowerCase().includes(searchQuery.toLowerCase());

        const matchesStatus = statusFilter === 'all' || lead.status === statusFilter;
        const matchesSource = sourceFilter === 'all' || lead.source === sourceFilter;
        const matchesPriority = priorityFilter === 'all' || lead.priority === priorityFilter;
        const matchesService = serviceFilter === 'all' || lead.serviceOfInterest === serviceFilter;

        return matchesSearch && matchesStatus && matchesSource && matchesPriority && matchesService;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'date') {
          comparison = a.dateCreated.localeCompare(b.dateCreated);
        } else if (sortBy === 'value') {
          comparison = a.estimatedDealValue - b.estimatedDealValue;
        } else if (sortBy === 'company') {
          comparison = a.companyName.localeCompare(b.companyName);
        } else if (sortBy === 'followup') {
          comparison = a.nextFollowUpDate.localeCompare(b.nextFollowUpDate);
        }
        return sortOrder === 'desc' ? -comparison : comparison;
      });
  }, [
    leads,
    searchQuery,
    statusFilter,
    sourceFilter,
    priorityFilter,
    serviceFilter,
    sortBy,
    sortOrder,
  ]);

  const selectedLead = leads.find((l) => l.id === selectedLeadId);

  // Handle CSV Import
  const handleCSVImport = () => {
    if (!importText.trim()) {
      setImportErrors(['Please paste CSV content or select a file.']);
      return;
    }
    const { imported, errors } = parseLeadsCSV(importText);
    if (errors.length > 0 && imported.length === 0) {
      setImportErrors(errors);
      return;
    }
    if (imported.length > 0) {
      importLeads(imported);
      setIsImportOpen(false);
      setImportText('');
      setImportErrors([]);
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      const text = event.target?.result as string;
      setImportText(text);
    };
    reader.readAsText(file);
  };

  return (
    <div className="space-y-6">
      {/* Top Header & Actions */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Users className="w-5 h-5" />
            </div>
            Lead & Prospect Database
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Central repository of targeted prospective client accounts, contact intelligence, and stage history.
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportLeadsToCSV(filteredLeads)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition"
            title="Export filtered records to CSV"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Export CSV ({filteredLeads.length})
          </button>

          <button
            onClick={() => setIsImportOpen(true)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition"
          >
            <Upload className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Import CSV
          </button>

          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Add Lead
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="bg-white dark:bg-[#131c2e] p-5 rounded-2xl border border-slate-200/80 dark:border-slate-800/80 shadow-sm space-y-3.5 transition-all">
        <div className="flex flex-col md:flex-row gap-3">
          {/* Search */}
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            <input
              type="text"
              placeholder="Search by company, decision maker, industry, or service..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-slate-400 hover:text-slate-600 text-xs"
              >
                Clear
              </button>
            )}
          </div>

          {/* Quick Stats Pill */}
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-3.5 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 shrink-0">
            <span>Showing: <strong className="text-slate-900 dark:text-white">{filteredLeads.length}</strong> of {leads.length} leads</span>
          </div>
        </div>

        {/* Dropdown Filters */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Stages</option>
              <option value="New Lead">New Lead</option>
              <option value="Contacted">Contacted</option>
              <option value="Qualified">Qualified</option>
              <option value="Meeting Scheduled">Meeting Scheduled</option>
              <option value="Proposal">Proposal</option>
              <option value="Negotiation">Negotiation</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Source</label>
            <select
              value={sourceFilter}
              onChange={(e) => setSourceFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Sources</option>
              <option value="LinkedIn">LinkedIn</option>
              <option value="LinkedIn Sales Navigator">Sales Navigator</option>
              <option value="Company Website">Company Website</option>
              <option value="Upwork">Upwork</option>
              <option value="Freelancer">Freelancer</option>
              <option value="PeoplePerHour">PeoplePerHour</option>
              <option value="Referral">Referral</option>
              <option value="Networking">Networking</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Priority</label>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Priorities</option>
              <option value="Urgent">Urgent</option>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Service</label>
            <select
              value={serviceFilter}
              onChange={(e) => setServiceFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
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
            <label className="block text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-1">Sort By</label>
            <div className="flex gap-1.5">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as any)}
                className="w-full px-2 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
              >
                <option value="date">Date Added</option>
                <option value="value">Deal Value</option>
                <option value="company">Company Name</option>
                <option value="followup">Follow-Up Date</option>
              </select>
              <button
                onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                className="p-1.5 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 hover:bg-slate-100 dark:hover:bg-slate-700 text-slate-600 dark:text-slate-300 transition"
                title={`Sort ${sortOrder === 'asc' ? 'Descending' : 'Ascending'}`}
              >
                <ArrowUpDown className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Leads Table */}
      <div className="figma-card overflow-hidden">
        {filteredLeads.length === 0 ? (
          <EmptyState
            icon={Users}
            title="No Leads Found"
            description="No prospects matched your active search or filter criteria. Try adjusting the filters or add a new lead."
            actionLabel="Add New Lead"
            onAction={() => setIsAddOpen(true)}
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-slate-50/80 dark:bg-slate-800/60 border-b border-slate-200 dark:border-slate-800 text-slate-500 dark:text-slate-400 font-bold uppercase text-[10px] tracking-wider">
                  <th className="py-3.5 px-4">Company & Decision Maker</th>
                  <th className="py-3.5 px-4">Service of Interest</th>
                  <th className="py-3.5 px-4">Source</th>
                  <th className="py-3.5 px-4">Pipeline Stage</th>
                  <th className="py-3.5 px-4">Priority</th>
                  <th className="py-3.5 px-4 text-right">Est. Value</th>
                  <th className="py-3.5 px-4">Next Follow-Up</th>
                  <th className="py-3.5 px-4 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
                {filteredLeads.map((lead) => {
                  const today = new Date().toISOString().slice(0, 10);
                  const isOverdue =
                    lead.status !== 'Won' &&
                    lead.status !== 'Lost' &&
                    lead.nextFollowUpDate <= today;

                  return (
                    <tr
                      key={lead.id}
                      onClick={() => setSelectedLeadId(lead.id)}
                      className={`hover:bg-slate-50/80 dark:hover:bg-slate-800/40 cursor-pointer transition ${
                        selectedLeadId === lead.id ? 'bg-brand-50/60 dark:bg-brand-950/30' : ''
                      }`}
                    >
                      <td className="py-3.5 px-4">
                        <div className="font-bold text-slate-900 dark:text-white flex items-center gap-1.5">
                          {lead.companyName}
                          {lead.website && (
                            <a
                              href={lead.website}
                              target="_blank"
                              rel="noreferrer"
                              onClick={(e) => e.stopPropagation()}
                              className="text-slate-400 hover:text-brand-600 dark:hover:text-brand-400"
                            >
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          )}
                        </div>
                        <div className="text-slate-500 dark:text-slate-400 text-[11px] mt-0.5">
                          {lead.contactPerson} • {lead.jobTitle}
                        </div>
                      </td>

                      <td className="py-3.5 px-4">
                        <div className="font-medium text-slate-800 dark:text-slate-200">{lead.serviceOfInterest}</div>
                        <div className="text-[11px] text-slate-400">{lead.industry}</div>
                      </td>

                      <td className="py-3.5 px-4">
                        <span className="text-[11px] text-slate-600 dark:text-slate-300 bg-slate-100 dark:bg-slate-800/90 px-2 py-0.5 rounded-lg border border-slate-200 dark:border-slate-700">
                          {lead.source}
                        </span>
                      </td>

                      <td className="py-3.5 px-4" onClick={(e) => e.stopPropagation()}>
                        <select
                          value={lead.status}
                          onChange={(e) =>
                            updateLeadStage(lead.id, e.target.value as PipelineStage)
                          }
                          className="text-xs bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-lg px-2.5 py-1 font-medium text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
                        >
                          <option value="New Lead">New Lead</option>
                          <option value="Contacted">Contacted</option>
                          <option value="Qualified">Qualified</option>
                          <option value="Meeting Scheduled">Meeting Scheduled</option>
                          <option value="Proposal">Proposal</option>
                          <option value="Negotiation">Negotiation</option>
                          <option value="Won">Won</option>
                          <option value="Lost">Lost</option>
                        </select>
                      </td>

                      <td className="py-3.5 px-4">
                        <Badge variant="priority" value={lead.priority} />
                      </td>

                      <td className="py-3.5 px-4 text-right font-bold text-slate-900 dark:text-white">
                        ${lead.estimatedDealValue.toLocaleString()}
                      </td>

                      <td className="py-3.5 px-4">
                        <div
                          className={`flex items-center gap-1 font-medium ${
                            isOverdue ? 'text-rose-600 dark:text-rose-400 font-semibold' : 'text-slate-600 dark:text-slate-300'
                          }`}
                        >
                          <Clock className="w-3 h-3" />
                          <span>{lead.nextFollowUpDate}</span>
                        </div>
                        {isOverdue && (
                          <span className="text-[10px] bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 px-1.5 py-0.5 rounded font-semibold border border-rose-200 dark:border-rose-900/60 inline-block mt-0.5">
                            Overdue
                          </span>
                        )}
                      </td>

                      <td
                        className="py-3.5 px-4 text-right"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <div className="flex items-center justify-end gap-1">
                          <button
                            onClick={() => setActivityLead(lead)}
                            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            title="Log CRM Activity"
                          >
                            <PhoneCall className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setEditingLead(lead)}
                            className="p-1.5 text-slate-500 dark:text-slate-400 hover:text-brand-600 dark:hover:text-brand-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                            title="Edit Lead Details"
                          >
                            <Edit className="w-3.5 h-3.5" />
                          </button>
                          <button
                            onClick={() => setDeletingLeadId(lead.id)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                            title="Delete Lead"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>

      {/* Lead Detail Drawer / Modal */}
      {selectedLead && (
        <Modal
          isOpen={!!selectedLead}
          onClose={() => setSelectedLeadId(null)}
          title={selectedLead.companyName}
          subtitle={`Lead ID: ${selectedLead.id} • Owner: ${selectedLead.leadOwner}`}
          maxWidth="4xl"
        >
          <div className="space-y-6">
            {/* Lead Status Bar */}
            <div className="bg-slate-50 dark:bg-slate-800/80 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Badge variant="stage" value={selectedLead.status} />
                <Badge variant="priority" value={selectedLead.priority} />
                <span className="text-xs text-slate-500 dark:text-slate-400">
                  Est. Value:{' '}
                  <strong className="text-emerald-700 dark:text-emerald-400 font-bold">
                    ${selectedLead.estimatedDealValue.toLocaleString()} USD
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigate(`/proposals?new=true&leadId=${selectedLead.id}`);
                  }}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
                >
                  <FileText className="w-3.5 h-3.5" /> Draft Proposal
                </button>
                <button
                  onClick={() => setActivityLead(selectedLead)}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-700 border border-slate-300 dark:border-slate-600 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition"
                >
                  <PhoneCall className="w-3.5 h-3.5" /> Log Touchpoint
                </button>
              </div>
            </div>

            {/* Grid details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                  <Briefcase className="w-4 h-4 text-brand-600 dark:text-brand-400" /> Company & Contact Information
                </h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Decision Maker:</span>{' '}
                    <strong className="text-slate-900 dark:text-white">{selectedLead.contactPerson}</strong> (
                    {selectedLead.jobTitle})
                  </div>
                  {selectedLead.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <a href={`mailto:${selectedLead.email}`} className="text-brand-600 dark:text-brand-400 hover:underline">
                        {selectedLead.email}
                      </a>
                    </div>
                  )}
                  {selectedLead.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                      <span>{selectedLead.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Globe className="w-3.5 h-3.5 text-slate-400 dark:text-slate-500" />
                    <a
                      href={selectedLead.website}
                      target="_blank"
                      rel="noreferrer"
                      className="text-brand-600 dark:text-brand-400 hover:underline truncate"
                    >
                      {selectedLead.website}
                    </a>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Location:</span> {selectedLead.city},{' '}
                    {selectedLead.country}
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Company Size & Industry:</span>{' '}
                    {selectedLead.companySize} • {selectedLead.industry}
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Acquisition Source:</span>{' '}
                    <span className="font-semibold text-slate-700 dark:text-slate-200">{selectedLead.source}</span>
                  </div>
                </div>
              </div>

              <div className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
                <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-brand-600 dark:text-brand-400" /> BDE Qualification & Next Steps
                </h4>
                <div className="space-y-2 text-slate-600 dark:text-slate-300">
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Service of Interest:</span>{' '}
                    <span className="font-semibold text-brand-700 dark:text-brand-400">
                      {selectedLead.serviceOfInterest}
                    </span>
                  </div>
                  <div>
                    <span className="text-slate-400 dark:text-slate-500">Next Action Item:</span>{' '}
                    <p className="font-medium text-slate-900 dark:text-slate-100 bg-amber-50 dark:bg-amber-950/30 p-2 rounded-lg border border-amber-200/60 dark:border-amber-900/60 mt-1">
                      {selectedLead.nextAction}
                    </p>
                  </div>
                  <div className="flex justify-between items-center pt-1">
                    <span>
                      <span className="text-slate-400 dark:text-slate-500">Last Touch:</span>{' '}
                      {selectedLead.lastContactDate}
                    </span>
                    <span>
                      <span className="text-slate-400 dark:text-slate-500">Follow-up Due:</span>{' '}
                      <strong className="text-rose-600 dark:text-rose-400 font-semibold">
                        {selectedLead.nextFollowUpDate}
                      </strong>
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Business Problem & Qualification Notes */}
            <div className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-2 text-xs">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm">
                Observed Business Pain & Opportunity
              </h4>
              <p className="text-slate-700 dark:text-slate-300 leading-relaxed bg-slate-50 dark:bg-slate-900/40 p-3 rounded-lg border border-slate-100 dark:border-slate-800">
                {selectedLead.businessProblem}
              </p>
              <div className="pt-2">
                <span className="text-slate-400 dark:text-slate-500 font-semibold">BDE Qualification Notes:</span>
                <p className="text-slate-600 dark:text-slate-300 mt-0.5">{selectedLead.qualificationNotes}</p>
              </div>
            </div>

            {/* Stage History Timeline */}
            <div className="bg-white dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 space-y-3">
              <h4 className="font-bold text-slate-800 dark:text-slate-100 text-sm flex items-center gap-2">
                <History className="w-4 h-4 text-brand-600 dark:text-brand-400" /> Pipeline Stage Progression History
              </h4>
              <div className="space-y-2.5">
                {selectedLead.stageHistory.map((hist, idx) => (
                  <div
                    key={idx}
                    className="flex items-start gap-3 text-xs pl-2 border-l-2 border-brand-500 py-1"
                  >
                    <div className="w-20 text-[11px] text-slate-400 dark:text-slate-500 font-mono shrink-0">
                      {hist.date}
                    </div>
                    <div>
                      <Badge variant="stage" value={hist.stage} />
                      {hist.notes && (
                        <p className="text-slate-600 dark:text-slate-300 mt-1 text-[11px]">{hist.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Edit Lead Modal */}
      {editingLead && (
        <Modal
          isOpen={!!editingLead}
          onClose={() => setEditingLead(null)}
          title={`Edit Lead: ${editingLead.companyName}`}
          maxWidth="4xl"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateLead(editingLead);
              setEditingLead(null);
            }}
            className="space-y-4"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Company</label>
                <input
                  type="text"
                  value={editingLead.companyName}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, companyName: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Website</label>
                <input
                  type="text"
                  value={editingLead.website}
                  onChange={(e) => setEditingLead({ ...editingLead, website: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Contact Person</label>
                <input
                  type="text"
                  value={editingLead.contactPerson}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, contactPerson: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Job Title</label>
                <input
                  type="text"
                  value={editingLead.jobTitle}
                  onChange={(e) => setEditingLead({ ...editingLead, jobTitle: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                  required
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Email</label>
                <input
                  type="email"
                  value={editingLead.email || ''}
                  onChange={(e) => setEditingLead({ ...editingLead, email: e.target.value })}
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Stage</label>
                <select
                  value={editingLead.status}
                  onChange={(e) =>
                    setEditingLead({
                      ...editingLead,
                      status: e.target.value as PipelineStage,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg bg-white"
                >
                  <option value="New Lead">New Lead</option>
                  <option value="Contacted">Contacted</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Meeting Scheduled">Meeting Scheduled</option>
                  <option value="Proposal">Proposal</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Est. Deal Value ($)</label>
                <input
                  type="number"
                  value={editingLead.estimatedDealValue}
                  onChange={(e) =>
                    setEditingLead({
                      ...editingLead,
                      estimatedDealValue: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">Follow-Up Date</label>
                <input
                  type="date"
                  value={editingLead.nextFollowUpDate}
                  onChange={(e) =>
                    setEditingLead({ ...editingLead, nextFollowUpDate: e.target.value })
                  }
                  className="w-full px-3 py-2 text-sm border rounded-lg"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Next Action</label>
              <input
                type="text"
                value={editingLead.nextAction}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, nextAction: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Business Problem</label>
              <textarea
                rows={2}
                value={editingLead.businessProblem}
                onChange={(e) =>
                  setEditingLead({ ...editingLead, businessProblem: e.target.value })
                }
                className="w-full px-3 py-2 text-sm border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingLead(null)}
                className="px-4 py-2 text-sm border rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 text-sm bg-brand-600 text-white rounded-lg hover:bg-brand-700"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* CSV Import Modal */}
      <Modal
        isOpen={isImportOpen}
        onClose={() => {
          setIsImportOpen(false);
          setImportErrors([]);
        }}
        title="Batch Import Leads from CSV"
        subtitle="Paste CSV text or upload a .csv file with headers: Company Name, Contact Person, Industry, Service, Deal Value."
        maxWidth="2xl"
      >
        <div className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Upload CSV File</label>
            <input
              type="file"
              accept=".csv"
              onChange={handleFileUpload}
              className="text-xs text-slate-500 file:mr-4 file:py-2 file:px-4 file:rounded-md file:border-0 file:text-xs file:font-semibold file:bg-brand-50 file:text-brand-700 hover:file:bg-brand-100"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">Or Paste CSV Data Below</label>
            <textarea
              rows={8}
              value={importText}
              onChange={(e) => setImportText(e.target.value)}
              placeholder={`"Company Name","Contact Person","Industry","Service of Interest","Estimated Deal Value"\n"Apex Bio Corp","Dr. Rachel Adams","Healthcare","AI Chatbot Development",9000`}
              className="w-full font-mono text-xs p-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500"
            />
          </div>

          {importErrors.length > 0 && (
            <div className="p-3 bg-rose-50 border border-rose-200 rounded-lg text-rose-700 text-xs">
              <p className="font-bold mb-1">Import Issues:</p>
              <ul className="list-disc pl-4 space-y-0.5">
                {importErrors.map((err, i) => (
                  <li key={i}>{err}</li>
                ))}
              </ul>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              onClick={() => setIsImportOpen(false)}
              className="px-4 py-2 text-xs border rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleCSVImport}
              className="px-5 py-2 text-xs bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-semibold"
            >
              Validate & Import
            </button>
          </div>
        </div>
      </Modal>

      {/* Delete Lead Confirm */}
      <ConfirmModal
        isOpen={!!deletingLeadId}
        onClose={() => setDeletingLeadId(null)}
        onConfirm={() => {
          if (deletingLeadId) deleteLead(deletingLeadId);
        }}
        title="Delete Lead Record?"
        message="Are you sure you want to delete this prospect? All associated stage records for this lead will be removed."
        confirmLabel="Delete Lead"
        isDestructive={true}
      />

      {/* Add Lead Modal */}
      <AddLeadModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />

      {/* Quick Activity Modal */}
      {activityLead && (
        <LogActivityModal
          isOpen={!!activityLead}
          onClose={() => setActivityLead(null)}
          defaultRelatedId={activityLead.id}
          defaultRelatedType="Lead"
          defaultTitle={activityLead.companyName}
        />
      )}
    </div>
  );
};
