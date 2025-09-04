import { Link } from "@inertiajs/react";

export default function Order({ order }) {
    // console.log(order)
    return (
        <div className="max-w-2xl mx-auto py-12 px-6">
            <h1 className="text-2xl font-bold text-gray-800 mb-4">🎉 Bestellung erfolgreich!</h1>

            <p className="text-gray-700 mb-6">
                Vielen Dank für Ihre Bestellung, <strong>{order.customer_name}</strong>.<br />
                Ihre Bestellnummer lautet <strong>#{order.id}</strong>.
            </p>

            <div className="bg-gray-100 rounded-lg p-4 mb-6">
                <h2 className="text-lg font-semibold mb-2">🧾 Zusammenfassung</h2>
                <ul className="space-y-2">
                    {order.items.map((item) => (
                        <li key={item.id} className="flex justify-between text-sm">
                            <span>{item.name} × {item.qty}</span>
                            <span>{(Number(item.price)).toFixed(2)} €</span>
                        </li>
                    ))}
                </ul>
                <hr className="my-4" />
                <div className="flex justify-between font-bold text-gray-800">
                    <span>Gesamtbetrag:</span>
                    <span>{(Number(order.total)).toFixed(2)} €</span>
                </div>
            </div>

            <Link
                href="/"
                className="inline-block rounded-xl bg-indigo-600 text-white px-4 py-2 rounded hover:bg-indigo-700 transition"
            >
                Zur Startseite
            </Link>
        </div>
    );
}