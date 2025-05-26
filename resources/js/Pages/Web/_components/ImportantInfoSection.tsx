import React, { useState } from "react";
import {
    PiBookOpenDuotone,
    PiCertificateDuotone,
    PiStudentDuotone,
    PiBriefcaseDuotone,
    PiGraduationCapDuotone,
    PiQuestionDuotone,
    PiUserPlusDuotone,
    PiWhatsappLogoDuotone,
    PiXDuotone,
    PiHandWavingDuotone,
    PiCurrencyCircleDollarDuotone,
} from "react-icons/pi";

interface ImportantInfoItem {
    id: number;
    title: string;
    description: string;
    icon: React.ReactNode;
    color: string;
    link?: string;
    isModal?: boolean;
    modalType?: "whatsapp" | "tuition";
}

const ImportantInfoSection = () => {
    const [isWhatsAppModalOpen, setIsWhatsAppModalOpen] = useState(false);
    const [isTuitionModalOpen, setIsTuitionModalOpen] = useState(false);

    // Data dummy untuk informasi penting
    const importantInfoData: ImportantInfoItem[] = [
        {
            id: 1,
            title: "Jurnal",
            description:
                "Informasi Tentang Jurnal Fakultas Keguruan dan Ilmu Pendidikan",
            icon: <PiBookOpenDuotone className="w-12 h-12" />,
            color: "text-blue-600",
            link: "https://jet.or.id/",
        },
        {
            id: 2,
            title: "Akreditasi",
            description:
                "Informasi Tentang Akreditasi Fakultas Keguruan dan Ilmu Pendidikan",
            icon: <PiCertificateDuotone className="w-12 h-12" />,
            color: "text-blue-800",
            link: "https://banpt.or.id",
        },
        {
            id: 3,
            title: "Skripsi",
            description:
                "Informasi Tentang Skripsi Fakultas Keguruan dan Ilmu Pendidikan",
            icon: <PiStudentDuotone className="w-12 h-12" />,
            color: "text-blue-700",
            link: "https://dspace.umkendari.ac.id",
        },

        {
            id: 5,
            title: "Penelitian & Pengabdian",
            description:
                "Informasi Tentang Penelitian dan Pengabdian Fakultas Keguruan dan Ilmu Pendidikan",
            icon: <PiGraduationCapDuotone className="w-12 h-12" />,
            color: "text-blue-600",
            link: "https://drtpm.umkendari.ac.id",
        },
        {
            id: 6,
            title: "Biaya Pendidikan",
            description:
                "Informasi Tentang Biaya Pendidikan Fakultas Keguruan dan Ilmu Pendidikan",
            icon: <PiCurrencyCircleDollarDuotone className="w-12 h-12" />,
            color: "text-blue-800",
            isModal: true,
            modalType: "tuition",
        },

        {
            id: 8,
            title: "Pendaftaran Mahasiswa Baru",
            description:
                "Informasi Pendaftaran dan Penerimaan Mahasiswa Baru FKIP",
            icon: <PiUserPlusDuotone className="w-12 h-12" />,
            color: "text-green-600",
            link: "https://admisi.umkendari.ac.id",
        },
    ];

    const handleItemClick = (item: ImportantInfoItem) => {
        if (item.isModal) {
            if (item.modalType === "whatsapp") {
                setIsWhatsAppModalOpen(true);
            } else if (item.modalType === "tuition") {
                setIsTuitionModalOpen(true);
            }
        }
    };

    return (
        <section className="py-16 bg-gray-50">
            <div className="container max-w-6xl mx-auto px-4">
                {/* Section Header */}
                <div className="text-center mb-12">
                    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                        INFORMASI PENTING
                    </h2>
                    <div className="w-24 h-1 bg-yellow-500 mx-auto mb-6"></div>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        Akses informasi penting seputar akademik, penelitian,
                        dan layanan Fakultas Keguruan dan Ilmu Pendidikan
                    </p>
                </div>

                {/* Info Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {importantInfoData.map((item) =>
                        item.isModal ? (
                            <div
                                key={item.id}
                                onClick={() => handleItemClick(item)}
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer"
                            >
                                <div className="p-6 text-center">
                                    {/* Icon */}
                                    <div
                                        className={`${item.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Link Button */}
                                    <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline transition-all duration-300">
                                        Selengkapnya
                                        <svg
                                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </div>
                        ) : (
                            <a
                                key={item.id}
                                href={item.link}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1 group cursor-pointer block"
                            >
                                <div className="p-6 text-center">
                                    {/* Icon */}
                                    <div
                                        className={`${item.color} mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300`}
                                    >
                                        {item.icon}
                                    </div>

                                    {/* Title */}
                                    <h3 className="text-xl font-semibold text-gray-800 mb-3 group-hover:text-blue-600 transition-colors duration-300">
                                        {item.title}
                                    </h3>

                                    {/* Description */}
                                    <p className="text-gray-600 text-sm mb-4 leading-relaxed">
                                        {item.description}
                                    </p>

                                    {/* Link Button */}
                                    <span className="inline-flex items-center text-blue-600 hover:text-blue-800 font-medium text-sm group-hover:underline transition-all duration-300">
                                        Selengkapnya
                                        <svg
                                            className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-300"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M9 5l7 7-7 7"
                                            />
                                        </svg>
                                    </span>
                                </div>
                            </a>
                        )
                    )}
                </div>

                {isWhatsAppModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-8 max-w-md w-full mx-4 text-white relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsWhatsAppModalOpen(false)}
                                className="absolute top-4 right-4 bg-black bg-opacity-20 rounded-full p-2 hover:bg-opacity-30 transition-colors duration-200"
                            >
                                <PiXDuotone className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <div className="flex items-center justify-center gap-2 mb-4">
                                    <div className="w-10 h-10 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                                        <span className="text-lg font-bold">
                                            UMK
                                        </span>
                                    </div>
                                    <div className="text-left">
                                        <h3 className="font-bold text-lg">
                                            UMKendari
                                        </h3>
                                        <p className="text-sm opacity-90">
                                            Admisi
                                        </p>
                                    </div>
                                </div>

                                <div className="flex items-center justify-center gap-2 mb-2">
                                    <PiHandWavingDuotone className="w-6 h-6" />
                                    <h2 className="text-xl font-bold">Halo</h2>
                                </div>

                                <p className="text-lg font-semibold mb-4">
                                    Ada yang bisa kami bantu ?
                                </p>
                            </div>

                            {/* Contact Info */}
                            <div className="bg-white bg-opacity-20 rounded-xl p-4 mb-6">
                                <p className="text-center font-medium mb-4">
                                    Hubungi kami di :
                                </p>

                                <div className="space-y-3">
                                    <a
                                        href="https://wa.me/6282249910022"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block bg-white text-green-600 rounded-lg p-3 text-center font-semibold hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <PiWhatsappLogoDuotone className="w-5 h-5 inline mr-2" />
                                        +62 822-4991-0022
                                    </a>

                                    <a
                                        href="https://wa.me/6282249910033"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="block bg-white text-green-600 rounded-lg p-3 text-center font-semibold hover:bg-gray-100 transition-colors duration-200"
                                    >
                                        <PiWhatsappLogoDuotone className="w-5 h-5 inline mr-2" />
                                        +62 822-4991-0033
                                    </a>
                                </div>
                            </div>

                            {/* Additional Info */}
                            <div className="text-center text-sm opacity-90">
                                <p>
                                    Tersedia 24/7 untuk melayani pertanyaan Anda
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Tuition Modal */}
                {isTuitionModalOpen && (
                    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                        <div className="bg-white rounded-2xl p-8 max-w-md w-full mx-4 relative">
                            {/* Close Button */}
                            <button
                                onClick={() => setIsTuitionModalOpen(false)}
                                className="absolute top-4 right-4 bg-gray-100 rounded-full p-2 hover:bg-gray-200 transition-colors duration-200"
                            >
                                <PiXDuotone className="w-5 h-5" />
                            </button>

                            {/* Header */}
                            <div className="text-center mb-6">
                                <PiCurrencyCircleDollarDuotone className="w-16 h-16 mx-auto mb-4 text-blue-600" />
                                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                    Biaya Pendidikan
                                </h2>
                                <p className="text-gray-600">
                                    Informasi lengkap biaya kuliah di FKIP UMK
                                </p>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex gap-3">
                                <a
                                    href="https://admisi.umkendari.ac.id/biaya-pendidikan"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 bg-blue-600 text-white text-center py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors duration-200"
                                >
                                    Detail Lengkap
                                </a>
                                <a
                                    href="https://wa.me/6282249910022"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex-1 border-2 border-blue-600 text-blue-600 text-center py-3 rounded-lg font-semibold hover:bg-blue-600 hover:text-white transition-all duration-200"
                                >
                                    Tanya via WA
                                </a>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </section>
    );
};

export default ImportantInfoSection;
