import {fonts} from './fonts'
import {Providers} from './providers'
import '../styles/reset.css';
import {Metadata} from "next";

export async function generateMetadata(): Promise<Metadata> {
    const iconUrl = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/favicon-url`)
        .then(res => res.json())
        .then(data => data.iconUrl);

    return {
        title: "나의 사이트",
        description: "이력서 및 포트폴리오를 포함한 웹사이트입니다.",
        icons: {
            icon: iconUrl,
        },
    };
}

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode,
}) {
    return (
        <html lang='en' className={fonts.rubik.variable}>
        <body>
        <Providers>{children}</Providers>
        </body>
        </html>
    )
}