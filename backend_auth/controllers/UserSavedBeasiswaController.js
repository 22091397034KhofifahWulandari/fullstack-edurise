// controllers/UserBeasiswaController.js
import UserModel from "../models/UserModel.js";
import BeasiswaModel from "../models/BeasiswaModel.js";
import UserSavedBeasiswaModel from "../models/UserSavedBeasiswaModel.js";

// --- MENDAPATKAN SEMUA BEASISWA YANG DISIMPAN OLEH USER ---
export const getSavedBeasiswaByUser = async (req, res) => {
  // PENTING: Dapatkan ID user dari properti yang benar yang disetel oleh middleware AuthUser.js (e.g., req.session.userId)
  const userIdFromSession = req.session.userId;

  if (!userIdFromSession) {
    // Ini seharusnya sudah ditangani oleh middleware verifyUser, tapi sebagai safety net.
    return res.status(401).json({ msg: "Autentikasi diperlukan. Silakan login kembali." });
  }

  try {
    // Cari user berdasarkan ID primary key yang didapat dari sesi
    const user = await UserModel.findOne({
      where: { id: userIdFromSession },
      attributes: ['uuid', 'name', 'email'], // Atribut user yang ingin ditampilkan (opsional)
      include: [{
        model: BeasiswaModel,
        as: 'savedBeasiswa', // PASTIKAN ALIAS INI SESUAI DENGAN DEFINISI ASOSIASI DI MODEL ANDA!
        through: { attributes: [] }, // Jangan sertakan kolom dari tabel perantara di respons
        attributes: ['uuid', 'title', 'description', 'img', 'kategori', 'jenjang', 'lokasi', 'deadline', 'link', 'detail'] // Atribut beasiswa yang ingin ditampilkan, tambahkan 'link' dan 'detail'
      }]
    });

    if (!user) {
      // Ini bisa terjadi jika userIdFromSession valid tapi user sudah tidak ada di database
      return res.status(404).json({ msg: "User tidak ditemukan. Sesi mungkin tidak valid." });
    }

    // Mengirimkan array beasiswa yang disimpan oleh user
    res.status(200).json(user.savedBeasiswa);
  } catch (error) {
    console.error("Error in getSavedBeasiswaByUser:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server saat mengambil beasiswa tersimpan." });
  }
};

// --- MENYIMPAN BEASISWA KE PROFIL USER ---
export const saveBeasiswaToProfile = async (req, res) => {
  const userIdFromSession = req.session.userId;
  const { beasiswa_uuid } = req.body; // Frontend mengirim 'beasiswa_uuid'

  if (!userIdFromSession) {
    return res.status(401).json({ msg: "Autentikasi diperlukan. Silakan login kembali." });
  }
  if (!beasiswa_uuid) {
    return res.status(400).json({ msg: "UUID Beasiswa diperlukan dalam permintaan." });
  }

  try {
    // 1. Cari user yang sedang login (menggunakan ID primary key dari sesi)
    const user = await UserModel.findOne({ where: { id: userIdFromSession } });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan." });
    }

    // 2. Cari beasiswa yang ingin disimpan (menggunakan UUID dari body permintaan)
    const beasiswa = await BeasiswaModel.findOne({ where: { uuid: beasiswa_uuid } });
    if (!beasiswa) {
      return res.status(404).json({ msg: "Beasiswa tidak ditemukan." });
    }

    // 3. Cek apakah beasiswa sudah disimpan oleh user ini
    const existingSave = await UserSavedBeasiswaModel.findOne({
      where: {
        userId: user.id, // ID primary key dari UserModel
        beasiswaId: beasiswa.id // ID primary key dari BeasiswaModel
      }
    });

    if (existingSave) {
      return res.status(409).json({ msg: "Beasiswa ini sudah tersimpan di profil Anda." });
    }

    // 4. Buat entri baru di tabel perantara (menggunakan ID primary key)
    await UserSavedBeasiswaModel.create({
      userId: user.id,
      beasiswaId: beasiswa.id
    });

    res.status(201).json({ msg: "Beasiswa berhasil disimpan di profil Anda." });
  } catch (error) {
    console.error("Error in saveBeasiswaToProfile:", error);
    if (error.name === 'SequelizeUniqueConstraintError') {
      return res.status(409).json({ msg: "Beasiswa ini sudah tersimpan di profil Anda." });
    }
    res.status(500).json({ msg: "Terjadi kesalahan server saat menyimpan beasiswa." });
  }
};

// --- MENGHAPUS BEASISWA DARI PROFIL USER ---
export const removeSavedBeasiswaFromProfile = async (req, res) => {
  const userIdFromSession = req.session.userId;
  const { beasiswaId } = req.params;

  if (!userIdFromSession) {
    return res.status(401).json({ msg: "Autentikasi diperlukan. Silakan login kembali." });
  }
  if (!beasiswaId) {
    return res.status(400).json({ msg: "UUID Beasiswa diperlukan dalam permintaan." });
  }

  try {
    const user = await UserModel.findOne({ where: { id: userIdFromSession } });
    if (!user) {
      return res.status(404).json({ msg: "User tidak ditemukan." });
    }

    const beasiswa = await BeasiswaModel.findOne({ where: { uuid: beasiswaId } });
    if (!beasiswa) {
      return res.status(404).json({ msg: "Beasiswa tidak ditemukan." });
    }

    const deletedRows = await UserSavedBeasiswaModel.destroy({
      where: {
        userId: user.id,
        beasiswaId: beasiswa.id
      }
    });

    if (deletedRows === 0) {
      return res.status(404).json({ msg: "Beasiswa tidak ditemukan di daftar simpanan Anda." });
    }

    res.status(200).json({ msg: "Beasiswa berhasil dihapus dari profil Anda." });
  } catch (error) {
    console.error("Error in removeSavedBeasiswaFromProfile:", error);
    res.status(500).json({ msg: "Terjadi kesalahan server saat menghapus beasiswa." });
  }
};