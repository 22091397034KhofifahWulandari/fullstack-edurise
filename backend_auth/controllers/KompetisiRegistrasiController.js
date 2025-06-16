// controllers/KompetisiRegistrasiController.js

import { KompetisiModel, KompetisiRegistrasiModel, UserModel } from "../models/index.js";
import { Op } from "sequelize";

// --- USER ACCESS (requires authentication) ---

// Mendaftar ke kompetisi
export const registerKompetisi = async (req, res) => {
    // req.userId harus tersedia dari middleware autentikasi (misal: verifyUser)
    const userId = req.userId; // Dapatkan ID user dari token/sesi
    const { kompetisiId, nama_lengkap, jenjang_pendidikan, instansi_pendidikan,
        jurusan, no_telp, email, alasan_mengikuti } = req.body;

    if (!userId) {
        return res.status(401).json({ msg: "User tidak terautentikasi. Silakan login." });
    }

    try {
        // Cek apakah kompetisi itu ada dan sedang dalam masa pendaftaran
        const kompetisi = await KompetisiModel.findByPk(kompetisiId);
        if (!kompetisi) {
            return res.status(404).json({ msg: "Kompetisi tidak ditemukan." });
        }

        // Cek tanggal pendaftaran
        const now = new Date();
        const startDate = new Date(kompetisi.tanggal_mulai_pendaftaran);
        const endDate = new Date(kompetisi.tanggal_akhir_pendaftaran);

        // Jika tanggal mulai pendaftaran tidak ada atau sudah lewat tanggal akhir pendaftaran, atau belum mulai
        if (!kompetisi.tanggal_mulai_pendaftaran || now < startDate || now > endDate) {
            return res.status(400).json({ msg: "Pendaftaran untuk kompetisi ini sedang tidak dibuka atau sudah ditutup." });
        }

        // Cek apakah user sudah terdaftar di kompetisi ini
        const existingRegistration = await KompetisiRegistrasiModel.findOne({
            where: {
                userId: userId,
                kompetisiId: kompetisiId
            }
        });

        if (existingRegistration) {
            // Jika sudah terdaftar, kembalikan status 409 Conflict
            return res.status(409).json({ msg: "Anda sudah terdaftar untuk kompetisi ini." });
        }

        // Jika belum terdaftar dan kompetisi valid, buat pendaftaran
        await KompetisiRegistrasiModel.create({
            userId: userId,
            kompetisiId: kompetisiId,
            nama_lengkap: nama_lengkap,
            jenjang_pendidikan: jenjang_pendidikan,
            instansi_pendidikan: instansi_pendidikan,
            jurusan: jurusan,
            no_telp: no_telp,
            email: email,
            alasan_mengikuti: alasan_mengikuti,
            status_pendaftaran: 'diproses' // Default status
        });

        res.status(201).json({ msg: "Pendaftaran kompetisi berhasil." });

    } catch (error) {
        console.error("Error registering for kompetisi:", error);
        // Penting: Bedakan error validasi (misal dari Sequelize) dengan error server umum
        if (error.name === 'SequelizeValidationError') {
            return res.status(400).json({ msg: error.message });
        }
        res.status(500).json({ msg: error.message || "Kesalahan server saat mendaftar kompetisi." });
    }
};

// Mendapatkan semua pendaftaran user yang sedang login
export const getUserRegistrations = async (req, res) => {
    const userId = req.userId; // Dapatkan ID user dari token/sesi

    if (!userId) {
        return res.status(401).json({ msg: "User tidak terautentikasi." });
    }

    try {
        const registrations = await KompetisiRegistrasiModel.findAll({
            where: { userId: userId },
            include: [{
                model: KompetisiModel,
                as: 'registeredKompetisiDetail', // Pastikan alias ini sesuai dengan definisi asosiasi Anda
                attributes: [
                    'uuid', 'judul', 'gambar', 'tanggal_mulai_pendaftaran',
                    'tanggal_akhir_pendaftaran', 'biaya_pendaftaran', 'tingkat_kompetisi'
                ]
            }],
            attributes: [
                'uuid', 'status_pendaftaran', 'tanggal_pendaftaran', 'nama_lengkap', 'email'
            ],
            order: [['tanggal_pendaftaran', 'DESC']]
        });
        res.status(200).json(registrations);
    } catch (error) {
        console.error("Error fetching user registrations:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil pendaftaran Anda." });
    }
};

// Mendapatkan detail pendaftaran user untuk kompetisi tertentu (berdasarkan UUID kompetisi)
export const getUserRegistrationByKompetisiUuid = async (req, res) => {
    const userId = req.userId;
    const kompetisiUuid = req.params.kompetisiUuid; // Parameter UUID kompetisi

    if (!userId) {
        // Jika user belum login, langsung kembalikan isRegistered: false
        // Ini agar frontend tidak perlu menangani 401 sebagai error, tetapi sebagai "belum login"
        return res.status(200).json({ isRegistered: false, msg: "Anda belum login." });
    }

    try {
        const kompetisi = await KompetisiModel.findOne({
            where: { uuid: kompetisiUuid },
            attributes: ['id'] // Hanya perlu ID untuk FK
        });

        if (!kompetisi) {
            // Jika kompetisi tidak ditemukan, perlakukan seperti belum terdaftar
            return res.status(200).json({ isRegistered: false, msg: "Kompetisi tidak ditemukan." });
            // Atau Anda bisa tetap 404 jika ingin membedakan error kompetisi tidak ada.
            // Namun, untuk flow "sudah terdaftar atau belum", 200 dengan isRegistered: false lebih mulus.
        }

        const registration = await KompetisiRegistrasiModel.findOne({
            where: {
                userId: userId,
                kompetisiId: kompetisi.id
            },
            include: [{
                model: KompetisiModel,
                as: 'registeredKompetisiDetail', // Pastikan alias ini sesuai
                attributes: [
                    'uuid', 'judul', 'gambar', 'tanggal_mulai_pendaftaran',
                    'tanggal_akhir_pendaftaran', 'biaya_pendaftaran', 'tingkat_kompetisi'
                ]
            }],
            attributes: [
                'uuid', 'status_pendaftaran', 'tanggal_pendaftaran', 'nama_lengkap',
                'jenjang_pendidikan', 'instansi_pendidikan', 'jurusan', 'no_telp',
                'email', 'alasan_mengikuti'
            ]
        });

        if (!registration) {
            // Jika pendaftaran tidak ditemukan, kembalikan isRegistered: false
            return res.status(200).json({ isRegistered: false, msg: "Anda belum mendaftar untuk kompetisi ini." });
        }

        // Jika pendaftaran ditemukan
        return res.status(200).json({
            isRegistered: true,
            msg: "Anda sudah terdaftar untuk kompetisi ini.",
            registrationData: registration
        });

    } catch (error) {
        console.error("Error fetching user registration by kompetisi UUID:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil detail pendaftaran." });
    }
};

// Mendapatkan semua pendaftaran untuk kompetisi tertentu (oleh admin)
export const getRegistrationsByKompetisiUuid = async (req, res) => {
    const kompetisiUuid = req.params.kompetisiUuid;

    try {
        const kompetisi = await KompetisiModel.findOne({
            where: { uuid: kompetisiUuid },
            attributes: ['id', 'judul']
        });

        if (!kompetisi) {
            return res.status(404).json({ msg: "Kompetisi tidak ditemukan." });
        }

        const registrations = await KompetisiRegistrasiModel.findAll({
            where: { kompetisiId: kompetisi.id },
            include: [{
                model: UserModel,
                as: 'registrantUser', // Pastikan alias ini sesuai
                attributes: ['uuid', 'name', 'email'] // Ambil data user yang mendaftar
            }],
            attributes: [
                'uuid', 'nama_lengkap', 'email', 'no_telp', 'status_pendaftaran',
                'tanggal_pendaftaran', 'jenjang_pendidikan', 'instansi_pendidikan',
                'jurusan', 'alasan_mengikuti'
            ],
            order: [['tanggal_pendaftaran', 'ASC']]
        });
        res.status(200).json(registrations);
    } catch (error) {
        console.error("Error fetching registrations for kompetisi:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil daftar pendaftar." });
    }
};

export const getAllKompetisiRegistrations = async (req, res) => {
    try {
        const registrations = await KompetisiRegistrasiModel.findAll({ // Perbaikan di sini
            include: [
                {
                    model: UserModel,
                    as: 'registrantUser', // Pastikan alias ini sesuai dengan definisi di model
                    attributes: ['uuid', 'name', 'email']
                },
                {
                    model: KompetisiModel,
                    as: 'registeredKompetisiDetail', // Pastikan alias ini sesuai dengan definisi di model
                    attributes: ['uuid', 'judul', 'tingkat_kompetisi']
                }
            ],
            order: [['createdAt', 'DESC']]
        });
        res.status(200).json(registrations);
    } catch (error) {
        console.error("Error in getAllKompetisiRegistrations:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat mengambil semua pendaftaran." });
    }
};

// Memperbarui status pendaftaran (oleh admin)
export const updateRegistrationStatus = async (req, res) => {
    const { uuid } = req.params; // UUID dari pendaftaran, bukan kompetisi
    const { status_pendaftaran } = req.body;

    try {
        const registration = await KompetisiRegistrasiModel.findOne({
            where: { uuid: uuid }
        });

        if (!registration) {
            return res.status(404).json({ msg: "Pendaftaran tidak ditemukan." });
        }

        // Validasi status_pendaftaran yang diperbolehkan berdasarkan enum di model
        const allowedStatuses = ['diproses', 'seleksi berkas', 'diterima', 'ditolak'];
        if (!allowedStatuses.includes(status_pendaftaran)) {
            return res.status(400).json({ msg: "Status pendaftaran tidak valid." });
        }

        await KompetisiRegistrasiModel.update(
            { status_pendaftaran: status_pendaftaran },
            { where: { uuid: uuid } }
        );
        res.status(200).json({ msg: "Status pendaftaran berhasil diperbarui." });

    } catch (error) {
        console.error("Error updating registration status:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat memperbarui status pendaftaran." });
    }
};

// Menghapus pendaftaran (oleh admin atau user sendiri jika diizinkan)
export const deleteRegistration = async (req, res) => {
    const { uuid } = req.params; // UUID dari pendaftaran

    try {
        const registration = await KompetisiRegistrasiModel.findOne({
            where: { uuid: uuid }
        });

        if (!registration) {
            return res.status(404).json({ msg: "Pendaftaran tidak ditemukan." });
        }

        // Opsional: Tambahkan logika otorisasi jika user ingin menghapus pendaftarannya sendiri
        // if (registration.userId !== req.userId && req.userRole !== 'admin') {
        //     return res.status(403).json({ msg: "Anda tidak memiliki izin untuk menghapus pendaftaran ini." });
        // }

        await KompetisiRegistrasiModel.destroy({
            where: { uuid: uuid }
        });

        res.status(200).json({ msg: "Pendaftaran berhasil dihapus." });

    } catch (error) {
        console.error("Error deleting registration:", error);
        res.status(500).json({ msg: error.message || "Kesalahan server saat menghapus pendaftaran." });
    }
};