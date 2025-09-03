// import Layout from '@/layouts/authenticated';
import { Head } from '@inertiajs/react';

export default function Testa({ user }) {
    return (
        // <Layout>
        <div>
            <Head title="Welcome" />
            <h1>Welcome</h1>
            <p className="text-red-300">Hello {user}, welcome to Inertia. </p>
        </div>
        // </Layout>
    )
}