export type PipelineStage =
  | 'New Lead'
  | 'Contacted'
  | 'Qualified'
  | 'Meeting Scheduled'
  | 'Proposal'
  | 'Negotiation'
  | 'Won'
  | 'Lost';

export type LeadSource =
  | 'LinkedIn'
  | 'LinkedIn Sales Navigator'
  | 'Company Website'
  | 'Upwork'
  | 'Freelancer'
  | 'PeoplePerHour'
  | 'Referral'
  | 'Networking'
  | 'Other';

export type Priority = 'Low' | 'Medium' | 'High' | 'Urgent';

export interface StageHistoryItem {
  stage: PipelineStage;
  date: string;
  notes?: string;
}

export interface Lead {
  id: string;
  companyName: string;
  website: string;
  industry: string;
  companySize: string;
  country: string;
  city: string;
  contactPerson: string;
  jobTitle: string;
  profileUrl: string;
  email?: string;
  phone?: string;
  source: LeadSource;
  serviceOfInterest: string;
  businessProblem: string;
  qualificationNotes: string;
  leadOwner: string;
  status: PipelineStage;
  priority: Priority;
  estimatedDealValue: number;
  dateCreated: string;
  lastContactDate: string;
  nextFollowUpDate: string;
  nextAction: string;
  stageHistory: StageHistoryItem[];
}

export type BiddingPlatform = 'Upwork' | 'Freelancer' | 'PeoplePerHour';

export type BiddingStatus =
  | 'Discovered'
  | 'Researching'
  | 'Qualified'
  | 'Proposal Drafted'
  | 'Submitted'
  | 'Client Responded'
  | 'Interview'
  | 'Won'
  | 'Lost'
  | 'Not Pursuing';

export interface BiddingOpportunity {
  id: string;
  platform: BiddingPlatform;
  jobTitle: string;
  jobUrl: string;
  clientDescription: string;
  clientCountry: string;
  requiredSkills: string[];
  clientBudget: string;
  proposedPrice: number;
  projectType: 'Fixed-Price' | 'Hourly';
  dateDiscovered: string;
  applicationDeadline: string;
  fitScore: number; // 0 - 100
  status: BiddingStatus;
  proposalDraftId?: string;
  followUpDate: string;
  notes: string;
  nextAction: string;
}

export interface ServiceItem {
  id: string;
  name: string;
  shortDescription: string;
  idealCustomer: string;
  commonProblems: string[];
  keyCapabilities: string[];
  typicalDeliverables: string[];
  discoveryQuestions: string[];
  differentiators: string[];
  commonObjections: Array<{
    objection: string;
    suggestedResponse: string;
  }>;
  dependenciesAndExclusions: string[];
  priceRangeEstimate: string;
  deliveryTimelineEstimate: string;
}

export type ProposalStatus =
  | 'Draft'
  | 'In Review'
  | 'Submitted'
  | 'Negotiation'
  | 'Accepted'
  | 'Rejected';

export interface ProposalMilestone {
  milestone: string;
  deliverable: string;
  duration: string;
  paymentPercentage: number;
  amount: number;
}

export interface Proposal {
  id: string;
  clientCompany: string;
  contactPerson: string;
  contactEmail?: string;
  clientProblem: string;
  businessObjectives: string[];
  proposedSolution: string;
  serviceId: string;
  serviceName: string;
  scopeOfWork: string[];
  deliverables: string[];
  milestones: ProposalMilestone[];
  timelineSummary: string;
  assumptions: string[];
  exclusions: string[];
  totalEstimatedPrice: number;
  currency: string;
  validityDays: number;
  nextSteps: string[];
  status: ProposalStatus;
  dateCreated: string;
  followUpDate: string;
  relatedLeadId?: string;
  relatedOpportunityId?: string;
  version: string;
  revisionsNotes?: string;
}

export type ActivityType =
  | 'Call'
  | 'Email'
  | 'LinkedIn Message'
  | 'Meeting'
  | 'Research'
  | 'Proposal Prep'
  | 'Follow-up'
  | 'Other';

export interface Activity {
  id: string;
  relatedType: 'Lead' | 'Contact' | 'BiddingOpportunity' | 'General';
  relatedId?: string;
  relatedTitle: string;
  type: ActivityType;
  dateTime: string;
  summary: string;
  outcome: string;
  nextAction: string;
  nextFollowUpDate?: string;
  completed: boolean;
}

export interface MarketResearchRecord {
  id: string;
  targetIndustry: string;
  geography: string;
  targetCustomerSegment: string;
  businessProblem: string;
  potentialServiceOpportunity: string;
  competitorName: string;
  competitorWebsite: string;
  publiclyObservedOffering: string;
  differentiationHypothesis: string;
  evidenceSourceUrl: string;
  researchDate: string;
  notes: string;
  recommendedNextAction: string;
  worksheetAnswers?: {
    targetBusinesses?: string;
    businessProblems?: string;
    currentSolutions?: string;
    competitorOfferings?: string;
    differentiationValue?: string;
    evidenceFound?: string;
    nextStepsToInvestigate?: string;
  };
}

export type RelationshipType =
  | 'Prospect'
  | 'Referral Partner'
  | 'Agency Partner'
  | 'Technology Partner'
  | 'Existing Contact'
  | 'Other';

export interface NetworkContact {
  id: string;
  contactName: string;
  company: string;
  jobTitle: string;
  relationshipType: RelationshipType;
  contactSource: string;
  profileUrl: string;
  email?: string;
  phone?: string;
  industry: string;
  lastInteractionDate: string;
  interactionNotes: string;
  nextRelationshipAction: string;
  nextContactDate: string;
  relationshipStatus: 'Active' | 'Nurturing' | 'Dormant' | 'High Priority';
  linkedLeadId?: string;
}

export interface OutreachTemplate {
  id: string;
  title: string;
  channel: 'LinkedIn' | 'Cold Email' | 'Follow-up' | 'Meeting';
  subject?: string;
  content: string;
  description: string;
  recommendedTouchpoint: string;
}

export interface ICPCriteria {
  id: string;
  label: string;
  weight: number; // e.g., 20
  options: Array<{
    label: string;
    score: number; // percentage of criteria weight
  }>;
}

export interface ICPAccountResearch {
  id: string;
  targetCompany: string;
  targetIndustry: string;
  targetGeography: string;
  companyWebsite: string;
  profileUrl: string;
  decisionMakerRole: string;
  observedBusinessNeed: string;
  relevantService: string;
  researchNotes: string;
  source: 'LinkedIn' | 'LinkedIn Sales Navigator' | 'Company Website';
  qualificationScore: number;
  scoringBreakdown: Array<{ criterion: string; points: number; maxPoints: number; reason: string }>;
  nextOutreachAction: string;
  convertedToLeadId?: string;
}
