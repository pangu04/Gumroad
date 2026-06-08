import { createBrowserRouter } from 'react-router';
import { Layout } from './Layout';
import { Discover } from './pages/Discover';
import { Blog } from './pages/Blog';
import { BlogDetail } from './pages/BlogDetail';
import { Pricing } from './pages/Pricing';
import { Features } from './pages/Features';
import { About } from './pages/About';
import { Jobs } from './pages/Jobs';
import { StartSelling } from './pages/StartSelling';
import { Login } from './pages/Login';
import { ProductDetail } from './pages/ProductDetail';
import { CreatorProfile } from './pages/CreatorProfile';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Layout,
    children: [
      { index: true, Component: Discover },
      { path: 'discover', Component: Discover },
      { path: 'blog', Component: Blog },
      { path: 'blog/:id', Component: BlogDetail },
      { path: 'pricing', Component: Pricing },
      { path: 'features', Component: Features },
      { path: 'about', Component: About },
      { path: 'jobs', Component: Jobs },
      { path: 'start-selling', Component: StartSelling },
      { path: 'login', Component: Login },
      { path: 'product/:id', Component: ProductDetail },
      { path: 'creator/:id', Component: CreatorProfile },
    ],
  },
]);
