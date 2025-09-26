import { Suspense } from 'react';
import { Outlet } from 'react-router-dom';
import './styles/style-init.css';

import './styles/style.css';
import SiteHeader from './components/SiteHeader';
import SiteFooter from './components/SiteFooter';

export default function Entry() {
  return (
    <>
      <SiteHeader />
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
      <SiteFooter />
    </>
  );
}
