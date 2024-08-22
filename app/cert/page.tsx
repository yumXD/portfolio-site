import Certificates from "@/app/components/Certificates";

export default async function CertificatesPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/certificates`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch certificates');
    }

    const certificates = await res.json();

    return (
        <main>
            <Certificates certificates={certificates}/>
        </main>
    );
}
