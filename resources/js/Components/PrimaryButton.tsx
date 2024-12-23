import { ButtonHTMLAttributes } from 'react';
import { FiArrowRight } from 'react-icons/fi';

export default function PrimaryButton({
                                          className = '',
                                          disabled,
                                          children,
                                          ...props
                                      }: ButtonHTMLAttributes<HTMLButtonElement>) {
    return (
        <button
            {...props}
            className={`w-full inline-flex items-center justify-center gap-2 rounded-md border border-transparent bg-green-600 px-6 py-3 text-sm font-bold uppercase tracking-widest text-white transition duration-150 ease-in-out hover:bg-green-500 hover:shadow-lg hover:shadow-green-400 focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 active:bg-green-700 ${
                disabled ? 'opacity-50 cursor-not-allowed' : ''
            } ` + className}
            disabled={disabled}
        >
            <span className="relative">
                <span className="z-10">{children}</span>
                <span className="absolute inset-0 bg-gradient-to-r from-green-500 via-green-400 to-green-300 opacity-0 transition-opacity duration-300 group-hover:opacity-20"></span>
            </span>
            <FiArrowRight
                className={`transition-transform duration-300 ${
                    disabled ? 'opacity-0' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                }`}
            />
        </button>
    );
}
