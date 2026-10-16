export type OppType = "Job" | "Internship" | "Learnership" | "Remote work";
export type Arrangement = "On-site" | "Remote" | "Hybrid";

export interface Opportunity {
  id: string;
  title: string;
  organisation: string;
  location: string;
  type: OppType;
  category: string;
  arrangement: Arrangement;
  stipend: string;
  closing: string;
  featured?: boolean;
  summary: string;
  requirements: string[];
  applyUrl: string;
}

export const CATEGORIES = ["Retail", "Admin", "IT & Digital", "Hospitality", "Engineering", "Finance", "Customer Service", "Agriculture"];
export const LOCATIONS = ["Gauteng", "Western Cape", "KwaZulu-Natal", "Eastern Cape", "Limpopo", "Mpumalanga", "Free State", "North West", "Northern Cape", "Anywhere in SA"];
export const ARRANGEMENTS: Arrangement[] = ["On-site", "Remote", "Hybrid"];
export const TYPES: OppType[] = ["Job", "Internship", "Learnership", "Remote work"];

// DEMONSTRATION DATA ONLY — fictional organisations, not verified vacancies.
export const OPPORTUNITIES: Opportunity[] = [
  { id: "retail-assistant-soweto", title: "Retail Sales Assistant", organisation: "Ubuntu Mart (demo)", location: "Gauteng", type: "Job", category: "Retail", arrangement: "On-site", stipend: "R5,500 – R6,500 / month", closing: "30 Nov 2026", featured: true, summary: "Help customers, pack shelves and operate the till at a busy community supermarket in Soweto.", requirements: ["Matric (Grade 12)", "Friendly communication skills", "Able to work weekends"], applyUrl: "https://example.com/apply/retail-assistant" },
  { id: "it-support-intern-cpt", title: "IT Support Intern", organisation: "Table Bay Tech Hub (demo)", location: "Western Cape", type: "Internship", category: "IT & Digital", arrangement: "Hybrid", stipend: "R4,000 stipend / month", closing: "15 Dec 2026", featured: true, summary: "12-month internship supporting staff with laptops, networks and help-desk tickets.", requirements: ["Diploma or N6 in IT", "Basic networking knowledge", "Eager to learn"], applyUrl: "https://example.com/apply/it-intern" },
  { id: "call-centre-learnership-dbn", title: "Contact Centre Learnership (NQF 4)", organisation: "Coastline Skills Academy (demo)", location: "KwaZulu-Natal", type: "Learnership", category: "Customer Service", arrangement: "On-site", stipend: "R3,500 stipend / month", closing: "20 Nov 2026", featured: true, summary: "Earn a recognised qualification while gaining real customer service experience. No fees charged to learners.", requirements: ["Matric", "Aged 18–35", "Unemployed South African citizen"], applyUrl: "https://example.com/apply/contact-centre" },
  { id: "remote-data-capturer", title: "Remote Data Capturer", organisation: "Karoo Data Services (demo)", location: "Anywhere in SA", type: "Remote work", category: "Admin", arrangement: "Remote", stipend: "R120 / hour", closing: "10 Dec 2026", summary: "Capture and check records from home. Laptop and stable internet required.", requirements: ["Typing speed 35+ wpm", "Own laptop and data", "Attention to detail"], applyUrl: "https://example.com/apply/data-capturer" },
  { id: "kitchen-assistant-pe", title: "Kitchen Assistant", organisation: "Bay Bistro Group (demo)", location: "Eastern Cape", type: "Job", category: "Hospitality", arrangement: "On-site", stipend: "R5,000 / month + tips", closing: "5 Dec 2026", summary: "Food prep, cleaning and supporting chefs in a busy Gqeberha restaurant.", requirements: ["No experience needed", "Food handling certificate is a plus"], applyUrl: "https://example.com/apply/kitchen-assistant" },
  { id: "finance-graduate-jhb", title: "Graduate Finance Trainee", organisation: "Highveld Accounting Partners (demo)", location: "Gauteng", type: "Internship", category: "Finance", arrangement: "Hybrid", stipend: "R8,000 / month", closing: "31 Jan 2027", featured: true, summary: "Rotational graduate programme across bookkeeping, payroll and tax.", requirements: ["BCom degree", "Excel skills", "Valid ID"], applyUrl: "https://example.com/apply/finance-graduate" },
  { id: "electrical-learnership-polokwane", title: "Electrical Apprenticeship", organisation: "Limpopo Power Skills (demo)", location: "Limpopo", type: "Learnership", category: "Engineering", arrangement: "On-site", stipend: "R4,200 stipend / month", closing: "12 Dec 2026", summary: "Three-year trade apprenticeship towards a red-seal qualification.", requirements: ["Matric with Maths & Physical Science", "Aged 18–30"], applyUrl: "https://example.com/apply/electrical" },
  { id: "social-media-remote", title: "Junior Social Media Assistant", organisation: "Mzansi Creative Co. (demo)", location: "Anywhere in SA", type: "Remote work", category: "IT & Digital", arrangement: "Remote", stipend: "R6,000 / month", closing: "28 Nov 2026", summary: "Schedule posts, reply to comments and create simple graphics for small businesses.", requirements: ["Portfolio of posts or designs", "Good written English"], applyUrl: "https://example.com/apply/social-media" },
  { id: "farm-supervisor-nelspruit", title: "Farm Operations Assistant", organisation: "Lowveld Citrus Estates (demo)", location: "Mpumalanga", type: "Job", category: "Agriculture", arrangement: "On-site", stipend: "R5,800 / month", closing: "18 Dec 2026", summary: "Support harvesting teams, record yields and help with packhouse logistics.", requirements: ["Matric", "Driver's licence is a plus"], applyUrl: "https://example.com/apply/farm-assistant" },
  { id: "admin-intern-bloem", title: "Office Administration Intern", organisation: "Free State Community Trust (demo)", location: "Free State", type: "Internship", category: "Admin", arrangement: "On-site", stipend: "R3,800 stipend / month", closing: "8 Dec 2026", summary: "Filing, reception, scheduling and minute-taking for a non-profit office.", requirements: ["Diploma in Office Admin or similar", "MS Office"], applyUrl: "https://example.com/apply/admin-intern" },
  { id: "customer-agent-remote", title: "Customer Support Agent (Chat)", organisation: "SunRoute Travel (demo)", location: "Anywhere in SA", type: "Remote work", category: "Customer Service", arrangement: "Remote", stipend: "R7,500 / month", closing: "22 Dec 2026", summary: "Answer customer chats and emails for a travel booking platform.", requirements: ["Matric", "Quiet workspace", "Fibre or LTE connection"], applyUrl: "https://example.com/apply/support-agent" },
  { id: "hotel-learnership-cpt", title: "Hospitality Learnership", organisation: "Atlantic Hotel School (demo)", location: "Western Cape", type: "Learnership", category: "Hospitality", arrangement: "On-site", stipend: "R3,500 stipend / month", closing: "14 Jan 2027", summary: "Front-of-house and housekeeping training with workplace placement.", requirements: ["Matric", "Aged 18–35"], applyUrl: "https://example.com/apply/hospitality" },
];

export const getOpportunity = (id: string) => OPPORTUNITIES.find((o) => o.id === id);
