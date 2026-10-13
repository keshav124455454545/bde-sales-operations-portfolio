import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Layers,
  Search,
  CheckCircle,
  HelpCircle,
  ShieldCheck,
  FileText,
  DollarSign,
  Clock,
  ArrowRight,
  Sparkles,
  ChevronDown,
  ChevronUp,
} from 'lucide-react';
import { useApp } from '../context/AppContext';
import { ServiceItem } from '../types';

export const Services: React.FC = () => {
  const { services } = useApp();
  const navigate = useNavigate();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedService, setSelectedService] = useState<ServiceItem>(services[0]);
  const [expandedObjection, setExpandedObjection] = useState<number | null>(null);

  const filteredServices = services.filter(
    (s) =>
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.shortDescription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.idealCustomer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-5 h-5 text-brand-600" /> Service & Product Knowledge Library
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Internal BDE knowledge base: capabilities, qualification discovery questions, objection handling scripts, and price benchmarks for all 8 Nexora offerings.
          </p>
        </div>

        <button
          onClick={() =>
            navigate(
              `/proposals?new=true&serviceId=${selectedService.id}&serviceName=${encodeURIComponent(
                selectedService.name
              )}`
            )
          }
          className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
        >
          <FileText className="w-4 h-4" /> Draft Proposal for this Service
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Service Selector Sidebar */}
        <div className="lg:col-span-4 bg-white p-4 rounded-xl border border-slate-200 shadow-2xs space-y-3">
          <div className="relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-2.5" />
            <input
              type="text"
              placeholder="Search services..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-3 py-1.5 text-xs border rounded-lg focus:ring-2 focus:ring-brand-500"
            />
          </div>

          <div className="space-y-1.5">
            {filteredServices.map((service) => (
              <button
                key={service.id}
                onClick={() => {
                  setSelectedService(service);
                  setExpandedObjection(null);
                }}
                className={`w-full text-left p-3 rounded-lg border text-xs transition ${
                  selectedService.id === service.id
                    ? 'border-brand-600 bg-brand-50 text-brand-900 font-semibold shadow-2xs'
                    : 'border-slate-200 hover:bg-slate-50 text-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 text-xs">{service.name}</span>
                  <span className="text-[10px] text-slate-400 font-mono">{service.deliveryTimelineEstimate}</span>
                </div>
                <p className="text-[11px] text-slate-500 mt-1 line-clamp-1">
                  {service.shortDescription}
                </p>
                <div className="mt-2 text-[10px] font-semibold text-emerald-700">
                  {service.priceRangeEstimate}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Selected Service Detail Dossier */}
        <div className="lg:col-span-8 bg-white p-6 rounded-xl border border-slate-200 shadow-2xs space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
            <div>
              <span className="text-[10px] uppercase font-bold text-brand-600 bg-brand-50 px-2 py-0.5 rounded border border-brand-200">
                Core Service Catalogue Entry
              </span>
              <h2 className="text-xl font-bold text-slate-900 mt-1">{selectedService.name}</h2>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">
                {selectedService.shortDescription}
              </p>
            </div>

            <div className="text-right shrink-0 bg-slate-50 p-3 rounded-xl border border-slate-200">
              <span className="text-[10px] uppercase text-slate-400 block font-semibold">
                Target Budget & Timeline:
              </span>
              <div className="text-sm font-bold text-emerald-700">
                {selectedService.priceRangeEstimate}
              </div>
              <div className="text-xs text-slate-500">{selectedService.deliveryTimelineEstimate}</div>
            </div>
          </div>

          {/* Ideal Customer & Common Problems */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5 text-brand-600" /> Ideal Customer Profile (ICP)
              </h3>
              <p className="text-slate-700 leading-relaxed">{selectedService.idealCustomer}</p>
            </div>

            <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
                <CheckCircle className="w-3.5 h-3.5 text-emerald-600" /> Key Differentiators
              </h3>
              <ul className="space-y-1 text-slate-700">
                {selectedService.differentiators.map((diff, i) => (
                  <li key={i} className="flex items-start gap-1.5">
                    <span className="text-brand-600 font-bold">•</span>
                    <span>{diff}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Business Problems & Key Capabilities */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Common Business Problems Addressed
              </h3>
              <ul className="space-y-1.5">
                {selectedService.commonProblems.map((prob, i) => (
                  <li key={i} className="p-2 bg-rose-50/50 border border-rose-100 rounded text-slate-700">
                    {prob}
                  </li>
                ))}
              </ul>
            </div>

            <div className="space-y-2">
              <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
                Key Technical Capabilities & Scope
              </h3>
              <ul className="space-y-1.5">
                {selectedService.keyCapabilities.map((cap, i) => (
                  <li key={i} className="p-2 bg-blue-50/50 border border-blue-100 rounded text-slate-700">
                    {cap}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Discovery Questions for BDE */}
          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <HelpCircle className="w-3.5 h-3.5 text-brand-600" /> Essential BDE Discovery & Qualification Questions
            </h3>
            <p className="text-[11px] text-slate-500 mb-2">
              Ask these specific questions during introductory calls to uncover client budget, timeline urgency, and technical dependencies:
            </p>
            <div className="space-y-1.5">
              {selectedService.discoveryQuestions.map((q, i) => (
                <div key={i} className="p-2 bg-white rounded border border-slate-200 text-slate-800 font-medium">
                  {i + 1}. {q}
                </div>
              ))}
            </div>
          </div>

          {/* Objection Handling Playbook */}
          <div className="space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider flex items-center gap-1.5">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-600" /> Objection Handling Playbook
            </h3>
            <div className="space-y-2">
              {selectedService.commonObjections.map((item, idx) => (
                <div
                  key={idx}
                  className="border border-slate-200 rounded-lg overflow-hidden bg-slate-50/60"
                >
                  <button
                    onClick={() =>
                      setExpandedObjection(expandedObjection === idx ? null : idx)
                    }
                    className="w-full p-3 text-left font-semibold text-slate-900 flex justify-between items-center hover:bg-slate-100 transition"
                  >
                    <span>Objection: "{item.objection}"</span>
                    {expandedObjection === idx ? (
                      <ChevronUp className="w-4 h-4 text-slate-400" />
                    ) : (
                      <ChevronDown className="w-4 h-4 text-slate-400" />
                    )}
                  </button>
                  {expandedObjection === idx && (
                    <div className="p-3 bg-white border-t border-slate-200 text-slate-700 leading-relaxed">
                      <strong className="text-brand-700 block mb-1">Recommended Response:</strong>
                      {item.suggestedResponse}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Deliverables & Dependencies */}
          <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-2 text-xs">
            <h3 className="font-bold text-slate-900 text-xs uppercase tracking-wider">
              Typical Deliverables & Dependencies
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-1">
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                  Project Deliverables:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 mt-1">
                  {selectedService.typicalDeliverables.map((del, i) => (
                    <li key={i}>{del}</li>
                  ))}
                </ul>
              </div>
              <div>
                <span className="text-slate-400 font-semibold block text-[10px] uppercase">
                  Dependencies & Scope Exclusions:
                </span>
                <ul className="list-disc pl-4 space-y-1 text-slate-700 mt-1">
                  {selectedService.dependenciesAndExclusions.map((dep, i) => (
                    <li key={i}>{dep}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
