import loginBg from "../assets/images/qr_bg6.jpg";
import logo from "../assets/images/tms_logo_png.png";

const Login = () => {
  return (
    <div className="w-full h-screen flex items-start">
      {/* Image Section */}
      <div className="relative w-1/2 h-full flex flex-col items-center">
        <img src={logo} className="absolute left-[8%] w-40 h-16 my-10" />
        <div className="absolute top-[15%] left-[10%] flex flex-col">
          <h1 className="text-4xl text-white font-bold mb-4 mt-8">
            TMSQR Döküman Yönetim Sistemi
          </h1>
          <p className="text-xl text-white font-normal">
            Verilerinizi hızlı ve güvenli bir şekilde yönetin.
          </p>
        </div>
        <img src={loginBg} className="w-full h-full object-cover" />
      </div>

      {/*  Login Section */}
      <div className="h-full w-1/2 bg-[#F5F5F5] flex flex-col p-24 justify-between items-center">
        <div className="flex flex-row">
          <h1 className="text-xl w-full text-[#060606] font-semibold max-w-[500px] mx-auto">
            Veri Giriş Portal Ekranı
          </h1>
        </div>

        <div className="w-full flex flex-col max-w-[500px]">
          <div className="w-full flex flex-col mb-2">
            <h3 className="text-3xl font-semibold mb-2">Giriş</h3>
            <p className="text-base my-2">
              Tekrar Hoşgeldiniz! Lütfen Giriş Yapınız.
            </p>
          </div>

          <div className="w-full flex flex-col items-center justify-center">
            <input
              className="w-full text-black border-b bg-transparent border-black outline-none focus:outline-none py-2 bg-none my-2"
              type="email"
              placeholder="Email"
            />

            <input
              className="w-full text-black border-b bg-transparent border-black outline-none focus:outline-none py-2 bg-none my-2"
              type="password"
              placeholder="Password"
            />
          </div>

          <div className="flex w-full flex-col my-4">
            <button className="w-full text-white my-2 bg-[#060606] font-semibold rounded-md p-4 text-center flex items-center justify-center cursor-pointers hover:bg-slate-500 ease-in-out duration-300">
              Giriş
            </button>

            {/* <button className="w-full text-[#060606] my-2 bg-white border-2 border-black rounded-md p-4 text-center flex items-center justify-center">
              Kaydol
            </button> */}
          </div>
        </div>

        <div className="w-full flex items-center justify-center">
          <p className="text-sm font-normal text-[#060606]">
            Hesabınız yok mu?{" "}
            <span className="font-semibold underline underline-offset-2 cursor-pointer">
              TMS ARGE ile iletişime geçiniz.
            </span>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
