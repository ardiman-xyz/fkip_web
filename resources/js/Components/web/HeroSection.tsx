import React from "react";

type Props = {};

const DefaultComponent: React.FC<Props> = () => {
    return (
        <section className="bg-green-700 text-white md:py-32 py-20">
            <div className="container mx-auto px-4 text-center">
                <h2 className="md:text-4xl text-2xl font-bold mb-4">
                    Selamat Datang di Fakultas Keguruan dan Ilmu Pendidikan
                </h2>
                <p className="md:text-xl text-base mb-8">
                    Membentuk Pendidik Profesional untuk Masa Depan Bangsa
                </p>
                <a
                    target="_blank"
                    href="https://admisi.umkendari.ac.id/"
                    className="bg-white text-green-600 px-6 py-3 rounded-sm font-semibold hover:bg-green-100 transition duration-300"
                >
                    Pelajari Lebih Lanjut
                </a>
            </div>
        </section>
    );
};

export default DefaultComponent;
