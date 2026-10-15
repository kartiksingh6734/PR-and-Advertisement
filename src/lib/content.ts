import { serviceRates, projectRates, money, plans } from "./config";
export type Service = {
  slug: string;
  name: string;
  category: string;
  summary: string;
  price: number;
  period: string;
  problems: string[];
  included: string[];
  process: string[];
  ideal: string;
  excluded: string;
};
export const services: Service[] = [
  {
    slug: "business-growth-strategy",
    name: "Business Growth Strategy",
    category: "Strategy",
    summary:
      "Turn a broad ambition into a focused, practical roadmap for your business.",
    ...serviceRates["business-growth-strategy"],
    problems: [
      "Too many priorities competing for a limited budget",
      "Uncertainty about which service to invest in first",
    ],
    included: [
      "Discovery and business assessment",
      "Priority opportunities and budget discussion",
      "30-day action roadmap and written summary",
    ],
    process: [
      "Understand your business model and customers",
      "Identify constraints and prioritise opportunities",
      "Present a roadmap with clear next steps",
    ],
    ideal: "Owners who need clarity before commissioning execution.",
    excluded:
      "Implementation, financial advice and guaranteed revenue outcomes.",
  },
  {
    slug: "public-relations",
    name: "Public Relations & Media Outreach",
    category: "Visibility",
    summary:
      "Build a credible story and approach relevant media with a considered outreach plan.",
    ...serviceRates["public-relations"],
    problems: [
      "A business story that is hard to explain",
      "Limited awareness beyond existing customers",
    ],
    included: [
      "Story angles and messaging",
      "Relevant media research",
      "Pitch preparation and outreach coordination",
    ],
    process: [
      "Find the story worth telling",
      "Agree target publications and angles",
      "Coordinate pitches and report responses",
    ],
    ideal:
      "Brands with a timely launch, useful expertise or a clear business story.",
    excluded: "Guaranteed coverage, paid placements and publication fees.",
  },
  {
    slug: "social-media-marketing",
    name: "Social Media Marketing",
    category: "Visibility",
    summary:
      "Give your social presence direction, consistency and a meaningful role in your business.",
    ...serviceRates["social-media-marketing"],
    problems: [
      "Irregular posting and unclear messaging",
      "Content activity disconnected from business goals",
    ],
    included: [
      "Channel and audience review",
      "Content themes and calendar",
      "Specialist coordination and activity review",
    ],
    process: [
      "Review current channels",
      "Set content priorities and responsibilities",
      "Coordinate delivery and review enquiries",
    ],
    ideal:
      "Local businesses and emerging brands seeking a more consistent presence.",
    excluded:
      "Photography, video production, paid media and daily community management unless quoted.",
  },
  {
    slug: "paid-advertising",
    name: "Paid Advertising Management",
    category: "Visibility",
    summary:
      "Plan focused campaigns around a clear audience, offer and measurable action.",
    ...serviceRates["paid-advertising"],
    problems: [
      "Advertising spend without clear objectives",
      "Weak tracking between clicks and enquiries",
    ],
    included: [
      "Campaign planning and account review",
      "Audience and creative brief",
      "Campaign coordination and reporting",
    ],
    process: [
      "Define the offer and conversion action",
      "Confirm budget and tracking",
      "Launch, monitor and refine with approval",
    ],
    ideal: "Businesses with a defined offer and a separate media budget.",
    excluded:
      "Ad spend, creative production, platform charges and guaranteed conversions.",
  },
  {
    slug: "branding-design",
    name: "Branding & Graphic Design",
    category: "Creative",
    summary:
      "Create a coherent visual identity that reflects what your business stands for.",
    ...serviceRates["branding-design"],
    problems: [
      "Inconsistent visual materials",
      "A brand identity that no longer fits the business",
    ],
    included: [
      "Brand discovery and creative direction",
      "Identity concepts and agreed refinements",
      "Final assets and a usage guide",
    ],
    process: [
      "Define the audience and character",
      "Review creative routes",
      "Refine and hand over agreed files",
    ],
    ideal: "New brands and businesses refreshing their identity.",
    excluded: "Trademark clearance, printing and unlimited revisions.",
  },
  {
    slug: "content-production",
    name: "Content Creation & Production",
    category: "Creative",
    summary:
      "Coordinate purposeful photography, video and written content for your next campaign.",
    ...serviceRates["content-production"],
    problems: [
      "Disconnected creative suppliers",
      "Content that does not communicate the offer",
    ],
    included: [
      "Creative brief and production scope",
      "Specialist sourcing and scheduling",
      "Review and delivery coordination",
    ],
    process: [
      "Agree the story and formats",
      "Approve crew, schedule and costs",
      "Coordinate production and asset review",
    ],
    ideal: "Businesses needing product, location or campaign content.",
    excluded:
      "Talent, locations, travel, licensing and production costs unless quoted.",
  },
  {
    slug: "influencer-marketing",
    name: "Influencer Marketing",
    category: "Connections",
    summary:
      "Find relevant creator collaborations based on audience fit and a clear campaign brief.",
    ...serviceRates["influencer-marketing"],
    problems: [
      "Difficulty evaluating creator relevance",
      "Unclear deliverables and disclosure requirements",
    ],
    included: [
      "Creator research and shortlist",
      "Outreach and brief coordination",
      "Deliverable and activity tracking",
    ],
    process: [
      "Define audience and campaign goals",
      "Approve creators and commercial terms",
      "Coordinate content, disclosures and reporting",
    ],
    ideal: "Consumer brands with an offer suited to creator storytelling.",
    excluded: "Creator fees, gifting, shipping and guaranteed reach or sales.",
  },
  {
    slug: "website-development",
    name: "Website Development",
    category: "Digital",
    summary:
      "Build a clear, accessible digital home that turns interest into useful enquiries.",
    ...serviceRates["website-development"],
    problems: [
      "An outdated or missing website",
      "Visitors cannot find a clear next step",
    ],
    included: [
      "Page and content planning",
      "Responsive design and development",
      "Enquiry flow and launch checks",
    ],
    process: [
      "Define pages, content and integrations",
      "Design and develop agreed scope",
      "Test, hand over and launch",
    ],
    ideal: `Businesses needing a professional business website; landing pages start at ${money(projectRates[5][1])}.`,
    excluded:
      "Hosting, domains, premium tools and ongoing maintenance unless agreed.",
  },
  {
    slug: "product-launches",
    name: "Product & Business Launches",
    category: "Experiences",
    summary:
      "Connect your launch story, channels and delivery partners around one coordinated plan.",
    ...serviceRates["product-launches"],
    problems: [
      "Launch activities managed in isolation",
      "Unclear ownership of deadlines and approvals",
    ],
    included: [
      "Launch roadmap and responsibilities",
      "Channel and supplier coordination",
      "Readiness checklist and post-launch review",
    ],
    process: [
      "Define audience and launch objectives",
      "Confirm timeline and suppliers",
      "Coordinate readiness, launch and review",
    ],
    ideal: "New shops, products and brands preparing for market.",
    excluded: "Media, venues, production and third-party implementation costs.",
  },
  {
    slug: "event-management",
    name: "Event Management & Coordination",
    category: "Experiences",
    summary:
      "Bring suppliers, schedules and guest experience together for a purposeful business event.",
    ...serviceRates["event-management"],
    problems: [
      "Multiple suppliers and competing timelines",
      "Unclear budgets and event responsibilities",
    ],
    included: [
      "Event scope and run of show",
      "Supplier quote coordination",
      "Agreed execution support and review",
    ],
    process: [
      "Agree purpose, format and budget",
      "Select suppliers and confirm approvals",
      "Coordinate delivery and debrief",
    ],
    ideal: "Businesses hosting promotional, corporate or launch events.",
    excluded:
      "Venue, catering, permits, staffing and event costs unless quoted.",
  },
  {
    slug: "business-partnerships",
    name: "Business Partnerships",
    category: "Connections",
    summary:
      "Explore complementary business relationships with structured research and thoughtful outreach.",
    ...serviceRates["business-partnerships"],
    problems: [
      "Limited access to relevant business connections",
      "Partnership ideas without a clear mutual offer",
    ],
    included: [
      "Partner criteria and proposition",
      "Potential partner research",
      "Introduction and follow-up coordination",
    ],
    process: [
      "Define the mutual opportunity",
      "Research and approve a shortlist",
      "Coordinate conversations and next steps",
    ],
    ideal:
      "Businesses seeking collaborations, distribution or complementary service relationships.",
    excluded:
      "Guaranteed agreements, legal negotiation and partner commissions.",
  },
  {
    slug: "b2b-lead-generation",
    name: "B2B Lead Generation",
    category: "Connections",
    summary:
      "Create a focused outreach foundation for meaningful conversations with potential buyers.",
    ...serviceRates["b2b-lead-generation"],
    problems: [
      "Unclear ideal buyer profile",
      "Unstructured outreach and follow-up",
    ],
    included: [
      "Ideal customer profile",
      "Prospect research approach and messaging",
      "Outreach workflow and tracking setup",
    ],
    process: [
      "Define target companies and decision makers",
      "Agree compliant research and messaging",
      "Set up outreach and review responses",
    ],
    ideal: "Manufacturers and B2B service businesses with a defined offering.",
    excluded:
      "Purchased databases, ongoing outreach, guaranteed leads and closed sales.",
  },
];
export const categories = [
  "All",
  "Strategy",
  "Visibility",
  "Creative",
  "Digital",
  "Connections",
  "Experiences",
];
export const coreServices = [
  [
    "PR & Brand Reputation",
    "A credible story, shared with the right people.",
    "public-relations",
  ],
  [
    "Digital Marketing & Advertising",
    "Connect your offer with people who need it.",
    "paid-advertising",
  ],
  [
    "Branding & Creative Production",
    "Look consistent. Communicate with purpose.",
    "branding-design",
  ],
  [
    "Websites & Digital Presence",
    "A better digital home for your business.",
    "website-development",
  ],
  [
    "Influencer Marketing & Collaborations",
    "Relevant voices. Thoughtful partnerships.",
    "influencer-marketing",
  ],
  [
    "Events & Launches",
    "Every detail working toward one moment.",
    "event-management",
  ],
  [
    "Business Partnerships & B2B Growth",
    "Open the right business conversations.",
    "business-partnerships",
  ],
  [
    "Growth Strategy & Consulting",
    "A clear direction before the next investment.",
    "business-growth-strategy",
  ],
];
export const industries = [
  {
    slug: "restaurants-cafes",
    name: "Restaurants & Cafés",
    challenge:
      "Turn local discovery into visits while communicating what makes your experience distinctive.",
    strategy:
      "Start with local search and menu presentation, coordinate location photography, then test a neighbourhood campaign with enquiry tracking.",
    services: [
      "social-media-marketing",
      "content-production",
      "paid-advertising",
    ],
    ideal:
      "Independent cafés, restaurants and hospitality businesses with a defined local audience.",
  },
  {
    slug: "retail-boutiques",
    name: "Retail Shops & Boutiques",
    challenge:
      "Stand out in a crowded market and give shoppers a reason to discover your collection.",
    strategy:
      "Refresh product presentation, plan seasonal content and coordinate a local launch or creator collaboration.",
    services: ["branding-design", "influencer-marketing", "product-launches"],
    ideal: "Independent shops, boutiques and growing consumer brands.",
  },
  {
    slug: "startups-new-brands",
    name: "Startups & New Brands",
    challenge:
      "Explain a new offering clearly while keeping a limited launch budget focused.",
    strategy:
      "Validate positioning, build a focused website and coordinate an achievable launch roadmap.",
    services: [
      "business-growth-strategy",
      "website-development",
      "product-launches",
    ],
    ideal:
      "Founders preparing to launch or establish their first consistent growth workflow.",
  },
  {
    slug: "manufacturing-b2b",
    name: "Manufacturers & B2B Businesses",
    challenge:
      "Reach relevant decision makers and communicate capabilities beyond an existing referral network.",
    strategy:
      "Clarify the ideal buyer, strengthen capability materials and set up a structured B2B outreach workflow.",
    services: [
      "b2b-lead-generation",
      "business-partnerships",
      "website-development",
    ],
    ideal:
      "Small manufacturers, industrial suppliers and B2B service companies.",
  },
  {
    slug: "local-services",
    name: "Local Service Providers",
    challenge:
      "Build credibility and create a clear path from local interest to an enquiry.",
    strategy:
      "Improve service messaging, create an enquiry-focused website and test a targeted local campaign.",
    services: [
      "website-development",
      "paid-advertising",
      "social-media-marketing",
    ],
    ideal:
      "Professional and local service businesses with a clearly defined service area.",
  },
  {
    slug: "growing-companies",
    name: "Growing Companies",
    challenge:
      "Coordinate more channels and specialists without losing visibility of budgets and progress.",
    strategy:
      "Review current activity, prioritise campaigns and establish a single coordination and reporting rhythm.",
    services: [
      "business-growth-strategy",
      "public-relations",
      "business-partnerships",
    ],
    ideal:
      "Established businesses that need ongoing multi-service coordination.",
  },
];
export const steps = [
  [
    "Business Discovery",
    "We listen to your ambitions, customers, constraints and current activity.",
  ],
  [
    "Growth Diagnosis",
    "We identify gaps and decide what deserves attention first.",
  ],
  [
    "Strategic Planning",
    "You receive a practical scope, budget and roadmap to approve.",
  ],
  [
    "Specialist Coordination",
    "We source or coordinate suitable specialists around agreed responsibilities.",
  ],
  [
    "Execution Management",
    "We manage timelines, approvals and communication through one point of contact.",
  ],
  [
    "Results Review",
    "We review activity and available results, learn and adjust the next steps.",
  ],
];
export const faqs = [
  [
    "What does your agency do?",
    "We coordinate strategy, marketing, creative, technology and business opportunities around your business goals.",
  ],
  [
    "How are you different from a marketing agency?",
    "We begin with the business challenge and coordinate relevant services and specialists, including areas beyond marketing.",
  ],
  [
    "Which businesses do you work with?",
    "Our initial focus is Indian local businesses, restaurants, retailers, startups, manufacturers and growing companies.",
  ],
  [
    "Can I purchase a single service?",
    "Yes. Individual projects are scoped and quoted separately; a monthly plan is not required.",
  ],
  [
    "Do you work with startups?",
    "Yes. We can help prioritise positioning, digital presence and launch activity around an early-stage budget.",
  ],
  [
    "Do you offer monthly packages?",
    "Yes. Our provisional packages cover defined strategy and coordination support. Implementation costs are separate unless quoted.",
  ],
  [
    "Are advertising costs included?",
    "No. Media spend and platform charges require a separate approved budget.",
  ],
  [
    "How much does PR cost?",
    `PR campaign planning and outreach starts at ${money(serviceRates["public-relations"].price)} per campaign, subject to scope. Paid placements are separate.`,
  ],
  [
    "Can you guarantee media coverage?",
    "No. Editorial decisions belong to publications. We do not guarantee coverage, rankings, leads or sales.",
  ],
  [
    "How do you select service providers?",
    "We assess relevant experience, scope fit, availability and commercial terms before proposing a provider. Final selection and costs require approval.",
  ],
  [
    "How long do projects take?",
    "Timelines depend on the scope, approvals and specialist availability. We agree milestones before execution begins.",
  ],
  [
    "Can you handle multiple growth services?",
    "Yes. We can coordinate multiple workstreams within an agreed scope, with clear responsibilities and budgets.",
  ],
  [
    "Do you offer free consultations?",
    `You can send an initial enquiry without a fee. The structured Growth Audit is a separately priced assessment at ${money(plans[0].price)}.`,
  ],
  [
    "How are payments handled?",
    "Approved quotes define payment terms. Fixed packages may use an official hosted Razorpay link when configured. Recurring billing requires separate explicit consent.",
  ],
  [
    "How do I get started?",
    "Use the Growth Plan Finder or tell us about your business through the enquiry form. We will discuss scope before any paid work.",
  ],
];
