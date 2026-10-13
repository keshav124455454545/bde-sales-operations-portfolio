import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Compass,
  Sliders,
  Copy,
  Check,
  ExternalLink,
  Plus,
  ArrowRight,
  ShieldCheck,
  Layers,
  Sparkles,
  Info,
  Building,
  Target,
  FileCheck2,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ICPAccountResearch, OutreachTemplate } from '../types';
import { Modal } from '../components/common/Modal';

export const Prospecting: React.FC = () => {
  const {
    icpAccounts,
    outreachTemplates,
    services,
    addICPAccount,
    convertICPToLead,
    showToast,
  } = useApp();
  const navigate = useNavigate();

  // Active Tab: 'accounts' | 'icp-builder' | 'templates'
  const [activeTab, setActiveTab] = useState<'accounts' | 'icp-builder' | 'templates'>('accounts');

  // Copy tracking for templates
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Template personalizer state
  const [selectedTemplate, setSelectedTemplate] = useState<OutreachTemplate>(
    outreachTemplates[0] || {}
  );
  const [leadName, setLeadName] = useState('Dr. Marcus');
  const [companyName, setCompanyName] = useState('Apex Health');
  const [industryName, setIndustryName] = useState('Healthcare & MedTech');
  const [serviceArea, setServiceArea] = useState('AI Chatbot & Patient Triage');
  const [senderName, setSenderName] = useState('Keshav Sood');

  // Add Account Research modal
  const [isAddAccountOpen, setIsAddAccountOpen] = useState(false);
  const [newCompany, setNewCompany] = useState('');
  const [newIndustry, setNewIndustry] = useState('Healthcare');
  const [newGeography, setNewGeography] = useState('United States');
  const [newWebsite, setNewWebsite] = useState('');
  const [newRole, setNewRole] = useState('VP of Operations');
  const [newObservedNeed, setNewObservedNeed] = useState('');
  const [newService, setNewService] = useState(services[0]?.name || 'Website Development');
  const [newNotes, setNewNotes] = useState('');
  const [newSource, setNewSource] = useState<'LinkedIn' | 'LinkedIn Sales Navigator' | 'Company Website'>('LinkedIn Sales Navigator');
  const [newNextAction, setNewNextAction] = useState('Send personalized LinkedIn Connection Request.');

  // Interactive ICP Calculator state
  const [icpCriteriaScores, setIcpCriteriaScores] = useState({
    industry: 18, // max 20
    companySize: 18, // max 20
    geographyBudget: 19, // max 20
    identifiedNeed: 18, // max 20
    decisionMakerAccess: 16, // max 20
  });

  const totalCalculatedScore = Object.values(icpCriteriaScores).reduce((a, b) => a + b, 0);

  // Generate personalized template string
  const getPersonalizedContent = (content: string) => {
    return content
      .replace(/{FirstName}/g, leadName || '[First Name]')
      .replace(/{Company}/g, companyName || '[Company]')
      .replace(/{Industry}/g, industryName || '[Industry]')
      .replace(/{ServiceArea}/g, serviceArea || '[Service Area]')
      .replace(/{Geography}/g, 'North America')
      .replace(/{BusinessProblem}/g, 'operational reporting delays')
      .replace(/{YourName}/g, senderName || 'Keshav Sood');
  };

  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    showToast('Copied personalized message to clipboard!');
    setTimeout(() => setCopiedId(null), 2500);
  };

  const handleSaveResearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany.trim() || !newObservedNeed.trim()) {
      showToast('Please fill in required fields.', 'error');
      return;
    }

    const calculatedScore = totalCalculatedScore;
    const breakdown = [
      {
        criterion: 'Industry Fit',
        points: icpCriteriaScores.industry,
        maxPoints: 20,
        reason: 'Target sector alignment with Nexora case studies',
      },
      {
        criterion: 'Company Size & Scale',
        points: icpCriteriaScores.companySize,
        maxPoints: 20,
        reason: 'Team size has capacity for dedicated external IT service budget',
      },
      {
        criterion: 'Geography & Budget Suitability',
        points: icpCriteriaScores.geographyBudget,
        maxPoints: 20,
        reason: 'Target market aligns with typical $5k–$20k project thresholds',
      },
      {
        criterion: 'Observed Technology Need',
        points: icpCriteriaScores.identifiedNeed,
        maxPoints: 20,
        reason: newObservedNeed.slice(0, 45) + '...',
      },
      {
        criterion: 'Decision Maker Accessibility',
        points: icpCriteriaScores.decisionMakerAccess,
        maxPoints: 20,
        reason: `${newRole} identified with public professional presence`,
      },
    ];

    addICPAccount({
      targetCompany: newCompany.trim(),
      targetIndustry: newIndustry,
      targetGeography: newGeography,
      companyWebsite: newWebsite.trim(),
      profileUrl: `https://linkedin.com/company/${newCompany.toLowerCase().replace(/\s+/g, '-')}`,
      decisionMakerRole: newRole.trim(),
      observedBusinessNeed: newObservedNeed.trim(),
      relevantService: newService,
      researchNotes: newNotes.trim() || 'Qualified via Nexora ICP rubric.',
      source: newSource,
      qualificationScore: calculatedScore,
      scoringBreakdown: breakdown,
      nextOutreachAction: newNextAction.trim(),
    });

    setIsAddAccountOpen(false);
    setNewCompany('');
    setNewObservedNeed('');
    setNewNotes('');
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white flex items-center gap-2.5 tracking-tight">
            <div className="p-2 rounded-xl bg-brand-500/10 text-brand-600 dark:text-brand-400">
              <Compass className="w-5 h-5" />
            </div>
            LinkedIn & B2B Prospecting Workspace
          </h1>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Structured manual prospecting workflow: ideal customer profile (ICP) scoring, verified research logs, and multi-touch outreach copywriting.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setIsAddAccountOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-gradient-to-r from-brand-600 to-indigo-600 hover:from-brand-700 hover:to-indigo-700 rounded-xl shadow-md shadow-brand-500/20 transition"
          >
            <Plus className="w-4 h-4" /> Log Researched Account
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-slate-200 dark:border-slate-800 gap-4 text-xs font-semibold">
        <button
          onClick={() => setActiveTab('accounts')}
          className={`pb-2.5 transition flex items-center gap-1.5 ${
            activeTab === 'accounts'
              ? 'border-b-2 border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Building className="w-4 h-4" /> Researched Target Accounts ({icpAccounts.length})
        </button>
        <button
          onClick={() => setActiveTab('icp-builder')}
          className={`pb-2.5 transition flex items-center gap-1.5 ${
            activeTab === 'icp-builder'
              ? 'border-b-2 border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Sliders className="w-4 h-4" /> 0–100 ICP Qualification Rubric
        </button>
        <button
          onClick={() => setActiveTab('templates')}
          className={`pb-2.5 transition flex items-center gap-1.5 ${
            activeTab === 'templates'
              ? 'border-b-2 border-brand-500 text-brand-600 dark:text-brand-400 font-bold'
              : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-white'
          }`}
        >
          <Sparkles className="w-4 h-4" /> Outreach Copywriting & Personalizer ({outreachTemplates.length})
        </button>
      </div>

      {/* Strategy Guidelines */}
      <div className="p-3.5 bg-brand-50/70 dark:bg-brand-950/20 border border-brand-200/60 dark:border-brand-900/40 rounded-2xl text-xs text-slate-700 dark:text-slate-300 flex items-start gap-3">
        <Target className="w-4 h-4 text-blue-600 shrink-0 mt-0.5" />
        <div className="leading-relaxed">
          <strong>Account Research & Qualification Protocol:</strong> Target decision-makers are identified via LinkedIn Sales Navigator, audited against our 0–100 Ideal Customer Profile (ICP) rubric, and engaged via tailored multi-touch value sequences.
        </div>
      </div>

      {/* TAB 1: ACCOUNTS LOG */}
      {activeTab === 'accounts' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {icpAccounts.map((account) => {
              const isConverted = !!account.convertedToLeadId;

              return (
                <div
                  key={account.id}
                  className="figma-card figma-card-hover p-6 rounded-2xl flex flex-col justify-between space-y-4"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <div>
                        <div className="flex items-center gap-2">
                          <h3 className="font-bold text-slate-900 dark:text-white text-sm">{account.targetCompany}</h3>
                          <a
                            href={account.companyWebsite}
                            target="_blank"
                            rel="noreferrer"
                            className="text-slate-400 hover:text-brand-600"
                          >
                            <ExternalLink className="w-3.5 h-3.5" />
                          </a>
                        </div>
                        <span className="text-[11px] text-slate-500">
                          {account.targetIndustry} • {account.targetGeography}
                        </span>
                      </div>

                      <div className="text-right">
                        <div
                          className={`text-sm font-bold px-2 py-0.5 rounded-full inline-block ${
                            account.qualificationScore >= 85
                              ? 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                              : 'bg-amber-50 text-amber-700 border border-amber-200'
                          }`}
                        >
                          ICP Score: {account.qualificationScore}/100
                        </div>
                        <div className="text-[10px] text-slate-400 mt-0.5">{account.source}</div>
                      </div>
                    </div>

                    <div className="space-y-2 text-xs text-slate-600 dark:text-slate-300 pt-2 border-t border-slate-100 dark:border-slate-800">
                      <div>
                        <span className="text-slate-400 font-medium">Target Decision Maker:</span>{' '}
                        <strong className="text-slate-800 dark:text-slate-200">{account.decisionMakerRole}</strong>
                      </div>
                      <div>
                        <span className="text-slate-400 font-medium">Relevant Nexora Service:</span>{' '}
                        <span className="font-semibold text-brand-700 dark:text-brand-400">
                          {account.relevantService}
                        </span>
                      </div>
                      <div className="bg-slate-50/80 dark:bg-slate-800/50 p-3 rounded-xl border border-slate-100 dark:border-slate-800">
                        <span className="text-slate-400 font-semibold block mb-0.5 text-[10px] uppercase tracking-wide">
                          Observed Need / Technology Bottleneck:
                        </span>
                        <p className="text-slate-700 dark:text-slate-300 text-xs">{account.observedBusinessNeed}</p>
                      </div>

                      <div>
                        <span className="text-slate-400 font-semibold block mb-0.5 text-[10px] uppercase tracking-wide">
                          Scoring Breakdown:
                        </span>
                        <div className="grid grid-cols-2 gap-1.5 text-[11px]">
                          {account.scoringBreakdown.map((item, idx) => (
                            <div key={idx} className="bg-slate-50/80 p-1.5 rounded border border-slate-100">
                              <div className="flex justify-between text-slate-500">
                                <span>{item.criterion}:</span>
                                <strong className="text-slate-800">{item.points}/{item.maxPoints}</strong>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-xs">
                    <div className="text-slate-500 truncate max-w-[220px]">
                      <strong className="text-slate-700">Next Action:</strong> {account.nextOutreachAction}
                    </div>

                    {isConverted ? (
                      <span className="text-emerald-700 font-semibold flex items-center gap-1 text-xs bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200">
                        <Check className="w-3.5 h-3.5" /> In CRM Pipeline
                      </span>
                    ) : (
                      <button
                        onClick={() => {
                          const newLead = convertICPToLead(account.id);
                          if (newLead) {
                            navigate(`/leads?id=${newLead.id}`);
                          }
                        }}
                        className="inline-flex items-center gap-1 text-xs font-semibold text-brand-600 hover:text-brand-800 bg-brand-50 hover:bg-brand-100 px-3 py-1.5 rounded-lg border border-brand-200 transition"
                      >
                        Convert to Lead <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* TAB 2: ICP QUALIFICATION BUILDER */}
      {activeTab === 'icp-builder' && (
        <div className="figma-card p-6 sm:p-8 rounded-2xl space-y-6">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-4 border-b border-slate-100">
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white">
                Nexora Ideal Customer Profile (ICP) Scoring Engine
              </h3>
              <p className="text-xs text-slate-500 mt-0.5">
                Calculate an objective 0–100 score before investing sales outreach hours on a prospective account.
              </p>
            </div>
            <div className="flex items-center gap-3 bg-slate-50 dark:bg-slate-800/70 px-4 py-2 rounded-xl border border-slate-200 dark:border-slate-700">
              <span className="text-xs font-medium text-slate-600">Calculated Score:</span>
              <span className={`text-2xl font-extrabold ${totalCalculatedScore >= 80 ? 'text-emerald-600' : 'text-amber-600'}`}>
                {totalCalculatedScore}/100
              </span>
              <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-slate-200 text-slate-800">
                {totalCalculatedScore >= 85 ? 'Tier 1 Priority' : totalCalculatedScore >= 70 ? 'Tier 2 Qualified' : 'Nurture Only'}
              </span>
            </div>
          </div>

          {/* Interactive Criteria Sliders */}
          <div className="space-y-5">
            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">1. Industry & Vertical Fit (Max 20 pts)</span>
                <span className="text-brand-600 font-bold">{icpCriteriaScores.industry} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500">
                High alignment: Healthcare, FinTech, Logistics, B2B SaaS, and Engineering services where Nexora has strong project case studies.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={icpCriteriaScores.industry}
                onChange={(e) =>
                  setIcpCriteriaScores({ ...icpCriteriaScores, industry: parseInt(e.target.value) })
                }
                className="w-full accent-brand-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">2. Company Size & Operational Maturity (Max 20 pts)</span>
                <span className="text-brand-600 font-bold">{icpCriteriaScores.companySize} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Sweet spot: 20 to 250 employees. Established cash flow, active hiring, but lean enough for agile executive decision-making.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={icpCriteriaScores.companySize}
                onChange={(e) =>
                  setIcpCriteriaScores({ ...icpCriteriaScores, companySize: parseInt(e.target.value) })
                }
                className="w-full accent-brand-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">3. Geography & Budget Capacity (Max 20 pts)</span>
                <span className="text-brand-600 font-bold">{icpCriteriaScores.geographyBudget} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Target regions: US, UK, Canada, Australia, Nordics, DACH, and UAE with capacity for $4,000–$25,000 IT project investments.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={icpCriteriaScores.geographyBudget}
                onChange={(e) =>
                  setIcpCriteriaScores({ ...icpCriteriaScores, geographyBudget: parseInt(e.target.value) })
                }
                className="w-full accent-brand-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">4. Observed Technology Need / Pain Point (Max 20 pts)</span>
                <span className="text-brand-600 font-bold">{icpCriteriaScores.identifiedNeed} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Evidence of pain: Slow website load speeds (&gt;4s), job posts seeking manual data entry analysts, public complaints about customer support delays, or broken mobile portal UX.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={icpCriteriaScores.identifiedNeed}
                onChange={(e) =>
                  setIcpCriteriaScores({ ...icpCriteriaScores, identifiedNeed: parseInt(e.target.value) })
                }
                className="w-full accent-brand-600"
              />
            </div>

            <div className="space-y-1.5">
              <div className="flex justify-between text-xs font-semibold">
                <span className="text-slate-800">5. Decision-Maker Accessibility (Max 20 pts)</span>
                <span className="text-brand-600 font-bold">{icpCriteriaScores.decisionMakerAccess} / 20 pts</span>
              </div>
              <p className="text-[11px] text-slate-500">
                Identified VP/Director/Founder with verified business email or active LinkedIn presence responding to direct messages.
              </p>
              <input
                type="range"
                min="0"
                max="20"
                value={icpCriteriaScores.decisionMakerAccess}
                onChange={(e) =>
                  setIcpCriteriaScores({ ...icpCriteriaScores, decisionMakerAccess: parseInt(e.target.value) })
                }
                className="w-full accent-brand-600"
              />
            </div>
          </div>

          <div className="bg-slate-50 dark:bg-slate-800/60 p-4 rounded-xl border border-slate-200 dark:border-slate-700 flex items-center justify-between">
            <div className="text-xs text-slate-600">
              Ready to log an account with this test score? Click below to record it into your prospecting database.
            </div>
            <button
              onClick={() => setIsAddAccountOpen(true)}
              className="px-4 py-2 text-xs font-semibold text-white bg-brand-600 rounded-lg hover:bg-brand-700 transition"
            >
              Log Account with Current Score
            </button>
          </div>
        </div>
      )}

      {/* TAB 3: OUTREACH TEMPLATES & PERSONALIZER */}
      {activeTab === 'templates' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Template Selector */}
          <div className="figma-card p-4 rounded-2xl space-y-2">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3">
              Outreach Script Library
            </h3>
            {outreachTemplates.map((tpl) => (
              <button
                key={tpl.id}
                onClick={() => setSelectedTemplate(tpl)}
                className={`w-full text-left p-3 rounded-lg border text-xs transition ${
                  selectedTemplate.id === tpl.id
                    ? 'border-brand-600 bg-brand-50/70 text-brand-900 font-semibold shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between mb-1">
                  <span className="text-[10px] uppercase font-bold text-slate-500">{tpl.channel}</span>
                  <span className="text-[10px] text-brand-600">Select</span>
                </div>
                <div className="font-semibold text-slate-900">{tpl.title}</div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">{tpl.description}</p>
              </button>
            ))}
          </div>

          {/* Interactive Personalizer & Live Preview */}
          <div className="lg:col-span-2 figma-card p-6 rounded-2xl flex flex-col space-y-4">
            <div>
              <h3 className="text-sm font-bold text-slate-900">{selectedTemplate.title}</h3>
              <p className="text-xs text-slate-500 mt-0.5">{selectedTemplate.description}</p>
              <div className="mt-1 text-[11px] text-slate-400">
                Recommended timing: <strong className="text-slate-600">{selectedTemplate.recommendedTouchpoint}</strong>
              </div>
            </div>

            {/* Variable Inputs */}
            <div className="p-4 bg-slate-50 dark:bg-slate-800/50 rounded-2xl border border-slate-200 dark:border-slate-700 grid grid-cols-2 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Prospect Name</label>
                <input
                  type="text"
                  value={leadName}
                  onChange={(e) => setLeadName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Target Company</label>
                <input
                  type="text"
                  value={companyName}
                  onChange={(e) => setCompanyName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Industry</label>
                <input
                  type="text"
                  value={industryName}
                  onChange={(e) => setIndustryName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">Relevant Service</label>
                <input
                  type="text"
                  value={serviceArea}
                  onChange={(e) => setServiceArea(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white"
                />
              </div>

              <div>
                <label className="block text-[10px] font-semibold text-slate-500 mb-0.5">BDE Sender Name</label>
                <input
                  type="text"
                  value={senderName}
                  onChange={(e) => setSenderName(e.target.value)}
                  className="w-full px-2 py-1 text-xs border rounded bg-white"
                />
              </div>
            </div>

            {/* Generated Message Body */}
            <div className="flex-1 flex flex-col">
              {selectedTemplate.subject && (
                <div className="mb-2 p-2 bg-slate-100 rounded text-xs text-slate-800 font-mono">
                  <strong>Subject:</strong> {getPersonalizedContent(selectedTemplate.subject)}
                </div>
              )}

              <div className="relative flex-1">
                <textarea
                  readOnly
                  rows={8}
                  value={getPersonalizedContent(selectedTemplate.content)}
                  className="w-full h-full p-4 font-mono text-xs text-slate-800 bg-slate-50 border border-slate-300 rounded-xl leading-relaxed focus:outline-none"
                />
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center justify-between pt-2 border-t border-slate-100 text-xs">
              <span className="text-slate-400">
                Ready to paste into LinkedIn or email client
              </span>
              <button
                onClick={() =>
                  handleCopy(
                    getPersonalizedContent(selectedTemplate.content),
                    selectedTemplate.id
                  )
                }
                className="inline-flex items-center gap-1.5 px-4 py-2 font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
              >
                {copiedId === selectedTemplate.id ? (
                  <>
                    <Check className="w-4 h-4 text-emerald-300" /> Copied to Clipboard!
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" /> Copy Message Text
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Account Research Modal */}
      <Modal
        isOpen={isAddAccountOpen}
        onClose={() => setIsAddAccountOpen(false)}
        title="Record Researched Target Account"
        subtitle="Document structured manual research on prospective accounts before initiating outreach."
        maxWidth="2xl"
      >
        <form onSubmit={handleSaveResearch} className="space-y-4 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Company Name *</label>
              <input
                type="text"
                value={newCompany}
                onChange={(e) => setNewCompany(e.target.value)}
                placeholder="e.g. Solaria Health"
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Website URL</label>
              <input
                type="text"
                value={newWebsite}
                onChange={(e) => setNewWebsite(e.target.value)}
                placeholder="https://company.com"
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Target Industry</label>
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Geography</label>
              <input
                type="text"
                value={newGeography}
                onChange={(e) => setNewGeography(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Decision Maker Role</label>
              <input
                type="text"
                value={newRole}
                onChange={(e) => setNewRole(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Relevant Nexora Service</label>
              <select
                value={newService}
                onChange={(e) => setNewService(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg bg-white"
              >
                {services.map((s) => (
                  <option key={s.id} value={s.name}>
                    {s.name}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-700 mb-1">
              Observed Business Need / Bottleneck *
            </label>
            <textarea
              rows={2}
              value={newObservedNeed}
              onChange={(e) => setNewObservedNeed(e.target.value)}
              placeholder="What manual process, slow website, or hiring pain was observed in public postings?"
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
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
              onClick={() => setIsAddAccountOpen(false)}
              className="px-4 py-2 border rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-5 py-2 bg-brand-600 text-white rounded-lg hover:bg-brand-700 font-semibold"
            >
              Save Account Record
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
