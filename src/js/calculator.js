// 메이플스토리 보스 정산 분배기 - 계산 로직

class BossCalculator {
    constructor() {
        this.currentBoss = null;
        this.partyMembers = [];
        this.lootItems = [];
        this.settings = {
            roundDown: true,
            leaderRemainder: true,
            totalMembers: 6
        };
    }

    // 보스 설정
    setBoss(bossId) {
        this.currentBoss = bossUtils.getBossById(bossId);
        if (this.currentBoss) {
            this.updateCrystalPrice();
        }
        return this.currentBoss;
    }

    // 크리스탈 가격 업데이트
    updateCrystalPrice() {
        if (this.currentBoss) {
            const crystalPriceInput = document.getElementById('crystal-price');
            if (crystalPriceInput) {
                crystalPriceInput.value = this.currentBoss.crystal;
            }
        }
    }

    // 파티원 설정
    setPartyMembers(members) {
        this.partyMembers = members.map(member => ({
            name: member.name || '익명',
            contribution: Math.max(0, Math.min(200, member.contribution || 100)),
            advantage: member.advantage || 0,
            isLeader: member.isLeader || false
        }));
        return this.partyMembers;
    }

    // 정산 항목 설정
    setLootItems(items) {
        this.lootItems = items.map(item => ({
            name: item.name,
            amount: item.amount || 0,
            price: item.price || 0,
            fee: Math.max(0, Math.min(20, item.fee || 0)),
            type: item.type || 'custom'
        }));
        return this.lootItems;
    }

    // 총 수익 계산 (수수료 차감 전)
    calculateGrossIncome() {
        let total = 0;
        
        for (const item of this.lootItems) {
            const itemTotal = item.amount * item.price;
            total += itemTotal;
        }
        
        return Math.floor(total);
    }

    // 수수료 계산
    calculateFees() {
        const fees = {};
        let totalFees = 0;

        for (const item of this.lootItems) {
            const itemTotal = item.amount * item.price;
            const fee = Math.floor(itemTotal * (item.fee / 100));
            fees[item.name] = fee;
            totalFees += fee;
        }

        return {
            itemFees: fees,
            totalFees: totalFees
        };
    }

    // 순 수익 계산 (수수료 차감 후)
    calculateNetIncome() {
        const grossIncome = this.calculateGrossIncome();
        const fees = this.calculateFees();
        return grossIncome - fees.totalFees;
    }

    // 개별 기여도 계산 (어드밴티지/페널티 포함)
    calculateAdjustedContributions() {
        const adjustedContributions = this.partyMembers.map(member => {
            const baseContribution = member.contribution / 100;
            const advantageMultiplier = 1 + (member.advantage / 100);
            return {
                name: member.name,
                baseContribution: member.contribution,
                advantage: member.advantage,
                adjustedContribution: baseContribution * advantageMultiplier,
                isLeader: member.isLeader
            };
        });

        // 총 기여도 계산
        const totalContribution = adjustedContributions.reduce(
            (sum, member) => sum + member.adjustedContribution, 0
        );

        // 정규화된 기여도 (전체를 100%로 맞춤)
        return adjustedContributions.map(member => ({
            ...member,
            normalizedContribution: member.adjustedContribution / totalContribution
        }));
    }

    // 분배금 계산
    calculateDistribution() {
        const netIncome = this.calculateNetIncome();
        const adjustedContributions = this.calculateAdjustedContributions();
        
        let distributions = adjustedContributions.map(member => {
            const rawAmount = netIncome * member.normalizedContribution;
            let finalAmount = rawAmount;

            // 100메소 단위 내림 처리
            if (this.settings.roundDown) {
                finalAmount = Math.floor(rawAmount / 100) * 100;
            }

            return {
                name: member.name,
                baseContribution: member.baseContribution,
                advantage: member.advantage,
                normalizedContribution: member.normalizedContribution,
                rawAmount: rawAmount,
                finalAmount: Math.floor(finalAmount),
                isLeader: member.isLeader
            };
        });

        // 파티장이 나머지 메소 수령
        if (this.settings.leaderRemainder) {
            const totalDistributed = distributions.reduce((sum, dist) => sum + dist.finalAmount, 0);
            const remainder = netIncome - totalDistributed;
            
            const leader = distributions.find(dist => dist.isLeader);
            if (leader && remainder > 0) {
                leader.finalAmount += remainder;
                leader.hasRemainder = true;
                leader.remainderAmount = remainder;
            }
        }

        return distributions;
    }

    // 전체 계산 결과 반환
    calculate() {
        const grossIncome = this.calculateGrossIncome();
        const fees = this.calculateFees();
        const netIncome = this.calculateNetIncome();
        const distributions = this.calculateDistribution();

        return {
            boss: this.currentBoss,
            income: {
                gross: grossIncome,
                net: netIncome,
                fees: fees
            },
            distributions: distributions,
            summary: {
                totalMembers: this.partyMembers.length,
                avgPerMember: Math.floor(netIncome / this.partyMembers.length),
                totalDistributed: distributions.reduce((sum, dist) => sum + dist.finalAmount, 0)
            },
            settings: { ...this.settings }
        };
    }

    // 설정 업데이트
    updateSettings(newSettings) {
        this.settings = { ...this.settings, ...newSettings };
    }

    // 데이터 검증
    validateData() {
        const errors = [];

        if (this.partyMembers.length === 0) {
            errors.push('파티원이 설정되지 않았습니다.');
        }

        if (this.lootItems.length === 0 || this.calculateGrossIncome() === 0) {
            errors.push('정산할 아이템이 없습니다.');
        }

        const leaderCount = this.partyMembers.filter(member => member.isLeader).length;
        if (this.settings.leaderRemainder && leaderCount !== 1) {
            errors.push('파티장은 정확히 1명이어야 합니다.');
        }

        // 기여도 검증
        for (const member of this.partyMembers) {
            if (member.contribution <= 0 || member.contribution > 200) {
                errors.push(`${member.name}의 기여도가 올바르지 않습니다. (1-200%)`);
            }
        }

        // 수수료 검증
        for (const item of this.lootItems) {
            if (item.fee < 0 || item.fee > 20) {
                errors.push(`${item.name}의 수수료가 올바르지 않습니다. (0-20%)`);
            }
        }

        return errors;
    }

    // 계산 결과를 콘솔에 출력 (디버깅용)
    debugPrint() {
        const result = this.calculate();
        console.group('🔍 보스 정산 계산 결과');
        
        console.log('📊 기본 정보:');
        console.log(`- 보스: ${result.boss?.name || '없음'}`);
        console.log(`- 파티원: ${result.summary.totalMembers}명`);
        
        console.log('💰 수익 정보:');
        console.log(`- 총 수익: ${result.income.gross.toLocaleString()}메소`);
        console.log(`- 수수료: ${result.income.fees.totalFees.toLocaleString()}메소`);
        console.log(`- 순 수익: ${result.income.net.toLocaleString()}메소`);
        
        console.log('👥 분배 결과:');
        result.distributions.forEach(dist => {
            console.log(`- ${dist.name}: ${dist.finalAmount.toLocaleString()}메소 (${(dist.normalizedContribution * 100).toFixed(1)}%)`);
        });
        
        console.groupEnd();
        return result;
    }
}

// 유틸리티 함수들
const calculatorUtils = {
    // 숫자를 한국 형식으로 포맷팅
    formatNumber: function(number) {
        return Math.floor(number).toLocaleString('ko-KR');
    },

    // 메소 단위를 자동으로 변환 (억, 만 등)
    formatMeso: function(amount) {
        const num = Math.floor(amount);
        if (num >= 100000000) {
            const eok = Math.floor(num / 100000000);
            const remainder = num % 100000000;
            if (remainder === 0) {
                return `${eok}억`;
            } else {
                const man = Math.floor(remainder / 10000);
                if (man === 0) {
                    return `${eok}억 ${remainder.toLocaleString()}`;
                } else {
                    return `${eok}억 ${man}만`;
                }
            }
        } else if (num >= 10000) {
            const man = Math.floor(num / 10000);
            const remainder = num % 10000;
            if (remainder === 0) {
                return `${man}만`;
            } else {
                return `${man}만 ${remainder.toLocaleString()}`;
            }
        } else {
            return num.toLocaleString();
        }
    },

    // 퍼센트 포맷팅
    formatPercent: function(decimal, precision = 1) {
        return (decimal * 100).toFixed(precision) + '%';
    },

    // 입력값 검증 및 정리
    sanitizeInput: function(value, type = 'number', min = 0, max = Infinity) {
        if (type === 'number') {
            const num = parseFloat(value) || 0;
            return Math.max(min, Math.min(max, num));
        }
        return String(value || '').trim();
    },

    // 로컬 스토리지에 데이터 저장
    saveToStorage: function(key, data) {
        try {
            localStorage.setItem(key, JSON.stringify(data));
            return true;
        } catch (error) {
            console.warn('로컬 스토리지 저장 실패:', error);
            return false;
        }
    },

    // 로컬 스토리지에서 데이터 불러오기
    loadFromStorage: function(key, defaultValue = null) {
        try {
            const data = localStorage.getItem(key);
            return data ? JSON.parse(data) : defaultValue;
        } catch (error) {
            console.warn('로컬 스토리지 불러오기 실패:', error);
            return defaultValue;
        }
    },

    // CSV 형태로 결과 내보내기
    exportToCSV: function(calculationResult) {
        const headers = ['파티원', '기여도(%)', '어드밴티지(%)', '분배금(메소)', '비율(%)'];
        const rows = calculationResult.distributions.map(dist => [
            dist.name,
            dist.baseContribution,
            dist.advantage,
            dist.finalAmount,
            (dist.normalizedContribution * 100).toFixed(1)
        ]);

        const csvContent = [headers, ...rows]
            .map(row => row.join(','))
            .join('\\n');

        return csvContent;
    }
};

// 전역으로 export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { BossCalculator, calculatorUtils };
} else {
    window.BossCalculator = BossCalculator;
    window.calculatorUtils = calculatorUtils;
}