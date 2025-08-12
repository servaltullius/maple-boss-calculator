// 메이플스토리 한국서버 보스 데이터 (2024년 기준)
// 2024.7.18 크리스탈 시스템 개편 반영

const bossData = {
    // 일일 보스 (파란색 크리스탈)
    daily: {
        zakum_easy: {
            name: "자쿰(쉬움)",
            crystal: 612000,
            difficulty: "쉬움",
            type: "일일",
            color: "blue",
            requiredLevel: 50,
            party: false
        },
        zakum_normal: {
            name: "자쿰(보통)",
            crystal: 2160000,
            difficulty: "보통", 
            type: "일일",
            color: "blue",
            requiredLevel: 100,
            party: false
        },
        horntail_easy: {
            name: "혼테일(쉬움)",
            crystal: 1296000,
            difficulty: "쉬움",
            type: "일일", 
            color: "blue",
            requiredLevel: 130,
            party: false
        },
        horntail_normal: {
            name: "혼테일(보통)",
            crystal: 6480000,
            difficulty: "보통",
            type: "일일",
            color: "blue", 
            requiredLevel: 130,
            party: false
        },
        horntail_chaos: {
            name: "혼테일(카오스)",
            crystal: 16200000,
            difficulty: "카오스",
            type: "일일",
            color: "blue",
            requiredLevel: 135,
            party: false
        },
        magnus_easy: {
            name: "매그너스(쉬움)",
            crystal: 8100000,
            difficulty: "쉬움", 
            type: "일일",
            color: "blue",
            requiredLevel: 115,
            party: false
        },
        magnus_normal: {
            name: "매그너스(보통)",
            crystal: 10935000,
            difficulty: "보통",
            type: "일일",
            color: "blue",
            requiredLevel: 155,
            party: false
        },
        hilla_normal: {
            name: "힐라(보통)",
            crystal: 7776000,
            difficulty: "보통",
            type: "일일",
            color: "blue",
            requiredLevel: 120,
            party: false
        },
        hilla_hard: {
            name: "힐라(하드)",
            crystal: 15552000,
            difficulty: "하드",
            type: "일일", 
            color: "blue",
            requiredLevel: 170,
            party: false
        },
        papulatus_easy: {
            name: "파풀라투스(쉬움)",
            crystal: 5400000,
            difficulty: "쉬움",
            type: "일일",
            color: "blue",
            requiredLevel: 145,
            party: false
        },
        papulatus_normal: {
            name: "파풀라투스(보통)",
            crystal: 17010000,
            difficulty: "보통",
            type: "일일",
            color: "blue",
            requiredLevel: 155,
            party: false
        },
        arkarium_easy: {
            name: "아카이럼(쉬움)",
            crystal: 7560000,
            difficulty: "쉬움",
            type: "일일",
            color: "blue",
            requiredLevel: 140,
            party: false
        },
        arkarium_normal: {
            name: "아카이럼(보통)",
            crystal: 11340000,
            difficulty: "보통",
            type: "일일",
            color: "blue", 
            requiredLevel: 140,
            party: false
        },
        ranmaru: {
            name: "란마루",
            crystal: 9450000,
            difficulty: "보통",
            type: "일일",
            color: "blue",
            requiredLevel: 140,
            party: false
        },
        ursus: {
            name: "우르스",
            crystal: 13500000,
            difficulty: "보통",
            type: "일일",
            color: "blue",
            requiredLevel: 140,
            party: false
        }
    },

    // 주간 보스 (보라색 크리스탈) - 캐릭터당 12개 제한
    weekly: {
        cygnus_easy: {
            name: "시그너스(쉬움)",
            crystal: 10800000,
            difficulty: "쉬움",
            type: "주간",
            color: "purple",
            requiredLevel: 140,
            party: false
        },
        cygnus_normal: {
            name: "시그너스(보통)",
            crystal: 78030000,
            difficulty: "보통",
            type: "주간", 
            color: "purple",
            requiredLevel: 165,
            party: false
        },
        vonleon_easy: {
            name: "반레온(쉬움)",
            crystal: 17280000,
            difficulty: "쉬움",
            type: "주간",
            color: "purple",
            requiredLevel: 135,
            party: false
        },
        vonleon_normal: {
            name: "반레온(보통)",
            crystal: 25920000,
            difficulty: "보통",
            type: "주간",
            color: "purple",
            requiredLevel: 155,
            party: false
        },
        vonleon_hard: {
            name: "반레온(하드)",
            crystal: 38880000,
            difficulty: "하드",
            type: "주간",
            color: "purple",
            requiredLevel: 170,
            party: false
        },
        pinkbean: {
            name: "핑크빈",
            crystal: 19440000,
            difficulty: "보통",
            type: "주간",
            color: "purple",
            requiredLevel: 140,
            party: false
        },
        pierre: {
            name: "피에르",
            crystal: 25515000,
            difficulty: "보통",
            type: "주간",
            color: "purple",
            requiredLevel: 180,
            party: true
        },
        vonbon: {
            name: "반반",
            crystal: 25515000,
            difficulty: "보통", 
            type: "주간",
            color: "purple",
            requiredLevel: 180,
            party: true
        },
        bellum: {
            name: "벨룸",
            crystal: 25515000,
            difficulty: "보통",
            type: "주간",
            color: "purple", 
            requiredLevel: 180,
            party: true
        },
        crimson_queen: {
            name: "크림슨퀸",
            crystal: 25515000,
            difficulty: "보통",
            type: "주간",
            color: "purple",
            requiredLevel: 180,
            party: true
        },
        magnus_hard: {
            name: "매그너스(하드)",
            crystal: 76545000,
            difficulty: "하드",
            type: "주간",
            color: "purple",
            requiredLevel: 155,
            party: true
        },
        lotus: {
            name: "스우",
            crystal: 81180000,
            difficulty: "하드",
            type: "주간",
            color: "purple",
            requiredLevel: 190,
            party: true
        },
        damien: {
            name: "데미안", 
            crystal: 85995000,
            difficulty: "하드",
            type: "주간",
            color: "purple",
            requiredLevel: 190,
            party: true
        },
        guardian_angel_slime: {
            name: "가디언 엔젤 슬라임",
            crystal: 90405000,
            difficulty: "하드",
            type: "주간", 
            color: "purple",
            requiredLevel: 200,
            party: true
        },
        lucid_easy: {
            name: "루시드(이지)",
            crystal: 96525000,
            difficulty: "이지",
            type: "주간",
            color: "purple",
            requiredLevel: 210,
            party: true
        },
        lucid_normal: {
            name: "루시드(노말)",
            crystal: 131220000,
            difficulty: "노말",
            type: "주간",
            color: "purple",
            requiredLevel: 220,
            party: true
        },
        lucid_hard: {
            name: "루시드(하드)",
            crystal: 145395000,
            difficulty: "하드", 
            type: "주간",
            color: "purple",
            requiredLevel: 235,
            party: true
        },
        will_easy: {
            name: "윌(이지)",
            crystal: 105705000,
            difficulty: "이지",
            type: "주간",
            color: "purple",
            requiredLevel: 220,
            party: true
        },
        will_normal: {
            name: "윌(노말)",
            crystal: 145800000,
            difficulty: "노말",
            type: "주간",
            color: "purple",
            requiredLevel: 230,
            party: true
        },
        will_hard: {
            name: "윌(하드)",
            crystal: 164025000,
            difficulty: "하드",
            type: "주간", 
            color: "purple",
            requiredLevel: 245,
            party: true
        },
        gloom_normal: {
            name: "글룸(노말)",
            crystal: 160515000,
            difficulty: "노말",
            type: "주간",
            color: "purple",
            requiredLevel: 235,
            party: true
        },
        gloom_chaos: {
            name: "글룸(카오스)",
            crystal: 182925000,
            difficulty: "카오스",
            type: "주간",
            color: "purple",
            requiredLevel: 250,
            party: true
        },
        darknell_normal: {
            name: "듄켈(노말)",
            crystal: 172800000,
            difficulty: "노말",
            type: "주간",
            color: "purple",
            requiredLevel: 245,
            party: true
        },
        darknell_hard: {
            name: "듄켈(하드)",
            crystal: 199800000,
            difficulty: "하드",
            type: "주간",
            color: "purple",
            requiredLevel: 255,
            party: true
        },
        seren_normal: {
            name: "세렌(노말)",
            crystal: 187515000,
            difficulty: "노말",
            type: "주간", 
            color: "purple",
            requiredLevel: 250,
            party: true
        },
        seren_hard: {
            name: "세렌(하드)", 
            crystal: 218700000,
            difficulty: "하드",
            type: "주간",
            color: "purple",
            requiredLevel: 265,
            party: true
        }
    },

    // 월간 보스 (노란색 크리스탈)
    monthly: {
        kalos_easy: {
            name: "칼로스(이지)",
            crystal: 200000000,
            difficulty: "이지",
            type: "월간",
            color: "yellow",
            requiredLevel: 260,
            party: true
        },
        kalos_normal: {
            name: "칼로스(노말)",
            crystal: 240000000,
            difficulty: "노말", 
            type: "월간",
            color: "yellow",
            requiredLevel: 265,
            party: true
        },
        kalos_chaos: {
            name: "칼로스(카오스)",
            crystal: 300000000,
            difficulty: "카오스",
            type: "월간",
            color: "yellow",
            requiredLevel: 275,
            party: true
        },
        kaling_easy: {
            name: "카링(이지)",
            crystal: 220000000,
            difficulty: "이지",
            type: "월간",
            color: "yellow",
            requiredLevel: 265,
            party: true
        },
        kaling_normal: {
            name: "카링(노말)",
            crystal: 260000000,
            difficulty: "노말",
            type: "월간",
            color: "yellow",
            requiredLevel: 270,
            party: true
        },
        kaling_chaos: {
            name: "카링(카오스)",
            crystal: 320000000,
            difficulty: "카오스",
            type: "월간",
            color: "yellow", 
            requiredLevel: 280,
            party: true
        }
    }
};

// 보스 검색 및 필터링 함수
const bossUtils = {
    // 모든 보스 데이터를 배열로 반환
    getAllBosses: function() {
        const allBosses = [];
        Object.keys(bossData).forEach(category => {
            Object.keys(bossData[category]).forEach(bossId => {
                allBosses.push({
                    id: bossId,
                    category: category,
                    ...bossData[category][bossId]
                });
            });
        });
        return allBosses;
    },

    // 보스 검색
    searchBosses: function(query) {
        const allBosses = this.getAllBosses();
        return allBosses.filter(boss => 
            boss.name.toLowerCase().includes(query.toLowerCase())
        );
    },

    // 카테고리별 보스 반환  
    getBossesByType: function(type) {
        return bossData[type] || {};
    },

    // 파티 보스만 반환
    getPartyBosses: function() {
        return this.getAllBosses().filter(boss => boss.party);
    },

    // 솔로 보스만 반환
    getSoloBosses: function() {
        return this.getAllBosses().filter(boss => !boss.party);
    },

    // 레벨별 보스 추천
    getBossesByLevel: function(level) {
        return this.getAllBosses().filter(boss => boss.requiredLevel <= level);
    },

    // 보스 ID로 데이터 가져오기
    getBossById: function(bossId) {
        // 기본 보스 데이터에서 찾기
        for (let category of Object.keys(bossData)) {
            if (bossData[category][bossId]) {
                return {
                    id: bossId,
                    category: category,
                    ...bossData[category][bossId]
                };
            }
        }

        // 커스텀 보스에서 찾기
        const customBosses = JSON.parse(localStorage.getItem('customBosses') || '[]');
        const customBoss = customBosses.find(boss => boss.id === bossId);
        if (customBoss) {
            return {
                id: customBoss.id,
                category: 'custom',
                name: customBoss.name,
                type: customBoss.type,
                crystal: customBoss.crystal.price,
                isCustom: true
            };
        }

        return null;
    }
};

// 크리스탈 제한 정보
const crystalLimits = {
    daily: 999, // 일일은 실질적으로 무제한
    weekly: 12, // 캐릭터당 12개 제한 (2024.7.18 패치)
    monthly: 999, // 월간은 실질적으로 무제한
    totalPerWorld: 180 // 월드당 총 180개 제한
};

// 수수료 기본값
const defaultFees = {
    auction: 3, // 경매장 기본 수수료 3%
    meso: 0,    // 메소 기본 수수료 0%
    cube: 5,    // 큐브 기본 수수료 5%
    item: 3     // 기타 아이템 기본 수수료 3%
};

// 전역으로 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { bossData, bossUtils, crystalLimits, defaultFees };
} else {
    window.bossData = bossData;
    window.bossUtils = bossUtils;
    window.crystalLimits = crystalLimits;
    window.defaultFees = defaultFees;
}