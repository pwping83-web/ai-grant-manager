import { createBrowserRouter } from 'react-router';

import { Landing } from './pages/Landing';
import { Onboarding } from './pages/Onboarding';
import { Results } from './pages/Results';
import { Dashboard } from './pages/Dashboard';
import { GrantDetail } from './pages/GrantDetail';
import { AIWriter } from './pages/AIWriter';
import { MyPage } from './pages/MyPage';
import { Terms } from './pages/Terms';
import { Privacy } from './pages/Privacy';
import { BusinessInfo } from './pages/BusinessInfo';
import { Pricing } from './pages/Pricing';
import { SubmitDocuments } from './pages/SubmitDocuments';
import { Login } from './pages/Login';
import { UserLayout } from './components/layout/UserLayout';
import { AdminLayout } from './components/layout/AdminLayout';
import { AdminDashboard } from './pages/admin/AdminDashboard';
import { AdminGrants } from './pages/admin/AdminGrants';
import { AdminMembers } from './pages/admin/AdminMembers';
import { AdminTemplates } from './pages/admin/AdminTemplates';
import { PersonalDashboard } from './pages/PersonalDashboard';
import { PersonalProfileGrants } from './pages/PersonalProfileGrants';
import { Personal2026Shortcut } from './pages/Personal2026Shortcut';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: Landing,
  },
  {
    path: '/onboarding',
    Component: Onboarding,
  },
  {
    path: '/results',
    Component: Results,
  },
  {
    path: '/submit-documents',
    Component: SubmitDocuments,
  },
  {
    path: '/login',
    Component: Login,
  },
  {
    path: '/terms',
    Component: Terms,
  },
  {
    path: '/privacy',
    Component: Privacy,
  },
  {
    path: '/business-info',
    Component: BusinessInfo,
  },
  {
    path: '/pricing',
    Component: Pricing,
  },
  {
    path: '/personal',
    Component: PersonalDashboard,
  },
  {
    path: '/personal/2026',
    Component: Personal2026Shortcut,
  },
  {
    path: '/personal/2026',
    Component: Personal2026Shortcut,
  },
  {
    path: '/personal/:profileId',
    Component: PersonalProfileGrants,
  },
  {
    path: '/grant/:id',
    Component: GrantDetail,
  },
  {
    path: '/ai-writer',
    Component: AIWriter,
  },
  {
    Component: UserLayout,
    children: [
      { path: '/dashboard', Component: Dashboard },
      { path: '/mypage', Component: MyPage },
    ],
  },
  {
    Component: AdminLayout,
    children: [
      { path: '/admin', Component: AdminDashboard },
      { path: '/admin/grants', Component: AdminGrants },
      { path: '/admin/members', Component: AdminMembers },
      { path: '/admin/templates', Component: AdminTemplates },
    ],
  },
]);
