import AboutMe from '../components/AboutMe';

async function getAboutMeData() {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/about-me`, {
        cache: "no-store",
    });
    if (!res.ok) {
        throw new Error('Failed to fetch data');
    }
    const data = await res.json();
    return data;
}

export default async function AboutMePage() {
    const {experiences, habits, goals} = await getAboutMeData();

    return (
        <div>
            <AboutMe experiences={experiences} habits={habits} goals={goals}/>
        </div>
    );
}
