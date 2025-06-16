import { BrowserRouter, Route, Routes, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import LandingBefore from "./pages/LandingBefore";
import LandingAfter from "./pages/LandingAfter";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import ResetPage from "./pages/ResetPage";
import AdminLogin from "./pages/admin/AdminLogin";
import AdminHome from "./pages/admin/AdminHome";
import ArtikelAdmin from "./pages/admin/ArtikelAdmin";
import DataAdmin from "./pages/admin/dataAdminpage";
import WebinarAdmin from "./pages/admin/webinarAdmin";
import WebinarPesertaAdmin from "./pages/admin/WebinarPesertaAdmin";
import DataPendaftar from "./pages/admin/DataPendaftar";
import EditPendaftar from "./pages/admin/EditPendaftar";
import BeasiswaManagement from "./pages/admin/BeasiswaManagement";
import PenilaianManagement from "./pages/admin/PenilaianManagement";
import ArtikelManagement from "./pages/admin/ArtikelManagement";
import ForumManagement from "./pages/admin/ForumManagement";
import MentoringManagement from "./pages/admin/MentoringManagement";
import DiskusiManagement from "./pages/admin/DiskusiManagement";
import UserManagement from "./pages/admin/UserManagement";
import KompetisiManagement from "./pages/admin/KompetisiManagement";
import KompetisiRegistrationsManagement from "./pages/admin/KompetisiRegistrationsManagement";
import ProfilePage from "./pages/ProfilePage";

import ScholarshipHub from "./pages/ScholarshipHub/ScholarshipHub";
import Rekomendasi from "./pages/ScholarshipHub/Rekomendasi";

import EduriseAcademy from "./pages/Eduacademy/Eduacademy";
import Webinar from "./pages/Eduacademy/Webinar";
import Klikforum from "./pages/Eduacademy/KlikForum";
import ForumDiskusi from "./pages/Eduacademy/ForumDiskusi";
import WebinarDetail from "./pages/Eduacademy/WebinarDetail";
import Artikel from "./pages/Eduacademy/Artikel";
import ArtikelKategori from "./pages/Eduacademy/ArtikelKategori";

import EduprepTools from "./pages/EduprepTools/EduprepTools";
import PratinjauCV from "./pages/EduprepTools/PratinjauCV";
import TemplateCV from "./pages/EduprepTools/TemplateCV";
import PratinjauMotivation from "./pages/EduprepTools/PratinjauMotlet";
import TemplateMotivation from "./pages/EduprepTools/TemplateMotlet";
import SubmitEssay from "./pages/EduprepTools/SubmitEssay";
import SimulasiWawancara from "./pages/EduprepTools/SimulasiWawancara";
import TungguHasil from "./pages/EduprepTools/TungguHasil";
import LihatHasil from "./pages/EduprepTools/LihatHasil";
import HasilFeedback from "./pages/EduprepTools/HasilFeedback";

import Educonnect from "./pages/Educonnect/Educonnect";
import Diskusi from "./pages/Educonnect/Diskusi";
import Mentoring from "./pages/Educonnect/Mentoring";
import Forum from "./pages/Educonnect/Forum";
import SavedCommunity from "./components/profile/SavedCommunity";

import Eduevent from "./pages/Eduevent/Eduevent";
import CompetitionDetailPage from "./pages/Eduevent/CompetitionDetailPage";
import DetailCardCompetiton from "./pages/Eduevent/DetailCardCompetition";
import RegistrationForm from "./pages/Eduevent/RegistrationForm";
import CheckStatusPage from "./pages/Eduevent/CheckStatusPage"
import StatusModal from "./pages/Eduevent/StatusModal";


function App() {
  return (
    <BrowserRouter>
      {/* <Navbar /> */}

      <Routes>
        {/* Admin Routes */}
        <Route path="/loginadmin" element={<AdminLogin />} />
        <Route path="/adminhome" element={<AdminHome />} />
        <Route path="/artikeladmin" element={<ArtikelAdmin />} />
        <Route path="/data-admin" element={<DataAdmin />} />
        <Route path="/webinar-admin" element={<WebinarAdmin />} />
        <Route path="/admin/webinar-peserta" element={<WebinarPesertaAdmin />} />
        <Route path="/data-pendaftar" element={<DataPendaftar />} />
        <Route path="/edit-pendaftar/:id" element={<EditPendaftar />} />
        <Route path="/beasiswa-management" element={<BeasiswaManagement />} />
        <Route path="/penilaian-management" element={<PenilaianManagement />} />
        <Route path="/artikel-management" element={<ArtikelManagement />} />
        <Route path="/forum-management" element={<ForumManagement />} />
        <Route path="/diskusi-management" element={<DiskusiManagement />} />
        <Route path="/mentoring-management" element={<MentoringManagement />} />
        <Route path="/user-management" element={<UserManagement />} />
        <Route path="/kompetisi-management" element={<KompetisiManagement />} />
        <Route path="/kompetisi-registration-management" element={<KompetisiRegistrationsManagement />} />

       

        {/* Public Routes */}
        <Route path="/" element={<LandingBefore />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/registerpage" element={<RegisterPage />} />
        <Route path="/forgot-password" element={<ResetPage />} />
        <Route path="/reset-password/:token" element={<ResetPage />} />

        {/* Halaman Profile */}
        <Route path="/profile" element={<ProfilePage />} />
        <Route path="/landingpage" element={<LandingAfter />} />

        {/* Halaman Scholarship Hub */}
        <Route path="/scholarshiphub" element={<ScholarshipHub />} />
        <Route path="/scholarshiphub/rekomendasi" element={<Rekomendasi />} />

        {/* Halaman Edurise Academy */}
        <Route path="/eduriseacademy" element={<EduriseAcademy />} />
        <Route path="/webinar" element={<Webinar />} />
        <Route path="/webinar/:id" element={<WebinarDetail />} />
        <Route path="/artikel" element={<Artikel />} />
        <Route path="/kategori/:categoryName" element={<ArtikelKategori />} />
        <Route path="/forumdiskusi" element={<ForumDiskusi />} />
        <Route path="/klikforum" element={<Klikforum />} />

        {/* Halaman Eduprep Tools */}
        <Route path="/eduprep-tools" element={<EduprepTools />} />
        <Route path="/eduprep-tools/pratinjau-cv" element={<PratinjauCV />} />
        <Route path="/eduprep-tools/template-cv" element={<TemplateCV />} />
        <Route path="/eduprep-tools/pratinjau-motlet"element={<PratinjauMotivation />}/>
        <Route path="/eduprep-tools/template-motlet" element={<TemplateMotivation />}/>
        <Route path="/submit-essay" element={<SubmitEssay />} />
        <Route path="/submit-essay/tunggu-hasil/:id" element={<TungguHasil />} />
        <Route path="/lihat-hasil/:id" element={<LihatHasil />} />
        <Route path="/hasil-feedback/:id" element={<HasilFeedback />} />
        <Route path="/simulasi-wawancara" element={<SimulasiWawancara />} />

        {/* Halaman Educonnect */}
        <Route path="/educonnect" element={<Educonnect />} />
        <Route path="/diskusi" element={<Diskusi />} />
        <Route path="/forum" element={<Forum />} />
        <Route path="/profile/saved-community" element={<SavedCommunity />} />
        <Route path="/mentoring" element={<Mentoring />} />

        {/* Eduevent */}
        <Route path="/eduevent" element={<Eduevent />} />
        <Route path="/eduevents/all" element={<CompetitionDetailPage />} />
        <Route path="/eduevents/:id" element={<DetailCardCompetiton />} />
        <Route path="/eduevents/:id/registration" element={<RegistrationForm />} />
        <Route path="/eduevents/check-status/:id" element={<CheckStatusPage />} />
        <Route path="/my-registrations" element={<StatusModal />} />

        {/* Halaman lain */}
      </Routes>

      {/* <Footer /> */}
    </BrowserRouter>
  );
}

export default App;
