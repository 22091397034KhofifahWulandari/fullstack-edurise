const PopupSaved = ({ show, onClose }) => {
  if (!show) return null;

  const handleOverlayClick = (e) => {
    if (e.target.classList.contains("popup-overlay")) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50 p-4"
      onClick={handleOverlayClick}
    >
      <div className="bg-white p-8 rounded-lg shadow-xl text-center max-w-sm w-full">
        <h2 className="text-xl font-bold mb-4">Program Berhasil Tersimpan!</h2>
        <button
          className="w-full bg-[#3375CC] hover:bg-[#295ea3] text-white font-bold py-2 px-4 rounded transition-colors"
          onClick={onClose}
        >
          Tutup
        </button>
      </div>
    </div>
  );
};

export default PopupSaved;
