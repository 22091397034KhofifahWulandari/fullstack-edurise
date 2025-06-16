import React, { useState, useRef } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Bold, Italic, Underline, List, ListOrdered, Link as LinkIcon, AlignLeft, AlignCenter, AlignRight, ArrowLeft, LayoutDashboard } from 'lucide-react';
import { BarChart3, HelpCircle, Monitor, Edit, Trash, Plus, AlertTriangle, Frown } from 'lucide-react';


const ArtikelAdmin = () => {
    const navigate = useNavigate();

    // Parse ID from URL manually
    const getIdFromUrl = () => {
        const urlParams = new URLSearchParams(window.location.search);
        const id = urlParams.get('id');
        return id ? parseInt(id, 10) : null;
    };

    const articleId = getIdFromUrl();
    const [isEditMode, setIsEditMode] = useState(articleId ? true : false);
    const [previewImg, setPreviewImg] = useState(null);
    const [formData, setFormData] = useState({
        judul: '',
        deskripsi: '',
        penulis: '',
        tanggal: new Date().toISOString().split('T')[0],
        isi: ''
    });
    const contentEditorRef = useRef(null);

    // Handle input changes
    const handleInputChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [id]: value
        }));
    };

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (e) => {
                setPreviewImg(e.target.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleEditorCommand = (command) => {
        if (command === 'createLink') {
            const url = prompt('Masukkan URL link:');
            if (url) document.execCommand(command, false, url);
        } else {
            document.execCommand(command, false, null);
        }
        contentEditorRef.current.focus();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // Get content from editor
        const content = contentEditorRef.current?.innerHTML || '';

        // Create article object with all form data
        const articleData = {
            ...formData,
            content,
            image: previewImg
        };

        // In a real app, you would save this to an API
        console.log('Article data to save:', articleData);

        // Navigate back to admin dashboard using React Router
        navigate('/dashadmin');
    };

    return (
        <div className="min-h-screen bg-[#f9fafb]">
            {/* Top header bar - fixed position */}
            <header className="bg-white h-[60px] px-5 shadow-sm fixed top-0 left-0 right-0 z-50 flex items-center">
                <div className="w-full flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-10 h-10 rounded-full overflow-hidden flex items-center justify-center bg-white shadow-sm mr-3">
                            <img src="/img/eduriselanding/Ellipse 1.png" alt="EduRise Logo" className="w-[34px] h-[34px] object-contain" />
                        </div>
                        <h4 className="m-0 italic font-bold ml-2">EDURISE ADMIN</h4>
                    </div>
                    <div className="w-10 h-10 rounded-full bg-[#3375CC] text-white flex items-center justify-center">
                        <User size={24} />
                    </div>
                </div>
            </header>

            {/* Sidebar navigation */}
            <nav className="bg-[#1e3a8a] !bg-[#1e3a8a] text-white p-6 pt-[10px] fixed top-0 left-0 h-screen w-[250px] overflow-y-auto z-40">
                <div className="space-y-6 text-white">
                    {/* Main Menu Group */}
                    <div>
                        <h5 className="text-sm uppercase font-bold !text-white mb-3 px-2">Dashboard</h5>
                        <ul className="space-y-1.5">
                            <li>
                                <Link to="/adminhome" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <LayoutDashboard className="w-5 h-5 mr-3 text-white" />
                                    <span className="!text-white">Dashboard</span>
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Support Group */}
                    {/* <div>
                        <h5 className="text-sm uppercase font-bold text-gray-300 mb-3 px-2">Support</h5>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#" className="flex items-center text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <HelpCircle className="w-5 h-5 mr-3" />
                                    <span>Helpdesk</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <Monitor className="w-5 h-5 mr-3" />
                                    <span>Monitoring</span>
                                </a>
                            </li>
                        </ul>
                    </div> */}

                    {/* Services Group */}
                    <div>
                        <h5 className="text-sm uppercase font-bold !text-white mb-3 px-2">Layanan</h5>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M12 2L2 7l10 5 10-5-10-5z" />
                                        <path d="M2 17l10 5 10-5" />
                                        <path d="M2 12l10 5 10-5" />
                                    </svg>
                                    <span className="!text-white">Scholarship Hub</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                    <span className="!text-white">Eduprep Tools</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg bg-[#3375CC] hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z" />
                                    </svg>
                                    <span className="!text-white">Edu Academy</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                                        <line x1="16" y1="2" x2="16" y2="6" />
                                        <line x1="8" y1="2" x2="8" y2="6" />
                                        <line x1="3" y1="10" x2="21" y2="10" />
                                    </svg>
                                    <span className="!text-white">Edu Event</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                                        <circle cx="9" cy="7" r="4" />
                                        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                                        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                    </svg>
                                    <span className="!text-white">Edu Connect</span>
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Settings Group */}
                    <div>
                        <h5 className="text-sm uppercase font-bold !text-white mb-3 px-2">Pengaturan</h5>
                        <ul className="space-y-1.5">
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                                        <circle cx="12" cy="7" r="4" />
                                    </svg>
                                    <span className="!text-white">User Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" className="flex items-center !text-white py-2.5 px-3 rounded-lg hover:bg-[#2d4fc7] transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 mr-3" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <circle cx="12" cy="12" r="3" />
                                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z" />
                                    </svg>
                                    <span className="!text-white">Settings</span>
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* Main content area */}
            <main className="ml-[250px] pt-[80px] px-6 pb-[30px] min-h-screen bg-[#f9fafb] w-[calc(100%-250px)]">
                <div className="bg-white rounded-lg shadow-md mx-auto my-5">
                    <div className="flex justify-between items-center p-4 border-b">
                        <h4 className="m-0 font-medium text-lg">{isEditMode ? 'Edit Artikel' : 'Tulis Artikel Baru'}</h4>
                        <Link to="/adminhome" className="px-4 py-2 border border-gray-300 rounded text-gray-600 hover:bg-gray-100 inline-flex items-center">
                            <ArrowLeft size={16} className="mr-1" /> Kembali
                        </Link>
                    </div>

                    <div className="p-5">
                        <form className="w-full" onSubmit={handleSubmit}>
                            <div className="grid grid-cols-1 gap-4">
                                <div className="mb-4">
                                    <label htmlFor="judul" className="block mb-1 font-medium">Judul Artikel</label>
                                    <input
                                        type="text"
                                        id="judul"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        placeholder="Masukkan judul artikel"
                                        value={formData.judul}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="mb-4">
                                    <label htmlFor="deskripsi" className="block mb-1 font-medium">Deskripsi Singkat</label>
                                    <textarea
                                        id="deskripsi"
                                        className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                        placeholder="Masukkan deskripsi singkat artikel"
                                        rows="3"
                                        value={formData.deskripsi}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                                    <div>
                                        <label htmlFor="penulis" className="block mb-1 font-medium">Nama Penulis</label>
                                        <input
                                            type="text"
                                            id="penulis"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            placeholder="Masukkan nama penulis"
                                            value={formData.penulis}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="tanggal" className="block mb-1 font-medium">Tanggal Publikasi</label>
                                        <input
                                            type="date"
                                            id="tanggal"
                                            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#3375CC]/25 focus:border-[#3375CC]"
                                            value={formData.tanggal}
                                            onChange={handleInputChange}
                                            required
                                        />
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="gambar" className="block mb-1 font-medium">Upload Gambar</label>
                                    <div className="border-2 border-dashed border-gray-300 p-5 text-center rounded-lg bg-white">
                                        <input
                                            type="file"
                                            id="gambar"
                                            className="w-full px-3 py-2 border border-gray-300 rounded"
                                            onChange={handleImageChange}
                                            required
                                        />
                                        <div className="mt-3 min-h-[100px] flex flex-col justify-center items-center bg-gray-100 rounded p-2.5">
                                            {previewImg ? (
                                                <img
                                                    src={previewImg}
                                                    alt="Preview gambar"
                                                    className="max-w-full max-h-[200px]"
                                                />
                                            ) : (
                                                <p className="text-gray-500 m-0">Preview gambar akan muncul di sini</p>
                                            )}
                                        </div>
                                    </div>
                                </div>

                                <div className="mb-5">
                                    <label htmlFor="isi" className="block mb-1 font-medium">Isi Artikel</label>
                                    <div className="editor-container">
                                        <div className="bg-gray-200 p-2.5 rounded-t border border-gray-300 flex flex-wrap">
                                            <button type="button" onClick={() => handleEditorCommand('bold')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <Bold size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('italic')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <Italic size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('underline')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <Underline size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('insertUnorderedList')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <List size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('insertOrderedList')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <ListOrdered size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('createLink')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <LinkIcon size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('justifyLeft')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <AlignLeft size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('justifyCenter')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <AlignCenter size={16} />
                                            </button>
                                            <button type="button" onClick={() => handleEditorCommand('justifyRight')} className="bg-transparent border-none p-2 mx-0.5 cursor-pointer rounded hover:bg-gray-300">
                                                <AlignRight size={16} />
                                            </button>
                                        </div>
                                        <div
                                            ref={contentEditorRef}
                                            contentEditable="true"
                                            className="w-full h-[400px] border border-t-0 border-gray-300 rounded-b p-4 overflow-y-auto bg-white"
                                            id="isi-artikel"
                                        ></div>
                                    </div>
                                </div>

                                <div className="flex justify-end">
                                    <button
                                        type="submit"
                                        className="px-4 py-2 bg-[#3375CC] hover:bg-[#295ea3] text-white font-medium rounded transition-colors"
                                    >
                                        {isEditMode ? 'Update Artikel' : 'Buat Artikel'}
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ArtikelAdmin;