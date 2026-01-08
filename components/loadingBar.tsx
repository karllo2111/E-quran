export default function LoadingBar() {
    return (
        <div className="min-h-screen bg-white flex flex-col items-center justify-center">
            <div className="w-48 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <div className="h-full bg-emerald-600 animate-progress"></div>
            </div>
            <p className="mt-4 text-sm font-medium text-emerald-800 animate-pulse">
                Memuat Daftar Surat...
            </p>
            <style jsx>{`
            .animate-progress {
              animation: progress 1.5s infinite ease-in-out;
              width: 40%;
            }
            @keyframes progress {
              0% { transform: translateX(-100%); }
              100% { transform: translateX(250%); }
            }
          `}</style>
        </div>
    );
}