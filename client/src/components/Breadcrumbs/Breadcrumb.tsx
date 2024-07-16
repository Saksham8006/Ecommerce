import React, { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface BreadcrumbProps {
  pageName: ReactNode;
  icon: ReactNode;
  homeIcon: ReactNode;
}

const Breadcrumb = ({ pageName, icon, homeIcon }: BreadcrumbProps) => {
  return (
    <div className="my-2 flex flex-col sm:flex-row bg-white h-[50%]">
      <p className='mt-[8px]'>
        {icon}
      </p>
      <h2 className="text-[20px] mt-[8px] font-semibold text-black pr-[40px] ml-[-3%]">
        {pageName}
      </h2>
      <div className='border-r border-slate-200'>
      </div>
      <Link to="/"><p className='text-black mt-[14px] text-[20px] pl-[30px]'>{homeIcon}</p></Link>
    </div>
  );
};

export default Breadcrumb;
