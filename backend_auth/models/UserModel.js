// models/UserModel.js
import { Sequelize, DataTypes } from "sequelize";
import db from "../config/Database.js";

const User = db.define('users', {
    // --- KOLOM ID (Primary Key) ---
    // Tambahkan id sebagai primary key jika Anda ingin menggunakannya untuk sesi
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false
    },
    uuid: {
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true, // Pastikan UUID juga unik
        validate: {
            notEmpty: true
        }
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true,
            len: [3, 100]
        }
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: true,
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            notEmpty: true
        }
    },
    role: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: 'user',
        validate: {
            notEmpty: true
        }
    },
    // --- KOLOM PROFIL UTAMA ---
    foto_profile: {
        type: DataTypes.STRING, // Path atau URL ke file foto profil di server lokal
        allowNull: true,
        defaultValue: null
    },
    url_foto_profile: {
        type: DataTypes.STRING, // URL publik untuk foto profil (misal dari CDN/Cloud Storage)
        allowNull: true,
       // defaultValue: null,
        //validate: {
          //  isUrl: {
          //      msg: "URL foto profil tidak valid." // Pesan kustom
        //    }
      //  }
    },
    foto_sampul: {
        type: DataTypes.STRING, // Path atau URL ke file foto sampul di server lokal
        allowNull: true,
        defaultValue: null
    },
    url_foto_sampul: {
        type: DataTypes.STRING, // URL publik untuk foto sampul
        allowNull: true,
        //defaultValue: null,
        //validate: {
        //    isUrl: {
          //      msg: "URL foto sampul tidak valid." // Pesan kustom
         //   }
       // }
    },
    bio: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    ttl: {
        type: DataTypes.DATEONLY, // Menyimpan tanggal lahir saja
        allowNull: true,
        defaultValue: null,
        validate: {
            isDate: true // Memastikan format tanggal yang valid
        }
    },
    jenis_kelamin: {
        type: DataTypes.ENUM('Laki-laki', 'Perempuan', 'Lainnya'), // Tambahkan 'Lainnya' untuk fleksibilitas
        allowNull: true,
        defaultValue: null
    },
    alamat: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    no_telp: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null,
        validate: {
            is: {
                args: /^[0-9+]*$/, // Hanya angka dan tanda plus
                msg: "Nomor telepon tidak valid." // Pesan kustom
            }
        }
    },
    nama_institusi: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    prodi: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    fakultas: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    semester: {
        type: DataTypes.INTEGER,
        allowNull: true,
        defaultValue: null,
        validate: {
            min: {
                args: 1,
                msg: "Semester minimal adalah 1."
            },
            max: {
                args: 14, // Maksimal semester mungkin perlu disesuaikan
                msg: "Semester maksimal adalah 14."
            },
            isInt: true // Memastikan nilainya adalah integer
        }
    },
    ipk: {
        type: DataTypes.DECIMAL(3, 2), // Total 3 digit, 2 di belakang koma (misal: 3.75)
        allowNull: true,
        //defaultValue: null,
        //validate: {
      //      min: {
    //            args: 0.00,
  //              msg: "IPK minimal adalah 0.00."
//            },
          //  max: {
         //       args: 4.00,
       //         msg: "IPK maksimal adalah 4.00."
     //       },
    //        isDecimal: true // Memastikan nilainya adalah desimal
   //     }
    },
    minat_bidang: {
        type: DataTypes.ENUM(
            'Teknologi Informasi & Digital',
            'Bisnis & Manajemen',
            'Kreatif & Media',
            'Kesehatan & Sosial',
            'Pendidikan & Penelitian',
            'Lingkungan & Sosial',
            'Sains & Matematika',
            'Hukum & Kebijakan Publik',
            'Seni & Budaya',
            'Pertanian & Pangan'
        ),
        allowNull: true,
        defaultValue: null
    },
    rencana: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    motivator_karir: {
        type: DataTypes.TEXT,
        allowNull: true,
        defaultValue: null
    },
    resetPasswordToken: {
        type: DataTypes.STRING,
        allowNull: true,
        defaultValue: null
    },
    resetPasswordExpires: {
        type: DataTypes.DATE, // Lebih baik gunakan DATE untuk tanggal/waktu
        allowNull: true,
        defaultValue: null,
        validate: {
            isDate: true // Memastikan format tanggal yang valid
        }
    },
    // --- KOLOM BARU: savedForums ---
    savedForums: {
        type: DataTypes.TEXT, // Akan menyimpan JSON string dari array UUID forum
        allowNull: true, // Bisa null jika user belum menyimpan forum
        defaultValue: '[]', // Defaultnya array kosong string JSON
        get() {
            // Getter untuk mengurai string JSON menjadi array saat diambil
            const rawValue = this.getDataValue('savedForums');
            return rawValue ? JSON.parse(rawValue) : [];
        },
        set(val) {
            // Setter untuk mengubah array menjadi string JSON sebelum disimpan
            this.setDataValue('savedForums', JSON.stringify(val));
        }
    }
}, {
    freezeTableName: true, // Nama tabel akan persis 'users'
    timestamps: true, // Otomatis menambahkan createdAt dan updatedAt
});

export default User;