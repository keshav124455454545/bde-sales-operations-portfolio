import React from 'react';
import { Proposal } from '../../types';
import { Printer, ArrowLeft, Download, ShieldCheck, CheckCircle2 } from 'lucide-react';

interface ProposalDocumentProps {
  proposal: Proposal;
  onBack?: () => void;
  onEdit?: () => void;
}

export const ProposalDocument: React.FC<ProposalDocumentProps> = ({
  proposal,
  onBack,
  onEdit,
}) => {
  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="space-y-6">
      {/* Document Controls (Hidden on Print) */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-2xs flex flex-wrap items-center justify-between gap-3 no-print">
        <div className="flex items-center gap-2">
          {onBack && (
            <button
              onClick={onBack}
              className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-medium text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition"
            >
              <ArrowLeft className="w-3.5 h-3.5" /> Back to Proposals
            </button>
          )}
          <span className="text-xs text-slate-500">
            Document ID: <strong className="text-slate-800 font-mono">{proposal.id}</strong> • Version {proposal.version}
          </span>
        </div>

        <div className="flex items-center gap-2">
          {onEdit && (
            <button
              onClick={onEdit}
              className="px-3 py-1.5 text-xs font-medium text-slate-700 bg-white border border-slate-300 hover:bg-slate-50 rounded-lg transition"
            >
              Edit Proposal
            </button>
          )}
          <button
            onClick={handlePrint}
            className="inline-flex items-center gap-1.5 px-4 py-1.5 text-xs font-semibold text-white bg-brand-600 hover:bg-brand-700 rounded-lg shadow-xs transition"
          >
            <Printer className="w-3.5 h-3.5" /> Print / Save as PDF
          </button>
        </div>
      </div>

      {/* Formal Printable Executive Document Surface */}
      <div className="bg-white p-8 sm:p-12 rounded-xl border border-slate-300 shadow-sm max-w-4xl mx-auto print-page font-sans text-slate-900">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row sm:items-start justify-between border-b-2 border-slate-900 pb-6 mb-8 gap-4">
          <div>
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-lg bg-slate-900 flex items-center justify-center text-white font-extrabold text-base tracking-wider">
                NX
              </div>
              <div>
                <h1 className="text-xl font-bold tracking-tight text-slate-900">Nexora Digital Solutions</h1>
                <p className="text-xs text-slate-500 font-medium">B2B Enterprise IT & Software Engineering</p>
              </div>
            </div>
            <div className="mt-4 text-xs text-slate-600 space-y-0.5">
              <div>Phase 8B, Industrial Area, Mohali, Punjab 160055, India</div>
              <div>operations@nexoradigital-demo.com • www.nexoradigital-demo.com</div>
            </div>
          </div>

          <div className="sm:text-right space-y-1 text-xs">
            <div className="text-xs font-bold uppercase tracking-wider text-brand-700 bg-brand-50 px-2.5 py-1 rounded inline-block border border-brand-200">
              Commercial Proposal
            </div>
            <div className="text-sm font-bold text-slate-900 pt-1 font-mono">
              Ref: {proposal.id}
            </div>
            <div className="text-slate-600">Date: {proposal.dateCreated}</div>
            <div className="text-slate-600">Validity: {proposal.validityDays} Days</div>
            <div className="text-slate-500 text-[11px]">Status: {proposal.status}</div>
          </div>
        </div>

        {/* Client Recipient Block */}
        <div className="bg-slate-50/80 p-5 rounded-lg border border-slate-200 mb-8 grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Prepared Exclusively For:
            </span>
            <div className="font-bold text-sm text-slate-900">{proposal.clientCompany}</div>
            <div className="text-slate-700 mt-0.5">
              Attention: <strong className="text-slate-900">{proposal.contactPerson}</strong>
            </div>
            {proposal.contactEmail && (
              <div className="text-slate-600 mt-0.5">{proposal.contactEmail}</div>
            )}
          </div>

          <div>
            <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider block mb-1">
              Engaged Practice Area:
            </span>
            <div className="font-bold text-sm text-brand-700">{proposal.serviceName}</div>
            <div className="text-slate-600 mt-0.5">Delivery Horizon: {proposal.timelineSummary}</div>
            <div className="text-slate-900 font-semibold mt-0.5">
              Total Proposed Investment: ${proposal.totalEstimatedPrice.toLocaleString()} {proposal.currency}
            </div>
          </div>
        </div>

        {/* Section 1: Executive Summary & Client Problem */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            1. Executive Summary & Client Problem Statement
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            {proposal.clientProblem}
          </p>

          <div className="mt-4 pt-2">
            <h3 className="text-xs font-bold text-slate-800 mb-2">Key Business Objectives:</h3>
            <ul className="grid grid-cols-1 gap-1.5 text-xs text-slate-700">
              {proposal.businessObjectives.map((obj, i) => (
                <li key={i} className="flex items-start gap-2">
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0 mt-0.5" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 2: Proposed Solution Architecture */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            2. Proposed Technical Solution & Methodology
          </h2>
          <p className="text-xs text-slate-700 leading-relaxed text-justify">
            {proposal.proposedSolution}
          </p>
        </div>

        {/* Section 3: Scope of Work */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            3. Scope of Work (Phased Implementation)
          </h2>
          <div className="space-y-2 text-xs">
            {proposal.scopeOfWork.map((scope, idx) => (
              <div key={idx} className="p-2.5 bg-slate-50 border border-slate-200 rounded text-slate-800">
                {scope}
              </div>
            ))}
          </div>
        </div>

        {/* Section 4: Deliverables */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            4. Tangible Deliverables
          </h2>
          <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-700">
            {proposal.deliverables.map((del, i) => (
              <li key={i}>{del}</li>
            ))}
          </ul>
        </div>

        {/* Section 5: Timeline & Payment Milestones */}
        <div className="mb-8 space-y-3">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900 border-b border-slate-200 pb-1">
            5. Timeline, Milestones & Commercial Terms
          </h2>
          <p className="text-xs text-slate-600">
            Project schedule is structured in linked delivery tranches. Invoices are remitted upon verification of designated milestone deliverables:
          </p>

          <div className="overflow-x-auto mt-2">
            <table className="w-full text-left text-xs border border-slate-200">
              <thead className="bg-slate-100 font-semibold text-slate-700">
                <tr>
                  <th className="p-2.5 border-b border-slate-200">Milestone Phase</th>
                  <th className="p-2.5 border-b border-slate-200">Target Deliverable</th>
                  <th className="p-2.5 border-b border-slate-200">Duration</th>
                  <th className="p-2.5 border-b border-slate-200 text-right">Payment %</th>
                  <th className="p-2.5 border-b border-slate-200 text-right">Amount (USD)</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-200">
                {proposal.milestones.map((m, idx) => (
                  <tr key={idx} className="hover:bg-slate-50">
                    <td className="p-2.5 font-bold text-slate-900">{m.milestone}</td>
                    <td className="p-2.5 text-slate-700">{m.deliverable}</td>
                    <td className="p-2.5 text-slate-600 font-mono">{m.duration}</td>
                    <td className="p-2.5 text-right font-medium">{m.paymentPercentage}%</td>
                    <td className="p-2.5 text-right font-bold text-slate-900">
                      ${m.amount.toLocaleString()}
                    </td>
                  </tr>
                ))}
              </tbody>
              <tfoot className="bg-slate-50 font-bold border-t-2 border-slate-300">
                <tr>
                  <td colSpan={3} className="p-2.5 text-slate-900 text-right uppercase">
                    Total Contract Value:
                  </td>
                  <td className="p-2.5 text-right">100%</td>
                  <td className="p-2.5 text-right text-emerald-700 text-sm">
                    ${proposal.totalEstimatedPrice.toLocaleString()} {proposal.currency}
                  </td>
                </tr>
              </tfoot>
            </table>
          </div>
        </div>

        {/* Section 6: Assumptions & Exclusions */}
        <div className="mb-8 grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs">
          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
              Assumptions & Prerequisites:
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              {proposal.assumptions.map((ass, i) => (
                <li key={i}>{ass}</li>
              ))}
            </ul>
          </div>

          <div className="space-y-2">
            <h3 className="font-bold uppercase tracking-wider text-slate-800 text-[11px]">
              Explicit Exclusions:
            </h3>
            <ul className="list-disc pl-4 space-y-1 text-slate-600">
              {proposal.exclusions.map((exc, i) => (
                <li key={i}>{exc}</li>
              ))}
            </ul>
          </div>
        </div>

        {/* Section 7: Next Steps & Acceptance Sign-off */}
        <div className="space-y-4 pt-4 border-t-2 border-slate-200">
          <h2 className="text-sm font-bold uppercase tracking-wider text-slate-900">
            6. Next Steps & Authorization
          </h2>
          <ol className="list-decimal pl-5 space-y-1 text-xs text-slate-700">
            {proposal.nextSteps.map((step, i) => (
              <li key={i}>{step}</li>
            ))}
          </ol>

          <div className="grid grid-cols-2 gap-8 pt-8 mt-6 border-t border-slate-200 text-xs">
            <div className="space-y-4">
              <div className="border-b border-slate-400 pb-8">
                <span className="text-[10px] text-slate-400 block uppercase">
                  Authorized Nexora Representative:
                </span>
                <span className="font-bold text-slate-900 block mt-1">Simranjit Singh</span>
                <span className="text-slate-500 text-[11px]">Business Development Executive</span>
              </div>
              <div className="text-[11px] text-slate-500">Date: {proposal.dateCreated}</div>
            </div>

            <div className="space-y-4">
              <div className="border-b border-slate-400 pb-8">
                <span className="text-[10px] text-slate-400 block uppercase">
                  Accepted on Behalf of Client:
                </span>
                <span className="font-bold text-slate-900 block mt-1">{proposal.contactPerson}</span>
                <span className="text-slate-500 text-[11px]">{proposal.clientCompany}</span>
              </div>
              <div className="text-[11px] text-slate-500">Authorized Signature & Date</div>
            </div>
          </div>
        </div>

        {/* Simulation Footer */}
        <div className="mt-12 pt-4 border-t border-slate-200 text-[10px] text-center text-slate-400">
          This document is generated for demonstration and portfolio practice by Nexora Digital Solutions.
        </div>
      </div>
    </div>
  );
};
