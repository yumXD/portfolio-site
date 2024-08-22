import Education from "@/app/components/Education";

export default async function EducationPage() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/education`, {
        cache: 'no-store',
    });

    if (!res.ok) {
        throw new Error('Failed to fetch education data');
    }

    const educationData = await res.json();

    return (
        <main>
            <Education educationData={educationData}/>
        </main>
    );
}
