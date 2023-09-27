import React from 'react';
import pageStyles from 'components/page/Page.module.scss';

interface PageProps {
   children: React.ReactNode | React.ReactNode[];
}

const Page : React.FC<PageProps> = ({ children }: PageProps) => {
   return <div className={pageStyles.page}>{children}</div>;
};

export default Page;