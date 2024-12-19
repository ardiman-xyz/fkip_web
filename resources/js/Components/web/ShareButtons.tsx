import { Share2, Copy } from "lucide-react";
import { useState } from "react";

interface ShareButtonsProps {
    url: string;
    title: string;
}

export  const ShareButtons = ({ url, title }: ShareButtonsProps) => {
    const [copied, setCopied] = useState(false);

    const shareLinks = {
        facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
        twitter: `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`,
        whatsapp: `https://api.whatsapp.com/send?text=${encodeURIComponent(`${title} ${url}`)}`,
    };

    const handleCopyLink = async () => {
        await navigator.clipboard.writeText(url);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    return (
        <div className="flex flex-col gap-4 my-8">
            <div className="flex items-center gap-2">
                <Share2 className="w-5 h-5" />
                <span className="font-semibold">Bagikan</span>
            </div>

            <div className="flex flex-wrap gap-2">

                <a
                    href={shareLinks.whatsapp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition-colors"
                >
                    WhatsApp
                </a>

                {/* Copy Link */}
                <button
                    onClick={handleCopyLink}
                    className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 transition-colors flex items-center gap-2"
                >
                    <Copy className="w-4 h-4" />
                    {copied ? "Tersalin!" : "Salin Link"}
                </button>
            </div>
        </div>
    );
};

