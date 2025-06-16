import UserModel from "../models/UserModel.js";
import argon2 from "argon2";
import crypto from "crypto"; // Untuk membuat token acak dan hashing SHA256
import { Sequelize } from "sequelize"; // Penting untuk [Sequelize.Op.gt]
import sendEmail from "../config/email.js"
import ForumModel from "../models/ForumModel.js"; // BARU: Import ForumModel

// --- Bagian GET USERS ---
export const getUsers = async(req, res) =>{
    try {
        const response = await UserModel.findAll({
            attributes:['uuid','name','email','role', 'createdAt', 'updatedAt']
        });
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getUsers:", error); // Tambahkan logging
        res.status(500).json({msg: error.message});
    }
};

// --- Bagian GET USER BY ID ---
export const getUserById = async(req, res) =>{
    try {
        const response = await UserModel.findOne({
            attributes:['uuid','name','email','role'],
            where: {
                uuid: req.params.id
            },
            include: [{ // BARU: Menambahkan include untuk forum yang dibuat user
                model: ForumModel,
                as: 'createdForums', // Pastikan alias ini cocok dengan definisi relasi di index.js
                attributes: ['uuid', 'judul', 'kategori', 'createdAt'] // Atribut forum yang ingin ditampilkan
            }]
        });
        if (!response) { // Tambahkan pengecekan jika user tidak ditemukan
            return res.status(404).json({ msg: "User tidak ditemukan." });
        }
        res.status(200).json(response);
    } catch (error) {
        console.error("Error in getUserById:", error); // Tambahkan logging
        res.status(500).json({msg: error.message});
    }
};

// --- Bagian CREATE USER ---
export const createUser = async(req, res) =>{
    const {name, email, password, confPassword, role} = req.body;

    if(password !== confPassword) return res.status(400).json({msg: "Password dan Confirm Password tidak cocok"});

    try {
        const existingUser = await UserModel.findOne({
            where: {
                email: email
            }
        });

        if (existingUser) {
            return res.status(409).json({msg: "Email sudah terdaftar. Gunakan email lain."});
        }

        const hashPassword = await argon2.hash(password);
        await UserModel.create({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        });
        res.status(201).json({msg: "Registrasi Berhasil"});

    } catch (error) {
        console.error("Error in createUser:", error); // Tambahkan logging
        res.status(400).json({msg: error.message});
    }
};

// --- Bagian UPDATE USER ---
export const updateUser = async(req, res) =>{
    const user = await UserModel.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});

    const {name, email, password, confPassword, role} = req.body;
    let hashPassword;

    if(password === "" || password === null || password === undefined){
        hashPassword = user.password;
    } else {
        if(password !== confPassword) return res.status(400).json({msg: "Password baru dan Confirm Password tidak cocok"});
        hashPassword = await argon2.hash(password);
    }
    
    try {
        await UserModel.update({
            name: name,
            email: email,
            password: hashPassword,
            role: role
        },{
            where:{
                id: user.id // Menggunakan user.id yang merupakan primary key, lebih konsisten
            }
        });
        res.status(200).json({msg: "User Updated"});
    } catch (error) {
        console.error("Error in updateUser:", error); // Tambahkan logging
        res.status(400).json({msg: error.message});
    }
};

// --- Bagian DELETE USER ---
export const deleteUser = async(req, res) =>{
    const user = await UserModel.findOne({
        where: {
            uuid: req.params.id
        }
    });
    if(!user) return res.status(404).json({msg: "User tidak ditemukan"});
    try {
        await UserModel.destroy({
            where:{
                id: user.id // Menggunakan user.id yang merupakan primary key, lebih konsisten
            }
        });
        res.status(200).json({msg: "User Deleted"});
    } catch (error) {
        console.error("Error in deleteUser:", error); // Tambahkan logging
        res.status(400).json({msg: error.message});
    }
};

// --- Bagian FORGOT PASSWORD ---
export const forgotPassword = async(req, res) => {
    const { email } = req.body;

    try {
        const user = await UserModel.findOne({
            where: { email: email }
        });

        if (!user) {
            // Penting: Jangan berikan informasi apakah email terdaftar atau tidak
            // Ini untuk mencegah enumerasi email. Beri respons sukses palsu.
            return res.status(200).json({ msg: "Jika email terdaftar, tautan reset password telah dikirim." });
        }

        // Hasilkan token MENTAH yang akan dikirim di URL email
        const resetToken = crypto.randomBytes(32).toString("hex");
        
        // Hash token MENTAH ini menggunakan SHA256 (bukan Argon2) untuk disimpan di DB
        const hashedResetToken = crypto.createHash('sha256').update(resetToken).digest('hex'); 
        
        const resetExpires = Date.now() + 3600000; // Token berlaku 1 jam (3600000 ms)

        await UserModel.update({
            resetPasswordToken: hashedResetToken, // Simpan HASH DARI TOKEN di DB
            resetPasswordExpires: resetExpires
        }, {
            where: { id: user.id }
        });

        // Buat URL reset password (gunakan token MENTAH di URL)
        // SESUAIKAN DENGAN URL FRONTEND ANDA SAAT DI-DEPLOY!
        const resetUrl = `${process.env.FRONTEND_URL || 'http://localhost:5173'}/reset-password/${resetToken}`; // Menggunakan variabel env untuk URL frontend
        // Perhatikan: ini harus http://localhost:3000/reset-password/:token di frontend
        // Jika frontend Anda menggunakan query parameter, ubah menjadi:
        // const resetUrl = `http://localhost:3000/reset-password?token=${resetToken}`;


        const subject = "Permintaan Reset Password";
        const htmlContent = `
            <p>Anda menerima email ini karena Anda (atau orang lain) telah meminta reset password untuk akun Anda.</p>
            <p>Silakan klik link berikut, atau salin dan tempel di browser Anda untuk menyelesaikan prosesnya:</p>
            <p><a href="${resetUrl}">${resetUrl}</a></p>
            <p>Link ini akan kedaluwarsa dalam 1 jam.</p>
            <p>Jika Anda tidak meminta ini, silakan abaikan email ini dan password Anda akan tetap sama.</p>
        `;

        // Gunakan fungsi sendEmail dari utils/sendEmail.js
        await sendEmail(user.email, subject, htmlContent);

        res.status(200).json({ msg: "Tautan reset password telah dikirim ke email Anda." });

    } catch (error) {
        console.error("Error in forgotPassword:", error);
        // Tangani error yang dilempar dari sendEmail.js
        res.status(500).json({ msg: error.message }); 
    }
};

// --- Bagian RESET PASSWORD ---
export const resetPassword = async(req, res) => {
    const { token } = req.params; // Ini adalah token MENTAH dari URL
    const { password, confPassword } = req.body;

    // --- DEBUGGING ---
    console.log('Received token from URL:', token);
    console.log('Received password:', password);
    console.log('Received confPassword:', confPassword);
    console.log('Are passwords identical?', password === confPassword);
    // --- END DEBUGGING ---

    if (password !== confPassword) {
        return res.status(400).json({ msg: "Password baru dan Confirm Password tidak cocok" });
    }

    try {
        // Hash token yang masuk dari URL sebelum membandingkannya dengan yang di DB
        const hashedTokenFromUrl = crypto.createHash('sha256').update(token).digest('hex'); // HASH TOKEN DARI URL

        const userFound = await UserModel.findOne({ // Langsung cari user dengan token yang sudah di-hash dan cek kadaluarsa
            where: {
                resetPasswordToken: hashedTokenFromUrl, // Bandingkan dua hash
                resetPasswordExpires: {
                    [Sequelize.Op.gt]: Date.now() // Pastikan token belum kedaluwarsa
                }
            }
        });

        if (!userFound) {
            return res.status(400).json({ msg: "Token reset password tidak valid atau telah kedaluwarsa." });
        }

        const hashNewPassword = await argon2.hash(password);

        await UserModel.update({
            password: hashNewPassword,
            resetPasswordToken: null, // Hapus token setelah digunakan
            resetPasswordExpires: null // Hapus masa berlaku token
        }, {
            where: { id: userFound.id }
        });

        res.status(200).json({ msg: "Password berhasil direset." });

    } catch (error) {
        console.error("Error in resetPassword:", error);
        res.status(500).json({ msg: error.message });
    }
};