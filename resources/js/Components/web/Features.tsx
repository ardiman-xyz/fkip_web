import {Book, Calendar, Users} from "lucide-react";

export  const FeaturesSection = () => {
    return (
        <section className="py-16">
            <div className="container max-w-6xl mx-auto px-4">
                <h3 className="text-2xl font-bold mb-8 text-center">
                    Program Unggulan
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 ">
                    <div className=" p-6 rounded-lg ">
                        <Book className="w-12 h-12 text-green-600 mb-4"/>
                        <h4 className="text-xl font-semibold mb-2">
                            Kurikulum Terkini
                        </h4>
                        <p className="text-gray-600">
                            Kurikulum yang selalu diperbarui sesuai dengan
                            perkembangan dunia pendidikan.
                        </p>
                    </div>
                    <div className=" p-6 rounded-lg ">
                        <Users className="w-12 h-12 text-green-600 mb-4 "/>
                        <h4 className="text-xl font-semibold mb-2">
                            Dosen Berkualitas
                        </h4>
                        <p className="text-gray-600">
                            Tim pengajar yang terdiri dari para ahli dan
                            praktisi di bidang pendidikan.
                        </p>
                    </div>
                    <div className=" p-6 rounded-lg ">
                        <Calendar className="w-12 h-12 text-green-600 mb-4"/>
                        <h4 className="text-xl font-semibold mb-2">
                            Program Magang
                        </h4>
                        <p className="text-gray-600">
                            Kesempatan magang di berbagai institusi
                            pendidikan terkemuka.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}

