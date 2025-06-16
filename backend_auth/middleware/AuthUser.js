// middleware/AuthUser.js
import UserModel from "../models/UserModel.js";

/**
 * Middleware untuk memverifikasi user berdasarkan sesi.
 * Memastikan user login dan menyematkan userId, role, dan userUuid ke objek req.
 */
export const verifyUser = async (req, res, next) => {
    // Log awal untuk debugging
    console.log("--- START verifyUser middleware ---");

    // 1. Cek apakah ada userId di sesi
    if (!req.session || !req.session.userId) {
        console.log("verifyUser: Sesi tidak ditemukan atau req.session.userId kosong. Mengembalikan 401.");
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }

    try {
        // 2. Cari user di database berdasarkan userId dari sesi
        const user = await UserModel.findOne({
            where: {
                id: req.session.userId // Memastikan mencari berdasarkan 'id' yang disimpan di req.session.userId
            },
            attributes: ['id', 'uuid', 'name', 'email', 'role'] // Pastikan 'id' dan 'role' diambil
        });

        // 3. Jika user tidak ditemukan
        if (!user) {
            console.log(`verifyUser: User tidak ditemukan untuk ID sesi: ${req.session.userId}. Mengembalikan 404.`);
            // Penting: Hancurkan sesi yang tidak valid jika user tidak ditemukan di database
            // Ini mencegah sesi 'hantu' jika data user terhapus dari DB tapi sesinya masih ada
            req.session.destroy((err) => {
                if (err) {
                    console.error("Error destroying session in verifyUser (user not found):", err);
                } else {
                    console.log(`verifyUser: Sesi user ID ${req.session.userId} berhasil dihancurkan.`);
                }
            });
            return res.status(404).json({ msg: "User tidak ditemukan. Sesi Anda mungkin tidak valid atau kedaluwarsa." });
        }

        // 4. Sematkan informasi user ke objek request
        // Ini memungkinkan handler route berikutnya untuk mengakses informasi user yang sudah diverifikasi
        req.userId = user.id;
        req.role = user.role;
        req.userUuid = user.uuid;

        console.log(`verifyUser: User berhasil diverifikasi. User ID: ${req.userId}, Role: ${req.role}, UUID: ${req.userUuid}`);
        console.log("--- END verifyUser middleware. Melanjutkan ke next() ---");
        next(); // Lanjutkan ke middleware atau controller berikutnya

    } catch (error) {
        // Tangani error jika ada masalah saat berinteraksi dengan database
        console.error("Error in verifyUser middleware (database query):", error);
        res.status(500).json({ msg: "Terjadi kesalahan server saat memverifikasi user." });
    }
};

/**
 * Middleware untuk membatasi akses hanya untuk user dengan peran 'admin'.
 * Middleware ini harus dijalankan setelah `verifyUser`.
 */
export const adminOnly = async (req, res, next) => {
    // Log awal untuk debugging
    console.log("--- START adminOnly middleware ---");

    // 1. Pastikan req.role tersedia dari middleware verifyUser yang dijalankan sebelumnya
    if (!req.role) {
        console.log("adminOnly: req.role tidak ditemukan. Ini menunjukkan verifyUser tidak dijalankan sebelumnya atau gagal. Mengembalikan 401.");
        // Berikan status 401 karena tidak terautentikasi (seharusnya verifyUser yang menangani ini dengan redirect ke login)
        // Atau, jika ini adalah jalur yang hanya diakses oleh admin, dan verifyUser tidak ada, ini adalah kesalahan konfigurasi route.
        return res.status(401).json({ msg: "Tidak terautentikasi atau peran tidak tersedia. Mohon login." });
    }

    // 2. Cek peran user
    if (req.role !== "admin") {
        console.log(`adminOnly: Peran '${req.role}' bukan admin. Mengembalikan 403 (Akses terlarang).`);
        return res.status(403).json({ msg: "Akses terlarang. Anda tidak memiliki izin admin." });
    }

    // 3. Jika user adalah admin, lanjutkan
    console.log("adminOnly: User adalah admin. Melanjutkan ke next().");
    console.log("--- END adminOnly middleware ---");
    next(); // Lanjutkan ke controller berikutnya
};