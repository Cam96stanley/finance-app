import { useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';

export const Navbar = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <>
      <nav
        className={`bg-gray-900 fixed bottom-0 w-full rounded-t-md flex justify-around items-stretch gap-4 lg:fixed lg:top-0 lg:flex-col lg:h-screen lg:rounded-r-md transition-all duration-300 pr-2 ${
          collapsed
            ? 'lg:-translate-x-full lg:w-56'
            : 'lg:translate-x-0 lg:w-56'
        }`}
      >
        <p className="hidden lg:flex text-white font-bold text-4xl transform scale-y-75 px-8">
          finance
        </p>
        <div className="flex w-full lg:flex-col lg:gap-4 lg:w-auto">
          <NavLink
            to={'/dashboard'}
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center cursor-pointer py-2 px-3 gap-2
     md:flex-col md:gap-0
     lg:justify-start lg:w-full
     ${
       isActive
         ? 'bg-white border-b-4 border-b-green rounded-t-md lg:rounded-r-full lg:border-l-4 lg:border-green lg:border-b-0'
         : ''
     }`
            }
          >
            <img
              className="w-4"
              src="/images/icon-nav-overview.svg"
              alt="icon of a house"
            />
            <p className="text-gray-500 hidden md:block text-xs font-bold md:mt-1">
              Overview
            </p>
          </NavLink>
          <NavLink
            to={'/transactions'}
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center cursor-pointer py-2 px-3 gap-2
     md:flex-col md:gap-0
     lg:justify-start lg:w-full
     ${
       isActive
         ? 'bg-white border-b-4 border-b-green rounded-t-md lg:rounded-r-full lg:border-l-4 lg:border-green lg:border-b-0'
         : ''
     }`
            }
          >
            <img
              className="w-4"
              src="/images/icon-nav-transactions.svg"
              alt="icon of two arrows going up and down"
            />
            <p className="text-gray-500 text-xs font-bold hidden md:block md:mt-1">
              Transactions
            </p>
          </NavLink>
          <NavLink
            to={'/budgets'}
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center cursor-pointer py-2 px-3 gap-2
     md:flex-col md:gap-0
     lg:justify-start lg:w-full
     ${
       isActive
         ? 'bg-white border-b-4 border-b-green rounded-t-md lg:rounded-r-full lg:border-l-4 lg:border-green lg:border-b-0'
         : ''
     }`
            }
          >
            <img
              className="w-4"
              src="/images/icon-nav-budgets.svg"
              alt="icon of a pie chart"
            />
            <p className="text-gray-500 text-xs font-bold hidden md:block md:mt-1">
              Budgets
            </p>
          </NavLink>
          <NavLink
            to={'/pots'}
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center cursor-pointer py-2 px-3 gap-2
     md:flex-col md:gap-0
     lg:justify-start lg:w-full
     ${
       isActive
         ? 'bg-white border-b-4 border-b-green rounded-t-md lg:rounded-r-full lg:border-l-4 lg:border-green lg:border-b-0'
         : ''
     }`
            }
          >
            <img
              className="w-4"
              src="/images/icon-nav-pots.svg"
              alt="icon of a bag with a dollar sign on it"
            />
            <p className="text-gray-500 text-xs font-bold hidden md:block md:mt-1">
              Pots
            </p>
          </NavLink>
          <NavLink
            to={'/bills'}
            className={({ isActive }) =>
              `flex flex-1 items-center justify-center cursor-pointer py-2 px-3 gap-2
     md:flex-col md:gap-0
     lg:justify-start lg:w-full
     ${
       isActive
         ? 'bg-white border-b-4 border-b-green rounded-t-md lg:rounded-r-full lg:border-l-4 lg:border-green lg:border-b-0'
         : ''
     }`
            }
          >
            <img
              className="w-4"
              src="/images/icon-nav-recurring-bills.svg"
              alt="icon of a bill"
            />
            <p className="text-gray-500 text-xs font-bold hidden md:block md:mt-1">
              Recurring Bills
            </p>
          </NavLink>
        </div>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="hidden lg:flex items-center justify-center p-8 text-white text-xs cursor-pointer"
          >
            <img
              className="mr-2"
              src="/images/icon-minimize-menu.svg"
              alt="close menu"
            />
            Close Menu
          </button>
        )}
      </nav>
      {collapsed && (
        <button
          onClick={() => setCollapsed(!collapsed)}
          className={`hidden cursor-pointer lg:flex items-center justify-center absolute bottom-10 left-0 transform transition-all duration-300 ${
            collapsed ? 'translate-x-0' : 'translate-x-[14rem]'
          } bg-gray-900 text-white rounded-r-full w-8 h-20`}
        >
          <img
            className={`transition-transform duration-300 ${
              collapsed ? 'rotate-180' : ''
            }`}
            src="/images/icon-minimize-menu.svg"
            alt="close menu"
          />
        </button>
      )}

      <Outlet />
    </>
  );
};
