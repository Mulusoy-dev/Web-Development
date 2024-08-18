import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineSearch,
} from "react-icons/hi";

const Header = () => {
  return (
    <div className="bg-white h-16 px-6 flex justify-between items-center border-b-2 border-gray-200">
      <div className="flex flex-row gap-4 justify-center items-center">
        <h3 className="text-center text-lg">Yönetim Paneli</h3>
        <div className="relative ">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-2"
          />
          <input
            type="text"
            placeholder="Ara..."
            className="text-sm  focus:outline-none active:outline-none h-10 pl-10 w-[24rem] border border-gray-300 rounded-md px-4"
          />
        </div>
      </div>
      <div className="flex items-center gap-2 mr-2">
        <HiOutlineChatAlt
          fontSize={24}
          className="cursor-pointer hover:text-gray-500 active:bg-slate-200"
        />
        <HiOutlineBell
          fontSize={24}
          className="cursor-pointer hover:text-gray-500 active:bg-slate-200"
        />
      </div>
    </div>
  );
};

export default Header;
