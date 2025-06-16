import { useState, useEffect } from "react"; // Import useEffect
import StatusModal from "../../pages/Eduevent/StatusModal";
import { Link } from "react-router-dom"; // Import Link for navigation to detail page

const CompetitionCard = ({
  image,
  title,
  date,
  feeInfo,
  level,
  onCheckStatus,
  id, // Pass id to CompetitionCard
  onRemoveSaved, // New prop for removing from saved
}) => {
  return (
    <div className="bg-white rounded-2xl p-4 flex flex-col shadow-md h-full">
      <div className="w-full aspect-[4/3] mb-3">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>

      <h3 className="text-base font-bold text-[#17355c] mb-2">{title}</h3>

      {/* ICON 1: Untuk Tanggal - Menggunakan Gambar */}
      <div className="flex items-center text-sm text-[#5e5a5a] mb-1">
        <img
          src="/img/eduevent/img_calendar.svg"
          alt="Tanggal"
          className="w-4 h-4 mr-2"
        />
        <span>{date}</span>
      </div>

      {/* ICON 2: Untuk Informasi Biaya - Menggunakan Gambar */}
      <div className="flex items-center text-sm text-[#5e5a5a] mb-1">
        <img
          src="/img/eduevent/img_usercheck.svg"
          alt="Biaya"
          className="w-4 h-4 mr-2"
        />
        <span>{feeInfo}</span>
      </div>

      {/* ICON 3: Untuk Level - Menggunakan Gambar */}
      <div className="flex items-center text-sm text-[#5e5a5a] mb-4">
        <img
          src="/img/eduevent/img_circle.svg"
          alt="Level"
          className="w-4 h-4 mr-2"
        />
        <span>{level}</span>
      </div>

      <div className="flex justify-between items-center mt-auto">
        <Link
          to={`/eduevents/${id}`} // Link to the detail page
          className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold py-2 px-4 rounded-lg"
        >
          Lihat Detail
        </Link>
        <button
          onClick={() => onRemoveSaved(id)} // Button to remove from saved
          className="bg-red-500 hover:bg-red-600 text-white text-sm font-semibold py-2 px-4 rounded-lg"
        >
          Hapus
        </button>
      </div>
    </div>
  );
};

const SavedCompetitions = () => {
  const [savedCompetitions, setSavedCompetitions] = useState([]);
  const [showModal, setShowModal] = useState(false);

  // Function to load saved competitions from localStorage
  const loadSavedCompetitions = () => {
    try {
      const storedCompetitions =
        JSON.parse(localStorage.getItem("savedCompetitions")) || [];
      setSavedCompetitions(storedCompetitions);
    } catch (error) {
      console.error("Error loading saved competitions from localStorage:", error);
      setSavedCompetitions([]);
    }
  };

  useEffect(() => {
    loadSavedCompetitions();

    // Add an event listener for localStorage changes (optional, for real-time updates)
    // This is useful if the user has multiple tabs open and saves/unsaves from another tab
    window.addEventListener("storage", loadSavedCompetitions);

    return () => {
      window.removeEventListener("storage", loadSavedCompetitions);
    };
  }, []);

  const handleRemoveSaved = (idToRemove) => {
    let currentSavedCompetitions = JSON.parse(localStorage.getItem('savedCompetitions')) || [];
    currentSavedCompetitions = currentSavedCompetitions.filter(
      (comp) => comp.id !== idToRemove
    );
    localStorage.setItem('savedCompetitions', JSON.stringify(currentSavedCompetitions));
    setSavedCompetitions(currentSavedCompetitions); // Update state to re-render
    alert('Kompetisi dihapus dari daftar simpan!');
  };


  const handleCheckStatus = (id) => {
    console.log(`Checking status for competition ${id}`);
    setShowModal(true);
  };

  return (
    <div className="bg-white rounded-[15px] p-6 mb-5 relative">
      <h2 className="text-2xl font-semibold text-[#17355c] mb-6">
        Kompetisi Tersimpan
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
        {savedCompetitions.length > 0 ? (
          savedCompetitions.map((item) => (
            <CompetitionCard
              key={item.id}
              id={item.id} // Pass the id
              image={item.image}
              title={item.title}
              date={item.date}
              feeInfo={item.isFree ? "Gratis tanpa syarat bayar" : "Berbayar"} // Use isFree from saved data
              level={`Tingkat ${item.level.charAt(0).toUpperCase() + item.level.slice(1)}`} // Format level
              onCheckStatus={() => handleCheckStatus(item.id)}
              onRemoveSaved={handleRemoveSaved} // Pass the remove function
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">Belum ada kompetisi yang disimpan.</p>
        )}
      </div>

      {showModal && <StatusModal onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default SavedCompetitions;