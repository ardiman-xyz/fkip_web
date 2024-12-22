
import React from 'react';
import {Link} from "@inertiajs/react";

const DefaultComponent: React.FC = () => {
    return (
        <div className={'w-full bg-green-800 h-[36px]'}>
            <div className={'container max-w-6xl mx-auto flex items-center h-full justify-between'}>
                <div>

                </div>
                <ul className={'flex items-center gap-4 text-sm font-normal text-white'}>

                    <li>
                        <a href="#">Staf</a>
                    </li>
                    <li>
                        <a href="#">Mahasiswa</a>
                    </li>
                    <li>
                        <a href="#">Alumni</a>
                    </li>
                    <li>
                        <a href="#">Jurnal</a>
                    </li>
                    <li className={'ml-10'}>
                        {/*<a href="https://auth.fkip.umkendari.ac.id/" target={'_blank'} className={'underline'}>Login sso</a>*/}
                        <Link href={"/login"} target={'_blank'} className={'underline'}>Login sso</Link>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default DefaultComponent;
