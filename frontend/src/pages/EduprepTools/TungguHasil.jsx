import { Link, useParams } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

function TungguHasil() {
  const { id } = useParams();

  return (
    <>
      <Header />
      <main className="text-center px-4 !py-[150px]">
        <img
          src="/img/edupreptools/icon_tunggusubmit.png"
          alt="Submit Success"
          className="w-20 h-20 mb-7 object-contain mx-auto"
        />
        <h1 className="text-4xl font-bold">
          <span className="text-[#3375cc]">Submit Anda</span>
          <span className="text-[#dda853]"> Telah Berhasil</span>
        </h1>
        <br />
        <p className="text-[#575858] text-base mb-10">
          Feedback akan dikirimkan maksimal dalam waktu 1 x 24 jam.
          <br />
          Silakan cek secara berkala pada halaman ini.
          {id && <p className="text-sm mt-2">ID Esai Anda: <strong>{id}</strong></p>}
        </p>
        <Link
          to={`/lihat-hasil/${id}`}
          className="bg-[#3375cc] text-white py-2.5 px-8 rounded font-bold inline-block !no-underline hover:bg-[#0286e6]"
        >
          Lihat Status Esai
        </Link>
      </main>
      <Footer />
    </>
  );
}

export default TungguHasil;