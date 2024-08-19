import {NextResponse} from 'next/server';

export async function GET(request: Request) {
    const faviconUrl = process.env.NEXT_PUBLIC_FAVICON_URL;

    if (!faviconUrl) {
        return NextResponse.json({error: "Favicon URL not found"}, {status: 404});
    }

    return NextResponse.json({iconUrl: faviconUrl});
}
