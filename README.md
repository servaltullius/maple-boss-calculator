# 🍁 메이플스토리 보스 정산 분배기 v2.0

메이플스토리 보스 파티 후 획득한 보상을 공정하게 분배해주는 웹 애플리케이션입니다.

## ✨ v2.0 업데이트 하이라이트

### 🔥 **핵심 개선사항**
- ✅ **항목별 개별 수수료 설정**: 크리스탈, 메소, 큐브, 기타 아이템별로 0-20% 수수료 개별 설정
- ✅ **60+ 한국서버 보스 지원**: 2024년 기준 일일/주간/월간 보스 데이터 완전 지원
- ✅ **2024년 시스템 반영**: 7월 18일 크리스탈 개편, 주간 12개 제한 시스템 적용
- ✅ **실시간 계산 및 검색**: 입력과 동시에 자동 계산, 보스 검색/필터링 기능

### 🎯 주요 기능

#### 📋 보스 관리
- **60+ 보스 지원**: 일일(파랑)/주간(보라)/월간(노랑) 크리스탈 구분
- **스마트 검색**: 보스 이름 검색 및 타입별 필터링
- **자동 가격 입력**: 보스 선택 시 2024년 기준 크리스탈 가격 자동 설정
- **한국서버 전용**: 글로벌 버전이 아닌 한국 데이터만 사용

#### 💰 정산 시스템
- **항목별 수수료 설정**: 각 수익원별 개별 수수료 설정 (0-20%)
  - 🔮 보스 크리스탈: 기본 0%
  - 💰 메소 드롭: 기본 0%  
  - 🎲 큐브: 기본 5%
  - 📦 기타 아이템: 기본 3%
- **다중 수익원**: 크리스탈 + 메소 + 큐브 + 기타 + 커스텀 항목
- **실시간 계산**: 입력과 동시에 분배금 자동 계산

#### 👥 파티 관리
- **어드밴티지/페널티 시스템**: 파티원별 ±5%, ±10% 기여도 조정
- **파티장 시스템**: 나머지 메소 자동 수령
- **100메소 단위 내림**: 정확한 분배금 계산
- **최대 6명 파티**: 솔플부터 6인 파티까지 지원

#### 📊 결과 시각화
- **Chart.js 도넛 차트**: 분배 비율 시각적 표시
- **상세 분배 내역**: 개인별 기여도, 어드밴티지, 최종 분배금 표시
- **총 수익 요약**: 총 수익, 수수료, 순 수익 한눈에 확인

## 🚀 사용 방법

### 🌐 온라인 사용 (추천)
GitHub Pages에서 바로 사용하세요:
**[https://servaltullius.github.io/maple-boss-calculator](https://servaltullius.github.io/maple-boss-calculator)**

### 💻 로컬 개발

```bash
git clone https://github.com/servaltullius/maple-boss-calculator.git
cd maple-boss-calculator
npm install
npm run dev
```

## 🎮 사용 가이드

1. **🎯 보스 선택**: 검색 또는 필터로 보스 찾기
2. **👥 파티 설정**: 인원 수와 파티원 정보 입력
3. **💰 수익 입력**: 각 항목별 수익과 수수료 설정
4. **📊 결과 확인**: 실시간으로 분배 결과 확인

## 🛠️ 기술 스택
- **Frontend**: Vanilla JavaScript, HTML5, CSS3
- **차트**: Chart.js
- **배포**: GitHub Pages
- **버전 관리**: Git

## 📁 프로젝트 구조
```
maple-boss-calculator/
├── src/
│   ├── js/
│   │   ├── main.js          # 메인 애플리케이션
│   │   ├── calculator.js    # 계산 로직
│   │   └── data/
│   │       └── bosses.js    # 보스 데이터 (60+)
│   └── css/
│       └── style.css        # 반응형 스타일
├── index.html               # 메인 페이지
├── .github/workflows/       # GitHub Actions 배포
└── README.md
```

## 🆚 기존 버전과의 차이점

| 기능 | 기존 React 버전 | 새 v2.0 버전 |
|------|----------------|-------------|
| 수수료 설정 | 3%/5% 고정 | **항목별 0-20% 개별 설정** |
| 보스 데이터 | 기본 지원 | **60+ 한국서버 2024년 최신** |
| 프레임워크 | React + TS | **Vanilla JS (더 빠른 로딩)** |
| 배포 | 수동 | **GitHub Actions 자동 배포** |
| 검색/필터 | 기본 | **스마트 검색 + 타입별 필터** |

## 🤝 기여하기
1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 라이선스
이 프로젝트는 MIT 라이선스 하에 있습니다.

## 📞 문의
프로젝트 관련 문의사항이 있으시면 [Issues](https://github.com/servaltullius/maple-boss-calculator/issues)를 등록해 주세요.

---
⚡ **빠르고 정확한 메이플 보스 정산을 경험해보세요!**
