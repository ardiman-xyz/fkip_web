import { SVGAttributes } from 'react';
import {PiScanSmileyDuotone} from "react-icons/pi";

export default function ApplicationLogo(props: SVGAttributes<SVGElement>) {
    return (
        <PiScanSmileyDuotone className={'h-10 w-10'} {...props} />
    );
}
