import { Head, Link, useForm, usePage } from "@inertiajs/react";
import { useEffect, useRef, useState } from "react";
import { formatPrice } from "@/Utils/helpers";

/**
 * Erwartete Page-Props:
 * - products: Array<{ id, name, price (EUR number), image_url?, subtitle?, badge?, in_stock?, sku? }>
 * - cart: { items: Array<{ id, productId, name, qty, unitPrice, image_url? }>, count: number, total: number }
 *   (Passe die Keys an deine tatsächlichen Props an. Unten nutze ich: unitPrice als EUR Zahl.)
 */

export default function CartDropdown(props) {
    
    const cartRef = useRef(null);

    const [cart, setCart] = useState(props.cart);

    const [openCart, setOpenCart] = useState(false);

    // const { post: postRemove } = useForm({ item_id: null });
    const { post: postRemove, processing: removing } = useForm({ item_id: null });


    const removeFromCart = (itemId) => {
        // postRemove("/cart/remove", {
        //     data: { item_id: itemId },
        //     preserveScroll: true,
        // });
    };

    const { post: postUpdate, processing: updating } = useForm({ item_id: null, quantity: 1 });
    const updateQty = (itemId, qty) => {
        const newQty = Math.max(1, Number(qty) || 1);
        // postUpdate("/cart/update", {
        //     data: { item_id: itemId, quantity: q },
        //     preserveScroll: true,
        // });
        setCart((prev) => ({
            ...prev,
            items: prev.items.map((it) =>
                it.id === itemId ? { ...it, qty: newQty } : it
            ),
        }));

    };

    const cartTotal = () =>
        formatPrice(
            cart?.items?.reduce((sum, it) => sum + (Number(it.product.price) || 0) * (Number(it.qty) || 0), 0) ?? 0
        );

    const increment = (it) => updateQty(it.id, it.qty + 1);
    const decrement = (it) => (it.qty <= 1 ? removeFromCart(it.id) : updateQty(it.id, it.qty - 1));

    // close dropdown on click outside / escape
    useEffect(() => {
        const onClick = (e) => {
            if (!cartRef.current) return;
            if (!cartRef.current.contains(e.target)) setOpenCart(false);
        };
        const onEsc = (e) => {
            if (e.key === "Escape") setOpenCart(false);
        };
        document.addEventListener("mousedown", onClick);
        document.addEventListener("keydown", onEsc);
        return () => {
            document.removeEventListener("mousedown", onClick);
            document.removeEventListener("keydown", onEsc);
        };
    }, []);

    return (
        <>
            {/* Cart Dropdown */}
            <div ref={cartRef} className="relative">
                {/* <button
                                type="button"
                                onClick={() => setOpenCart((v) => !v)}
                                className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                                aria-expanded={openCart}
                                aria-haspopup="true"
                                aria-controls="cart-popover"
                            >
                                <span className="relative">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-5 text-gray-700 group-hover:text-gray-900" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                        <path strokeWidth="1.8" d="M3 3h2l.4 2M7 13h9.6l1.6-7H6.2M7 13 6 6M7 13l-2 8m11-8 1 8M9 21h0m8 0h0" />
                                    </svg>
                                    <span className="absolute -right-2 -top-2 inline-flex min-w-5 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-indigo-600 px-1.5 text-[10px] font-bold leading-4 text-white">
                                        {cart?.count ?? cart?.items?.length ?? 0}
                                    </span>
                                </span>
                                <span>Warenkorb</span>
                            </button> */}
                <button
                    type="button"
                    onClick={() => setOpenCart((v) => !v)}
                    className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    {/* Icon */}
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 text-gray-700 group-hover:text-gray-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeWidth="1.8" d="M3 3h2l.4 2M7 13h9.6l1.6-7H6.2M7 13 6 6M7 13l-2 8m11-8 1 8M9 21h0m8 0h0" />
                    </svg>

                    {/* Label + Badge nebeneinander */}
                    <span className="flex items-center gap-1">
                        Warenkorb
                        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-2.5 py-1 text-[15px] font-bold leading-4 text-white">
                            {cart?.count ?? cart?.items?.length ?? 0}
                        </span>
                    </span>
                </button>

                {/* Dropdown Panel */}
                <div
                    id="cart-popover"
                    className={`absolute right-0 z-40 mt-2 w-[24rem] origin-top-right rounded-2xl border border-gray-200 bg-white p-0 shadow-2xl ring-1 ring-black/5 transition ${openCart ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                        }`}
                    role="dialog"
                    aria-label="Warenkorb-Übersicht"
                >
                    <div className="max-h-[60vh] overflow-auto p-4">
                        <h3 className="mb-3 text-sm font-semibold text-gray-900">Dein Warenkorb</h3>

                        {/* Items */}
                        {cart?.items?.length ? (
                            <ul className="divide-y divide-gray-100">
                                {cart.items.map((it) => (
                                    <li key={it.id} className="flex items-center gap-3 py-3">
                                        <div className="size-14 overflow-hidden rounded-lg bg-gray-100">

                                                <div className="flex size-full items-center justify-center">
                                                    <svg xmlns="http://www.w3.org/2000/svg" className="size-6 text-gray-400" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                        <path strokeWidth="1.5" d="M3 5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v11.5a1.5 1.5 0 0 1-1.5 1.5H6l-3 3V5Z" />
                                                        <path strokeWidth="1.5" d="M8 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm12 4-5.5-5.5L7 17" />
                                                    </svg>
                                                </div>
                                        </div>

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium text-gray-900">{it.product.name}</p>
                                            <p className="mt-0.5 text-xs text-gray-500">
                                                Menge: {it.qty} · {formatPrice(Number(it.product.price) || 0)}
                                            </p>
                                            {/* Menge: decrement / input / increment */}
                                            <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1">
                                                <button
                                                    type="button"
                                                    onClick={() => decrement(it)}
                                                    disabled={updating || removing}
                                                    className="inline-flex size-7 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                                    aria-label="Menge verringern"
                                                    title="Menge -"
                                                >
                                                    -
                                                </button>

                                                <input
                                                    type="number"
                                                    min={1}
                                                    value={it.qty}
                                                    onChange={(e) => updateQty(it.id, e.target.value)}
                                                    onBlur={(e) => updateQty(it.id, e.target.value)}
                                                    className="w-14 rounded-md border border-gray-200 px-2 py-1 text-center text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                                />

                                                <button
                                                    type="button"
                                                    onClick={() => increment(it)}
                                                    disabled={updating || removing}
                                                    className="inline-flex size-7 items-center justify-center rounded-lg text-gray-600 hover:bg-gray-100 disabled:opacity-50"
                                                    aria-label="Menge erhöhen"
                                                    title="Menge +"
                                                >
                                                    +
                                                </button>
                                            </div>
                                        </div>

                                        <button
                                            type="button"
                                            onClick={() => removeFromCart(it.id)}
                                            className="rounded-lg p-2 text-gray-400 hover:bg-gray-100 hover:text-gray-700 focus:outline-none"
                                            aria-label="Artikel entfernen"
                                            title="Entfernen"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="size-4" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                                                <path strokeWidth="2" d="M6 6l12 12M18 6l-12 12" />
                                            </svg>
                                        </button>
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <div className="rounded-xl border border-dashed border-gray-200 p-6 text-center text-sm text-gray-500">
                                Dein Warenkorb ist leer.
                            </div>
                        )}
                    </div>

                    {/* Summary / Actions */}
                    <div className="border-t border-gray-100 p-4">
                        <div className="mb-3 flex items-center justify-between text-sm">
                            <span className="text-gray-600">Zwischensumme</span>
                            <span className="font-semibold text-gray-900">{cartTotal()}</span>
                        </div>
                        <div className="flex gap-2">
                            <Link
                                href="/cart"
                                className="inline-flex flex-1 items-center justify-center rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50"
                                onClick={() => setOpenCart(false)}
                            >
                                Warenkorb ansehen
                            </Link>
                            <Link
                                href="/checkout"
                                className="inline-flex flex-1 items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                onClick={() => setOpenCart(false)}
                            >
                                Zur Kasse
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            {/* /Cart Dropdown */}
        </>
    );
}