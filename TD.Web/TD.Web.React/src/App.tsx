import React from 'react';
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import 'App.css';
import ErrorBoundary from 'components/ErrorBoundary';
const App: React.FC = () => {
   const s: string = 'application';
   console.log(s);

   return (
      <>
         <ErrorBoundary>
            <RouterProvider router={Router} />
         </ErrorBoundary>
      </>
   );
};

export default App;
