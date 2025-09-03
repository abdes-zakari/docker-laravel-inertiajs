

export default function Toast({ toast, onClose }) {
    
    return (
        <>
            {/* Fixed Toast (oben rechts) */}
            <div
                className={`pointer-events-none fixed right-4 top-4 z-50 transition-all ${toast.open ? "translate-y-0 opacity-100" : "-translate-y-3 opacity-0"
                    }`}
                aria-live="polite"
                aria-atomic="true"
            >
                <div className="pointer-events-auto flex max-w-sm items-start gap-3 rounded-xl border border-gray-200 bg-white p-4 shadow-lg">
                    <div className="mt-0.5">
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-emerald-600" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" d="M20 6 9 17l-5-5" />
                        </svg>
                    </div>
                    <div className="text-sm">
                        <p className="font-medium text-gray-900">Zum Warenkorb hinzugefügt</p>
                        <p className="mt-0.5 text-gray-600">{toast.message}</p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="ml-auto rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Toast schließen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                    </button>
                </div>
            </div>
        </>
    );
}