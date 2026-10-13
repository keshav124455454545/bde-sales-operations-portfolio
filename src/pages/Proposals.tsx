import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import {
  FileText,
  Plus,
  Printer,
  Copy,
  Edit,
  Trash2,
  ExternalLink,
  DollarSign,
  Calendar,
  CheckCircle2,
  Clock,
  ArrowRight,
  ShieldCheck,
  Building,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { Proposal, ProposalStatus } from '../types';
import { Badge } from '../components/common/Badge';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';
import { ProposalDocument } from '../components/proposals/ProposalDocument';

export const Proposals: React.FC = () => {
  const {
    proposals,
    leads,
    biddingOpportunities,
    services,
    addProposal,
    updateProposal,
    deleteProposal,
    duplicateProposal,
    showToast,
  } = useApp();
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Mode: 'list' | 'preview' | 'builder'
  const [mode, setMode] = useState<'list' | 'preview' | 'builder'>('list');
  const [selectedProposalId, setSelectedProposalId] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // Builder Form State
  const [clientCompany, setClientCompany] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [contactEmail, setContactEmail] = useState('');
  const [clientProblem, setClientProblem] = useState('');
  const [businessObjectives, setBusinessObjectives] = useState(
    'Eliminate manual data collation bottlenecks.\nAccelerate turnaround times by 40%.\nAchieve modern compliance and performance standards.'
  );
  const [proposedSolution, setProposedSolution] = useState('');
  const [serviceId, setServiceId] = useState(services[0]?.id || '');
  const [scopeOfWork, setScopeOfWork] = useState(
    'Phase 1: Architecture & UI/UX wireframes\nPhase 2: Core functional engineering\nPhase 3: QA testing, deployment, and training'
  );
  const [deliverables, setDeliverables] = useState(
    'Production codebase\nExecutive KPI dashboard\nAdmin documentation & 30-day warranty'
  );
  const [totalPrice, setTotalPrice] = useState('6500');
  const [timelineSummary, setTimelineSummary] = useState('4 to 6 Weeks from kickoff');
  const [status, setStatus] = useState<ProposalStatus>('Draft');
  const [relatedLeadId, setRelatedLeadId] = useState('');
  const [editingProposalId, setEditingProposalId] = useState<string | null>(null);

  // Check URL params on mount or change
  useEffect(() => {
    const idParam = searchParams.get('id');
    const isNew = searchParams.get('new') === 'true';
    const leadIdParam = searchParams.get('leadId');
    const bidIdParam = searchParams.get('bidId');
    const serviceNameParam = searchParams.get('serviceName');
    const clientParam = searchParams.get('client');
    const priceParam = searchParams.get('price');
    const descParam = searchParams.get('desc');

    if (idParam) {
      setSelectedProposalId(idParam);
      setMode('preview');
    } else if (isNew) {
      // Pre-fill from lead if provided
      if (leadIdParam) {
        const lead = leads.find((l) => l.id === leadIdParam);
        if (lead) {
          setClientCompany(lead.companyName);
          setContactPerson(lead.contactPerson);
          setContactEmail(lead.email || '');
          setClientProblem(lead.businessProblem);
          setTotalPrice(String(lead.estimatedDealValue));
          setRelatedLeadId(lead.id);
          const matchedService = services.find((s) => s.name === lead.serviceOfInterest);
          if (matchedService) {
            setServiceId(matchedService.id);
            setProposedSolution(
              `Nexora Digital Solutions will implement a tailored ${matchedService.name} platform designed to resolve ${lead.companyName}'s core operational bottlenecks.`
            );
          }
        }
      } else if (bidIdParam) {
        const bid = biddingOpportunities.find((b) => b.id === bidIdParam);
        if (bid) {
          setClientCompany(`${bid.platform} Client (${bid.clientCountry})`);
          setContactPerson('Procurement Lead');
          setClientProblem(bid.clientDescription);
          setTotalPrice(String(bid.proposedPrice));
          setProposedSolution(
            `Nexora will engineer the requested solution for "${bid.jobTitle}", ensuring strict deadline compliance and code quality.`
          );
        }
      } else if (serviceNameParam) {
        const matchedService = services.find((s) => s.name === serviceNameParam);
        if (matchedService) {
          setServiceId(matchedService.id);
          setProposedSolution(
            `Nexora Digital Solutions will architect and deploy our enterprise ${matchedService.name} solution.`
          );
        }
      } else if (clientParam) {
        setClientCompany(decodeURIComponent(clientParam));
        if (priceParam) setTotalPrice(priceParam);
        if (descParam) setClientProblem(decodeURIComponent(descParam));
      }
      setEditingProposalId(null);
      setMode('builder');
    } else {
      setMode('list');
    }
  }, [searchParams, leads, biddingOpportunities, services]);

  const selectedProposal = proposals.find((p) => p.id === selectedProposalId);

  const handleEditClick = (prop: Proposal) => {
    setEditingProposalId(prop.id);
    setClientCompany(prop.clientCompany);
    setContactPerson(prop.contactPerson);
    setContactEmail(prop.contactEmail || '');
    setClientProblem(prop.clientProblem);
    setBusinessObjectives(prop.businessObjectives.join('\n'));
    setProposedSolution(prop.proposedSolution);
    setServiceId(prop.serviceId);
    setScopeOfWork(prop.scopeOfWork.join('\n'));
    setDeliverables(prop.deliverables.join('\n'));
    setTotalPrice(String(prop.totalEstimatedPrice));
    setTimelineSummary(prop.timelineSummary);
    setStatus(prop.status);
    setRelatedLeadId(prop.relatedLeadId || '');
    setMode('builder');
  };

  const handleSaveProposal = (e: React.FormEvent) => {
    e.preventDefault();
    if (!clientCompany.trim() || !contactPerson.trim()) {
      showToast('Client company and contact person are required.', 'error');
      return;
    }

    const priceNum = parseFloat(totalPrice) || 5000;
    const matchedService = services.find((s) => s.id === serviceId) || services[0];

    const milestones = [
      {
        milestone: 'Milestone 1: Kickoff & Technical Architecture Blueprint',
        deliverable: 'Approved architecture design document and UI/UX prototypes.',
        duration: 'Week 1',
        paymentPercentage: 35,
        amount: Math.round(priceNum * 0.35),
      },
      {
        milestone: 'Milestone 2: Core Engineering & Staging Deployment',
        deliverable: 'Functional staging release with milestone test coverage.',
        duration: 'Week 2 – 3',
        paymentPercentage: 40,
        amount: Math.round(priceNum * 0.4),
      },
      {
        milestone: 'Milestone 3: Final Acceptance, Security Verification & Launch',
        deliverable: 'Production deployment, admin handover, and warranty kickoff.',
        duration: 'Final Week',
        paymentPercentage: 25,
        amount: Math.round(priceNum * 0.25),
      },
    ];

    const payload: Omit<Proposal, 'id' | 'dateCreated'> = {
      clientCompany: clientCompany.trim(),
      contactPerson: contactPerson.trim(),
      contactEmail: contactEmail.trim() || undefined,
      clientProblem: clientProblem.trim(),
      businessObjectives: businessObjectives
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      proposedSolution: proposedSolution.trim(),
      serviceId: matchedService.id,
      serviceName: matchedService.name,
      scopeOfWork: scopeOfWork
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      deliverables: deliverables
        .split('\n')
        .map((s) => s.trim())
        .filter(Boolean),
      milestones,
      timelineSummary: timelineSummary.trim(),
      assumptions: [
        'Client will provide necessary database/API access credentials within 3 business days of kickoff.',
        'Third-party cloud infrastructure licenses are managed directly by client.',
      ],
      exclusions: [
        'Proprietary hardware driver rewrites without published APIs',
        'Custom content writing or video production',
      ],
      totalEstimatedPrice: priceNum,
      currency: 'USD',
      validityDays: 30,
      nextSteps: [
        'Confirm acceptance by countersigning digital proposal document.',
        'Remit Milestone 1 retainer invoice.',
        'Schedule technical kickoff discovery sprint.',
      ],
      status,
      followUpDate: new Date(Date.now() + 5 * 86400000).toISOString().slice(0, 10),
      relatedLeadId: relatedLeadId || undefined,
      version: editingProposalId ? '1.1' : '1.0',
      revisionsNotes: editingProposalId
        ? 'Updated scope and commercial terms.'
        : 'Initial draft proposal.',
    };

    if (editingProposalId) {
      updateProposal({
        ...payload,
        id: editingProposalId,
        dateCreated:
          proposals.find((p) => p.id === editingProposalId)?.dateCreated ||
          new Date().toISOString().slice(0, 10),
      });
      setSelectedProposalId(editingProposalId);
    } else {
      const created = addProposal(payload);
      setSelectedProposalId(created.id);
    }

    setMode('preview');
  };

  return (
    <div className="space-y-6">
      {/* PREVIEW MODE */}
      {mode === 'preview' && selectedProposal && (
        <ProposalDocument
          proposal={selectedProposal}
          onBack={() => setMode('list')}
          onEdit={() => handleEditClick(selectedProposal)}
        />
      )}

      {/* BUILDER MODE */}
      {mode === 'builder' && (
        <div className="figma-card p-6 sm:p-8 rounded-2xl space-y-6 max-w-4xl mx-auto">
          <div className="flex items-center justify-between pb-4 border-b border-slate-200 dark:border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-slate-900 dark:text-white">
                {editingProposalId ? 'Edit Client Proposal' : 'Draft New Business Proposal'}
              </h2>
              <p className="text-xs text-slate-500">
                Generate an executive client-facing proposal with structured scope, milestones, and commercial pricing.
              </p>
            </div>
            <button
              onClick={() => setMode('list')}
              className="text-xs text-slate-500 hover:text-slate-800 border px-3 py-1.5 rounded-lg"
            >
              Cancel
            </button>
          </div>

          <form onSubmit={handleSaveProposal} className="space-y-5 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">Client Company *</label>
                <input
                  type="text"
                  value={clientCompany}
                  onChange={(e) => setClientCompany(e.target.value)}
                  placeholder="e.g. Acme Health Corp"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Person *</label>
                <input
                  type="text"
                  value={contactPerson}
                  onChange={(e) => setContactPerson(e.target.value)}
                  placeholder="e.g. Dr. John Doe"
                  className="w-full px-3 py-2 border border-slate-200 dark:border-slate-700 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Contact Email</label>
                <input
                  type="email"
                  value={contactEmail}
                  onChange={(e) => setContactEmail(e.target.value)}
                  placeholder="j.doe@example.com"
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Core Service Area</label>
                <select
                  value={serviceId}
                  onChange={(e) => setServiceId(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg bg-white"
                >
                  {services.map((s) => (
                    <option key={s.id} value={s.id}>
                      {s.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Client Problem & Background *
              </label>
              <textarea
                rows={3}
                value={clientProblem}
                onChange={(e) => setClientProblem(e.target.value)}
                placeholder="Describe current operational bottlenecks, latency, or customer drop-off..."
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Business Objectives (1 per line)
              </label>
              <textarea
                rows={3}
                value={businessObjectives}
                onChange={(e) => setBusinessObjectives(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg font-mono"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-700 mb-1">
                Proposed Solution Architecture *
              </label>
              <textarea
                rows={3}
                value={proposedSolution}
                onChange={(e) => setProposedSolution(e.target.value)}
                placeholder="Describe Nexora's engineering approach, technology stack, and security..."
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Scope of Work Phases (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={scopeOfWork}
                  onChange={(e) => setScopeOfWork(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Tangible Deliverables (1 per line)
                </label>
                <textarea
                  rows={4}
                  value={deliverables}
                  onChange={(e) => setDeliverables(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-mono"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block font-semibold text-slate-700 mb-1">
                  Total Contract Price (USD) *
                </label>
                <input
                  type="number"
                  value={totalPrice}
                  onChange={(e) => setTotalPrice(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg font-bold text-emerald-700"
                  required
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Timeline Horizon</label>
                <input
                  type="text"
                  value={timelineSummary}
                  onChange={(e) => setTimelineSummary(e.target.value)}
                  className="w-full px-3 py-2 border rounded-lg"
                />
              </div>

              <div>
                <label className="block font-semibold text-slate-700 mb-1">Proposal Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as ProposalStatus)}
                  className="w-full px-3 py-2 border rounded-lg bg-white font-medium"
                >
                  <option value="Draft">Draft</option>
                  <option value="In Review">In Review</option>
                  <option value="Submitted">Submitted</option>
                  <option value="Negotiation">Negotiation</option>
                  <option value="Accepted">Accepted</option>
                  <option value="Rejected">Rejected</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end gap-3 pt-4 border-t border-slate-200">
              <button
                type="button"
                onClick={() => setMode('list')}
                className="px-4 py-2 border rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-6 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-semibold shadow-xs"
              >
                Save & Preview Document
              </button>
            </div>
          </form>
        </div>
      )}

      {/* LIST MODE */}
      {mode === 'list' && (
        <div className="space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
                <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
                  <FileText className="w-5 h-5" />
                </div>
                Proposals & Commercial Quotations
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Author, preview, print to PDF, and track client proposals across core Nexora service offerings.
              </p>
            </div>

            <button
              onClick={() => {
                setEditingProposalId(null);
                setClientCompany('');
                setContactPerson('');
                setClientProblem('');
                setTotalPrice('6500');
                setMode('builder');
              }}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-500/20 transition"
            >
              <Plus className="w-4 h-4" /> Create Proposal
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {proposals.map((prop) => (
              <div
                key={prop.id}
                className="figma-card figma-card-hover p-6 rounded-2xl flex flex-col justify-between space-y-4"
              >
                <div>
                  <div className="flex items-start justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-slate-400 font-bold">
                      {prop.id} • v{prop.version}
                    </span>
                    <Badge variant="proposal" value={prop.status} />
                  </div>

                  <h3 className="font-bold text-slate-900 dark:text-white text-sm">{prop.clientCompany}</h3>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Attn: {prop.contactPerson}
                  </p>
                  <div className="text-xs font-semibold text-brand-700 dark:text-brand-400 mt-2">
                    {prop.serviceName}
                  </div>

                  <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 leading-relaxed bg-slate-50/80 dark:bg-slate-800/50 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                    {prop.clientProblem}
                  </p>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs">
                    <span className="text-slate-400">Total Price:</span>
                    <span className="font-extrabold text-sm text-emerald-600 dark:text-emerald-400">
                      ${prop.totalEstimatedPrice.toLocaleString()} {prop.currency}
                    </span>
                  </div>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-2">
                  <button
                    onClick={() => {
                      setSelectedProposalId(prop.id);
                      setMode('preview');
                    }}
                    className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 transition"
                  >
                    <FileText className="w-3.5 h-3.5" /> View & Print
                  </button>

                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => duplicateProposal(prop.id)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                      title="Duplicate proposal"
                    >
                      <Copy className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => handleEditClick(prop)}
                      className="p-1.5 text-slate-400 hover:text-slate-700 hover:bg-slate-100 rounded"
                      title="Edit proposal"
                    >
                      <Edit className="w-3.5 h-3.5" />
                    </button>
                    <button
                      onClick={() => setDeletingId(prop.id)}
                      className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded"
                      title="Delete proposal"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Delete Proposal Modal */}
      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) deleteProposal(deletingId);
        }}
        title="Delete Proposal?"
        message="Are you sure you want to delete this proposal document?"
        confirmLabel="Delete Proposal"
        isDestructive={true}
      />
    </div>
  );
};
