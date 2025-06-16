-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Jun 16, 2025 at 04:12 AM
-- Server version: 11.7.2-MariaDB-log
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `edurise_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `articles`
--

CREATE TABLE `articles` (
  `uuid` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` longtext DEFAULT NULL,
  `link` varchar(255) NOT NULL,
  `penulis` varchar(255) NOT NULL,
  `kategori` enum('Beasiswa & Pendidikan','Pengembangan Diri & Karir','Tips Belajar & Produktivitas') NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `articles`
--

INSERT INTO `articles` (`uuid`, `judul`, `deskripsi`, `gambar`, `link`, `penulis`, `kategori`, `createdAt`, `updatedAt`) VALUES
('95270643-c5ab-4bf5-a300-79ac0fa7f4cb', 'Pengembangan Diri: 6 Langkah Melejitkan Potensi Diri dan Karir', 'Kemampuan pengembangan diri memegang peran penting dalam pertumbuhan kita secara pribadi maupun profesional. ', 'https://storage.googleapis.com/alami-prod-website-wp-stateless/2023/08/Simak-5-Cara-Mengatur-Keuangan-Rumah-Tangga-Agar-Tidak-Boncos-26.webp', 'https://alamisharia.co.id/blogs/pengembangan-diri-dan-karir/', 'alamisharia.co.id', 'Pengembangan Diri & Karir', '2025-05-31 22:35:32', '2025-05-31 22:35:32'),
('3876ad5b-dc6b-45d1-bea7-bdcbe2d5199a', '5 Tips Belajar yang Efektif, Efisien dan Tidak Membosankan', 'Sering kali belajar dapat menjadi hal yang membosankan dan melelahkan bagi beberapa anak.Untuk membuat proses belajar lebih efektif, efisien, dan tidak membosankan ada lho beberapa tips yang bisa dilakukan orang tua.', 'https://bekasi.binus.sch.id/wp-content/uploads/2023/10/5-Tips-Belajar-yang-Efektif-Efisien-dan-Tidak-Membosankan.png', 'https://bekasi.binus.sch.id/2023/10/5-tips-belajar-yang-efektif-efisien-dan-tidak-membosankan/', 'bekasi.binus.sch.id', 'Tips Belajar & Produktivitas', '2025-05-31 22:41:22', '2025-05-31 22:41:22'),
('862aa307-8f53-4332-84b0-56cce3a4f415', 'Pengembangan Diri Di Dunia Karier, Intip Strateginya Yuk!', 'Pengembangan diri didefinisikan sebagai sebuah proses yang dapat dilakukan oleh seseorang individu untuk memenuhi kebutuhan diri dalam memiliki dan menguasai suatu kompetensi ke arah yang lebih berkualitas.', 'https://images.pexels.com/photos/5673488/pexels-photo-5673488.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2', 'https://kelas.work/blogs/pengembangan-diri-di-dunia-karier%2C-intip-strateginya-yuk%21?utm_source', 'Deddy Setiawan', 'Pengembangan Diri & Karir', '2025-05-31 22:36:44', '2025-05-31 22:36:44'),
('2b36dae6-9331-4689-b98b-42ab1e27e285', 'Strategi Sukses Lolos Beasiswa Indonesia 2025: Jangan Sampai Ketinggalan!', 'kamu akan menemukan strategi ampuh untuk mendapatkan beasiswa, tips sukses lolos seleksi, serta berbagai informasi penting yang bisa meningkatkan peluangmu!', 'https://ourbeasiswa.com/wp-content/uploads/2025/03/AD_4nXcVExPBHB3RgwjU6j8lntJ95je-eECtMF4EcRsiTBtaKtITejCheXn3GcsV8NmU1k9XP4HMT3udUmgh6KtZr5CjcmkvUMcXXYGiIO860yKKi5Qr-ZVa9kBub9i7zZHjm_K4WH-0RA.jpg', 'https://ourbeasiswa.com/id/strategi-sukses-lolos-beasiswa-indonesia-2025-jangan-sampai-ketinggalan/', 'Latipah', 'Beasiswa & Pendidikan', '2025-05-31 22:38:43', '2025-06-11 02:52:23'),
('a7f57693-2fb5-4359-938f-4191e01bb77e', '5 Tips Agar Berhasil Meraih Beasiswa Luar Negeri di 2025', 'Meski banyak yang bercita-cita kuliah di luar negeri, proses untuk mencapainya sering kali penuh tantangan. Dibutuhkan strategi, persiapan matang, dan kemampuan untuk memenuhi persyaratan administratif yang sering kali cukup kompleks. Di sinilah pentingnya memahami langkah-langkah strategis agar bisa bersaing secara maksimal dan lolos seleksi.', 'https://penerjemahresmi.id/wp-content/uploads/2025/04/5-Tips-Agar-Berhasil-Meraih-Beasiswa-Luar-Negeri-di-2025.jpg', 'https://penerjemahresmi.id/5-tips-agar-berhasil-meraih-beasiswa-luar-negeri-di-2025/', 'Alma Salsabila', 'Beasiswa & Pendidikan', '2025-05-31 22:37:57', '2025-05-31 22:37:57'),
('ba0ce1f1-b70e-4fac-87ca-deff102bec5d', 'Langkah Sukses Meningkatkan Karir', 'Setiap orang di dunia ini pasti ingin sukses, meskipun konsep dan ekspektasi mengenai kesuksesan bagi masing-masing individu tidaklah sama. Sayangnya untuk mendapatkan kesuksesan tidak mudah dan membutuhkan perjuangan, pengorbanan serta kerja keras.', 'https://portalnews.stekom.ac.id/media/2578/langkah-sukses-meningkatkan-karir.jpg', 'https://stekom.ac.id/artikel/langkah-sukses-meningkatkan-karir?', 'Dr. Joseph Teguh Santoso, M.Kom', 'Pengembangan Diri & Karir', '2025-05-31 22:37:12', '2025-05-31 22:37:12'),
('944b2978-7a0c-4bba-9a9f-df6d43243d32', '10 Langkah Mengembangkan Diri untuk Karir yang Lebih Sukses', 'Mengembangkan diri adalah langkah penting dalam mencapai kesuksesan karir. Dunia kerja yang terus berkembang menuntut individu untuk selalu meningkatkan keterampilan dan kompetensi. Tanpa upaya pengembangan diri yang konsisten, seseorang bisa tertinggal dalam persaingan dan kehilangan peluang emas dalam dunia profesional.', 'https://portalnews.stekom.ac.id/media/10805/conversions/10-langkah-mengembangkan-diri-untuk-karir-yang-lebih-sukses-1200x690.jpg?t=1748860545485', 'https://toploker.com/tips/10-langkah-mengembangkan-diri-untuk-karir-yang-lebih-sukses?utm_source', 'wizdan ulum', 'Pengembangan Diri & Karir', '2025-05-31 22:36:58', '2025-05-31 22:36:58'),
('360baf07-a68e-44f6-a5c8-f5bf77208856', 'Panduan Lengkap Beasiswa LPDP 2025', 'Siap mencuri start dan mempersiapkan diri untuk mengikuti beasiswa LPDP 2025? Simak informasi lengkapnya di artikel ini dan mulai langkah pertama menuju impianmu!', 'https://images.ctfassets.net/szez98lehkfm/1ugqw2XV7Zc4DYxNPVOge3/0fad76aac9c2d4f8c3841b392ea01b83/MyIC_Article141539?fm=webp', 'https://www.hotcourses.co.id/study-abroad-info/student-finance/beasiswa-unggulan-lpdp-kemenkeu/', 'Eky Ilmastuti', 'Beasiswa & Pendidikan', '2025-05-31 22:38:10', '2025-05-31 22:38:10'),
('d2c0335a-9a71-4130-beb8-f04f0bca28c1', '10 Tips Ampuh Lolos LPDP 2025: Panduan Lengkap dari Persiapan hingga Wawancara', 'Beasiswa LPDP (Lembaga Pengelola Dana Pendidikan) merupakan salah satu beasiswa paling bergengsi di Indonesia. Setiap tahunnya, ribuan pelamar bersaing untuk mendapatkan kesempatan emas ini.', 'https://www.monash.edu/__data/assets/image/0005/3881444/tips-lolos-lpdp-study-in-front-of-laptop.jpg', 'https://www.monash.edu/indonesia/news/tips-lolos-lpdp-lpdpcampaignid?', 'Monash University', 'Beasiswa & Pendidikan', '2025-05-31 22:38:25', '2025-05-31 22:38:25');

-- --------------------------------------------------------

--
-- Table structure for table `beasiswa`
--

CREATE TABLE `beasiswa` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `img` longtext DEFAULT NULL,
  `title` varchar(255) NOT NULL,
  `description` text NOT NULL,
  `detail` text DEFAULT NULL,
  `kategori` enum('Beasiswa','Pelatihan') NOT NULL,
  `jenjang` enum('D3','S1/D4','S2') NOT NULL,
  `lokasi` enum('DKI Jakarta','Jawa Barat','Jawa Timur') NOT NULL,
  `deadline` date NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `penyelenggara` varchar(255) NOT NULL,
  `link` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `beasiswa`
--

INSERT INTO `beasiswa` (`id`, `uuid`, `img`, `title`, `description`, `detail`, `kategori`, `jenjang`, `lokasi`, `deadline`, `createdAt`, `updatedAt`, `penyelenggara`, `link`) VALUES
(2, 'be514783-c1b5-4784-b1a3-85a7398e5fe5', '/img/scholarshiphub/img5.jpg', 'Beasiswa Unggulan Kemendikbud', 'Beasiswa prestisius dari Kementerian Pendidikan dan Kebudayaan untuk putra-putri terbaik bangsa. Menawarkan pembiayaan penuh bagi mahasiswa S1 hingga S3 yang memiliki prestasi akademik maupun non-akademik.', 'Program beasiswa dari Kemendikbudristek untuk mahasiswa S1 dan S2 di perguruan tinggi dalam negeri.\r\n✅ Syarat Utama\r\n- WNI dan tidak sedang menerima beasiswa lain.\r\n- Sudah diterima / aktif kuliah di perguruan tinggi terakreditasi.\r\n- Prestasi nasional/internasional (akademik/non-akademik).\r\n- IPK min. S2: 3.25 | Rapor S1: rata-rata min. 8.5.\r\n🎁 Manfaat\r\n- Biaya kuliah penuh.\r\n- Uang saku bulanan.\r\n- Tunjangan buku & penelitian.\r\n- Pelatihan soft skill & sertifikasi.\r\n🗓️ Timeline 2025\r\n- Pendaftaran: Juni - Agustus\r\n- Seleksi: September\r\n- Pengumuman: Oktober\r\n- Mulai Pendanaan: Semester Ganjil 2025/2026\r\n📝 Cara Daftar\r\n- Kunjungi: beasiswaunggulan.kemdikbud.go.id\r\n- Buat akun & lengkapi data\r\n- Unggah dokumen (transkrip, sertifikat, esai, surat rekomendasi)\r\n- Kirim formulir & ikuti seleksi', 'Beasiswa', 'S1/D4', 'DKI Jakarta', '2025-06-11', '2025-05-31 14:43:53', '2025-06-10 18:11:45', 'Kemdikbud', 'https://beasiswaunggulan.kemdikbud.go.id/'),
(3, '50375866-07dc-43a9-a5ad-d1df7988f2b3', '/img/scholarshiphub/img2.jpg', 'Beasiswa LPDP Reguler Dalam Negeri', 'Program beasiswa dari Kementerian Keuangan yang membiayai kuliah S2 atau S3 di universitas unggulan Indonesia. Dilengkapi dengan pembinaan kepemimpinan, pengembangan diri, dan jejaring nasional. Ideal untuk kamu yang ingin jadi agen perubahan Indonesia dari dalam negeri.', 'Beasiswa dari Kementerian Keuangan untuk studi S2 dan S3 di universitas top Indonesia.\n✅ Syarat Utama\n- WNI dengan IPK min. S1: 3.00 | S2: 3.25.\n- TOEFL iBT min. 80 atau IELTS min. 6.5.\n- Tidak sedang menerima beasiswa lain.\n- Komitmen kembali dan kontribusi di Indonesia.\n🎁 Manfaat\n- Biaya pendidikan dan pendaftaran.\n- Tunjangan hidup, visa, asuransi, dan transportasi.\n- Dana konferensi, publikasi, dan buku.\n🗓️ Timeline 2025\n- Pendaftaran: Februari - Maret\n- Seleksi: April - Juni\n- Pengumuman: Juli\n- Keberangkatan: Sesuai jadwal kampus\n📝 Cara Daftar\n- Akses: lpdp.kemenkeu.go.id\n- Buat akun, isi form & unggah dokumen\n- Ikuti seleksi administrasi dan substansi\n- Lolos wawancara & medcheck', 'Beasiswa', 'S1/D4', 'DKI Jakarta', '2025-03-02', '2025-05-31 14:44:08', '2025-06-11 03:25:08', 'LPDP', 'https://lpdp.kemenkeu.go.id/'),
(4, 'e068f3c5-7c78-424f-8be6-91e8da65bc16', '/img/scholarshiphub/img9.jpg', 'Beasiswa Djarum Plus', 'Lebih dari sekadar bantuan dana pendidikan! Beasiswa ini memberikan pelatihan soft skill eksklusif seperti public speaking, leadership, dan project management. Dibuka untuk mahasiswa S1 semester 4 dari seluruh perguruan tinggi di Indonesia.', 'Beasiswa pengembangan diri dan soft skill untuk mahasiswa S1 semester 4 yang aktif dan berprestasi.\n✅ Syarat Utama\n- Mahasiswa aktif semester 4 dari universitas mitra.\n- IPK ≥ 3.00.\n- Aktif berorganisasi & punya semangat kontribusi.\n🎁 Manfaat\n- Dana beasiswa selama 1 tahun.\n- Pelatihan soft skill: komunikasi, teamwork, leadership.\n- Jaringan nasional alumni.\n🗓️ Timeline 2025\n- Pendaftaran: April - Mei\n- Seleksi Administratif: Juni\n- Wawancara: Juli\n- Pengumuman: Agustus\n📝 Cara Daftar\n- Daftar di: djarumbeasiswaplus.org\n- Unggah transkrip, CV, dan surat rekomendasi\n- Ikuti seleksi & wawancara', 'Beasiswa', 'S1/D4', 'DKI Jakarta', '0000-00-00', '2025-05-31 14:44:21', '2025-05-31 14:44:21', 'Djarum Beasiswa Plus', 'https://djarumbeasiswaplus.org/'),
(5, '21980cf1-db16-4965-b4a3-36d2ad7a2d63', '/img/scholarshiphub/img10.png', 'Beasiswa Bank Indonesia', 'Program beasiswa yang tidak hanya mendanai biaya kuliah, juga membuka akses pelatihan, mentoring, dan jaringan kepemimpinan muda BI. Sangat cocok untuk mahasiswa yang ingin kontributif, dan punya cita-cita membangun negeri.', 'Diperuntukkan bagi mahasiswa S1 aktif yang berprestasi dan ingin menjadi agen perubahan di bidang ekonomi dan sosial.\n✅ Syarat Utama\n- Mahasiswa S1 aktif semester 3 - 6.\n- IPK minimal 3.00.\n- Tidak sedang menerima beasiswa lain.\n- Aktif dalam kegiatan sosial/organisasi kampus.\n🎁 Manfaat\n- Tunjangan pendidikan dan uang saku.\n- Pelatihan kepemimpinan dan seminar nasional.\n- Bergabung dengan komunitas GenBI (Generasi Baru Indonesia).\n🗓️ Timeline 2025\n- Pendaftaran: Januari\n- Seleksi dan wawancara: Februari - Maret\n- Pengumuman: April\n📝 Cara Daftar\n- Cek info di website kampus & BI terdekat\n- Isi formulir, unggah dokumen\n- Ikuti tahapan seleksi kampus & BI', 'Beasiswa', 'S1/D4', 'DKI Jakarta', '0000-00-00', '2025-05-31 14:44:35', '2025-05-31 14:44:35', 'Bank Indonesia', 'https://bicara131.bi.go.id/knowledgebase/article/KA-01149/en-us'),
(6, '91245631-3b1a-4898-9124-d3ee7763cab8', '/img/scholarshiphub/img3.jpg', 'Beasiswa Sobat Bumi Pertamina Foundation', 'Beasiswa untuk mahasiswa S1 aktif di berbagai perguruan tinggi negeri dan swasta. Diperuntukkan bagi mahasiswa berprestasi dan peduli lingkungan, dengan dukungan dana pendidikan dan pelatihan kepemimpinan berkelanjutan.', 'Beasiswa hijau untuk mahasiswa yang aktif peduli lingkungan & memiliki semangat kepemimpinan.\n✅ Syarat Utama\n- Mahasiswa S1 semester 2 - 6.\n- IPK minimal 3.00.\n- Aktif kegiatan sosial/lingkungan.\n- Belum menerima beasiswa lain.\n🎁 Manfaat\n- Dana pendidikan hingga lulus.\n- Program pelatihan keberlanjutan.\n- Jaringan Sobat Bumi Nasional.\n🗓️ Timeline 2025\n- Pendaftaran: Mei - Juli\n- Seleksi berkas dan wawancara: Agustus\n- Pengumuman: September\n📝 Cara Daftar\n- Akses: sobatbumi.pertaminafoundation.org\n- Buat akun & isi data\n- Unggah dokumen & esai motivasi', 'Pelatihan', 'D3', 'DKI Jakarta', '0000-00-00', '2025-05-31 14:45:42', '2025-05-31 14:45:42', 'Sobat Bumi Pertamina', 'https://indbeasiswa.com/beasiswa-pertamina-sobat-bumi/'),
(7, '4a64f435-a538-42e3-b3e0-d12640b9b11c', '/img/scholarshiphub/img1.jpg', 'Pelatihan Data Analyst Google', 'Program pelatihan bersertifikat resmi dari Google untuk karier di bidang analisis data. Cocok untuk pemula, dengan pendekatan praktis dan studi kasus, serta tersedia bahasa Indonesia untuk memudahkan pemahaman.', 'Program pelatihan profesional bersertifikat dari Google untuk membangun karier sebagai analis data, cocok bagi pemula maupun profesional muda.\n✅ Syarat Utama\n- WNI berusia ≥18 tahun.\n- Minimal lulusan SMA/SMK.\n- Tidak perlu latar belakang IT atau statistik.\n- Memiliki motivasi belajar mandiri secara online.\n🎁 Manfaat\n- Sertifikat resmi dari Google.\n- Materi berstandar industri (SQL, Tableau, R, Python dasar).\n- Bisa diakses kapan saja (flexible learning).\n- Dikenal oleh perekrut besar.\n🗓️ Timeline 2025\n- Pendaftaran: Sepanjang tahun\n- Durasi pelatihan: 3-6 bulan (self-paced)\n- Sertifikasi setelah menyelesaikan semua modul & ujian\n📝 Cara Daftar\n- Kunjungi: grow.google/intl/id_id/certificates/\n- Pilih program Data Analyst\n- Buat akun Coursera & mulai belajar\n- Selesaikan semua modul dan ujian', 'Beasiswa', 'D3', 'Jawa Barat', '0000-00-00', '2025-05-31 14:46:57', '2025-05-31 14:46:57', 'Coursera', 'https://www.coursera.org/professional-certificates/google-data-analytics?utm_medium=sem&utm_source=bg&utm_campaign=b2c_apac_google-data-analytics_google_ftcof_professional-certificates_cx_dr_bau_bg_sem_pr_s2_en_m_x_25-06_x&campaignid=663438577&adgroupid=1'),
(8, '2e311c34-5278-4d40-bce1-dc058f766eb1', '/img/scholarshiphub/img7.jpg', 'Beasiswa Baznas Cendikia', 'Beasiswa khusus untuk mahasiswa dari keluarga kurang mampu yang memiliki semangat belajar tinggi. Selain pembiayaan, kamu akan tergabung dalam komunitas sosial Baznas dan dibekali karakter serta kepemimpinan Islami.', 'Beasiswa nasional dari Badan Amil Zakat Nasional untuk mahasiswa dari keluarga kurang mampu namun memiliki semangat belajar tinggi dan karakter Islami.\n✅ Syarat Utama\n- Mahasiswa S1 aktif dari PTN/PTS mitra Baznas.\n- IPK minimal 3.00.\n- Keluarga berpenghasilan rendah (dibuktikan dokumen).\n- Tidak sedang menerima beasiswa lain.\n🎁 Manfaat\n- Dana pendidikan hingga Rp 4.000.000/semester.\n- Pelatihan pengembangan karakter Islami.\n- Jaringan komunitas Baznas.\n🗓️ Timeline 2025\n- Pendaftaran: Maret - April\n- Seleksi Administratif & Wawancara: Mei - Juni\n- Pengumuman: Juli\n📝 Cara Daftar\n- Akses: beasiswa.baznas.go.id\n- Lengkapi biodata & unggah dokumen keluarga dan IPK\n- Sertakan surat rekomendasi & esai motivasi', 'Beasiswa', 'S1/D4', 'Jawa Timur', '0000-00-00', '2025-05-31 14:47:10', '2025-05-31 14:47:10', 'Baznas', 'https://beasiswa.baznas.go.id/'),
(9, '69853d91-9f03-49b8-9331-8ff60bdfec83', '/img/scholarshiphub/img8.jpg', 'Beasiswa Sahabat Guru', 'Beasiswa pendidikan dan pelatihan untuk calon guru dan pendidikan. Dirancang untuk mencetak tenaga pendidik muda kompeten, berdedikasi, dan siap berkontribusi bagi pendidikan Indonesia.', 'Program beasiswa dan pelatihan bagi calon pendidik dan mahasiswa jurusan pendidikan untuk meningkatkan kualitas pengajaran dan kompetensi profesional guru masa depan.\n✅ Syarat Utama\n- Mahasiswa aktif jurusan pendidikan (PGSD, PGTK, P.Matematika, dll).\n- Semester 3 - 7.\n- IPK min. 3.00 dan aktif berorganisasi.\n- Komitmen menjadi tenaga pendidik.\n🎁 Manfaat\n- Bantuan pendidikan satu tahun.\n- Pelatihan pedagogi & microteaching.\n- Mentoring oleh guru senior & pengajar profesional.\n🗓️ Timeline 2025\n- Pendaftaran: Februari - Maret\n- Seleksi & Ujian Tes Online: April\n- Wawancara Final: Mei\n- Pengumuman: Juni\n📝 Cara Daftar\n- Cek informasi di: sahabatguru.org\n- Daftar online & unggah dokumen akademik\n- Ikuti pelatihan & asesmen lanjutan', 'Beasiswa', 'D3', 'Jawa Timur', '0000-00-00', '2025-05-31 14:47:25', '2025-05-31 14:47:25', 'Sahabat Guru', 'https://sahabatguru.com/'),
(10, 'db4294de-d45a-4ba9-815a-eeb654e38913', '/img/scholarshiphub/img6.jpg', 'Program Magang Kampus Merdeka', 'Program beasiswa yang tidak hanya mendanai biaya kuliah, juga membuka akses pelatihan, mentoring, dan jaringan kepemimpinan muda. Sangat cocok untuk mahasiswa yang ingin aktif, kontributif, dan punya cita-cita membangun negeri.', 'Program magang dari Kementerian Pendidikan yang memberi mahasiswa pengalaman kerja nyata di dunia industri, startup, BUMN, dan lembaga pemerintah.\n✅ Syarat Utama\n- Mahasiswa aktif minimal semester 5.\n- IPK minimal 2.75.\n- Rekomendasi dari prodi atau dosen pembimbing.\n- Komitmen mengikuti program penuh waktu (20 minggu).\n🎁 Manfaat\n- Pengalaman kerja langsung di industri.\n- Sertifikat magang resmi dari Kemendikbud.\n- Uang saku & pelatihan dari mitra magang.\n- Konversi SKS hingga 20 SKS.\n🗓️ Timeline 2025\n- Pendaftaran: Juli\n- Pelaksanaan magang: Agustus - Desember\n- Pelaporan akhir: Januari\n📝 Cara Daftar\n- Akses: kampusmerdeka.kemdikbud.go.id\n- Pilih posisi magang & unggah berkas\n- Tunggu seleksi dari mitra & konfirmasi prodi', 'Pelatihan', 'S1/D4', 'Jawa Barat', '0000-00-00', '2025-05-31 14:47:40', '2025-05-31 14:47:40', 'Kampus Merdeka', 'https://kampusmerdeka.kemdikbud.go.id/'),
(11, '87879862-ead0-4cf8-b659-708094d69beb', '/img/scholarshiphub/img4.jpg', 'Pelatihan Soft Skill Prakerja', 'Tingkatkan kepercayaan diri, cara berkomunikasi, dan kepemimpinan melalui kelas interaktif. Cocok untuk mahasiswa atau fresh graduate yang ingin siap menghadapi dunia kerja.', 'Pelatihan keterampilan non-teknis dari Program Kartu Prakerja untuk meningkatkan kesiapan kerja bagi mahasiswa dan fresh graduate.\n✅ Syarat Utama\n- WNI berusia ≥18 tahun.\n- Tidak sedang sekolah atau kuliah formal.\n- Tidak sedang menerima bantuan sosial pemerintah lain.\n- Diutamakan pencari kerja/pengangguran.\n🎁 Manfaat\n- Pelatihan keterampilan soft skill (public speaking, leadership, komunikasi).\n- Sertifikat penyelesaian dari lembaga pelatihan.\n- Insentif saldo pelatihan & pengisian survei.\n🗓️ Timeline 2025\n- Pendaftaran Gelombang: Setiap bulan\n- Pelatihan bisa dimulai setelah lolos gelombang\n- Waktu belajar: 1-4 minggu\n📝 Cara Daftar\n- Akses: prakerja.go.id\n- Verifikasi data & ikut seleksi gelombang\n- Pilih pelatihan di mitra (Skill Academy, Pintaria, dll)\n- Ikuti hingga selesai & dapatkan insentif', 'Beasiswa', 'D3', 'Jawa Barat', '2025-04-24', '2025-05-31 14:48:30', '2025-06-11 03:54:13', 'Indonesia Skill Week', 'https://skillsweek.prakerja.go.id/');

-- --------------------------------------------------------

--
-- Table structure for table `diskusi`
--

CREATE TABLE `diskusi` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `keahlian` enum('Computer','Desain UI/UX','Digital Marketing','Sains','Bisnis') NOT NULL,
  `link` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `diskusiPicture` longtext DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `diskusi`
--

INSERT INTO `diskusi` (`id`, `uuid`, `judul`, `deskripsi`, `keahlian`, `link`, `userId`, `createdAt`, `updatedAt`, `diskusiPicture`) VALUES
(1, 'e816a0b3-d9e1-4f61-8a70-ebcb7de4f112', 'Diskusi Masa Depan Teknologi', 'Mari kita bahas tren dan inovasi terkini di dunia teknologi, mulai dari AI, blockchain, hingga komputasi kuantum.', 'Computer', 'https://discord.com/qqw', 1, '2025-06-04 08:06:10', '2025-06-11 20:10:29', '/images/discussions/1749672629048.jpg'),
(2, '73451b1f-8018-43a0-b744-98d31c7c55be', 'Membangun Karier di Era Digital: Tantangan dan Peluang', 'Diskusi interaktif tentang bagaimana mempersiapkan diri untuk pasar kerja yang terus berubah, skill yang dibutuhkan, dan strategi mencari peluang di industri digital.', 'Bisnis', 'https://discord.com/category/community', 1, '2025-06-04 08:06:56', '2025-06-11 20:09:59', '/images/discussions/1749672599599.jpg'),
(3, '1c989398-48e2-431e-9b6b-cde021640096', 'Strategi Sukses Lolos Beasiswa Indonesia 2025: Jangan Sampai Ketinggalan!', 'awwwwww', 'Computer', 'https://discord.com/category', 1, '2025-06-11 20:06:22', '2025-06-11 20:06:44', '/images/discussions/1749672404331.jpg');

-- --------------------------------------------------------

--
-- Table structure for table `essays`
--

CREATE TABLE `essays` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `isi_essay` text NOT NULL,
  `tanggal_submit` datetime NOT NULL,
  `total_skor` int(3) NOT NULL DEFAULT 0,
  `feedback_ready` tinyint(1) NOT NULL DEFAULT 0,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `essays`
--

INSERT INTO `essays` (`id`, `userId`, `isi_essay`, `tanggal_submit`, `total_skor`, `feedback_ready`, `createdAt`, `updatedAt`) VALUES
(1, 17, 'Ini adalah contoh esai yang saya kirimkan untuk penilaian. Saya berharap mendapatkan feedback yang konstruktif dan skor yang baik. Esai ini membahas tentang pentingnya pendidikan di era digital.', '2025-06-03 06:42:09', 85, 1, '2025-06-03 06:42:09', '2025-06-03 07:29:31'),
(6, 17, 'mau mencoba  hjxgiuAXKN\r\nzjhjgak\r\njaXFUgikZ\r\nxkzgaiuszgiu\r\n\\azuHI\r\nJGSXAIUsajkoi\r\najkxvBIUI', '2025-06-05 16:00:15', 0, 0, '2025-06-05 16:00:15', '2025-06-13 12:42:45'),
(7, 17, 'gatausjkaaaaaajksknsk', '2025-06-11 12:51:07', 80, 1, '2025-06-11 12:51:07', '2025-06-11 12:51:07');

-- --------------------------------------------------------

--
-- Table structure for table `forum`
--

CREATE TABLE `forum` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `konten` text NOT NULL,
  `kategori` enum('Computer','Desain UI/UX','Digital Marketing','Sains','Bisnis') NOT NULL,
  `discordLink` varchar(255) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `forum`
--

INSERT INTO `forum` (`id`, `uuid`, `userId`, `judul`, `konten`, `kategori`, `discordLink`, `createdAt`, `updatedAt`) VALUES
(2, '1c0b9629-4336-4597-935c-54dac5fd98fa', 17, 'Diskusi Karier IT & Teknologi', 'Tempat berbagi tips, lowongan, dan pengalaman seputar dunia karier di bidang IT. Mari kita saling dukung dalam menemukan pekerjaan impian atau meningkatkan skill di industri teknologi.', 'Computer', 'https://discord.gg/karieritXYZ', '2025-06-06 20:00:13', '2025-06-06 20:00:13'),
(3, '382cf7f8-d4dd-4e12-9dd2-f362b4b8f8ef', 21, 'Diskusi Mendalam tentang Kecerdasan Buatan (AI)', 'Forum ini didedikasikan untuk membahas topik-topik terkini seputar Kecerdasan Buatan, mulai dari Machine Learning, Deep Learning, Natural Language Processing, hingga etika AI. Cocok untuk mahasiswa, profesional, dan siapa pun yang tertarik mendalami dunia AI. Mari berbagi pengetahuan dan ide!', 'Computer', 'https://discord.gg/AICommunity', '2025-06-06 20:05:38', '2025-06-06 20:05:38'),
(5, 'af1dc8af-5907-4884-b1b6-89f76ba63092', 1, 'Diskusi Karier IT & Teknologi', 'aku adalah anak gembala', 'Desain UI/UX', 'https://discord.gg/AIatau', '2025-06-12 13:36:17', '2025-06-12 13:49:37'),
(7, '1c0b9629-4336-4597-935c-54dac5fd98ya', 17, 'Diskusi Karier IT & Teknologi ha', 'Tempat berbagi tips, lowongan, dan pengalaman seputar dunia karier di bidang IT. Mari kita saling dukung dalam menemukan pekerjaan impian atau meningkatkan skill di industri teknologi.', 'Computer', 'https://discord.gg/karieritXYZa', '2025-06-06 20:00:13', '2025-06-15 06:11:02');

-- --------------------------------------------------------

--
-- Table structure for table `forum_participants`
--

CREATE TABLE `forum_participants` (
  `joinedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `forumId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `kompetisi`
--

CREATE TABLE `kompetisi` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `gambar` longtext DEFAULT NULL,
  `tanggal_mulai_pendaftaran` date DEFAULT NULL,
  `tanggal_akhir_pendaftaran` date DEFAULT NULL,
  `biaya_pendaftaran` varchar(255) DEFAULT NULL,
  `tingkat_kompetisi` enum('Nasional','Internasional','Provinsi','Regional','Internal Kampus') DEFAULT NULL,
  `tentang_kompetisi` text DEFAULT NULL,
  `syarat_ketentuan` text DEFAULT NULL,
  `ketentuan_penilaian` text DEFAULT NULL,
  `manfaat_partisipasi` text DEFAULT NULL,
  `bantuan_didapat` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kompetisi`
--

INSERT INTO `kompetisi` (`id`, `uuid`, `judul`, `gambar`, `tanggal_mulai_pendaftaran`, `tanggal_akhir_pendaftaran`, `biaya_pendaftaran`, `tingkat_kompetisi`, `tentang_kompetisi`, `syarat_ketentuan`, `ketentuan_penilaian`, `manfaat_partisipasi`, `bantuan_didapat`, `createdAt`, `updatedAt`) VALUES
(2, '1f1dc561-c848-4707-9ee1-831a04ac496b', 'OSPN - Advance Level (Jan-Mar 2025)', '/img/eduevent/img_infinibee60600x800.png', '2025-06-15', '2025-07-30', 'Gratis', 'Nasional', 'OSPN Advance Level adalah ajang bergengsi bagi siswa/i SMA yang ingin menguji kemampuan di bidang sains dan matematika. Tahap ini merupakan persiapan untuk kompetisi tingkat internasional.', 'Peserta adalah siswa/i SMA/sederajat, memiliki nilai rata-rata sains/matematika minimal 85, melampirkan surat rekomendasi guru.', 'Seleksi online, babak penyisihan, semi-final, dan final. Penilaian berdasarkan akurasi jawaban dan kecepatan.', 'Sertifikat, medali (emas, perak, perunggu), beasiswa pendidikan, hadiah uang tunai.', 'Beasiswa pendidikan untuk 3 pemenang terbaik, uang pembinaan.', '2025-06-03 03:16:36', '2025-06-03 03:16:36'),
(3, 'd0756dfb-164a-4c28-9de4-d99788246631', 'OSPN - Advance Level (Apr-Jun 2025)', '/img/eduevent/img_infinibee60600x800_248x203.png', '2025-06-10', '2025-07-30', 'Gratis', 'Nasional', 'Lanjutan dari OSPN sebelumnya, mempersiapkan peserta untuk tantangan yang lebih kompleks dan kompetisi yang lebih tinggi.', 'Siswa/i SMA/sederajat, telah mengikuti OSPN sebelumnya (opsional), memenuhi kriteria akademik.', 'Mirip dengan periode sebelumnya, dengan tingkat kesulitan soal yang disesuaikan.', 'Sertifikat, medali, uang tunai, kesempatan ikut pelatihan nasional.', 'Dana pembinaan dan akses ke mentor ahli.', '2025-06-03 03:16:47', '2025-06-03 03:16:47'),
(4, '699ee03e-9443-48b4-919f-d0b2bc6c2a72', 'OSPN - Advance Level (Jul-Sep 2025)', '/img/eduevent/img_infinibee60600x800_248x209.png', '2025-06-01', '2025-07-19', 'Gratis', 'Nasional', 'Tahap terakhir OSPN Advance Level, fokus pada penyempurnaan strategi dan pemecahan masalah tingkat tinggi.', 'Siswa/i SMA/sederajat, berprestasi di bidang sains, memiliki semangat kompetisi tinggi.', 'Ujian tulis dan praktikum, presentasi hasil penelitian (jika ada).', 'Sertifikat, medali, uang tunai, kesempatan mewakili Indonesia di tingkat internasional.', 'Biaya akomodasi untuk peserta terpilih di babak final.', '2025-06-03 03:17:41', '2025-06-03 03:17:41'),
(5, '2f709879-e1b1-4760-b36d-3c49ad7553c6', 'OSPN - Advance Level (Okt-Des 2025)', '/img/eduevent/img_infinibee60600x800_248x209.png', '2025-06-15', '2025-07-20', 'Gratis', 'Nasional', 'Penutup seri OSPN Advance Level di tahun 2025, menjadi ajang terakhir untuk meraih prestasi sebelum kompetisi tahunan.', 'Siswa/i SMA/sederajat, bersemangat untuk belajar dan berkompetisi, berkomitmen penuh.', 'Serangkaian tes tertulis dan wawancara untuk mengukur pemahaman dan potensi.', 'Sertifikat, uang tunai, kesempatan berjejaring dengan peserta dan mentor.', 'Mentoring eksklusif dari dosen universitas terkemuka.', '2025-06-03 03:17:51', '2025-06-03 03:17:51'),
(6, 'a2feeae1-8603-440b-a8b9-ffc10fd817d0', 'Kompetisi Matematika (Jan-Mar 2026)', '/img/eduevent/img_infinibee60600x800_248x209.png', '2025-06-01', '2026-08-31', 'Gratis', 'Provinsi', 'Kompetisi tahunan untuk meningkatkan minat dan bakat siswa di bidang matematika, serta mempersiapkan mereka untuk kompetisi tingkat nasional.', 'Pelajar SD/SMP/SMA/sederajat di provinsi terkait, terdaftar di sekolah yang diakui.', 'Ujian tertulis dengan soal-soal problem solving dan analisis.', 'Sertifikat, trofi, hadiah menarik, pengalaman berkompetisi.', 'Buku-buku referensi matematika terbaru.', '2025-06-03 03:18:02', '2025-06-03 03:18:02'),
(8, '61b69e6a-088e-490b-af87-f2cd74e97f1b', 'Kompetisi Matematika (Jan-Mar 2026)', '/img/eduevent/img_infinibee60600x800_248x209.png', '2025-06-15', '2026-07-31', 'Gratis', 'Provinsi', 'Kompetisi tahunan untuk meningkatkan minat dan bakat siswa di bidang matematika, serta mempersiapkan mereka untuk kompetisi tingkat nasional.', 'Pelajar SD/SMP/SMA/sederajat di provinsi terkait, terdaftar di sekolah yang diakui.', 'Ujian tertulis dengan soal-soal problem solving dan analisis.', 'Sertifikat, trofi, hadiah menarik, pengalaman berkompetisi.', 'Buku-buku referensi matematika terbaru.', '2025-06-03 03:19:03', '2025-06-03 03:19:03'),
(9, 'daef9b78-73d0-4bd6-9a13-ac0ba125419c', 'Lomba Olimpiade Sains (Jan-Mar 2025)', '/img/eduevent/img_infinibee60600x800.png', '2025-06-15', '2025-07-04', 'Gratis', 'Provinsi', 'Mendorong siswa untuk mengeksplorasi lebih dalam bidang sains dan mempersiapkan mereka untuk olimpiade tingkat nasional.', 'Siswa SMP/SMA/sederajat, memiliki minat kuat di bidang fisika, kimia, biologi, atau matematika.', 'Ujian teori dan eksperimen (jika berlaku), berdasarkan kurikulum nasional.', 'Sertifikat, uang saku, kesempatan studi banding.', 'Akses ke modul pelatihan olimpiade.', '2025-06-03 03:19:10', '2025-06-03 03:19:10'),
(10, '17623747-4c17-4770-9395-ec09cda1796a', 'OSPN - Lomba Catur (Apr-Jun 2025)', '/img/eduevent/img_infinibee60600x800.png', '2025-06-01', '2025-09-21', 'Gratis', 'Nasional', 'Ajang pencarian bakat pecatur muda di tingkat kota, bertujuan mempromosikan olahraga catur dan sportivitas.', 'Siswa SD/SMP/SMA di wilayah kota, memiliki dasar-dasar bermain catur.', 'Sistem gugur atau round-robin, sesuai standar Federasi Catur Indonesia.', 'Sertifikat, piala, uang tunai, kesempatan direkrut klub catur.', 'Pelatihan singkat dari master catur lokal.', '2025-06-03 03:19:19', '2025-06-03 03:19:19'),
(12, '7e966f0d-169a-4963-afc7-aece7886b4b1', 'OSPN-Kompetisi Coding (Jul-Sep 2024)', '/img/eduevent/img_infinibee60600x800.png', '2025-05-01', '2025-12-09', 'Gratis', 'Nasional', 'Mengembangkan solusi inovatif menggunakan pemrograman untuk memecahkan masalah nyata. Topik tahun ini: AI for Sustainability.', 'Terbuka untuk individu atau tim (maks. 3 orang), menguasai minimal satu bahasa pemrograman.', 'Efisiensi kode, kebenaran solusi, inovasi, presentasi project.', 'Sertifikat, uang tunai, kesempatan diundang ke perusahaan teknologi, relasi industri.', 'Akses gratis ke platform coding premium selama periode kompetisi.', '2025-06-03 03:43:50', '2025-06-11 05:39:27');

-- --------------------------------------------------------

--
-- Table structure for table `kompetisi_registrasi`
--

CREATE TABLE `kompetisi_registrasi` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `kompetisiId` int(11) NOT NULL,
  `status_pendaftaran` enum('diproses','seleksi berkas','diterima','ditolak') NOT NULL DEFAULT 'diproses',
  `tanggal_pendaftaran` datetime NOT NULL,
  `nama_lengkap` varchar(255) NOT NULL,
  `jenjang_pendidikan` varchar(255) DEFAULT NULL,
  `instansi_pendidikan` varchar(255) DEFAULT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `no_telp` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `alasan_mengikuti` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `kompetisi_registrasi`
--

INSERT INTO `kompetisi_registrasi` (`id`, `uuid`, `userId`, `kompetisiId`, `status_pendaftaran`, `tanggal_pendaftaran`, `nama_lengkap`, `jenjang_pendidikan`, `instansi_pendidikan`, `jurusan`, `no_telp`, `email`, `alasan_mengikuti`, `createdAt`, `updatedAt`) VALUES
(3, '41dada3f-49c4-42f9-a32a-32b1107b377a', 21, 4, 'seleksi berkas', '2025-06-04 13:24:42', 'khofi', 'D4', 'Universitas Negeri Surabaya', 'Manajemen Informatika', '0190237842090', 'kocengoyen44@gmail.com', 'dapat beasiswa', '2025-06-04 13:24:42', '2025-06-11 13:10:49'),
(4, '95d5296a-3004-4b7e-ae37-f34b26fb972a', 17, 5, 'ditolak', '2025-06-15 03:13:45', 'khofi', 'D4', 'Universitas Negeri Surabaya', 'Manajemen Informatika', '091273829921', 'khofifahndari04@gmail.com', 'gpp', '2025-06-15 03:13:45', '2025-06-15 03:13:45'),
(5, '4f180485-0be4-40ec-b5d3-460508c7374b', 17, 12, 'diterima', '2025-06-15 03:33:15', 'khofi', 'D4', 'Universitas Negeri Surabaya', 'Manajemen Informatika', '081803487166', 'khofifahndari04@gmail.com', 'gpp', '2025-06-15 03:33:15', '2025-06-15 03:33:15');

-- --------------------------------------------------------

--
-- Table structure for table `mentoring`
--

CREATE TABLE `mentoring` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text NOT NULL,
  `namaMentor` varchar(255) NOT NULL,
  `keahlianMentor` varchar(255) NOT NULL,
  `fotoMentor` longtext DEFAULT NULL,
  `jumlahPeserta` int(11) NOT NULL DEFAULT 0,
  `statusMentoring` enum('Tersedia','Penuh') NOT NULL DEFAULT 'Tersedia',
  `kategoriMentoring` varchar(255) NOT NULL,
  `link` varchar(255) NOT NULL,
  `userId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `mentoring`
--

INSERT INTO `mentoring` (`id`, `uuid`, `judul`, `deskripsi`, `namaMentor`, `keahlianMentor`, `fotoMentor`, `jumlahPeserta`, `statusMentoring`, `kategoriMentoring`, `link`, `userId`, `createdAt`, `updatedAt`) VALUES
(1, 'e1dbea19-7b99-4054-8772-c5fd1761cafb', 'Test Mentoring Minimal', 'Deskripsi singkat.', 'Tester', 'General', 'https://www.ondemandcmo.com/app/uploads/2016/03/canstockphoto22402523-arcos-creator.com_.jpg', 50, 'Penuh', 'Testing', 'https://test.meet.google.com/xyz', 1, '2025-06-06 17:27:32', '2025-06-06 17:27:32'),
(2, 'b0ac1892-42b8-419b-b3b2-85c33024bace', 'Workshop Desain UX untuk Pemula', 'Pelatihan interaktif bagi pemula yang ingin memahami dasar-dasar User Experience (UX) design, termasuk research, wireframing, dan prototyping.', 'Budi Santoso', 'UX Designer Senior', 'https://wallpaperaccess.com/full/8878367.jpg', 10, 'Tersedia', 'Desain UI/UX', 'https://meet.google.com/ux-design-workshop-1', 1, '2025-06-06 17:28:42', '2025-06-11 10:44:26'),
(4, '7f98ce30-014a-448a-adb9-75e729856737', 'kjj', 'kasjkakk', 'nmBA', 'jka', NULL, 17, 'Tersedia', 'akkk', 'https://beasiswaunggulan.kemdikbud.go.id/', 1, '2025-06-11 10:45:01', '2025-06-11 20:28:10');

-- --------------------------------------------------------

--
-- Table structure for table `orangtua`
--

CREATE TABLE `orangtua` (
  `id` int(11) NOT NULL,
  `userId` int(11) NOT NULL,
  `nama_ayah` varchar(255) DEFAULT NULL,
  `ttl_ayah` date DEFAULT NULL,
  `alamat_ayah` text DEFAULT NULL,
  `no_telp_ayah` varchar(255) DEFAULT NULL,
  `pendidikan_ayah` varchar(255) DEFAULT NULL,
  `pekerjaan_ayah` varchar(255) DEFAULT NULL,
  `penghasilan_ayah` int(11) DEFAULT NULL,
  `nama_ibu` varchar(255) DEFAULT NULL,
  `ttl_ibu` date DEFAULT NULL,
  `alamat_ibu` text DEFAULT NULL,
  `no_telp_ibu` varchar(255) DEFAULT NULL,
  `pendidikan_ibu` varchar(255) DEFAULT NULL,
  `pekerjaan_ibu` varchar(255) DEFAULT NULL,
  `penghasilan_ibu` int(11) DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `orangtua`
--

INSERT INTO `orangtua` (`id`, `userId`, `nama_ayah`, `ttl_ayah`, `alamat_ayah`, `no_telp_ayah`, `pendidikan_ayah`, `pekerjaan_ayah`, `penghasilan_ayah`, `nama_ibu`, `ttl_ibu`, `alamat_ibu`, `no_telp_ibu`, `pendidikan_ibu`, `pekerjaan_ibu`, `penghasilan_ibu`, `createdAt`, `updatedAt`) VALUES
(1, 17, 'Budi Santoso', '1965-08-17', 'Jl. Kemerdekaan No. 45, Desa Maju, Kota Bahagia', '+628123456789', 'Sarjana Teknik', 'Manajer Produksi', 15000000, 'Siti Fatmawati', '1968-03-10', 'Jl. Kemerdekaan No. 45, Desa Maju, Kota Bahagia', '+6281333334444', 'Diploma Ekonomi', 'Pengusaha Kuliner', 8000000, '2025-06-01 12:03:37', '2025-06-10 14:12:58');

-- --------------------------------------------------------

--
-- Table structure for table `penilaian`
--

CREATE TABLE `penilaian` (
  `id` int(11) NOT NULL,
  `essayId` int(11) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `skor_struktur` int(2) NOT NULL DEFAULT 0,
  `feedback_struktur` text DEFAULT NULL,
  `skor_topik` int(2) NOT NULL DEFAULT 0,
  `feedback_topik` text DEFAULT NULL,
  `skor_grammar` int(2) NOT NULL DEFAULT 0,
  `feedback_grammar` text DEFAULT NULL,
  `skor_gaya` int(2) NOT NULL DEFAULT 0,
  `feedback_gaya` text DEFAULT NULL,
  `skor_panjang` int(2) NOT NULL DEFAULT 0,
  `feedback_panjang` text DEFAULT NULL,
  `tanggal_review` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `penilaian`
--

INSERT INTO `penilaian` (`id`, `essayId`, `userId`, `skor_struktur`, `feedback_struktur`, `skor_topik`, `feedback_topik`, `skor_grammar`, `feedback_grammar`, `skor_gaya`, `feedback_gaya`, `skor_panjang`, `feedback_panjang`, `tanggal_review`, `createdAt`, `updatedAt`) VALUES
(3, 1, 1, 18, 'Struktur esai sangat baik, alur logis dan kohesif. Mudah dipahami.', 17, 'Topik dibahas dengan cukup mendalam, namun bisa ditambahkan lebih banyak contoh relevan.', 19, 'Tata bahasa dan ejaan hampir sempurna, hanya ada minor error yang tidak mengganggu pemahaman.', 16, 'Gaya penulisan jelas dan lugas. Dapat ditingkatkan dengan variasi kalimat.', 15, 'Panjang esai sesuai instruksi, informasi tersampaikan secara padat.', '2025-06-03 07:37:08', '2025-06-03 07:29:31', '2025-06-03 07:37:08'),
(5, 7, 17, 18, 'Struktur esai sangat baik, alur logis dan kohesif. Mudah dipahami.', 10, 'Topik dibahas dengan cukup mendalam, namun bisa ditambahkan lebih banyak contoh relevan.', 19, 'Tata bahasa dan ejaan hampir sempurna, hanya ada minor error yang tidak mengganggu pemahaman.', 16, 'Gaya penulisan jelas dan lugas. Dapat ditingkatkan dengan variasi kalimat.', 15, 'Panjang esai sesuai instruksi, informasi tersampaikan secara padat.', '2025-06-03 07:37:08', '2025-06-03 07:29:31', '2025-06-03 07:37:08');

-- --------------------------------------------------------

--
-- Table structure for table `portofolios`
--

CREATE TABLE `portofolios` (
  `id` int(11) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `file_path` varchar(255) NOT NULL,
  `file_url` varchar(255) NOT NULL,
  `tanggal_dibuat` date DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `portofolios`
--

INSERT INTO `portofolios` (`id`, `judul`, `deskripsi`, `file_path`, `file_url`, `tanggal_dibuat`, `createdAt`, `updatedAt`, `userId`) VALUES
(1, 'Project laravel part 1', 'project laravel ini membuat aplikasi CRUD yang dilengkapi API', 'C:\\xampp\\htdocs\\fullstack-test\\backend_auth\\public\\portofolios\\89f5731d384c9f2edcc3385d5d3b68fb.pdf', 'http://localhost:5000/portofolios/89f5731d384c9f2edcc3385d5d3b68fb.pdf', '2024-05-20', '2025-06-01 12:33:47', '2025-06-10 14:18:42', 17);

-- --------------------------------------------------------

--
-- Table structure for table `sessions`
--

CREATE TABLE `sessions` (
  `sid` varchar(36) NOT NULL,
  `expires` datetime DEFAULT NULL,
  `data` text DEFAULT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `sessions`
--

INSERT INTO `sessions` (`sid`, `expires`, `data`, `createdAt`, `updatedAt`) VALUES
('iqEFyoyZ70V6oR6C62PK9au7eSKdXAfk', '2025-06-16 06:11:02', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-15T10:30:33.602Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":17}', '2025-06-14 08:32:19', '2025-06-15 06:11:02'),
('p4cwHZyvzEmdPrXWGaQQ7_ONbcQ1Oal3', '2025-06-16 20:23:10', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-16T15:06:15.926Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":1}', '2025-06-15 13:35:52', '2025-06-15 20:23:10'),
('Y2es45FH8p66ZZlH9R1XjLYZOznhhmqS', '2025-06-16 19:41:38', '{\"cookie\":{\"originalMaxAge\":86400000,\"expires\":\"2025-06-16T19:41:25.918Z\",\"secure\":false,\"httpOnly\":true,\"path\":\"/\",\"sameSite\":false},\"userId\":1}', '2025-06-15 19:41:25', '2025-06-15 19:41:38');

-- --------------------------------------------------------

--
-- Table structure for table `users`
--

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `role` varchar(255) NOT NULL DEFAULT 'user',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `foto_profile` varchar(255) DEFAULT NULL,
  `url_foto_profile` varchar(255) DEFAULT NULL,
  `foto_sampul` varchar(255) DEFAULT NULL,
  `url_foto_sampul` varchar(255) DEFAULT NULL,
  `bio` text DEFAULT NULL,
  `ttl` date DEFAULT NULL,
  `jenis_kelamin` enum('Laki-laki','Perempuan','Lainnya') DEFAULT NULL,
  `alamat` text DEFAULT NULL,
  `no_telp` varchar(255) DEFAULT NULL,
  `nama_institusi` varchar(255) DEFAULT NULL,
  `prodi` varchar(255) DEFAULT NULL,
  `fakultas` varchar(255) DEFAULT NULL,
  `semester` int(11) DEFAULT NULL,
  `ipk` decimal(3,2) DEFAULT NULL,
  `minat_bidang` enum('Teknologi Informasi & Digital','Bisnis & Manajemen','Kreatif & Media','Kesehatan & Sosial','Pendidikan & Penelitian','Lingkungan & Sosial','Sains & Matematika','Hukum & Kebijakan Publik','Seni & Budaya','Pertanian & Pangan') DEFAULT NULL,
  `rencana` text DEFAULT NULL,
  `motivator_karir` text DEFAULT NULL,
  `resetPasswordToken` varchar(255) DEFAULT NULL,
  `resetPasswordExpires` datetime DEFAULT NULL,
  `savedForums` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `users`
--

INSERT INTO `users` (`id`, `uuid`, `name`, `email`, `password`, `role`, `createdAt`, `updatedAt`, `foto_profile`, `url_foto_profile`, `foto_sampul`, `url_foto_sampul`, `bio`, `ttl`, `jenis_kelamin`, `alamat`, `no_telp`, `nama_institusi`, `prodi`, `fakultas`, `semester`, `ipk`, `minat_bidang`, `rencana`, `motivator_karir`, `resetPasswordToken`, `resetPasswordExpires`, `savedForums`) VALUES
(1, '53ab72c2-2b64-4198-9b2f-952c01168b44', 'Admin', 'admin@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$eA9hm+VCGupOkHJmm3D5vA$8puIxmiMQivpbcmGJVN63iTTlPzO+IVLT9MtlQOeXZQ', 'admin', '2025-05-30 16:42:03', '2025-05-30 16:42:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(9, '07ed6f85-97b2-45b2-8d7d-8ff735e53f6a', 'Bunga Citra', 'bcitra@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$SV95bEodXMVE+6Kn9VsoIg$/cutUy/Ckky4XA2QaxdZV9xmjMGnGX/umvcViAq6XJo', 'user', '2025-05-30 19:55:42', '2025-06-10 18:46:03', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(13, 'e40a67db-47d9-4cf0-aa48-79e905919ccb', 'Siti Aminah', 'siti.aminah@example.com', '$argon2id$v=19$m=65536,t=3,p=4$LCOA2DeaTsDku95MZPP3qA$K5NZb0gQnMb3AtXOSfxPe4DVUDj3DI/jVJwkky2kV0s', 'user', '2025-05-30 21:10:29', '2025-05-30 21:10:29', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(17, 'e78efcb6-b3d1-41e5-b2d7-de905e17f489', 'Khofifah', 'khofifahndari04@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$T/ufRRaSYzNC5CBtApcK9Q$8LjQNdZ4/RCku/z6LcGjNceYl28Z7i79Lf4uvLTOZVU', 'user', '2025-05-31 02:45:24', '2025-06-10 14:38:24', 'baffc3c7017a0b1195d131b44a793227.jpg', 'http://localhost:5000/profiles/baffc3c7017a0b1195d131b44a793227.jpg', 'baffc3c7017a0b1195d131b44a793227.jpg', 'http://localhost:5000/covers/baffc3c7017a0b1195d131b44a793227.jpg', 'Happy', '2002-05-15', 'Perempuan', 'Jl. Mangga', '+628180487166', 'Universitas Negeri Surabaya', 'Manajemen Informatika', 'Ilmu Komputer', 6, 3.83, 'Kreatif & Media', 'Setelah lulus, ingin bekerja di perusahaan teknologi besar sebagai software engineer dan berkontribusi pada pengembangan aplikasi berbasis AI.', 'Melihat dampak positif teknologi dalam kehidupan sehari-hari dan keinginan untuk terus berinovasi.', NULL, NULL, NULL),
(19, '5aed3ecf-8d68-4d58-bb32-0d52e0624698', 'Aryo Putra Bagus', 'aryoputrabagus@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$ohM1WwDcm/Mp94pQU5VikA$20NZna1VGFDrzFgBhjBVibS5xg5Bmzv35LpLieOhTZE', 'user', '2025-06-01 14:34:51', '2025-06-01 14:34:51', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL),
(21, '7256f041-785a-4205-a8aa-263caa9d64ff', 'khofifah', 'kocengoyen44@gmail.com', '$argon2id$v=19$m=65536,t=3,p=4$dMMqqg1k6preCz6pjH5Raw$zifz2MaBMOa4/3I47/CafKG9vP2ltgvpcLxQf2Wc4RE', 'user', '2025-06-04 13:14:46', '2025-06-04 13:16:16', NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, '[]');

-- --------------------------------------------------------

--
-- Table structure for table `user_saved_beasiswa`
--

CREATE TABLE `user_saved_beasiswa` (
  `savedAt` datetime NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `beasiswaId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_saved_beasiswa`
--

INSERT INTO `user_saved_beasiswa` (`savedAt`, `createdAt`, `updatedAt`, `userId`, `beasiswaId`) VALUES
('2025-06-14 09:54:36', '2025-06-14 09:54:36', '2025-06-14 09:54:36', 17, 2),
('2025-05-31 15:44:49', '2025-05-31 15:44:49', '2025-05-31 15:44:49', 17, 3),
('2025-05-31 18:07:51', '2025-05-31 18:07:51', '2025-05-31 18:07:51', 17, 5);

-- --------------------------------------------------------

--
-- Table structure for table `user_saved_forum`
--

CREATE TABLE `user_saved_forum` (
  `savedAt` datetime NOT NULL,
  `userId` int(11) NOT NULL,
  `forumId` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `user_saved_forum`
--

INSERT INTO `user_saved_forum` (`savedAt`, `userId`, `forumId`) VALUES
('2025-06-15 15:02:51', 17, 2);

-- --------------------------------------------------------

--
-- Table structure for table `user_saved_kompetisi`
--

CREATE TABLE `user_saved_kompetisi` (
  `userId` int(11) NOT NULL,
  `kompetisiId` int(11) NOT NULL,
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `webinar`
--

CREATE TABLE `webinar` (
  `uuid` varchar(255) NOT NULL,
  `judul` varchar(255) NOT NULL,
  `deskripsi` text DEFAULT NULL,
  `gambar` longtext DEFAULT NULL,
  `penyelenggara` varchar(255) NOT NULL,
  `kategori` enum('Teknologi','Bisnis & Kewirausahaan','Pengembangan Diri','Kesehatan & Gaya Hidup','Pendidikan') NOT NULL,
  `link_webinar` varchar(255) NOT NULL,
  `tanggal_pelaksanaan` date NOT NULL,
  `jam_pelaksanaan` varchar(255) NOT NULL,
  `narasumber` text NOT NULL,
  `link_rekaman` varchar(255) DEFAULT NULL,
  `link_sertifikat` varchar(255) DEFAULT NULL,
  `status` enum('upcoming','completed','cancelled') NOT NULL DEFAULT 'upcoming',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `webinar`
--

INSERT INTO `webinar` (`uuid`, `judul`, `deskripsi`, `gambar`, `penyelenggara`, `kategori`, `link_webinar`, `tanggal_pelaksanaan`, `jam_pelaksanaan`, `narasumber`, `link_rekaman`, `link_sertifikat`, `status`, `createdAt`, `updatedAt`) VALUES
('09071c9c-c057-4765-a585-c20cce738832', 'Jalur Sukses Meraih Beasiswa Kuliah', 'Panduan komprehensif tentang langkah-langkah, tips, dan trik untuk mendapatkan beasiswa penuh di universitas ternama dunia.', 'https://www.wallstreetenglish.co.id/wp-content/uploads/2023/03/scholarship-programs-smiling-male-asian-college-s-2022-12-16-09-27-03-utc-scaled.jpg', 'Education Agency', '', 'https://meet.google.com/landing', '2025-06-10', '13:20:00', 'Prof. Karina Putri, Konsultan Pendidikan Internasional', 'https://drive.google.com/file/d/1TGP38vNjDJd7SiFGyqqcBc3Obsf0W2BM/view?usp=drive_link', 'https://drive.google.com/file/d/1yUgVdQOYyfhGSw1gLDg_bNpixJagI2fk/view?usp=drive_link', 'completed', '2025-06-09 18:36:39', '2025-06-11 04:16:26'),
('32cdcc5e-0817-442d-b988-6d4087da1c87', 'Rahasia Hidup Sehat dan Bugar di Usia Produktif', 'Pelajari tips nutrisi, olahraga, dan manajemen stres untuk menjaga kesehatan optimal di tengah kesibukan.', 'https://www.hemaviton.com/qa/public/files/Cara-Menjaga-Stamina-Agar-Tetap-Sehat-dan-Produktif-di-Lingkungan-Kerja-yang-Sibuk.jpg', 'Wellness Community', '', 'https://meet.google.com/landing?calling=1', '2025-07-04', '19:30:00', 'Dr. Yoga Permana, Spesialis Gizi', 'https://drive.google.com/file/d/1TGP38vNjDJd7SiFGyqqcBc3Obsf0W2BM/view?usp=drive_link', 'https://drive.google.com/file/d/1yUgVdQOYyfhGSw1gLDg_bNpixJagI2fk/view?usp=drive_link', 'upcoming', '2025-06-09 18:36:31', '2025-06-11 17:12:30'),
('3988e509-d267-49ee-963d-a67b11f39804', '5 Tips Belajar yang Efektif, Efisien dan Tidak Membosankan', 'hatauagskammmmmmmmmmmmmmm', 'data:image/jpeg;base64,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', 'Kementrian ', '', 'https://meet.google.com/land', '2025-06-12', '12:00:00', 'Prof. Karina Putri, Konsultan Pendidikan Internasional', 'https://drive.google.com/file/d/1TGP38vNjDJd7SiFGyqqcBc3Obsf0W2BM/view?usp=drive_link', 'https://drive.google.com/file/d/1yUgVdQOYyfhGSw1gLDg_bNpixJagI2fk/view?usp=drive_link', 'upcoming', '2025-06-11 04:42:23', '2025-06-11 04:42:23'),
('3bdca181-7a11-4f1b-87f4-1ae6c88adb58', 'Memulai Startup Sukses: Panduan Lengkap untuk Founder Pemula', 'Dapatkan insights dari para ahli tentang bagaimana membangun, mendanai, dan mengembangkan startup Anda dari nol.', 'https://i.ytimg.com/vi/wvNE0WhiVps/maxresdefault.jpg', 'Future Founders Hub', 'Pengembangan Diri', 'https://meet.google.com/kkk', '2025-08-08', '15:00:00', 'Sarah Wijaya, CEO StartupX', 'https://drive.google.com/file/d/1TGP38vNjDJd7SiFGyqqcBc3Obsf0W2BM/view?usp=drive_link', 'https://drive.google.com/file/d/1yUgVdQOYyfhGSw1gLDg_bNpixJagI2fk/view?usp=drive_link', 'upcoming', '2025-06-09 18:36:12', '2025-06-11 17:16:00'),
('57f9d2b8-4e62-44f4-b83f-e2b6d48b8929', 'Menguasai React.js: Dari Dasar Hingga Proyek Skala Besar', 'Pelajari framework JavaScript paling populer untuk membangun antarmuka pengguna yang interaktif dan responsif.', 'https://i.ytimg.com/vi/zm_Si-2WZhk/maxresdefault.jpg', 'CodeInnovate', '', 'https://meet.google.com/mho-zvta-pvk', '2025-09-11', '08:15:00', 'Andi Pratama, Fullstack Developer', 'https://drive.google.com/file/d/1TGP38vNjDJd7SiFGyqqcBc3Obsf0W2BM/view?usp=drive_link', 'https://drive.google.com/file/d/1yUgVdQOYyfhGSw1gLDg_bNpixJagI2fk/view?usp=drive_link', 'upcoming', '2025-06-09 18:36:02', '2025-06-11 17:11:54'),
('76f1cb68-067b-4ad2-bf5d-209a927a930b', 'Meningkatkan Produktivitas Kerja dengan Teknik Pomodoro', 'Temukan cara mengelola waktu dan fokus Anda dengan lebih efektif menggunakan teknik Pomodoro yang terbukti.', 'https://blog.zoho.com/sites/zblogs/images/workplace/workplace/apa_itu_produktivitas_kerja_2.jpg', 'GrowUp Institute', 'Pengembangan Diri', 'https://meet.google.com/uud-vqry-vxe', '2025-10-22', '10:00:00', 'Dewi Lestari, Produktivitas Coach', 'https://drive.google.com/file/d/1TGP38vNjDJd7SiFGyqqcBc3Obsf0W2BM/view?usp=drive_link', 'https://drive.google.com/file/d/1yUgVdQOYyfhGSw1gLDg_bNpixJagI2fk/view?usp=drive_link', 'upcoming', '2025-06-09 18:36:24', '2025-06-11 17:16:43');

-- --------------------------------------------------------

--
-- Table structure for table `webinar_peserta`
--

CREATE TABLE `webinar_peserta` (
  `id` int(11) NOT NULL,
  `uuid` varchar(255) NOT NULL,
  `webinarId` varchar(255) NOT NULL,
  `userId` int(11) DEFAULT NULL,
  `nama` varchar(255) NOT NULL,
  `jenjang_pendidikan` enum('SMA/SMK','D3','S1','S2','S3','Lainnya') NOT NULL,
  `instansi_pendidikan` varchar(255) NOT NULL,
  `jurusan` varchar(255) DEFAULT NULL,
  `email` varchar(255) NOT NULL,
  `nomor_hp` varchar(255) DEFAULT NULL,
  `alasan_mengikuti_webinar` text DEFAULT NULL,
  `status_pendaftaran` enum('pending','terdaftar','hadir','dibatalkan') NOT NULL DEFAULT 'terdaftar',
  `createdAt` datetime NOT NULL,
  `updatedAt` datetime NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `webinar_peserta`
--

INSERT INTO `webinar_peserta` (`id`, `uuid`, `webinarId`, `userId`, `nama`, `jenjang_pendidikan`, `instansi_pendidikan`, `jurusan`, `email`, `nomor_hp`, `alasan_mengikuti_webinar`, `status_pendaftaran`, `createdAt`, `updatedAt`) VALUES
(1, 'b9eeb2f1-37c1-449e-8db0-5a28a46dab0c', '3bdca181-7a11-4f1b-87f4-1ae6c88adb58', 1, 'Budi Santoso', 'S1', 'Universitas Teknologi', 'Teknik Informatika', 'budi.santoso@example.com', '081234567890', 'Tertarik dengan topik AI dan ingin memperdalam pengetahuan.', 'terdaftar', '2025-06-09 18:52:03', '2025-06-15 19:21:16'),
(2, '85795dd4-ef23-4a80-adaf-12cd7a143562', '32cdcc5e-0817-442d-b988-6d4087da1c87', 1, 'Budi Santoso', 'S1', 'Universitas Teknologi', NULL, 'budi.santoso@example.com', '081234567890', 'Tertarik dengan topik yang dibahas.', 'terdaftar', '2025-06-09 19:26:42', '2025-06-15 19:21:00'),
(3, '39f48593-3e3f-4e1d-b21c-b09a4cf3e876', '09071c9c-c057-4765-a585-c20cce738832', 17, 'Khofifah Wulandari', 'S1', 'Universitas Indonesia', 'Teknik Informatika', 'khofifahndari04@gmail.com', '097842346670', 'we', 'terdaftar', '2025-06-10 02:34:12', '2025-06-15 19:21:13');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `articles`
--
ALTER TABLE `articles`
  ADD UNIQUE KEY `link_2` (`link`),
  ADD UNIQUE KEY `link_3` (`link`),
  ADD UNIQUE KEY `link` (`link`),
  ADD UNIQUE KEY `link_5` (`link`),
  ADD UNIQUE KEY `link_6` (`link`),
  ADD UNIQUE KEY `link_7` (`link`),
  ADD UNIQUE KEY `link_8` (`link`),
  ADD UNIQUE KEY `link_9` (`link`),
  ADD UNIQUE KEY `link_10` (`link`),
  ADD UNIQUE KEY `link_11` (`link`),
  ADD UNIQUE KEY `link_12` (`link`),
  ADD UNIQUE KEY `link_13` (`link`),
  ADD UNIQUE KEY `link_14` (`link`),
  ADD UNIQUE KEY `link_4` (`link`),
  ADD UNIQUE KEY `link_15` (`link`),
  ADD UNIQUE KEY `link_16` (`link`),
  ADD UNIQUE KEY `link_17` (`link`),
  ADD UNIQUE KEY `link_18` (`link`);

--
-- Indexes for table `beasiswa`
--
ALTER TABLE `beasiswa`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `diskusi`
--
ALTER TABLE `diskusi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `link` (`link`),
  ADD UNIQUE KEY `link_2` (`link`),
  ADD UNIQUE KEY `link_3` (`link`),
  ADD UNIQUE KEY `link_4` (`link`),
  ADD UNIQUE KEY `link_5` (`link`),
  ADD UNIQUE KEY `link_6` (`link`),
  ADD UNIQUE KEY `link_7` (`link`),
  ADD UNIQUE KEY `link_8` (`link`),
  ADD UNIQUE KEY `link_9` (`link`),
  ADD UNIQUE KEY `link_10` (`link`),
  ADD UNIQUE KEY `link_11` (`link`),
  ADD UNIQUE KEY `link_12` (`link`),
  ADD UNIQUE KEY `link_13` (`link`),
  ADD UNIQUE KEY `link_14` (`link`),
  ADD UNIQUE KEY `link_15` (`link`),
  ADD UNIQUE KEY `link_16` (`link`),
  ADD UNIQUE KEY `link_17` (`link`),
  ADD UNIQUE KEY `link_18` (`link`),
  ADD UNIQUE KEY `link_19` (`link`),
  ADD UNIQUE KEY `link_20` (`link`),
  ADD UNIQUE KEY `link_21` (`link`),
  ADD UNIQUE KEY `link_22` (`link`),
  ADD UNIQUE KEY `link_23` (`link`),
  ADD UNIQUE KEY `link_24` (`link`),
  ADD UNIQUE KEY `link_25` (`link`),
  ADD UNIQUE KEY `link_26` (`link`),
  ADD UNIQUE KEY `link_27` (`link`),
  ADD UNIQUE KEY `link_28` (`link`),
  ADD UNIQUE KEY `link_29` (`link`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `essays`
--
ALTER TABLE `essays`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `forum`
--
ALTER TABLE `forum`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `uuid_2` (`uuid`),
  ADD UNIQUE KEY `uuid_3` (`uuid`),
  ADD UNIQUE KEY `uuid_4` (`uuid`),
  ADD UNIQUE KEY `uuid_5` (`uuid`),
  ADD UNIQUE KEY `uuid_6` (`uuid`),
  ADD UNIQUE KEY `uuid_7` (`uuid`),
  ADD UNIQUE KEY `uuid_8` (`uuid`),
  ADD UNIQUE KEY `uuid_9` (`uuid`),
  ADD UNIQUE KEY `uuid_10` (`uuid`),
  ADD UNIQUE KEY `uuid_11` (`uuid`),
  ADD UNIQUE KEY `uuid_12` (`uuid`),
  ADD UNIQUE KEY `uuid_13` (`uuid`),
  ADD UNIQUE KEY `uuid_14` (`uuid`),
  ADD UNIQUE KEY `uuid_15` (`uuid`),
  ADD UNIQUE KEY `uuid_16` (`uuid`),
  ADD UNIQUE KEY `uuid_17` (`uuid`),
  ADD UNIQUE KEY `uuid_18` (`uuid`),
  ADD UNIQUE KEY `uuid_19` (`uuid`),
  ADD UNIQUE KEY `uuid_20` (`uuid`),
  ADD UNIQUE KEY `uuid_21` (`uuid`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `forum_participants`
--
ALTER TABLE `forum_participants`
  ADD PRIMARY KEY (`userId`,`forumId`),
  ADD UNIQUE KEY `forum_participants_user_id_forum_id` (`userId`,`forumId`),
  ADD KEY `forumId` (`forumId`);

--
-- Indexes for table `kompetisi`
--
ALTER TABLE `kompetisi`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `kompetisi_registrasi`
--
ALTER TABLE `kompetisi_registrasi`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `kompetisi_registrasi_kompetisiId_userId_unique` (`userId`,`kompetisiId`),
  ADD UNIQUE KEY `kompetisi_registrasi_user_id_kompetisi_id` (`userId`,`kompetisiId`),
  ADD UNIQUE KEY `uuid_2` (`uuid`),
  ADD UNIQUE KEY `uuid_3` (`uuid`),
  ADD UNIQUE KEY `uuid_4` (`uuid`),
  ADD UNIQUE KEY `uuid_5` (`uuid`),
  ADD UNIQUE KEY `uuid_6` (`uuid`),
  ADD UNIQUE KEY `uuid_7` (`uuid`),
  ADD UNIQUE KEY `uuid_8` (`uuid`),
  ADD UNIQUE KEY `uuid_9` (`uuid`),
  ADD UNIQUE KEY `uuid_10` (`uuid`),
  ADD UNIQUE KEY `uuid_11` (`uuid`),
  ADD UNIQUE KEY `uuid_12` (`uuid`),
  ADD UNIQUE KEY `uuid_13` (`uuid`),
  ADD UNIQUE KEY `uuid_14` (`uuid`),
  ADD UNIQUE KEY `uuid_15` (`uuid`),
  ADD UNIQUE KEY `uuid_16` (`uuid`),
  ADD UNIQUE KEY `uuid_17` (`uuid`),
  ADD UNIQUE KEY `uuid_18` (`uuid`),
  ADD UNIQUE KEY `uuid_19` (`uuid`),
  ADD UNIQUE KEY `uuid_20` (`uuid`),
  ADD UNIQUE KEY `uuid_21` (`uuid`),
  ADD UNIQUE KEY `uuid_22` (`uuid`),
  ADD UNIQUE KEY `uuid_23` (`uuid`),
  ADD UNIQUE KEY `uuid_24` (`uuid`),
  ADD UNIQUE KEY `uuid_25` (`uuid`),
  ADD UNIQUE KEY `uuid_26` (`uuid`),
  ADD UNIQUE KEY `uuid_27` (`uuid`),
  ADD UNIQUE KEY `uuid_28` (`uuid`),
  ADD UNIQUE KEY `uuid_29` (`uuid`),
  ADD UNIQUE KEY `uuid_30` (`uuid`),
  ADD UNIQUE KEY `uuid_31` (`uuid`),
  ADD UNIQUE KEY `uuid_32` (`uuid`),
  ADD UNIQUE KEY `uuid_33` (`uuid`),
  ADD KEY `kompetisiId` (`kompetisiId`);

--
-- Indexes for table `mentoring`
--
ALTER TABLE `mentoring`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `link` (`link`),
  ADD UNIQUE KEY `link_2` (`link`),
  ADD UNIQUE KEY `link_3` (`link`),
  ADD UNIQUE KEY `link_4` (`link`),
  ADD UNIQUE KEY `link_5` (`link`),
  ADD UNIQUE KEY `link_6` (`link`),
  ADD UNIQUE KEY `link_7` (`link`),
  ADD UNIQUE KEY `link_8` (`link`),
  ADD UNIQUE KEY `link_9` (`link`),
  ADD UNIQUE KEY `link_10` (`link`),
  ADD UNIQUE KEY `link_11` (`link`),
  ADD UNIQUE KEY `link_12` (`link`),
  ADD UNIQUE KEY `link_13` (`link`),
  ADD UNIQUE KEY `link_14` (`link`),
  ADD UNIQUE KEY `link_15` (`link`),
  ADD UNIQUE KEY `link_16` (`link`),
  ADD UNIQUE KEY `link_17` (`link`),
  ADD UNIQUE KEY `link_18` (`link`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `orangtua`
--
ALTER TABLE `orangtua`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `userId` (`userId`);

--
-- Indexes for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD PRIMARY KEY (`id`),
  ADD KEY `essayId` (`essayId`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `portofolios`
--
ALTER TABLE `portofolios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `userId` (`userId`);

--
-- Indexes for table `sessions`
--
ALTER TABLE `sessions`
  ADD PRIMARY KEY (`sid`);

--
-- Indexes for table `users`
--
ALTER TABLE `users`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `email` (`email`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `uuid_2` (`uuid`),
  ADD UNIQUE KEY `email_2` (`email`),
  ADD UNIQUE KEY `uuid_3` (`uuid`),
  ADD UNIQUE KEY `email_3` (`email`),
  ADD UNIQUE KEY `uuid_4` (`uuid`),
  ADD UNIQUE KEY `email_4` (`email`),
  ADD UNIQUE KEY `uuid_5` (`uuid`),
  ADD UNIQUE KEY `email_5` (`email`),
  ADD UNIQUE KEY `uuid_6` (`uuid`),
  ADD UNIQUE KEY `email_6` (`email`),
  ADD UNIQUE KEY `uuid_7` (`uuid`),
  ADD UNIQUE KEY `email_7` (`email`),
  ADD UNIQUE KEY `uuid_8` (`uuid`),
  ADD UNIQUE KEY `email_8` (`email`),
  ADD UNIQUE KEY `uuid_9` (`uuid`),
  ADD UNIQUE KEY `email_9` (`email`),
  ADD UNIQUE KEY `uuid_10` (`uuid`),
  ADD UNIQUE KEY `email_10` (`email`),
  ADD UNIQUE KEY `uuid_11` (`uuid`),
  ADD UNIQUE KEY `email_11` (`email`),
  ADD UNIQUE KEY `uuid_12` (`uuid`),
  ADD UNIQUE KEY `email_12` (`email`),
  ADD UNIQUE KEY `uuid_13` (`uuid`),
  ADD UNIQUE KEY `email_13` (`email`),
  ADD UNIQUE KEY `uuid_14` (`uuid`),
  ADD UNIQUE KEY `email_14` (`email`),
  ADD UNIQUE KEY `uuid_15` (`uuid`),
  ADD UNIQUE KEY `email_15` (`email`),
  ADD UNIQUE KEY `uuid_16` (`uuid`),
  ADD UNIQUE KEY `email_16` (`email`);

--
-- Indexes for table `user_saved_beasiswa`
--
ALTER TABLE `user_saved_beasiswa`
  ADD PRIMARY KEY (`userId`,`beasiswaId`),
  ADD UNIQUE KEY `user_saved_beasiswa_user_id_beasiswa_id` (`userId`,`beasiswaId`),
  ADD KEY `beasiswaId` (`beasiswaId`);

--
-- Indexes for table `user_saved_forum`
--
ALTER TABLE `user_saved_forum`
  ADD PRIMARY KEY (`userId`,`forumId`),
  ADD UNIQUE KEY `user_saved_forum_user_id_forum_id` (`userId`,`forumId`),
  ADD KEY `forumId` (`forumId`);

--
-- Indexes for table `user_saved_kompetisi`
--
ALTER TABLE `user_saved_kompetisi`
  ADD PRIMARY KEY (`userId`,`kompetisiId`),
  ADD UNIQUE KEY `user_saved_kompetisi_kompetisiId_userId_unique` (`userId`,`kompetisiId`),
  ADD KEY `kompetisiId` (`kompetisiId`);

--
-- Indexes for table `webinar`
--
ALTER TABLE `webinar`
  ADD PRIMARY KEY (`uuid`),
  ADD UNIQUE KEY `link_webinar` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_2` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_3` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_4` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_5` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_6` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_7` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_8` (`link_webinar`),
  ADD UNIQUE KEY `link_webinar_9` (`link_webinar`);

--
-- Indexes for table `webinar_peserta`
--
ALTER TABLE `webinar_peserta`
  ADD PRIMARY KEY (`id`),
  ADD UNIQUE KEY `uuid` (`uuid`),
  ADD UNIQUE KEY `uuid_2` (`uuid`),
  ADD UNIQUE KEY `uuid_3` (`uuid`),
  ADD UNIQUE KEY `uuid_4` (`uuid`),
  ADD UNIQUE KEY `uuid_5` (`uuid`),
  ADD UNIQUE KEY `uuid_6` (`uuid`),
  ADD UNIQUE KEY `uuid_7` (`uuid`),
  ADD UNIQUE KEY `uuid_8` (`uuid`),
  ADD UNIQUE KEY `uuid_9` (`uuid`),
  ADD UNIQUE KEY `uuid_10` (`uuid`),
  ADD UNIQUE KEY `uuid_11` (`uuid`),
  ADD UNIQUE KEY `uuid_12` (`uuid`),
  ADD UNIQUE KEY `uuid_13` (`uuid`),
  ADD KEY `webinarId` (`webinarId`),
  ADD KEY `userId` (`userId`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `beasiswa`
--
ALTER TABLE `beasiswa`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT for table `diskusi`
--
ALTER TABLE `diskusi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT for table `essays`
--
ALTER TABLE `essays`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `forum`
--
ALTER TABLE `forum`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `kompetisi`
--
ALTER TABLE `kompetisi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `kompetisi_registrasi`
--
ALTER TABLE `kompetisi_registrasi`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `mentoring`
--
ALTER TABLE `mentoring`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=13;

--
-- AUTO_INCREMENT for table `orangtua`
--
ALTER TABLE `orangtua`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `penilaian`
--
ALTER TABLE `penilaian`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `portofolios`
--
ALTER TABLE `portofolios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `users`
--
ALTER TABLE `users`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `webinar_peserta`
--
ALTER TABLE `webinar_peserta`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `diskusi`
--
ALTER TABLE `diskusi`
  ADD CONSTRAINT `diskusi_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `essays`
--
ALTER TABLE `essays`
  ADD CONSTRAINT `essays_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `forum`
--
ALTER TABLE `forum`
  ADD CONSTRAINT `forum_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `forum_participants`
--
ALTER TABLE `forum_participants`
  ADD CONSTRAINT `forum_participants_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `forum_participants_ibfk_2` FOREIGN KEY (`forumId`) REFERENCES `forum` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `kompetisi_registrasi`
--
ALTER TABLE `kompetisi_registrasi`
  ADD CONSTRAINT `kompetisi_registrasi_ibfk_65` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `kompetisi_registrasi_ibfk_66` FOREIGN KEY (`kompetisiId`) REFERENCES `kompetisi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `mentoring`
--
ALTER TABLE `mentoring`
  ADD CONSTRAINT `mentoring_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `orangtua`
--
ALTER TABLE `orangtua`
  ADD CONSTRAINT `orangtua_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `penilaian`
--
ALTER TABLE `penilaian`
  ADD CONSTRAINT `penilaian_ibfk_71` FOREIGN KEY (`essayId`) REFERENCES `essays` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `penilaian_ibfk_72` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;

--
-- Constraints for table `portofolios`
--
ALTER TABLE `portofolios`
  ADD CONSTRAINT `portofolios_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_saved_beasiswa`
--
ALTER TABLE `user_saved_beasiswa`
  ADD CONSTRAINT `user_saved_beasiswa_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_saved_beasiswa_ibfk_2` FOREIGN KEY (`beasiswaId`) REFERENCES `beasiswa` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_saved_forum`
--
ALTER TABLE `user_saved_forum`
  ADD CONSTRAINT `user_saved_forum_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_saved_forum_ibfk_2` FOREIGN KEY (`forumId`) REFERENCES `forum` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `user_saved_kompetisi`
--
ALTER TABLE `user_saved_kompetisi`
  ADD CONSTRAINT `user_saved_kompetisi_ibfk_1` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `user_saved_kompetisi_ibfk_2` FOREIGN KEY (`kompetisiId`) REFERENCES `kompetisi` (`id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `webinar_peserta`
--
ALTER TABLE `webinar_peserta`
  ADD CONSTRAINT `webinar_peserta_ibfk_25` FOREIGN KEY (`webinarId`) REFERENCES `webinar` (`uuid`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `webinar_peserta_ibfk_26` FOREIGN KEY (`userId`) REFERENCES `users` (`id`) ON DELETE SET NULL ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
