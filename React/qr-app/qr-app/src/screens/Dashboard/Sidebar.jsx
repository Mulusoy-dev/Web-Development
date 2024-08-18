import sidebarLogo from "../../assets/images/tms_logo_png.png";
import { RiDashboardHorizontalLine } from "react-icons/ri";
import { MdDriveFolderUpload } from "react-icons/md";
import { SiNginxproxymanager } from "react-icons/si";
import { FaUsers } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="w-64 flex flex-col h-screen bg-neutral-900 p-3">
      <div className="flex-1 flex flex-col">
        <div className="flex items-center gap-2 px-2 py-2">
          <img src={sidebarLogo} className="w-24 h-10 my-5" />
          {/* <span className="text-neutral-100 text-lg">TMSQR</span> */}
        </div>

        <ul>
          <Link to="/admin/dashboard">
            <div className="flex flex-row gap-2 justify-start items-center px-2  py-3 hover:bg-slate-600 hover:rounded-md cursor-pointer">
              <RiDashboardHorizontalLine className="text-white text-lg" />
              <li className="text-white">Dashboard</li>
            </div>
          </Link>

          <Link to="/admin/dashboard/upload">
            <div className="flex flex-row gap-2 justify-start items-center  px-2 py-3 hover:bg-slate-600 hover:rounded-md cursor-pointer">
              <MdDriveFolderUpload className="text-white text-lg" />
              <li className="text-white">Upload Product</li>
            </div>
          </Link>

          <Link to="/admin/dashboard/manage">
            <div className="flex flex-row gap-2 justify-start items-center  px-2 py-3 hover:bg-slate-600 hover:rounded-md cursor-pointer">
              <SiNginxproxymanager className="text-white text-lg" />
              <li className="text-white">Manage Product</li>
            </div>
          </Link>

          <div className="flex flex-row gap-2 justify-start items-center  px-2 py-3 hover:bg-slate-600 hover:rounded-md cursor-pointer">
            <FaUsers className="text-white " />
            <li className="text-white">Users</li>
          </div>
          <div className="flex flex-row gap-2 justify-start items-center  px-2 py-3 hover:bg-slate-600 hover:rounded-md cursor-pointer">
            <BiLogOut className="text-white " />
            <li className="text-white">Log Out</li>
          </div>
        </ul>
      </div>
      {/* section 2 */}
      <div className="text-white px-2 hover:rounded-md">Section 2</div>
    </div>
  );
};

export default Sidebar;
