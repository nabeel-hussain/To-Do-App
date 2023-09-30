import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import 'App.css';
import ErrorBoundary from 'components/ErrorBoundary';
const App: React.FC = () => {
   return (
      <>
         <ErrorBoundary>
            <RouterProvider router={Router} />
         </ErrorBoundary>
      </>
   );
};

export default App;
