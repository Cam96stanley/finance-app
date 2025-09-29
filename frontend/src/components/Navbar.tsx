import { NavLink, Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <nav className="bg-gray-900 pt-2 px-4 gap-4 flex justify-around items-stretch fixed bottom-0 w-full rounded-t-md">
        <NavLink
          to={'/dashboard'}
          className={({ isActive }) =>
            `flex md:flex-col items-center justify-center flex-1 cursor-pointer py-2 ${
              isActive ? 'bg-white border-b-4 border-b-green rounded-t-md' : ''
            }`
          }
        >
          <img
            className="w-4"
            src="/images/icon-nav-overview.svg"
            alt="icon of a house"
          />
          <p className="text-gray-500 text-xs font-bold hidden md:flex md:mt-1">
            Overview
          </p>
        </NavLink>
        <NavLink
          to={'/transactions'}
          className={({ isActive }) =>
            `flex md:flex-col items-center justify-center flex-1 cursor-pointer py-2 ${
              isActive ? 'bg-white border-b-4 border-b-green rounded-t-md' : ''
            }`
          }
        >
          <img
            className="w-4"
            src="/images/icon-nav-transactions.svg"
            alt="icon of two arrows going up and down"
          />
          <p className="text-gray-500 text-xs font-bold hidden md:flex md:mt-1">
            Transactions
          </p>
        </NavLink>
        <NavLink
          to={'/budgets'}
          className={({ isActive }) =>
            `flex md:flex-col items-center justify-center flex-1 cursor-pointer py-2 ${
              isActive ? 'bg-white border-b-4 border-b-green rounded-t-md' : ''
            }`
          }
        >
          <img
            className="w-4"
            src="/images/icon-nav-budgets.svg"
            alt="icon of a pie chart"
          />
          <p className="text-gray-500 text-xs font-bold hidden md:flex md:mt-1">
            Budgets
          </p>
        </NavLink>
        <NavLink
          to={'/pots'}
          className={({ isActive }) =>
            `flex md:flex-col items-center justify-center flex-1 cursor-pointer py-2 ${
              isActive ? 'bg-white border-b-4 border-b-green rounded-t-md' : ''
            }`
          }
        >
          <img
            className="w-4"
            src="/images/icon-nav-pots.svg"
            alt="icon of a bag with a dollar sign on it"
          />
          <p className="text-gray-500 text-xs font-bold hidden md:flex md:mt-1">
            Pots
          </p>
        </NavLink>
        <NavLink
          to={'/bills'}
          className={({ isActive }) =>
            `flex md:flex-col items-center justify-center flex-1 cursor-pointer text-green py-2 ${
              isActive ? 'bg-white border-b-4 border-b-green rounded-t-md' : ''
            }`
          }
        >
          <img
            className="w-4"
            src="/images/icon-nav-recurring-bills.svg"
            alt="icon of a bill"
          />
          <p className="text-gray-500 text-xs font-bold hidden md:flex md:mt-1">
            Recurring Bills
          </p>
        </NavLink>
      </nav>
      <div className="pb-20">
        <Outlet />
      </div>
    </>
  );
};
