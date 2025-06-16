import WebinarPeserta from "../models/WebinarPesertaModel.js";
import Webinar from "../models/WebinarModel.js";
import { Op } from "sequelize";

// --- FUNGSI AKSES PUBLIK (PENDAFTARAN) ---

/**
 * Mendaftarkan peserta baru ke webinar.
 * Membutuhkan pengguna login untuk mendapatkan userId dari sesi/token (melalui middleware verifyUser).
 * Jika pendaftaran tidak memerlukan login, middleware verifyUser harus dihapus dari rute ini
 * dan kolom userId di WebinarPesertaModel harus allowNull: true.
 */
export const registerWebinarPeserta = async (req, res) => {
    // req.userId datang dari middleware `verifyUser` setelah token terverifikasi.
    // Ini adalah ID pengguna yang login.
    const userId = req.userId || null; // Jika middleware verifyUser opsional atau tidak digunakan, userId bisa null

    // Destrukturisasi data yang dikirim dari frontend melalui body permintaan
    // Sesuaikan nama variabel agar sesuai dengan yang dikirim dari frontend (formData)
    const {
        webinarId,
        nama,
        jenjang, // Disesuaikan dari jenjang_pendidikan
        instansi, // Disesuaikan dari instansi_pendidikan
        jurusan, // Opsional
        email,
        nomor_hp,
        alasan // Disesuaikan dari alasan_mengikuti_webinar
    } = req.body;

    // --- Validasi Data Input Awal ---
    // Pastikan semua kolom yang diperlukan ada dan tidak kosong
    // `jurusan` tidak lagi wajib jika memang opsional
    if (!webinarId || !nama || !jenjang || !instansi || !email || !nomor_hp || !alasan) {
        const missingFields = [];
        if (!webinarId) missingFields.push('webinarId');
        if (!nama) missingFields.push('nama');
        if (!jenjang) missingFields.push('jenjang');
        if (!instansi) missingFields.push('instansi');
        if (!email) missingFields.push('email');
        if (!nomor_hp) missingFields.push('nomor_hp');
        if (!alasan) missingFields.push('alasan');

        return res.status(400).json({
            msg: `Semua kolom wajib diisi untuk pendaftaran. Kolom yang hilang: ${missingFields.join(', ')}`
        });
    }

    // Validasi format email dasar
    if (!/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ msg: "Format email tidak valid." });
    }
    // Validasi nomor HP (hanya angka dan minimal 10 digit, sesuaikan regex jika perlu)
    if (!/^\d{10,15}$/.test(nomor_hp)) { // Menambahkan max 15 digit, sesuaikan
        return res.status(400).json({ msg: "Nomor HP tidak valid. Hanya angka dan minimal 10 digit." });
    }

    try {
        // 1. Validasi keberadaan dan status webinar
        const webinar = await Webinar.findByPk(webinarId);
        if (!webinar) {
            return res.status(404).json({ msg: `Webinar dengan ID ${webinarId} tidak ditemukan.` });
        }
        // Cek status webinar, hanya boleh mendaftar jika 'upcoming'
        // Anda juga bisa menambahkan pengecekan tanggal jika ada deadline pendaftaran
        // Contoh: if (new Date() > new Date(webinar.tanggal_pelaksanaan)) { ... }
        if (webinar.status !== 'upcoming') { // Asumsi ada kolom 'status' di model Webinar
            return res.status(400).json({ msg: "Pendaftaran hanya dibuka untuk webinar yang akan datang." });
        }

        // 2. Cek apakah pengguna (berdasarkan email) sudah terdaftar untuk webinar ini
        const existingRegistration = await WebinarPeserta.findOne({
            where: {
                webinarId: webinarId,
                email: email
            }
        });

        if (existingRegistration) {
            return res.status(409).json({ msg: `Email ${email} sudah terdaftar untuk webinar ini.` });
        }

        // 3. Buat entri pendaftaran baru di database
        await WebinarPeserta.create({
            webinarId: webinarId,
            userId: userId, // Ini akan terisi jika pengguna login, atau null jika tidak
            nama: nama,
            jenjang_pendidikan: jenjang, // Mapping jenjang (frontend) ke jenjang_pendidikan (backend)
            instansi_pendidikan: instansi, // Mapping instansi (frontend) ke instansi_pendidikan (backend)
            jurusan: jurusan, // Akan null jika tidak dikirim dari frontend, tidak wajib
            email: email,
            nomor_hp: nomor_hp,
            alasan_mengikuti_webinar: alasan, // Mapping alasan (frontend) ke alasan_mengikuti_webinar (backend)
            status_pendaftaran: 'terdaftar' // Status default saat pendaftaran
        });

        res.status(201).json({ msg: "Pendaftaran webinar berhasil!", webinarId: webinarId });

    } catch (error) {
        console.error("Error during webinar registration:", error); // Log error ke console server

        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ msg: "Validasi data gagal. Pastikan semua data benar dan sesuai format.", errors: errors });
        }
        if (error.name === 'SequelizeUniqueConstraintError') {
            return res.status(409).json({ msg: "Data yang Anda masukkan sudah ada dan unik (misal: email untuk webinar ini sudah terdaftar).", error: error.message });
        }
        // Jika userId tidak ada dan kolom userId di model tidak allowNull: true
        if (!userId && error.name === 'SequelizeForeignKeyConstraintError' && error.fields.includes('userId')) {
             return res.status(401).json({ msg: "Autentikasi gagal. Anda perlu login untuk mendaftar webinar ini." });
        }

        res.status(500).json({ msg: "Terjadi kesalahan pada server saat mendaftar webinar.", error: error.message });
    }
};

// --- FUNGSI AKSES ADMIN (membutuhkan middleware verifyUser & adminOnly) ---

/**
 * Mendapatkan semua pendaftar untuk semua webinar.
 * Mendukung filter by webinarId dan status_pendaftaran melalui query parameter.
 */
export const getAllWebinarPeserta = async (req, res) => {
    try {
        const { webinarId, status_pendaftaran } = req.query;

        // --- Log untuk debugging ---
        console.log("Menerima permintaan getAllWebinarPeserta.");
        console.log("Filter Webinar ID dari query:", webinarId);
        console.log("Filter Status Pendaftaran dari query:", status_pendaftaran);
        // --- Akhir Log ---

        let whereClause = {};

        // Tambahkan filter webinarId hanya jika ada dan tidak kosong
        if (webinarId && webinarId.trim() !== '') {
            // Penting: Jika webinarId ini adalah UUID dari frontend, Anda perlu mencarinya di model Webinar
            // untuk mendapatkan ID numerik internal sebelum menggunakannya di WebinarPeserta.
            // Jika webinarId yang dikirim dari frontend adalah PK numerik, baris ini sudah benar.
            // Asumsi dari log error frontend, webinarId yang diterima adalah UUID.
            const webinar = await Webinar.findOne({ where: { uuid: webinarId } });
            if (!webinar) {
                // Jika webinarId tidak ditemukan, tidak ada peserta yang akan cocok.
                // Mengembalikan array kosong atau 404, tergantung kebutuhan.
                return res.status(404).json({ msg: `Webinar dengan ID ${webinarId} tidak ditemukan.` });
            }
            whereClause.webinarId = webinar.id; // Gunakan ID numerik dari webinar yang ditemukan
        }

        // Tambahkan filter status_pendaftaran hanya jika ada dan merupakan status yang valid
        if (status_pendaftaran && status_pendaftaran.trim() !== '') {
            const validStatuses = ['pending', 'terdaftar', 'hadir', 'dibatalkan'];
            const lowerCaseStatus = status_pendaftaran.toLowerCase();
            if (!validStatuses.includes(lowerCaseStatus)) {
                // Memberikan pesan kesalahan yang jelas untuk status tidak valid
                return res.status(400).json({ msg: "Status pendaftaran tidak valid. Pilih antara 'pending', 'terdaftar', 'hadir', atau 'dibatalkan'." });
            }
            whereClause.status_pendaftaran = lowerCaseStatus;
        }

        const participants = await WebinarPeserta.findAll({
            where: whereClause,
            attributes: [
                'uuid', 'webinarId', 'userId', 'nama', 'jenjang_pendidikan',
                'instansi_pendidikan', 'jurusan', 'email', 'nomor_hp',
                'alasan_mengikuti_webinar', 'status_pendaftaran', 'createdAt', 'updatedAt'
            ],
            order: [['createdAt', 'DESC']],
            include: [{
                model: Webinar,
                attributes: ['uuid', 'judul', 'tanggal_pelaksanaan', 'jam_pelaksanaan', 'penyelenggara'],
                as: 'webinar' // Pastikan alias ini sesuai dengan yang didefinisikan di models/index.js
            }]
            // Anda juga bisa menambahkan include untuk UserModel jika ada relasi
            // include: [{ model: User, attributes: ['uuid', 'name', 'email'], as: 'userPendaftar' }]
        });

        if (participants.length === 0) {
            // Ubah respons menjadi 200 OK dengan array kosong jika tidak ada pendaftar yang cocok
            // Ini lebih baik daripada 404 jika query valid tapi hasilnya kosong.
            return res.status(200).json({ msg: "Tidak ada pendaftar ditemukan dengan kriteria tersebut.", data: [] });
        }

        res.status(200).json(participants);
    } catch (error) {
        console.error("Error fetching all webinar participants:", error);
        res.status(500).json({ msg: "Kesalahan server saat mengambil data peserta webinar.", error: error.message });
    }
};

/**
 * Mendapatkan detail pendaftar berdasarkan UUID pendaftaran.
 */
export const getWebinarPesertaById = async (req, res) => {
    try {
        const participant = await WebinarPeserta.findOne({
            where: {
                uuid: req.params.id
            },
            attributes: [
                'uuid', 'webinarId', 'userId', 'nama', 'jenjang_pendidikan',
                'instansi_pendidikan', 'jurusan', 'email', 'nomor_hp',
                'alasan_mengikuti_webinar', 'status_pendaftaran', 'createdAt', 'updatedAt'
            ],
            include: [{
                model: Webinar,
                attributes: ['uuid', 'judul', 'tanggal_pelaksanaan', 'jam_pelaksanaan', 'penyelenggara'],
                as: 'webinar'
            }]
        });
        if (!participant) {
            return res.status(404).json({ msg: "Pendaftar tidak ditemukan." });
        }
        res.status(200).json(participant);
    } catch (error) {
        console.error("Error fetching webinar participant by ID:", error);
        res.status(500).json({ msg: "Kesalahan server saat mengambil detail pendaftar webinar.", error: error.message });
    }
};

/**
 * Memperbarui status atau data pendaftar.
 * Hanya bisa diakses oleh admin.
 */
export const updateWebinarPeserta = async (req, res) => {
    const participant = await WebinarPeserta.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!participant) {
        return res.status(404).json({ msg: "Pendaftar tidak ditemukan." });
    }

    const {
        nama,
        jenjang_pendidikan,
        instansi_pendidikan,
        jurusan,
        email,
        nomor_hp,
        alasan_mengikuti_webinar,
        status_pendaftaran
    } = req.body;

    // Tambahkan validasi input untuk update juga jika perlu
    if (email && !/\S+@\S+\.\S+/.test(email)) {
        return res.status(400).json({ msg: "Format email tidak valid." });
    }
    if (nomor_hp && !/^\d{10,15}$/.test(nomor_hp)) {
        return res.status(400).json({ msg: "Nomor HP tidak valid. Hanya angka dan minimal 10 digit." });
    }
    const validStatuses = ['pending', 'terdaftar', 'hadir', 'dibatalkan'];
    if (status_pendaftaran && !validStatuses.includes(status_pendaftaran.toLowerCase())) {
        return res.status(400).json({ msg: "Status pendaftaran tidak valid. Pilih antara 'pending', 'terdaftar', 'hadir', atau 'dibatalkan'." });
    }


    try {
        await WebinarPeserta.update({
            nama, jenjang_pendidikan, instansi_pendidikan, jurusan,
            email, nomor_hp, alasan_mengikuti_webinar, status_pendaftaran
        }, {
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Data pendaftar berhasil diperbarui." });
    } catch (error) {
        if (error.name === 'SequelizeUniqueConstraintError') {
             return res.status(409).json({ msg: "Email ini sudah terdaftar untuk webinar yang sama atau data unik lainnya sudah ada." });
        }
        if (error.name === 'SequelizeValidationError') {
            const errors = error.errors.map(err => err.message);
            return res.status(400).json({ msg: "Validasi data gagal. Pastikan semua data benar.", errors: errors });
        }
        console.error("Error updating webinar participant:", error);
        res.status(500).json({ msg: "Kesalahan server saat memperbarui pendaftar.", error: error.message });
    }
};

/**
 * Menghapus pendaftar berdasarkan UUID pendaftaran.
 * Hanya bisa diakses oleh admin.
 */
export const deleteWebinarPeserta = async (req, res) => {
    const participant = await WebinarPeserta.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if (!participant) {
        return res.status(404).json({ msg: "Pendaftar tidak ditemukan." });
    }

    try {
        await WebinarPeserta.destroy({
            where: {
                uuid: req.params.id
            }
        });
        res.status(200).json({ msg: "Pendaftar berhasil dihapus." });
    } catch (error) {
        console.error("Error deleting webinar participant:", error);
        res.status(500).json({ msg: "Kesalahan server saat menghapus pendaftar.", error: error.message });
    }
};

/**
 * Mendapatkan daftar peserta untuk webinar tertentu (berdasarkan UUID webinar).
 * Hanya bisa diakses oleh admin.
 */
export const getPesertaByWebinarId = async (req, res) => {
    try {
        // Mengubah nama variabel dari 'id' menjadi 'webinarUuid' agar lebih jelas
        const { id: webinarUuid } = req.params; 
        const { status_pendaftaran } = req.query;

        // --- Log untuk debugging ---
        console.log("Menerima permintaan getPesertaByWebinarId.");
        console.log("Webinar UUID dari params:", webinarUuid); // Log menggunakan nama variabel baru
        console.log("Filter Status Pendaftaran dari query:", status_pendaftaran);
        // --- Akhir Log ---

        // Cari webinar berdasarkan UUID yang diterima dari frontend
        const webinar = await Webinar.findOne({
            where: {
                uuid: webinarUuid // Mencari berdasarkan kolom 'uuid' di model Webinar
            }
        });

        // Jika webinar tidak ditemukan dengan UUID tersebut
        if (!webinar) {
            return res.status(404).json({ msg: `Webinar dengan UUID ${webinarUuid} tidak ditemukan.` });
        }

        // Sekarang kita memiliki objek 'webinar' yang ditemukan.
        // Gunakan 'webinar.id' (primary key numerik dari model Webinar)
        // untuk memfilter peserta di model WebinarPeserta.
        let whereClause = { webinarId: webinar.id }; // Menggunakan primary key numerik webinar

        // Tambahkan filter status_pendaftaran hanya jika ada dan merupakan status yang valid
        if (status_pendaftaran && status_pendaftaran.trim() !== '') { // Perbaikan di sini
            const validStatuses = ['pending', 'terdaftar', 'hadir', 'dibatalkan'];
            const lowerCaseStatus = status_pendaftaran.toLowerCase();
            if (!validStatuses.includes(lowerCaseStatus)) {
                return res.status(400).json({ msg: "Status pendaftaran tidak valid. Pilih antara 'pending', 'terdaftar', 'hadir', atau 'dibatalkan'." });
            }
            whereClause.status_pendaftaran = lowerCaseStatus;
        }

        const participants = await WebinarPeserta.findAll({
            where: whereClause,
            attributes: [
                'uuid', 'userId', 'nama', 'jenjang_pendidikan',
                'instansi_pendidikan', 'jurusan', 'email', 'nomor_hp',
                'alasan_mengikuti_webinar', 'status_pendaftaran', 'createdAt', 'updatedAt'
            ],
            order: [['createdAt', 'DESC']],
            include: [{
                model: Webinar,
                attributes: ['uuid', 'judul', 'tanggal_pelaksanaan', 'jam_pelaksanaan', 'penyelenggara'],
                as: 'webinar'
            }]
        });

        if (participants.length === 0) {
            // Ubah respons menjadi 200 OK dengan array kosong jika tidak ada pendaftar yang cocok
            return res.status(200).json({ msg: "Tidak ada pendaftar ditemukan untuk webinar ini atau filter tidak cocok.", data: [] });
        }

        res.status(200).json(participants);
    } catch (error) {
        console.error("Error fetching participants for webinar:", error);
        res.status(500).json({ msg: "Kesalahan server saat mengambil daftar peserta webinar.", error: error.message });
    }
};