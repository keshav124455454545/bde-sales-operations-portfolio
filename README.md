# BDE Sales Operations & Proposal Engineering Platform

[![React](https://img.shields.io/badge/React-18.3-blue.svg)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue.svg)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-6.0-646CFF.svg)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC.svg)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)

A complete, production-grade, responsive sales operations and proposal engineering platform built and managed by **Keshav Sood** for IT services sales, SaaS expansion, and international online client acquisition across **Mohali, Chandigarh**, and global client markets.

---

## Executive Platform Summary

This application functions as a centralized B2B sales management workspace designed to streamline end-to-end client acquisition for IT services:
- **Proactive Lead Prospecting**: Structured account research with weighted ICP scoring.
- **Freelance Portal Bidding**: Tracking and qualification for Upwork, Freelancer, and PeoplePerHour opportunities.
- **8-Stage Pipeline Kanban**: Complete visibility into pipeline health, stage velocity, and deal stalling.
- **Milestone-Based Proposal Engineering**: Formal proposal document generation with printable PDF layouts.
- **Integrated CRM & Analytics**: Activity logs, contact directories, and conversion funnel reporting.

---

## 1. Target Job Description Coverage

Every responsibility from the standard IT Services Business Development Executive (BDE) and Online Bidding specification is directly implemented:

| # | Target Job Description Responsibility | Functional Application Module | Route |
|---|---|---|---|
| **1** | Actively seek out new sales opportunities | Prospecting workspace, priority queues, and lead intake | `/#/prospecting` |
| **2** | Understand bidding portals (Upwork, Freelancer, PPH) | Freelance bidding tracker with fit scoring and deadlines | `/#/bidding` |
| **3** | Generate leads via LinkedIn & Sales Navigator | 0–100 ICP qualification rubric & personalized messaging hub | `/#/prospecting` |
| **4** | Build and maintain a strong sales pipeline | 8-stage interactive Kanban board with velocity tracking | `/#/pipeline` |
| **5** | Conduct market research to identify possibilities | 7-step market discovery worksheet & competitor gap matrix | `/#/market-research` |
| **6** | Develop & manage business-development networks | Relationship directory for referral & technology partners | `/#/network` |
| **7** | Maintain knowledge of company IT service offerings | Core service catalogue with qualification questions and objection handling scripts | `/#/services` |
| **8** | Write new business proposals | Executive proposal builder with `@media print` PDF layout | `/#/proposals` |
| **9** | Keep client database and CRM updated | CRM lead database with CSV import/export & activity logs | `/#/leads` |

---

## 2. Agency Profile: Nexora Digital Solutions

- **Headquarters**: Phase 8B, Industrial Area, Mohali, Punjab 160055, India
- **Target Export Markets**: United States, United Kingdom, Nordics (Norway, Sweden), DACH (Germany), UAE, and Australia
- **Core IT Service Offerings**:
  1. Website & Web Application Development (React, Next.js, TypeScript, Headless CMS, Core Web Vitals)
  2. Power BI Analytics & Executive KPI Dashboards (Star-Schema DAX, Azure ETL pipelines, Real-time Reporting)
  3. AI Chatbot & Intelligent Customer Support Systems (RAG architecture, Vector search, WhatsApp widgets)

---

## 3. Technology Stack

- **Frontend Core**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS with enterprise B2B SaaS palette (Deep Navy `#0f172a`, Light Slate `#f8fafc`, Enterprise Blue `#2563eb`)
- **Icons**: Lucide React
- **Data Visualizations**: Recharts (dynamic bar charts, donut charts, and funnel ratios)
- **Routing**: React Router DOM (`HashRouter` for zero-configuration static hosting)
- **State & Persistence**: HTML5 LocalStorage with schema versioning (`bde_sales_ops_data_v1`), JSON backup export/restore, and CSV import/export.

---

## 4. Key Modules & Features

### Module A: BDE Overview Dashboard (`/#/`)
- Live KPIs: Total Leads, Qualified Opportunities, Meetings Scheduled, Active Proposals, Won Deals, and Total Pipeline Value.
- Stage distribution bar chart and lead sourcing channel donut chart.
- Urgent follow-up queue with overdue tracking.

### Module B: Lead & Prospect Database (`/#/leads`)
- Full CRUD operations with multi-attribute filtering (Source, Status, Industry, Priority, Service).
- Instant search and column sorting.
- Lead Detail drawer showing complete company profile, qualification notes, and stage history.
- **CSV Export** and **CSV Import** with header validation and row parsing.

### Module C: Prospecting Workspace (`/#/prospecting`)
- Configurable **Ideal Customer Profile (ICP) Scoring Engine** calculating a transparent 0–100 score across 5 weighted dimensions.
- Outreach copywriting hub with dynamic placeholder insertion (`{FirstName}`, `{Company}`, `{ServiceArea}`) and 1-click clipboard copy.
- 1-click **Convert to CRM Lead** action bridging account research directly into active pipeline leads.

### Module D: Freelance Bidding Workspace (`/#/bidding`)
- Specialized tracking for **Upwork**, **Freelancer**, and **PeoplePerHour (PPH)**.
- Fields: Job description, client budget, proposed price, project type, fit score, deadline, and status (10 stages).
- "Draft Proposal Pitch" action linking opportunities directly to the Proposal Builder.

### Module E: Sales Pipeline Kanban (`/#/pipeline`)
- 8 pipeline stages: New Lead → Contacted → Qualified → Meeting Scheduled → Proposal → Negotiation → Won → Lost.
- 1-click stage advancement and regression.
- Automatic **Stalled Deal Warning** for leads inactive for over 7 days.
- Column value aggregations.

### Module F: Market Research & Intelligence (`/#/market-research`)
- 7-step discovery worksheet: Target businesses, observed bottlenecks, current solutions, competitor gaps, Nexora differentiation hypotheses, and evidence sources.

### Module G: Network & Relationship Management (`/#/network`)
- Directory of Agency Partners, Referral Partners, Technology Partners, and Prospects.
- Interaction history and upcoming relationship touchpoints.

### Module H: Services & Product Knowledge Library (`/#/services`)
- Complete knowledge base covering all 8 Nexora offerings with ideal customer profiles, deliverables, discovery questions, and objection handling scripts.

### Module I: Executive Proposal Builder (`/#/proposals`)
- Comprehensive proposal authoring: Problem statement, objectives, technical architecture, phased scope of work, deliverables, and payment milestones.
- **Clean Executive Document Preview** formatted specifically for browser print / PDF export (`Ctrl+P` / `Cmd+P`).
- Duplicate proposal and status tracking.
- Pre-loaded with 3 rich client proposals (Website Development, Power BI Dashboard, AI Chatbot).

### Module J: CRM Activities & Reminders (`/#/activities`)
- Daily interaction log (Calls, Emails, LinkedIn Messages, Meetings, Research).
- Urgent overdue follow-up alerts.

### Module K: Reports & Performance Analytics (`/#/reports`)
- Stage conversion funnel metrics with zero-denominator protection.
- Visual charts for industry share, source attribution, and bidding platform volume.

### Module L: Portfolio Showcase (`/#/portfolio`)
- Candidate presentation view for interviewers and hiring managers by Keshav Sood.
- Detailed alignment with the 9 JD responsibilities and architectural decisions.

### Module M: Settings & Data Management (`/#/settings`)
- Storage quota and record counter.
- Full workspace JSON backup export and restore.
- Reset to baseline operations dataset.

---

## 5. Local Setup & Installation

### Prerequisites
- [Node.js](https://nodejs.org/) (v18.0.0 or higher)
- npm (v9.0.0 or higher)

### Installation Steps

1. Clone or download the repository:
   ```bash
   git clone https://github.com/your-username/bde-sales-operations-portfolio.git
   cd bde-sales-operations-portfolio
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173
   ```

---

## 6. Production Build & Deployment

### Build Command
Compile TypeScript and generate the production bundle:
```bash
npm run build
```
This produces an optimized, minified bundle inside the `dist/` directory.

### Free Static Hosting Deployment

#### A. GitHub Pages
1. Push the repository to GitHub.
2. In repository Settings > Pages, select source: **GitHub Actions** or deploy from the `dist/` branch.
3. Because the project uses `HashRouter` and relative asset paths (`base: './'`), all routes work flawlessly without 404 rewrite configuration.

#### B. Netlify
1. Connect your repository to [Netlify](https://www.netlify.com/).
2. Set Build Command: `npm run build`
3. Set Publish Directory: `dist`
4. Click Deploy.

#### C. Vercel
1. Import repository on [Vercel](https://vercel.com/).
2. Framework Preset: **Vite**
3. Click Deploy.

---

## 7. Author

**Keshav Sood**  
Business Development Executive & Sales Operations Specialist  
Mohali & Chandigarh IT Park, India
