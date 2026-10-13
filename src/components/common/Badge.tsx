import React from 'react';

interface BadgeProps {
  children?: React.ReactNode;
  variant?: 'stage' | 'priority' | 'status' | 'platform' | 'neutral' | 'proposal';
  value?: string;
  className?: string;
  showDot?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'neutral',
  value,
  className = '',
  showDot = true,
}) => {
  const text = (value || (children ? String(children) : '')).trim();

  let colorClasses = 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
  let dotColor = 'bg-slate-400 dark:bg-slate-500';

  if (variant === 'priority' || ['Urgent', 'High', 'Medium', 'Low'].includes(text)) {
    switch (text) {
      case 'Urgent':
        colorClasses = 'bg-rose-50 text-rose-700 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800/60';
        dotColor = 'bg-rose-500 dark:bg-rose-400 animate-pulse';
        break;
      case 'High':
        colorClasses = 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60';
        dotColor = 'bg-amber-500 dark:bg-amber-400';
        break;
      case 'Medium':
        colorClasses = 'bg-blue-50 text-blue-700 border-blue-200/80 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800/60';
        dotColor = 'bg-blue-500 dark:bg-blue-400';
        break;
      case 'Low':
        colorClasses = 'bg-slate-100 text-slate-600 border-slate-200/80 dark:bg-slate-800/60 dark:text-slate-400 dark:border-slate-700/60';
        dotColor = 'bg-slate-400 dark:bg-slate-500';
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
        colorClasses = 'bg-indigo-50 text-indigo-700 border-indigo-200/80 dark:bg-indigo-950/60 dark:text-indigo-300 dark:border-indigo-800/60';
        dotColor = 'bg-indigo-500 dark:bg-indigo-400';
        break;
      case 'Contacted':
        colorClasses = 'bg-sky-50 text-sky-700 border-sky-200/80 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-800/60';
        dotColor = 'bg-sky-500 dark:bg-sky-400';
        break;
      case 'Qualified':
        colorClasses = 'bg-cyan-50 text-cyan-700 border-cyan-200/80 dark:bg-cyan-950/60 dark:text-cyan-300 dark:border-cyan-800/60';
        dotColor = 'bg-cyan-500 dark:bg-cyan-400';
        break;
      case 'Meeting Scheduled':
        colorClasses = 'bg-purple-50 text-purple-700 border-purple-200/80 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800/60';
        dotColor = 'bg-purple-500 dark:bg-purple-400';
        break;
      case 'Proposal':
        colorClasses = 'bg-amber-50 text-amber-700 border-amber-200/80 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800/60';
        dotColor = 'bg-amber-500 dark:bg-amber-400';
        break;
      case 'Negotiation':
        colorClasses = 'bg-orange-50 text-orange-700 border-orange-200/80 dark:bg-orange-950/60 dark:text-orange-300 dark:border-orange-800/60';
        dotColor = 'bg-orange-500 dark:bg-orange-400';
        break;
      case 'Won':
        colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/70 dark:text-emerald-300 dark:border-emerald-700 font-semibold';
        dotColor = 'bg-emerald-500 dark:bg-emerald-400';
        break;
      case 'Lost':
        colorClasses = 'bg-rose-50 text-rose-600 border-rose-200/80 dark:bg-rose-950/60 dark:text-rose-400 dark:border-rose-800/60';
        dotColor = 'bg-rose-400 dark:bg-rose-500';
        break;
    }
  } else if (
    variant === 'platform' ||
    ['Upwork', 'Freelancer', 'PeoplePerHour'].includes(text)
  ) {
    switch (text) {
      case 'Upwork':
        colorClasses = 'bg-emerald-50 text-emerald-800 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700 font-medium';
        dotColor = 'bg-emerald-500';
        break;
      case 'Freelancer':
        colorClasses = 'bg-sky-50 text-sky-800 border-sky-300 dark:bg-sky-950/60 dark:text-sky-300 dark:border-sky-700 font-medium';
        dotColor = 'bg-sky-500';
        break;
      case 'PeoplePerHour':
        colorClasses = 'bg-amber-50 text-amber-800 border-amber-300 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-700 font-medium';
        dotColor = 'bg-amber-500';
        break;
    }
  } else if (
    variant === 'proposal' ||
    ['Draft', 'In Review', 'Submitted', 'Accepted', 'Rejected'].includes(text)
  ) {
    switch (text) {
      case 'Draft':
        colorClasses = 'bg-slate-100 text-slate-700 border-slate-300 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700';
        dotColor = 'bg-slate-400';
        break;
      case 'In Review':
        colorClasses = 'bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-800';
        dotColor = 'bg-blue-500';
        break;
      case 'Submitted':
        colorClasses = 'bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-950/60 dark:text-purple-300 dark:border-purple-800';
        dotColor = 'bg-purple-500';
        break;
      case 'Accepted':
        colorClasses = 'bg-emerald-50 text-emerald-700 border-emerald-300 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-700 font-semibold';
        dotColor = 'bg-emerald-500';
        break;
      case 'Rejected':
        colorClasses = 'bg-rose-50 text-rose-700 border-rose-300 dark:bg-rose-950/60 dark:text-rose-300 dark:border-rose-800';
        dotColor = 'bg-rose-500';
        break;
    }
  }

  return (
    <span
      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium border shadow-2xs transition-colors ${colorClasses} ${className}`}
    >
      {showDot && <span className={`w-1.5 h-1.5 rounded-full mr-1.5 shrink-0 ${dotColor}`} />}
      {children || value}
    </span>
  );
};
