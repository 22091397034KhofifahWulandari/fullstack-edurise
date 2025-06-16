import { Link } from "react-router-dom";
import Header from "../../components/Navbar";
import Footer from "../../components/Footer";

const SimulasiWawancara = () => {
  return (
    <>
      <Header />
      {/* Hero Section */}
      <section 
        className="flex items-center text-white"
        style={{
          background: 'linear-gradient(to left, #265899, #0d1d33)',
          color: '#feffff',
          padding: '60px 0'
        }}
      >
        <div className="w-full max-w-6xl mx-auto px-4">
          <div className="flex justify-between items-center" style={{ gap: '60px' }}>
            <div style={{ flex: '1' }}>
              <h1 
                className="mb-4 font-bold"
                style={{ 
                  fontSize: '36px',
                  color: '#dda853'
                }}
              >
                Gabung ke Server Discord Kami
              </h1>
              <p 
                className="mb-4"
                style={{
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}
              >
                Terima kasih telah bersiap untuk simulasi wawancara! Klik tombol
                di bawah ini untuk bergabung dengan server Discord dan ikuti
                sesi wawancara secara langsung.
              </p>
              <Link
                href="#" 
                className="inline-block no-underline font-bold transition-colors duration-300"
                style={{
                  backgroundColor: '#3375cc',
                  color: 'white',
                  padding: '10px 30px',
                  borderRadius: '5px',
                  textDecoration: 'none',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0286e6'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#3375cc'}
              >
                Gabung
              </Link>
            </div>
            <div style={{ flex: '1', textAlign: 'right' }}>
              <img
                src="/img/edupreptools/page6_gambar.png"
                alt="Simulasi Wawancara"
                className="max-w-full"
                style={{ borderRadius: '10px' }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Steps Section */}
      <section 
        className="text-center"
        style={{
          padding: '80px 0',
          marginBottom: '30px'
        }}
      >
        <div className="w-full max-w-6xl mx-auto px-4">
          <h2 
            className="mb-[60px]"
            style={{
              fontSize: '31px',
              color: '#3375cc',
              marginBottom: '60px',
            }}
          >
            Langkah-Langkah <span style={{ color: '#dda853' }}>Simulasi Wawancara</span>
          </h2>
          <div 
            className="flex flex-wrap mx-auto justify-between"
            style={{
              gap: '30px',
              maxWidth: '1200px'
            }}
          >
            {/* Step Card 1 */}
            <div 
              className="flex items-center text-left"
              style={{
                padding: '25px 30px',
                border: '1px solid #dda853',
                borderRadius: '10px',
                backgroundColor: '#feffff',
                width: 'calc(50% - 15px)'
              }}
            >
              <div 
                className="flex items-center justify-center overflow-hidden"
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '20px',
                  border: '1px solid #3375cc',
                  borderRadius: '50%'
                }}
              >
                <img
                  src="/img/edupreptools/icon_earphone.png"
                  alt="Earphone Icon"
                  className="object-contain"
                  style={{
                    width: '50%',
                    height: '50%'
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-bold"
                  style={{
                    marginBottom: '10px',
                    fontSize: '20px',
                    color: '#575858'
                  }}
                >
                  Join Server Discord
                </h3>
                <p 
                  style={{
                    color: '#575858',
                    lineHeight: '1.5',
                    fontSize: '16px',
                    margin: '0'
                  }}
                >
                  Masuk ke server Discord EduRise untuk memulai sesi simulasi.
                </p>
              </div>
            </div>
            
            {/* Step Card 2 */}
            <div 
              className="flex items-center text-left"
              style={{
                padding: '25px 30px',
                border: '1px solid #dda853',
                borderRadius: '10px',
                backgroundColor: '#feffff',
                width: 'calc(50% - 15px)'
              }}
            >
              <div 
                className="flex items-center justify-center overflow-hidden"
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '20px',
                  border: '1px solid #3375cc',
                  borderRadius: '50%'
                }}
              >
                <img 
                  src="/img/edupreptools/icon_clock.png" 
                  alt="Clock Icon"
                  className="object-contain"
                  style={{
                    width: '50%',
                    height: '50%'
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-bold"
                  style={{
                    marginBottom: '10px',
                    fontSize: '20px',
                    color: '#575858'
                  }}
                >
                  Jadwalkan Sesi Wawancara
                </h3>
                <p 
                  style={{
                    color: '#575858',
                    lineHeight: '1.5',
                    fontSize: '16px',
                    margin: '0'
                  }}
                >
                  Pilih waktu yang tepat dan daftarkan diri untuk sesi bersama
                  mentor.
                </p>
              </div>
            </div>
            
            {/* Step Card 3 */}
            <div 
              className="flex items-center text-left"
              style={{
                padding: '25px 30px',
                border: '1px solid #dda853',
                borderRadius: '10px',
                backgroundColor: '#feffff',
                width: '100%'
              }}
            >
              <div 
                className="flex items-center justify-center overflow-hidden"
                style={{
                  width: '80px',
                  height: '80px',
                  marginRight: '20px',
                  border: '1px solid #3375cc',
                  borderRadius: '50%'
                }}
              >
                <img
                  src="/img/edupreptools/icon_microphone.png"
                  alt="Microphone Icon"
                  className="object-contain"
                  style={{
                    width: '50%',
                    height: '50%'
                  }}
                />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-bold"
                  style={{
                    marginBottom: '10px',
                    fontSize: '20px',
                    color: '#575858'
                  }}
                >
                  Wawancara di Discord
                </h3>
                <p 
                  style={{
                    color: '#575858',
                    lineHeight: '1.5',
                    fontSize: '16px',
                    margin: '0'
                  }}
                >
                  Temui mentor via voice channel dan jawab pertanyaan layaknya
                  wawancara sungguhan.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
};

export default SimulasiWawancara;