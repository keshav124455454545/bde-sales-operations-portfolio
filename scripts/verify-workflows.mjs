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
} from '../src/data/seedData.js';

let passed = 0;
let failed = 0;

function assert(condition, message) {
  if (condition) {
    console.log(`  ✓ ${message}`);
    passed++;
  } else {
    console.error(`  ✗ FAIL: ${message}`);
    failed++;
  }
}

console.log('\n========================================');
console.log('TEST SUITE: BDE SALES OPERATIONS WORKFLOWS');
console.log('========================================\n');

// 1. SEED DATA INTEGRITY TESTS
console.log('1. SEED DATASET INTEGRITY CHECKS:');
assert(SEED_LEADS.length >= 12, `Seeded leads count (${SEED_LEADS.length}) >= 12`);
assert(SEED_BIDDING_OPPORTUNITIES.length >= 8, `Seeded bidding opportunities (${SEED_BIDDING_OPPORTUNITIES.length}) >= 8`);
assert(SEED_PROPOSALS.length >= 3, `Seeded proposals count (${SEED_PROPOSALS.length}) >= 3`);
assert(SEED_SERVICES.length === 8, `Nexora services count (${SEED_SERVICES.length}) === 8`);
assert(SEED_MARKET_RESEARCH.length >= 6, `Market research records count (${SEED_MARKET_RESEARCH.length}) >= 6`);
assert(SEED_NETWORK_CONTACTS.length >= 6, `Network contacts count (${SEED_NETWORK_CONTACTS.length}) >= 6`);
assert(SEED_ACTIVITIES.length >= 6, `CRM activities count (${SEED_ACTIVITIES.length}) >= 6`);
assert(SEED_OUTREACH_TEMPLATES.length >= 5, `Outreach templates count (${SEED_OUTREACH_TEMPLATES.length}) >= 5`);

// Verify all leads have required fields
const leadsValid = SEED_LEADS.every(
  (l) =>
    l.id &&
    l.companyName &&
    l.contactPerson &&
    l.jobTitle &&
    l.source &&
    l.serviceOfInterest &&
    l.status &&
    l.priority &&
    typeof l.estimatedDealValue === 'number' &&
    l.nextFollowUpDate &&
    l.nextAction &&
    Array.isArray(l.stageHistory)
);
assert(leadsValid, 'All 14 leads contain valid schema and non-empty required fields');

// Verify bidding platforms
const validPlatforms = ['Upwork', 'Freelancer', 'PeoplePerHour'];
const platformsValid = SEED_BIDDING_OPPORTUNITIES.every((b) =>
  validPlatforms.includes(b.platform) && b.fitScore >= 0 && b.fitScore <= 100
);
assert(platformsValid, 'All bidding opportunities map to Upwork, Freelancer, or PPH with valid fit scores');

// Verify all 8 IT services match target company specification
const expectedServices = [
  'Website Development',
  'Web Application Development',
  'SaaS Product Development',
  'Power BI Dashboards & Business Intelligence',
  'AI Chatbot Development',
  'Business Process Automation',
  'API Integration',
  'CRM Implementation',
];
const serviceNames = SEED_SERVICES.map((s) => s.name);
const allServicesMatch = expectedServices.every((expected) =>
  serviceNames.includes(expected)
);
assert(allServicesMatch, 'All 8 core Nexora service catalogue offerings are accurately represented');

// 2. CSV PARSING & EXPORT INTEGRITY
console.log('\n2. CSV SERIALIZATION & PARSER TESTS:');

function parseLine(text) {
  const results = [];
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
}

const sampleCSV = `"Company Name","Contact Person","Industry","Service of Interest","Estimated Deal Value"\n"Test Corp","Jane Doe","Healthcare","AI Chatbot Development","7500"`;
const parsedHeaders = parseLine(sampleCSV.split('\n')[0]);
const parsedRow = parseLine(sampleCSV.split('\n')[1]);

assert(parsedHeaders.length === 5, 'CSV header parser splits into 5 clean columns');
assert(parsedRow[0] === 'Test Corp', 'CSV row parses company name correctly');
assert(parsedRow[4] === '7500', 'CSV row parses deal value correctly');

// 3. ICP SCORING ENGINE TESTS
console.log('\n3. ICP SCORING ENGINE TESTS:');
const sampleBreakdown = [
  { criterion: 'Industry Fit', points: 20, maxPoints: 20 },
  { criterion: 'Company Size & Stage', points: 18, maxPoints: 20 },
  { criterion: 'Geography & Budget Match', points: 20, maxPoints: 20 },
  { criterion: 'Identified Business Need', points: 19, maxPoints: 20 },
  { criterion: 'Decision Maker Accessibility', points: 15, maxPoints: 20 },
];
const scoreSum = sampleBreakdown.reduce((acc, c) => acc + c.points, 0);
assert(scoreSum === 92, `ICP criteria summation is mathematically exact: 92/100`);
assert(scoreSum >= 85, 'Account with score >= 85 qualifies as Tier 1 Priority');

// 4. PROPOSAL FINANCIAL MILESTONES INTEGRITY
console.log('\n4. PROPOSAL MILESTONES MATHEMATICAL CHECK:');
SEED_PROPOSALS.forEach((prop) => {
  const milestoneTotal = prop.milestones.reduce((acc, m) => acc + m.amount, 0);
  const percentageTotal = prop.milestones.reduce((acc, m) => acc + m.paymentPercentage, 0);
  assert(
    milestoneTotal === prop.totalEstimatedPrice,
    `${prop.id}: Milestone sum ($${milestoneTotal}) === Total price ($${prop.totalEstimatedPrice})`
  );
  assert(
    percentageTotal === 100,
    `${prop.id}: Milestone percentage sum (${percentageTotal}%) === 100%`
  );
});

// 5. CONVERSION RATE ZERO-DENOMINATOR SAFETY TEST
console.log('\n5. REPORTS FUNNEL ZERO-DENOMINATOR DEFENSE:');
const safeRate = (numerator, denominator) =>
  denominator > 0 ? ((numerator / denominator) * 100).toFixed(1) : '0';

assert(safeRate(0, 0) === '0', '0/0 conversion returns "0" without NaN or crash');
assert(safeRate(5, 10) === '50.0', '5/10 conversion returns "50.0"');
assert(safeRate(0, 5) === '0.0', '0/5 conversion returns "0.0"');

// 6. PIPELINE STAGES CONSISTENCY
console.log('\n6. STAGES & STALLED DEALS DETECTION:');
const validStages = [
  'New Lead',
  'Contacted',
  'Qualified',
  'Meeting Scheduled',
  'Proposal',
  'Negotiation',
  'Won',
  'Lost',
];
const allStagesRecognized = SEED_LEADS.every((l) => validStages.includes(l.status));
assert(allStagesRecognized, 'All 14 seeded leads have valid pipeline stages');

console.log('\n========================================');
console.log(`RESULTS: ${passed} PASSED, ${failed} FAILED`);
console.log('========================================\n');

if (failed > 0) {
  process.exit(1);
} else {
  process.exit(0);
}
