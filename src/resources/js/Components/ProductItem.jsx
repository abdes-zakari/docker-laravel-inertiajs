import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/Utils/helpers";
import Toast from "@/Components/Toast";

export default function ProductItem({ product }) {
    
    const { post, processing, data, setData, reset } = useForm({
        product_id: product.id,
        quantity: 1,
    });

    const [toast, setToast] = useState({ open: false, message: "" });
    
    const addToCart = (e, product) => {
        e.preventDefault();
        // setData("product_id", product.id);
        post("/cart/add", {
            onSuccess: () => {
                setToast({ open: true, message: `„${product.name}“ wurde in den Warenkorb gelegt.` });
                // alert("success")
                // Optional: Dropdown automatisch öffnen
                // setOpenCart(true);
                reset("quantity");
            },
            onError: (errors) => {
                alert("FEHLLLLLER")

            },
            preserveScroll: true,
        });
        console.log(data)
    };

    // auto-hide toast
    useEffect(() => {
        if (!toast.open) return;
        const t = setTimeout(() => setToast({ open: false, message: "" }), 2200);
        return () => clearTimeout(t);
    }, [toast.open]);

    return (
        <>  
            <Toast toast={toast} onClose={() => setToast({ open: false, message: "" })} />
            <article
                key={product.id}
                className="group overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm transition hover:shadow-md"
            >
                {/* Image */}
                <div className="relative">
                        <div className="aspect-[4/3] w-full bg-gradient-to-br from-gray-100 to-gray-200">
                            <div className="flex h-full items-center justify-center">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    aria-hidden="true"
                                    className="size-12 text-gray-400"
                                    fill="none"
                                    stroke="currentColor"
                                >
                                    <path strokeWidth="1.5" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11.5a1.5 1.5 0 0 1-1.5 1.5H6l-3 3V5Z" />
                                    <path strokeWidth="1.5" d="M8 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 4-5.5-5.5L7 17" />
                                </svg>
                            </div>
                        </div>
                    
                    {/* {product.badge && (
                        <span className="absolute left-3 top-3 rounded-full bg-indigo-600/90 px-2.5 py-1 text-xs font-medium text-white shadow">
                            {product.badge}
                        </span>
                    )} */}
                </div>

                {/* Body */}
                <div className="flex flex-col gap-3 p-4">
                    <div>
                        <h3 className="line-clamp-2 text-base font-semibold text-gray-900 group-hover:underline">{product.name}</h3>
                        {/* {product.subtitle && <p className="mt-1 line-clamp-1 text-sm text-gray-500">{product.subtitle}</p>} */}
                    </div>

                    <div className="flex items-baseline justify-between">
                        <p className="text-lg font-bold text-gray-900">{formatPrice(product.price ?? product.price_eur)}</p>
                        {product.compare_at && <p className="text-sm text-gray-400 line-through">{formatPrice(product.compare_at)}</p>}
                    </div>

                    {/* Add to cart */}
                    <form className="mt-1 flex items-stretch gap-2" onSubmit={(e) => addToCart(e, product)}>
                        <label className="sr-only" htmlFor={`qty-${product.id}`}>
                            Menge
                        </label>
                        <input
                            id={`qty-${product.id}`}
                            type="number"
                            min={1}
                            max={999}
                            inputMode="numeric"
                            pattern="[0-9]*"
                            className="w-20 rounded-xl border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                            value={data.product_id === product.id ? (data.quantity ?? 1) : 1}
                            onChange={(e) => {
                                if (data.product_id !== product.id) setData("product_id", product.id);
                                setData("quantity", Number(e.target.value || 1));
                            }}
                        />
                        <button
                            type="submit"
                            disabled={processing}
                            className="flex-1 rounded-xl bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-400 disabled:cursor-not-allowed disabled:opacity-60"
                        >
                            {processing && data.product_id === product.id ? "Wird hinzugefügt…" : "In den Warenkorb"}
                        </button>
                    </form>

                    {/* Meta */}
                    {/* <div className="mt-2 flex items-center justify-between text-xs text-gray-500">
                        <span className="inline-flex items-center gap-1">
                            <span className={`size-2 rounded-full ${product.in_stock ? "bg-emerald-500" : "bg-rose-500"}`} />
                            {product.in_stock ? "Auf Lager" : "Nicht verfügbar"}
                        </span>
                        {product.sku && <span>SKU: {product.sku}</span>}
                    </div> */}
                </div>
            </article>
        </>
    );
}