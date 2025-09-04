import { Head, Link, useForm, usePage } from "@inertiajs/react";
import CartDropdown from "@/Components/CartDropdown";
import ProductItem from "@/Components/ProductItem";


export default function ProductsIndex({ products = [], cart }) {
    // const { props } = usePage();
    console.log(cart)
    
    return (
        <>
            <Head title="Produkte" />           
            <div className="border-b bg-white">
                <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-semibold tracking-tight text-gray-900">
                                <Link href="/">Shop</Link>
                            </h1>
                            <p className="mt-1 text-sm text-gray-600">Finde deine Lieblingsartikel und lege sie in den Warenkorb.</p>
                        </div>

                        <CartDropdown cart={cart}/>
                    </div>
                </div>
            </div>

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