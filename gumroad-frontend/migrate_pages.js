const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../src/app/pages');
const destAppDir = path.join(__dirname, 'src/app');

const mappings = [
  { file: 'About.tsx', route: '(public)/about' },
  { file: 'Blog.tsx', route: '(public)/blog' },
  { file: 'BlogDetail.tsx', route: '(public)/blog/[id]' },
  { file: 'CreatorProfile.tsx', route: '(public)/creator/[id]' },
  { file: 'Features.tsx', route: '(public)/features' },
  { file: 'Jobs.tsx', route: '(public)/jobs' },
  { file: 'Pricing.tsx', route: '(public)/pricing' },
  { file: 'ProductDetail.tsx', route: '(public)/product/[id]' },
  { file: 'Login.tsx', route: '(auth)/login' },
  { file: 'StartSelling.tsx', route: '(auth)/start-selling' },
];

mappings.forEach(({ file, route }) => {
  const srcPath = path.join(srcDir, file);
  const destDirPath = path.join(destAppDir, route);
  const destPath = path.join(destDirPath, 'page.tsx');

  if (!fs.existsSync(srcPath)) {
    console.log(`Source file not found: ${srcPath}`);
    return;
  }

  let content = fs.readFileSync(srcPath, 'utf8');

  // 1. Add 'use client'
  content = `'use client';\n\n` + content;

  // 2. Fix react-router imports
  const routerImports = [];
  if (content.includes('useParams')) routerImports.push('useParams');
  if (content.includes('useNavigate')) routerImports.push('useRouter');

  if (routerImports.length > 0) {
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]react-router['"];?/, (match, p1) => {
      let imports = p1.split(',').map(s => s.trim());
      let hasLink = imports.includes('Link');
      let res = '';
      if (hasLink) res += `import Link from 'next/link';\n`;
      res += `import { ${routerImports.join(', ')} } from 'next/navigation';`;
      return res;
    });
  } else {
    content = content.replace(/import\s+{([^}]+)}\s+from\s+['"]react-router['"];?/, (match, p1) => {
      let imports = p1.split(',').map(s => s.trim());
      if (imports.includes('Link')) return `import Link from 'next/link';`;
      return '';
    });
  }

  // 3. Replace useNavigate -> useRouter
  content = content.replace(/const\s+navigate\s*=\s*useNavigate\(\);?/g, 'const router = useRouter();');
  content = content.replace(/navigate\(/g, 'router.push(');

  // 4. Fix relative component/data imports
  // Old: import ... from '../components/...' or '../../components/...'
  // Old: import ... from '../data'
  content = content.replace(/from\s+['"]\.\.\/(?:\.\.\/)?components\/(.*?)['"]/g, "from '@/components/$1'");
  content = content.replace(/from\s+['"]\.\.\/data['"]/g, "from '@/data'");

  // Update specific component paths if they were moved
  content = content.replace(/@\/components\/ProductCard/g, "@/components/product/ProductCard");
  content = content.replace(/@\/components\/CreatorCard/g, "@/components/creator/CreatorCard");
  content = content.replace(/@\/components\/SearchBar/g, "@/components/search/SearchBar");
  content = content.replace(/@\/components\/Header/g, "@/components/layout/Header");
  content = content.replace(/@\/components\/Footer/g, "@/components/layout/Footer");

  // Fix component exports: Next.js pages must have a default export.
  // We'll replace `export function PageName` with `export default function PageName`
  content = content.replace(/export\s+function\s+([A-Z][a-zA-Z0-9_]*)/g, 'export default function $1');

  // Next.js useParams() returns a promise or plain object in client components (in Next.js 14+ it's a plain object but can be async). For Next.js 14 App Router, useParams works similarly for simple strings.
  // In `react-router`, we do `const { id } = useParams()`. It's the same in Next.js `next/navigation`.
  
  // Un-export the layout/page to standard Next.js default export was done above.

  // 5. Ensure `to=` in Links are replaced with `href=`
  // This is tricky with regex, but we can try replacing `<Link to=` with `<Link href=`
  content = content.replace(/<Link([^>]+)to=/g, '<Link$1href=');

  fs.mkdirSync(destDirPath, { recursive: true });
  fs.writeFileSync(destPath, content, 'utf8');
  console.log(`Migrated ${file} -> ${route}/page.tsx`);
});
