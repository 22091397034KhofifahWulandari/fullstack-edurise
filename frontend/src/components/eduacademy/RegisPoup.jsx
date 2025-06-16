import React from 'react';

function RegistrationPopup({
  showRegistrationPopup,
  closePopup,
  formData,
  handleInputChange,
  errors,
  handleSubmit,
}) {
  if (!showRegistrationPopup) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
      <div className="bg-stone-50 rounded-lg max-w-md w-full mx-4 relative">
        {/* Close button */}
        <button
          onClick={closePopup}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>

        {/* Form header */}
        <div className="p-6 border-b">
          <h2 className="text-xl font-semibold text-sky-900">
            Data Diri
          </h2>
        </div>

        {/* Form content */}
        <div className="p-6">
          <form onSubmit={handleSubmit}>
            {/* Nama */}
            <div className="mb-4">
              <label
                htmlFor="nama"
                className="block text-sm font-regular text-sky-900 mb-1"
              >
                Nama
              </label>
              <input
                type="text"
                id="nama"
                name="nama"
                value={formData.nama}
                onChange={handleInputChange}
                placeholder="Masukkan Nama Anda"
                className={`w-full px-3 py-2 border ${
                  errors.nama ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-normal`}
              />
              {errors.nama && (
                <div className="error-message text-red-500 text-xs mt-1">
                  {errors.nama}
                </div>
              )}
            </div>

            {/* Jenjang Pendidikan */}
            <div className="mb-4">
              <label
                htmlFor="jenjang"
                className="block text-sm font-regular text-sky-900 mb-1"
              >
                Jenjang Pendidikan
              </label>
              <div className="relative">
                <select
                  id="jenjang"
                  name="jenjang"
                  value={formData.jenjang}
                  onChange={handleInputChange}
                  className={`w-full px-3 py-2 border ${
                    errors.jenjang ? "border-red-500" : "border-gray-300"
                  } rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                    formData.jenjang ? "text-gray-800" : "text-gray-500"
                  }`}
                >
                  <option value="" disabled>
                    Pilih Jenjang Pendidikan Anda
                  </option>
                  <option value="SMA/SMK">SMA/SMK</option>
                  <option value="D3">D3</option>
                  <option value="S1">S1</option>
                  <option value="S2">S2</option>
                  <option value="S3">S3</option>
                </select>

                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg
                    className="h-4 w-4"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              </div>
              {errors.jenjang && (
                <div className="error-message text-red-500 text-xs mt-1">
                  {errors.jenjang}
                </div>
              )}
            </div>

            {/* Instansi dan Jurusan in one row */}
            <div className="flex flex-col sm:flex-row mb-4 gap-4">
              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="instansi"
                  className="block text-sm font-regular text-sky-900 mb-1"
                >
                  Instansi Pendidikan
                </label>
                <div className="relative">
                  <select
                    id="instansi"
                    name="instansi"
                    value={formData.instansi}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.instansi
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      formData.instansi
                        ? "text-gray-800"
                        : "text-gray-500"
                    }`}
                  >
                    <option value="" disabled>
                      Instansi Pendidikan
                    </option>
                    <option value="Universitas Indonesia">
                      Universitas Indonesia
                    </option>
                    <option value="Institut Teknologi Bandung">
                      Institut Teknologi Bandung
                    </option>
                    <option value="Universitas Gadjah Mada">
                      Universitas Gadjah Mada
                    </option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.instansi && (
                  <div className="error-message text-red-500 text-xs mt-1">
                    {errors.instansi}
                  </div>
                )}
              </div>

              <div className="w-full sm:w-1/2">
                <label
                  htmlFor="jurusan"
                  className="block text-sm font-regular text-sky-900 mb-1"
                >
                  Jurusan
                </label>
                <div className="relative">
                  <select
                    id="jurusan"
                    name="jurusan"
                    value={formData.jurusan}
                    onChange={handleInputChange}
                    className={`w-full px-3 py-2 border ${
                      errors.jurusan
                        ? "border-red-500"
                        : "border-gray-300"
                    } rounded-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm ${
                      formData.jurusan ? "text-gray-800" : "text-gray-500"
                    }`}
                  >
                    <option value="" disabled>
                      Jurusan
                    </option>
                    <option value="Teknik Informatika">
                      Teknik Informatika
                    </option>
                    <option value="Sistem Informasi">
                      Sistem Informasi
                    </option>
                    <option value="Ilmu Komputer">Ilmu Komputer</option>
                    <option value="Manajemen">Manajemen</option>
                    <option value="Lainnya">Lainnya</option>
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                    <svg
                      className="h-4 w-4"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                </div>
                {errors.jurusan && (
                  <div className="error-message text-red-500 text-xs mt-1">
                    {errors.jurusan}
                  </div>
                )}
              </div>
            </div>

            {/* Email */}
            <div className="mb-4">
              <label
                htmlFor="email"
                className="block text-sm font-regular text-sky-900 mb-1"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                placeholder="Masukkan Email Anda"
                className={`w-full px-3 py-2 border ${
                  errors.email ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-normal`}
              />
              {errors.email && (
                <div className="error-message text-red-500 text-xs mt-1">
                  {errors.email}
                </div>
              )}
            </div>

            {/* Nomor HP - BARU DITAMBAHKAN */}
            <div className="mb-4">
              <label
                htmlFor="nomor_hp"
                className="block text-sm font-regular text-sky-900 mb-1"
              >
                Nomor HP
              </label>
              <input
                type="tel" // Menggunakan type="tel" untuk nomor telepon
                id="nomor_hp"
                name="nomor_hp"
                value={formData.nomor_hp}
                onChange={handleInputChange}
                placeholder="Masukkan Nomor HP Anda (misal: 081234567890)"
                className={`w-full px-3 py-2 border ${
                  errors.nomor_hp ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-normal`}
              />
              {errors.nomor_hp && (
                <div className="error-message text-red-500 text-xs mt-1">
                  {errors.nomor_hp}
                </div>
              )}
            </div>

            {/* Alasan */}
            <div className="mb-6">
              <label
                htmlFor="alasan"
                className="block text-sm font-regular text-sky-900 mb-1"
              >
                Alasan Mengikuti Webinar
              </label>
              <textarea
                id="alasan"
                name="alasan"
                rows="3"
                value={formData.alasan}
                onChange={handleInputChange}
                placeholder="Masukkan Alasan Anda"
                className={`w-full px-3 py-2 border ${
                  errors.alasan ? "border-red-500" : "border-gray-300"
                } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 placeholder:text-sm placeholder:font-normal`}
              ></textarea>
              {errors.alasan && (
                <div className="error-message text-red-500 text-xs mt-1">
                  {errors.alasan}
                </div>
              )}
            </div>

            {/* Submit button */}
            <button
              type="submit"
              className="block mx-auto bg-sky-800 hover:bg-blue-700 text-white text-sm font-medium py-2 px-6 rounded-lg transition duration-300"
            >
              Kirim Form
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default RegistrationPopup;