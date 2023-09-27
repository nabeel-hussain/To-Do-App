import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/page-loading/PageLoading';
import Page from 'components/page/Page';

import paths from 'routes/paths';

const Home = lazy(async () => await import('pages/home/Home'));
// const PageNotFound = lazy(() => import('pages/page-not-found/PageNotFound'));

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
//    { path: paths.NOT_FOUND, element: getRouteElement(PageNotFound) },
];
const browserRoutes = createBrowserRouter(routes)
export default browserRoutes;