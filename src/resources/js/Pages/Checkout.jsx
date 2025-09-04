import { Head, Link } from "@inertiajs/react";
import Cart from "@/Components/Cart";


export default function Checkout({  cart }) {

    // console.log(cart)

    return (
        <>
            <Head title="Checkout" />
            <div className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                <Link href="/">Shop</Link>
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">Finde deine Lieblingsartikel und lege sie in den Warenkorb.</p>
                        </div>

                    </div>
                </div>
            </div>

            <div className="bg-gray-50">
                <div className="mx-auto max-w-2xl px-4 py-8 sm:px-6 lg:px-8 ">
                    <h2 className="text-2xl font-bold text-gray-800  px-3">Checkout</h2>
                    <Cart cart={cart} checkout ={true}/>
                </div>
            </div>
        </>
    );
}