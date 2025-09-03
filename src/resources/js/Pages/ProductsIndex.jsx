import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import CartDropdown from "@/Components/CartDropdown";
import ProductItem from "@/Components/ProductItem";
import { formatPrice } from "@/Utils/helpers";

/**
 * Erwartete Page-Props:
 * - products: Array<{ id, name, price (EUR number), image_url?, subtitle?, badge?, in_stock?, sku? }>
 * - cart: { items: Array<{ id, productId, name, qty, unitPrice, image_url? }>, count: number, total: number }
 *   (Passe die Keys an deine tatsächlichen Props an. Unten nutze ich: unitPrice als EUR Zahl.)
 */

export default function ProductsIndex({ products = [], cart }) {
    const { props } = usePage();
    // const cart = props.cart ?? { items: [], count: 0, total: 0 };
console.log(cart)
    // const { post, processing, data, setData, reset } = useForm({
    //     product_id: null,
    //     quantity: 1,
    // });

    // const { post: postRemove } = useForm({ item_id: null });

    // Toast state
    // const [toast, setToast] = useState({ open: false, message: "" });

    // Cart dropdown
    // const [openCart, setOpenCart] = useState(false);
    // const cartRef = useRef(null);

    // // close dropdown on click outside / escape
    // useEffect(() => {
    //     const onClick = (e) => {
    //         if (!cartRef.current) return;
    //         if (!cartRef.current.contains(e.target)) setOpenCart(false);
    //     };
    //     const onEsc = (e) => {
    //         if (e.key === "Escape") setOpenCart(false);
    //     };
    //     document.addEventListener("mousedown", onClick);
    //     document.addEventListener("keydown", onEsc);
    //     return () => {
    //         document.removeEventListener("mousedown", onClick);
    //         document.removeEventListener("keydown", onEsc);
    //     };
    // }, []);

    // // auto-hide toast
    // useEffect(() => {
    //     if (!toast.open) return;
    //     const t = setTimeout(() => setToast({ open: false, message: "" }), 2200);
    //     return () => clearTimeout(t);
    // }, [toast.open]);

    // const addToCart = (e, product) => {
    //     e.preventDefault();
    //     setData("product_id", product.id);
    //     post("/cart/add", {
    //         onSuccess: () => {
    //             setToast({ open: true, message: `„${product.name}“ wurde in den Warenkorb gelegt.` });
    //             // Optional: Dropdown automatisch öffnen
    //             // setOpenCart(true);
    //             reset("quantity");
    //         },
    //         preserveScroll: true,
    //     });
    // };

    // const removeFromCart = (itemId) => {
    //     postRemove("/cart/remove", {
    //         data: { item_id: itemId },
    //         preserveScroll: true,
    //     });
    // };

    // const formatPrice = (p) =>
    //     typeof p === "number"
    //         ? new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(p)
    //         : p ?? "—";

    // const cartTotal = () =>
    //     formatPrice(
    //         cart?.items?.reduce((sum, it) => sum + (Number(it.unitPrice) || 0) * (Number(it.qty) || 0), 0) ?? 0
    //     );

    return (
        <>
            <Head title="Produkte" />

            {/* Fixed Toast (oben rechts) */}
            {/* <div
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
                        onClick={() => setToast({ open: false, message: "" })}
                        className="ml-auto rounded-md p-1 text-gray-400 hover:text-gray-600 focus:outline-none"
                        aria-label="Toast schließen"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                            <path strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                        </svg>
                    </button>
                </div>
            </div> */}

            {/* Page Header mit Warenkorb-Dropdown */}
            <div className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">Produkte</h1>
                            <p className="mt-1 text-sm text-gray-600">Finde deine Lieblingsartikel und lege sie in den Warenkorb.</p>
                        </div>

                        <CartDropdown cart={cart}/>
                    </div>
                </div>
            </div>

            {/* Produkt-Grid */}
            <div className="bg-gray-50">
                <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                        {products.map((p) => (
                            <ProductItem key={p.id} product={p}/>
                        ))}

                        {products.length === 0 && (
                            <div className="col-span-full rounded-2xl border border-dashed border-gray-300 bg-white p-12 text-center text-gray-500">
                                Keine Produkte gefunden.
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}