// controllers/Auth.js
import User from "../models/UserModel.js";
import argon2 from "argon2";

// Fungsi Login
export const Login = async (req, res) => {
    console.log("--- START Login controller ---");
    console.log("Login attempt for email:", req.body.email);

    const user = await User.findOne({
        where: {
            email: req.body.email
        }
    });

    if (!user) {
        console.log("Login: User not found for email:", req.body.email);
        return res.status(404).json({ msg: "User tidak ditemukan!" });
    }

    const match = await argon2.verify(user.password, req.body.password);
    if (!match) {
        console.log("Login: Password mismatch for user:", user.email);
        return res.status(400).json({ msg: "Password salah!" });
    }

    req.session.userId = user.id; 

    const uuid = user.uuid;
    const name = user.name;
    const email = user.email;
    const role = user.role;

    console.log(`Login berhasil untuk user: ${name} (${email}), UUID: ${uuid}`);
    res.status(200).json({ uuid, name, email, role, msg: "Login berhasil!" });
    console.log("--- END Login controller ---");
};

// Fungsi Register
export const Register = async (req, res) => {
    console.log("--- START Register controller ---");
    const { name, email, password, confPassword } = req.body;
    console.log(`Register attempt for email: ${email}, name: ${name}`);

    if (password !== confPassword) {
        console.log("Register: Password and Confirm Password do not match.");
        return res.status(400).json({ msg: "Password dan Confirm Password tidak cocok" });
    }

    try {
        const existingUser = await User.findOne({
            where: {
                email: email
            }
        });
        if (existingUser) {
            console.log("Register: Email already registered:", email);
            return res.status(409).json({ msg: "Email sudah terdaftar" });
        }

        const hashPassword = await argon2.hash(password);
        console.log("Register: Password hashed successfully.");

        await User.create({
            name: name,
            email: email,
            password: hashPassword,
            role: "user" // Role secara paten diatur 'user'
        });

        console.log("Register: User registered successfully:", email);
        res.status(201).json({ msg: "Register Berhasil" });
    } catch (error) {
        console.error("Error during registration:", error);
        if (error.name === 'SequelizeUniqueConstraintError') {
            console.log("Register: Sequelize unique constraint error - Email already exists.");
            return res.status(409).json({ msg: "Email sudah terdaftar" });
        }
        res.status(500).json({ msg: error.message || "Terjadi kesalahan server saat registrasi." });
    } finally {
        console.log("--- END Register controller ---");
    }
};

// Fungsi Me (mendapatkan informasi pengguna saat ini)
export const Me = async (req, res) => {
    console.log("--- START Me controller ---");
    console.log("Me: Checking session userId:", req.session.userId);

    if (!req.session.userId) {
        console.log("Me: No session userId found. Returning 401.");
        return res.status(401).json({ msg: "Mohon login ke akun Anda!" });
    }
    try {
        const user = await User.findOne({
            attributes: ['uuid', 'name', 'email', 'role'],
            where: {
                // --- PERBAIKAN PENTING: Gunakan user.id (integer) untuk mencari jika itu yang disimpan di sesi ---
                // Jika Anda menyimpan user.id di sesi (seperti yang saya perbaiki di Login), maka cari berdasarkan id.
                // Jika Anda _memang_ ingin menyimpan UUID di sesi, maka `where: { uuid: req.session.userId }` ini sudah benar.
                id: req.session.userId // <--- Perubahan di sini!
            }
        });
        if (!user) {
            console.log("Me: User not found for session userId:", req.session.userId);
            // Opsional: Hancurkan sesi yang tidak valid jika user tidak ditemukan
            req.session.destroy((err) => {
                if (err) console.error("Error destroying session after user not found in Me:", err);
            });
            return res.status(404).json({ msg: "User tidak ditemukan. Mungkin sudah dihapus atau sesi tidak valid." });
        }
        console.log("Me: User data retrieved for:", user.email);
        res.status(200).json(user);
    } catch (error) {
        console.error("Error in Me controller:", error);
        res.status(500).json({ msg: error.message || "Terjadi kesalahan server saat mengambil data user." });
    } finally {
        console.log("--- END Me controller ---");
    }
};

// Fungsi Logout
export const logOut = (req, res) => {
    console.log("--- START Logout controller ---");
    req.session.destroy((err) => {
        if (err) {
            console.error("Logout error:", err);
            return res.status(400).json({ msg: "Tidak dapat logout." });
        }
        console.log("Logout berhasil. Session destroyed.");
        res.status(200).json({ msg: "Anda telah logout." });
    });
    console.log("--- END Logout controller ---");
};