import smileImg from "/img/eduacademy/smile.png";

const HeroEduacademy = () => {
  return (
    <section
      className="relative text-white min-h-screen flex items-center overflow-hidden"
      style={{ background: "linear-gradient(to right, #265899, #0D1D33)" }}
    >
      {/* Container for content */}
      <div className="container mx-auto px-6 md:px-12 flex flex-col md:flex-row items-center">
        <div className="z-20 w-full md:w-1/2 order-1 md:order-1">
          <div className="max-w-xl text-left">
            <h1 className="text-6xl md:text-7xl font-semibold leading-tight text-white mb-6">
              <span>Good</span> <span className="text-[#DDA853]">Coaching</span>{" "}
              <span>Is good</span> <span>teaching</span>{" "}
              <span>& nothing else</span>
            </h1>
            <a
              href="#more2"
              className="inline-block mt-4 bg-blue-500 hover:bg-blue-400 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              View Webinar
            </a>
          </div>
        </div>

        <div className="z-10 w-full md:w-1/2 order-2 md:order-2 flex justify-center md:justify-end">
          <img
            src={smileImg}
            alt="Students"
            className="w-full max-w-[550px] object-contain mb-0"
          />
        </div>
      </div>
    </section>
  );
};

export default HeroEduacademy;
