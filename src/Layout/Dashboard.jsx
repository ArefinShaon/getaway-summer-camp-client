import { NavLink, Outlet } from "react-router-dom";
import {
  FaWallet,
  FaGraduationCap,
  FaHome,
  FaCartArrowDown,
} from "react-icons/fa";

const Dashboard = () => {
  return (
    <div className="drawer lg:drawer-open bg-green-50">
      <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
      <div className="drawer-content flex flex-col  justify-center">
        <Outlet></Outlet>
        <label
          htmlFor="my-drawer-2"
          className="btn btn-success drawer-button m-24 lg:hidden"
        >
          Open Dashboard
        </label>
      </div>
      <div className="drawer-side">
        <label htmlFor="my-drawer-2" className="drawer-overlay"></label>
        <ul className="menu p-4 w-80 h-full bg-green-200 text-base-content">
          <li>
            <NavLink to="/dashboard/manageUser">
              <FaCartArrowDown></FaCartArrowDown>
              My Selected Classes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/reservations">
              <FaGraduationCap></FaGraduationCap> My Enrolled Classes
            </NavLink>
          </li>
          <li>
            <NavLink to="/dashboard/history">
              <FaWallet></FaWallet> Payment History
            </NavLink>
          </li>

          <div className="divider"></div>
          <li>
            <NavLink to="/">
              <FaHome></FaHome> Home
            </NavLink>{" "}
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Dashboard;
