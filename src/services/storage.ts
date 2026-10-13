import {
  Lead,
  BiddingOpportunity,
  Proposal,
  ServiceItem,
  Activity,
  MarketResearchRecord,
  NetworkContact,
  OutreachTemplate,
  ICPAccountResearch,
} from '../types';
import {
  SEED_LEADS,
  SEED_BIDDING_OPPORTUNITIES,
  SEED_PROPOSALS,
  SEED_SERVICES,
  SEED_ACTIVITIES,
  SEED_MARKET_RESEARCH,
  SEED_NETWORK_CONTACTS,
  SEED_OUTREACH_TEMPLATES,
  SEED_ICP_ACCOUNTS,
} from '../data/seedData';

const STORAGE_KEY = 'bde_sales_ops_data_v1';

export interface AppStateData {
  version: string;
  lastUpdated: string;
  leads: Lead[];
  biddingOpportunities: BiddingOpportunity[];
  proposals: Proposal[];
  services: ServiceItem[];
  activities: Activity[];
  marketResearch: MarketResearchRecord[];
  networkContacts: NetworkContact[];
  outreachTemplates: OutreachTemplate[];
  icpAccounts: ICPAccountResearch[];
}

export function getDefaultState(): AppStateData {
  return {
    version: '1.0.0',
    lastUpdated: new Date().toISOString(),
    leads: [...SEED_LEADS],
    biddingOpportunities: [...SEED_BIDDING_OPPORTUNITIES],
    proposals: [...SEED_PROPOSALS],
    services: [...SEED_SERVICES],
    activities: [...SEED_ACTIVITIES],
    marketResearch: [...SEED_MARKET_RESEARCH],
    networkContacts: [...SEED_NETWORK_CONTACTS],
    outreachTemplates: [...SEED_OUTREACH_TEMPLATES],
    icpAccounts: [...SEED_ICP_ACCOUNTS],
  };
}

export function loadStoredData(): AppStateData {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getDefaultState();
      saveStoredData(initial);
      return initial;
    }
    const parsed = JSON.parse(raw) as Partial<AppStateData>;
    if (!parsed.leads || !Array.isArray(parsed.leads)) {
      console.warn('Malformed stored state found. Falling back to default demo state.');
      const initial = getDefaultState();
      saveStoredData(initial);
      return initial;
    }
    return {
      version: parsed.version || '1.0.0',
      lastUpdated: parsed.lastUpdated || new Date().toISOString(),
      leads: parsed.leads || [...SEED_LEADS],
      biddingOpportunities: parsed.biddingOpportunities || [...SEED_BIDDING_OPPORTUNITIES],
      proposals: parsed.proposals || [...SEED_PROPOSALS],
      services: parsed.services || [...SEED_SERVICES],
      activities: parsed.activities || [...SEED_ACTIVITIES],
      marketResearch: parsed.marketResearch || [...SEED_MARKET_RESEARCH],
      networkContacts: parsed.networkContacts || [...SEED_NETWORK_CONTACTS],
      outreachTemplates: parsed.outreachTemplates || [...SEED_OUTREACH_TEMPLATES],
      icpAccounts: parsed.icpAccounts || [...SEED_ICP_ACCOUNTS],
    };
  } catch (err) {
    console.error('Error reading localStorage, reverting to defaults:', err);
    const initial = getDefaultState();
    saveStoredData(initial);
    return initial;
  }
}

export function saveStoredData(data: AppStateData): void {
  try {
    const payload = {
      ...data,
      lastUpdated: new Date().toISOString(),
    };
    localStorage.setItem(STORAGE_KEY, JSON.stringify(payload));
  } catch (err) {
    console.error('Failed to write to localStorage:', err);
  }
}

export function resetToDemoData(): AppStateData {
  const defaults = getDefaultState();
  saveStoredData(defaults);
  return defaults;
}

export function getStorageUsage(): { bytes: number; kb: string; recordCount: number } {
  try {
    const raw = localStorage.getItem(STORAGE_KEY) || '';
    const bytes = new Blob([raw]).size;
    const kb = (bytes / 1024).toFixed(1) + ' KB';
    const data = loadStoredData();
    const recordCount =
      data.leads.length +
      data.biddingOpportunities.length +
      data.proposals.length +
      data.services.length +
      data.activities.length +
      data.marketResearch.length +
      data.networkContacts.length;
    return { bytes, kb, recordCount };
  } catch {
    return { bytes: 0, kb: '0 KB', recordCount: 0 };
  }
}

// Download state as JSON
export function exportBackupJSON(data: AppStateData): void {
  const jsonStr = JSON.stringify(data, null, 2);
  const blob = new Blob([jsonStr], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nexora-bde-sales-backup-${new Date().toISOString().slice(0, 10)}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Export Leads to CSV
export function exportLeadsToCSV(leads: Lead[]): void {
  const headers = [
    'Lead ID',
    'Company Name',
    'Website',
    'Industry',
    'Company Size',
    'Country',
    'City',
    'Contact Person',
    'Job Title',
    'Profile URL',
    'Business Email',
    'Phone',
    'Lead Source',
    'Service of Interest',
    'Business Problem',
    'Lead Owner',
    'Lead Status',
    'Priority',
    'Estimated Deal Value ($)',
    'Date Created',
    'Last Contact Date',
    'Next Follow-Up Date',
    'Next Action',
  ];

  const escapeCSV = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = leads.map((l) => [
    escapeCSV(l.id),
    escapeCSV(l.companyName),
    escapeCSV(l.website),
    escapeCSV(l.industry),
    escapeCSV(l.companySize),
    escapeCSV(l.country),
    escapeCSV(l.city),
    escapeCSV(l.contactPerson),
    escapeCSV(l.jobTitle),
    escapeCSV(l.profileUrl),
    escapeCSV(l.email || ''),
    escapeCSV(l.phone || ''),
    escapeCSV(l.source),
    escapeCSV(l.serviceOfInterest),
    escapeCSV(l.businessProblem),
    escapeCSV(l.leadOwner),
    escapeCSV(l.status),
    escapeCSV(l.priority),
    l.estimatedDealValue,
    escapeCSV(l.dateCreated),
    escapeCSV(l.lastContactDate),
    escapeCSV(l.nextFollowUpDate),
    escapeCSV(l.nextAction),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nexora-leads-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}

// Parse imported Leads CSV
export function parseLeadsCSV(csvText: string): { imported: Lead[]; errors: string[] } {
  const lines = csvText.split(/\r?\n/).filter((l) => l.trim().length > 0);
  const errors: string[] = [];
  const imported: Lead[] = [];

  if (lines.length < 2) {
    return { imported: [], errors: ['CSV file is empty or missing data rows.'] };
  }

  // Simple CSV parser supporting quotes
  const parseLine = (text: string): string[] => {
    const results: string[] = [];
    let cur = '';
    let inQuotes = false;
    for (let i = 0; i < text.length; i++) {
      const c = text[i];
      if (c === '"') {
        if (inQuotes && text[i + 1] === '"') {
          cur += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (c === ',' && !inQuotes) {
        results.push(cur);
        cur = '';
      } else {
        cur += c;
      }
    }
    results.push(cur);
    return results;
  };

  const headerLine = parseLine(lines[0]).map((h) => h.trim().toLowerCase());
  const companyIdx = headerLine.findIndex((h) => h.includes('company'));
  const contactIdx = headerLine.findIndex((h) => h.includes('contact') || h.includes('person'));

  if (companyIdx === -1) {
    return { imported: [], errors: ['Could not find "Company Name" column in CSV header.'] };
  }

  for (let i = 1; i < lines.length; i++) {
    const cols = parseLine(lines[i]);
    if (cols.length < 2) continue;

    const companyName = cols[companyIdx]?.trim();
    if (!companyName) {
      errors.push(`Row ${i + 1}: Missing required Company Name.`);
      continue;
    }

    const contactPerson = contactIdx !== -1 && cols[contactIdx]?.trim() ? cols[contactIdx].trim() : 'Business Lead';
    const emailIdx = headerLine.findIndex((h) => h.includes('email'));
    const industryIdx = headerLine.findIndex((h) => h.includes('industry'));
    const serviceIdx = headerLine.findIndex((h) => h.includes('service'));
    const valueIdx = headerLine.findIndex((h) => h.includes('value') || h.includes('deal'));
    const sourceIdx = headerLine.findIndex((h) => h.includes('source'));

    const dealVal = valueIdx !== -1 ? parseFloat(cols[valueIdx].replace(/[^0-9.]/g, '')) || 5000 : 5000;

    const newLead: Lead = {
      id: `lead-import-${Date.now()}-${i}`,
      companyName,
      website: companyName ? `https://${companyName.toLowerCase().replace(/[^a-z0-9]/g, '')}.com` : 'https://linkedin.com',
      industry: (industryIdx !== -1 && cols[industryIdx]?.trim()) || 'Technology & Services',
      companySize: '10-50 employees',
      country: 'International',
      city: 'Global',
      contactPerson,
      jobTitle: 'Key Decision Maker',
      profileUrl: 'https://linkedin.com',
      email: emailIdx !== -1 ? cols[emailIdx]?.trim() : undefined,
      source: (sourceIdx !== -1 && (cols[sourceIdx]?.trim() as any)) || 'Other',
      serviceOfInterest: (serviceIdx !== -1 && cols[serviceIdx]?.trim()) || 'Web Application Development',
      businessProblem: 'Imported prospective client opportunity requiring discovery evaluation.',
      qualificationNotes: 'Imported via CSV batch on ' + new Date().toISOString().slice(0, 10),
      leadOwner: 'Keshav Sood (BDE)',
      status: 'New Lead',
      priority: 'Medium',
      estimatedDealValue: isNaN(dealVal) ? 4500 : dealVal,
      dateCreated: new Date().toISOString().slice(0, 10),
      lastContactDate: new Date().toISOString().slice(0, 10),
      nextFollowUpDate: new Date(Date.now() + 3 * 86400000).toISOString().slice(0, 10),
      nextAction: 'Review imported requirements and initiate initial outreach touchpoint.',
      stageHistory: [
        {
          stage: 'New Lead',
          date: new Date().toISOString().slice(0, 10),
          notes: 'Batch imported from external CSV database.',
        },
      ],
    };

    imported.push(newLead);
  }

  return { imported, errors };
}

// Export Bidding Opportunities to CSV
export function exportBiddingToCSV(bids: BiddingOpportunity[]): void {
  const headers = [
    'Bid ID',
    'Platform',
    'Job Title',
    'Job URL',
    'Client Country',
    'Budget',
    'Proposed Price ($)',
    'Project Type',
    'Fit Score (%)',
    'Status',
    'Deadline',
    'Follow-Up Date',
    'Next Action',
  ];

  const escapeCSV = (val: string | number | undefined | null) => {
    if (val === undefined || val === null) return '""';
    const s = String(val).replace(/"/g, '""');
    return `"${s}"`;
  };

  const rows = bids.map((b) => [
    escapeCSV(b.id),
    escapeCSV(b.platform),
    escapeCSV(b.jobTitle),
    escapeCSV(b.jobUrl),
    escapeCSV(b.clientCountry),
    escapeCSV(b.clientBudget),
    b.proposedPrice,
    escapeCSV(b.projectType),
    b.fitScore,
    escapeCSV(b.status),
    escapeCSV(b.applicationDeadline),
    escapeCSV(b.followUpDate),
    escapeCSV(b.nextAction),
  ]);

  const csvContent = [headers.join(','), ...rows.map((r) => r.join(','))].join('\r\n');
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `nexora-bidding-${new Date().toISOString().slice(0, 10)}.csv`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
