import BeasiswaModel from "../models/BeasiswaModel.js";
import { Op } from "sequelize"; // Penting untuk operasi filter

// --- MENDAPATKAN SEMUA BEASISWA (Dapat Diakses Umum/User Biasa) ---
export const getBeasiswa = async (req, res) => {
    try {
        // Ambil filter dari query parameters (misal: /beasiswa?kategori=Sains&jenjang=S1)
        const { kategori, jenjang, lokasi, deadline } = req.query;

        // Bangun klausa 'where' berdasarkan filter yang diterima
        const whereClause = {};

        if (kategori) {
            // Mencari kategori yang mengandung string (case-insensitive jika database mendukung)
            whereClause.kategori = { [Op.like]: `%${kategori}%` };
        }
        if (jenjang) {
            // Mencari jenjang yang mengandung string
            whereClause.jenjang = { [Op.like]: `%${jenjang}%` };
        }
        if (lokasi) {
            // Mencari lokasi yang mengandung string
            whereClause.lokasi = { [Op.like]: `%${lokasi}%` };
        }
        if (deadline) {
            // Penanganan deadline:
            // Asumsi: frontend mengirim deadline dalam format "YYYY-MM-DD".
            // Di sini kita akan mencari beasiswa yang deadline-nya adalah tanggal tersebut
            // atau lebih lambat (>=) dari tanggal filter yang diberikan.
            try {
                // Konversi string deadline dari query menjadi objek Date.
                // Penting: Pastikan kolom 'deadline' di database Anda bertipe DATE atau DATETIME
                // agar perbandingan tanggal berfungsi dengan benar.
                const filterDate = new Date(deadline);

                // Validasi tanggal: Cek apakah hasil konversi adalah tanggal yang valid
                if (isNaN(filterDate.getTime())) {
                    return res.status(400).json({ msg: "Format tanggal deadline tidak valid. Gunakan format YYYY-MM-DD." });
                }

                // Menggunakan Op.gte (Greater Than or Equal) untuk mencari deadline yang belum lewat
                // atau tepat pada tanggal yang difilter.
                whereClause.deadline = { [Op.gte]: filterDate };
            } catch (error) {
                console.error("Error parsing deadline date in backend:", error);
                return res.status(400).json({ msg: "Kesalahan pemrosesan tanggal deadline." });
            }
        }

        // Jalankan query findAll dengan klausa where
        const response = await BeasiswaModel.findAll({
            where: whereClause, // Terapkan klausa 'where' di sini!
            // Anda bisa menyertakan atribut tertentu jika tidak ingin semua data beasiswa ditampilkan
            // attributes: ['uuid', 'title', 'description', 'kategori', 'jenjang', 'lokasi', 'deadline', 'img'],
            // Jika Anda ingin menyertakan informasi admin yang memposting, tambahkan 'include' di sini
            // include: [{ model: UserModel, as: 'postedBy', attributes: ['uuid', 'name'] }]
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getBeasiswa:", error);
        res.status(500).json({ msg: error.message });
    }
};

// --- MENDAPATKAN BEASISWA BERDASARKAN ID (Dapat Diakses Umum/User Biasa) ---
export const getBeasiswaById = async (req, res) => {
    try {
        const response = await BeasiswaModel.findOne({
            where: {
                uuid: req.params.id // Mencari berdasarkan UUID beasiswa
            },
            // include: [{ model: UserModel, as: 'postedBy', attributes: ['uuid', 'name'] }] // Opsional
        });

        if (!response) {
            return res.status(404).json({ msg: "Beasiswa tidak ditemukan" });
        }

        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getBeasiswaById:", error);
        res.status(500).json({ msg: error.message });
    }
};

// --- MEMBUAT BEASISWA BARU (Hanya Admin) ---
export const createBeasiswa = async (req, res) => {
    // Tambahkan 'penyelenggara' dan 'link' di sini
    const { img, title, description, detail, kategori, jenjang, lokasi, deadline, penyelenggara, link } = req.body;

    // Tambahkan validasi untuk 'penyelenggara'
    if (!title || !description || !detail || !kategori || !jenjang || !lokasi || !deadline || !penyelenggara) {
        return res.status(400).json({ msg: "Semua kolom wajib diisi kecuali link." });
    }

    try {
        await BeasiswaModel.create({
            img: img,
            title: title,
            description: description,
            detail: detail,
            kategori: kategori,
            jenjang: jenjang,
            lokasi: lokasi,
            deadline: deadline,
            penyelenggara: penyelenggara, // Tambahkan 'penyelenggara'
            link: link // Tambahkan 'link'
            // adminId: req.user.id, // Jika Anda memiliki kolom adminId dan middleware autentikasi
        });
        res.status(201).json({ msg: "Beasiswa berhasil ditambahkan" });
    } catch (error) {
        console.error("Error in createBeasiswa:", error);
        res.status(400).json({ msg: error.message });
    }
};

// --- MEMPERBARUI BEASISWA (Hanya Admin) ---
export const updateBeasiswa = async (req, res) => {
    const beasiswa = await BeasiswaModel.findOne({
        where: { uuid: req.params.id }
    });

    if (!beasiswa) {
        return res.status(404).json({ msg: "Beasiswa tidak ditemukan" });
    }

    // Tambahkan 'penyelenggara' dan 'link' di sini
    const { img, title, description, detail, kategori, jenjang, lokasi, deadline, penyelenggara, link } = req.body;

    // Tambahkan validasi untuk 'penyelenggara'
    if (!title || !description || !detail || !kategori || !jenjang || !lokasi || !deadline || !penyelenggara) {
        return res.status(400).json({ msg: "Semua kolom wajib diisi kecuali link." });
    }

    try {
        await BeasiswaModel.update({
            img: img,
            title: title,
            description: description,
            detail: detail,
            kategori: kategori,
            jenjang: jenjang,
            lokasi: lokasi,
            deadline: deadline,
            penyelenggara: penyelenggara, // Tambahkan 'penyelenggara'
            link: link // Tambahkan 'link'
        }, {
            where: { id: beasiswa.id } // Gunakan primary key 'id' untuk update
        });
        res.status(200).json({ msg: "Beasiswa berhasil diperbarui" });
    } catch (error) {
        console.error("Error in updateBeasiswa:", error);
        res.status(400).json({ msg: error.message });
    }
};

// --- MENGHAPUS BEASISWA (Hanya Admin) ---
export const deleteBeasiswa = async (req, res) => {
    const beasiswa = await BeasiswaModel.findOne({
        where: { uuid: req.params.id }
    });

    if (!beasiswa) {
        return res.status(404).json({ msg: "Beasiswa tidak ditemukan" });
    }

    try {
        await BeasiswaModel.destroy({
            where: { id: beasiswa.id } // Gunakan primary key 'id' untuk delete
        });
        res.status(200).json({ msg: "Beasiswa berhasil dihapus" });
    } catch (error) {
        console.error("Error in deleteBeasiswa:", error);
        res.status(400).json({ msg: error.message });
    }
};