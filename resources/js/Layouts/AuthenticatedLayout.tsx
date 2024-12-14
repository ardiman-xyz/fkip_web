import { PropsWithChildren, ReactNode, useEffect } from "react";
import Navigation from "@/Components/Navigation";
import AppHeader from "@/Components/AppHeader";
import Footer from "@/Components/Footer";
import { PiGraduationCapFill } from "react-icons/pi";
import { Toaster } from "@/Components/ui/sonner";
import TestConnection from "@/Components/TestConnectionReverb";
import { BroadcastTest } from "@/Components/BroadcastTest";
import { UploadProgress } from "@/Components/UploadProgres";

interface EventResponse {
    user_id: number;
    message: string;
    backup_file: string;
}

export default function Authenticated({
    header,
    children,
}: PropsWithChildren<{ header?: ReactNode }>) {
    return (
        <div className="relative min-h-dvh bg-gray-200 dark:bg-black">
            <Toaster />
            <div className="flex p-3 2xl:h-dvh">
                <div className="flex w-full rounded-xl shadow-sm dark:bg-gray-900">
                    <div className="max-h-vh hidden h-full w-96 flex-col justify-between overflow-y-auto rounded-s-xl border border-gray-200 bg-white xl:flex dark:border-gray-800 dark:bg-gray-900">
                        <div className="flex flex-col">
                            <header className="flex h-20 shrink-0 items-center justify-center gap-2 border-b border-gray-200 dark:border-gray-800">
                                <PiGraduationCapFill className="size-8" />
                                <h1 className="font-bold">Web fkip v1.0</h1>
                            </header>
                            <Navigation />
                        </div>
                        <div className="flex justify-start p-4 text-xs text-gray-400 dark:text-gray-600">
                            <span>Web fkip v1.0</span>
                        </div>
                    </div>
                    <div className="relative flex w-full flex-col overflow-hidden rounded-xl border-b border-e border-r border-t border-gray-200 bg-white xl:rounded-e-xl xl:rounded-s-none dark:border-gray-800 dark:bg-gray-900">
                        <AppHeader header={header} />

                        <main className="relative flex grow flex-col overflow-y-auto xl:pb-12">
                            <div className="absolute left-0 top-0 z-10 h-4 w-full bg-gradient-to-b from-white dark:from-gray-900"></div>
                            {children}
                        </main>

                        <UploadProgress />
                        <TestConnection />

                        <Footer />
                    </div>
                </div>
            </div>
        </div>
    );
}
