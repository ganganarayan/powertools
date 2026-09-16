'use strict';

/**
 * Single source of truth for site content.
 * Fields containing markup (lede, tileLines, whatItDoes, versus.*) are rendered
 * with EJS unescaped tags <%- %> in the templates.
 */

const contact = {
  wa: '9356819176',
  waLink: 'https://wa.me/919356819176',
  email: 'connect@divineleads.guru'
};

const site = {
  name: 'Power Tools for Coaches',
  domain: 'powertools.divineleads.guru',
  brandline: "Six tools that do what the popular apps can't — built for coaches by DivineLeads.",
  assetVersion: '5'
};

const tools = [
  {
    slug: 'assess360',
    name: 'Assess360',
    icon: '🎯',
    kicker: 'Assessment Engine',
    eyebrow: '🎯 Assessment Engine',
    subject: 'Assess360%20%E2%80%94%20question',
    appUrl: 'https://assess360.divineleads.guru',
    metaTitle: 'Assess360 — assessments that score, segment & report automatically',
    metaDesc: 'Assess360 builds scored, multi-section 360° assessments that segment leads and deliver instant personalised reports — beyond Google Forms, JotForm, Typeform, AppSheet and ScoreApp.',
    symptom: 'Half your calls were dead before they booked — and you found out too late.',
    cure: 'Scores and segments leads <b>before</b> they ever reach your calendar.',
    tileLines: [
      'Build scored, multi-section <b>360° assessments</b> that segment leads automatically.',
      '<b>Reduces lead cost &amp; qualifies</b> — filters out the leads that would waste your calendar.',
      'Delivers a <b>personalised result page &amp; PDF report</b> the instant someone finishes.',
      "What Google Forms, JotForm, Typeform, AppSheet &amp; even ScoreApp <b>can't</b> do — done here."
    ],
    lede: 'Scored, multi-dimensional 360° assessments that <b>segment every lead automatically</b> and hand them a personalised result the instant they finish. This is where form builders stop and Assess360 begins.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Multi-dimensional scoring</b> — weight answers, build categories, and produce a real diagnostic, not just a form response.',
      '<b>Result tiers</b> — map score ranges to tailored outcomes, so each band gets its own message.',
      '<b>360° / multi-rater</b> — collect self + peer + coach input and roll it into one picture.',
      '<b>Instant personalised report</b> — a tailored result page and downloadable PDF the moment they submit.',
      '<b>Auto-segmentation &amp; lead scoring</b> — respondents are tagged and prioritised for follow-up automatically.'
    ],
    versus: {
      title: "What the others can't do",
      intro: "You've tried to force this into the usual tools. They break exactly where it matters:",
      named: ['Google Forms', 'JotForm', 'Typeform', 'AppSheet', 'ScoreApp'],
      points: [
        'They <b>collect answers</b>. Assess360 <b>diagnoses and segments</b>.',
        'They give a "thank you" screen. Assess360 gives a <b>personalised report</b>.',
        'No true 360° multi-rater roll-up. No weighted, category-based scoring that a coach can actually act on.'
      ],
      punch: 'That gap is the reason Assess360 exists.'
    },
    ctaTitle: 'Turn a quiz into a qualified, segmented pipeline.',
    ctaText: 'Build your first scored assessment free and see the personalised report your leads receive.'
  },

  {
    slug: 'a-video-router',
    name: 'A Video Router',
    icon: '🔀',
    kicker: 'Intelligent Video Routing',
    eyebrow: '🔀 Intelligent Video Routing',
    subject: 'A%20Video%20Router%20%E2%80%94%20question',
    appUrl: 'https://avr.divineleads.guru',
    metaTitle: 'A Video Router — route any video from source to destination, automatically',
    metaDesc: 'A Video Router pulls a recording from Zoom, Fathom, local disk or any source, publishes it to YouTube, your LMS or cloud, sets the YouTube title and description, and deletes the Zoom copy — all from one place.',
    symptom: 'Your best recording failed at 92% — and sessions rot in a folder.',
    cure: 'One-move route Zoom / Fathom / disk → YouTube / LMS / cloud, <b>big files included</b>.',
    tileLines: [
      'Pull a recording from <b>Zoom / Fathom / local disk</b> → publish to <b>YouTube, your LMS, cloud</b> in one move.',
      '<b>Set the YouTube title &amp; description</b> and <b>delete the Zoom copy</b> — without opening either.',
      'No heavy locked-in subscription, no big files dropping midway, no juggling five steps.'
    ],
    lede: 'A big recording, and then the grind: a pricey locked-in tool, uploads that <b>drop midway</b> on large files, and five manual steps across Zoom, YouTube and your LMS. A Video Router does the whole hop in one move — <b>pull the video, publish it, set the YouTube title &amp; description, and delete the Zoom copy</b> — without you ever opening Zoom or YouTube.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Pull from the source</b> — Zoom &amp; Fathom recordings, local disk, cloud drives, direct links.',
      '<b>Publish to any destination</b> — YouTube, your LMS, cloud storage, and more.',
      '<b>Edit metadata in-flow</b> — set or change the YouTube title &amp; description right from here.',
      '<b>Clean up automatically</b> — delete the recording from Zoom once it is safely routed.',
      '<b>Handles big files</b> — large videos that drop midway elsewhere go through in one pass.'
    ],
    versus: {
      title: "What the others can't do",
      intro: "The pain isn't moving a file once — it's the locked-in cost, the drop-offs, and the endless tab-juggling.",
      named: ['Heavy locked-in subscriptions', 'n8n / Pabbly / Zapier', 'Manual download + re-upload'],
      points: [
        "They can't <b>delete the recording from Zoom</b> for you — you go back and do it by hand.",
        "They can't <b>set or edit the YouTube title &amp; description</b> without you opening YouTube.",
        "Big files drop midway, and you're left juggling Zoom, YouTube and your LMS across tabs."
      ],
      punch: 'A Video Router owns the whole hop end to end — one move, no tab-juggling.'
    },
    ctaTitle: 'One move: recorded → published → cleaned up.',
    ctaText: 'Route a Zoom recording to YouTube and your LMS, set its title, and clear the Zoom copy — automatically. Free to start.'
  },

  {
    slug: 'vidapulse',
    name: 'VidaPulse',
    icon: '📈',
    kicker: 'VSL Analytics',
    eyebrow: '📈 VSL Analytics',
    subject: 'VidaPulse%20%E2%80%94%20question',
    appUrl: 'https://vidapulse.io',
    metaTitle: 'VidaPulse — VSL analytics that show where the sale is lost',
    metaDesc: 'VidaPulse maps second-by-second VSL drop-off to your pitch and CTA so you know exactly where your video sales letter loses the sale — the conversion layer missing from Wistia and Vidyard.',
    symptom: 'Your VSL loses them at the same second — and you\'ve never seen which one.',
    cure: 'Second-by-second drop-off, <b>mapped to your pitch</b>.',
    tileLines: [
      'Second-by-second <b>VSL drop-off &amp; attention</b> mapped to your pitch and CTA.',
      '<b>Download the sec-by-sec CSV</b> to analyse with your trained AI — pinpoint where the sale slips.',
      'The conversion layer missing from Wistia &amp; Vidyard.'
    ],
    lede: "Your VSL is doing the selling — so why are you flying blind on it? VidaPulse shows the <b>exact second the sale slips away</b>, second by second, mapped to your hook, pitch and CTA. It's the missing conversion layer that Wistia and Vidyard never gave you.",
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Second-by-second retention</b> — see the precise drop-off curve of your VSL, not vague averages.',
      '<b>Pitch &amp; CTA markers</b> — overlay your key moments so you know which line loses viewers.',
      '<b>Per-viewer engagement</b> — who watched, who re-watched, who bailed before the offer.',
      '<b>Conversion correlation</b> — tie watch-behaviour to who actually bought.',
      '<b>A/B VSL testing</b> — run two versions and let the retention curve pick the winner.',
      '<b>Download second-by-second CSV</b> — export the raw retention data and analyse it with your own trained AI.'
    ],
    versus: {
      title: "What the others can't do",
      intro: 'General video hosts measure "views". A VSL lives or dies on <b>where attention breaks against the pitch</b>.',
      named: ['Wistia', 'Vidyard', 'YouTube analytics'],
      points: [
        'They show plays and heatmaps. VidaPulse shows <b>drop-off tied to your sales beats</b>.',
        'No CTA-aware analysis, no conversion correlation, no VSL A/B built for coaches.',
        'You end up guessing which line to fix. VidaPulse points at it.'
      ],
      punch: 'That missing layer is exactly what VidaPulse is.'
    },
    ctaTitle: "Find the line that's costing you sales.",
    ctaText: 'Add VidaPulse to your VSL free and read the retention curve against your pitch.'
  },

  {
    slug: 'revenue-os',
    name: 'Revenue OS',
    icon: '💰',
    logo: '/logos/revenue-os.svg',
    kicker: 'Revenue Operating System',
    eyebrow: '💰 Revenue Operating System',
    subject: 'Revenue%20OS%20%E2%80%94%20question',
    appUrl: 'https://revenueos.divineleads.guru',
    metaTitle: 'Revenue OS — the revenue operating system for coaches',
    metaDesc: 'Revenue OS runs your whole coach revenue on one system — lead generation, nurture, calendar booking, payment with 0 transaction fee, order bumps, upsells and LMS delivery — in one AI-driven revenue operating system. The most-demanded tool by coaches.',
    symptom: 'Your revenue lives in six disconnected apps — and nobody owns the number.',
    cure: 'One system: capture → nurture → calendar → payment → LMS, <b>0 transaction fee</b>.',
    tileLines: [
      'You think "CRM." <b>It\'s not — it\'s your revenue operating system.</b>',
      '<b>Lead-gen → nurture → calendar → payment → LMS delivery</b>, one flow — <b>0 transaction fee</b>.',
      '<b>Revenue-generating systems built in</b> — order bumps, upsells, follow-up and one revenue dashboard.'
    ],
    lede: 'You hear "CRM" and tune out — <b>so let\'s be clear: this isn\'t a CRM, it\'s your revenue operating system.</b> Revenue OS carries a stranger from <b>lead-gen → nurture → calendar → payment → course delivery in your LMS</b> — with order bumps, upsells and <b>zero transaction fees</b>. Capture to cash to classroom, on one number.',
    heroNote: 'Free to start · No credit card · The most-demanded tool by coaches',
    whatTitle: 'The revenue engine, one system',
    whatItDoes: [
      '<b>Lead generation</b> — capture pages, forms and quiz hand-offs feed leads straight in.',
      '<b>AI nurture</b> — follow-ups that qualify and warm leads without you babysitting a pipeline.',
      '<b>Calendar &amp; booking</b> — leads book the call in-flow, no separate scheduler bolted on.',
      '<b>Payment, 0 transaction fee</b> — take the sale in-flow, with order bumps and upsells built in.',
      '<b>LMS delivery</b> — the course unlocks automatically the moment payment clears.',
      '<b>One revenue dashboard</b> — every lead from first click to paying, enrolled student, on one number.'
    ],
    versus: {
      title: 'Why not "just a CRM"?',
      intro: "A CRM stores contacts and stops. Coaches don't need a filing cabinet — they need the <b>system that makes the revenue</b> to run itself.",
      named: ['Generic CRMs', 'Spreadsheets', 'Checkout + LMS glued together'],
      points: [
        'No more stitching a form tool, a payment tool and an LMS with fragile automations.',
        'Payment, upsells and course access are <b>one continuous revenue flow</b>, not three logins.',
        'Built around how coaches actually make money — not generic sales teams.'
      ],
      punch: "It's not a CRM — it's the system that makes the revenue."
    },
    ctaTitle: 'Run your whole revenue on one system.',
    ctaText: 'Spin up Revenue OS free and connect lead-gen, payment and delivery — with zero transaction fees.'
  },

  {
    slug: 'cloud-copyz',
    name: 'Cloudz Copy',
    icon: '☁️',
    kicker: 'Cloud-to-Cloud Transfer',
    eyebrow: '☁️ Cloud-to-Cloud Transfer',
    subject: 'Cloudz%20Copy%20%E2%80%94%20question',
    appUrl: 'https://cloudzcopy.divineleads.guru',
    metaTitle: 'Cloudz Copy — move data between any two clouds, seamlessly',
    metaDesc: 'Cloudz Copy transfers and syncs data directly between any two clouds — Google Drive, Dropbox, OneDrive, S3 and more — with no downloading or re-uploading.',
    symptom: 'Your whole library is stuck in the wrong cloud — and moving it feels like surgery.',
    cure: 'Direct cloud-to-cloud, <b>no download / re-upload</b>.',
    tileLines: [
      'Move &amp; sync data between <b>any two clouds</b> — Drive, Dropbox, OneDrive, S3 and more.',
      'No downloading, no re-uploading — <b>seamless direct transfer</b>.',
      'Migrate a whole coaching library in a few clicks.'
    ],
    lede: 'Move your cloud data between <b>any two clouds, seamlessly</b> — no downloading to your laptop, no dragging files, no waiting on your home internet. Point source, point destination, and Cloudz Copy carries it cloud-to-cloud.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Any-to-any transfer</b> — Google Drive, Dropbox, OneDrive, S3 and more, in any direction.',
      '<b>Direct cloud-to-cloud</b> — data moves between providers, not through your device.',
      '<b>Migrate or sync</b> — a one-time move of a whole library, or keep two clouds mirrored.',
      '<b>Bulk &amp; folders</b> — whole trees, not one file at a time.',
      '<b>No local bandwidth</b> — big coaching libraries move without pinning your connection.'
    ],
    versus: {
      title: 'Why it beats the manual way',
      intro: 'The usual "download everything, then re-upload" costs hours, bandwidth and disk space.',
      named: ['Download + re-upload', 'Provider-locked transfers', 'Manual drag &amp; drop'],
      points: [
        'No round-trip through your laptop and no filling your drive.',
        "Not locked to one vendor's ecosystem — bridge <b>across</b> providers.",
        'Set it, let it run, come back to a moved library.'
      ],
      punch: 'Seamless is the whole point.'
    },
    ctaTitle: 'Switch clouds without the download marathon.',
    ctaText: 'Bridge your first transfer free and move a folder between two providers in minutes.'
  },

  {
    slug: 'ai-gita-mentor',
    name: 'AI Gita Mentor',
    icon: '🕉️',
    kicker: 'AI Wisdom Mentor',
    eyebrow: '🕉️ AI Wisdom Mentor',
    subject: 'AI%20Gita%20Mentor%20%E2%80%94%20question',
    appUrl: 'https://ai.applygitawisdom.com',
    metaTitle: 'AI Gita Mentor — an always-on mentor grounded in Bhagavad Gita wisdom',
    metaDesc: 'AI Gita Mentor answers life, leadership and mindset questions with guidance grounded in the Bhagavad Gita — pointing to the verse behind every answer, available 24/7 for you and your clients.',
    symptom: 'Your clients spiral between sessions — and you can\'t be on call 24/7.',
    cure: 'An always-on mentor grounded in <b>Bhagavad Gita wisdom</b>, answering anytime.',
    tileLines: [
      'Ask any question and get guidance <b>grounded in the Bhagavad Gita</b> — with the verse behind it.',
      'A <b>24/7 wisdom companion</b> for you and your clients, between every session.',
      'Not generic AI fluff — <b>rooted in the Gita</b>, not made up.'
    ],
    lede: 'Your clients don\'t stop needing guidance when the call ends — but you can\'t be on call at 2am. <b>AI Gita Mentor</b> is an always-on mentor grounded in the <b>Bhagavad Gita</b>: ask it anything and it answers from the text, pointing to the verse behind the guidance.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Ask anything</b> — career, conflict, fear, focus, purpose — and get a grounded answer, not a platitude.',
      '<b>Rooted in the Gita</b> — guidance drawn from Bhagavad Gita teachings, with the relevant verse cited.',
      '<b>Always on</b> — your clients get support the moment they need it, not just in the next session.',
      '<b>Conversational</b> — it holds the thread and meets each person where they actually are.',
      '<b>Yours to share</b> — hand it to your audience as a wisdom companion that keeps them close to your work.'
    ],
    versus: {
      title: "What generic AI can't do",
      intro: 'Ask a general chatbot for Gita guidance and it improvises — sometimes inventing verses that were never in the text.',
      named: ['Generic AI chatbots', 'Motivational quote apps', 'A web search'],
      points: [
        'They paraphrase a vibe. AI Gita Mentor answers <b>from the Gita</b> and points to the verse.',
        'No 24/7 companion your clients can actually lean on between sessions.',
        'Quotes without context vs. wisdom applied to the exact situation they\'re in.'
      ],
      punch: "Wisdom that's grounded, not guessed."
    },
    ctaTitle: 'Give your people a mentor that never sleeps.',
    ctaText: 'Try AI Gita Mentor free and ask it the question your client asked you last week.'
  }
];

const policies = [
  { slug: 'privacy',    label: 'Privacy Policy',         title: 'Privacy Policy',              metaTitle: 'Privacy Policy — Power Tools for Coaches',              metaDesc: 'Privacy Policy for the Power Tools for Coaches suite by DivineLeads.' },
  { slug: 'terms',      label: 'Terms & Conditions',     title: 'Terms & Conditions',          metaTitle: 'Terms & Conditions — Power Tools for Coaches',          metaDesc: 'Terms and Conditions for the Power Tools for Coaches suite by DivineLeads.' },
  { slug: 'refund',     label: 'Refund & Cancellation',  title: 'Refund & Cancellation Policy', metaTitle: 'Refund & Cancellation Policy — Power Tools for Coaches', metaDesc: 'Refund and Cancellation Policy for the Power Tools for Coaches suite by DivineLeads.' },
  { slug: 'delivery',   label: 'Delivery Policy',        title: 'Service Delivery Policy',      metaTitle: 'Delivery Policy — Power Tools for Coaches',             metaDesc: 'Service Delivery Policy for the Power Tools for Coaches suite by DivineLeads. All products are digital and delivered electronically.' },
  { slug: 'cookies',    label: 'Cookie Policy',          title: 'Cookie Policy',               metaTitle: 'Cookie Policy — Power Tools for Coaches',               metaDesc: 'Cookie Policy for the Power Tools for Coaches suite by DivineLeads.' },
  { slug: 'disclaimer', label: 'Disclaimer',             title: 'Disclaimer',                  metaTitle: 'Disclaimer — Power Tools for Coaches',                  metaDesc: 'Disclaimer for the Power Tools for Coaches suite by DivineLeads.' }
];

module.exports = { contact, site, tools, policies };
