import React, { useState } from 'react';
import {
  Search,
  ExternalLink,
  Plus,
  Compass,
  FileQuestion,
  Lightbulb,
  Building2,
  Globe2,
  TrendingUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { MarketResearchRecord } from '../types';
import { Modal } from '../components/common/Modal';

export const MarketResearch: React.FC = () => {
  const { marketResearch, addMarketResearch, services } = useApp();
  const [selectedRecord, setSelectedRecord] = useState<MarketResearchRecord | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);

  // New research form
  const [newIndustry, setNewIndustry] = useState('Healthcare & Medical Clinics');
  const [newGeo, setNewGeo] = useState('United States (Texas & Midwest)');
  const [newSegment, setNewSegment] = useState('Private clinics with 5-15 doctors');
  const [newProblem, setNewProblem] = useState('High receptionist turnover causing unanswered patient calls.');
  const [newService, setNewService] = useState(services[0]?.name || 'AI Chatbot Development');
  const [newCompetitor, setNewCompetitor] = useState('Local MedTech Agency');
  const [newCompetitorUrl, setNewCompetitorUrl] = useState('https://healthcaresuite.io');
  const [newCompetitorOffering, setNewCompetitorOffering] = useState('Generic rigid monthly SaaS software ($800/mo).');
  const [newDiff, setNewDiff] = useState('Custom tailored RAG bot with zero monthly lock-in, 40% lower TCO.');
  const [newEvidenceUrl, setNewEvidenceUrl] = useState('https://ada.org/resources/practice-insights');
  const [newNotes, setNewNotes] = useState('High intent among practice managers.');
  const [newAction, setNewAction] = useState('Launch targeted cold email campaign to 30 dental clinics.');

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addMarketResearch({
      targetIndustry: newIndustry,
      geography: newGeo,
      targetCustomerSegment: newSegment,
      businessProblem: newProblem,
      potentialServiceOpportunity: newService,
      competitorName: newCompetitor,
      competitorWebsite: newCompetitorUrl,
      publiclyObservedOffering: newCompetitorOffering,
      differentiationHypothesis: newDiff,
      evidenceSourceUrl: newEvidenceUrl,
      notes: newNotes,
      recommendedNextAction: newAction,
      worksheetAnswers: {
        targetBusinesses: newSegment,
        businessProblems: newProblem,
        currentSolutions: newCompetitorOffering,
        competitorOfferings: newCompetitorOffering,
        differentiationValue: newDiff,
        evidenceFound: newEvidenceUrl,
        nextStepsToInvestigate: newAction,
      },
    });
    setIsAddOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Search className="w-5 h-5 text-brand-600" /> B2B Market Research & Competitive Intel
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Identify selling opportunities, competitor positioning, and unique value differentiators across international verticals.
          </p>
        </div>

        <button
          onClick={() => setIsAddOpen(true)}
          className="inline-flex items-center gap-1.5 px-3.5 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
        >
          <Plus className="w-4 h-4" /> New Market Research
        </button>
      </div>

      {/* Grid of Research Records */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {marketResearch.map((record) => (
          <div
            key={record.id}
            onClick={() => setSelectedRecord(record)}
            className="bg-white p-5 rounded-xl border border-slate-200 shadow-2xs hover:border-slate-300 cursor-pointer transition flex flex-col justify-between space-y-4"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="text-xs font-bold text-brand-700 bg-brand-50 px-2.5 py-0.5 rounded-full border border-brand-200">
                  {record.targetIndustry}
                </span>
                <span className="text-[11px] text-slate-400 font-mono">{record.researchDate}</span>
              </div>

              <h3 className="font-bold text-slate-900 text-sm">{record.targetCustomerSegment}</h3>
              <p className="text-xs text-slate-500 mt-0.5 flex items-center gap-1">
                <Globe2 className="w-3.5 h-3.5 text-slate-400" /> {record.geography}
              </p>

              {/* Observed Problem */}
              <div className="mt-3 bg-slate-50 p-3 rounded-lg border border-slate-100 text-xs">
                <strong className="text-slate-800 block mb-1">Target Business Problem:</strong>
                <p className="text-slate-600 leading-relaxed">{record.businessProblem}</p>
              </div>

              {/* Competitor & Differentiation */}
              <div className="mt-3 text-xs space-y-1.5">
                <div>
                  <span className="text-slate-400 font-medium">Competitor Analyzed:</span>{' '}
                  <strong className="text-slate-800">{record.competitorName}</strong>
                </div>
                <div>
                  <span className="text-slate-400 font-medium">Nexora Differentiation:</span>{' '}
                  <span className="text-emerald-700 font-semibold">{record.differentiationHypothesis}</span>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 truncate max-w-[240px]">
                <strong>Next Step:</strong> {record.recommendedNextAction}
              </span>
              <span className="text-brand-600 font-semibold hover:underline">
                View Worksheet →
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Detail Worksheet Modal */}
      {selectedRecord && (
        <Modal
          isOpen={!!selectedRecord}
          onClose={() => setSelectedRecord(null)}
          title={`Market Research Worksheet: ${selectedRecord.targetIndustry}`}
          subtitle={`Geography: ${selectedRecord.geography} • Researched: ${selectedRecord.researchDate}`}
          maxWidth="4xl"
        >
          <div className="space-y-5 text-xs">
            <div className="bg-brand-50/70 p-4 rounded-xl border border-brand-200">
              <h4 className="font-bold text-brand-900 text-sm mb-1">Nexora Service Opportunity</h4>
              <p className="text-brand-800 font-medium text-xs">{selectedRecord.potentialServiceOpportunity}</p>
            </div>

            {/* 7 Guiding Questions Breakdown */}
            <div className="space-y-3 bg-white p-4 rounded-xl border border-slate-200">
              <h4 className="font-bold text-slate-900 text-sm flex items-center gap-2">
                <FileQuestion className="w-4 h-4 text-brand-600" /> 7-Step BDE Market Research Discovery Worksheet
              </h4>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs pt-2">
                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                    1. Which businesses need this service?
                  </span>
                  <p className="text-slate-800 font-medium mt-1">
                    {selectedRecord.worksheetAnswers?.targetBusinesses || selectedRecord.targetCustomerSegment}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                    2. What operational problems are they experiencing?
                  </span>
                  <p className="text-slate-800 font-medium mt-1">
                    {selectedRecord.worksheetAnswers?.businessProblems || selectedRecord.businessProblem}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                    3. What solutions are they currently using?
                  </span>
                  <p className="text-slate-800 font-medium mt-1">
                    {selectedRecord.worksheetAnswers?.currentSolutions || selectedRecord.publiclyObservedOffering}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                    4. What competitor offerings are publicly visible?
                  </span>
                  <p className="text-slate-800 font-medium mt-1">
                    {selectedRecord.competitorName}: {selectedRecord.publiclyObservedOffering}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                    5. What differentiation makes Nexora winning?
                  </span>
                  <p className="text-slate-800 font-medium mt-1 text-emerald-700">
                    {selectedRecord.differentiationHypothesis}
                  </p>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-100">
                  <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                    6. What evidence/source URL supports this?
                  </span>
                  <a
                    href={selectedRecord.evidenceSourceUrl}
                    target="_blank"
                    rel="noreferrer"
                    className="text-brand-600 hover:underline flex items-center gap-1 mt-1 truncate"
                  >
                    {selectedRecord.evidenceSourceUrl} <ExternalLink className="w-3 h-3" />
                  </a>
                </div>
              </div>

              <div className="p-3 bg-amber-50 rounded-lg border border-amber-200 mt-3">
                <span className="text-amber-800 font-bold block text-[10px] uppercase">
                  7. What should the BDE investigate next?
                </span>
                <p className="text-amber-900 font-medium mt-1">{selectedRecord.recommendedNextAction}</p>
              </div>
            </div>
          </div>
        </Modal>
      )}

      {/* Add Modal */}
      <Modal
        isOpen={isAddOpen}
        onClose={() => setIsAddOpen(false)}
        title="Document New Market Research Opportunity"
        maxWidth="2xl"
      >
        <form onSubmit={handleSave} className="space-y-3 text-xs">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Target Industry *</label>
              <input
                type="text"
                value={newIndustry}
                onChange={(e) => setNewIndustry(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Geography *</label>
              <input
                type="text"
                value={newGeo}
                onChange={(e) => setNewGeo(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
                required
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold mb-1">Customer Segment</label>
            <input
              type="text"
              value={newSegment}
              onChange={(e) => setNewSegment(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Observed Business Problem</label>
            <textarea
              rows={2}
              value={newProblem}
              onChange={(e) => setNewProblem(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block font-semibold mb-1">Competitor Name</label>
              <input
                type="text"
                value={newCompetitor}
                onChange={(e) => setNewCompetitor(e.target.value)}
                className="w-full px-3 py-2 border rounded-lg"
              />
            </div>
            <div>
              <label className="block font-semibold mb-1">Relevant Nexora Service</label>
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
            <label className="block font-semibold mb-1">Differentiation Hypothesis</label>
            <input
              type="text"
              value={newDiff}
              onChange={(e) => setNewDiff(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
            />
          </div>

          <div>
            <label className="block font-semibold mb-1">Recommended Next Action</label>
            <input
              type="text"
              value={newAction}
              onChange={(e) => setNewAction(e.target.value)}
              className="w-full px-3 py-2 border rounded-lg"
              required
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
              Save Research
            </button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
