export const PINK = '#FF90E8';

export const products = [
  {
    id: '1',
    title: 'Complete UI Kit 2024',
    creator: 'Sarah Chen',
    creatorId: '1',
    price: 49,
    originalPrice: 79,
    category: 'Design',
    rating: 4.8,
    sales: 1230,
    image: 'https://picsum.photos/seed/uikit24/400/300',
    tags: ['Figma', 'UI', 'Components'],
    description: 'A comprehensive UI kit with 500+ components, 50+ templates, and everything you need to build beautiful products faster. Includes light and dark modes, responsive layouts, and a complete design system.',
    longDescription: 'Built by a senior designer with 10+ years of experience, this kit has everything. Clean, consistent components that actually work in real projects. Includes auto-layout, variables, and interactive components.',
  },
  {
    id: '2',
    title: 'The Freelancer Bible',
    creator: 'Marcus Webb',
    creatorId: '2',
    price: 29,
    originalPrice: 49,
    category: 'Writing',
    rating: 4.9,
    sales: 3420,
    image: 'https://picsum.photos/seed/freelance42/400/300',
    tags: ['Business', 'Freelancing', 'Guide'],
    description: 'Everything I wish I knew before going freelance. 200+ pages of actionable advice, templates, contracts, and scripts. Used by 3,000+ freelancers worldwide.',
    longDescription: 'After 8 years of freelancing and $2M+ in client revenue, I wrote down everything that actually matters. No fluff, just what works.',
  },
  {
    id: '3',
    title: 'Lo-Fi Sample Pack Vol. 3',
    creator: 'Chill Beats Co',
    creatorId: '3',
    price: 15,
    originalPrice: 25,
    category: 'Music',
    rating: 4.7,
    sales: 876,
    image: 'https://picsum.photos/seed/lofi33/400/300',
    tags: ['Samples', 'Lo-Fi', 'Beats'],
    description: '200+ royalty-free samples, loops, and one-shots. Perfect for YouTube creators, streamers, and music producers. All samples are 100% original.',
    longDescription: 'Recorded and processed through vintage gear including a 1970s tape machine and classic outboard compressors. Warm, nostalgic, and ready to use.',
  },
  {
    id: '4',
    title: 'Python Mastery Course',
    creator: 'Alex Kim',
    creatorId: '4',
    price: 79,
    originalPrice: 149,
    category: 'Software',
    rating: 4.9,
    sales: 2100,
    image: 'https://picsum.photos/seed/python44/400/300',
    tags: ['Python', 'Programming', 'Course'],
    description: '15 hours of video content, 50+ projects, and lifetime access. Go from zero to building real Python applications.',
    longDescription: 'Trusted by 2,000+ students. Covers web scraping, data analysis, automation, APIs, and building full applications from scratch.',
  },
  {
    id: '5',
    title: 'Minimal Notion Templates',
    creator: 'Emma Rose',
    creatorId: '5',
    price: 19,
    originalPrice: 29,
    category: 'Design',
    rating: 4.6,
    sales: 5670,
    image: 'https://picsum.photos/seed/notion55/400/300',
    tags: ['Notion', 'Templates', 'Productivity'],
    description: '25 Notion templates for creators, freelancers, and entrepreneurs. Clean, minimal, and actually useful.',
    longDescription: 'Stop rebuilding from scratch. These templates are used by 5,000+ professionals to manage their work, projects, and life.',
  },
  {
    id: '6',
    title: 'Brand Identity Starter Kit',
    creator: 'Studio Bloom',
    creatorId: '6',
    price: 39,
    originalPrice: 69,
    category: 'Design',
    rating: 4.5,
    sales: 920,
    image: 'https://picsum.photos/seed/brand66/400/300',
    tags: ['Branding', 'Identity', 'Logo'],
    description: 'A complete brand identity system including logo templates, color palettes, typography guides, and mockups.',
    longDescription: 'Used by 900+ startups and freelancers. Editable in Figma, Illustrator, and Canva.',
  },
  {
    id: '7',
    title: 'React Component Library',
    creator: 'Dev Forge',
    creatorId: '7',
    price: 59,
    originalPrice: 99,
    category: 'Software',
    rating: 4.8,
    sales: 440,
    image: 'https://picsum.photos/seed/react77/400/300',
    tags: ['React', 'Components', 'TypeScript'],
    description: '100+ production-ready React components with TypeScript, Tailwind CSS, and full accessibility support.',
    longDescription: 'Copy-paste into any React project. No dependencies, just clean, modern components ready for production.',
  },
  {
    id: '8',
    title: 'Photography Lightroom Presets',
    creator: 'Lena Photos',
    creatorId: '8',
    price: 25,
    originalPrice: 45,
    category: 'Photography',
    rating: 4.7,
    sales: 3200,
    image: 'https://picsum.photos/seed/photo88/400/300',
    tags: ['Lightroom', 'Presets', 'Photography'],
    description: '50 professional Lightroom presets for portraits, landscapes, and lifestyle photography.',
    longDescription: 'Developed over 5 years of professional wedding and lifestyle photography. Works on mobile and desktop Lightroom.',
  },
];

export const creators = [
  {
    id: '1',
    name: 'Sarah Chen',
    handle: '@sarahdesigns',
    bio: 'UI/UX Designer & Figma educator. I create design resources that help you build faster.',
    followers: '45.2k',
    avatar: 'https://picsum.photos/seed/sarah1/200/200',
    products: 12,
    totalSales: '$187,000',
    category: 'Design',
    cover: 'https://picsum.photos/seed/sarahcover/800/300',
  },
  {
    id: '2',
    name: 'Marcus Webb',
    handle: '@marcuswebb',
    bio: 'Freelance consultant turned digital creator. I write about business, money, and creative work.',
    followers: '32.1k',
    avatar: 'https://picsum.photos/seed/marcus2/200/200',
    products: 8,
    totalSales: '$94,000',
    category: 'Writing',
    cover: 'https://picsum.photos/seed/marcuscover/800/300',
  },
  {
    id: '3',
    name: 'Chill Beats Co',
    handle: '@chillbeats',
    bio: 'Making lo-fi music and samples for creators worldwide. 5M+ streams on Spotify.',
    followers: '28.9k',
    avatar: 'https://picsum.photos/seed/chill3/200/200',
    products: 15,
    totalSales: '$52,000',
    category: 'Music',
    cover: 'https://picsum.photos/seed/chillcover/800/300',
  },
  {
    id: '4',
    name: 'Alex Kim',
    handle: '@alexcodes',
    bio: 'Software engineer at Google by day, coding educator by night. Making tech accessible.',
    followers: '61.4k',
    avatar: 'https://picsum.photos/seed/alex4/200/200',
    products: 6,
    totalSales: '$231,000',
    category: 'Software',
    cover: 'https://picsum.photos/seed/alexcover/800/300',
  },
  {
    id: '5',
    name: 'Emma Rose',
    handle: '@emmarose',
    bio: 'Productivity nerd. Creator of Notion templates used by 5,000+ people.',
    followers: '19.3k',
    avatar: 'https://picsum.photos/seed/emma5/200/200',
    products: 20,
    totalSales: '$78,000',
    category: 'Design',
    cover: 'https://picsum.photos/seed/emmacover/800/300',
  },
  {
    id: '6',
    name: 'Studio Bloom',
    handle: '@studiobloom',
    bio: 'Brand identity studio. We make beautiful brand kits for startups and solopreneurs.',
    followers: '23.7k',
    avatar: 'https://picsum.photos/seed/bloom6/200/200',
    products: 9,
    totalSales: '$63,000',
    category: 'Design',
    cover: 'https://picsum.photos/seed/bloomcover/800/300',
  },
];

export const blogPosts = [
  {
    id: '1',
    title: 'How I Made $100K Selling Digital Products (and What I Would Do Differently)',
    author: 'Marcus Webb',
    authorId: '2',
    date: 'May 28, 2026',
    category: 'Creator Stories',
    readTime: '8 min read',
    image: 'https://picsum.photos/seed/blog1/800/450',
    excerpt: 'Two years ago I launched my first digital product expecting to make a few hundred dollars. I made $4,200 in the first week. Here\'s everything I learned building to $100K.',
    content: `Two years ago I launched my first digital product expecting to make a few hundred dollars. I made $4,200 in the first week. Here's everything I learned building to $100K.

The first thing most creators get wrong is they spend months making the product before validating demand. I made this mistake with my second product — three months of work, $600 in revenue. Painful.

What actually works: sell before you build. Write the sales page, set up the DigitalNook listing, and share it with your audience. If people pay, build it. If not, you've saved yourself weeks of work.

My three biggest lessons:
1. Your audience is your distribution. No audience = no sales, regardless of product quality.
2. Price higher than you're comfortable with. Most creators underprice by 3-5x.
3. Email list beats social media every time. I have 12,000 subscribers and they drive 80% of my revenue.

The $100K milestone felt good but it wasn't the goal. The goal was freedom — to work on things I care about, with people I respect, on my own schedule. Digital products on DigitalNook gave me that.`,
    tags: ['Creator Stories', 'Revenue', 'Digital Products'],
  },
  {
    id: '2',
    title: 'DigitalNook Product Update: New Analytics Dashboard',
    author: 'DigitalNook Team',
    authorId: '0',
    date: 'May 20, 2026',
    category: 'Product Updates',
    readTime: '4 min read',
    image: 'https://picsum.photos/seed/blog2/800/450',
    excerpt: 'We\'ve completely redesigned our analytics dashboard to give creators deeper insights into their audience, revenue trends, and product performance.',
    content: `We've completely redesigned our analytics dashboard to give creators deeper insights into their audience, revenue trends, and product performance.

What's new:

**Revenue Trends** — See your daily, weekly, and monthly revenue at a glance. Compare periods to understand growth.

**Customer Insights** — Learn where your customers come from, how they find your products, and what they buy next.

**Product Performance** — Which products are trending? Which ones need a refresh? Now it's easy to see.

**Conversion Funnel** — See exactly where people drop off between viewing your product and completing purchase.

We're rolling this out to all creators over the next two weeks. You'll get an email when it's live on your account.

As always, tell us what you think. We read every piece of feedback.`,
    tags: ['Product Update', 'Analytics', 'Features'],
  },
  {
    id: '3',
    title: 'The Creator Economy is Not Dying. It\'s Maturing.',
    author: 'Sarah Chen',
    authorId: '1',
    date: 'May 15, 2026',
    category: 'Industry',
    readTime: '6 min read',
    image: 'https://picsum.photos/seed/blog3/800/450',
    excerpt: 'Every few months a think-piece drops declaring the creator economy is over. It\'s not. What\'s happening is more interesting: the ecosystem is growing up.',
    content: `Every few months a think-piece drops declaring the creator economy is over. It's not. What's happening is more interesting: the ecosystem is growing up.

Early creator economy: anyone could post, go viral, and make money. The barrier was low, the rewards were high, and it felt like pure magic.

Now: the bar is higher. Audiences are more selective. Generic content doesn't cut it anymore. But creators who go deep, build real relationships, and create genuine value? They're doing better than ever.

The creators I know who are struggling have one thing in common: they're chasing trends. The ones thriving are building something specific for someone specific.

That specificity is what platforms like DigitalNook enable. You don't need millions of followers. You need a few thousand people who care deeply about what you make.

The creator economy isn't dying. It's just finally requiring creators to actually create.`,
    tags: ['Industry', 'Creator Economy', 'Trends'],
  },
  {
    id: '4',
    title: 'How to Price Your Digital Product (Without Guessing)',
    author: 'Emma Rose',
    authorId: '5',
    date: 'May 8, 2026',
    category: 'Business Tips',
    readTime: '5 min read',
    image: 'https://picsum.photos/seed/blog4/800/450',
    excerpt: 'Most creators underprice their products by 3-5x. Here\'s a framework for pricing that actually reflects your value.',
    content: `Most creators underprice their products by 3-5x. Here's a framework for pricing that actually reflects your value.

The instinct to underprice is understandable. You want people to buy it. You worry higher prices will put people off. You feel weird charging a lot for something that "only took you a few hours."

Here's the reframe: people don't pay for your time. They pay for the result your product delivers.

If your Notion template saves someone 5 hours a week, and their time is worth $50/hour, you've delivered $250/month in value. Charging $19 isn't generous — it's leaving money on the table.

My pricing framework:
1. Calculate the value the customer gets (in time, money, or stress saved)
2. Price at 10-20% of that value
3. Raise the price with every 100 sales
4. Never lower the price — use coupon codes instead

The most common objection: "but nobody will pay that much." Test it first. You'll be surprised.`,
    tags: ['Business Tips', 'Pricing', 'Strategy'],
  },
  {
    id: '5',
    title: 'Building a $50K/Year Business with Notion Templates',
    author: 'Emma Rose',
    authorId: '5',
    date: 'April 30, 2026',
    category: 'Creator Stories',
    readTime: '7 min read',
    image: 'https://picsum.photos/seed/blog5/800/450',
    excerpt: 'I started selling Notion templates as a side project. Eighteen months later, it\'s my primary income source.',
    content: `I started selling Notion templates as a side project. Eighteen months later, it's my primary income source.

The beginning was slow. Really slow. My first month: $180. I almost gave up. My partner encouraged me to give it six months before deciding.

Month six: $2,400. Something had clicked.

What changed between month one and month six: I stopped making templates I thought were cool and started making templates that solved specific problems. My best-selling template is for freelancers tracking client projects. Not glamorous. Extremely useful.

The other thing that changed: I started treating it like a business. Proper product pages, email follow-ups, customer interviews. When I understood what my customers actually used the templates for, I got much better at making them.

DigitalNook made the business side invisible so I could focus on making things. That matters more than most people realize.`,
    tags: ['Creator Stories', 'Notion', 'Income'],
  },
  {
    id: '6',
    title: 'Why We Keep Our Fee Simple',
    author: 'DigitalNook Team',
    authorId: '0',
    date: 'April 22, 2026',
    category: 'Company',
    readTime: '3 min read',
    image: 'https://picsum.photos/seed/blog6/800/450',
    excerpt: 'Other platforms have complex tier structures and hidden fees. We charge 10% and nothing else. Here\'s why.',
    content: `Other platforms have complex tier structures and hidden fees. We charge 10% and nothing else. Here's why.

When DigitalNook started, we experimented with different pricing models. Monthly fees, tiered plans, feature unlocks. Every model we tried had the same problem: it punished small creators.

If you're making $500/month selling digital products, a $30/month platform fee is 6% of your revenue before you've sold a single thing. That's not a partnership — it's a subscription.

So we went simple: 10% of what you make. Nothing upfront, nothing monthly, no feature gates. If you make $100, we make $10. If you make $100,000, we make $10,000.

This model aligns our incentives with yours. We do better when you do better. There's no version of this where we win and you lose.

Simple, transparent, fair. That's what we're building.`,
    tags: ['Company', 'Pricing', 'Values'],
  },
];

export const categories = [
  { name: 'Design', count: 4821, icon: '✦', color: '#FF90E8' },
  { name: 'Software', count: 3240, icon: '◈', color: '#B9F0A1' },
  { name: 'Writing', count: 2890, icon: '◉', color: '#FFE580' },
  { name: 'Music', count: 1560, icon: '◎', color: '#A8D8FF' },
  { name: 'Photography', count: 1340, icon: '◐', color: '#FFB7A3' },
  { name: 'Education', count: 2100, icon: '◑', color: '#D4B8FF' },
];

export const jobs = [
  {
    id: '1',
    title: 'Senior Product Designer',
    department: 'Design',
    type: 'Full-time',
    location: 'Remote',
    description: 'We\'re looking for a senior product designer to help shape the future of DigitalNook\'s creator experience.',
  },
  {
    id: '2',
    title: 'Staff Software Engineer',
    department: 'Engineering',
    type: 'Full-time',
    location: 'Remote',
    description: 'Build the infrastructure that powers millions of creator transactions every year.',
  },
  {
    id: '3',
    title: 'Creator Success Manager',
    department: 'Support',
    type: 'Full-time',
    location: 'Remote',
    description: 'Help our creators grow their businesses and get the most out of DigitalNook.',
  },
  {
    id: '4',
    title: 'Growth Marketing Lead',
    department: 'Marketing',
    type: 'Full-time',
    location: 'Remote',
    description: 'Drive creator acquisition and help DigitalNook reach the next million creators.',
  },
  {
    id: '5',
    title: 'Data Analyst',
    department: 'Data',
    type: 'Full-time',
    location: 'Remote',
    description: 'Turn creator data into insights that drive product decisions and creator success.',
  },
  {
    id: '6',
    title: 'Content Writer',
    department: 'Marketing',
    type: 'Contract',
    location: 'Remote',
    description: 'Create compelling content that helps creators succeed and attracts new ones to DigitalNook.',
  },
];

export const teamMembers = [
  {
    id: '1',
    name: 'Sahil Lavingia',
    role: 'Founder & CEO',
    bio: 'Started DigitalNook at 19. Believes in a world where anyone can make a living from their creativity.',
    avatar: 'https://picsum.photos/seed/sahil/200/200',
  },
  {
    id: '2',
    name: 'Dana Rodriguez',
    role: 'Head of Product',
    bio: 'Previously at Stripe and Square. Obsessed with making creator tools as simple as possible.',
    avatar: 'https://picsum.photos/seed/dana/200/200',
  },
  {
    id: '3',
    name: 'James Park',
    role: 'Head of Engineering',
    bio: 'Built payment systems at Braintree. Believes good infrastructure is invisible.',
    avatar: 'https://picsum.photos/seed/james/200/200',
  },
  {
    id: '4',
    name: 'Priya Patel',
    role: 'Head of Creator Success',
    bio: 'Former creator herself with $200k+ in digital product revenue. Knows the journey from the inside.',
    avatar: 'https://picsum.photos/seed/priya/200/200',
  },
  {
    id: '5',
    name: 'Marcus Liu',
    role: 'Head of Design',
    bio: 'Designed for Apple and Airbnb. Brings bold, opinionated design to everything we ship.',
    avatar: 'https://picsum.photos/seed/marcusliu/200/200',
  },
  {
    id: '6',
    name: 'Sofia Ahmed',
    role: 'Head of Marketing',
    bio: 'Grew Notion\'s creator community to 1M+. Now doing the same for DigitalNook.',
    avatar: 'https://picsum.photos/seed/sofia/200/200',
  },
];
