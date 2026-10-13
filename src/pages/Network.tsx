import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Share2,
  Search,
  Plus,
  Mail,
  Phone,
  Calendar,
  Clock,
  ExternalLink,
  Edit,
  Trash2,
  Building,
  CheckCircle2,
  AlertCircle,
  Briefcase,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { NetworkContact, RelationshipType } from '../types';
import { Modal } from '../components/common/Modal';
import { ConfirmModal } from '../components/common/ConfirmModal';

export const Network: React.FC = () => {
  const { networkContacts, addContact, updateContact, deleteContact, leads } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<NetworkContact | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  // New Contact form state
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [relType, setRelType] = useState<RelationshipType>('Agency Partner');
  const [source, setSource] = useState('LinkedIn B2B Networking');
  const [profileUrl, setProfileUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [industry, setIndustry] = useState('Digital Agency & IT');
  const [notes, setNotes] = useState('');
  const [nextAction, setNextAction] = useState('Quarterly partnership review.');
  const [nextDate, setNextDate] = useState(
    new Date(Date.now() + 7 * 86400000).toISOString().slice(0, 10)
  );

  const filteredContacts = useMemo(() => {
    return networkContacts.filter((c) => {
      const matchSearch =
        searchQuery === '' ||
        c.contactName.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.company.toLowerCase().includes(searchQuery.toLowerCase()) ||
        c.industry.toLowerCase().includes(searchQuery.toLowerCase());
      const matchType = typeFilter === 'all' || c.relationshipType === typeFilter;
      return matchSearch && matchType;
    });
  }, [networkContacts, searchQuery, typeFilter]);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !company.trim()) return;

    addContact({
      contactName: name.trim(),
      company: company.trim(),
      jobTitle: jobTitle.trim(),
      relationshipType: relType,
      contactSource: source,
      profileUrl: profileUrl.trim() || 'https://linkedin.com',
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      industry,
      lastInteractionDate: new Date().toISOString().slice(0, 10),
      interactionNotes: notes.trim() || 'Connected with strategic partner.',
      nextRelationshipAction: nextAction.trim(),
      nextContactDate: nextDate,
      relationshipStatus: 'Active',
    });

    setIsAddOpen(false);
    setName('');
    setCompany('');
    setJobTitle('');
    setNotes('');
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Share2 className="w-5 h-5 text-brand-600" /> Network & Relationship Management
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Manage referral partners, agency collaborations, strategic tech alliances, and long-term business relationships.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
        >
          <Plus className="w-4 h-4" /> Add Partner / Contact
        </button>
      </div>

      {/* Filter and Search */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
          <input
            type="text"
            placeholder="Search by contact name, partner agency, or industry..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 text-xs border border-slate-300 rounded-lg focus:ring-2 focus:ring-brand-500"
          />
        </div>

        <div className="flex gap-2">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-3 py-2 text-xs border border-slate-300 rounded-lg bg-white"
          >
            <option value="all">All Relationship Types</option>
            <option value="Agency Partner">Agency Partner</option>
            <option value="Referral Partner">Referral Partner</option>
            <option value="Technology Partner">Technology Partner</option>
            <option value="Prospect">Prospect</option>
            <option value="Existing Contact">Existing Contact</option>
            <option value="Other">Other</option>
          </select>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredContacts.map((contact) => {
          const isOverdue =
            contact.nextContactDate <= new Date().toISOString().slice(0, 10);

          return (
            <div
              key={contact.id}
              className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 transition flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                    {contact.relationshipType}
                  </span>
                  <span
                    className={`text-[10px] px-2 py-0.5 rounded-full font-semibold ${
                      contact.relationshipStatus === 'High Priority'
                        ? 'bg-rose-50 text-rose-700 border border-rose-200'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {contact.relationshipStatus}
                  </span>
                </div>

                <h3 className="font-bold text-slate-900 text-sm">{contact.contactName}</h3>
                <p className="text-xs text-slate-600 font-medium">
                  {contact.jobTitle} • {contact.company}
                </p>

                <div className="mt-3 space-y-1.5 text-xs text-slate-500">
                  {contact.email && (
                    <div className="flex items-center gap-1.5">
                      <Mail className="w-3.5 h-3.5 text-slate-400" />
                      <a href={`mailto:${contact.email}`} className="text-brand-600 hover:underline">
                        {contact.email}
                      </a>
                    </div>
                  )}
                  {contact.phone && (
                    <div className="flex items-center gap-1.5">
                      <Phone className="w-3.5 h-3.5 text-slate-400" />
                      <span>{contact.phone}</span>
                    </div>
                  )}
                  <div className="flex items-center gap-1.5">
                    <Building className="w-3.5 h-3.5 text-slate-400" />
                    <span>{contact.industry}</span>
                  </div>
                </div>

                <div className="mt-3 bg-slate-50 p-2.5 rounded-lg border border-slate-100 text-xs">
                  <span className="text-slate-400 block text-[10px] uppercase font-semibold">
                    Interaction Notes:
                  </span>
                  <p className="text-slate-700 mt-0.5 leading-relaxed">{contact.interactionNotes}</p>
                </div>
              </div>

              <div className="pt-3 border-t border-slate-100 space-y-2 text-xs">
                <div className="flex justify-between items-center">
                  <span className="text-slate-400">Next Action:</span>
                  <span
                    className={`font-semibold flex items-center gap-1 ${
                      isOverdue ? 'text-rose-600' : 'text-slate-700'
                    }`}
                  >
                    <Clock className="w-3 h-3" /> {contact.nextContactDate}
                  </span>
                </div>
                <div className="text-slate-600 font-medium bg-slate-100/70 p-1.5 rounded text-[11px]">
                  {contact.nextRelationshipAction}
                </div>

                <div className="flex justify-end gap-2 pt-1">
                  <button
                    onClick={() => setEditingContact(contact)}
                    className="p-1 text-slate-400 hover:text-slate-700"
                  >
                    <Edit className="w-3.5 h-3.5" />
                  </button>
                  <button
                    onClick={() => setDeletingId(contact.id)}
                    className="p-1 text-slate-400 hover:text-rose-600"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Modal */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Add Network Contact">
        <form onSubmit={handleCreate} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Contact Name *</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Company *</label>
              <input
                type="text"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Job Title</label>
              <input
                type="text"
                value={jobTitle}
                onChange={(e) => setJobTitle(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Relationship Type</label>
              <select
                value={relType}
                onChange={(e) => setRelType(e.target.value as RelationshipType)}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                <option value="Agency Partner">Agency Partner</option>
                <option value="Referral Partner">Referral Partner</option>
                <option value="Technology Partner">Technology Partner</option>
                <option value="Prospect">Prospect</option>
                <option value="Existing Contact">Existing Contact</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Next Follow-Up Date</label>
              <input
                type="date"
                value={nextDate}
                onChange={(e) => setNextDate(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Interaction Notes</label>
            <textarea
              rows={2}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Next Relationship Action</label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
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
              Save Contact
            </button>
          </div>
        </form>
      </Modal>

      <ConfirmModal
        isOpen={!!deletingId}
        onClose={() => setDeletingId(null)}
        onConfirm={() => {
          if (deletingId) deleteContact(deletingId);
        }}
        title="Delete Contact?"
        message="Are you sure you want to remove this contact from your network?"
        confirmLabel="Delete Contact"
        isDestructive={true}
      />
    </div>
  );
};
