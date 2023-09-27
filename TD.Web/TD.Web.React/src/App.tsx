import React from 'react'
import { RouterProvider } from 'react-router-dom';
import Router from 'routes/Router';
import "App.css"
const App: React.FC = () => {
  const s: string = 'application';
  console.log(s);

  return (
    <>
     <RouterProvider router={Router} />
    </>
  );
};

export default App
