import { Outlet } from 'react-router-dom';

export const Navbar = () => {
  return (
    <>
      <div>
        <p>Navbar</p>
      </div>

      <Outlet />
    </>
  );
};
