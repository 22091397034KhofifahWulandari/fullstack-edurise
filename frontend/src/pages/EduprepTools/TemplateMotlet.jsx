import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

const TemplateMotivation = () => {
  return (
    <>
      <Header />
        <div className="flex flex-col items-center py-20">
          <div className="text-center mb-7">
            <h1 className="!text-[#3375cc] text-4xl font-bold mb-1">
              Template <span className="text-[#dda853]">Motivation Letter</span>
            </h1>
          </div>

          <div className="bg-[#feffff] rounded-md shadow-md w-full max-w-[700px] mb-8">
            <div className="w-full">
              <img
                src="/img/edupreptools/page5_gambar.png"
                alt="Template Motivation Letter"
                className="w-full h-auto block"
              />
            </div>
          </div>

          <div className="text-center">
            <a
              href="/public/img/edupreptools/Template_Motlet.docx"
              download="Template Motivation Letter.docx"
              className="bg-[#3375cc] text-white py-2.5 px-7 text-base font-bold rounded-md cursor-pointer transition-colors duration-300 hover:bg-[#0286e6] !no-underline"
            >
              Unduh Template
            </a>
          </div>
        </div>
      <Footer />
    </>
  );
};

export default TemplateMotivation;
