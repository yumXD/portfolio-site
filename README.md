# 개인 포트폴리오 웹사이트

Next.js와 TypeScript를 사용하여 제작한 개인 포트폴리오 웹사이트입니다.


<table>
  <tr>
    <td align="center"><strong>이력서 화면</strong></td>
    <td align="center"><strong>포트폴리오 사이트</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/resume1.webp" alt="resume1" width="450" height="300"></td>
    <td><img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/portfolio1.webp" alt="portfolio1" width="450" height="300"></td>
  </tr>
</table>


## 주요 기능

- **SSR (서버 사이드 렌더링):**  
  Next.js로 서버사이드 렌더링을 구현하여 성능과 사용자 경험을 개선했습니다.

- **타입 안전성:**  
  TypeScript를 사용해 타입 안전성을 보장하고, 잠재적인 에러를 예방했습니다.

- **API 통합:**  
  Next.js API 라우트를 통해 백엔드와 연동하였습니다.

- **UI 구성:**  
  Chakra UI를 활용해 반응형 웹 디자인을 구축했습니다.

- **환경 변수 관리:**  
  유연한 설정 변경과 안전한 정보 저장을 위해 환경 변수를 관리했습니다.

## 담당 역할

- **풀스택 개발자:** 전체 프로젝트 기획, 개발 및 배포를 담당

## 기술 스택

- **프론트엔드:** Next.js, TypeScript, React, Chakra UI
- **백엔드:** Next.js API 라우트
- **데이터베이스:** MySQL, Prisma
- **배포:** Vercel

## 구현 혹은 개선한 것

### 서버사이드 렌더링 (SSR)으로 성능 및 사용자 경험 개선

- **문제점:** CSR 방식에서는 페이지 로드 이후 클라이언트 측에서 데이터를 비동기적으로 가져오는 과정이 지연되어 사용자 경험이 저하되었습니다.
- **개선:** SSR 방식은 서버에서 완전히 렌더링된 페이지를 즉시 제공함으로써 초기 로딩 시간을 크게 단축하고, 사용자에게 보다 매끄럽고 일관된 경험을 제공합니다.

<table>
  <tr>
    <td align="center"><strong>CSR 방식</strong></td>
    <td align="center"><strong>SSR 방식</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/csr.webp" alt="csr" width="450" height="300"></td>
    <td><img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/ssr.webp" alt="ssr" width="450" height="300"></td>
  </tr>
</table>

### 반응형 웹 디자인 구현

- **문제점:** 고정된 레이아웃으로 인해 예상치 못한 위치에 콘텐츠가 표시되는 문제가 발생했습니다.
- **개선:** 반응형 디자인을 적용하여 다양한 기기, 특히 모바일 환경에서 일관된 사용자 경험을 제공합니다.

<table>
  <tr>
    <td align="center"><strong>반응형 적용 전</strong></td>
    <td align="center"><strong>반응형 적용 후</strong></td>
  </tr>
  <tr>
    <td><img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/noban.webp" alt="noban" width="450" height="300"></td>
    <td><img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/yesban.webp" alt="yesban" width="450" height="300"></td>
  </tr>
</table>

### 이미지 최적화를 통한 웹 성능 개선

- **문제점:** 기존 이미지 파일 형식으로 인해 페이지 로딩 속도가 느려졌습니다.
- **개선:** 이미지 파일을 WebP 포맷으로 변환하여 파일 크기를 줄이고, 이미지 품질을 유지하면서도 페이지 로딩 속도를 대폭 개선했습니다.

## 프로젝트 성과

- **포트폴리오 공개:** Next.js와 TypeScript를 활용해 구축한 포트폴리오 웹사이트를 성공적으로 배포했습니다.
- **최신 기술 스택 활용:** Next.js, TypeScript, React, Chakra UI 등 최신 기술 스택을 효과적으로 사용해 고성능 웹사이트를 구현했습니다.
- **반응형 웹 디자인:** Chakra UI를 활용해 모든 기기에서 일관되고 최적화된 사용자 경험을 제공하는 반응형 웹사이트를 구축했습니다.
- **성능 최적화:** 서버사이드 렌더링을 통해 페이지 로딩 속도를 개선했습니다.
- **유지보수 용이성:** TypeScript와 모듈화된 코드 구조를 통해 장기적인 유지보수와 확장이 용이한 웹사이트를 구축했습니다.

## 아키텍처
<img src="https://github.com/yumXD/portfolio-site/raw/image-storage/images/architecture.webp" alt="architecture.webp" width="450" height="300">

## 팀원

- **1명**

  - **담당:** 최준성
  - **역할:** 풀스택 개발자
