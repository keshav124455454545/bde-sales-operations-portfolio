import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Flame,
  Search,
  Filter,
  Download,
  Plus,
  ArrowUpDown,
  ExternalLink,
  Edit,
  Trash2,
  Calendar,
  Clock,
  Briefcase,
  FileText,
  CheckCircle2,
  AlertCircle,
  Tag,
  ShieldAlert,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { BiddingOpportunity, BiddingPlatform, BiddingStatus } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { EmptyState } from '../components/common/EmptyState';
import { exportBiddingToCSV } from '../services/storage';

export const Bidding: React.FC = () => {
  const {
    biddingOpportunities,
    addBiddingOpportunity,
    updateBiddingOpportunity,
    deleteBiddingOpportunity,
    updateBiddingStatus,
    showToast,
  } = useApp();
  const navigate = useNavigate();

  // Filters & search
  const [searchQuery, setSearchQuery] = useState('');
  const [platformFilter, setPlatformFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'fit' | 'deadline' | 'price'>('fit');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');

  // Modals state
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingBid, setEditingBid] = useState<BiddingOpportunity | null>(null);
  const [deletingBidId, setDeletingBidId] = useState<string | null>(null);
  const [selectedBid, setSelectedBid] = useState<BiddingOpportunity | null>(null);

  // New Bid Form State
  const [newPlatform, setNewPlatform] = useState<BiddingPlatform>('Upwork');
  const [newTitle, setNewTitle] = useState('');
  const [newUrl, setNewUrl] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCountry, setNewCountry] = useState('United States');
  const [newSkills, setNewSkills] = useState('React, TypeScript, Tailwind');
  const [newBudget, setNewBudget] = useState('$3,000 – $5,000');
  const [newPrice, setNewPrice] = useState('4200');
  const [newType, setNewType] = useState<'Fixed-Price' | 'Hourly'>('Fixed-Price');
  const [newDeadline, setNewDeadline] = useState(
    new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10)
  );
  const [newFitScore, setNewFitScore] = useState(90);
  const [newStatus, setNewStatus] = useState<BiddingStatus>('Discovered');
  const [newNotes, setNewNotes] = useState('');
  const [newNextAction, setNewNextAction] = useState('Analyze job details and draft customized proposal.');

  // Filtered & sorted opportunities
  const filteredBids = useMemo(() => {
    return biddingOpportunities
      .filter((bid) => {
        const matchesSearch =
          searchQuery === '' ||
          bid.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bid.clientDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
          bid.requiredSkills.some((s) => s.toLowerCase().includes(searchQuery.toLowerCase()));

        const matchesPlatform = platformFilter === 'all' || bid.platform === platformFilter;
        const matchesStatus = statusFilter === 'all' || bid.status === statusFilter;

        return matchesSearch && matchesPlatform && matchesStatus;
      })
      .sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'fit') {
          comparison = a.fitScore - b.fitScore;
        } else if (sortBy === 'deadline') {
          comparison = a.applicationDeadline.localeCompare(b.applicationDeadline);
        } else if (sortBy === 'price') {
          comparison = a.proposedPrice - b.proposedPrice;
        }
        return sortOrder === 'desc' ? -comparison : comparison;
      });
  }, [biddingOpportunities, searchQuery, platformFilter, statusFilter, sortBy, sortOrder]);

  const handleCreateBid = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newDesc.trim()) {
      showToast('Job title and description are required.', 'error');
      return;
    }

    const skillsArray = newSkills
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);

    addBiddingOpportunity({
      platform: newPlatform,
      jobTitle: newTitle.trim(),
      jobUrl: newUrl.trim() || `https://${newPlatform.toLowerCase()}.com/jobs/~${Date.now().toString(36)}`,
      clientDescription: newDesc.trim(),
      clientCountry: newCountry.trim(),
      requiredSkills: skillsArray,
      clientBudget: newBudget.trim(),
      proposedPrice: parseFloat(newPrice) || 3000,
      projectType: newType,
      applicationDeadline: newDeadline,
      fitScore: newFitScore,
      status: newStatus,
      followUpDate: newDeadline,
      notes: newNotes.trim() || 'Tracked via BDE bidding radar.',
      nextAction: newNextAction.trim(),
    });

    setIsAddOpen(false);
    setNewTitle('');
    setNewDesc('');
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
            <div className="p-2 rounded-xl bg-amber-500/10 text-amber-500 dark:text-amber-400">
              <Flame className="w-5 h-5" />
            </div>
            Freelance Bidding Workspace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Track and prioritize high-value RFPs and postings across Upwork, Freelancer, and PeoplePerHour (PPH).
          </p>
        </div>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            onClick={() => exportBiddingToCSV(filteredBids)}
            className="inline-flex items-center gap-1.5 px-3.5 py-2 text-xs font-semibold text-slate-700 dark:text-slate-200 bg-white dark:bg-slate-800 hover:bg-slate-50 dark:hover:bg-slate-700 border border-slate-200 dark:border-slate-700 rounded-xl shadow-2xs transition"
          >
            <Download className="w-3.5 h-3.5 text-slate-500 dark:text-slate-400" /> Export CSV ({filteredBids.length})
          </button>
          <button
            onClick={() => setIsAddOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Track Opportunity
          </button>
        </div>
      </div>

      {/* Strategy Guidelines */}
      <div className="p-3.5 bg-brand-50/70 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-900/40 rounded-2xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
        <div className="p-1 rounded-lg bg-brand-500/10 text-brand-600 dark:text-brand-400 shrink-0 mt-0.5">
          <Briefcase className="w-4 h-4" />
        </div>
        <div className="leading-relaxed">
          <strong className="text-brand-900 dark:text-brand-200">Bidding Protocol & Quality Standards:</strong> Qualify RFP requirements, client verified spend history, and technical scope alignment before drafting customized proposals. Maintain minimum 85% technical fit threshold for fixed-price submissions.
        </div>
      </div>

      {/* Search and Filters */}
      <div className="figma-card p-5 space-y-3.5">
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search by job title, client description, or required tech stack..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-3.5 py-2 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800/90 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div className="flex items-center gap-2 text-xs text-slate-500 dark:text-slate-400 px-3.5 py-2 bg-slate-50 dark:bg-slate-800/60 rounded-xl border border-slate-200 dark:border-slate-700/80 shrink-0">
            <span>Showing: <strong className="text-slate-900 dark:text-white">{filteredBids.length}</strong> of {biddingOpportunities.length} opportunities</span>
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Platform</label>
            <select
              value={platformFilter}
              onChange={(e) => setPlatformFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Platforms</option>
              <option value="Upwork">Upwork</option>
              <option value="Freelancer">Freelancer</option>
              <option value="PeoplePerHour">PeoplePerHour</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Bid Status</label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="all">All Statuses</option>
              <option value="Discovered">Discovered</option>
              <option value="Researching">Researching</option>
              <option value="Qualified">Qualified</option>
              <option value="Proposal Drafted">Proposal Drafted</option>
              <option value="Submitted">Submitted</option>
              <option value="Client Responded">Client Responded</option>
              <option value="Interview">Interview</option>
              <option value="Won">Won</option>
              <option value="Lost">Lost</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Sort Metric</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-2.5 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 focus:ring-1 focus:ring-brand-500"
            >
              <option value="fit">Fit Score (%)</option>
              <option value="deadline">Application Deadline</option>
              <option value="price">Proposed Price</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-semibold text-slate-500 mb-1">Order</label>
            <button
              onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
              className="w-full px-3 py-1.5 text-xs border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 flex items-center justify-between transition"
            >
              <span>{sortOrder === 'desc' ? 'High to Low / Newest' : 'Low to High / Oldest'}</span>
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-500" />
            </button>
          </div>
        </div>
      </div>

      {/* Opportunities Grid / Cards */}
      {filteredBids.length === 0 ? (
        <EmptyState
          icon={Flame}
          title="No Opportunities Found"
          description="No bidding opportunities matched your active filters. Try adjusting the platform or status."
          actionLabel="Track New Opportunity"
          onAction={() => setIsAddOpen(true)}
        />
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {filteredBids.map((bid) => {
            const today = new Date().toISOString().slice(0, 10);
            const isDeadlineClose = bid.applicationDeadline <= today;

            return (
              <div
                key={bid.id}
                className="figma-card figma-card-hover p-5 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div>
                  {/* Top platform & fit score */}
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <div className="flex items-center gap-2">
                      <Badge variant="platform" value={bid.platform} />
                      <span className="text-[11px] text-slate-500">
                        Client in <strong className="text-slate-700">{bid.clientCountry}</strong>
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                          bid.fitScore >= 90
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                            : 'bg-amber-50 text-amber-700 border border-amber-200'
                        }`}
                      >
                        Fit: {bid.fitScore}%
                      </span>
                    </div>
                  </div>

                  {/* Title & Description */}
                  <h3 className="font-bold text-slate-900 dark:text-white text-sm leading-snug line-clamp-2">
                    {bid.jobTitle}
                  </h3>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2.5 line-clamp-3 leading-relaxed bg-slate-50/80 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    {bid.clientDescription}
                  </p>

                  {/* Skills tags */}
                  <div className="flex flex-wrap gap-1.5 mt-3">
                    {bid.requiredSkills.map((skill, idx) => (
                      <span
                        key={idx}
                        className="text-[10px] bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 px-2 py-0.5 rounded-md font-medium border border-slate-200/60 dark:border-slate-700"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>

                  {/* Budget & Commercial Info */}
                  <div className="grid grid-cols-2 gap-3 mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 text-xs">
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">
                        Client Budget:
                      </span>
                      <span className="font-semibold text-slate-800 dark:text-slate-200">{bid.clientBudget}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 dark:text-slate-500 block text-[10px] uppercase font-semibold">
                        Proposed Price:
                      </span>
                      <span className="font-bold text-emerald-600 dark:text-emerald-400">
                        ${bid.proposedPrice.toLocaleString()} ({bid.projectType})
                      </span>
                    </div>
                  </div>
                </div>

                {/* Footer status and actions */}
                <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex flex-col gap-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1 text-slate-500">
                      <Clock className="w-3.5 h-3.5 text-slate-400" />
                      <span>
                        Deadline:{' '}
                        <strong className={isDeadlineClose ? 'text-rose-600 font-bold' : 'text-slate-700'}>
                          {bid.applicationDeadline}
                        </strong>
                      </span>
                    </div>

                    <select
                      value={bid.status}
                      onChange={(e) =>
                        updateBiddingStatus(bid.id, e.target.value as BiddingStatus)
                      }
                      className="text-xs border border-slate-200 dark:border-slate-700 rounded-lg px-2 py-1 bg-slate-50 dark:bg-slate-800 text-slate-800 dark:text-slate-200 font-medium focus:ring-1 focus:ring-brand-500"
                    >
                      <option value="Discovered">Discovered</option>
                      <option value="Researching">Researching</option>
                      <option value="Qualified">Qualified</option>
                      <option value="Proposal Drafted">Proposal Drafted</option>
                      <option value="Submitted">Submitted</option>
                      <option value="Client Responded">Client Responded</option>
                      <option value="Interview">Interview</option>
                      <option value="Won">Won</option>
                      <option value="Lost">Lost</option>
                      <option value="Not Pursuing">Not Pursuing</option>
                    </select>
                  </div>

                  <div className="flex items-center justify-between gap-2 pt-1">
                    <button
                      onClick={() => {
                        navigate(
                          `/proposals?new=true&bidId=${bid.id}&client=${encodeURIComponent(
                            bid.platform + ' Client'
                          )}&price=${bid.proposedPrice}&desc=${encodeURIComponent(
                            bid.clientDescription.slice(0, 150)
                          )}`
                        );
                      }}
                      className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-brand-700 dark:text-brand-300 bg-brand-50 dark:bg-brand-950/40 hover:bg-brand-100 dark:hover:bg-brand-900/50 rounded-lg border border-brand-200 dark:border-brand-800 transition"
                    >
                      <FileText className="w-3.5 h-3.5" /> Draft Proposal Pitch
                    </button>

                    <div className="flex items-center gap-1">
                      <button
                        onClick={() => setEditingBid(bid)}
                        className="p-1.5 text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        title="Edit Bid Details"
                      >
                        <Edit className="w-3.5 h-3.5" />
                      </button>
                      <button
                        onClick={() => setDeletingBidId(bid.id)}
                        className="p-1.5 text-slate-400 hover:text-rose-600 dark:hover:text-rose-400 hover:bg-rose-50 dark:hover:bg-rose-950/40 rounded-lg transition"
                        title="Delete Bid"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Add Opportunity Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Track Freelance Bidding Opportunity"
        subtitle="Record job requirements from Upwork, Freelancer, or PeoplePerHour to evaluate fit and track proposal submission."
        maxWidth="2xl"
      >
        <form onSubmit={handleCreateBid} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Platform *</label>
              <select
                value={newPlatform}
                onChange={(e) => setNewPlatform(e.target.value as BiddingPlatform)}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="Upwork">Upwork</option>
                <option value="Freelancer">Freelancer</option>
                <option value="PeoplePerHour">PeoplePerHour</option>
              </select>
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Client Country</label>
              <input
                type="text"
                value={newCountry}
                onChange={(e) => setNewCountry(e.target.value)}
                placeholder="e.g. United States, United Kingdom"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Job Post Title *</label>
            <input
              type="text"
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              placeholder="e.g. Build Custom Next.js B2B Portal"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Client Problem / Job Description *</label>
            <textarea
              rows={3}
              value={newDesc}
              onChange={(e) => setNewDesc(e.target.value)}
              placeholder="Paste full job description and requirements here..."
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Required Skills (Comma separated)</label>
              <input
                type="text"
                value={newSkills}
                onChange={(e) => setNewSkills(e.target.value)}
                placeholder="React, TypeScript, Power BI"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Client Stated Budget</label>
              <input
                type="text"
                value={newBudget}
                onChange={(e) => setNewBudget(e.target.value)}
                placeholder="$4,000 – $6,000"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Proposed Price ($)</label>
              <input
                type="number"
                value={newPrice}
                onChange={(e) => setNewPrice(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Application Deadline</label>
              <input
                type="date"
                value={newDeadline}
                onChange={(e) => setNewDeadline(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Fit Score (%)</label>
              <input
                type="number"
                min="0"
                max="100"
                value={newFitScore}
                onChange={(e) => setNewFitScore(parseInt(e.target.value) || 80)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">Next Action</label>
            <input
              type="text"
              value={newNextAction}
              onChange={(e) => setNewNextAction(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div className="flex justify-end gap-3 pt-3 border-t">
            <button
              type="button"
              onClick={() => setIsAddOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-semibold"
            >
              Track Opportunity
            </button>
          </div>
        </form>
      </Modal>

      {/* Edit Opportunity Modal */}
      {editingBid && (
        <Modal
          isOpen={!!editingBid}
          onClose={() => setEditingBid(null)}
          title="Edit Bidding Opportunity"
          maxWidth="2xl"
        >
          <form
            onSubmit={(e) => {
              e.preventDefault();
              updateBiddingOpportunity(editingBid);
              setEditingBid(null);
            }}
            className="space-y-4 text-xs"
          >
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Job Title</label>
              <input
                type="text"
                value={editingBid.jobTitle}
                onChange={(e) => setEditingBid({ ...editingBid, jobTitle: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proposed Price ($)</label>
                <input
                  type="number"
                  value={editingBid.proposedPrice}
                  onChange={(e) =>
                    setEditingBid({
                      ...editingBid,
                      proposedPrice: parseFloat(e.target.value) || 0,
                    })
                  }
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Status</label>
                <select
                  value={editingBid.status}
                  onChange={(e) =>
                    setEditingBid({ ...editingBid, status: e.target.value as BiddingStatus })
                  }
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  <option value="Discovered">Discovered</option>
                  <option value="Researching">Researching</option>
                  <option value="Qualified">Qualified</option>
                  <option value="Proposal Drafted">Proposal Drafted</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Client Responded">Client Responded</option>
                  <option value="Interview">Interview</option>
                  <option value="Won">Won</option>
                  <option value="Lost">Lost</option>
                  <option value="Not Pursuing">Not Pursuing</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">Next Action</label>
              <input
                type="text"
                value={editingBid.nextAction}
                onChange={(e) => setEditingBid({ ...editingBid, nextAction: e.target.value })}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-3 pt-3 border-t">
              <button
                type="button"
                onClick={() => setEditingBid(null)}
                className="px-4 py-2 border rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-5 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-semibold"
              >
                Save Changes
              </button>
            </div>
          </form>
        </Modal>
      )}

      {/* Delete Confirm */}
      <ConfirmModal
        isOpen={!!deletingBidId}
        onClose={() => setDeletingBidId(null)}
        onConfirm={() => {
          if (deletingBidId) deleteBiddingOpportunity(deletingBidId);
        }}
        title="Remove Bidding Opportunity?"
        message="Are you sure you want to remove this bidding opportunity from your tracking radar?"
        confirmLabel="Remove Bid"
        isDestructive={true}
      />
    </div>
  );
};
