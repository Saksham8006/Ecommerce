import { Link } from 'react-router-dom';
import DropdownMessage from './DropdownMessage';
import DropdownNotification from './DropdownNotification';
import DropdownUser from './DropdownUser';
import React, { useEffect, useRef, useState } from 'react';
import ContactHeaderIcon from '../../assets/ContactHeaderIcon.svg'
import ZIcon from '../../assets/Zicon.svg'


interface HeaderProps {
  sidebarOpen: string | Boolean | undefined;
  setSidebarOpen: (isOpen: Boolean) => void;
}

const Header: React.FC<HeaderProps> = (props) => {
  const [quictActionOpen, setQuickActionOpen] = useState<Boolean>(false);
  const quickActionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        quictActionOpen &&
        quickActionRef.current &&
        !quickActionRef.current.contains(event.target as Node)
      ) {
        setQuickActionOpen(false);
      }
    };

    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, [quictActionOpen]);


  return (
    <div
      ref={quickActionRef}
      className="sticky top-0 z-999">
      <header className="  z-999 flex w-full bg-white shadow-lg ">
        <div className="flex flex-grow items-center justify-between px-4 py-4 shadow-2 md:px-6 2xl:px-11">
          <div className="flex items-center gap-2 sm:gap-4 lg:hidden">
            {/* <!-- Hamburger Toggle BTN --> */}
            <button
              aria-controls="sidebar"
              onClick={(e) => {
                e.stopPropagation();
                props.setSidebarOpen(!props.sidebarOpen);
              }}
              className="z-99999 block rounded-sm border border-stroke bg-white p-1.5 shadow-sm  lg:hidden"
            >
              <span className="relative block h-5.5 w-5.5 cursor-pointer">
                <span className="du-block absolute right-0 h-full w-full">
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-[0] duration-200 ease-in-out  ${!props.sidebarOpen && '!w-full delay-300'
                      }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-150 duration-200 ease-in-out  ${!props.sidebarOpen && 'delay-400 !w-full'
                      }`}
                  ></span>
                  <span
                    className={`relative left-0 top-0 my-1 block h-0.5 w-0 rounded-sm bg-black delay-200 duration-200 ease-in-out  ${!props.sidebarOpen && '!w-full delay-500'
                      }`}
                  ></span>
                </span>
                <span className="absolute right-0 h-full w-full rotate-45">
                  <span
                    className={`absolute left-2.5 top-0 block h-full w-0.5 rounded-sm bg-black delay-300 duration-200 ease-in-out  ${!props.sidebarOpen && '!h-0 !delay-[0]'
                      }`}
                  ></span>
                  <span
                    className={`delay-400 absolute left-0 top-2.5 block h-0.5 w-full rounded-sm bg-black duration-200 ease-in-out  ${!props.sidebarOpen && '!h-0 !delay-200'
                      }`}
                  ></span>
                </span>
              </span>
            </button>
            {/* <!-- Hamburger Toggle BTN --> */}

            <Link className="block flex-shrink-0 lg:hidden" to="/">
              <img src={ZIcon} alt="Logo" />
            </Link>
          </div>

          <div

            className="flex gap-[10px] cursor-pointer">


          </div>


          <div className="flex items-center gap-3 2xsm:gap-7">
            <ul className="flex items-center gap-2 2xsm:gap-4">


              <li className='text-[15px] text-black font-[600] hidden  sm:flex items-center gap-x-[12px]'>
                <span><img src={ContactHeaderIcon} alt="" /></span>
                +0000000000 (Mon to Sun; 9:00AM - 9:00 PM)
              </li>


              <DropdownNotification />


              {/* <!-- Chat Notification Area --> */}
              <DropdownMessage />
              {/* <!-- Chat Notification Area --> */}
            </ul>

            {/* <!-- User Area --> */}
            <DropdownUser />
            {/* <!-- User Area --> */}
          </div>
        </div>
      </header>


    </div>
  );
};

export default Header;