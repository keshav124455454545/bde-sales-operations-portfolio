import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { useApp } from '../../context/AppContext';
import { LeadSource, PipelineStage, Priority } from '../../types';

interface AddLeadModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const AddLeadModal: React.FC<AddLeadModalProps> = ({ isOpen, onClose }) => {
  const { addLead, services } = useApp();

  const [companyName, setCompanyName] = useState('');
  const [website, setWebsite] = useState('');
  const [industry, setIndustry] = useState('Technology & SaaS');
  const [companySize, setCompanySize] = useState('25-100 employees');
  const [country, setCountry] = useState('United States');
  const [city, setCity] = useState('');
  const [contactPerson, setContactPerson] = useState('');
  const [jobTitle, setJobTitle] = useState('');
  const [profileUrl, setProfileUrl] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [source, setSource] = useState<LeadSource>('LinkedIn');
  const [serviceOfInterest, setServiceOfInterest] = useState(
    services[0]?.name || 'Website Development'
  );
  const [businessProblem, setBusinessProblem] = useState('');
  const [qualificationNotes, setQualificationNotes] = useState('');
  const [status, setStatus] = useState<PipelineStage>('New Lead');
  const [priority, setPriority] = useState<Priority>('Medium');
  const [estimatedDealValue, setEstimatedDealValue] = useState('5000');
  const [nextAction, setNextAction] = useState('Conduct initial research and send introductory message.');
  const [nextFollowUpDate, setNextFollowUpDate] = useState(
    new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10)
  );

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newErrors: Record<string, string> = {};

    if (!companyName.trim()) newErrors.companyName = 'Company name is required';
    if (!contactPerson.trim()) newErrors.contactPerson = 'Contact person is required';
    if (!jobTitle.trim()) newErrors.jobTitle = 'Job title is required';
    if (!businessProblem.trim()) newErrors.businessProblem = 'Business problem is required';

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    addLead({
      companyName: companyName.trim(),
      website: website.trim() || 'https://example.com',
      industry,
      companySize,
      country,
      city: city.trim() || 'Unspecified',
      contactPerson: contactPerson.trim(),
      jobTitle: jobTitle.trim(),
      profileUrl: profileUrl.trim() || 'https://linkedin.com',
      email: email.trim() || undefined,
      phone: phone.trim() || undefined,
      source,
      serviceOfInterest,
      businessProblem: businessProblem.trim(),
      qualificationNotes: qualificationNotes.trim() || 'Created via quick lead action.',
      leadOwner: 'Keshav Sood (BDE)',
      status,
      priority,
      estimatedDealValue: parseFloat(estimatedDealValue) || 5000,
      lastContactDate: new Date().toISOString().slice(0, 10),
      nextFollowUpDate,
      nextAction: nextAction.trim(),
    });

    // Reset form
    setCompanyName('');
    setWebsite('');
    setContactPerson('');
    setJobTitle('');
    setProfileUrl('');
    setEmail('');
    setPhone('');
    setBusinessProblem('');
    setQualificationNotes('');
    setErrors({});
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Add Prospective Lead"
      subtitle="Record a new target business and add them directly into your pipeline."
      maxWidth="4xl"
    >
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Company Name *
            </label>
            <input
              type="text"
              value={companyName}
              onChange={(e) => setCompanyName(e.target.value)}
              placeholder="e.g. Acme Tech Solutions"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.companyName ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
              }`}
            />
            {errors.companyName && (
              <p className="text-xs text-rose-600 mt-0.5">{errors.companyName}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Website URL
            </label>
            <input
              type="text"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="https://acme-example.com"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Contact Person *
            </label>
            <input
              type="text"
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              placeholder="e.g. Sarah Connor"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.contactPerson ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
              }`}
            />
            {errors.contactPerson && (
              <p className="text-xs text-rose-600 mt-0.5">{errors.contactPerson}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Job Title / Decision Maker Role *
            </label>
            <input
              type="text"
              value={jobTitle}
              onChange={(e) => setJobTitle(e.target.value)}
              placeholder="e.g. VP of Operations / Chief Technology Officer"
              className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
                errors.jobTitle ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
              }`}
            />
            {errors.jobTitle && (
              <p className="text-xs text-rose-600 mt-0.5">{errors.jobTitle}</p>
            )}
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Business Email (Optional)
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="s.connor@acme-example.com"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              LinkedIn / Public Profile URL
            </label>
            <input
              type="text"
              value={profileUrl}
              onChange={(e) => setProfileUrl(e.target.value)}
              placeholder="https://linkedin.com/in/sarah-connor"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Lead Source
            </label>
            <select
              value={source}
              onChange={(e) => setSource(e.target.value as LeadSource)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              <option value="LinkedIn">LinkedIn</option>
              <option value="LinkedIn Sales Navigator">LinkedIn Sales Navigator</option>
              <option value="Company Website">Company Website</option>
              <option value="Upwork">Upwork</option>
              <option value="Freelancer">Freelancer</option>
              <option value="PeoplePerHour">PeoplePerHour</option>
              <option value="Referral">Referral</option>
              <option value="Networking">Networking</option>
              <option value="Other">Other</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Service of Interest
            </label>
            <select
              value={serviceOfInterest}
              onChange={(e) => setServiceOfInterest(e.target.value)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
            >
              {services.map((s) => (
                <option key={s.id} value={s.name}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Industry
            </label>
            <input
              type="text"
              value={industry}
              onChange={(e) => setIndustry(e.target.value)}
              placeholder="e.g. Healthcare, Logistics, FinTech"
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Country & City
            </label>
            <div className="grid grid-cols-2 gap-2">
              <input
                type="text"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                placeholder="Country (e.g. US, UK)"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="City (e.g. Austin)"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Pipeline Stage
            </label>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value as PipelineStage)}
              className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
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
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Priority & Est. Deal Value ($)
            </label>
            <div className="grid grid-cols-2 gap-2">
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value as Priority)}
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-brand-500"
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
                <option value="Urgent">Urgent</option>
              </select>
              <input
                type="number"
                value={estimatedDealValue}
                onChange={(e) => setEstimatedDealValue(e.target.value)}
                placeholder="Deal Value"
                className="w-full px-3 py-2 text-sm border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
              />
            </div>
          </div>
        </div>

        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Observed Business Problem / Opportunity *
          </label>
          <textarea
            rows={2}
            value={businessProblem}
            onChange={(e) => setBusinessProblem(e.target.value)}
            placeholder="What operational pain, manual bottleneck, or technology challenge did your research identify?"
            className={`w-full px-3 py-2 text-sm border rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500 ${
              errors.businessProblem ? 'border-rose-400 bg-rose-50' : 'border-slate-300'
            }`}
          />
          {errors.businessProblem && (
            <p className="text-xs text-rose-600 mt-0.5">{errors.businessProblem}</p>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Next Action Item
            </label>
            <input
              type="text"
              value={nextAction}
              onChange={(e) => setNextAction(e.target.value)}
              placeholder="e.g. Send audit deck and schedule 15-min discovery"
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
            Save Lead
          </button>
        </div>
      </form>
    </Modal>
  );
};
