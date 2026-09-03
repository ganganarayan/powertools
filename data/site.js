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
  brandline: "Six tools that do what the popular apps can't — built for coaches by DivineLeads."
};

const tools = [
  {
    slug: 'assess360',
    name: 'Assess360',
    icon: '🎯',
    kicker: 'Assessment Engine',
    eyebrow: '🎯 Assessment Engine',
    subject: 'Assess360%20%E2%80%94%20question',
    metaTitle: 'Assess360 — assessments that score, segment & report automatically',
    metaDesc: 'Assess360 builds scored, branching 360° assessments that segment leads and deliver instant personalised reports — beyond Google Forms, JotForm, Typeform, AppSheet and ScoreApp.',
    tileLines: [
      'Build scored, branching, <b>360° assessments</b> that segment leads automatically.',
      'Delivers a <b>personalised result page &amp; PDF report</b> the instant someone finishes.',
      "What Google Forms, JotForm, Typeform, AppSheet &amp; even ScoreApp <b>can't</b> do — done here."
    ],
    lede: 'Scored, branching, 360° assessments that <b>segment every lead automatically</b> and hand them a personalised result the instant they finish. This is where form builders stop and Assess360 begins.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Multi-dimensional scoring</b> — weight answers, build categories, and produce a real diagnostic, not just a form response.',
      '<b>Smart branching</b> — the next question adapts to the last answer, so every respondent gets a relevant path.',
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
    kicker: 'Smart Video Delivery',
    eyebrow: '🔀 Smart Video Delivery',
    subject: 'A%20Video%20Router%20%E2%80%94%20question',
    metaTitle: 'A Video Router — send every viewer to the right video & next step',
    metaDesc: 'A Video Router builds conditional video journeys that route each viewer by tag, source and behaviour and trigger the next action — the one video job n8n, Pabbly and generic automation can\'t do.',
    tileLines: [
      'Routes each viewer to the <b>right video &amp; next step</b> based on tag, source and behaviour.',
      'Build conditional video journeys that <b>trigger actions</b> — no glue-code funnels.',
      '"I already have n8n / Pabbly / xyz" — this does the one video thing they can\'t.'
    ],
    lede: 'Anyone landing on a "video tool" thinks one thing: <b>"I have n8n, I use Pabbly, I\'ve got xyz — I don\'t need this."</b> Here\'s what breaks that: none of them route a <b>viewer</b> through the right video path and fire the next step. A Video Router does exactly that.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Route by who they are</b> — tag, traffic source, campaign, past behaviour all decide which video plays next.',
      '<b>Conditional journeys</b> — watched 70%? Send to the offer. Bounced? Send to a re-hook. All automatic.',
      '<b>Trigger actions from the video</b> — tag, notify, book, or hand off to your funnel at the right second.',
      '<b>One link, many outcomes</b> — a single share link adapts per viewer instead of a fixed page.',
      '<b>Works with your stack</b> — sits on top of the automation you already run, doing the part it can\'t.'
    ],
    versus: {
      title: "What the others can't do",
      intro: 'Your automation tools move <b>data</b>. None of them move a <b>viewer</b> through video.',
      named: ['n8n', 'Pabbly', 'Zapier', 'Make', 'plain embeds'],
      points: [
        'They react <b>after</b> a webhook. A Video Router decides <b>during</b> the watch.',
        'No viewer-aware branching, no "which video next" logic, no in-video triggers.',
        "You'd have to duct-tape five tools to fake it — and still not get per-viewer routing."
      ],
      punch: "That's the gap this tool was built to close."
    },
    ctaTitle: 'Stop showing everyone the same video.',
    ctaText: 'Route each viewer to the next best step and watch the funnel tighten. Free to start.'
  },

  {
    slug: 'vidapulse',
    name: 'VidaPulse',
    icon: '📈',
    kicker: 'VSL Analytics',
    eyebrow: '📈 VSL Analytics',
    subject: 'VidaPulse%20%E2%80%94%20question',
    metaTitle: 'VidaPulse — VSL analytics that show where the sale is lost',
    metaDesc: 'VidaPulse maps second-by-second VSL drop-off to your pitch and CTA so you know exactly where your video sales letter loses the sale — the conversion layer missing from Wistia and Vidyard.',
    tileLines: [
      'Second-by-second <b>VSL drop-off &amp; attention</b> mapped to your pitch and CTA.',
      'See <b>exactly where your VSL loses the sale</b> — and A/B test the fix.',
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
      '<b>A/B VSL testing</b> — run two versions and let the retention curve pick the winner.'
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
    slug: 'leadengine',
    name: 'LeadEngine',
    icon: '🚀',
    kicker: 'AI Lead-Gen Engine',
    eyebrow: '🚀 AI Lead-Generation Engine',
    subject: 'LeadEngine%20%E2%80%94%20question',
    metaTitle: 'LeadEngine — AI lead-gen to payment to LMS delivery, all in one',
    metaDesc: 'LeadEngine is not a CRM. It runs the full coach flow — lead generation, nurture, payment and LMS course delivery — in one AI-driven engine. The most-demanded tool by coaches.',
    tileLines: [
      'The moment you hear "CRM" you tune out. <b>This isn\'t a CRM.</b>',
      '<b>Lead-gen → nurture → payment → LMS delivery</b>, all in one flow.',
      'The most-demanded tool by coaches — capture to cash to course, automatically.'
    ],
    lede: 'The second someone says "CRM", coaches tune out — <b>so let\'s be clear: this is not a CRM.</b> LeadEngine is one AI-driven engine that carries a stranger from <b>lead-gen → nurture → payment → course delivery in your LMS</b>. Capture to cash to classroom, in one place.',
    heroNote: 'Free to start · No credit card · The most-demanded tool by coaches',
    whatTitle: 'The whole journey, one engine',
    whatItDoes: [
      '<b>Lead generation</b> — capture pages, forms and quiz hand-offs feed leads straight in.',
      '<b>AI nurture</b> — follow-ups that qualify and warm leads without you babysitting a pipeline.',
      '<b>Payment</b> — take the sale in-flow; no bouncing the buyer to a disconnected checkout.',
      '<b>LMS delivery</b> — the course unlocks automatically the moment payment clears.',
      '<b>One record end-to-end</b> — the same lead, from first click to enrolled student.'
    ],
    versus: {
      title: 'Why not "just a CRM"?',
      intro: "A CRM stores contacts and stops. Coaches don't need a filing cabinet — they need the <b>path to enrolment</b> to run itself.",
      named: ['Generic CRMs', 'Spreadsheets', 'Checkout + LMS glued together'],
      points: [
        'No more stitching a form tool, a payment tool and an LMS with fragile automations.',
        'Payment and course access are <b>one continuous flow</b>, not three logins.',
        'Built around how coaches actually sell and deliver — not generic sales teams.'
      ],
      punch: "Call it an engine, because that's what it is."
    },
    ctaTitle: 'From lead to enrolled student — on autopilot.',
    ctaText: 'Spin up your LeadEngine free and connect lead-gen, payment and delivery in one flow.'
  },

  {
    slug: 'cloudbridge',
    name: 'CloudBridge',
    icon: '☁️',
    kicker: 'Cloud-to-Cloud Transfer',
    eyebrow: '☁️ Cloud-to-Cloud Transfer',
    subject: 'CloudBridge%20%E2%80%94%20question',
    metaTitle: 'CloudBridge — move data between any two clouds, seamlessly',
    metaDesc: 'CloudBridge transfers and syncs data directly between any two clouds — Google Drive, Dropbox, OneDrive, S3 and more — with no downloading or re-uploading.',
    tileLines: [
      'Move &amp; sync data between <b>any two clouds</b> — Drive, Dropbox, OneDrive, S3 and more.',
      'No downloading, no re-uploading — <b>seamless direct transfer</b>.',
      'Migrate a whole coaching library in a few clicks.'
    ],
    lede: 'Move your cloud data between <b>any two clouds, seamlessly</b> — no downloading to your laptop, no dragging files, no waiting on your home internet. Point source, point destination, and CloudBridge carries it cloud-to-cloud.',
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
    slug: 'pulse-email',
    name: 'Pulse Email',
    icon: '✉️',
    kicker: 'SMTP Email Sender',
    eyebrow: '✉️ SMTP Email Sender',
    subject: 'Pulse%20Email%20%E2%80%94%20question',
    metaTitle: 'Pulse Email — connect any SMTP and send single, bulk or scheduled email',
    metaDesc: 'Pulse Email sends single, bulk and scheduled email through any SMTP server you connect, and receives webhooks from anywhere to trigger and log mail. Your provider, your deliverability, no per-email markup.',
    tileLines: [
      '<b>Single, bulk &amp; scheduled</b> sends — connect <b>any SMTP server</b> and it just sends.',
      '<b>Receive webhooks from anywhere</b> to trigger and log email.',
      'Your provider, your deliverability, no per-email markup.'
    ],
    lede: 'Connect <b>any SMTP server</b> and Pulse Email just sends — <b>single, bulk or scheduled</b>. Then it <b>receives webhooks from anywhere</b> to trigger and log mail. Your provider, your deliverability, no per-email markup on top.',
    heroNote: 'Free to start · No credit card',
    whatTitle: 'What it does',
    whatItDoes: [
      '<b>Single send</b> — fire a one-off email in seconds.',
      '<b>Bulk send</b> — push a broadcast to your whole list.',
      '<b>Scheduled send</b> — queue email to go out at the right time, automatically.',
      '<b>Bring any SMTP</b> — Gmail, Zoho, Amazon SES, your host, any provider — plug it in and send.',
      '<b>Inbound webhooks</b> — receive a webhook from any app and let it trigger or log a send.'
    ],
    versus: {
      title: 'Why bring-your-own-SMTP wins',
      intro: 'Most senders lock you to their pipes and mark up every thousand emails.',
      named: ['Locked-in ESPs', 'Per-email pricing', 'No inbound webhook'],
      points: [
        'You keep <b>your</b> sending reputation and provider — not theirs.',
        'No per-email markup riding on volume you already pay for.',
        'Webhook-in means the rest of your stack can trigger mail without extra glue.'
      ],
      punch: 'Connect it, and it sends.'
    },
    ctaTitle: 'Your SMTP. Single, bulk, scheduled — done.',
    ctaText: 'Connect a server free and send your first campaign through your own pipes.'
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
