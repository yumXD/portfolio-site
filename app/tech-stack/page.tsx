import TechStack from '../components/TechStack';
export const dynamic = "force-dynamic";

export default async function TechStackPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/tech-stack`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch tech stack data');
    }

    const techStacks = await res.json();

    return (
        <main>
            <TechStack techStacks={techStacks}/>
        </main>
    );
}
