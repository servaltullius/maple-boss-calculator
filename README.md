# 메이플스토리 보스 정산 분배기 v1.0

## 📋 프로젝트 개요
메이플스토리 보스 파티 후 획득한 보상을 공정하게 분배해주는 웹 애플리케이션입니다.

## ✨ 주요 기능

### 🎯 핵심 기능
- **60+ 보스 지원**: 2024년 한국서버 기준 일일/주간/월간 보스
- **항목별 수수료 설정**: 크리스탈, 메소, 큐브, 기타 아이템별 개별 수수료 설정
- **어드밴티지/페널티 시스템**: 파티원별 기여도 조정
- **실시간 계산**: 입력과 동시에 자동 계산
- **100메소 단위 내림**: 정확한 분배금 계산

### 📊 고급 기능
- **보스 검색 및 필터링**: 일일/주간/월간 보스 분류
- **분배 결과 시각화**: Chart.js 기반 도넛 차트
- **데이터 저장**: 브라우저 로컬 스토리지 활용
- **CSV 내보내기**: 결과를 스프레드시트로 내보내기
- **반응형 디자인**: 모바일부터 데스크톱까지 완벽 지원

### 💰 정산 시스템
- **크리스탈 자동 가격**: 보스 선택 시 자동 가격 입력
- **다중 수익원**: 크리스탈 + 메소 + 큐브 + 기타 아이템
- **수수료 세부 설정**: 항목별 0-20% 수수료 설정
- **파티장 나머지 수령**: 내림 처리된 나머지 메소는 파티장이 수령

## 🚀 시작하기

### 🌐 온라인 사용
GitHub Pages에서 바로 사용하세요:
**[https://your-username.github.io/maplestory_boss_calculator_1.0](https://your-username.github.io/maplestory_boss_calculator_1.0)**

### 💻 로컬 개발

#### 필요 조건
- Node.js 16+ 
- npm 또는 yarn

#### 설치 방법
```bash
git clone https://github.com/your-username/maplestory_boss_calculator_1.0.git
cd maplestory_boss_calculator_1.0
npm install
```

#### 개발 서버 실행
```bash
npm run dev
```

#### 빌드
```bash
npm run build
```

## 🛠️ 기술 스택
- HTML5
- CSS3
- Vanilla JavaScript
- Chart.js (데이터 시각화)

## 📁 프로젝트 구조
```
maplestory_boss_calculator_1.0/
├── src/
│   ├── js/
│   │   ├── main.js
│   │   ├── calculator.js
│   │   └── data/
│   │       └── bosses.js
│   ├── css/
│   │   ├── style.css
│   │   └── components/
│   └── assets/
│       └── images/
├── dist/
├── index.html
├── package.json
└── README.md
```

## 🎮 사용법
1. 브라우저에서 index.html을 열거나 개발 서버를 실행합니다
2. 처치한 보스를 선택합니다
3. 파티원 정보 및 기여도를 입력합니다
4. 획득한 보상 (메소, 큐브, 아이템)을 입력합니다
5. 분배 계산 결과를 확인합니다

## 🤝 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 문의
프로젝트 관련 문의사항이 있으시면 이슈를 등록해 주세요.