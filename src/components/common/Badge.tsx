import React from 'react';
import { PipelineStage, Priority, BiddingStatus, ProposalStatus } from '../../types';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'stage' | 'priority' | 'status' | 'platform' | 'neutral' | 'proposal';
  value?: string;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  value,
  className = '',
}) => {
  const text = (value || (children ? String(children) : '')).trim();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200';

  if (variant === 'priority' || ['Urgent', 'High', 'Medium', 'Low'].includes(text)) {
    switch (text) {
      case 'Urgent':
        colorClasses = 'bg-rose-50 text-rose-700 border-rose-200';
        break;
      case 'High':
        colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Medium':
        colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Low':
        colorClasses = 'bg-slate-100 text-slate-600 border-slate-200';
        break;
    }
  } else if (
    variant === 'stage' ||
    [
      'New Lead',
      'Contacted',
      'Qualified',
      'Meeting Scheduled',
      'Proposal',
      'Negotiation',
      'Won',
      'Lost',
    ].includes(text)
  ) {
    switch (text) {
      case 'New Lead':
        colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200';
        break;
      case 'Contacted':
        colorClasses = 'bg-sky-50 text-sky-700 border-sky-200';
        break;
      case 'Qualified':
        colorClasses = 'bg-cyan-50 text-cyan-700 border-cyan-200';
        break;
      case 'Meeting Scheduled':
        colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      case 'Proposal':
        colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Negotiation':
        colorClasses = 'bg-orange-50 text-orange-700 border-orange-200';
        break;
      case 'Won':
        colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold';
        break;
      case 'Lost':
        colorClasses = 'bg-rose-50 text-rose-600 border-rose-200';
        break;
    }
  } else if (
    variant === 'platform' ||
    ['Upwork', 'Freelancer', 'PeoplePerHour'].includes(text)
  ) {
    switch (text) {
      case 'Upwork':
        colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300 font-medium';
        break;
      case 'Freelancer':
        colorClasses = 'bg-sky-50 text-sky-800 border-sky-300 font-medium';
        break;
      case 'PeoplePerHour':
        colorClasses = 'bg-amber-50 text-amber-800 border-amber-300 font-medium';
        break;
    }
  } else if (
    variant === 'proposal' ||
    ['Draft', 'In Review', 'Submitted', 'Accepted', 'Rejected'].includes(text)
  ) {
    switch (text) {
      case 'Draft':
        colorClasses = 'bg-slate-100 text-slate-700 border-slate-300';
        break;
      case 'In Review':
        colorClasses = 'bg-blue-50 text-blue-700 border-blue-200';
        break;
      case 'Submitted':
        colorClasses = 'bg-purple-50 text-purple-700 border-purple-200';
        break;
      case 'Negotiation':
        colorClasses = 'bg-amber-50 text-amber-700 border-amber-200';
        break;
      case 'Accepted':
        colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 font-semibold';
        break;
      case 'Rejected':
        colorClasses = 'bg-rose-50 text-rose-700 border-rose-300';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-xs border ${colorClasses} ${className}`}
    >
      {children || value}
    </span>
  );
};
