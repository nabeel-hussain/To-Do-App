import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from '../components/PageLoading';
import Page from '../components/Page/Page';

import paths from '../routes/paths';

const Home = lazy(async () => await import('../pages/Home/Home'));
const NotFound = lazy(async () => await import('../pages/NotFound'));

interface Routes {
   path: string;
   element: React.ReactNode;
}

const getRouteElement = (Component: React.ElementType): React.ReactNode => (
   <Suspense fallback={<PageLoading />}>
      <Page>
         <Component />
      </Page>
   </Suspense>
);

const routes: Routes[] = [
   { path: paths.HOME, element: getRouteElement(Home) },
   { path: paths.NOT_FOUND, element: getRouteElement(NotFound) },
];
const browserRoutes = createBrowserRouter(routes);
export default browserRoutes;
