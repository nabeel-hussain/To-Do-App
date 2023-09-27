import React from 'react';
import { MDBSpinner } from 'mdb-react-ui-kit';

const PageLoading: React.FC = () => {
    return <div className='text-center'>
    <MDBSpinner role='status'>
      <span className='visually-hidden'>Loading...</span>
    </MDBSpinner>
  </div>;
 };
 
 export default PageLoading;