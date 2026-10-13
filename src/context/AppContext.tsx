import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode } from 'react';
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
  PipelineStage,
  BiddingStatus,
} from '../types';
import {
  loadStoredData,
  saveStoredData,
  resetToDemoData,
  AppStateData,
} from '../services/storage';

interface ToastMessage {
  id: string;
  message: string;
  type: 'success' | 'info' | 'error';
}

interface AppContextType {
  leads: Lead[];
  biddingOpportunities: BiddingOpportunity[];
  proposals: Proposal[];
  services: ServiceItem[];
  activities: Activity[];
  marketResearch: MarketResearchRecord[];
  networkContacts: NetworkContact[];
  outreachTemplates: OutreachTemplate[];
  icpAccounts: ICPAccountResearch[];
  toasts: ToastMessage[];
  showToast: (message: string, type?: 'success' | 'info' | 'error') => void;
  removeToast: (id: string) => void;

  // Lead actions
  addLead: (lead: Omit<Lead, 'id' | 'dateCreated' | 'stageHistory'>) => Lead;
  updateLead: (lead: Lead) => void;
  deleteLead: (id: string) => void;
  updateLeadStage: (id: string, stage: PipelineStage, notes?: string) => void;
  importLeads: (leads: Lead[]) => void;

  // Bidding actions
  addBiddingOpportunity: (bid: Omit<BiddingOpportunity, 'id' | 'dateDiscovered'>) => BiddingOpportunity;
  updateBiddingOpportunity: (bid: BiddingOpportunity) => void;
  deleteBiddingOpportunity: (id: string) => void;
  updateBiddingStatus: (id: string, status: BiddingStatus) => void;

  // Proposal actions
  addProposal: (proposal: Omit<Proposal, 'id' | 'dateCreated'>) => Proposal;
  updateProposal: (proposal: Proposal) => void;
  deleteProposal: (id: string) => void;
  duplicateProposal: (id: string) => Proposal | null;

  // Service actions
  updateService: (service: ServiceItem) => void;
  addService: (service: ServiceItem) => void;

  // Activity actions
  addActivity: (activity: Omit<Activity, 'id'>) => Activity;
  updateActivity: (activity: Activity) => void;
  deleteActivity: (id: string) => void;
  toggleActivityCompleted: (id: string) => void;

  // Market research actions
  addMarketResearch: (record: Omit<MarketResearchRecord, 'id' | 'researchDate'>) => MarketResearchRecord;
  updateMarketResearch: (record: MarketResearchRecord) => void;
  deleteMarketResearch: (id: string) => void;

  // Contact actions
  addContact: (contact: Omit<NetworkContact, 'id'>) => NetworkContact;
  updateContact: (contact: NetworkContact) => void;
  deleteContact: (id: string) => void;

  // ICP actions
  addICPAccount: (account: Omit<ICPAccountResearch, 'id'>) => ICPAccountResearch;
  updateICPAccount: (account: ICPAccountResearch) => void;
  deleteICPAccount: (id: string) => void;
  convertICPToLead: (icpId: string) => Lead | null;

  // Global actions
  resetData: () => void;
  restoreBackup: (data: AppStateData) => void;

  // Computed metrics
  stats: {
    totalLeads: number;
    newLeads: number;
    qualifiedLeads: number;
    meetingScheduled: number;
    proposalsDrafted: number;
    proposalsSubmitted: number;
    dealsWon: number;
    dealsLost: number;
    pipelineValue: number;
    wonDealValue: number;
    overdueFollowUps: number;
    totalBids: number;
    activeBids: number;
  };
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [data, setData] = useState<AppStateData>(() => loadStoredData());
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  useEffect(() => {
    saveStoredData(data);
  }, [data]);

  const showToast = (message: string, type: 'success' | 'info' | 'error' = 'success') => {
    const id = Date.now().toString() + Math.random().toString(36).substring(2, 6);
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      removeToast(id);
    }, 4000);
  };

  const removeToast = (id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  };

  // Lead actions
  const addLead = (leadInput: Omit<Lead, 'id' | 'dateCreated' | 'stageHistory'>): Lead => {
    const today = new Date().toISOString().slice(0, 10);
    const newLead: Lead = {
      ...leadInput,
      id: `lead-${Date.now()}`,
      dateCreated: today,
      stageHistory: [
        {
          stage: leadInput.status,
          date: today,
          notes: 'Lead record created.',
        },
      ],
    };
    setData((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
    }));
    showToast(`Lead "${newLead.companyName}" added successfully.`);
    return newLead;
  };

  const updateLead = (updatedLead: Lead) => {
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((l) => (l.id === updatedLead.id ? updatedLead : l)),
    }));
    showToast(`Lead "${updatedLead.companyName}" updated.`);
  };

  const deleteLead = (id: string) => {
    const target = data.leads.find((l) => l.id === id);
    setData((prev) => ({
      ...prev,
      leads: prev.leads.filter((l) => l.id !== id),
    }));
    showToast(`Lead "${target?.companyName || id}" deleted.`, 'info');
  };

  const updateLeadStage = (id: string, newStage: PipelineStage, notes?: string) => {
    const today = new Date().toISOString().slice(0, 10);
    setData((prev) => ({
      ...prev,
      leads: prev.leads.map((lead) => {
        if (lead.id === id) {
          const updatedHistory = [
            ...lead.stageHistory,
            {
              stage: newStage,
              date: today,
              notes: notes || `Moved to ${newStage}`,
            },
          ];
          return {
            ...lead,
            status: newStage,
            lastContactDate: today,
            stageHistory: updatedHistory,
          };
        }
        return lead;
      }),
    }));
    showToast(`Lead stage updated to "${newStage}".`);
  };

  const importLeads = (newLeads: Lead[]) => {
    setData((prev) => ({
      ...prev,
      leads: [...newLeads, ...prev.leads],
    }));
    showToast(`Imported ${newLeads.length} leads successfully.`);
  };

  // Bidding actions
  const addBiddingOpportunity = (
    bidInput: Omit<BiddingOpportunity, 'id' | 'dateDiscovered'>
  ): BiddingOpportunity => {
    const newBid: BiddingOpportunity = {
      ...bidInput,
      id: `bid-${Date.now()}`,
      dateDiscovered: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => ({
      ...prev,
      biddingOpportunities: [newBid, ...prev.biddingOpportunities],
    }));
    showToast(`Bidding opportunity "${newBid.jobTitle.slice(0, 30)}..." tracked.`);
    return newBid;
  };

  const updateBiddingOpportunity = (bid: BiddingOpportunity) => {
    setData((prev) => ({
      ...prev,
      biddingOpportunities: prev.biddingOpportunities.map((b) => (b.id === bid.id ? bid : b)),
    }));
    showToast('Opportunity updated.');
  };

  const deleteBiddingOpportunity = (id: string) => {
    setData((prev) => ({
      ...prev,
      biddingOpportunities: prev.biddingOpportunities.filter((b) => b.id !== id),
    }));
    showToast('Bidding opportunity removed.', 'info');
  };

  const updateBiddingStatus = (id: string, status: BiddingStatus) => {
    setData((prev) => ({
      ...prev,
      biddingOpportunities: prev.biddingOpportunities.map((b) =>
        b.id === id ? { ...b, status } : b
      ),
    }));
    showToast(`Opportunity marked as ${status}.`);
  };

  // Proposal actions
  const addProposal = (propInput: Omit<Proposal, 'id' | 'dateCreated'>): Proposal => {
    const newProp: Proposal = {
      ...propInput,
      id: `prop-${Date.now()}`,
      dateCreated: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => ({
      ...prev,
      proposals: [newProp, ...prev.proposals],
    }));
    showToast(`Proposal for ${newProp.clientCompany} created.`);
    return newProp;
  };

  const updateProposal = (prop: Proposal) => {
    setData((prev) => ({
      ...prev,
      proposals: prev.proposals.map((p) => (p.id === prop.id ? prop : p)),
    }));
    showToast(`Proposal "${prop.id}" saved.`);
  };

  const deleteProposal = (id: string) => {
    setData((prev) => ({
      ...prev,
      proposals: prev.proposals.filter((p) => p.id !== id),
    }));
    showToast('Proposal deleted.', 'info');
  };

  const duplicateProposal = (id: string): Proposal | null => {
    const target = data.proposals.find((p) => p.id === id);
    if (!target) return null;
    const duplicated: Proposal = {
      ...target,
      id: `prop-${Date.now()}`,
      clientCompany: `${target.clientCompany} (Copy)`,
      status: 'Draft',
      dateCreated: new Date().toISOString().slice(0, 10),
      version: '1.0',
      revisionsNotes: `Duplicated from ${target.id}`,
    };
    setData((prev) => ({
      ...prev,
      proposals: [duplicated, ...prev.proposals],
    }));
    showToast(`Proposal duplicated as ${duplicated.id}.`);
    return duplicated;
  };

  // Service actions
  const updateService = (service: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: prev.services.map((s) => (s.id === service.id ? service : s)),
    }));
    showToast(`Service "${service.name}" updated.`);
  };

  const addService = (service: ServiceItem) => {
    setData((prev) => ({
      ...prev,
      services: [...prev.services, service],
    }));
    showToast(`Service "${service.name}" added to catalogue.`);
  };

  // Activity actions
  const addActivity = (actInput: Omit<Activity, 'id'>): Activity => {
    const newAct: Activity = {
      ...actInput,
      id: `act-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      activities: [newAct, ...prev.activities],
    }));
    showToast(`Activity "${newAct.type}" logged.`);
    return newAct;
  };

  const updateActivity = (activity: Activity) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.map((a) => (a.id === activity.id ? activity : a)),
    }));
    showToast('Activity updated.');
  };

  const deleteActivity = (id: string) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.filter((a) => a.id !== id),
    }));
    showToast('Activity removed.', 'info');
  };

  const toggleActivityCompleted = (id: string) => {
    setData((prev) => ({
      ...prev,
      activities: prev.activities.map((a) =>
        a.id === id ? { ...a, completed: !a.completed } : a
      ),
    }));
  };

  // Market research actions
  const addMarketResearch = (
    mrInput: Omit<MarketResearchRecord, 'id' | 'researchDate'>
  ): MarketResearchRecord => {
    const newMR: MarketResearchRecord = {
      ...mrInput,
      id: `mr-${Date.now()}`,
      researchDate: new Date().toISOString().slice(0, 10),
    };
    setData((prev) => ({
      ...prev,
      marketResearch: [newMR, ...prev.marketResearch],
    }));
    showToast(`Research record for "${newMR.targetIndustry}" saved.`);
    return newMR;
  };

  const updateMarketResearch = (record: MarketResearchRecord) => {
    setData((prev) => ({
      ...prev,
      marketResearch: prev.marketResearch.map((m) => (m.id === record.id ? record : m)),
    }));
    showToast('Market research record updated.');
  };

  const deleteMarketResearch = (id: string) => {
    setData((prev) => ({
      ...prev,
      marketResearch: prev.marketResearch.filter((m) => m.id !== id),
    }));
    showToast('Market research record removed.', 'info');
  };

  // Contact actions
  const addContact = (contactInput: Omit<NetworkContact, 'id'>): NetworkContact => {
    const newContact: NetworkContact = {
      ...contactInput,
      id: `con-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      networkContacts: [newContact, ...prev.networkContacts],
    }));
    showToast(`Contact "${newContact.contactName}" added.`);
    return newContact;
  };

  const updateContact = (contact: NetworkContact) => {
    setData((prev) => ({
      ...prev,
      networkContacts: prev.networkContacts.map((c) => (c.id === contact.id ? contact : c)),
    }));
    showToast(`Contact "${contact.contactName}" updated.`);
  };

  const deleteContact = (id: string) => {
    setData((prev) => ({
      ...prev,
      networkContacts: prev.networkContacts.filter((c) => c.id !== id),
    }));
    showToast('Contact removed.', 'info');
  };

  // ICP actions
  const addICPAccount = (accInput: Omit<ICPAccountResearch, 'id'>): ICPAccountResearch => {
    const newAcc: ICPAccountResearch = {
      ...accInput,
      id: `icp-${Date.now()}`,
    };
    setData((prev) => ({
      ...prev,
      icpAccounts: [newAcc, ...prev.icpAccounts],
    }));
    showToast(`Prospecting account "${newAcc.targetCompany}" recorded.`);
    return newAcc;
  };

  const updateICPAccount = (account: ICPAccountResearch) => {
    setData((prev) => ({
      ...prev,
      icpAccounts: prev.icpAccounts.map((a) => (a.id === account.id ? account : a)),
    }));
    showToast('Prospecting account updated.');
  };

  const deleteICPAccount = (id: string) => {
    setData((prev) => ({
      ...prev,
      icpAccounts: prev.icpAccounts.filter((a) => a.id !== id),
    }));
    showToast('Prospecting record deleted.', 'info');
  };

  const convertICPToLead = (icpId: string): Lead | null => {
    const target = data.icpAccounts.find((a) => a.id === icpId);
    if (!target) return null;
    const today = new Date().toISOString().slice(0, 10);
    const newLead: Lead = {
      id: `lead-conv-${Date.now()}`,
      companyName: target.targetCompany,
      website: target.companyWebsite,
      industry: target.targetIndustry,
      companySize: '25-100 employees',
      country: target.targetGeography,
      city: 'Target Region',
      contactPerson: 'Decision Maker',
      jobTitle: target.decisionMakerRole,
      profileUrl: target.profileUrl,
      source: target.source === 'LinkedIn Sales Navigator' ? 'LinkedIn Sales Navigator' : 'LinkedIn',
      serviceOfInterest: target.relevantService,
      businessProblem: target.observedBusinessNeed,
      qualificationNotes: `Converted from ICP research (Score: ${target.qualificationScore}/100). ${target.researchNotes}`,
      leadOwner: 'Keshav Sood (BDE)',
      status: 'Qualified',
      priority: target.qualificationScore >= 85 ? 'High' : 'Medium',
      estimatedDealValue: 7500,
      dateCreated: today,
      lastContactDate: today,
      nextFollowUpDate: new Date(Date.now() + 2 * 86400000).toISOString().slice(0, 10),
      nextAction: target.nextOutreachAction,
      stageHistory: [
        {
          stage: 'Qualified',
          date: today,
          notes: `Converted from Prospecting Workspace with score ${target.qualificationScore}/100.`,
        },
      ],
    };

    setData((prev) => ({
      ...prev,
      leads: [newLead, ...prev.leads],
      icpAccounts: prev.icpAccounts.map((a) =>
        a.id === icpId ? { ...a, convertedToLeadId: newLead.id } : a
      ),
    }));
    showToast(`Converted "${target.targetCompany}" into qualified CRM lead!`);
    return newLead;
  };

  // Global actions
  const resetData = () => {
    const defaults = resetToDemoData();
    setData(defaults);
    showToast('Reset all data to default fictional demonstration dataset.', 'info');
  };

  const restoreBackup = (backupData: AppStateData) => {
    setData(backupData);
    showToast('Workspace backup successfully restored.');
  };

  // Computed metrics
  const stats = useMemo(() => {
    const todayStr = new Date().toISOString().slice(0, 10);

    const activeStages: PipelineStage[] = [
      'New Lead',
      'Contacted',
      'Qualified',
      'Meeting Scheduled',
      'Proposal',
      'Negotiation',
    ];

    const pipelineVal = data.leads
      .filter((l) => activeStages.includes(l.status))
      .reduce((sum, l) => sum + (l.estimatedDealValue || 0), 0);

    const wonVal = data.leads
      .filter((l) => l.status === 'Won')
      .reduce((sum, l) => sum + (l.estimatedDealValue || 0), 0);

    const overdueCount = data.leads.filter(
      (l) =>
        l.status !== 'Won' &&
        l.status !== 'Lost' &&
        l.nextFollowUpDate &&
        l.nextFollowUpDate <= todayStr
    ).length;

    const activeBidsCount = data.biddingOpportunities.filter(
      (b) => !['Won', 'Lost', 'Not Pursuing'].includes(b.status)
    ).length;

    return {
      totalLeads: data.leads.length,
      newLeads: data.leads.filter((l) => l.status === 'New Lead').length,
      qualifiedLeads: data.leads.filter((l) => l.status === 'Qualified').length,
      meetingScheduled: data.leads.filter((l) => l.status === 'Meeting Scheduled').length,
      proposalsDrafted: data.proposals.filter((p) => p.status === 'Draft').length,
      proposalsSubmitted: data.proposals.filter(
        (p) => p.status === 'Submitted' || p.status === 'In Review' || p.status === 'Negotiation'
      ).length,
      dealsWon: data.leads.filter((l) => l.status === 'Won').length,
      dealsLost: data.leads.filter((l) => l.status === 'Lost').length,
      pipelineValue: pipelineVal,
      wonDealValue: wonVal,
      overdueFollowUps: overdueCount,
      totalBids: data.biddingOpportunities.length,
      activeBids: activeBidsCount,
    };
  }, [data]);

  return (
    <AppContext.Provider
      value={{
        ...data,
        toasts,
        showToast,
        removeToast,
        addLead,
        updateLead,
        deleteLead,
        updateLeadStage,
        importLeads,
        addBiddingOpportunity,
        updateBiddingOpportunity,
        deleteBiddingOpportunity,
        updateBiddingStatus,
        addProposal,
        updateProposal,
        deleteProposal,
        duplicateProposal,
        updateService,
        addService,
        addActivity,
        updateActivity,
        deleteActivity,
        toggleActivityCompleted,
        addMarketResearch,
        updateMarketResearch,
        deleteMarketResearch,
        addContact,
        updateContact,
        deleteContact,
        addICPAccount,
        updateICPAccount,
        deleteICPAccount,
        convertICPToLead,
        resetData,
        restoreBackup,
        stats,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
};
