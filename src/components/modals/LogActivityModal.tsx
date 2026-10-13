import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { ActivityType } from '../../types';

interface LogActivityModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultRelatedId?: string;
  defaultRelatedType?: 'Lead' | 'Contact' | 'BiddingOpportunity' | 'General';
  defaultTitle?: string;
}

export const LogActivityModal: React.FC<LogActivityModalProps> = ({
  isOpen,
  onClose,
  defaultRelatedId,
  defaultRelatedType = 'Lead',
  defaultTitle = '',
}) => {
  const { addActivity, leads, networkContacts, biddingOpportunities } = useApp();

  const [type, setType] = useState<ActivityType>('Call');
  const [relatedType, setRelatedType] = useState<'Lead' | 'Contact' | 'BiddingOpportunity' | 'General'>(
    defaultRelatedType
  );
  const [relatedId, setRelatedId] = useState(defaultRelatedId || '');
  const [summary, setSummary] = useState('');
  const [outcome, setOutcome] = useState('');
  const [nextAction, setNextAction] = useState('');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    new Date(Date.now() + 86400000).toISOString().slice(0, 10)
  );

  const [error, setError] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!summary.trim()) {
      setError('Activity summary is required');
      return;
    }

    let relatedTitle = defaultTitle;
    if (relatedType === 'Lead') {
      const l = leads.find((x) => x.id === relatedId);
      relatedTitle = l ? l.companyName : relatedTitle || 'Lead';
    } else if (relatedType === 'Contact') {
      const c = networkContacts.find((x) => x.id === relatedId);
      relatedTitle = c ? `${c.contactName} (${c.company})` : relatedTitle || 'Contact';
    } else if (relatedType === 'BiddingOpportunity') {
      const b = biddingOpportunities.find((x) => x.id === relatedId);
      relatedTitle = b ? b.jobTitle : relatedTitle || 'Bidding Opportunity';
    } else {
      relatedTitle = relatedTitle || 'General Sales Activity';
    }

    const now = new Date();
    const dateTimeStr = `${now.toISOString().slice(0, 10)} ${now.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;

    addActivity({
      type,
      relatedType,
      relatedId: relatedId || undefined,
      relatedTitle,
      dateTime: dateTimeStr,
      summary: summary.trim(),
      outcome: outcome.trim() || 'Interaction completed successfully.',
      nextAction: nextAction.trim() || 'Standard follow-up touchpoint.',
      nextFollowUpDate,
      completed: true,
    });

    setSummary('');
    setOutcome('');
    setNextAction('');
    setError('');
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Log Sales Activity"
      subtitle="Record calls, discovery meetings, emails, and follow-up touchpoints."
      maxWidth="lg"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Activity Type
            </label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value as ActivityType)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Call">Call</option>
              <option value="Email">Email</option>
              <option value="LinkedIn Message">LinkedIn Message</option>
              <option value="Meeting">Discovery / Zoom Meeting</option>
              <option value="Research">Account Research</option>
              <option value="Proposal Prep">Proposal Preparation</option>
              <option value="Follow-up">Follow-up Check-in</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Related Category
            </label>
            <select
              value={relatedType}
              onChange={(e) => {
                setRelatedType(e.target.value as any);
                setRelatedId('');
              }}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="Lead">CRM Lead</option>
              <option value="Contact">Network Contact</option>
              <option value="BiddingOpportunity">Bidding Opportunity</option>
              <option value="General">General / Internal</option>
            </select>
          </div>
        </div>

        {relatedType === 'Lead' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Lead
            </label>
            <select
              value={relatedId}
              onChange={(e) => setRelatedId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">-- Choose Lead --</option>
              {leads.map((l) => (
                <option key={l.id} value={l.id}>
                  {l.companyName} ({l.contactPerson}) - {l.status}
                </option>
              ))}
            </select>
          </div>
        )}

        {relatedType === 'Contact' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Contact
            </label>
            <select
              value={relatedId}
              onChange={(e) => setRelatedId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">-- Choose Contact --</option>
              {networkContacts.map((c) => (
                <option key={c.id} value={c.id}>
                  {c.contactName} ({c.company})
                </option>
              ))}
            </select>
          </div>
        )}

        {relatedType === 'BiddingOpportunity' && (
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Select Bidding Job
            </label>
            <select
              value={relatedId}
              onChange={(e) => setRelatedId(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="">-- Choose Opportunity --</option>
              {biddingOpportunities.map((b) => (
                <option key={b.id} value={b.id}>
                  [{b.platform}] {b.jobTitle.slice(0, 50)}...
                </option>
              ))}
            </select>
          </div>
        )}

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Activity Summary *
          </label>
          <textarea
            rows={2}
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            placeholder="What was discussed or accomplished during this interaction?"
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              error ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
            }`}
          />
          {error && <p className="text-xs text-rose-600 mt-0.5">{error}</p>}
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Outcome / Key Takeaway
          </label>
          <input
            type="text"
            value={outcome}
            onChange={(e) => setOutcome(e.target.value)}
            placeholder="e.g. Budget approved, requested technical architecture diagram"
            className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Next Action
            </label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="e.g. Send formal proposal"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Next Follow-Up Date
            </label>
            <input
              type="date"
              value={nextFollowUpDate}
              onChange={(e) => setNextFollowUpDate(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>
        </div>

        <div className="flex items-center justify-end gap-3 pt-4 border-t border-slate-100">
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-lg hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="px-5 py-2 text-sm font-medium text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition shadow-xs"
          >
            Log Activity
          </button>
        </div>
      </form>
    </Modal>
  );
};
