import { Head, Link, router } from "@inertiajs/react";
import { useEffect, useState } from "react";
import { formatPrice } from "@/Utils/helpers";

export default function Cart(props) {
    
    const [cart, setCart] = useState(props.cart);

    const removeFromCart = (itemId) => {
        router.delete("/cart/delete/" + itemId, {
            onSuccess: () => {
                router.reload({ only: ['cart'] });

            },
            preserveScroll: true,
        });
    };

    const updateQty = (itemId, productId, qty) => {
        const newQty = Math.max(1, Number(qty) || 1);
        router.put("/cart/update", {
            product_id: productId,
            quantity: newQty,
        }, {
            onSuccess: () => {
                setCart((prev) => ({
                    ...prev,
                    items: prev.items.map((it) =>
                        it.id === itemId ? { ...it, qty: newQty } : it
                    ),
                }));
                // router.reload({ only: ['cart'] });
            },
            preserveScroll: true,
        });
    };

    const cartTotal = () =>
        formatPrice(
            cart?.items?.reduce((sum, it) => sum + (Number(it.product.price) || 0) * (Number(it.qty) || 0), 0) ?? 0
        );

    const increment = (it) => updateQty(it.id,it.product.id, it.qty + 1);
    const decrement = (it) => (it.qty <= 1 ? removeFromCart(it.id) : updateQty(it.id,it.product.id, it.qty - 1));
    

    const checkoutProcess = () =>{
        

        router.post("/checkout", {}, {
            onSuccess: () => {
                // alert("success");
            },
            onError: () => {
                // alert("Errr");
            },
            preserveScroll: true,
        });

    }
    useEffect(() => {
        setCart(props.cart)
    }, [props.cart])

    return (
        <>
            <div className="max-h-[60vh] overflow-auto p-4">
                <h3 className="mb-3 text-sm font-semibold text-gray-900">Dein Warenkorb</h3>

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
                                    <div className="mt-2 inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white p-1">
                                        <button
                                            type="button"
                                            onClick={() => decrement(it)}
                                            // disabled={updating || removing}
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
                                            onChange={(e) => updateQty(it.id, it.product.id, e.target.value)}
                                            onBlur={(e) => updateQty(it.id, it.product.id, e.target.value)}
                                            className="w-14 rounded-md border border-gray-200 px-2 py-1 text-center text-sm focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-200"
                                        />

                                        <button
                                            type="button"
                                            onClick={() => increment(it)}
                                            // disabled={updating || removing}
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

            <div className="border-t border-gray-100 p-4">
                <div className="mb-3 flex items-center justify-between text-sm">
                    <span className="text-gray-600">Zwischensumme</span>
                    <span className="font-semibold text-gray-900">{cartTotal()}</span>
                </div>
                {cart?.items?.length ? (
                    <div className="flex gap-2">
                        {props.checkout ? (
                            
                                <button
                                    className="inline-flex w-1/2 ml-auto items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                    onClick={checkoutProcess}
                                >
                                    Checkout
                                </button>
                            
                        ) : (
                            <Link
                                href="/checkout"
                                className="inline-flex w-1/2 ml-auto items-center justify-center rounded-xl bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-indigo-700"
                                onClick={() => setOpenCart(false)}
                            >
                                Zur Kasse
                            </Link>
                        )}
                    
                    </div>
                ) : null}
            </div>
        </>
    );
}