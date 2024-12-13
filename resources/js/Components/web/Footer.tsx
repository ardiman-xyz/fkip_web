import { Link } from "@inertiajs/react";
import React from "react";

const Footer = () => {
    return (
        <footer className="bg-green-800 text-white py-8">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <div>
                        <h5 className="text-lg font-semibold mb-4">
                            Tentang FKIP
                        </h5>
                        <p className="text-sm">
                            Fakultas Keguruan dan Ilmu Pendidikan berkomitmen
                            untuk menghasilkan pendidik profesional yang siap
                            menghadapi tantangan pendidikan masa depan.
                        </p>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">
                            Tautan Cepat
                        </h5>
                        <ul className="text-sm space-y-2">
                            <li>
                                <Link href="#" className="hover:underline">
                                    Penerimaan Mahasiswa Baru
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Kalender Akademik
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Perpustakaan
                                </Link>
                            </li>
                            <li>
                                <Link href="#" className="hover:underline">
                                    Jurnal Ilmiah
                                </Link>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h5 className="text-lg font-semibold mb-4">
                            Hubungi Kami
                        </h5>
                        <address className="text-sm not-italic">
                            Jl. Pendidikan No. 123
                            <br />
                            Kota Universitas, 12345
                            <br />
                            Indonesia
                            <br />
                            <br />
                            Email: info@fkip.ac.id
                            <br />
                            Telp: (021) 123-4567
                        </address>
                    </div>
                </div>
                <div className="mt-8 pt-8 border-t border-green-700 text-center text-sm">
                    &copy; {new Date().getFullYear()} Fakultas Keguruan dan Ilmu
                    Pendidikan. Hak Cipta Dilindungi.
                </div>
            </div>
        </footer>
    );
};

export default Footer;
