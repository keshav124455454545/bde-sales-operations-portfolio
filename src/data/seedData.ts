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
    "id": "srv-web-dev",
    "name": "Website Development",
    "shortDescription": "Modern, high-converting responsive websites built on Next.js, WordPress Headless, or custom React architectures.",
    "idealCustomer": "Mid-market B2B companies, healthcare clinics, legal firms, and funded startups seeking lead generation and brand authority.",
    "commonProblems": [
      "Slow page load speeds hurting SEO and conversion rates",
      "Outdated UI unaligned with modern customer expectations",
      "Non-responsive layout causing poor mobile conversion",
      "Difficult CMS workflows preventing marketing teams from publishing content"
    ],
    "keyCapabilities": [
      "Mobile-first responsive design with Tailwind CSS",
      "Headless CMS integration (Strapi, Sanity, Contentful)",
      "Core Web Vitals optimization (>90 Lighthouse scores)",
      "Technical SEO and schema markup implementation",
      "Interactive ROI calculators and lead-capture forms"
    ],
    "typicalDeliverables": [
      "UI/UX wireframes and high-fidelity Figma prototypes",
      "Custom frontend codebase with automated CI/CD pipeline",
      "Content management system configured with custom roles",
      "Analytics and conversion tracking (GA4 + GTM setup)",
      "30-day post-launch warranty and administrator documentation"
    ],
    "discoveryQuestions": [
      "What is your current website conversion rate, and what is your monthly visitor target?",
      "Which specific competitors do you consider benchmarks in terms of brand authority?",
      "Who on your internal team will be publishing updates, and what CMS do they prefer?",
      "Are there existing integrations (CRM, email marketing, ERP) that the new site must support?"
    ],
    "differentiators": [
      "Lighthouse Performance Guarantee: minimum 90+ score across desktop and mobile",
      "Integrated B2B lead capture architecture tailored for sales teams",
      "Mohali-based dedicated sprint team with daily asynchronous video updates"
    ],
    "commonObjections": [
      {
        "objection": "Why not just use a low-cost $50 WordPress theme?",
        "suggestedResponse": "Off-the-shelf themes carry bloatware, vulnerable plugins, and poor mobile performance that hurts search rankings. A tailored headless or optimized architecture loads in under 1.2s, is secure, and converts 2–3x higher."
      },
      {
        "objection": "Our in-house marketing intern can build something on Wix/Webflow.",
        "suggestedResponse": "Webflow is great for basic landing pages, but as you scale, custom CRM integrations, complex routing, dynamic calculators, and international multi-lingual SEO require engineering rigor."
      }
    ],
    "dependenciesAndExclusions": [
      "Client must provide high-res brand assets and final copy (copywriting available as add-on)",
      "Third-party software licenses (hosting, domain, CRM) billed directly to client"
    ],
    "priceRangeEstimate": "$3,500 – $8,500 (Fixed Scope)",
    "deliveryTimelineEstimate": "3 to 6 weeks"
  },
  {
    "id": "srv-powerbi",
    "name": "Power BI Dashboards & Business Intelligence",
    "shortDescription": "Enterprise Power BI dashboards, automated ETL data pipelines, and KPI scorecards transforming siloed data into executive decisions.",
    "idealCustomer": "CFOs, Sales Directors, and Operations Heads in manufacturing, logistics, retail, and healthcare with fragmented data sources.",
    "commonProblems": [
      "Executive teams spending 15+ hours weekly manually collating Excel sheets",
      "Discrepant metrics across departments leading to conflicting operational decisions",
      "Lack of real-time visibility into sales pipeline velocity and inventory aging",
      "Slow report rendering and complex data refresh failures"
    ],
    "keyCapabilities": [
      "Automated ETL pipelines via Azure Data Factory or Python scripts",
      "Complex DAX modeling for year-over-year, margin, and cohort analytics",
      "Role-based row-level security (RLS) ensuring managers only see their department data",
      "Automated scheduled data refresh and email alert subscriptions",
      "Mobile-responsive layout optimized for iPad and smartphone executives"
    ],
    "typicalDeliverables": [
      "Consolidated Star-Schema Data Model in Power BI Desktop",
      "Executive KPI Dashboard with interactive slicers and drill-through pages",
      "Operational detail reports with export-to-Excel guardrails",
      "Data Dictionary documenting metric calculations and DAX formulas",
      "Admin training session recording and user guide manual"
    ],
    "discoveryQuestions": [
      "Where does your primary data live currently (SQL Server, ERP, CRM, QuickBooks, Excel)?",
      "How frequently do key stakeholders need the dashboard data refreshed?",
      "What are the 3 to 5 critical decisions you struggle to make without manual collation?",
      "Do you have existing Power BI Pro or Premium capacities deployed?"
    ],
    "differentiators": [
      "Certified Microsoft Power BI Specialists with deep finance and supply chain acumen",
      "Rapid 2-week Discovery-to-Prototype turnaround",
      "Proven DAX optimization eliminating slow visual loading"
    ],
    "commonObjections": [
      {
        "objection": "Our team already knows Excel; do we really need Power BI?",
        "suggestedResponse": "Excel requires manual updates every week, is prone to formula corruption, and risks sensitive data leakage. Power BI updates automatically every morning, maintains audit trails, and provides interactive mobile access."
      }
    ],
    "dependenciesAndExclusions": [
      "Client must provide read-only database credentials or sanitized sample datasets",
      "Power BI Pro licenses ($10/user/mo) provided by client tenant"
    ],
    "priceRangeEstimate": "$3,000 – $9,500",
    "deliveryTimelineEstimate": "2 to 5 weeks"
  },
  {
    "id": "srv-ai-chatbot",
    "name": "AI Chatbot Development",
    "shortDescription": "Custom Retrieval-Augmented Generation (RAG) conversational AI agents trained on proprietary company knowledge bases.",
    "idealCustomer": "E-commerce brands, SaaS customer support teams, legal practices, and real estate agencies overwhelmed with repetitive inquiries.",
    "commonProblems": [
      "Support teams overwhelmed with repetitive Tier-1 questions during off-hours",
      "Slow lead response times (>4 hours) resulting in lost prospective sales",
      "Customer support staffing costs growing linearly with transaction volume",
      "Generic rule-based chatbots frustrating users with robotic dead-ends"
    ],
    "keyCapabilities": [
      "RAG pipeline utilizing vector databases (Pinecone, ChromaDB, PGVector)",
      "Hallucination guardrails and strict prompt boundary enforcement",
      "Seamless human agent escalation with chat transcripts",
      "Multi-channel deployment (Website widget, WhatsApp Business, Slack, Zendesk)",
      "Real-time lead qualification with CRM webhook forwarding"
    ],
    "typicalDeliverables": [
      "Vectorized knowledge base ingestion from company PDFs, FAQs, and help docs",
      "Customized embeddable chat widget matching client brand typography and colors",
      "Admin analytics dashboard monitoring conversation volume, sentiment, and resolution rate",
      "Human-in-the-loop escalation webhook integration",
      "Model performance monitoring and continuous tuning guide"
    ],
    "discoveryQuestions": [
      "What are the top 10 most common customer inquiries your staff answers daily?",
      "In what format is your support knowledge base currently stored (Zendesk, Notion, PDFs)?",
      "What system should receive qualified leads generated during the conversation?",
      "What are the critical guardrails (topics the bot must NEVER provide opinions on)?"
    ],
    "differentiators": [
      "Zero-hallucination guarantee: bot only answers from verified knowledge documents",
      "Instant human handoff trigger when sentiment drops or complex inquiries arise",
      "Compliance-focused: data is not used for public model training"
    ],
    "commonObjections": [
      {
        "objection": "What if the AI hallucinates and gives wrong pricing or legal advice?",
        "suggestedResponse": "We implement strict RAG architecture with system prompts that enforce: if information is not found in the verified context documents, the bot gracefully offers human escalation rather than guessing."
      }
    ],
    "dependenciesAndExclusions": [
      "Client supplies clean source documents (PDFs, URLs, policies)",
      "OpenAI / Anthropic API token costs billed directly via client API key"
    ],
    "priceRangeEstimate": "$4,500 – $12,000",
    "deliveryTimelineEstimate": "3 to 6 weeks"
  }
];

export const SEED_LEADS: Lead[] = [
  {
    "id": "lead-101",
    "companyName": "Apex Health Systems",
    "website": "https://apexhealth.com",
    "industry": "Healthcare & Telemedicine",
    "companySize": "50-100 employees",
    "country": "United States",
    "city": "Austin, TX",
    "contactPerson": "Dr. Marcus Vance",
    "jobTitle": "Chief Medical Officer & Co-Founder",
    "profileUrl": "https://linkedin.com/in/marcus-vance",
    "email": "m.vance@apexhealth.com",
    "phone": "+1 (512) 555-0142",
    "source": "LinkedIn Sales Navigator",
    "serviceOfInterest": "AI Chatbot Development",
    "businessProblem": "Patient support staff overwhelmed by 600+ repetitive daily scheduling and triage questions; seeking HIPAA-compliant 24/7 conversational assistant.",
    "qualificationNotes": "High intent. Budget approved for Q4. Met ICP criteria with score 92/100. Need SOC2/HIPAA compliance assurances.",
    "leadOwner": "Keshav Sood (BDE)",
    "status": "Proposal",
    "priority": "High",
    "estimatedDealValue": 9500,
    "dateCreated": "2026-09-12",
    "lastContactDate": "2026-10-10",
    "nextFollowUpDate": "2026-10-16",
    "nextAction": "Deliver revised milestone breakdown for AI triage workflow and schedule technical review call.",
    "stageHistory": [
      {
        "stage": "New Lead",
        "date": "2026-09-12",
        "notes": "Identified via Sales Navigator filter: CMOs in Austin health tech."
      },
      {
        "stage": "Contacted",
        "date": "2026-09-15",
        "notes": "Sent personalized LinkedIn message regarding patient triage automation."
      },
      {
        "stage": "Qualified",
        "date": "2026-09-22",
        "notes": "Discovery call completed. Confirmed $10k budget and 6-week timeline."
      },
      {
        "stage": "Proposal",
        "date": "2026-10-05",
        "notes": "Submitted formal proposal PROP-2026-03 for AI Patient Support Assistant."
      }
    ]
  },
  {
    "id": "lead-102",
    "companyName": "Nordic Logistics AS",
    "website": "https://nordiclogistics-example.no",
    "industry": "Logistics & Supply Chain",
    "companySize": "100-250 employees",
    "country": "Norway",
    "city": "Oslo",
    "contactPerson": "Elinor Lindqvist",
    "jobTitle": "Head of Global Operations",
    "profileUrl": "https://linkedin.com/in/elinor-lindqvist",
    "email": "elinor.l@nordiclogistics-example.no",
    "source": "Company Website",
    "serviceOfInterest": "Power BI Dashboards & Business Intelligence",
    "businessProblem": "Operations directors spending 18 hours weekly merging disparate ERP and fleet GPS sheets; need unified real-time telemetry dashboard.",
    "qualificationNotes": "Inbound contact form submission. Currently running Microsoft 365 E5 with unutilized Power BI capacity.",
    "leadOwner": "Keshav Sood (BDE)",
    "status": "Meeting Scheduled",
    "priority": "High",
    "estimatedDealValue": 7200,
    "dateCreated": "2026-10-02",
    "lastContactDate": "2026-10-11",
    "nextFollowUpDate": "2026-10-15",
    "nextAction": "Conduct solution demo and present sample logistics Power BI scorecard template.",
    "stageHistory": [
      {
        "stage": "New Lead",
        "date": "2026-10-02",
        "notes": "Inbound inquiry on fleet analytics."
      },
      {
        "stage": "Contacted",
        "date": "2026-10-03",
        "notes": "Sent discovery questionnaire and capability deck."
      },
      {
        "stage": "Meeting Scheduled",
        "date": "2026-10-11",
        "notes": "Scheduled Zoom demo with Operations and IT directors."
      }
    ]
  },
  {
    "id": "lead-103",
    "companyName": "Stratum Legal Partners",
    "website": "https://stratumlegal-example.co.uk",
    "industry": "Legal Services",
    "companySize": "20-50 employees",
    "country": "United Kingdom",
    "city": "London",
    "contactPerson": "Alastair Finch",
    "jobTitle": "Managing Partner",
    "profileUrl": "https://linkedin.com/in/alastair-finch",
    "email": "a.finch@stratumlegal-example.co.uk",
    "source": "Referral",
    "serviceOfInterest": "Website Development",
    "businessProblem": "Current website is 7 years old, non-responsive, and fails to reflect premium corporate advisory reputation; conversion on high-net-worth inquiries is declining.",
    "qualificationNotes": "Referred by existing London technology contact. Ready to kick off immediately with full branding assets ready.",
    "leadOwner": "Keshav Sood (BDE)",
    "status": "Negotiation",
    "priority": "High",
    "estimatedDealValue": 6500,
    "dateCreated": "2026-09-01",
    "lastContactDate": "2026-10-09",
    "nextFollowUpDate": "2026-10-14",
    "nextAction": "Finalize contract terms regarding post-launch SLA and send digital signature link.",
    "stageHistory": [
      {
        "stage": "New Lead",
        "date": "2026-09-01",
        "notes": "Introduced via email by David Sterling (Sterling Agency)."
      },
      {
        "stage": "Contacted",
        "date": "2026-09-05",
        "notes": "Introductory phone call."
      },
      {
        "stage": "Qualified",
        "date": "2026-09-12",
        "notes": "Requirements gathered for 12-page bespoke Next.js portal."
      },
      {
        "stage": "Proposal",
        "date": "2026-09-25",
        "notes": "Sent proposal PROP-2026-01."
      },
      {
        "stage": "Negotiation",
        "date": "2026-10-08",
        "notes": "Discussed minor scope adjustment regarding lawyer bio search."
      }
    ]
  }
];

export const SEED_BIDDING_OPPORTUNITIES: BiddingOpportunity[] = [
  {
    "id": "bid-201",
    "platform": "Upwork",
    "jobTitle": "Build Enterprise Power BI Sales & Inventory Dashboard for Multi-Store Retailer",
    "jobUrl": "https://upwork.com/jobs/job-powerbi-retail-dash-201",
    "clientDescription": "We operate 14 retail fashion locations across the US. Our sales data is in Lightspeed POS and inventory is managed in NetSuite. We need an experienced Power BI specialist to build an executive dashboard tracking gross margins, stock aging, sell-through rates, and weekly store leaderboards.",
    "clientCountry": "United States",
    "requiredSkills": [
      "Power BI",
      "DAX",
      "Data Modeling",
      "Azure Data Factory",
      "NetSuite API",
      "ETL"
    ],
    "clientBudget": "$4,000 – $6,000",
    "proposedPrice": 5200,
    "projectType": "Fixed-Price",
    "dateDiscovered": "2026-10-09",
    "applicationDeadline": "2026-10-18",
    "fitScore": 94,
    "status": "Proposal Drafted",
    "proposalDraftId": "prop-sample-02",
    "followUpDate": "2026-10-15",
    "notes": "Client has verified payment, $250k+ spend on Upwork, 4.9 rating. Perfect match for our Power BI team.",
    "nextAction": "Refine proposal cover letter emphasizing our retail inventory DAX modeling experience and submit proposal."
  },
  {
    "id": "bid-204",
    "platform": "PeoplePerHour",
    "jobTitle": "HubSpot CRM Setup & Automated Pipeline for B2B Engineering Consultancy",
    "jobUrl": "https://peopleperhour.com/freelance-jobs/job-hubspot-pipeline-204",
    "clientDescription": "Need a certified HubSpot specialist to configure our Sales Hub Pro. We have 2,000 legacy contacts in Excel that need deduplication and import. Set up 3 deal pipelines, automated meeting booking links, and email sequence templates.",
    "clientCountry": "Australia",
    "requiredSkills": [
      "HubSpot CRM",
      "Data Migration",
      "Sales Automation",
      "Lead Scoring",
      "Zapier"
    ],
    "clientBudget": "$2,500",
    "proposedPrice": 2400,
    "projectType": "Fixed-Price",
    "dateDiscovered": "2026-10-07",
    "applicationDeadline": "2026-10-15",
    "fitScore": 88,
    "status": "Qualified",
    "followUpDate": "2026-10-13",
    "notes": "Client is an engineering consultancy in Brisbane. Straightforward HubSpot rollout.",
    "nextAction": "Schedule discovery call with managing director and submit customized HubSpot architecture outline.",
  },
  {
    "id": "bid-203",
    "platform": "Freelancer",
    "jobTitle": "Custom RAG AI Chatbot with WhatsApp & Web Widget for Real Estate Agency",
    "jobUrl": "https://freelancer.com/projects/job-ai-rag-realestate-203",
    "clientDescription": "We are a luxury Dubai real estate brokerage. We receive 50+ WhatsApp inquiries daily asking about floor plans, payment plans, and developer amenities. Need an AI chatbot connected to our property PDF brochures that answers questions and captures lead phone numbers.",
    "clientCountry": "United Arab Emirates",
    "requiredSkills": [
      "Python",
      "OpenAI API",
      "LangChain",
      "Pinecone",
      "WhatsApp Business API",
      "React"
    ],
    "clientBudget": "$3,500 – $7,000",
    "proposedPrice": 6500,
    "projectType": "Fixed-Price",
    "dateDiscovered": "2026-10-08",
    "applicationDeadline": "2026-10-20",
    "fitScore": 91,
    "status": "Client Responded",
    "proposalDraftId": "prop-sample-03",
    "followUpDate": "2026-10-14",
    "notes": "Client replied on Freelancer asking for a video demo of our PDF retrieval agent. Sent video recording on Oct 11.",
    "nextAction": "Follow up with scheduling link for technical discovery call with client Managing Director."
  }
];

export const SEED_PROPOSALS: Proposal[] = [
  {
    "id": "prop-sample-01",
    "clientCompany": "Stratum Legal Partners",
    "contactPerson": "Alastair Finch",
    "contactEmail": "a.finch@stratumlegal-example.co.uk",
    "clientProblem": "Stratum Legal Partners operates an outdated 7-year-old WordPress website with poor mobile responsiveness (Lighthouse score 34), non-compliant accessibility, and slow load times (4.8s). High-net-worth commercial clients dropping off, damaging premium firm reputation.",
    "businessObjectives": [
      "Elevate firm brand positioning to compete with tier-1 London corporate advisory practices.",
      "Achieve sub-1.2s page load speeds with 95+ Core Web Vitals on mobile and desktop.",
      "Implement an intuitive practice area directory and searchable partner profile portal.",
      "Increase qualified corporate legal inquiries by 40% through optimized conversion pathways."
    ],
    "proposedSolution": "Nexora Digital Solutions will engineer a bespoke, headless web platform utilizing Next.js 14 (App Router), Tailwind CSS, and Sanity CMS. The architecture guarantees enterprise-grade security, instantaneous page transitions, and effortless content publishing for the internal marketing staff.",
    "serviceId": "srv-web-dev",
    "serviceName": "Website Development",
    "scopeOfWork": [
      "Phase 1: Brand discovery, information architecture, and responsive Figma prototypes (Desktop & Mobile).",
      "Phase 2: Next.js frontend development with server-side rendering (SSR) and Tailwind CSS.",
      "Phase 3: Sanity CMS configuration with custom schemas for Practice Areas, Partner Bios, Case Studies, and Insights.",
      "Phase 4: Technical SEO implementation, schema markup for legal services, and Google Tag Manager / GA4 setup.",
      "Phase 5: Staging deployment, cross-browser quality assurance, accessibility audit (WCAG 2.1 AA), and production cutover."
    ],
    "deliverables": [
      "Complete high-fidelity Figma UI/UX design kit and clickable prototype",
      "Production-ready Next.js 14 codebase deployed on high-availability Vercel/AWS infrastructure",
      "Headless Sanity CMS with structured schemas and editorial workflow roles",
      "Technical SEO suite (dynamic XML sitemap, OpenGraph tags, JSON-LD LegalService schema)",
      "30-day post-launch warranty, administrator training video recording, and developer documentation"
    ],
    "milestones": [
      {
        "milestone": "Milestone 1: Project Kickoff & UI/UX Design Approval",
        "deliverable": "Figma prototypes for Homepage, Practice Area, Partner Bio, and Contact page approved.",
        "duration": "Week 1 – 2",
        "paymentPercentage": 30,
        "amount": 1950
      },
      {
        "milestone": "Milestone 2: Frontend & CMS Staging Development",
        "deliverable": "Functional staging environment with CMS integration and responsive pages.",
        "duration": "Week 3 – 4",
        "paymentPercentage": 40,
        "amount": 2600
      },
      {
        "milestone": "Milestone 3: QA, SEO, Cutover & Launch",
        "deliverable": "Production DNS cutover, 95+ Lighthouse validation, and admin staff training.",
        "duration": "Week 5",
        "paymentPercentage": 30,
        "amount": 1950
      }
    ],
    "timelineSummary": "5 Weeks from contract execution to live production deployment.",
    "assumptions": [
      "Client will provide final text copy and photography assets within 5 business days of Milestone 1 sign-off.",
      "Client IT team will grant DNS access for final production domain cutover.",
      "Third-party domain and Vercel Pro hosting fees ($20/mo) are managed directly by client."
    ],
    "exclusions": [
      "Writing bespoke legal disclaimer copy (must be provided by client legal counsel)",
      "Multi-lingual translation services (available as future Phase 2 add-on)"
    ],
    "totalEstimatedPrice": 6500,
    "currency": "USD",
    "validityDays": 30,
    "nextSteps": [
      "Confirm acceptance of proposal terms by countersigning digital authorization below.",
      "Deposit Milestone 1 retainer invoice ($1,950 USD).",
      "Schedule 60-minute technical kickoff call with Nexora Lead UI Designer and Project Manager."
    ],
    "status": "Negotiation",
    "dateCreated": "2026-09-25",
    "followUpDate": "2026-10-14",
    "relatedLeadId": "lead-103",
    "version": "1.2",
    "revisionsNotes": "Updated payment milestones to 30/40/30 split and clarified WCAG 2.1 AA accessibility scope."
  },
  {
    "id": "prop-sample-02",
    "clientCompany": "Nordic Logistics AS",
    "contactPerson": "Elinor Lindqvist",
    "contactEmail": "elinor.l@nordiclogistics-example.no",
    "clientProblem": "Nordic Logistics operations leadership relies on 6 disconnected spreadsheets extracted manually from fleet GPS, warehouse ERP, and fuel telematics. Collating weekly reports takes 18 hours per director, resulting in 2-week delays identifying carrier route inefficiencies and cost overruns.",
    "businessObjectives": [
      "Eliminate 15+ weekly hours of manual spreadsheet data collation per operational director.",
      "Establish a unified Star-Schema data model consolidating fleet GPS, freight billing, and driver telemetry.",
      "Deliver interactive executive KPI dashboards with drill-through to individual depot and route levels.",
      "Enable automated daily 06:00 AM data refresh with executive email summary alerts."
    ],
    "proposedSolution": "Nexora Digital Solutions will design and deploy an automated Microsoft Power BI reporting ecosystem. We will configure automated ETL pipelines to ingest data from fleet databases, build an optimized DAX analytics model, and construct intuitive executive and operational scorecards with role-based access control.",
    "serviceId": "srv-powerbi",
    "serviceName": "Power BI Dashboards & Business Intelligence",
    "scopeOfWork": [
      "Phase 1: Data audit, source schema analysis, and metric calculation definitions (Data Dictionary).",
      "Phase 2: Star-Schema data modeling, relationship configuration, and incremental refresh setup.",
      "Phase 3: DAX measure engineering (Fuel Efficiency Index, On-Time Delivery Rate, Margin Per Kilometer).",
      "Phase 4: Interactive dashboard development (Executive Overview, Fleet Operations, Depot Scorecard, Driver Safety).",
      "Phase 5: User acceptance testing, Row-Level Security (RLS) implementation, and leadership training."
    ],
    "deliverables": [
      "Consolidated Power BI Star-Schema Data Model (.pbix and Power BI Service deployment)",
      "Executive KPI Dashboard with interactive filters, cross-highlighting, and mobile-optimized view",
      "Automated ETL ingestion script and daily data refresh configuration",
      "Complete Data Dictionary detailing all DAX calculations and data lineage",
      "Recorded 90-minute administrative training session and PDF Quick Reference Guide"
    ],
    "milestones": [
      {
        "milestone": "Milestone 1: Data Architecture & Metric Blueprint",
        "deliverable": "Data audit approved and comprehensive metric definition document finalized.",
        "duration": "Week 1",
        "paymentPercentage": 35,
        "amount": 2520
      },
      {
        "milestone": "Milestone 2: Data Model & Initial Visualizations",
        "deliverable": "Consolidated Star-Schema model deployed with functional test visuals.",
        "duration": "Week 2 – 3",
        "paymentPercentage": 40,
        "amount": 2880
      },
      {
        "milestone": "Milestone 3: Final Dashboards, RLS & Training",
        "deliverable": "Production deployment to Power BI Service, RLS verification, and team training.",
        "duration": "Week 4",
        "paymentPercentage": 25,
        "amount": 1800
      }
    ],
    "timelineSummary": "4 Weeks from project commencement to executive rollout.",
    "assumptions": [
      "Client will provide read-only database credentials or sample data extracts within 3 days.",
      "Client possesses active Power BI Pro or Premium Per User (PPU) licenses in their Microsoft tenant."
    ],
    "exclusions": [
      "Writing custom drivers for proprietary hardware without documented ODBC/REST interfaces",
      "Ongoing post-warranty weekly data entry management"
    ],
    "totalEstimatedPrice": 7200,
    "currency": "USD",
    "validityDays": 30,
    "nextSteps": [
      "Formalize agreement by countersigning proposal authorization.",
      "Remit Milestone 1 invoice ($2,520 USD).",
      "Grant read-only staging credentials for fleet telematics and ERP data sources."
    ],
    "status": "In Review",
    "dateCreated": "2026-10-05",
    "followUpDate": "2026-10-15",
    "relatedLeadId": "lead-102",
    "version": "1.0",
    "revisionsNotes": "Initial comprehensive proposal submitted following discovery workshop."
  },
  {
    "id": "prop-sample-03",
    "clientCompany": "Apex Health Systems",
    "contactPerson": "Dr. Marcus Vance",
    "contactEmail": "m.vance@apexhealth.com",
    "clientProblem": "Apex Health clinic receptionists handle over 600 repetitive inquiries daily concerning doctor schedules, appointment preparation, and insurance network eligibility. After-hours patients cannot receive immediate answers, causing a 28% drop-off in prospective patient bookings.",
    "businessObjectives": [
      "Automate 65% of routine Tier-1 patient inquiries 24/7 without human intervention.",
      "Accelerate patient intake and online appointment scheduling by 3x.",
      "Enforce strict zero-hallucination guardrails and HIPAA-compliant data transmission.",
      "Enable seamless live-agent escalation when complex clinical questions arise."
    ],
    "proposedSolution": "Nexora Digital Solutions will engineer a custom Retrieval-Augmented Generation (RAG) Conversational AI Assistant. Grounded strictly in Apex Health verified clinical FAQs, practitioner directories, and preparation guides, the assistant provides rapid, empathetic answers and guides patients into existing EHR scheduling workflows.",
    "serviceId": "srv-ai-chatbot",
    "serviceName": "AI Chatbot Development",
    "scopeOfWork": [
      "Phase 1: Knowledge ingestion architecture, vector database design (Pinecone/PGVector), and safety guardrails.",
      "Phase 2: RAG pipeline engineering, prompt engineering, and context boundary verification.",
      "Phase 3: Custom frontend chat widget development matching Apex Health clinical brand styling.",
      "Phase 4: Human-in-the-loop escalation integration and CRM/EHR appointment webhook triggers.",
      "Phase 5: Extensive penetration testing, hallucination stress tests, and HIPAA privacy compliance audit."
    ],
    "deliverables": [
      "Trained and validated RAG vector knowledge pipeline deployed on secure cloud infrastructure",
      "Embeddable responsive chat widget with accessibility features and zero-lag streaming responses",
      "Supervisory analytics dashboard showing conversation volume, sentiment, and resolution rate",
      "Integration connector forwarding qualified booking requests directly to patient intake CRM",
      "Compliance & prompt engineering governance manual"
    ],
    "milestones": [
      {
        "milestone": "Milestone 1: Knowledge Base Ingestion & Vector Pipeline",
        "deliverable": "Vector database built and validated against 100 sample clinical test queries.",
        "duration": "Week 1 – 2",
        "paymentPercentage": 35,
        "amount": 3325
      },
      {
        "milestone": "Milestone 2: Widget Development & Escalation Webhooks",
        "deliverable": "Interactive widget deployed on staging site with human handoff working.",
        "duration": "Week 3 – 4",
        "paymentPercentage": 40,
        "amount": 3800
      },
      {
        "milestone": "Milestone 3: Stress Testing, Compliance & Deployment",
        "deliverable": "Zero-hallucination benchmark sign-off, live website embed, and staff training.",
        "duration": "Week 5",
        "paymentPercentage": 25,
        "amount": 2375
      }
    ],
    "timelineSummary": "5 Weeks from kickoff to live deployment.",
    "assumptions": [
      "Client will provide authoritative clinical FAQs, appointment policy documents, and doctor bios.",
      "OpenAI / Anthropic API token consumption billed directly through client enterprise API account."
    ],
    "exclusions": [
      "Providing diagnostic or emergency clinical triage (bot explicitly directs emergencies to 911/ER)",
      "Direct modification of closed proprietary EHR internal database tables"
    ],
    "totalEstimatedPrice": 9500,
    "currency": "USD",
    "validityDays": 30,
    "nextSteps": [
      "Countersign agreement to initiate HIPAA Business Associate Agreement (BAA) and project charter.",
      "Submit Milestone 1 deposit ($3,325 USD).",
      "Supply clinical documentation library for initial RAG vectorization."
    ],
    "status": "In Review",
    "dateCreated": "2026-10-05",
    "followUpDate": "2026-10-16",
    "relatedLeadId": "lead-101",
    "version": "1.0",
    "revisionsNotes": "Submitted for clinical and IT governance committee review."
  }
];

export const SEED_ACTIVITIES: Activity[] = [
  {
    "id": "act-301",
    "relatedType": "Lead",
    "relatedId": "lead-101",
    "relatedTitle": "Apex Health Systems",
    "type": "Meeting",
    "dateTime": "2026-10-10 16:30",
    "summary": "Discovery & technical requirements call with Dr. Marcus Vance and IT Security Lead.",
    "outcome": "Confirmed $10k budget, 5-week timeframe, and requirement for HIPAA-compliant logging.",
    "nextAction": "Deliver revised milestone breakdown for AI triage workflow.",
    "nextFollowUpDate": "2026-10-16",
    "completed": true
  },
  {
    "id": "act-302",
    "relatedType": "Lead",
    "relatedId": "lead-103",
    "relatedTitle": "Stratum Legal Partners",
    "type": "Call",
    "dateTime": "2026-10-09 14:00",
    "summary": "Commercial negotiation call with Managing Partner Alastair Finch regarding milestone payment terms.",
    "outcome": "Agreed on 30/40/30 milestone structure. Client requested inclusion of lawyer bio search feature.",
    "nextAction": "Send updated contract link with digital signature.",
    "nextFollowUpDate": "2026-10-14",
    "completed": true
  },
  {
    "id": "act-303",
    "relatedType": "Lead",
    "relatedId": "lead-102",
    "relatedTitle": "Nordic Logistics AS",
    "type": "Email",
    "dateTime": "2026-10-11 11:15",
    "summary": "Sent meeting confirmation agenda and Power BI sample fleet dashboard video demo.",
    "outcome": "Client accepted calendar invite for demo meeting on Oct 15.",
    "nextAction": "Prepare presentation deck with fleet telemetry KPI examples.",
    "nextFollowUpDate": "2026-10-15",
    "completed": true
  }
];

export const SEED_MARKET_RESEARCH: MarketResearchRecord[] = [
  {
    "id": "mr-501",
    "targetIndustry": "Dental & Specialized Healthcare Clinics",
    "geography": "United States (Midwest & Mountain West)",
    "targetCustomerSegment": "Private practices with 3 to 10 practitioners and >$2M annual billing.",
    "businessProblem": "Severe front-desk staff turnover causing unanswered phone calls, missed online bookings, and outdated websites with poor mobile experience.",
    "potentialServiceOpportunity": "High-speed Next.js practice website bundled with 24/7 AI conversational booking assistant.",
    "competitorName": "PatientPop (Tebra)",
    "competitorWebsite": "https://tebra.com",
    "publiclyObservedOffering": "Standardized medical marketing platform charging $600-$1,200/month on rigid 1-year locked contracts.",
    "differentiationHypothesis": "Nexora offers zero monthly software lock-in, custom brand ownership, and modern conversational AI that patients actually enjoy using, at 40% lower 3-year TCO.",
    "evidenceSourceUrl": "https://ada.org/resources/practice/practice-management-surveys",
    "researchDate": "2026-10-02",
    "notes": "Dental practice owners are actively seeking alternatives to expensive subscription platforms that hold their patient data hostage.",
    "recommendedNextAction": "Launch targeted LinkedIn outreach campaign targeting Dental Clinic Managing Partners in Colorado and Texas.",
    "worksheetAnswers": {
      "targetBusinesses": "Multi-practitioner dental, orthodontic, and aesthetic clinics.",
      "businessProblems": "Receptionists spend 70% of call time on routine directions and appointment rescheduling.",
      "currentSolutions": "Generic WordPress templates and rigid monthly SaaS tools like PatientPop.",
      "competitorOfferings": "High recurring lock-in, generic cookie-cutter templates, sluggish mobile performance.",
      "differentiationValue": "Custom Next.js performance (Lighthouse 95+), zero monthly license hostage, tailored AI triage.",
      "evidenceFound": "Over 45 practice websites in Denver showed mobile load times exceeding 4.5 seconds.",
      "nextStepsToInvestigate": "Test cold outreach message comparing PageSpeed audit with local benchmark."
    }
  },
  {
    "id": "mr-502",
    "targetIndustry": "Mid-Tier Logistics & Freight Brokerage",
    "geography": "Nordics & Northern Europe (Norway, Sweden, Denmark)",
    "targetCustomerSegment": "Freight operators managing fleets of 30–150 trucks.",
    "businessProblem": "Struggling to track real-time fuel efficiency, driver idle time, and carrier billing across siloed legacy telematics databases.",
    "potentialServiceOpportunity": "Custom Power BI dashboards with automated ETL pipelines connecting fleet GPS and ERP.",
    "competitorName": "Kuehne+Nagel Logistics BI (In-House)",
    "competitorWebsite": "https://kuehne-nagel.com",
    "publiclyObservedOffering": "Proprietary enterprise dashboards only accessible to tier-1 enterprise multinational contracts.",
    "differentiationHypothesis": "Nexora brings enterprise-grade Fortune 500 telemetry analytics to mid-market Nordic carriers using their existing Microsoft 365 Power BI licenses at fixed project pricing.",
    "evidenceSourceUrl": "https://nordic-logistics-association-reports.org",
    "researchDate": "2026-09-28",
    "notes": "Nordic companies have high Microsoft 365 adoption (over 85%) but rarely possess specialized in-house DAX data engineering talent.",
    "recommendedNextAction": "Build a reusable Power BI fleet logistics demo template and pitch to Oslo and Gothenburg operations heads.",
    "worksheetAnswers": {
      "targetBusinesses": "Regional haulage, refrigerated transport, and intermodal freight operators.",
      "businessProblems": "Diesel costs fluctuating while dispatchers use static Excel sheets updated only on Mondays.",
      "currentSolutions": "Manual Excel exports from Webfleet, TomTom, and local ERP systems.",
      "competitorOfferings": "Expensive global consultants (Accenture/Deloitte) demanding $50k+ minimum retainers.",
      "differentiationValue": "Rapid 4-week delivery, fixed milestone pricing ($5k-$8k), complete DAX code handover.",
      "evidenceFound": "Multiple job postings in Oslo for Power BI contractors left unfilled for 90+ days.",
      "nextStepsToInvestigate": "Reach out to 20 Norwegian logistics directors via LinkedIn Sales Navigator."
    }
  },
  {
    "id": "mr-503",
    "targetIndustry": "B2B Wholesale & Food Service Distribution",
    "geography": "United Kingdom (Midlands & Greater Manchester)",
    "targetCustomerSegment": "Food & beverage wholesalers supplying independent restaurants, pubs, and hotels.",
    "businessProblem": "Wholesale buyers calling in or emailing orders late at night; order processing team spends mornings manually entering items into Sage/Xero.",
    "potentialServiceOpportunity": "B2B Wholesale ordering portal with custom tiered pricing and automated ERP webhook sync.",
    "competitorName": "Choco App / Fresho",
    "competitorWebsite": "https://choco.com",
    "publiclyObservedOffering": "Commission-based marketplace app taking percentage cuts of wholesale transaction volume.",
    "differentiationHypothesis": "Nexora builds dedicated, branded wholesale portals where suppliers retain 100% of their transaction margin and customer data without marketplace intermediary fees.",
    "evidenceSourceUrl": "https://federation-wholesale-distributors-uk.co.uk",
    "researchDate": "2026-10-05",
    "notes": "Independent food wholesalers resent third-party apps eating into their thin 8–12% operating margins.",
    "recommendedNextAction": "Interview 5 Manchester wholesale managers to map exact line-item ordering friction.",
    "worksheetAnswers": {
      "targetBusinesses": "Independent specialty produce, meat, and beverage distributors.",
      "businessProblems": "Voicemail and paper order errors resulting in incorrect morning truck dispatches and credits.",
      "currentSolutions": "Phone answering machines, WhatsApp text messages, physical clipboards.",
      "competitorOfferings": "Marketplace platforms that siphon customer relationships and charge 2–4% per order.",
      "differentiationValue": "Flat project investment, direct brand connection, custom integration to existing accounting.",
      "evidenceFound": "70% of UK food wholesalers surveyed cite digital ordering as their top 2026 investment priority.",
      "nextStepsToInvestigate": "Develop demo prototype of mobile quick-reorder screen for chef ordering."
    }
  }
];

export const SEED_NETWORK_CONTACTS: NetworkContact[] = [
  {
    "id": "con-401",
    "contactName": "David Sterling",
    "company": "Sterling Digital Agency",
    "jobTitle": "Founder & Managing Director",
    "relationshipType": "Agency Partner",
    "contactSource": "LinkedIn B2B Networking",
    "profileUrl": "https://linkedin.com/in/david-sterling",
    "email": "david@sterlingagency-example.co.uk",
    "phone": "+44 20 7946 0912",
    "industry": "Digital Marketing & Design",
    "lastInteractionDate": "2026-10-07",
    "interactionNotes": "Quarterly partnership review. David refers clients needing heavy custom web development, while Nexora refers UK SEO clients to him. Referred Stratum Legal Partners ($6,500 deal).",
    "nextRelationshipAction": "Send updated Nexora Q4 white-label technical capabilities deck.",
    "nextContactDate": "2026-10-21",
    "relationshipStatus": "High Priority",
    "linkedLeadId": "lead-103"
  },
  {
    "id": "con-402",
    "contactName": "Amara Okafor",
    "company": "Vanguard Cloud Advisory",
    "jobTitle": "Senior Cloud Solutions Architect",
    "relationshipType": "Technology Partner",
    "contactSource": "AWS Community Builders Forum",
    "profileUrl": "https://linkedin.com/in/amara-okafor",
    "email": "amara@vanguardcloud.com",
    "industry": "Cloud Infrastructure & DevOps",
    "lastInteractionDate": "2026-09-28",
    "interactionNotes": "Discussed joint venture approach where Vanguard handles AWS architecture while Nexora builds application layer for enterprise clients.",
    "nextRelationshipAction": "Share draft joint-service one-pager for enterprise cloud migrations.",
    "nextContactDate": "2026-10-25",
    "relationshipStatus": "Active"
  },
  {
    "id": "con-403",
    "contactName": "Rohan Deshmukh",
    "company": "FinGrowth Ventures",
    "jobTitle": "Venture Partner & Incubator Lead",
    "relationshipType": "Referral Partner",
    "contactSource": "Chandigarh Angel Network Meetup",
    "profileUrl": "https://linkedin.com/in/rohan-deshmukh",
    "email": "rohan@fingrowth-example.in",
    "phone": "+91 98765 43210",
    "industry": "Venture Capital & Startups",
    "lastInteractionDate": "2026-10-04",
    "interactionNotes": "Rohan works with early-stage founders needing rapid MVP development. Introduced us to two portfolio startups in September.",
    "nextRelationshipAction": "Invite Rohan for coffee in Sector 7 Chandigarh and present our SaaS MVP boilerplate.",
    "nextContactDate": "2026-10-18",
    "relationshipStatus": "High Priority"
  }
];

export const SEED_OUTREACH_TEMPLATES: OutreachTemplate[] = [
  {
    "id": "tpl-01",
    "title": "LinkedIn Connection Request (Value-Led)",
    "channel": "LinkedIn",
    "description": "Concise, non-salesy connection request referencing an observed operational challenge in their industry.",
    "recommendedTouchpoint": "Initial contact with Director/VP-level prospects on LinkedIn.",
    "content": "Hi {FirstName}, noticed your work leading operations at {Company}. \n\nWe’ve been analyzing how {Industry} teams are cutting down the 15+ hours spent weekly on manual reporting and data reconciliation. \n\nWould love to connect and share some of our findings from our recent tech benchmark report.\n\nBest,\n{YourName}"
  },
  {
    "id": "tpl-02",
    "title": "First LinkedIn Follow-Up (Relevant Insight)",
    "channel": "LinkedIn",
    "description": "First direct message after connection acceptance. Shares a concrete insight without asking for an immediate call.",
    "recommendedTouchpoint": "Send 24 to 48 hours after prospect accepts connection request.",
    "content": "Thanks for connecting, {FirstName}!\n\nGiven {Company}'s focus in {Industry}, I thought you might find this interesting: we recently audited 30 peer companies and found that over 65% of operational delays stem from disconnected {ServiceArea} workflows.\n\nWe recently helped a similar team automate this, saving roughly 18 hours per week with zero disruption to daily ops.\n\nCurious—is streamlining your {ServiceArea} something your team is evaluating this quarter, or is the current process working well for you?\n\nWarmly,\n{YourName}"
  },
  {
    "id": "tpl-03",
    "title": "Cold Email (Problem-Focused & Specific)",
    "channel": "Cold Email",
    "subject": "Quick question regarding {Company}’s {ServiceArea} setup",
    "description": "Crisp cold email focusing on a specific business problem and proposing a low-friction 15-minute conversation.",
    "recommendedTouchpoint": "Direct cold outreach to verified business email addresses.",
    "content": "Hi {FirstName},\n\nI noticed that {Company} has been scaling rapidly across {Geography}. Congratulations on the growth!\n\nTypically, when {Industry} firms expand at this pace, operations leaders tell us they run into two major friction points:\n1. Significant manual hours spent collating disparate reports across systems.\n2. Slower response times on customer inquiries during peak volume.\n\nAt Nexora Digital Solutions, we specialize in building custom {ServiceArea} solutions that solve these exact bottlenecks—typically delivering measurable ROI in under 4 weeks.\n\nDo you have 10 minutes this Thursday or Friday for a brief introductory chat to see if our approaches align?\n\nBest regards,\n\n{YourName}\nBusiness Development Executive | Nexora Digital Solutions\nMohali, India | www.nexoradigital-demo.com"
  }
];

export const SEED_ICP_ACCOUNTS: ICPAccountResearch[] = [
  {
    "id": "icp-01",
    "targetCompany": "Solaria Health Technologies",
    "targetIndustry": "Healthcare & MedTech",
    "targetGeography": "United States (California, Texas)",
    "companyWebsite": "https://solariahealth.com",
    "profileUrl": "https://linkedin.com/company/solariahealth-example",
    "decisionMakerRole": "Chief Operating Officer / VP of Patient Care",
    "observedBusinessNeed": "High volume of inquiries regarding home-monitoring device setup; website has no conversational assistant or real-time help widget.",
    "relevantService": "AI Chatbot Development",
    "researchNotes": "Company raised $4M Seed round in March. Team expanded from 15 to 45. Leadership posts frequently about scaling patient support without linear hiring costs.",
    "source": "LinkedIn Sales Navigator",
    "qualificationScore": 92,
    "scoringBreakdown": [
      {
        "criterion": "Industry Fit",
        "points": 20,
        "maxPoints": 20,
        "reason": "High-growth MedTech with strict support requirements."
      },
      {
        "criterion": "Company Size & Stage",
        "points": 18,
        "maxPoints": 20,
        "reason": "45 employees with funded capital for technology upgrades."
      },
      {
        "criterion": "Geography & Budget Match",
        "points": 20,
        "maxPoints": 20,
        "reason": "US West Coast with typical project budgets of $8k–$15k."
      },
      {
        "criterion": "Identified Business Need",
        "points": 19,
        "maxPoints": 20,
        "reason": "Evident support backlog and absence of automated RAG assistant."
      },
      {
        "criterion": "Decision Maker Accessibility",
        "points": 15,
        "maxPoints": 20,
        "reason": "COO is active on LinkedIn with public engagement."
      }
    ],
    "nextOutreachAction": "Send personalized LinkedIn Connection Request citing device onboarding automation."
  },
  {
    "id": "icp-02",
    "targetCompany": "Meridian Supply Chain Global",
    "targetIndustry": "Logistics & Distribution",
    "targetGeography": "United Kingdom (London & Birmingham)",
    "companyWebsite": "https://meridiansupply-example.co.uk",
    "profileUrl": "https://linkedin.com/company/meridian-supply-example",
    "decisionMakerRole": "Head of Operations / IT Director",
    "observedBusinessNeed": "Job postings for 3 manual Excel data entry analysts suggest severe lack of business intelligence and automated data pipelines.",
    "relevantService": "Power BI Dashboards & Business Intelligence",
    "researchNotes": "Operating 28 regional cross-docking warehouses. Managing Director quoted in industry journal wanting single source of truth.",
    "source": "LinkedIn Sales Navigator",
    "qualificationScore": 86,
    "scoringBreakdown": [
      {
        "criterion": "Industry Fit",
        "points": 20,
        "maxPoints": 20,
        "reason": "High-volume logistics ideal for Power BI consolidation."
      },
      {
        "criterion": "Company Size & Stage",
        "points": 18,
        "maxPoints": 20,
        "reason": "120 employees, established commercial cash flows."
      },
      {
        "criterion": "Geography & Budget Match",
        "points": 18,
        "maxPoints": 20,
        "reason": "UK enterprise with £5k–£10k reporting budgets."
      },
      {
        "criterion": "Identified Business Need",
        "points": 18,
        "maxPoints": 20,
        "reason": "Explicit analyst hiring confirms manual reporting pain."
      },
      {
        "criterion": "Decision Maker Accessibility",
        "points": 12,
        "maxPoints": 20,
        "reason": "Head of Ops rarely posts; email outreach recommended."
      }
    ],
    "nextOutreachAction": "Conduct email research for Head of Operations and send cold email #1."
  },
  {
    "id": "icp-03",
    "targetCompany": "Aura Luxe Real Estate",
    "targetIndustry": "Real Estate & Property Management",
    "targetGeography": "United Arab Emirates (Dubai)",
    "companyWebsite": "https://auraluxeproperties-example.ae",
    "profileUrl": "https://linkedin.com/company/aura-luxe-example",
    "decisionMakerRole": "Managing Director / Head of Sales",
    "observedBusinessNeed": "Heavy Instagram ad spend generating leads that take over 4 hours to receive WhatsApp response; no centralized CRM.",
    "relevantService": "CRM Implementation",
    "researchNotes": "Brokers running personal mobile numbers. Massive off-plan developer relationships requiring institutional pipeline.",
    "source": "LinkedIn",
    "qualificationScore": 88,
    "scoringBreakdown": [
      {
        "criterion": "Industry Fit",
        "points": 20,
        "maxPoints": 20,
        "reason": "Dubai high-end property sector heavily reliant on CRM discipline."
      },
      {
        "criterion": "Company Size & Stage",
        "points": 16,
        "maxPoints": 20,
        "reason": "30 licensed brokers with substantial transaction commissions."
      },
      {
        "criterion": "Geography & Budget Match",
        "points": 19,
        "maxPoints": 20,
        "reason": "UAE market willing to invest in rapid lead conversion tools."
      },
      {
        "criterion": "Identified Business Need",
        "points": 18,
        "maxPoints": 20,
        "reason": "4-hour lead lag represents direct revenue loss."
      },
      {
        "criterion": "Decision Maker Accessibility",
        "points": 15,
        "maxPoints": 20,
        "reason": "Sales Director reachable via LinkedIn InMail."
      }
    ],
    "nextOutreachAction": "Send LinkedIn message highlighting automated WhatsApp round-robin assignment."
  }
];
