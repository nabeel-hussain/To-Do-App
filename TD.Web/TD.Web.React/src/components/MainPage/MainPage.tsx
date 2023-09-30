import React from 'react';
import { MDBContainer } from 'mdb-react-ui-kit';

interface PageProps {
   children: React.ReactNode | React.ReactNode[];
}

const MainPage : React.FC<PageProps> = ({ children }: PageProps) => {

   return <MDBContainer className="py-5">  {children}  </MDBContainer>

};

export default MainPage;