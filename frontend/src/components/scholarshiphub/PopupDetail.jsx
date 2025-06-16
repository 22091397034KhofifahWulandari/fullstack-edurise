const PopupDetail = ({ show, onClose, data, onSave, isSaved }) => {
  if (!show || !data) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className={`popup-overlay fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4 ${
        show ? "block" : "hidden"
      }`}
      onClick={handleOverlayClick}
    >
      <div
        className="bg-white rounded-xl shadow-lg overflow-y-auto max-h-[90vh] w-full max-w-xl p-6 relative text-left"
        onClick={(e) => e.stopPropagation()}
      >
        <>
          <img
            src={data.img}
            alt={data.title}
            className="w-full h-48 object-cover rounded mb-4"
          />
          <h2 className="text-xl font-bold mb-4">{data.title}</h2>
          <p className="text-sm text-gray-700 whitespace-pre-line mb-6">
            {data.detail}
          </p>
          <div className="flex justify-center gap-4">
            {/* Tombol Simpan/Batal Simpan hanya muncul jika isSaved tidak true */}
            {!isSaved && ( // Hanya render tombol jika isSaved bernilai false
              <button
                className={`w-40 font-bold py-2 px-4 rounded transition-colors ${
                  isSaved
                    ? "bg-red-500 hover:bg-red-700 text-white"
                    : "bg-[#3375CC] hover:bg-[#295ea3] text-white"
                }`}
                onClick={onSave}
              >
                {isSaved ? "Batal Simpan" : "Simpan"}{" "}
              </button>
            )}

            {data.link && (
              <a
                href={data.link}
                target="_blank"
                rel="noopener noreferrer"
                className="w-40 bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors inline-flex items-center justify-center"
              >
                Daftar
              </a>
            )}
          </div>
        </>
      </div>
    </div>
  );
};

export default PopupDetail;