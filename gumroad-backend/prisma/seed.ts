import { PrismaClient } from '../src/generated/client';
import * as dotenv from 'dotenv';
import * as path from 'path';

dotenv.config({ path: path.join(__dirname, '../.env') });

const prisma = new PrismaClient();

async function main() {
  console.log('🌱 Seeding database...');

  // ─── Clean existing data ───
  await prisma.downloadHistory.deleteMany();
  await prisma.wishlist.deleteMany();
  await prisma.review.deleteMany();
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.productFile.deleteMany();
  await prisma.product.deleteMany();
  await prisma.creatorProfile.deleteMany();
  await prisma.category.deleteMany();
  await prisma.user.deleteMany();

  console.log('✅ Cleaned existing data');

  // ─── Categories ───
  const categories = await Promise.all([
    prisma.category.create({
      data: { name: 'Design', slug: 'design', icon: '✦', color: '#FF90E8', productCount: 0 },
    }),
    prisma.category.create({
      data: { name: 'Software', slug: 'software', icon: '◈', color: '#B9F0A1', productCount: 0 },
    }),
    prisma.category.create({
      data: { name: 'Writing', slug: 'writing', icon: '◉', color: '#FFE580', productCount: 0 },
    }),
    prisma.category.create({
      data: { name: 'Music', slug: 'music', icon: '◎', color: '#A8D8FF', productCount: 0 },
    }),
    prisma.category.create({
      data: { name: 'Photography', slug: 'photography', icon: '◐', color: '#FFB7A3', productCount: 0 },
    }),
    prisma.category.create({
      data: { name: 'Education', slug: 'education', icon: '◑', color: '#D4B8FF', productCount: 0 },
    }),
  ]);

  console.log(`✅ Created ${categories.length} categories`);

  // ─── Users & Creator Profiles ───
  const usersData = [
    {
      email: 'sarah@example.com',
      name: 'Sarah Chen',
      handle: 'sarahdesigns',
      bio: 'UI/UX Designer & Figma educator. I create design resources that help you build faster.',
      avatar: 'https://picsum.photos/seed/sarah1/200/200',
      cover: 'https://picsum.photos/seed/sarahcover/800/300',
    },
    {
      email: 'marcus@example.com',
      name: 'Marcus Webb',
      handle: 'marcuswebb',
      bio: 'Freelance consultant turned digital creator. I write about business, money, and creative work.',
      avatar: 'https://picsum.photos/seed/marcus2/200/200',
      cover: 'https://picsum.photos/seed/marcuscover/800/300',
    },
    {
      email: 'chill@example.com',
      name: 'Chill Beats Co',
      handle: 'chillbeats',
      bio: 'Making lo-fi music and samples for creators worldwide. 5M+ streams on Spotify.',
      avatar: 'https://picsum.photos/seed/chill3/200/200',
      cover: 'https://picsum.photos/seed/chillcover/800/300',
    },
    {
      email: 'alex@example.com',
      name: 'Alex Kim',
      handle: 'alexcodes',
      bio: 'Software engineer at Google by day, coding educator by night. Making tech accessible.',
      avatar: 'https://picsum.photos/seed/alex4/200/200',
      cover: 'https://picsum.photos/seed/alexcover/800/300',
    },
    {
      email: 'emma@example.com',
      name: 'Emma Rose',
      handle: 'emmarose',
      bio: 'Productivity nerd. Creator of Notion templates used by 5,000+ people.',
      avatar: 'https://picsum.photos/seed/emma5/200/200',
      cover: 'https://picsum.photos/seed/emmacover/800/300',
    },
    {
      email: 'bloom@example.com',
      name: 'Studio Bloom',
      handle: 'studiobloom',
      bio: 'Brand identity studio. We make beautiful brand kits for startups and solopreneurs.',
      avatar: 'https://picsum.photos/seed/bloom6/200/200',
      cover: 'https://picsum.photos/seed/bloomcover/800/300',
    },
    {
      email: 'devforge@example.com',
      name: 'Dev Forge',
      handle: 'devforge',
      bio: 'Building premium React component libraries for modern web developers.',
      avatar: 'https://picsum.photos/seed/devforge7/200/200',
      cover: 'https://picsum.photos/seed/devforgecover/800/300',
    },
    {
      email: 'lena@example.com',
      name: 'Lena Photos',
      handle: 'lenaphotos',
      bio: 'Professional photographer sharing Lightroom presets and photography tips.',
      avatar: 'https://picsum.photos/seed/lena8/200/200',
      cover: 'https://picsum.photos/seed/lenacover/800/300',
    },
  ];

  const users: any[] = [];
  for (const u of usersData) {
    const user = await prisma.user.create({
      data: {
        email: u.email,
        passwordHash: '$2b$10$placeholder_hash_for_seeding',
        name: u.name,
        role: 'SELLER',
        avatar: u.avatar,
        isActive: true,
        isVerified: true,
        creatorProfile: {
          create: {
            handle: u.handle,
            bio: u.bio,
            coverImage: u.cover,
            socialLinks: { twitter: `https://twitter.com/${u.handle}` },
            followerCount: Math.floor(Math.random() * 50000) + 5000,
          },
        },
      },
    });
    users.push(user);
  }

  console.log(`✅ Created ${users.length} users with creator profiles`);

  // ─── Category map for easy lookup ───
  const catMap: Record<string, string> = {};
  for (const c of categories) {
    catMap[c.name] = c.id;
  }

  // ─── Products ───
  const productsData = [
    {
      title: 'Complete UI Kit 2024',
      slug: 'complete-ui-kit-2024',
      creatorIdx: 0,
      category: 'Design',
      price: 49,
      originalPrice: 79,
      rating: 4.8,
      salesCount: 1230,
      image: 'https://picsum.photos/seed/uikit24/400/300',
      tags: ['Figma', 'UI', 'Components'],
      description: 'A comprehensive UI kit with 500+ components, 50+ templates, and everything you need to build beautiful products faster.',
      longDescription: 'Built by a senior designer with 10+ years of experience, this kit has everything. Clean, consistent components that actually work in real projects.',
    },
    {
      title: 'The Freelancer Bible',
      slug: 'the-freelancer-bible',
      creatorIdx: 1,
      category: 'Writing',
      price: 29,
      originalPrice: 49,
      rating: 4.9,
      salesCount: 3420,
      image: 'https://picsum.photos/seed/freelance42/400/300',
      tags: ['Business', 'Freelancing', 'Guide'],
      description: 'Everything I wish I knew before going freelance. 200+ pages of actionable advice, templates, contracts, and scripts.',
      longDescription: 'After 8 years of freelancing and $2M+ in client revenue, I wrote down everything that actually matters.',
    },
    {
      title: 'Lo-Fi Sample Pack Vol. 3',
      slug: 'lo-fi-sample-pack-vol-3',
      creatorIdx: 2,
      category: 'Music',
      price: 15,
      originalPrice: 25,
      rating: 4.7,
      salesCount: 876,
      image: 'https://picsum.photos/seed/lofi33/400/300',
      tags: ['Samples', 'Lo-Fi', 'Beats'],
      description: '200+ royalty-free samples, loops, and one-shots. Perfect for YouTube creators, streamers, and music producers.',
      longDescription: 'Recorded and processed through vintage gear including a 1970s tape machine and classic outboard compressors.',
    },
    {
      title: 'Python Mastery Course',
      slug: 'python-mastery-course',
      creatorIdx: 3,
      category: 'Software',
      price: 79,
      originalPrice: 149,
      rating: 4.9,
      salesCount: 2100,
      image: 'https://picsum.photos/seed/python44/400/300',
      tags: ['Python', 'Programming', 'Course'],
      description: '15 hours of video content, 50+ projects, and lifetime access. Go from zero to building real Python applications.',
      longDescription: 'Trusted by 2,000+ students. Covers web scraping, data analysis, automation, APIs, and building full applications from scratch.',
    },
    {
      title: 'Minimal Notion Templates',
      slug: 'minimal-notion-templates',
      creatorIdx: 4,
      category: 'Design',
      price: 19,
      originalPrice: 29,
      rating: 4.6,
      salesCount: 5670,
      image: 'https://picsum.photos/seed/notion55/400/300',
      tags: ['Notion', 'Templates', 'Productivity'],
      description: '25 Notion templates for creators, freelancers, and entrepreneurs. Clean, minimal, and actually useful.',
      longDescription: 'Stop rebuilding from scratch. These templates are used by 5,000+ professionals to manage their work, projects, and life.',
    },
    {
      title: 'Brand Identity Starter Kit',
      slug: 'brand-identity-starter-kit',
      creatorIdx: 5,
      category: 'Design',
      price: 39,
      originalPrice: 69,
      rating: 4.5,
      salesCount: 920,
      image: 'https://picsum.photos/seed/brand66/400/300',
      tags: ['Branding', 'Identity', 'Logo'],
      description: 'A complete brand identity system including logo templates, color palettes, typography guides, and mockups.',
      longDescription: 'Used by 900+ startups and freelancers. Editable in Figma, Illustrator, and Canva.',
    },
    {
      title: 'React Component Library',
      slug: 'react-component-library',
      creatorIdx: 6,
      category: 'Software',
      price: 59,
      originalPrice: 99,
      rating: 4.8,
      salesCount: 440,
      image: 'https://picsum.photos/seed/react77/400/300',
      tags: ['React', 'Components', 'TypeScript'],
      description: '100+ production-ready React components with TypeScript, Tailwind CSS, and full accessibility support.',
      longDescription: 'Copy-paste into any React project. No dependencies, just clean, modern components ready for production.',
    },
    {
      title: 'Photography Lightroom Presets',
      slug: 'photography-lightroom-presets',
      creatorIdx: 7,
      category: 'Photography',
      price: 25,
      originalPrice: 45,
      rating: 4.7,
      salesCount: 3200,
      image: 'https://picsum.photos/seed/photo88/400/300',
      tags: ['Lightroom', 'Presets', 'Photography'],
      description: '50 professional Lightroom presets for portraits, landscapes, and lifestyle photography.',
      longDescription: 'Developed over 5 years of professional wedding and lifestyle photography. Works on mobile and desktop Lightroom.',
    },
  ];

  const createdProducts: any[] = [];
  for (const p of productsData) {
    const product = await prisma.product.create({
      data: {
        title: p.title,
        slug: p.slug,
        creatorId: users[p.creatorIdx].id,
        categoryId: catMap[p.category],
        price: p.price,
        originalPrice: p.originalPrice,
        description: p.description,
        longDescription: p.longDescription,
        thumbnail: p.image,
        tags: p.tags,
        status: 'ACTIVE',
        rating: p.rating,
        salesCount: p.salesCount,
        viewCount: Math.floor(Math.random() * 10000) + 1000,
        publishedAt: new Date(),
      },
    });
    createdProducts.push(product);
  }

  console.log(`✅ Created ${createdProducts.length} products`);

  // ─── Update category product counts ───
  for (const cat of categories) {
    const count = await prisma.product.count({
      where: { categoryId: cat.id, status: 'ACTIVE' },
    });
    await prisma.category.update({
      where: { id: cat.id },
      data: { productCount: count },
    });
  }

  console.log('✅ Updated category product counts');

  // ─── Sample Reviews ───
  const reviewUser = await prisma.user.create({
    data: {
      email: 'reviewer@example.com',
      passwordHash: '$2b$10$placeholder_hash_for_seeding',
      name: 'Jane Reviewer',
      role: 'CUSTOMER',
      isActive: true,
      isVerified: true,
    },
  });

  for (const product of createdProducts.slice(0, 4)) {
    await prisma.review.create({
      data: {
        productId: product.id,
        userId: reviewUser.id,
        rating: 5,
        comment: 'Absolutely amazing product! Worth every penny.',
      },
    });
  }

  console.log('✅ Created sample reviews');

  console.log('\n🎉 Seeding completed successfully!');
}

main()
  .catch((e) => {
    console.error('❌ Seed failed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
