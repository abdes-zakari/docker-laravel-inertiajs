import { useEffect, useRef, useState } from "react";
import Cart from "@/Components/Cart";

export default function CartDropdown(props) {
    
    const cartRef = useRef(null);

    // const [cart, setCart] = useState(props.cart);

    const [openCart, setOpenCart] = useState(false);

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
            <div ref={cartRef} className="relative">

                <button
                    type="button"
                    onClick={() => setOpenCart((v) => !v)}
                    className="group inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-3 py-2 text-sm font-medium text-gray-700 shadow-sm transition hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="size-5 text-gray-700 group-hover:text-gray-900"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                    >
                        <path strokeWidth="1.8" d="M3 3h2l.4 2M7 13h9.6l1.6-7H6.2M7 13 6 6M7 13l-2 8m11-8 1 8M9 21h0m8 0h0" />
                    </svg>

                    <span className="flex items-center gap-1">
                        Warenkorb
                        <span className="inline-flex min-w-5 items-center justify-center rounded-full bg-indigo-600 px-2.5 py-1 text-[15px] font-bold leading-4 text-white">
                            {props.cart?.count ?? props.cart?.items?.length ?? 0}
                        </span>
                    </span>
                </button>

                <div
                    id="cart-popover"
                    className={`absolute right-0 z-40 mt-2 w-[24rem] origin-top-right rounded-2xl border border-gray-200 bg-white p-0 shadow-2xl ring-1 ring-black/5 transition ${openCart ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                        }`}
                    role="dialog"
                    aria-label="Warenkorb-Übersicht"
                >
                    <Cart cart={props.cart}/>
                </div>
            </div>
        </>
    );
}