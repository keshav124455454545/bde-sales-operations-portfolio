import {
  Lead,
  BiddingOpportunity,
  ServiceItem,
  Proposal,
  Activity,
  MarketResearchRecord,
  NetworkContact,
  OutreachTemplate,
  ICPAccountResearch,
} from '../types';

export const SEED_SERVICES: ServiceItem[] = [
  {
    id: 'srv-web-dev',
    name: 'Website Development',
    shortDescription: 'Modern, high-converting responsive websites built on Next.js, WordPress Headless, or custom React architectures.',
    idealCustomer: 'Mid-market B2B companies, healthcare clinics, legal firms, and funded startups seeking lead generation and brand authority.',
    commonProblems: [
      'Slow page load speeds hurting SEO and conversion rates',
      'Outdated UI unaligned with modern customer expectations',
      'Non-responsive layout causing poor mobile conversion',
      'Difficult CMS workflows preventing marketing teams from publishing content'
    ],
    keyCapabilities: [
      'Mobile-first responsive design with Tailwind CSS',
      'Headless CMS integration (Strapi, Sanity, Contentful)',
      'Core Web Vitals optimization (>90 Lighthouse scores)',
      'Technical SEO and schema markup implementation',
      'Interactive ROI calculators and lead-capture forms'
    ],
    typicalDeliverables: [
      'UI/UX wireframes and high-fidelity Figma prototypes',
      'Custom frontend codebase with automated CI/CD pipeline',
      'Content management system configured with custom roles',
      'Analytics and conversion tracking (GA4 + GTM setup)',
      '30-day post-launch warranty and administrator documentation'
    ],
    discoveryQuestions: [
      'What is your current website conversion rate, and what is your monthly visitor target?',
      'Which specific competitors do you consider benchmarks in terms of brand authority?',
      'Who on your internal team will be publishing updates, and what CMS do they prefer?',
      'Are there existing integrations (CRM, email marketing, ERP) that the new site must support?'
    ],
    differentiators: [
      'Lighthouse Performance Guarantee: minimum 90+ score across desktop and mobile',
      'Integrated B2B lead capture architecture tailored for sales teams',
      'Mohali-based dedicated sprint team with daily asynchronous video updates'
    ],
    commonObjections: [
      {
        objection: 'Why not just use a low-cost $50 WordPress theme?',
        suggestedResponse: 'Off-the-shelf themes carry bloatware, vulnerable plugins, and poor mobile performance that hurts search rankings. A tailored headless or optimized architecture loads in under 1.2s, is secure, and converts 2–3x higher.'
      },
      {
        objection: 'Our in-house marketing intern can build something on Wix/Webflow.',
        suggestedResponse: 'Webflow is great for basic landing pages, but as you scale, custom CRM integrations, complex routing, dynamic calculators, and international multi-lingual SEO require engineering rigor.'
      }
    ],
    dependenciesAndExclusions: [
      'Client must provide high-res brand assets and final copy (copywriting available as add-on)',
      'Third-party software licenses (hosting, domain, CRM) billed directly to client'
    ],
    priceRangeEstimate: '$3,500 – $8,500 (Fixed Scope)',
    deliveryTimelineEstimate: '3 to 6 weeks'
  },
  {
    id: 'srv-webapp-dev',
    name: 'Web Application Development',
    shortDescription: 'Scalable, secure custom web applications and client portals with React, Node.js/Python, and cloud infrastructure.',
    idealCustomer: 'Logistics providers, fintech startups, property management firms, and healthcare service groups requiring custom operational portals.',
    commonProblems: [
      'Reliance on fragmented spreadsheets causing data loss and manual bottlenecks',
      'Lack of self-service customer portals increasing customer service overhead',
      'Security risks associated with unencrypted data handling and poor access control',
      'Legacy software unable to scale with growing transaction volume'
    ],
    keyCapabilities: [
      'Role-based access control (RBAC) and OAuth2 / SSO authentication',
      'High-throughput REST and GraphQL backend services',
      'Real-time data feeds via WebSockets',
      'Automated PDF invoice/document generation',
      'Containerized Docker microservices deployable on AWS/GCP'
    ],
    typicalDeliverables: [
      'Architecture design document (ADD) and entity-relationship diagrams (ERD)',
      'Responsive React/TypeScript application with protected routes',
      'Node.js/Express or Python FastAPI microservice architecture',
      'PostgreSQL/MongoDB cloud database cluster setup',
      'Full test suite (Unit + End-to-End Cypress tests) and deployment runbook'
    ],
    discoveryQuestions: [
      'How many concurrent users and transactions do you anticipate in year one?',
      'What user roles exist (e.g., Super Admin, Manager, Client, Auditor), and what permissions vary?',
      'Are there strict data residency or compliance guidelines (HIPAA, GDPR, SOC2)?',
      'What existing back-office databases or ERPs need bidirectional synchronization?'
    ],
    differentiators: [
      'Modular clean architecture ensuring the code can be easily inherited by internal teams',
      'Comprehensive automated test coverage minimizing production defects',
      'Flexible sprint-based billing with full IP ownership transferred on each milestone'
    ],
    commonObjections: [
      {
        objection: 'Can we build this faster with low-code tools like Bubble?',
        suggestedResponse: 'Low-code platforms are great for quick MVPs, but when user volume grows or you require strict data ownership, custom compliance, and proprietary algorithms, platform lock-in and pricing spikes become major liabilities.'
      }
    ],
    dependenciesAndExclusions: [
      'Production cloud hosting fees (AWS/Azure) are direct client subscriptions',
      'Client stakeholder required for bi-weekly sprint review sign-offs'
    ],
    priceRangeEstimate: '$8,000 – $22,000 (Milestone-based)',
    deliveryTimelineEstimate: '8 to 14 weeks'
  },
  {
    id: 'srv-saas-dev',
    name: 'SaaS Product Development',
    shortDescription: 'End-to-end multi-tenant SaaS development from product discovery through MVP launch and recurring billing.',
    idealCustomer: 'Bootstrapped founders and corporate venture teams launching recurring B2B software solutions.',
    commonProblems: [
      'High burn rate attempting to recruit an expensive in-house engineering team prematurely',
      'Architectural mistakes in multi-tenant data isolation and scaling',
      'Complex subscription billing and tax compliance headaches (Stripe Billing/Paddle)',
      'Slow speed-to-market risking competitor preemption'
    ],
    keyCapabilities: [
      'Multi-tenant architecture with tenant-level data segregation',
      'Stripe Billing / Lemon Squeezy integration for tiered subscriptions and usage metering',
      'Customer onboarding flow with automated email drip triggers',
      'In-app analytics, telemetry, and customer health scoring',
      'Admin supervisory dashboard with MRR, churn, and tenant usage metrics'
    ],
    typicalDeliverables: [
      'MVP scope definition and Product Requirements Document (PRD)',
      'Interactive Figma design system and clickable prototype',
      'Production-ready SaaS codebase with automated billing logic',
      'Self-serve workspace signup and invitation system',
      'Infrastructure as Code (IaC) Terraform scripts on AWS'
    ],
    discoveryQuestions: [
      'What is your target pricing model (per-seat, tiered flat rate, usage-based)?',
      'What is the core "aha moment" in the product that delivers immediate value to the user?',
      'What is your planned MVP launch date, and what is the absolute non-negotiable feature set?',
      'Do you plan to raise institutional capital post-launch requiring clean technical due diligence?'
    ],
    differentiators: [
      'Accelerated SaaS Boilerplate framework cutting initial MVP time-to-market by 40%',
      'Founder-friendly sprint structure with dedicated Product Architect and Lead Developer',
      'Zero equity claim—100% intellectual property ownership from day one'
    ],
    commonObjections: [
      {
        objection: 'How do we know the code will pass investor technical due diligence?',
        suggestedResponse: 'We adhere to 12-factor app standards, TypeScript strict typing, ESLint rules, automated GitHub Actions pipelines, and structured architectural documentation specifically created for investor reviews.'
      }
    ],
    dependenciesAndExclusions: [
      'Third-party transactional email (SendGrid) and billing accounts (Stripe) owned by client',
      'Domain registration and marketing landing pages separate from core application'
    ],
    priceRangeEstimate: '$14,000 – $35,000',
    deliveryTimelineEstimate: '10 to 18 weeks'
  },
  {
    id: 'srv-powerbi',
    name: 'Power BI Dashboards & Business Intelligence',
    shortDescription: 'Enterprise Power BI dashboards, automated ETL data pipelines, and KPI scorecards transforming siloed data into executive decisions.',
    idealCustomer: 'CFOs, Sales Directors, and Operations Heads in manufacturing, logistics, retail, and healthcare with fragmented data sources.',
    commonProblems: [
      'Executive teams spending 15+ hours weekly manually collating Excel sheets',
      'Discrepant metrics across departments leading to conflicting operational decisions',
      'Lack of real-time visibility into sales pipeline velocity and inventory aging',
      'Slow report rendering and complex data refresh failures'
    ],
    keyCapabilities: [
      'Automated ETL pipelines via Azure Data Factory or Python scripts',
      'Complex DAX modeling for year-over-year, margin, and cohort analytics',
      'Role-based row-level security (RLS) ensuring managers only see their department data',
      'Automated scheduled data refresh and email alert subscriptions',
      'Mobile-responsive layout optimized for iPad and smartphone executives'
    ],
    typicalDeliverables: [
      'Consolidated Star-Schema Data Model in Power BI Desktop',
      'Executive KPI Dashboard with interactive slicers and drill-through pages',
      'Operational detail reports with export-to-Excel guardrails',
      'Data Dictionary documenting metric calculations and DAX formulas',
      'Admin training session recording and user guide manual'
    ],
    discoveryQuestions: [
      'Where does your primary data live currently (SQL Server, ERP, CRM, QuickBooks, Excel)?',
      'How frequently do key stakeholders need the dashboard data refreshed?',
      'What are the 3 to 5 critical decisions you struggle to make without manual collation?',
      'Do you have existing Power BI Pro or Premium capacities deployed?'
    ],
    differentiators: [
      'Certified Microsoft Power BI Specialists with deep finance and supply chain acumen',
      'Rapid 2-week Discovery-to-Prototype turnaround',
      'Proven DAX optimization eliminating slow visual loading'
    ],
    commonObjections: [
      {
        objection: 'Our team already knows Excel; do we really need Power BI?',
        suggestedResponse: 'Excel requires manual updates every week, is prone to formula corruption, and risks sensitive data leakage. Power BI updates automatically every morning, maintains audit trails, and provides interactive mobile access.'
      }
    ],
    dependenciesAndExclusions: [
      'Client must provide read-only database credentials or sanitized sample datasets',
      'Power BI Pro licenses ($10/user/mo) provided by client tenant'
    ],
    priceRangeEstimate: '$3,000 – $9,500',
    deliveryTimelineEstimate: '2 to 5 weeks'
  },
  {
    id: 'srv-ai-chatbot',
    name: 'AI Chatbot Development',
    shortDescription: 'Custom Retrieval-Augmented Generation (RAG) conversational AI agents trained on proprietary company knowledge bases.',
    idealCustomer: 'E-commerce brands, SaaS customer support teams, legal practices, and real estate agencies overwhelmed with repetitive inquiries.',
    commonProblems: [
      'Support teams overwhelmed with repetitive Tier-1 questions during off-hours',
      'Slow lead response times (>4 hours) resulting in lost prospective sales',
      'Customer support staffing costs growing linearly with transaction volume',
      'Generic rule-based chatbots frustrating users with robotic dead-ends'
    ],
    keyCapabilities: [
      'RAG pipeline utilizing vector databases (Pinecone, ChromaDB, PGVector)',
      'Hallucination guardrails and strict prompt boundary enforcement',
      'Seamless human agent escalation with chat transcripts',
      'Multi-channel deployment (Website widget, WhatsApp Business, Slack, Zendesk)',
      'Real-time lead qualification with CRM webhook forwarding'
    ],
    typicalDeliverables: [
      'Vectorized knowledge base ingestion from company PDFs, FAQs, and help docs',
      'Customized embeddable chat widget matching client brand typography and colors',
      'Admin analytics dashboard monitoring conversation volume, sentiment, and resolution rate',
      'Human-in-the-loop escalation webhook integration',
      'Model performance monitoring and continuous tuning guide'
    ],
    discoveryQuestions: [
      'What are the top 10 most common customer inquiries your staff answers daily?',
      'In what format is your support knowledge base currently stored (Zendesk, Notion, PDFs)?',
      'What system should receive qualified leads generated during the conversation?',
      'What are the critical guardrails (topics the bot must NEVER provide opinions on)?'
    ],
    differentiators: [
      'Zero-hallucination guarantee: bot only answers from verified knowledge documents',
      'Instant human handoff trigger when sentiment drops or complex inquiries arise',
      'Compliance-focused: data is not used for public model training'
    ],
    commonObjections: [
      {
        objection: 'What if the AI hallucinates and gives wrong pricing or legal advice?',
        suggestedResponse: 'We implement strict RAG architecture with system prompts that enforce: if information is not found in the verified context documents, the bot gracefully offers human escalation rather than guessing.'
      }
    ],
    dependenciesAndExclusions: [
      'Client supplies clean source documents (PDFs, URLs, policies)',
      'OpenAI / Anthropic API token costs billed directly via client API key'
    ],
    priceRangeEstimate: '$4,500 – $12,000',
    deliveryTimelineEstimate: '3 to 6 weeks'
  },
  {
    id: 'srv-automation',
    name: 'Business Process Automation',
    shortDescription: 'Workflow automation and RPA connecting cloud software, parsing emails/documents, and removing repetitive administrative tasks.',
    idealCustomer: 'Operations managers, accounting departments, and recruitment agencies spending hours on manual data re-entry.',
    commonProblems: [
      'Manual copy-pasting between emails, spreadsheets, and accounting software',
      'Delays in processing inbound customer purchase orders or invoices',
      'Human data-entry errors leading to billing discrepancies',
      'Lack of automated notifications when milestones or contract renewals approach'
    ],
    keyCapabilities: [
      'Enterprise Make.com, n8n, and Zapier orchestration',
      'OCR and AI document parsing for invoices, receipts, and contracts',
      'Automated multi-step approval workflows via Slack / Microsoft Teams',
      'Error alerting with automatic retry queues and fallback notifications',
      'Database synchronization across legacy on-premise and modern cloud tools'
    ],
    typicalDeliverables: [
      'Workflow process map (Before vs After state)',
      'Configured production automation pipelines with error-handling logic',
      'Custom webhook listeners and data transformation scripts',
      'Admin monitoring dashboard and failure notification triggers',
      'Comprehensive standard operating procedure (SOP) documentation'
    ],
    discoveryQuestions: [
      'Which daily manual process consumes the most team hours right now?',
      'What are the exact triggers and end states for that process?',
      'What applications are involved, and do you have admin API access?',
      'What is the estimated cost of human errors occurring in this workflow today?'
    ],
    differentiators: [
      'Specialists in both no-code tools (Make/n8n) and custom serverless Python scripts',
      'Fail-safe architecture with dead-letter queues preventing data loss',
      'Measurable ROI: typically saving 20–40 operational hours per week within 30 days'
    ],
    commonObjections: [
      {
        objection: 'Won’t automations break whenever an app updates its interface?',
        suggestedResponse: 'We build on official REST APIs and webhook payloads rather than fragile browser screen scrapers, ensuring long-term resilience, plus automated alerts if an API token expires.'
      }
    ],
    dependenciesAndExclusions: [
      'Client provides API credentials and webhook permissions for target software',
      'Make.com or n8n cloud hosting subscription costs are client responsibilities'
    ],
    priceRangeEstimate: '$2,500 – $7,500',
    deliveryTimelineEstimate: '2 to 4 weeks'
  },
  {
    id: 'srv-api-integration',
    name: 'API Integration',
    shortDescription: 'Reliable custom REST/GraphQL middleware, webhooks, and third-party connector pipelines connecting disparate enterprise tools.',
    idealCustomer: 'Companies struggling with disconnected ERPs, payment gateways, custom databases, and legacy inventory systems.',
    commonProblems: [
      'Siloed systems requiring duplicate data entry across platforms',
      'Lack of real-time inventory synchronization leading to overselling',
      'Rate-limiting and data format mismatches crashing legacy interfaces',
      'Absence of unified audit logging for failed transactions'
    ],
    keyCapabilities: [
      'Custom microservice middleware in Node.js/TypeScript or Python',
      'Rate-limiting, queuing, and exponential backoff retry algorithms',
      'Bidirectional schema mapping and data transformation',
      'Secure token lifecycle management (OAuth 2.0 refresh automation)',
      'Detailed transaction logging and telemetry'
    ],
    typicalDeliverables: [
      'Interface Control Document (ICD) mapping all source-to-target fields',
      'Deployed serverless or containerized integration middleware',
      'Automated health check endpoints and alert integrations',
      'Postman collection for regression testing and developer documentation',
      '30-day monitoring and support warranty'
    ],
    discoveryQuestions: [
      'Which systems must communicate, and what is the direction of data flow?',
      'What is the expected throughput (requests per minute/day)?',
      'Do both platforms provide documented REST/GraphQL APIs or webhook support?',
      'What happens currently if a sync fails, and what is the business impact?'
    ],
    differentiators: [
      'High-resilience architecture that guarantees zero duplicate entries or dropped events',
      'Complete OpenAPI/Swagger specifications provided upon completion',
      'Rapid troubleshooting with standardized logging'
    ],
    commonObjections: [
      {
        objection: 'Why not just use an out-of-the-box Zapier trigger?',
        suggestedResponse: 'Native connectors work for trivial one-step tasks, but when you need complex data transformations, deduplication, custom payload validation, or high transactional volume, native tools hit severe rate limits and lack retry safety.'
      }
    ],
    dependenciesAndExclusions: [
      'Client provides sandbox environments and API access keys for both systems',
      'Cloud compute hosting (AWS Lambda/Cloudflare Workers) billed directly to client'
    ],
    priceRangeEstimate: '$3,500 – $10,000',
    deliveryTimelineEstimate: '3 to 5 weeks'
  },
  {
    id: 'srv-crm-implementation',
    name: 'CRM Implementation',
    shortDescription: 'HubSpot, Zoho, and Salesforce setup, pipeline configuration, data migration, and sales team workflow enablement.',
    idealCustomer: 'Growing B2B service firms, IT consultancies, and manufacturing sales teams upgrading from chaotic spreadsheets to a disciplined CRM.',
    commonProblems: [
      'Sales reps not logging calls or notes due to overly complex CRM layouts',
      'Lost sales opportunities due to lack of automated follow-up reminders',
      'Messy historical data with duplicate records and missing email addresses',
      'Management having no visibility into pipeline velocity or rep activity'
    ],
    keyCapabilities: [
      'Custom deal pipeline architecture with required fields per stage',
      'Lead deduplication, data cleansing, and CSV migration from legacy tools',
      'Automated email sequences, deal stage triggers, and task assignments',
      'Custom properties, views, and executive dashboard configuration',
      'Interactive role-based team training sessions and recorded walkthroughs'
    ],
    typicalDeliverables: [
      'CRM Blueprint Document defining pipeline stages, exit criteria, and properties',
      'Cleaned and verified data migration of existing contacts and deals',
      'Configured sales automation rules (welcome email, stale deal alerts)',
      'Sales Rep Quick-Reference Playbook (PDF)',
      'Live 2-hour staff training session with recorded Q&A'
    ],
    discoveryQuestions: [
      'Which CRM platform have you selected (HubSpot, Zoho, Salesforce, Pipedrive)?',
      'How many sales reps and managers will be using the system actively?',
      'What are the typical stages a prospect goes through from first touch to closed contract?',
      'What data sources (spreadsheets, Outlook, old CRM) need to be imported?'
    ],
    differentiators: [
      'Sales-first approach: configured to minimize data-entry friction for reps',
      'Proven migration methodology ensuring zero lost contacts or deal history',
      'Post-implementation adoption coaching ensuring team actually uses the tool'
    ],
    commonObjections: [
      {
        objection: 'We tried CRM before and nobody on the sales team updated it.',
        suggestedResponse: 'CRMs fail when they are over-engineered with 40 mandatory fields. We design lightweight, high-utility pipelines with automated activity logging from Gmail/Outlook, requiring less than 2 minutes of rep maintenance per deal.'
      }
    ],
    dependenciesAndExclusions: [
      'Client purchases appropriate CRM software licensing directly',
      'Client provides raw historical customer data files for scrubbing'
    ],
    priceRangeEstimate: '$3,000 – $8,500',
    deliveryTimelineEstimate: '2 to 5 weeks'
  }
];

export const SEED_LEADS: Lead[] = [
  {
    id: 'lead-101',
    companyName: 'Apex Health Systems',
    website: 'https://apexhealth-example.com',
    industry: 'Healthcare & Telemedicine',
    companySize: '50-100 employees',
    country: 'United States',
    city: 'Austin, TX',
    contactPerson: 'Dr. Marcus Vance',
    jobTitle: 'Chief Medical Officer & Co-Founder',
    profileUrl: 'https://linkedin.com/in/marcus-vance-fictional',
    email: 'm.vance@apexhealth-example.com',
    phone: '+1 (512) 555-0142',
    source: 'LinkedIn Sales Navigator',
    serviceOfInterest: 'AI Chatbot Development',
    businessProblem: 'Patient support staff overwhelmed by 600+ repetitive daily scheduling and triage questions; seeking HIPAA-compliant 24/7 conversational assistant.',
    qualificationNotes: 'High intent. Budget approved for Q4. Met ICP criteria with score 92/100. Need SOC2/HIPAA compliance assurances.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Proposal',
    priority: 'High',
    estimatedDealValue: 9500,
    dateCreated: '2026-09-12',
    lastContactDate: '2026-10-10',
    nextFollowUpDate: '2026-10-16',
    nextAction: 'Deliver revised milestone breakdown for AI triage workflow and schedule technical review call.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-09-12', notes: 'Identified via Sales Navigator filter: CMOs in Austin health tech.' },
      { stage: 'Contacted', date: '2026-09-15', notes: 'Sent personalized LinkedIn message regarding patient triage automation.' },
      { stage: 'Qualified', date: '2026-09-22', notes: 'Discovery call completed. Confirmed $10k budget and 6-week timeline.' },
      { stage: 'Proposal', date: '2026-10-05', notes: 'Submitted formal proposal PROP-2026-03 for AI Patient Support Assistant.' }
    ]
  },
  {
    id: 'lead-102',
    companyName: 'Nordic Logistics AS',
    website: 'https://nordiclogistics-example.no',
    industry: 'Logistics & Supply Chain',
    companySize: '100-250 employees',
    country: 'Norway',
    city: 'Oslo',
    contactPerson: 'Elinor Lindqvist',
    jobTitle: 'Head of Global Operations',
    profileUrl: 'https://linkedin.com/in/elinor-lindqvist-fictional',
    email: 'elinor.l@nordiclogistics-example.no',
    source: 'Company Website',
    serviceOfInterest: 'Power BI Dashboards & Business Intelligence',
    businessProblem: 'Operations directors spending 18 hours weekly merging disparate ERP and fleet GPS sheets; need unified real-time telemetry dashboard.',
    qualificationNotes: 'Inbound contact form submission. Currently running Microsoft 365 E5 with unutilized Power BI capacity.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Meeting Scheduled',
    priority: 'High',
    estimatedDealValue: 7200,
    dateCreated: '2026-10-02',
    lastContactDate: '2026-10-11',
    nextFollowUpDate: '2026-10-15',
    nextAction: 'Conduct solution demo and present sample logistics Power BI scorecard template.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-02', notes: 'Inbound inquiry on fleet analytics.' },
      { stage: 'Contacted', date: '2026-10-03', notes: 'Sent discovery questionnaire and capability deck.' },
      { stage: 'Meeting Scheduled', date: '2026-10-11', notes: 'Scheduled Zoom demo with Operations and IT directors.' }
    ]
  },
  {
    id: 'lead-103',
    companyName: 'Stratum Legal Partners',
    website: 'https://stratumlegal-example.co.uk',
    industry: 'Legal Services',
    companySize: '20-50 employees',
    country: 'United Kingdom',
    city: 'London',
    contactPerson: 'Alastair Finch',
    jobTitle: 'Managing Partner',
    profileUrl: 'https://linkedin.com/in/alastair-finch-fictional',
    email: 'a.finch@stratumlegal-example.co.uk',
    source: 'Referral',
    serviceOfInterest: 'Website Development',
    businessProblem: 'Current website is 7 years old, non-responsive, and fails to reflect premium corporate advisory reputation; conversion on high-net-worth inquiries is declining.',
    qualificationNotes: 'Referred by existing London technology contact. Ready to kick off immediately with full branding assets ready.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Negotiation',
    priority: 'High',
    estimatedDealValue: 6500,
    dateCreated: '2026-09-01',
    lastContactDate: '2026-10-09',
    nextFollowUpDate: '2026-10-14',
    nextAction: 'Finalize contract terms regarding post-launch SLA and send digital signature link.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-09-01', notes: 'Introduced via email by David Sterling (Sterling Agency).' },
      { stage: 'Contacted', date: '2026-09-05', notes: 'Introductory phone call.' },
      { stage: 'Qualified', date: '2026-09-12', notes: 'Requirements gathered for 12-page bespoke Next.js portal.' },
      { stage: 'Proposal', date: '2026-09-25', notes: 'Sent proposal PROP-2026-01.' },
      { stage: 'Negotiation', date: '2026-10-08', notes: 'Discussed minor scope adjustment regarding lawyer bio search.' }
    ]
  },
  {
    id: 'lead-104',
    companyName: 'CloudSphere SaaS',
    website: 'https://cloudsphere-example.io',
    industry: 'Software & Technology',
    companySize: '10-25 employees',
    country: 'Canada',
    city: 'Toronto, ON',
    contactPerson: 'Karan Mehra',
    jobTitle: 'Founder & CEO',
    profileUrl: 'https://linkedin.com/in/karan-mehra-fictional',
    email: 'karan@cloudsphere-example.io',
    source: 'Upwork',
    serviceOfInterest: 'SaaS Product Development',
    businessProblem: 'Seed-funded startup needing MVP development of multi-tenant cloud security monitoring dashboard with Stripe billing.',
    qualificationNotes: 'Originated from Upwork invite. Wants dedicated team for 3 months with transition to in-house team post series-A.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Won',
    priority: 'Urgent',
    estimatedDealValue: 24000,
    dateCreated: '2026-08-15',
    lastContactDate: '2026-10-01',
    nextFollowUpDate: '2026-10-28',
    nextAction: 'Sprint 2 deliverable review meeting with engineering leads.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-08-15', notes: 'Discovered on Upwork enterprise job feed.' },
      { stage: 'Contacted', date: '2026-08-18', notes: 'Submitted tailored proposal and architecture diagram.' },
      { stage: 'Qualified', date: '2026-08-24', notes: 'Technical interview call passed.' },
      { stage: 'Proposal', date: '2026-08-30', notes: 'Contract agreement drafted.' },
      { stage: 'Negotiation', date: '2026-09-05', notes: 'Milestones agreed: 3 tranches of $8k.' },
      { stage: 'Won', date: '2026-09-15', notes: 'First escrow deposit funded. Active delivery commenced.' }
    ]
  },
  {
    id: 'lead-105',
    companyName: 'Veloce Real Estate Advisory',
    website: 'https://veloce-realestate-example.ae',
    industry: 'Real Estate & Property',
    companySize: '25-50 employees',
    country: 'United Arab Emirates',
    city: 'Dubai',
    contactPerson: 'Tariq Mansoor',
    jobTitle: 'Director of Business Development',
    profileUrl: 'https://linkedin.com/in/tariq-mansoor-fictional',
    email: 't.mansoor@veloce-example.ae',
    source: 'LinkedIn',
    serviceOfInterest: 'CRM Implementation',
    businessProblem: 'Brokers storing luxury investor leads in individual WhatsApp chats; leadership has zero pipeline visibility and losing $200k+ in unmanaged inquiries.',
    qualificationNotes: 'Looking to deploy HubSpot Sales Pro or Zoho CRM with Arabic/English WhatsApp integration.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Qualified',
    priority: 'Medium',
    estimatedDealValue: 5500,
    dateCreated: '2026-09-28',
    lastContactDate: '2026-10-09',
    nextFollowUpDate: '2026-10-15',
    nextAction: 'Prepare tailored CRM Blueprint outlining custom deal stages for off-plan property sales.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-09-28', notes: 'Engaged with LinkedIn post on Dubai real estate operations.' },
      { stage: 'Contacted', date: '2026-10-02', notes: 'Direct message exchange regarding broker workflow challenges.' },
      { stage: 'Qualified', date: '2026-10-09', notes: '30-minute discovery call completed. Budget of $5k-$7k confirmed.' }
    ]
  },
  {
    id: 'lead-106',
    companyName: 'GreenLeaf Organics B2B',
    website: 'https://greenleaf-example.com.au',
    industry: 'E-commerce & Wholesale',
    companySize: '15-30 employees',
    country: 'Australia',
    city: 'Melbourne, VIC',
    contactPerson: 'Sophie Campbell',
    jobTitle: 'Head of Digital Commerce',
    profileUrl: 'https://linkedin.com/in/sophie-campbell-fictional',
    email: 'sophie@greenleaf-example.com.au',
    source: 'PeoplePerHour',
    serviceOfInterest: 'Business Process Automation',
    businessProblem: 'Wholesale order PDFs sent via email require 4 hours of manual re-typing into inventory system daily; frequent dispatch errors.',
    qualificationNotes: 'Requested Make.com / n8n workflow with AI OCR to parse invoices directly into Shopify Plus.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'New Lead',
    priority: 'Medium',
    estimatedDealValue: 3800,
    dateCreated: '2026-10-12',
    lastContactDate: '2026-10-12',
    nextFollowUpDate: '2026-10-14',
    nextAction: 'Send preliminary automation architecture flowchart and request 2 sample anonymized invoice PDFs.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-12', notes: 'Inquiry received on PeoplePerHour custom quotation request.' }
    ]
  },
  {
    id: 'lead-107',
    companyName: 'FinPulse Analytics',
    website: 'https://finpulse-example.de',
    industry: 'FinTech',
    companySize: '30-60 employees',
    country: 'Germany',
    city: 'Frankfurt',
    contactPerson: 'Jonas Weber',
    jobTitle: 'VP of Product Engineering',
    profileUrl: 'https://linkedin.com/in/jonas-weber-fictional',
    email: 'j.weber@finpulse-example.de',
    source: 'LinkedIn Sales Navigator',
    serviceOfInterest: 'API Integration',
    businessProblem: 'Need secure middleware connecting European open banking PSD2 APIs with internal risk calculation engine.',
    qualificationNotes: 'Strict data sovereignty requirements (GDPR/Frankfurt servers). Budget approved at €8,000.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Contacted',
    priority: 'High',
    estimatedDealValue: 8800,
    dateCreated: '2026-10-06',
    lastContactDate: '2026-10-08',
    nextFollowUpDate: '2026-10-14',
    nextAction: 'Send follow-up email #1 sharing Nexora API middleware security checklist.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-06', notes: 'Sourced from Sales Navigator query for FinTech VP Engineering in Frankfurt.' },
      { stage: 'Contacted', date: '2026-10-08', notes: 'Sent personalized cold email regarding PSD2 latency optimization.' }
    ]
  },
  {
    id: 'lead-108',
    companyName: 'EduBridge Global',
    website: 'https://edubridge-example.org',
    industry: 'EdTech & Education',
    companySize: '40-80 employees',
    country: 'United States',
    city: 'Boston, MA',
    contactPerson: 'Rebecca Vance-Diaz',
    jobTitle: 'Director of Technology',
    profileUrl: 'https://linkedin.com/in/rebecca-vance-fictional',
    email: 'rebecca.vd@edubridge-example.org',
    source: 'Freelancer',
    serviceOfInterest: 'Web Application Development',
    businessProblem: 'Existing student portal crashes during peak enrollment; lacks responsive mobile support for global students.',
    qualificationNotes: 'Project budgeted at $15,000. Needs React frontend with Node.js microservices.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Proposal',
    priority: 'High',
    estimatedDealValue: 14500,
    dateCreated: '2026-09-18',
    lastContactDate: '2026-10-07',
    nextFollowUpDate: '2026-10-15',
    nextAction: 'Address questions raised by IT committee on load balancing and database caching.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-09-18', notes: 'Awarded shortlist on Freelancer enterprise contest.' },
      { stage: 'Contacted', date: '2026-09-20', notes: 'Conducted video discovery.' },
      { stage: 'Qualified', date: '2026-09-26', notes: 'Full technical spec reviewed.' },
      { stage: 'Proposal', date: '2026-10-04', notes: 'Detailed proposal submitted.' }
    ]
  },
  {
    id: 'lead-109',
    companyName: 'Terraform Construction Group',
    website: 'https://terraform-builders-example.com',
    industry: 'Construction & Engineering',
    companySize: '150-300 employees',
    country: 'Australia',
    city: 'Sydney, NSW',
    contactPerson: 'Liam Gallagher',
    jobTitle: 'Operations General Manager',
    profileUrl: 'https://linkedin.com/in/liam-gallagher-fictional',
    email: 'liam.g@terraform-example.com',
    source: 'Networking',
    serviceOfInterest: 'Power BI Dashboards & Business Intelligence',
    businessProblem: 'Site managers submitting weekly paper safety and material logs; executive board has 3-week lag on cost-overrun visibility.',
    qualificationNotes: 'Met during Sydney Virtual Construction Tech Forum. Very motivated to digitize reporting.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Contacted',
    priority: 'Medium',
    estimatedDealValue: 6800,
    dateCreated: '2026-10-04',
    lastContactDate: '2026-10-09',
    nextFollowUpDate: '2026-10-16',
    nextAction: 'Send video walkthrough of Nexora Job Costing & Safety Power BI dashboard.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-04', notes: 'Connected during virtual construction trade expo.' },
      { stage: 'Contacted', date: '2026-10-09', notes: 'Followed up on LinkedIn with case study link.' }
    ]
  },
  {
    id: 'lead-110',
    companyName: 'Zest Gourmet Foods',
    website: 'https://zestfoods-example.co.uk',
    industry: 'Retail & Hospitality',
    companySize: '30-70 employees',
    country: 'United Kingdom',
    city: 'Manchester',
    contactPerson: 'Chloe Davies',
    jobTitle: 'Commercial Sales Director',
    profileUrl: 'https://linkedin.com/in/chloe-davies-fictional',
    email: 'chloe@zestfoods-example.co.uk',
    source: 'Company Website',
    serviceOfInterest: 'Website Development',
    businessProblem: 'Current B2B catalogue website has no ordering capability; chefs and restaurant buyers must phone in orders manually.',
    qualificationNotes: 'Wants B2B e-commerce ordering portal with wholesale pricing tiers and account approval workflow.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Qualified',
    priority: 'Medium',
    estimatedDealValue: 7800,
    dateCreated: '2026-09-29',
    lastContactDate: '2026-10-10',
    nextFollowUpDate: '2026-10-17',
    nextAction: 'Draft proposal for headless WooCommerce / Next.js B2B ordering portal.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-09-29', notes: 'Contact form inquiry received.' },
      { stage: 'Contacted', date: '2026-10-01', notes: 'Sent questionnaire on wholesale purchasing flow.' },
      { stage: 'Qualified', date: '2026-10-10', notes: 'Confirmed budget and requirements for wholesale portal.' }
    ]
  },
  {
    id: 'lead-111',
    companyName: 'OmniTrade Capital',
    website: 'https://omnitrade-example.sg',
    industry: 'Financial Services',
    companySize: '15-30 employees',
    country: 'Singapore',
    city: 'Singapore',
    contactPerson: 'Wei Zhang',
    jobTitle: 'Chief Technology Officer',
    profileUrl: 'https://linkedin.com/in/wei-zhang-fictional',
    email: 'wei.zhang@omnitrade-example.sg',
    source: 'Upwork',
    serviceOfInterest: 'Business Process Automation',
    businessProblem: 'Trade settlement reconciliation done manually by two analysts every evening across 4 broker accounts.',
    qualificationNotes: 'High complexity. Decided to build internal python scripts instead due to regulatory compliance.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Lost',
    priority: 'Low',
    estimatedDealValue: 4500,
    dateCreated: '2026-08-20',
    lastContactDate: '2026-09-14',
    nextFollowUpDate: '2026-12-01',
    nextAction: 'Check in in 3 months to see if internal engineering solved the maintenance overhead.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-08-20', notes: 'Upwork job posting.' },
      { stage: 'Contacted', date: '2026-08-22', notes: 'Submitted proposal.' },
      { stage: 'Qualified', date: '2026-08-28', notes: 'Technical call held.' },
      { stage: 'Lost', date: '2026-09-14', notes: 'Decided to keep engineering strictly in-house due to MAS compliance.' }
    ]
  },
  {
    id: 'lead-112',
    companyName: 'Kurogane Digital Agency',
    website: 'https://kurogane-example.jp',
    industry: 'Marketing & Advertising',
    companySize: '20-40 employees',
    country: 'Japan / Global',
    city: 'Tokyo',
    contactPerson: 'Kenji Sato',
    jobTitle: 'Director of Technology Partnerships',
    profileUrl: 'https://linkedin.com/in/kenji-sato-fictional',
    email: 'k.sato@kurogane-example.jp',
    source: 'LinkedIn',
    serviceOfInterest: 'Web Application Development',
    businessProblem: 'Creative agency lacking backend development capacity; seeking Mohali white-label development partner for ongoing client projects.',
    qualificationNotes: 'High potential lifetime value. Looking to outsource 2–3 projects per quarter.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Meeting Scheduled',
    priority: 'High',
    estimatedDealValue: 18000,
    dateCreated: '2026-10-05',
    lastContactDate: '2026-10-11',
    nextFollowUpDate: '2026-10-16',
    nextAction: 'Review agency partner agreement terms and prepare past portfolio showcase of enterprise React builds.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-05', notes: 'Reached out on LinkedIn offering offshore white-label augmentation.' },
      { stage: 'Contacted', date: '2026-10-07', notes: 'Kenji replied expressing interest in backend capacity.' },
      { stage: 'Meeting Scheduled', date: '2026-10-11', notes: 'Agency partnership discovery call scheduled.' }
    ]
  },
  {
    id: 'lead-113',
    companyName: 'Vitalis Diagnostics',
    website: 'https://vitalis-diag-example.com',
    industry: 'Healthcare & Life Sciences',
    companySize: '30-50 employees',
    country: 'United States',
    city: 'San Diego, CA',
    contactPerson: 'Elena Rostova',
    jobTitle: 'Director of Patient Experience',
    profileUrl: 'https://linkedin.com/in/elena-rostova-fictional',
    email: 'e.rostova@vitalis-diag-example.com',
    source: 'LinkedIn Sales Navigator',
    serviceOfInterest: 'AI Chatbot Development',
    businessProblem: 'Patients calling lab hotline constantly for test preparation guidance and report delivery timeframes.',
    qualificationNotes: 'Initial contact made. Reviewing our HIPAA compliance documentation.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'New Lead',
    priority: 'High',
    estimatedDealValue: 8500,
    dateCreated: '2026-10-12',
    lastContactDate: '2026-10-12',
    nextFollowUpDate: '2026-10-15',
    nextAction: 'Send case study on AI Patient Engagement Chatbot deployed for healthcare clinics.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-12', notes: 'Identified via healthcare operations query.' }
    ]
  },
  {
    id: 'lead-114',
    companyName: 'BrightPath Dental Network',
    website: 'https://brightpathdental-example.com',
    industry: 'Healthcare & Dental',
    companySize: '20-40 employees',
    country: 'United States',
    city: 'Denver, CO',
    contactPerson: 'Dr. Gregory Hall',
    jobTitle: 'Managing Partner',
    profileUrl: 'https://linkedin.com/in/gregory-hall-fictional',
    email: 'gregory@brightpathdental-example.com',
    source: 'Company Website',
    serviceOfInterest: 'Website Development',
    businessProblem: 'Old dental practice website has 20-second load times and fails Google mobile speed test; no online booking integration.',
    qualificationNotes: 'Needs fast, modern clinic website with integrated patient appointment booking widget.',
    leadOwner: 'Keshav Sood (BDE)',
    status: 'Contacted',
    priority: 'Medium',
    estimatedDealValue: 4800,
    dateCreated: '2026-10-08',
    lastContactDate: '2026-10-10',
    nextFollowUpDate: '2026-10-14',
    nextAction: 'Follow up with PageSpeed Insights audit report showing specific mobile bottlenecks.',
    stageHistory: [
      { stage: 'New Lead', date: '2026-10-08', notes: 'Contact inquiry via website contact form.' },
      { stage: 'Contacted', date: '2026-10-10', notes: 'Sent initial audit report.' }
    ]
  }
];

export const SEED_BIDDING_OPPORTUNITIES: BiddingOpportunity[] = [
  {
    id: 'bid-201',
    platform: 'Upwork',
    jobTitle: 'Build Enterprise Power BI Sales & Inventory Dashboard for Multi-Store Retailer',
    jobUrl: 'https://upwork.com/jobs/simulated-powerbi-retail-dash-201',
    clientDescription: 'We operate 14 retail fashion locations across the US. Our sales data is in Lightspeed POS and inventory is managed in NetSuite. We need an experienced Power BI specialist to build an executive dashboard tracking gross margins, stock aging, sell-through rates, and weekly store leaderboards.',
    clientCountry: 'United States',
    requiredSkills: ['Power BI', 'DAX', 'Data Modeling', 'Azure Data Factory', 'NetSuite API', 'ETL'],
    clientBudget: '$4,000 – $6,000',
    proposedPrice: 5200,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-09',
    applicationDeadline: '2026-10-18',
    fitScore: 94,
    status: 'Proposal Drafted',
    proposalDraftId: 'prop-sample-02',
    followUpDate: '2026-10-15',
    notes: 'Client has verified payment, $250k+ spend on Upwork, 4.9 rating. Perfect match for our Power BI team.',
    nextAction: 'Refine proposal cover letter emphasizing our retail inventory DAX modeling experience and submit proposal.'
  },
  {
    id: 'bid-202',
    platform: 'Upwork',
    jobTitle: 'Next.js & Tailwind Redesign for B2B Cyber Security Firm',
    jobUrl: 'https://upwork.com/jobs/simulated-nextjs-cyber-redesign-202',
    clientDescription: 'Looking for a top-tier frontend development agency to rebuild our corporate website in Next.js 14 and Tailwind CSS. We already have completed Figma design files ready. Must achieve 95+ mobile Lighthouse score, include Hubspot form embeds, and have clean TypeScript.',
    clientCountry: 'United Kingdom',
    requiredSkills: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'Figma to Code', 'HubSpot'],
    clientBudget: '$5,000',
    proposedPrice: 4800,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-10',
    applicationDeadline: '2026-10-16',
    fitScore: 96,
    status: 'Submitted',
    proposalDraftId: 'prop-sample-01',
    followUpDate: '2026-10-14',
    notes: 'Submitted tailored proposal with Loom walkthrough of our recent Next.js cyber agency build.',
    nextAction: 'Monitor Upwork inbox for client message response and prepare answers for Hubspot integration.'
  },
  {
    id: 'bid-203',
    platform: 'Freelancer',
    jobTitle: 'Custom RAG AI Chatbot with WhatsApp & Web Widget for Real Estate Agency',
    jobUrl: 'https://freelancer.com/projects/simulated-ai-rag-realestate-203',
    clientDescription: 'We are a luxury Dubai real estate brokerage. We receive 50+ WhatsApp inquiries daily asking about floor plans, payment plans, and developer amenities. Need an AI chatbot connected to our property PDF brochures that answers questions and captures lead phone numbers.',
    clientCountry: 'United Arab Emirates',
    requiredSkills: ['Python', 'OpenAI API', 'LangChain', 'Pinecone', 'WhatsApp Business API', 'React'],
    clientBudget: '$3,500 – $7,000',
    proposedPrice: 6500,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-08',
    applicationDeadline: '2026-10-20',
    fitScore: 91,
    status: 'Client Responded',
    proposalDraftId: 'prop-sample-03',
    followUpDate: '2026-10-14',
    notes: 'Client replied on Freelancer asking for a video demo of our PDF retrieval agent. Sent video recording on Oct 11.',
    nextAction: 'Follow up with scheduling link for technical discovery call with client Managing Director.'
  },
  {
    id: 'bid-204',
    platform: 'PeoplePerHour',
    jobTitle: 'HubSpot CRM Setup & Automated Pipeline for B2B Engineering Consultancy',
    jobUrl: 'https://peopleperhour.com/freelance-jobs/simulated-hubspot-pipeline-204',
    clientDescription: 'Need a certified HubSpot specialist to configure our Sales Hub Pro. We have 2,000 legacy contacts in Excel that need deduplication and import. Set up 3 deal pipelines, automated meeting booking links, and email sequence templates.',
    clientCountry: 'Australia',
    requiredSkills: ['HubSpot CRM', 'Data Migration', 'Sales Automation', 'Lead Scoring', 'Zapier'],
    clientBudget: '$2,500',
    proposedPrice: 2400,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-07',
    applicationDeadline: '2026-10-15',
    fitScore: 88,
    status: 'Qualified',
    followUpDate: '2026-10-13',
    notes: 'Client is an engineering consultancy in Brisbane. Straightforward HubSpot rollout.',
    nextAction: 'Draft custom proposal outlining our 4-stage CRM implementation methodology.'
  },
  {
    id: 'bid-205',
    platform: 'Upwork',
    jobTitle: 'Full-Stack Developer for Multi-Tenant B2B SaaS MVP (React + Node.js)',
    jobUrl: 'https://upwork.com/jobs/simulated-saas-mvp-react-node-205',
    clientDescription: 'Seeking an experienced full-stack development team to build an MVP for our compliance tracking SaaS. We have wireframes and user stories ready. Features: User Auth, Multi-tenant workspace, Document Upload to S3, Stripe Subscription, PDF generation.',
    clientCountry: 'United States',
    requiredSkills: ['React', 'Node.js', 'PostgreSQL', 'Stripe API', 'AWS S3', 'Docker'],
    clientBudget: '$15,000 – $25,000',
    proposedPrice: 18500,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-04',
    applicationDeadline: '2026-10-22',
    fitScore: 89,
    status: 'Interview',
    followUpDate: '2026-10-15',
    notes: 'Completed round 1 screening. Technical interview scheduled with CTO on Tuesday.',
    nextAction: 'Prepare presentation deck highlighting our multi-tenant database partitioning approach.'
  },
  {
    id: 'bid-206',
    platform: 'PeoplePerHour',
    jobTitle: 'Automate Invoice Extraction to Xero via Make.com & OpenAI',
    jobUrl: 'https://peopleperhour.com/freelance-jobs/simulated-invoice-xero-automation-206',
    clientDescription: 'Need an automation specialist to create a Make.com scenario that monitors an Outlook inbox for supplier invoices, uses OpenAI GPT-4o vision to extract line items, and posts bills directly into Xero with PDF attachments.',
    clientCountry: 'United Kingdom',
    requiredSkills: ['Make.com', 'Xero API', 'OpenAI API', 'JSON', 'Outlook Webhook'],
    clientBudget: '$1,200',
    proposedPrice: 1200,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-11',
    applicationDeadline: '2026-10-17',
    fitScore: 85,
    status: 'Researching',
    followUpDate: '2026-10-14',
    notes: 'Client has 15 five-star reviews on PPH. Scope is clean and well-defined.',
    nextAction: 'Verify Xero OAuth token refresh mechanics in Make.com and write targeted proposal pitch.'
  },
  {
    id: 'bid-207',
    platform: 'Freelancer',
    jobTitle: 'FastAPI & Shopify Custom API Integration for Fulfillment System',
    jobUrl: 'https://freelancer.com/projects/simulated-shopify-fastapi-integration-207',
    clientDescription: 'Looking for a backend engineer to build a webhook listener that captures paid orders from Shopify and pushes them to our 3PL warehouse management system API, with stock inventory sync every 15 minutes.',
    clientCountry: 'Canada',
    requiredSkills: ['Python', 'FastAPI', 'Shopify Webhooks', 'REST API', 'Redis'],
    clientBudget: '$2,800',
    proposedPrice: 2800,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-01',
    applicationDeadline: '2026-10-12',
    fitScore: 78,
    status: 'Lost',
    followUpDate: '2026-10-20',
    notes: 'Client hired local developer in Vancouver due to timezone requirement.',
    nextAction: 'Keep contact in network database for future Canadian integration bids.'
  },
  {
    id: 'bid-208',
    platform: 'Upwork',
    jobTitle: 'Fix Slow Loading & Re-Architect React Dashboard for Telehealth Platform',
    jobUrl: 'https://upwork.com/jobs/simulated-telehealth-react-perf-208',
    clientDescription: 'Our telehealth doctor dashboard takes 9 seconds to render patient charts. We need a senior React engineer to analyze render cycles, implement code splitting, optimize state management, and speed up API response caching.',
    clientCountry: 'United States',
    requiredSkills: ['React', 'Performance Optimization', 'Redux / Zustand', 'Web Vitals', 'Node.js'],
    clientBudget: '$3,000',
    proposedPrice: 3200,
    projectType: 'Fixed-Price',
    dateDiscovered: '2026-10-12',
    applicationDeadline: '2026-10-19',
    fitScore: 92,
    status: 'Discovered',
    followUpDate: '2026-10-14',
    notes: 'Brand new posting posted 3 hours ago. Urgent requirement.',
    nextAction: 'Conduct preliminary review of client description and submit proposal within 12 hours.'
  }
];

export const SEED_PROPOSALS: Proposal[] = [
  {
    id: 'prop-sample-01',
    clientCompany: 'Stratum Legal Partners',
    contactPerson: 'Alastair Finch',
    contactEmail: 'a.finch@stratumlegal-example.co.uk',
    clientProblem: 'Stratum Legal Partners operates an outdated 7-year-old WordPress website with poor mobile responsiveness (Lighthouse score 34), non-compliant accessibility, and slow load times (4.8s). High-net-worth commercial clients dropping off, damaging premium firm reputation.',
    businessObjectives: [
      'Elevate firm brand positioning to compete with tier-1 London corporate advisory practices.',
      'Achieve sub-1.2s page load speeds with 95+ Core Web Vitals on mobile and desktop.',
      'Implement an intuitive practice area directory and searchable partner profile portal.',
      'Increase qualified corporate legal inquiries by 40% through optimized conversion pathways.'
    ],
    proposedSolution: 'Nexora Digital Solutions will engineer a bespoke, headless web platform utilizing Next.js 14 (App Router), Tailwind CSS, and Sanity CMS. The architecture guarantees enterprise-grade security, instantaneous page transitions, and effortless content publishing for the internal marketing staff.',
    serviceId: 'srv-web-dev',
    serviceName: 'Website Development',
    scopeOfWork: [
      'Phase 1: Brand discovery, information architecture, and responsive Figma prototypes (Desktop & Mobile).',
      'Phase 2: Next.js frontend development with server-side rendering (SSR) and Tailwind CSS.',
      'Phase 3: Sanity CMS configuration with custom schemas for Practice Areas, Partner Bios, Case Studies, and Insights.',
      'Phase 4: Technical SEO implementation, schema markup for legal services, and Google Tag Manager / GA4 setup.',
      'Phase 5: Staging deployment, cross-browser quality assurance, accessibility audit (WCAG 2.1 AA), and production cutover.'
    ],
    deliverables: [
      'Complete high-fidelity Figma UI/UX design kit and clickable prototype',
      'Production-ready Next.js 14 codebase deployed on high-availability Vercel/AWS infrastructure',
      'Headless Sanity CMS with structured schemas and editorial workflow roles',
      'Technical SEO suite (dynamic XML sitemap, OpenGraph tags, JSON-LD LegalService schema)',
      '30-day post-launch warranty, administrator training video recording, and developer documentation'
    ],
    milestones: [
      {
        milestone: 'Milestone 1: Project Kickoff & UI/UX Design Approval',
        deliverable: 'Figma prototypes for Homepage, Practice Area, Partner Bio, and Contact page approved.',
        duration: 'Week 1 – 2',
        paymentPercentage: 30,
        amount: 1950
      },
      {
        milestone: 'Milestone 2: Frontend & CMS Staging Development',
        deliverable: 'Functional staging environment with CMS integration and responsive pages.',
        duration: 'Week 3 – 4',
        paymentPercentage: 40,
        amount: 2600
      },
      {
        milestone: 'Milestone 3: QA, SEO, Cutover & Launch',
        deliverable: 'Production DNS cutover, 95+ Lighthouse validation, and admin staff training.',
        duration: 'Week 5',
        paymentPercentage: 30,
        amount: 1950
      }
    ],
    timelineSummary: '5 Weeks from contract execution to live production deployment.',
    assumptions: [
      'Client will provide final text copy and photography assets within 5 business days of Milestone 1 sign-off.',
      'Client IT team will grant DNS access for final production domain cutover.',
      'Third-party domain and Vercel Pro hosting fees ($20/mo) are managed directly by client.'
    ],
    exclusions: [
      'Writing bespoke legal disclaimer copy (must be provided by client legal counsel)',
      'Multi-lingual translation services (available as future Phase 2 add-on)'
    ],
    totalEstimatedPrice: 6500,
    currency: 'USD',
    validityDays: 30,
    nextSteps: [
      'Confirm acceptance of proposal terms by countersigning digital authorization below.',
      'Deposit Milestone 1 retainer invoice ($1,950 USD).',
      'Schedule 60-minute technical kickoff call with Nexora Lead UI Designer and Project Manager.'
    ],
    status: 'Negotiation',
    dateCreated: '2026-09-25',
    followUpDate: '2026-10-14',
    relatedLeadId: 'lead-103',
    version: '1.2',
    revisionsNotes: 'Updated payment milestones to 30/40/30 split and clarified WCAG 2.1 AA accessibility scope.'
  },
  {
    id: 'prop-sample-02',
    clientCompany: 'Nordic Logistics AS',
    contactPerson: 'Elinor Lindqvist',
    contactEmail: 'elinor.l@nordiclogistics-example.no',
    clientProblem: 'Nordic Logistics operations leadership relies on 6 disconnected spreadsheets extracted manually from fleet GPS, warehouse ERP, and fuel telematics. Collating weekly reports takes 18 hours per director, resulting in 2-week delays identifying carrier route inefficiencies and cost overruns.',
    businessObjectives: [
      'Eliminate 15+ weekly hours of manual spreadsheet data collation per operational director.',
      'Establish a unified Star-Schema data model consolidating fleet GPS, freight billing, and driver telemetry.',
      'Deliver interactive executive KPI dashboards with drill-through to individual depot and route levels.',
      'Enable automated daily 06:00 AM data refresh with executive email summary alerts.'
    ],
    proposedSolution: 'Nexora Digital Solutions will design and deploy an automated Microsoft Power BI reporting ecosystem. We will configure automated ETL pipelines to ingest data from fleet databases, build an optimized DAX analytics model, and construct intuitive executive and operational scorecards with role-based access control.',
    serviceId: 'srv-powerbi',
    serviceName: 'Power BI Dashboards & Business Intelligence',
    scopeOfWork: [
      'Phase 1: Data audit, source schema analysis, and metric calculation definitions (Data Dictionary).',
      'Phase 2: Star-Schema data modeling, relationship configuration, and incremental refresh setup.',
      'Phase 3: DAX measure engineering (Fuel Efficiency Index, On-Time Delivery Rate, Margin Per Kilometer).',
      'Phase 4: Interactive dashboard development (Executive Overview, Fleet Operations, Depot Scorecard, Driver Safety).',
      'Phase 5: User acceptance testing, Row-Level Security (RLS) implementation, and leadership training.'
    ],
    deliverables: [
      'Consolidated Power BI Star-Schema Data Model (.pbix and Power BI Service deployment)',
      'Executive KPI Dashboard with interactive filters, cross-highlighting, and mobile-optimized view',
      'Automated ETL ingestion script and daily data refresh configuration',
      'Complete Data Dictionary detailing all DAX calculations and data lineage',
      'Recorded 90-minute administrative training session and PDF Quick Reference Guide'
    ],
    milestones: [
      {
        milestone: 'Milestone 1: Data Architecture & Metric Blueprint',
        deliverable: 'Data audit approved and comprehensive metric definition document finalized.',
        duration: 'Week 1',
        paymentPercentage: 35,
        amount: 2520
      },
      {
        milestone: 'Milestone 2: Data Model & Initial Visualizations',
        deliverable: 'Consolidated Star-Schema model deployed with functional test visuals.',
        duration: 'Week 2 – 3',
        paymentPercentage: 40,
        amount: 2880
      },
      {
        milestone: 'Milestone 3: Final Dashboards, RLS & Training',
        deliverable: 'Production deployment to Power BI Service, RLS verification, and team training.',
        duration: 'Week 4',
        paymentPercentage: 25,
        amount: 1800
      }
    ],
    timelineSummary: '4 Weeks from project commencement to executive rollout.',
    assumptions: [
      'Client will provide read-only database credentials or sample data extracts within 3 days.',
      'Client possesses active Power BI Pro or Premium Per User (PPU) licenses in their Microsoft tenant.'
    ],
    exclusions: [
      'Writing custom drivers for proprietary hardware without documented ODBC/REST interfaces',
      'Ongoing post-warranty weekly data entry management'
    ],
    totalEstimatedPrice: 7200,
    currency: 'USD',
    validityDays: 30,
    nextSteps: [
      'Formalize agreement by countersigning proposal authorization.',
      'Remit Milestone 1 invoice ($2,520 USD).',
      'Grant read-only staging credentials for fleet telematics and ERP data sources.'
    ],
    status: 'In Review',
    dateCreated: '2026-10-05',
    followUpDate: '2026-10-15',
    relatedLeadId: 'lead-102',
    version: '1.0',
    revisionsNotes: 'Initial comprehensive proposal submitted following discovery workshop.'
  },
  {
    id: 'prop-sample-03',
    clientCompany: 'Apex Health Systems',
    contactPerson: 'Dr. Marcus Vance',
    contactEmail: 'm.vance@apexhealth-example.com',
    clientProblem: 'Apex Health clinic receptionists handle over 600 repetitive inquiries daily concerning doctor schedules, appointment preparation, and insurance network eligibility. After-hours patients cannot receive immediate answers, causing a 28% drop-off in prospective patient bookings.',
    businessObjectives: [
      'Automate 65% of routine Tier-1 patient inquiries 24/7 without human intervention.',
      'Accelerate patient intake and online appointment scheduling by 3x.',
      'Enforce strict zero-hallucination guardrails and HIPAA-compliant data transmission.',
      'Enable seamless live-agent escalation when complex clinical questions arise.'
    ],
    proposedSolution: 'Nexora Digital Solutions will engineer a custom Retrieval-Augmented Generation (RAG) Conversational AI Assistant. Grounded strictly in Apex Health verified clinical FAQs, practitioner directories, and preparation guides, the assistant provides rapid, empathetic answers and guides patients into existing EHR scheduling workflows.',
    serviceId: 'srv-ai-chatbot',
    serviceName: 'AI Chatbot Development',
    scopeOfWork: [
      'Phase 1: Knowledge ingestion architecture, vector database design (Pinecone/PGVector), and safety guardrails.',
      'Phase 2: RAG pipeline engineering, prompt engineering, and context boundary verification.',
      'Phase 3: Custom frontend chat widget development matching Apex Health clinical brand styling.',
      'Phase 4: Human-in-the-loop escalation integration and CRM/EHR appointment webhook triggers.',
      'Phase 5: Extensive penetration testing, hallucination stress tests, and HIPAA privacy compliance audit.'
    ],
    deliverables: [
      'Trained and validated RAG vector knowledge pipeline deployed on secure cloud infrastructure',
      'Embeddable responsive chat widget with accessibility features and zero-lag streaming responses',
      'Supervisory analytics dashboard showing conversation volume, sentiment, and resolution rate',
      'Integration connector forwarding qualified booking requests directly to patient intake CRM',
      'Compliance & prompt engineering governance manual'
    ],
    milestones: [
      {
        milestone: 'Milestone 1: Knowledge Base Ingestion & Vector Pipeline',
        deliverable: 'Vector database built and validated against 100 sample clinical test queries.',
        duration: 'Week 1 – 2',
        paymentPercentage: 35,
        amount: 3325
      },
      {
        milestone: 'Milestone 2: Widget Development & Escalation Webhooks',
        deliverable: 'Interactive widget deployed on staging site with human handoff working.',
        duration: 'Week 3 – 4',
        paymentPercentage: 40,
        amount: 3800
      },
      {
        milestone: 'Milestone 3: Stress Testing, Compliance & Deployment',
        deliverable: 'Zero-hallucination benchmark sign-off, live website embed, and staff training.',
        duration: 'Week 5',
        paymentPercentage: 25,
        amount: 2375
      }
    ],
    timelineSummary: '5 Weeks from kickoff to live deployment.',
    assumptions: [
      'Client will provide authoritative clinical FAQs, appointment policy documents, and doctor bios.',
      'OpenAI / Anthropic API token consumption billed directly through client enterprise API account.'
    ],
    exclusions: [
      'Providing diagnostic or emergency clinical triage (bot explicitly directs emergencies to 911/ER)',
      'Direct modification of closed proprietary EHR internal database tables'
    ],
    totalEstimatedPrice: 9500,
    currency: 'USD',
    validityDays: 30,
    nextSteps: [
      'Countersign agreement to initiate HIPAA Business Associate Agreement (BAA) and project charter.',
      'Submit Milestone 1 deposit ($3,325 USD).',
      'Supply clinical documentation library for initial RAG vectorization.'
    ],
    status: 'In Review',
    dateCreated: '2026-10-05',
    followUpDate: '2026-10-16',
    relatedLeadId: 'lead-101',
    version: '1.0',
    revisionsNotes: 'Submitted for clinical and IT governance committee review.'
  }
];

export const SEED_ACTIVITIES: Activity[] = [
  {
    id: 'act-301',
    relatedType: 'Lead',
    relatedId: 'lead-101',
    relatedTitle: 'Apex Health Systems',
    type: 'Meeting',
    dateTime: '2026-10-10 16:30',
    summary: 'Discovery & technical requirements call with Dr. Marcus Vance and IT Security Lead.',
    outcome: 'Confirmed $10k budget, 5-week timeframe, and requirement for HIPAA-compliant logging.',
    nextAction: 'Deliver revised milestone breakdown for AI triage workflow.',
    nextFollowUpDate: '2026-10-16',
    completed: true
  },
  {
    id: 'act-302',
    relatedType: 'Lead',
    relatedId: 'lead-103',
    relatedTitle: 'Stratum Legal Partners',
    type: 'Call',
    dateTime: '2026-10-09 14:00',
    summary: 'Commercial negotiation call with Managing Partner Alastair Finch regarding milestone payment terms.',
    outcome: 'Agreed on 30/40/30 milestone structure. Client requested inclusion of lawyer bio search feature.',
    nextAction: 'Send updated contract link with digital signature.',
    nextFollowUpDate: '2026-10-14',
    completed: true
  },
  {
    id: 'act-303',
    relatedType: 'Lead',
    relatedId: 'lead-102',
    relatedTitle: 'Nordic Logistics AS',
    type: 'Email',
    dateTime: '2026-10-11 11:15',
    summary: 'Sent meeting confirmation agenda and Power BI sample fleet dashboard video demo.',
    outcome: 'Client accepted calendar invite for demo meeting on Oct 15.',
    nextAction: 'Prepare presentation deck with fleet telemetry KPI examples.',
    nextFollowUpDate: '2026-10-15',
    completed: true
  },
  {
    id: 'act-304',
    relatedType: 'BiddingOpportunity',
    relatedId: 'bid-202',
    relatedTitle: 'Next.js & Tailwind Redesign for B2B Cyber Security Firm',
    type: 'Proposal Prep',
    dateTime: '2026-10-10 18:00',
    summary: 'Drafted tailored Upwork cover letter and recorded 2-minute Loom walkthrough explaining Next.js SSR advantages.',
    outcome: 'Proposal submitted successfully within 6 hours of job posting.',
    nextAction: 'Check Upwork messages for client view and response.',
    nextFollowUpDate: '2026-10-14',
    completed: true
  },
  {
    id: 'act-305',
    relatedType: 'Lead',
    relatedId: 'lead-107',
    relatedTitle: 'FinPulse Analytics',
    type: 'LinkedIn Message',
    dateTime: '2026-10-08 15:45',
    summary: 'Sent personalized connection message to Jonas Weber (VP Engineering) regarding Frankfurt PSD2 API latency.',
    outcome: 'Connection accepted. Awaiting response to initial technical note.',
    nextAction: 'Send follow-up message sharing Nexora API middleware security checklist.',
    nextFollowUpDate: '2026-10-14',
    completed: false
  },
  {
    id: 'act-306',
    relatedType: 'Lead',
    relatedId: 'lead-114',
    relatedTitle: 'BrightPath Dental Network',
    type: 'Research',
    dateTime: '2026-10-08 10:00',
    summary: 'Conducted Google Lighthouse and GTmetrix performance audits on client existing clinic site.',
    outcome: 'Documented 4.8s time-to-interactive and 12 render-blocking JavaScript files.',
    nextAction: 'Send audit summary to Dr. Gregory Hall with suggested fixes.',
    nextFollowUpDate: '2026-10-14',
    completed: true
  },
  {
    id: 'act-307',
    relatedType: 'Lead',
    relatedId: 'lead-105',
    relatedTitle: 'Veloce Real Estate Advisory',
    type: 'Call',
    dateTime: '2026-10-09 17:00',
    summary: 'Discovery phone call with Tariq Mansoor regarding WhatsApp lead leakage among brokers in Dubai.',
    outcome: 'Client confirmed need for centralized HubSpot or Zoho CRM with auto-assignment.',
    nextAction: 'Prepare custom CRM Blueprint and pricing estimate.',
    nextFollowUpDate: '2026-10-15',
    completed: true
  },
  {
    id: 'act-308',
    relatedType: 'Contact',
    relatedId: 'con-401',
    relatedTitle: 'David Sterling (Sterling Agency)',
    type: 'Follow-up',
    dateTime: '2026-10-07 16:00',
    summary: 'Quarterly relationship check-in with UK digital marketing agency partner.',
    outcome: 'David mentioned two additional client accounts looking for custom React web application development in November.',
    nextAction: 'Send updated Nexora white-label rate card.',
    nextFollowUpDate: '2026-10-21',
    completed: true
  },
  {
    id: 'act-309',
    relatedType: 'Lead',
    relatedId: 'lead-106',
    relatedTitle: 'GreenLeaf Organics B2B',
    type: 'Email',
    dateTime: '2026-10-12 12:30',
    summary: 'Initial response to PeoplePerHour inquiry regarding wholesale order automation.',
    outcome: 'Requested sample anonymized supplier invoices to test OCR parsing accuracy.',
    nextAction: 'Review sample invoice structure upon receipt.',
    nextFollowUpDate: '2026-10-14',
    completed: false
  },
  {
    id: 'act-310',
    relatedType: 'General',
    relatedTitle: 'Weekly Mohali BDE Pipeline Review',
    type: 'Other',
    dateTime: '2026-10-13 10:00',
    summary: 'Conducted weekly review of active proposals, Upwork bidding pipeline, and upcoming follow-ups.',
    outcome: 'Identified 3 stalled leads requiring immediate reactivation touchpoints.',
    nextAction: 'Execute reactivation messages for stalled leads.',
    nextFollowUpDate: '2026-10-14',
    completed: true
  }
];

export const SEED_MARKET_RESEARCH: MarketResearchRecord[] = [
  {
    id: 'mr-501',
    targetIndustry: 'Dental & Specialized Healthcare Clinics',
    geography: 'United States (Midwest & Mountain West)',
    targetCustomerSegment: 'Private practices with 3 to 10 practitioners and >$2M annual billing.',
    businessProblem: 'Severe front-desk staff turnover causing unanswered phone calls, missed online bookings, and outdated websites with poor mobile experience.',
    potentialServiceOpportunity: 'High-speed Next.js practice website bundled with 24/7 AI conversational booking assistant.',
    competitorName: 'PatientPop (Tebra)',
    competitorWebsite: 'https://tebra.com-simulated',
    publiclyObservedOffering: 'Standardized medical marketing platform charging $600-$1,200/month on rigid 1-year locked contracts.',
    differentiationHypothesis: 'Nexora offers zero monthly software lock-in, custom brand ownership, and modern conversational AI that patients actually enjoy using, at 40% lower 3-year TCO.',
    evidenceSourceUrl: 'https://ada.org/resources/practice/practice-management-surveys-simulated',
    researchDate: '2026-10-02',
    notes: 'Dental practice owners are actively seeking alternatives to expensive subscription platforms that hold their patient data hostage.',
    recommendedNextAction: 'Launch targeted LinkedIn outreach campaign targeting Dental Clinic Managing Partners in Colorado and Texas.',
    worksheetAnswers: {
      targetBusinesses: 'Multi-practitioner dental, orthodontic, and aesthetic clinics.',
      businessProblems: 'Receptionists spend 70% of call time on routine directions and appointment rescheduling.',
      currentSolutions: 'Generic WordPress templates and rigid monthly SaaS tools like PatientPop.',
      competitorOfferings: 'High recurring lock-in, generic cookie-cutter templates, sluggish mobile performance.',
      differentiationValue: 'Custom Next.js performance (Lighthouse 95+), zero monthly license hostage, tailored AI triage.',
      evidenceFound: 'Over 45 practice websites in Denver showed mobile load times exceeding 4.5 seconds.',
      nextStepsToInvestigate: 'Test cold outreach message comparing PageSpeed audit with local benchmark.'
    }
  },
  {
    id: 'mr-502',
    targetIndustry: 'Mid-Tier Logistics & Freight Brokerage',
    geography: 'Nordics & Northern Europe (Norway, Sweden, Denmark)',
    targetCustomerSegment: 'Freight operators managing fleets of 30–150 trucks.',
    businessProblem: 'Struggling to track real-time fuel efficiency, driver idle time, and carrier billing across siloed legacy telematics databases.',
    potentialServiceOpportunity: 'Custom Power BI dashboards with automated ETL pipelines connecting fleet GPS and ERP.',
    competitorName: 'Kuehne+Nagel Logistics BI (In-House)',
    competitorWebsite: 'https://kuehne-nagel.com-simulated',
    publiclyObservedOffering: 'Proprietary enterprise dashboards only accessible to tier-1 enterprise multinational contracts.',
    differentiationHypothesis: 'Nexora brings enterprise-grade Fortune 500 telemetry analytics to mid-market Nordic carriers using their existing Microsoft 365 Power BI licenses at fixed project pricing.',
    evidenceSourceUrl: 'https://nordic-logistics-association-reports-simulated.org',
    researchDate: '2026-09-28',
    notes: 'Nordic companies have high Microsoft 365 adoption (over 85%) but rarely possess specialized in-house DAX data engineering talent.',
    recommendedNextAction: 'Build a reusable Power BI fleet logistics demo template and pitch to Oslo and Gothenburg operations heads.',
    worksheetAnswers: {
      targetBusinesses: 'Regional haulage, refrigerated transport, and intermodal freight operators.',
      businessProblems: 'Diesel costs fluctuating while dispatchers use static Excel sheets updated only on Mondays.',
      currentSolutions: 'Manual Excel exports from Webfleet, TomTom, and local ERP systems.',
      competitorOfferings: 'Expensive global consultants (Accenture/Deloitte) demanding $50k+ minimum retainers.',
      differentiationValue: 'Rapid 4-week delivery, fixed milestone pricing ($5k-$8k), complete DAX code handover.',
      evidenceFound: 'Multiple job postings in Oslo for Power BI contractors left unfilled for 90+ days.',
      nextStepsToInvestigate: 'Reach out to 20 Norwegian logistics directors via LinkedIn Sales Navigator.'
    }
  },
  {
    id: 'mr-503',
    targetIndustry: 'B2B Wholesale & Food Service Distribution',
    geography: 'United Kingdom (Midlands & Greater Manchester)',
    targetCustomerSegment: 'Food & beverage wholesalers supplying independent restaurants, pubs, and hotels.',
    businessProblem: 'Wholesale buyers calling in or emailing orders late at night; order processing team spends mornings manually entering items into Sage/Xero.',
    potentialServiceOpportunity: 'B2B Wholesale ordering portal with custom tiered pricing and automated ERP webhook sync.',
    competitorName: 'Choco App / Fresho',
    competitorWebsite: 'https://choco.com-simulated',
    publiclyObservedOffering: 'Commission-based marketplace app taking percentage cuts of wholesale transaction volume.',
    differentiationHypothesis: 'Nexora builds dedicated, branded wholesale portals where suppliers retain 100% of their transaction margin and customer data without marketplace intermediary fees.',
    evidenceSourceUrl: 'https://federation-wholesale-distributors-uk-simulated.co.uk',
    researchDate: '2026-10-05',
    notes: 'Independent food wholesalers resent third-party apps eating into their thin 8–12% operating margins.',
    recommendedNextAction: 'Interview 5 Manchester wholesale managers to map exact line-item ordering friction.',
    worksheetAnswers: {
      targetBusinesses: 'Independent specialty produce, meat, and beverage distributors.',
      businessProblems: 'Voicemail and paper order errors resulting in incorrect morning truck dispatches and credits.',
      currentSolutions: 'Phone answering machines, WhatsApp text messages, physical clipboards.',
      competitorOfferings: 'Marketplace platforms that siphon customer relationships and charge 2–4% per order.',
      differentiationValue: 'Flat project investment, direct brand connection, custom integration to existing accounting.',
      evidenceFound: '70% of UK food wholesalers surveyed cite digital ordering as their top 2026 investment priority.',
      nextStepsToInvestigate: 'Develop demo prototype of mobile quick-reorder screen for chef ordering.'
    }
  },
  {
    id: 'mr-504',
    targetIndustry: 'Commercial Real Estate Brokerage',
    geography: 'United Arab Emirates (Dubai & Abu Dhabi)',
    targetCustomerSegment: 'Luxury real estate agencies with 15 to 60 licensed property brokers.',
    businessProblem: 'Brokers operating as independent silos on personal WhatsApp accounts; agency owners losing client data when brokers transition agencies.',
    potentialServiceOpportunity: 'HubSpot/Zoho CRM deployment with centralized WhatsApp Business API and automated off-plan lead distribution.',
    competitorName: 'Property Finder CRM / MyCRM',
    competitorWebsite: 'https://propertyfinder.ae-simulated',
    publiclyObservedOffering: 'Portal-centric listing tool with weak sales pipeline automation and limited customization.',
    differentiationHypothesis: 'Nexora integrates custom WhatsApp messaging triggers, automated investor nurturing workflows, and multi-currency pipeline analytics tailored specifically to Dubai off-plan sales cycles.',
    evidenceSourceUrl: 'https://dubailand.gov.ae-market-insights-simulated',
    researchDate: '2026-09-24',
    notes: 'Massive surge in international property investment requires real-time multilingual response within 5 minutes.',
    recommendedNextAction: 'Partner with local Dubai property consultants to offer joint technology implementation.',
    worksheetAnswers: {
      targetBusinesses: 'Boutique luxury real estate agencies in Business Bay, Downtown Dubai, and Dubai Marina.',
      businessProblems: 'Investor leads generated from Meta ads sit unattended for hours; lack of CRM governance.',
      currentSolutions: 'Manual Excel spreadsheets and individual broker phone contacts.',
      competitorOfferings: 'Basic listing uploaders that do not provide automated follow-up sequences.',
      differentiationValue: 'Zero lead slippage: instant AI WhatsApp qualification and round-robin broker distribution.',
      evidenceFound: 'Dubai Land Department reported record Q3 transaction volumes with 65% overseas buyers.',
      nextStepsToInvestigate: 'Publish LinkedIn article analyzing response time vs closing rate for Dubai brokerages.'
    }
  },
  {
    id: 'mr-505',
    targetIndustry: 'FinTech & WealthTech Startups',
    geography: 'Germany & DACH Region',
    targetCustomerSegment: 'Series-A funded financial technology companies and neo-brokerages.',
    businessProblem: 'High engineering salary costs in Munich/Frankfurt (€95k+ per engineer) slowing down custom API integration and middleware delivery.',
    potentialServiceOpportunity: 'Dedicated offshore engineering augmentation with Mohali-based senior TypeScript/Python specialists.',
    competitorName: 'Local German IT Consulting Houses',
    competitorWebsite: 'https://german-it-consulting-simulated.de',
    publiclyObservedOffering: 'High hourly rates (€120–€180/hour) with rigid minimum project commitments.',
    differentiationHypothesis: 'Nexora delivers senior-level microservice engineers at €45–€60/hour with agile 2-week sprint flexibility and transparent GitHub contribution.',
    evidenceSourceUrl: 'https://bitkom.org-it-skills-shortage-study-simulated',
    researchDate: '2026-10-01',
    notes: 'German tech firms are increasingly open to offshore Indian development partners who demonstrate rigorous GDPR understanding.',
    recommendedNextAction: 'Create a specialized "GDPR & Data Sovereignty Technical Guide" for European CTOs.',
    worksheetAnswers: {
      targetBusinesses: 'FinTech scale-ups, automated accounting SaaS, and investment app startups.',
      businessProblems: 'Over 130,000 unfilled IT engineering positions across Germany causing product release delays.',
      currentSolutions: 'Struggling to hire locally; hiring through expensive European staffing agencies.',
      competitorOfferings: 'Expensive domestic agencies with long recruitment lead times.',
      differentiationValue: 'Immediate 7-day deployment of senior engineers; cost savings exceeding 55%.',
      evidenceFound: 'Bitkom study highlights 82% of German tech companies report engineer shortages.',
      nextStepsToInvestigate: 'Connect with German tech recruiters and fractional CTOs.'
    }
  },
  {
    id: 'mr-506',
    targetIndustry: 'EdTech & Online Professional Certification',
    geography: 'United States & Canada',
    targetCustomerSegment: 'Accredited professional certification institutes and vocational education providers.',
    businessProblem: 'Legacy Moodle learning platforms delivering clunky, dated student experiences and failing on mobile devices.',
    potentialServiceOpportunity: 'Custom headless React learning portals with video streaming, automated quizzing, and Stripe checkout.',
    competitorName: 'Kajabi / Teachable',
    competitorWebsite: 'https://kajabi.com-simulated',
    publiclyObservedOffering: 'Consumer creator platform lacking enterprise student records and customized exam compliance.',
    differentiationHypothesis: 'Nexora engineers customized corporate training portals with SCORM compliance, proctored examinations, and single sign-on (SSO) with enterprise HR systems.',
    evidenceSourceUrl: 'https://holoniq.com-edtech-trends-simulated',
    researchDate: '2026-10-07',
    notes: 'Enterprise training organizations require custom certificate generation and LMS integration that consumer platforms cannot support.',
    recommendedNextAction: 'Package case study of educational platform redesign and pitch to corporate training providers.',
    worksheetAnswers: {
      targetBusinesses: 'Healthcare, safety, and IT continuing-education institutes.',
      businessProblems: 'Course completion drop-off exceeding 60% due to frustrating mobile user navigation.',
      currentSolutions: '10-year-old self-hosted Moodle or WordPress LearnDash plugins.',
      competitorOfferings: 'Creator-focused tools that lack enterprise data governance and custom grading logic.',
      differentiationValue: 'Modern consumer-grade UI, lightning-fast React responsiveness, and robust student analytics.',
      evidenceFound: '73% of modern vocational learners access course materials primarily on mobile devices.',
      nextStepsToInvestigate: 'Audit top 10 US continuing education providers for mobile accessibility.'
    }
  }
];

export const SEED_NETWORK_CONTACTS: NetworkContact[] = [
  {
    id: 'con-401',
    contactName: 'David Sterling',
    company: 'Sterling Digital Agency',
    jobTitle: 'Founder & Managing Director',
    relationshipType: 'Agency Partner',
    contactSource: 'LinkedIn B2B Networking',
    profileUrl: 'https://linkedin.com/in/david-sterling-fictional',
    email: 'david@sterlingagency-example.co.uk',
    phone: '+44 20 7946 0912',
    industry: 'Digital Marketing & Design',
    lastInteractionDate: '2026-10-07',
    interactionNotes: 'Quarterly partnership review. David refers clients needing heavy custom web development, while Nexora refers UK SEO clients to him. Referred Stratum Legal Partners ($6,500 deal).',
    nextRelationshipAction: 'Send updated Nexora Q4 white-label technical capabilities deck.',
    nextContactDate: '2026-10-21',
    relationshipStatus: 'High Priority',
    linkedLeadId: 'lead-103'
  },
  {
    id: 'con-402',
    contactName: 'Amara Okafor',
    company: 'Vanguard Cloud Advisory',
    jobTitle: 'Senior Cloud Solutions Architect',
    relationshipType: 'Technology Partner',
    contactSource: 'AWS Community Builders Forum',
    profileUrl: 'https://linkedin.com/in/amara-okafor-fictional',
    email: 'amara@vanguardcloud-example.com',
    industry: 'Cloud Infrastructure & DevOps',
    lastInteractionDate: '2026-09-28',
    interactionNotes: 'Discussed joint venture approach where Vanguard handles AWS architecture while Nexora builds application layer for enterprise clients.',
    nextRelationshipAction: 'Share draft joint-service one-pager for enterprise cloud migrations.',
    nextContactDate: '2026-10-25',
    relationshipStatus: 'Active'
  },
  {
    id: 'con-403',
    contactName: 'Rohan Deshmukh',
    company: 'FinGrowth Ventures',
    jobTitle: 'Venture Partner & Incubator Lead',
    relationshipType: 'Referral Partner',
    contactSource: 'Chandigarh Angel Network Meetup',
    profileUrl: 'https://linkedin.com/in/rohan-deshmukh-fictional',
    email: 'rohan@fingrowth-example.in',
    phone: '+91 98765 43210',
    industry: 'Venture Capital & Startups',
    lastInteractionDate: '2026-10-04',
    interactionNotes: 'Rohan works with early-stage founders needing rapid MVP development. Introduced us to two portfolio startups in September.',
    nextRelationshipAction: 'Invite Rohan for coffee in Sector 7 Chandigarh and present our SaaS MVP boilerplate.',
    nextContactDate: '2026-10-18',
    relationshipStatus: 'High Priority'
  },
  {
    id: 'con-404',
    contactName: 'Sarah Jenkins',
    company: 'Summit Recruitment Group',
    jobTitle: 'Head of Operations',
    relationshipType: 'Prospect',
    contactSource: 'Company Website',
    profileUrl: 'https://linkedin.com/in/sarah-jenkins-fictional',
    email: 's.jenkins@summitgroup-example.com',
    industry: 'Staffing & Recruitment',
    lastInteractionDate: '2026-09-15',
    interactionNotes: 'Expressed interest in automating resume parsing from email applications to their Bullhorn ATS. Paused due to internal restructuring.',
    nextRelationshipAction: 'Re-engage with case study showing 20 hours/week saved on recruitment automation.',
    nextContactDate: '2026-10-17',
    relationshipStatus: 'Nurturing'
  },
  {
    id: 'con-405',
    contactName: 'Michael Chang',
    company: 'Pacific Rim Trade Link',
    jobTitle: 'Supply Chain Director',
    relationshipType: 'Existing Contact',
    contactSource: 'Former Client Colleague',
    profileUrl: 'https://linkedin.com/in/michael-chang-fictional',
    email: 'm.chang@pacificrim-example.com',
    industry: 'International Trade & Freight',
    lastInteractionDate: '2026-08-30',
    interactionNotes: 'Worked with Michael at his previous firm. Currently evaluating logistics BI dashboards for his new team in Vancouver.',
    nextRelationshipAction: 'Send informal email congratulations on his 1-year company anniversary with Power BI sample link.',
    nextContactDate: '2026-10-24',
    relationshipStatus: 'Active'
  },
  {
    id: 'con-406',
    contactName: 'Aarti Sharma',
    company: 'Chandigarh IT Association (CITA)',
    jobTitle: 'General Secretary',
    relationshipType: 'Other',
    contactSource: 'Local Industry Chamber',
    profileUrl: 'https://linkedin.com/in/aarti-sharma-fictional',
    email: 'secretary@cita-example.org',
    industry: 'Industry Association & Networking',
    lastInteractionDate: '2026-09-20',
    interactionNotes: 'Key connector for Mohali and Chandigarh IT ecosystem. Connects local export firms with international trade delegations.',
    nextRelationshipAction: 'Register Nexora for upcoming Chandigarh Nordic Trade Delegation networking session.',
    nextContactDate: '2026-10-20',
    relationshipStatus: 'Active'
  }
];

export const SEED_OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    id: 'tpl-01',
    title: 'LinkedIn Connection Request (Value-Led)',
    channel: 'LinkedIn',
    description: 'Concise, non-salesy connection request referencing an observed operational challenge in their industry.',
    recommendedTouchpoint: 'Initial contact with Director/VP-level prospects on LinkedIn.',
    content: `Hi {FirstName}, noticed your work leading operations at {Company}. 

We’ve been analyzing how {Industry} teams are cutting down the 15+ hours spent weekly on manual reporting and data reconciliation. 

Would love to connect and share some of our findings from our recent tech benchmark report.

Best,
{YourName}`
  },
  {
    id: 'tpl-02',
    title: 'First LinkedIn Follow-Up (Relevant Insight)',
    channel: 'LinkedIn',
    description: 'First direct message after connection acceptance. Shares a concrete insight without asking for an immediate call.',
    recommendedTouchpoint: 'Send 24 to 48 hours after prospect accepts connection request.',
    content: `Thanks for connecting, {FirstName}!

Given {Company}'s focus in {Industry}, I thought you might find this interesting: we recently audited 30 peer companies and found that over 65% of operational delays stem from disconnected {ServiceArea} workflows.

We recently helped a similar team automate this, saving roughly 18 hours per week with zero disruption to daily ops.

Curious—is streamlining your {ServiceArea} something your team is evaluating this quarter, or is the current process working well for you?

Warmly,
{YourName}`
  },
  {
    id: 'tpl-03',
    title: 'Cold Email (Problem-Focused & Specific)',
    channel: 'Cold Email',
    subject: 'Quick question regarding {Company}’s {ServiceArea} setup',
    description: 'Crisp cold email focusing on a specific business problem and proposing a low-friction 15-minute conversation.',
    recommendedTouchpoint: 'Direct cold outreach to verified business email addresses.',
    content: `Hi {FirstName},

I noticed that {Company} has been scaling rapidly across {Geography}. Congratulations on the growth!

Typically, when {Industry} firms expand at this pace, operations leaders tell us they run into two major friction points:
1. Significant manual hours spent collating disparate reports across systems.
2. Slower response times on customer inquiries during peak volume.

At Nexora Digital Solutions, we specialize in building custom {ServiceArea} solutions that solve these exact bottlenecks—typically delivering measurable ROI in under 4 weeks.

Do you have 10 minutes this Thursday or Friday for a brief introductory chat to see if our approaches align?

Best regards,

{YourName}
Business Development Executive | Nexora Digital Solutions
Mohali, India | www.nexoradigital-demo.com`
  },
  {
    id: 'tpl-04',
    title: 'Follow-Up Email #1 (Polite Bump with Case Study)',
    channel: 'Follow-up',
    subject: 'Re: Quick question regarding {Company}’s {ServiceArea} setup',
    description: 'Friendly follow-up sent 4–5 days after no response, introducing an objective proof point.',
    recommendedTouchpoint: 'Send 4 to 5 business days after the initial cold email.',
    content: `Hi {FirstName},

Following up briefly on my note from last week. I understand you have a packed schedule leading {Company}.

In case helpful, here is a short 2-page case summary showing how we helped an organization similar to {Company} resolve {BusinessProblem} in under 5 weeks: [Link to Case Study]

If this is on your roadmap for Q4, I’d be glad to share the architecture diagram we used. If not, no worries at all!

Best,
{YourName}`
  },
  {
    id: 'tpl-05',
    title: 'Meeting Request / Discovery Invitation',
    channel: 'Meeting',
    subject: 'Meeting Invitation: Exploring {ServiceArea} for {Company}',
    description: 'Formal yet warm calendar invitation proposal once a prospect expresses initial interest.',
    recommendedTouchpoint: 'Send immediately after prospect expresses openness to discussing requirements.',
    content: `Hi {FirstName},

Great to hear back from you. I would be delighted to walk you through our approach and learn more about {Company}’s specific goals.

To make the most of your time, our 20-minute discovery conversation will cover:
• Your current workflow and key bottlenecks in {ServiceArea}
• How our engineering team approaches similar architectures
• A quick demonstration of relevant project prototypes
• Indicative delivery timelines and investment estimates

Feel free to pick any slot that fits your schedule here: [Calendar Booking Link]

Looking forward to speaking!

Best regards,
{YourName}
Nexora Digital Solutions`
  }
];

export const SEED_ICP_ACCOUNTS: ICPAccountResearch[] = [
  {
    id: 'icp-01',
    targetCompany: 'Solaria Health Technologies',
    targetIndustry: 'Healthcare & MedTech',
    targetGeography: 'United States (California, Texas)',
    companyWebsite: 'https://solariahealth-example.com',
    profileUrl: 'https://linkedin.com/company/solariahealth-example',
    decisionMakerRole: 'Chief Operating Officer / VP of Patient Care',
    observedBusinessNeed: 'High volume of inquiries regarding home-monitoring device setup; website has no conversational assistant or real-time help widget.',
    relevantService: 'AI Chatbot Development',
    researchNotes: 'Company raised $4M Seed round in March. Team expanded from 15 to 45. Leadership posts frequently about scaling patient support without linear hiring costs.',
    source: 'LinkedIn Sales Navigator',
    qualificationScore: 92,
    scoringBreakdown: [
      { criterion: 'Industry Fit', points: 20, maxPoints: 20, reason: 'High-growth MedTech with strict support requirements.' },
      { criterion: 'Company Size & Stage', points: 18, maxPoints: 20, reason: '45 employees with funded capital for technology upgrades.' },
      { criterion: 'Geography & Budget Match', points: 20, maxPoints: 20, reason: 'US West Coast with typical project budgets of $8k–$15k.' },
      { criterion: 'Identified Business Need', points: 19, maxPoints: 20, reason: 'Evident support backlog and absence of automated RAG assistant.' },
      { criterion: 'Decision Maker Accessibility', points: 15, maxPoints: 20, reason: 'COO is active on LinkedIn with public engagement.' }
    ],
    nextOutreachAction: 'Send personalized LinkedIn Connection Request citing device onboarding automation.'
  },
  {
    id: 'icp-02',
    targetCompany: 'Meridian Supply Chain Global',
    targetIndustry: 'Logistics & Distribution',
    targetGeography: 'United Kingdom (London & Birmingham)',
    companyWebsite: 'https://meridiansupply-example.co.uk',
    profileUrl: 'https://linkedin.com/company/meridian-supply-example',
    decisionMakerRole: 'Head of Operations / IT Director',
    observedBusinessNeed: 'Job postings for 3 manual Excel data entry analysts suggest severe lack of business intelligence and automated data pipelines.',
    relevantService: 'Power BI Dashboards & Business Intelligence',
    researchNotes: 'Operating 28 regional cross-docking warehouses. Managing Director quoted in industry journal wanting single source of truth.',
    source: 'LinkedIn Sales Navigator',
    qualificationScore: 86,
    scoringBreakdown: [
      { criterion: 'Industry Fit', points: 20, maxPoints: 20, reason: 'High-volume logistics ideal for Power BI consolidation.' },
      { criterion: 'Company Size & Stage', points: 18, maxPoints: 20, reason: '120 employees, established commercial cash flows.' },
      { criterion: 'Geography & Budget Match', points: 18, maxPoints: 20, reason: 'UK enterprise with £5k–£10k reporting budgets.' },
      { criterion: 'Identified Business Need', points: 18, maxPoints: 20, reason: 'Explicit analyst hiring confirms manual reporting pain.' },
      { criterion: 'Decision Maker Accessibility', points: 12, maxPoints: 20, reason: 'Head of Ops rarely posts; email outreach recommended.' }
    ],
    nextOutreachAction: 'Conduct email research for Head of Operations and send cold email #1.'
  },
  {
    id: 'icp-03',
    targetCompany: 'Aura Luxe Real Estate',
    targetIndustry: 'Real Estate & Property Management',
    targetGeography: 'United Arab Emirates (Dubai)',
    companyWebsite: 'https://auraluxeproperties-example.ae',
    profileUrl: 'https://linkedin.com/company/aura-luxe-example',
    decisionMakerRole: 'Managing Director / Head of Sales',
    observedBusinessNeed: 'Heavy Instagram ad spend generating leads that take over 4 hours to receive WhatsApp response; no centralized CRM.',
    relevantService: 'CRM Implementation',
    researchNotes: 'Brokers running personal mobile numbers. Massive off-plan developer relationships requiring institutional pipeline.',
    source: 'LinkedIn',
    qualificationScore: 88,
    scoringBreakdown: [
      { criterion: 'Industry Fit', points: 20, maxPoints: 20, reason: 'Dubai high-end property sector heavily reliant on CRM discipline.' },
      { criterion: 'Company Size & Stage', points: 16, maxPoints: 20, reason: '30 licensed brokers with substantial transaction commissions.' },
      { criterion: 'Geography & Budget Match', points: 19, maxPoints: 20, reason: 'UAE market willing to invest in rapid lead conversion tools.' },
      { criterion: 'Identified Business Need', points: 18, maxPoints: 20, reason: '4-hour lead lag represents direct revenue loss.' },
      { criterion: 'Decision Maker Accessibility', points: 15, maxPoints: 20, reason: 'Sales Director reachable via LinkedIn InMail.' }
    ],
    nextOutreachAction: 'Send LinkedIn message highlighting automated WhatsApp round-robin assignment.'
  },
  {
    id: 'icp-04',
    targetCompany: 'KiteBio Research Labs',
    targetIndustry: 'Biotechnology & Pharmaceuticals',
    targetGeography: 'Switzerland & Germany',
    companyWebsite: 'https://kitebio-example.ch',
    profileUrl: 'https://linkedin.com/company/kitebio-example',
    decisionMakerRole: 'Chief Technology Officer',
    observedBusinessNeed: 'Outdated static corporate website built in 2017 lacking modern investor portal and interactive pipeline visualization.',
    relevantService: 'Website Development',
    researchNotes: 'Preparing for Series B funding. High-net-worth investors scrutinizing online credibility and clinical trial disclosures.',
    source: 'Company Website',
    qualificationScore: 78,
    scoringBreakdown: [
      { criterion: 'Industry Fit', points: 16, maxPoints: 20, reason: 'Biotech requires high compliance and security.' },
      { criterion: 'Company Size & Stage', points: 15, maxPoints: 20, reason: '25 employees, pre-revenue research phase.' },
      { criterion: 'Geography & Budget Match', points: 20, maxPoints: 20, reason: 'Swiss biotech with substantial capital reserves.' },
      { criterion: 'Identified Business Need', points: 15, maxPoints: 20, reason: 'Outdated website hurts investor presentation.' },
      { criterion: 'Decision Maker Accessibility', points: 12, maxPoints: 20, reason: 'CTO requires formal email approach.' }
    ],
    nextOutreachAction: 'Send email audit demonstrating speed and modern investor portal architecture.'
  }
];
