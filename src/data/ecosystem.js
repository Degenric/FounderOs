export const STAKEHOLDERS = [
  {
    id: "enterprise",
    label: "Enterprise",
    angle: 35,
    color: "#22c55e",
    icon: "Building2",
    tagline: "Innovation through startup collaboration",
    provides: [
      "$$ subscription to platform",
      "Pilot budget & real use cases for startups",
      "Brand credibility to the ecosystem",
    ],
    gets: [
      "Curated startup dealflow per innovation thesis",
      "Vetted pilot candidates on demand",
      "Local access to strategic markets",
      "Media appearance & PR visibility",
    ],
    touchpoints: {
      features: ["dealflow", "perks"],
      irl: ["content", "retreat", "demo"],
      media: ["education"],
      tiers: ["seed", "pre-series-a"],
    },
    examples: [
      { id: "softtek", name: "Softtek", logo: "/logos/softtek.png", oneliner: "Sponsoring Q1 startup pilot in nearshoring tech innovation", status: "current", articleUrl: null },
      { id: "grupokuo", name: "Grupo KUO", logo: "/logos/grupokuo.png", oneliner: "Curated dealflow access for their agri-food innovation arm", status: "current", articleUrl: null },
      { id: "arcacontinental", name: "Arca Continental", logo: "/logos/arcacontinental.png", oneliner: "Exploring pilot program for supply chain optimization startups", status: "pipeline", articleUrl: null },
    ],
  },
  {
    id: "web3",
    label: "Web3 Protocols",
    angle: 0,
    color: "#a855f7",
    icon: "Hexagon",
    tagline: "Protocol-aligned startup investment & exposure",
    provides: [
      "$$ subscription or cohort / flagship sponsorship",
      "Grants for portfolio distribution",
      "Technical thesis alignment (RFS)",
    ],
    gets: [
      "Vetted dealflow pipeline aligned with protocol",
      "Local market access & community presence",
      "Media appearance & content series feature",
      "Enterprise facilitation via startup collaboration",
    ],
    touchpoints: {
      features: ["dealflow", "community", "syndicate"],
      irl: ["school", "content", "demo"],
      media: ["docoseries", "education"],
      tiers: ["seed", "pre-series-a"],
    },
    examples: [
      { id: "bitso", name: "Bitso", logo: "/logos/bitso.png", oneliner: "Grants distribution to 3 portfolio companies in the MTY cohort", status: "current", articleUrl: null },
      { id: "ripio", name: "Ripio", logo: "/logos/ripio.png", oneliner: "RFS aligned with DeFi infrastructure thesis for LATAM founders", status: "pipeline", articleUrl: null },
    ],
  },
  {
    id: "govs",
    label: "GOVs",
    angle: 325,
    color: "#ec4899",
    icon: "Landmark",
    tagline: "Public sector backing for ecosystem credibility",
    provides: [
      "Market endorsement & regulatory cover",
      "Facilities — co-working & event space",
      "$$ operational funding (OPEX)",
    ],
    gets: [
      "Startup ecosystem activity in territory",
      "Economic development & innovation credibility",
      "Visibility with high-growth founders",
    ],
    touchpoints: {
      features: ["community", "perks"],
      irl: ["retreat", "demo"],
      media: ["education"],
      tiers: ["seed"],
    },
    examples: [
      { id: "conacyt", name: "CONACYT", logo: "/logos/conacyt.png", oneliner: "Facility partnerships + OPEX funding for the MTY founding cohort", status: "current", articleUrl: null },
      { id: "promexico", name: "ProMéxico", logo: "/logos/promexico.png", oneliner: "Market endorsement for upcoming FinTech regulatory program", status: "pipeline", articleUrl: null },
    ],
  },
  {
    id: "vc",
    label: "Investors",
    angle: 295,
    color: "#f59e0b",
    icon: "TrendingUp",
    tagline: "Capital partners across stages and instruments",
    subcategories: [
      {
        id: "vc_sub",
        label: "VC",
        color: "#f59e0b",
        tagline: "Institutional capital with thesis alignment",
        provides: [
          "Dealflow sharing with Founders OS",
          "Co-investment capacity in vetted companies",
        ],
        gets: [
          "Access to pre-screened founder network",
          "Early visibility into cohort companies",
          "Co-investment in high-conviction deals",
        ],
      },
      {
        id: "angels_sub",
        label: "Angels",
        color: "#fbbf24",
        tagline: "Individual investors via the syndicate",
        provides: [
          "Retail capital via syndicate participation",
          "Network intros & operator experience",
        ],
        gets: [
          "Access to curated SPV deal flow",
          "Demo Day invitations & cohort visibility",
          "Pre-screened deal memos & milestone tracking",
        ],
      },
    ],
    provides: [
      "Dealflow sharing with Founders OS",
      "Co-investment capacity in vetted companies",
    ],
    gets: [
      "Access to pre-screened founder network",
      "Early visibility into cohort companies",
      "Co-investment in high-conviction deals",
    ],
    touchpoints: {
      features: ["dealflow", "syndicate"],
      irl: ["demo"],
      media: [],
      tiers: ["pre-series-a"],
    },
    examples: [
      { id: "ignia", name: "Ignia", logo: "/logos/ignia.png", oneliner: "Co-investment in 2 portfolio companies with active dealflow sharing", status: "current", articleUrl: null },
      { id: "dalus", name: "Dalus Capital", logo: "/logos/dalus.png", oneliner: "Joint pre-screening process for pre-Series A candidates", status: "pipeline", articleUrl: null },
    ],
  },
  {
    id: "serviceProviders",
    label: "Service Providers",
    angle: 245,
    color: "#f97316",
    icon: "Wrench",
    tagline: "Revenue from perks and media commercial placements",
    provides: [
      "$$ revenue share on perks conversion",
      "$$ media commercial placements",
    ],
    gets: [
      "Access to high-intent founder audience",
      "Brand exposure across content & events",
      "Distribution via curated perks marketplace",
    ],
    touchpoints: {
      features: ["perks"],
      irl: ["content"],
      media: ["docoseries", "doMoreFaster"],
      tiers: [],
    },
    examples: [
      { id: "aws", name: "AWS Activate", logo: "/logos/aws.png", oneliner: "Credits perks program driving 40% conversion in Q4 cohort", status: "current", articleUrl: null },
      { id: "stripe", name: "Stripe Atlas", logo: "/logos/stripe.png", oneliner: "Revenue share deal for incorporation perks in the marketplace", status: "pipeline", articleUrl: null },
    ],
  },
  {
    id: "creators",
    label: "Founders",
    angle: 107,
    color: "#10b981",
    icon: "Users",
    tagline: "The core output — builders at every stage",
    subcategories: [
      {
        id: "creators_sub",
        label: "Creators",
        color: "#10b981",
        tagline: "Creator-founders bridging audience and startups",
        provides: [
          "Authentic founder-led content & storytelling",
          "Community engagement & peer referrals",
          "Distribution reach via creator audience",
        ],
        gets: [
          "Media visibility — Docoseries & Do More Faster",
          "Brand partnership & sponsorship opportunities",
          "Content school & production support",
        ],
      },
      {
        id: "seed_sub",
        label: "Seed",
        color: "#34d399",
        tagline: "Early-stage builders validating their thesis",
        provides: [
          "Early traction data & authentic case studies",
          "Community engagement & peer referrals",
        ],
        gets: [
          "Perks marketplace — tools, credits, legal",
          "Accelerator school programs & workshops",
          "Community networking access",
          "Mentor introductions",
        ],
      },
      {
        id: "post_seed_sub",
        label: "Post Seed",
        color: "#6ee7b7",
        tagline: "Growth-stage founders scaling to Series A",
        provides: [
          "Portfolio success stories & proof points",
          "Dealflow referrals to ecosystem partners",
        ],
        gets: [
          "Syndicate & co-investment via SPVs",
          "Enterprise pilot opportunities",
          "Demo Day access & investor introductions",
          "Pre-Series A preparation & support",
        ],
      },
    ],
    provides: [
      "Startup case studies & authentic content",
      "Community engagement & peer referrals",
      "Real builder credibility to the ecosystem",
    ],
    gets: [
      "Access to investors & enterprise via dealflow",
      "Media visibility — docoseries, content, PR",
      "Perks marketplace — tools, credits, legal",
      "Accelerator programs, mentors & demo days",
      "Co-investment opportunities via syndicate",
    ],
    touchpoints: {
      features: ["community", "perks", "dealflow", "syndicate"],
      irl: ["retreat", "content", "school", "mentors", "demo"],
      media: ["doMoreFaster", "docoseries", "education"],
      tiers: ["seed", "pre-series-a"],
    },
    examples: [
      { id: "platzi", name: "Platzi", logo: "/logos/platzi.png", oneliner: "Co-produced founder retreat with 60% ticket margin retained", status: "current", articleUrl: null },
      { id: "luisito", name: "Luisito Comunica", logo: "/logos/luisito.png", oneliner: "Popup event series targeting creator-founder crossover audience", status: "pipeline", articleUrl: null },
    ],
  },
];

// ─── Founders OS Core Features ────────────────────────────────────────────────
export const CORE_FEATURES = [
  {
    id: "dealflow",
    label: "Dealflow Sharing",
    desc: "Curated startup dealflow shared with VC partners and enterprise sponsors",
    stakeholders: ["vc", "enterprise", "web3", "founders"],
    how: "Founders OS screens startups through structured cohorts and builds a curated pipeline. Each quarter, vetted companies are presented to VC and enterprise partners with a structured brief — thesis match, traction metrics, and intro request. Partners get early access before public fundraising rounds begin.",
    screenshot: null,
  },
  {
    id: "community",
    label: "Networking Community",
    desc: "Vetted founder and investor community with curated introductions",
    stakeholders: ["enterprise", "web3", "creators", "govs", "founders"],
    how: "A private community of vetted founders, investors, and operators. Access is earned through cohort participation or partner sponsorship. Monthly curated intros are facilitated based on stated thesis and stated needs — no cold messaging, only warm paths.",
    screenshot: null,
  },
  {
    id: "syndicate",
    label: "Syndicate / Retail Invest",
    desc: "Co-investment syndicate open to retail and institutional investors",
    stakeholders: ["vc", "web3", "founders"],
    how: "High-conviction portfolio companies open SPVs for co-investment alongside lead VCs. Founders OS structures and syndicates retail and protocol capital through a carried-interest model with transparent deal memos and milestone tracking.",
    screenshot: null,
  },
  {
    id: "perks",
    label: "Perks Marketplace",
    desc: "Exclusive perks and services from ecosystem service providers",
    stakeholders: ["serviceProviders", "govs", "creators", "founders"],
    how: "Service providers list offers — credits, tools, legal, infra — in a curated marketplace. Cohort founders access them at zero cost or preferential terms. Conversion is tracked by Founders OS, and revenue is shared monthly with contributing providers.",
    screenshot: null,
  },
];

// ─── Media Arm ────────────────────────────────────────────────────────────────
export const MEDIA_ITEMS = [
  {
    id: "education",
    label: "Education",
    desc: "Structured learning tracks for founders at every stage",
    stakeholders: ["enterprise", "web3", "govs", "founders"],
    how: "Curriculum built around the most common failure modes in early-stage startups. Delivered as async video modules plus live workshops. Enterprise and protocol partners sponsor tracks aligned with their thesis — giving them brand visibility while funding free access for founders.",
    screenshot: null,
  },
  {
    id: "docoseries",
    label: "Docoseries",
    desc: "Documentary series showcasing real founder journeys",
    stakeholders: ["serviceProviders", "web3", "founders"],
    how: "A cinematic documentary series following 3–5 founders per season through their build journey in real time. Service providers get contextual brand placements. Protocols are featured as infrastructure partners. Distributed on YouTube and partner channels with cross-promotion included.",
    screenshot: null,
  },
  {
    id: "doMoreFaster",
    label: "Do More Faster",
    desc: "Flagship content brand for accelerated growth",
    stakeholders: ["creators", "serviceProviders", "founders"],
    how: "A flagship content brand co-created with top creators in the founder space. Covers frameworks, tools, and high-velocity building mindset. Creators retain 60% of ticket and sponsorship revenue from events produced under the brand. Service providers get featured placement.",
    screenshot: null,
  },
];

// ─── IRL Programs ─────────────────────────────────────────────────────────────
export const IRL_ITEMS = [
  {
    id: "content",
    label: "Content",
    desc: "Founder-first content strategy & production",
    stakeholders: ["creators", "serviceProviders", "enterprise", "founders"],
    how: "In-person content shoots embedded directly into cohort events. Founders participate in interviews, product demos, and storytelling sessions. Enterprise and service provider brands are featured contextually — no overt advertising, just authentic presence alongside real founder stories.",
    screenshot: null,
  },
  {
    id: "retreat",
    label: "Retreat",
    desc: "Immersive off-site founder retreats",
    stakeholders: ["enterprise", "govs", "creators", "founders"],
    how: "3-day curated off-sites for cohort founders and key partners. Deep-work sessions in the morning, strategic conversations in the afternoon. Enterprise partners sponsor and participate as mentors and collaborators — not sponsors with booths. GOVs often provide venue and logistics support.",
    screenshot: null,
  },
  {
    id: "mentors",
    label: "Mentors",
    desc: "Curated 1-to-1 mentor matching",
    stakeholders: ["vc", "enterprise", "founders"],
    how: "A structured 6-week mentorship sprint per cohort. Founders submit their top challenges, and mentors — operators from enterprise partners and VC firms — are matched based on expertise. Sessions are 45 minutes, bi-weekly. Progress is tracked and reported by Founders OS.",
    screenshot: null,
  },
  {
    id: "demo",
    label: "Demo Day",
    desc: "Showcase events for investors and partners",
    stakeholders: ["vc", "enterprise", "web3", "govs", "founders"],
    how: "Bi-annual events where cohort companies pitch to a curated room of VCs, enterprise, and protocol partners. Format: 5-minute pitch plus 5-minute Q&A per company. Followed by structured one-on-one networking sessions. Invite-only — no public access. Media partners cover the event.",
    screenshot: null,
  },
  {
    id: "school",
    label: "School",
    desc: "Structured founder school curriculum",
    stakeholders: ["web3", "govs", "enterprise", "founders"],
    how: "A 12-week intensive for early-stage founders combining Founders OS methodology with live guest sessions from enterprise operators and protocol builders. Applications reviewed by a panel that includes partner stakeholders. Cohort size is capped at 20 companies.",
    screenshot: null,
  },
  {
    id: "contentSchool",
    label: "Content School",
    desc: "Creator & media skills for founders",
    stakeholders: ["creators", "serviceProviders", "founders"],
    how: "A focused 4-week sprint on content creation specifically for founders. Led by top creator partners. Covers distribution strategy, scripting, on-camera presence, and monetization. Co-produced and co-distributed with creator partners — founders graduate with a live channel and first 1,000 followers.",
    screenshot: null,
  },
];

export const INVESTMENT_TIERS = [
  {
    id: "seed",
    label: "Seed",
    equity: "~3% equity",
    color: "#6366f1",
    perks: ["Workshops & group sessions", "Clarity & pivot methodology", "Intros to VCs, grants, and pilots"],
  },
  {
    id: "pre-series-a",
    label: "Pre-Series A",
    equity: "~1% equity",
    color: "#8b9aff",
    perks: ["1-to-1 mentor sessions", "Network launched in MTY", "Feature in founder school", "Shoots with protocols, enterprise & govs", "User acquisition support"],
  },
];

export const TAGLINE = "Dealflow to Enterprise & Protocols — Success cases aspirational";
