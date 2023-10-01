import React, { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';

import PageLoading from 'components/PageLoading/PageLoading';

import paths from 'routes/paths';

// Lazy-load the HomePage and NotFound Page components
const HomePage = lazy(async () => await import('pages/HomePage'));
const NotFound = lazy(async () => await import('pages/NotFound'));

// Define a type for route configuration
interface Routes {
   path: string;
   element: React.ReactNode;
}

// Helper function to wrap a component with Suspense
const getRouteElement = (Component: React.ElementType): React.ReactNode => (
   <Suspense fallback={<PageLoading />}>
      <>
         <Component />
      </>
   </Suspense>
);

// Define an array of route configurations
const routes: Routes[] = [
   { path: paths.HOME, element: getRouteElement(HomePage) }, // Define a route for the HomePage component
   { path: paths.NOT_FOUND, element: getRouteElement(NotFound) }, // Define a route for the NotFound component
];

// Create a browser router using the defined routes
const browserRoutes = createBrowserRouter(routes);

// Export the browser router for use in the application
export default browserRoutes;
