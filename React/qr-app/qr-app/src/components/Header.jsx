import {
  HiOutlineBell,
  HiOutlineChatAlt,
  HiOutlineUserCircle,
  HiOutlineHome,
} from "react-icons/hi";

const Header = () => {
  return (
    <div className="bg-transparent h-14 flex justify-between items-center border-b-2 border-gray-200 pb-2 mb-2">
      <div className="flex flex-row gap-4 justify-center items-center">
        <h1 className="text-xl text-gray-900 font-semibold ml-1">
          Ürün Yönetim Sayfası
        </h1>
        {/* <div className="relative ">
          <HiOutlineSearch
            fontSize={20}
            className="text-gray-400 absolute top-1/2 -translate-y-1/2 left-2"
          />
          <input
            type="text"
            placeholder="Ara..."
            className="text-sm  focus:outline-none active:outline-none h-8 pl-10 w-[24rem] border border-gray-300 rounded-md px-4"
          />
        </div> */}
      </div>
      <div className="flex items-center gap-2 mr-2">
        <HiOutlineHome
          fontSize={24}
          className="cursor-pointer hover:text-gray-500 active:bg-slate-200"
        />
        <HiOutlineChatAlt
          fontSize={24}
          className="cursor-pointer hover:text-gray-500 active:bg-slate-200"
        />
        <HiOutlineBell
          fontSize={24}
          className="cursor-pointer hover:text-gray-500 active:bg-slate-200"
        />
        <HiOutlineUserCircle
          fontSize={24}
          className="cursor-pointer hover:text-gray-500 active:bg-slate-200"
        />
      </div>
    </div>
  );
};

export default Header;
