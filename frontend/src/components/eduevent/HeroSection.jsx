import { useNavigate } from "react-router-dom";
import EdueventButton from "./EdueventBtn";

const HeroSection = () => {
  const navigate = useNavigate(); // Harus di dalam komponen

  return (
    <div className="relative">
      <div className="w-full h-[709px] relative overflow-hidden">
        <img
          src="/img/eduevent/img_2596_1.png"
          alt="Students collaborating"
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 flex flex-col justify-center items-center text-center">
          <h1 className="font-poppins font-bold text-[60px] text-white mb-4">
            Selamat Datang
          </h1>
          <h2 className="font-poppins font-bold text-[60px] text-white">
            Di Edu event
          </h2>
        </div>
      </div>

      <div className="bg-[#1f467a] py-8">
        <div className="container mx-auto px-4 flex justify-between items-center">
          <div className="max-w-md">
            <h2 className="font-poppins font-bold text-[30px] leading-[46px] text-white">
              Raih kesempatan untuk mendapatkan beasiswa
            </h2>
          </div>

          <EdueventButton
            variant="primary"
            className="w-[295px] h-[40px] flex items-center justify-center"
            onClick={() => navigate("/scholarshiphub")}
          >
            Selengkapnya
          </EdueventButton>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
