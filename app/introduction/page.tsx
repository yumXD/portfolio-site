import WithBasicInfoLayout from "@/app/layouts/WithBasicInfoLayout";
import { Metadata } from "next";
import React from 'react';
import Introduction from "@/app/components/Introduction";

// Metadata 설정
export const metadata: Metadata = {
    title: "자기소개서",
    description: "자기소개서 사이트입니다."
};

// 데이터 타입 정의
type Section = {
    content: string;
};

type IntroductionData = {
    title: string;
    sections: Section[];
};

const fetchIntroductionData = async (): Promise<IntroductionData[]> => {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/introduction`);
    if (!response.ok) {
        throw new Error("Failed to fetch data");
    }
    return response.json();
};

const IntroductionPage = async () => {
    const data = await fetchIntroductionData();

    return (
        <WithBasicInfoLayout>
            <Introduction data={data} />
        </WithBasicInfoLayout>
    );
}

export default IntroductionPage;
