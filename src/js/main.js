// 메이플스토리 보스 정산 분배기 - 메인 애플리케이션

class BossDistributorApp {
    constructor() {
        this.calculator = new BossCalculator();
        this.currentFilter = 'all';
        this.init();
    }

    // 애플리케이션 초기화
    init() {
        this.loadBossData();
        this.setupEventListeners();
        this.loadSavedData();
        this.updatePartyMembersList();
        console.log('🍁 메이플스토리 보스 정산 분배기 초기화 완료');
    }

    // 보스 데이터 로드 및 셀렉트 박스 채우기
    loadBossData() {
        const bossSelect = document.getElementById('boss-select');
        const allBosses = bossUtils.getAllBosses();
        
        // 기존 옵션 제거 (첫 번째 기본 옵션 제외)
        while (bossSelect.children.length > 1) {
            bossSelect.removeChild(bossSelect.lastChild);
        }

        // 보스 추가
        allBosses.forEach(boss => {
            const option = document.createElement('option');
            option.value = boss.id;
            option.textContent = `${boss.name} (${boss.type})`;
            option.dataset.type = boss.type;
            option.dataset.crystal = boss.crystal;
            bossSelect.appendChild(option);
        });

        console.log(`📊 ${allBosses.length}개 보스 데이터 로드 완료`);
    }

    // 이벤트 리스너 설정
    setupEventListeners() {
        // 보스 선택
        document.getElementById('boss-select').addEventListener('change', (e) => {
            this.onBossSelect(e.target.value);
        });

        // 보스 검색
        document.getElementById('boss-search').addEventListener('input', (e) => {
            this.onBossSearch(e.target.value);
        });

        // 보스 필터 탭
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                this.onFilterChange(e.target.dataset.filter);
            });
        });

        // 총 인원 변경
        document.getElementById('total-members').addEventListener('change', (e) => {
            this.onTotalMembersChange(parseInt(e.target.value));
        });

        // 항목 추가 버튼
        document.getElementById('add-item-btn').addEventListener('click', () => {
            this.addCustomItem();
        });

        // 계산 버튼
        document.getElementById('calculate-btn').addEventListener('click', () => {
            this.calculate();
        });

        // 설정 체크박스
        document.getElementById('round-down').addEventListener('change', (e) => {
            this.calculator.updateSettings({ roundDown: e.target.checked });
        });

        document.getElementById('leader-remainder').addEventListener('change', (e) => {
            this.calculator.updateSettings({ leaderRemainder: e.target.checked });
        });

        // 실시간 계산을 위한 입력 이벤트
        const inputElements = [
            'crystal-count', 'crystal-fee', 'meso-amount', 'meso-fee',
            'cube-count', 'cube-price', 'cube-fee', 'item-value', 'item-fee'
        ];

        inputElements.forEach(id => {
            const element = document.getElementById(id);
            if (element) {
                element.addEventListener('input', () => {
                    this.debouncedCalculate();
                });
            }
        });
    }

    // 보스 선택 처리
    onBossSelect(bossId) {
        if (!bossId) {
            this.hideBossInfo();
            return;
        }

        const boss = this.calculator.setBoss(bossId);
        if (boss) {
            this.showBossInfo(boss);
            this.updateCrystalInputs(boss);
            this.saveData();
        }
    }

    // 보스 정보 표시
    showBossInfo(boss) {
        const bossInfoDisplay = document.getElementById('boss-info-display');
        const crystalBadge = bossInfoDisplay.querySelector('.crystal-badge');
        const crystalAmount = bossInfoDisplay.querySelector('.crystal-amount');
        const bossType = bossInfoDisplay.querySelector('.boss-type');

        crystalBadge.textContent = boss.type;
        crystalBadge.className = `crystal-badge ${boss.type}`;
        
        crystalAmount.textContent = calculatorUtils.formatMeso(boss.crystal) + '메소';
        bossType.textContent = boss.party ? '파티' : '솔로';

        bossInfoDisplay.style.display = 'block';
    }

    // 보스 정보 숨기기
    hideBossInfo() {
        document.getElementById('boss-info-display').style.display = 'none';
    }

    // 크리스탈 입력 필드 업데이트
    updateCrystalInputs(boss) {
        document.getElementById('crystal-price').value = boss.crystal;
    }

    // 보스 검색
    onBossSearch(query) {
        const bossSelect = document.getElementById('boss-select');
        const options = Array.from(bossSelect.options);

        options.forEach((option, index) => {
            if (index === 0) return; // 첫 번째 기본 옵션은 스킵

            const bossName = option.textContent.toLowerCase();
            const matches = bossName.includes(query.toLowerCase());
            const typeMatches = this.currentFilter === 'all' || option.dataset.type === this.currentFilter;

            option.style.display = (matches && typeMatches) ? 'block' : 'none';
        });
    }

    // 필터 변경
    onFilterChange(filter) {
        this.currentFilter = filter;
        
        // 탭 활성화 상태 업데이트
        document.querySelectorAll('.filter-tab').forEach(tab => {
            tab.classList.toggle('active', tab.dataset.filter === filter);
        });

        // 검색 재적용
        const searchQuery = document.getElementById('boss-search').value;
        this.onBossSearch(searchQuery);
    }

    // 총 인원 변경
    onTotalMembersChange(totalMembers) {
        this.calculator.updateSettings({ totalMembers });
        this.updatePartyMembersList();
        this.saveData();
    }

    // 파티원 목록 업데이트
    updatePartyMembersList() {
        const membersList = document.getElementById('members-list');
        const totalMembers = this.calculator.settings.totalMembers;

        // 기존 목록 제거
        membersList.innerHTML = '';

        // 새 파티원 입력 필드 생성
        for (let i = 0; i < totalMembers; i++) {
            const memberDiv = this.createMemberInput(i + 1);
            membersList.appendChild(memberDiv);
        }

        // 첫 번째 파티원을 파티장으로 설정
        if (totalMembers > 0) {
            const firstMember = membersList.querySelector('.member-input');
            const leaderCheckbox = document.createElement('input');
            leaderCheckbox.type = 'checkbox';
            leaderCheckbox.checked = true;
            leaderCheckbox.classList.add('member-leader');
            
            const leaderLabel = document.createElement('label');
            leaderLabel.appendChild(leaderCheckbox);
            leaderLabel.appendChild(document.createTextNode(' 파티장'));
            leaderLabel.style.gridColumn = '1 / -1';
            leaderLabel.style.marginTop = '10px';
            
            firstMember.appendChild(leaderLabel);
        }

        this.setupMemberEventListeners();
    }

    // 파티원 입력 필드 생성
    createMemberInput(index) {
        const memberDiv = document.createElement('div');
        memberDiv.className = 'member-input';
        memberDiv.innerHTML = `
            <label>파티원 ${index}</label>
            <div class="member-stats">
                <input type="text" placeholder="닉네임" class="member-name form-control" data-index="${index}">
                <input type="number" placeholder="기여도%" min="0" max="200" value="100" class="member-contribution form-control" data-index="${index}">
                <select class="member-advantage form-control" data-index="${index}">
                    <option value="0">어드밴티지 없음</option>
                    <option value="5">어드밴티지 +5%</option>
                    <option value="10">어드밴티지 +10%</option>
                    <option value="-5">페널티 -5%</option>
                    <option value="-10">페널티 -10%</option>
                </select>
            </div>
        `;
        return memberDiv;
    }

    // 파티원 이벤트 리스너 설정
    setupMemberEventListeners() {
        const memberInputs = document.querySelectorAll('.member-name, .member-contribution, .member-advantage, .member-leader');
        
        memberInputs.forEach(input => {
            input.addEventListener('input', () => {
                this.updatePartyMembers();
                this.debouncedCalculate();
            });

            input.addEventListener('change', () => {
                this.updatePartyMembers();
                this.saveData();
            });
        });
    }

    // 파티원 데이터 업데이트
    updatePartyMembers() {
        const members = [];
        const memberInputs = document.querySelectorAll('.member-input');

        memberInputs.forEach((memberDiv, index) => {
            const nameInput = memberDiv.querySelector('.member-name');
            const contributionInput = memberDiv.querySelector('.member-contribution');
            const advantageSelect = memberDiv.querySelector('.member-advantage');
            const leaderCheckbox = memberDiv.querySelector('.member-leader');

            const name = nameInput.value.trim() || `파티원${index + 1}`;
            const contribution = parseInt(contributionInput.value) || 100;
            const advantage = parseInt(advantageSelect.value) || 0;
            const isLeader = leaderCheckbox ? leaderCheckbox.checked : (index === 0);

            members.push({
                name,
                contribution,
                advantage,
                isLeader
            });
        });

        this.calculator.setPartyMembers(members);
    }

    // 커스텀 아이템 추가
    addCustomItem() {
        const additionalItems = document.getElementById('additional-items');
        const itemIndex = additionalItems.children.length + 1;

        const itemDiv = document.createElement('div');
        itemDiv.className = 'loot-section';
        itemDiv.innerHTML = `
            <h3>🎁 추가 아이템 ${itemIndex}</h3>
            <div class="loot-item-advanced">
                <div class="item-input">
                    <label>아이템명</label>
                    <input type="text" placeholder="아이템 이름" class="custom-item-name form-control">
                </div>
                <div class="item-input">
                    <label>개수 또는 총 가치</label>
                    <input type="number" min="0" value="0" class="custom-item-amount form-control">
                </div>
                <div class="item-price">
                    <label>개당 가격 (없으면 1)</label>
                    <input type="number" min="0" value="1" class="custom-item-price form-control">
                </div>
                <div class="item-fee">
                    <label>수수료 (%)</label>
                    <input type="number" min="0" max="20" step="0.1" value="3" class="custom-item-fee form-control">
                </div>
                <button class="btn-secondary remove-item-btn" onclick="this.parentElement.parentElement.remove()">삭제</button>
            </div>
        `;

        additionalItems.appendChild(itemDiv);
        
        // 새 아이템 입력 이벤트 리스너 추가
        const inputs = itemDiv.querySelectorAll('input');
        inputs.forEach(input => {
            input.addEventListener('input', () => {
                this.debouncedCalculate();
            });
        });
    }

    // 정산 항목 데이터 수집
    collectLootItems() {
        const items = [];

        // 크리스탈
        const crystalCount = parseInt(document.getElementById('crystal-count').value) || 0;
        const crystalPrice = parseInt(document.getElementById('crystal-price').value) || 0;
        const crystalFee = parseFloat(document.getElementById('crystal-fee').value) || 0;

        if (crystalCount > 0 && crystalPrice > 0) {
            items.push({
                name: '보스 크리스탈',
                amount: crystalCount,
                price: crystalPrice,
                fee: crystalFee,
                type: 'crystal'
            });
        }

        // 메소
        const mesoAmount = parseInt(document.getElementById('meso-amount').value) || 0;
        const mesoFee = parseFloat(document.getElementById('meso-fee').value) || 0;

        if (mesoAmount > 0) {
            items.push({
                name: '메소',
                amount: mesoAmount,
                price: 1,
                fee: mesoFee,
                type: 'meso'
            });
        }

        // 큐브
        const cubeCount = parseInt(document.getElementById('cube-count').value) || 0;
        const cubePrice = parseInt(document.getElementById('cube-price').value) || 12000000;
        const cubeFee = parseFloat(document.getElementById('cube-fee').value) || 5;

        if (cubeCount > 0) {
            items.push({
                name: '큐브',
                amount: cubeCount,
                price: cubePrice,
                fee: cubeFee,
                type: 'cube'
            });
        }

        // 기타 아이템
        const itemValue = parseInt(document.getElementById('item-value').value) || 0;
        const itemFee = parseFloat(document.getElementById('item-fee').value) || 3;

        if (itemValue > 0) {
            items.push({
                name: '기타 아이템',
                amount: itemValue,
                price: 1,
                fee: itemFee,
                type: 'misc'
            });
        }

        // 커스텀 아이템들
        const customItems = document.querySelectorAll('#additional-items .loot-section');
        customItems.forEach((itemDiv, index) => {
            const name = itemDiv.querySelector('.custom-item-name').value.trim() || `추가아이템${index + 1}`;
            const amount = parseInt(itemDiv.querySelector('.custom-item-amount').value) || 0;
            const price = parseInt(itemDiv.querySelector('.custom-item-price').value) || 1;
            const fee = parseFloat(itemDiv.querySelector('.custom-item-fee').value) || 3;

            if (amount > 0) {
                items.push({
                    name,
                    amount,
                    price,
                    fee,
                    type: 'custom'
                });
            }
        });

        return items;
    }

    // 계산 실행
    calculate() {
        // 데이터 수집
        this.updatePartyMembers();
        const lootItems = this.collectLootItems();
        this.calculator.setLootItems(lootItems);

        // 검증
        const errors = this.calculator.validateData();
        if (errors.length > 0) {
            this.showErrors(errors);
            return;
        }

        // 계산 수행
        const result = this.calculator.calculate();
        this.displayResults(result);
        this.saveData();

        console.log('✅ 계산 완료:', result);
    }

    // Debounced 계산 (실시간 업데이트용)
    debouncedCalculate() {
        clearTimeout(this.calculateTimeout);
        this.calculateTimeout = setTimeout(() => {
            if (this.hasValidData()) {
                this.calculate();
            }
        }, 500);
    }

    // 유효한 데이터가 있는지 확인
    hasValidData() {
        const lootItems = this.collectLootItems();
        return lootItems.length > 0 && this.calculator.partyMembers.length > 0;
    }

    // 오류 표시
    showErrors(errors) {
        const errorMessage = errors.join('\\n');
        alert(`❌ 계산 오류:\\n\\n${errorMessage}`);
    }

    // 결과 표시
    displayResults(result) {
        const resultsSection = document.getElementById('results-section');
        const distributionResults = document.getElementById('distribution-results');
        const totalReward = document.getElementById('total-reward');

        // 총 보상 표시
        totalReward.textContent = calculatorUtils.formatMeso(result.income.net) + ' 메소';

        // 분배 결과 표시
        distributionResults.innerHTML = '';
        
        result.distributions.forEach(dist => {
            const memberResult = document.createElement('div');
            memberResult.className = 'member-result';
            memberResult.innerHTML = `
                <div class="member-info">
                    <span class="member-name">${dist.name}</span>
                    ${dist.isLeader ? '<span class="leader-badge">👑 파티장</span>' : ''}
                </div>
                <div class="member-contribution">
                    기여도 ${dist.baseContribution}%
                    ${dist.advantage !== 0 ? `(${dist.advantage > 0 ? '+' : ''}${dist.advantage}%)` : ''}
                </div>
                <div class="member-reward">
                    ${calculatorUtils.formatMeso(dist.finalAmount)} 메소
                    ${dist.hasRemainder ? `<span class="remainder-info">(+${calculatorUtils.formatMeso(dist.remainderAmount)} 나머지)</span>` : ''}
                </div>
            `;
            distributionResults.appendChild(memberResult);
        });

        // 차트 업데이트
        this.updateChart(result);

        // 결과 섹션 표시
        resultsSection.style.display = 'block';
    }

    // 차트 업데이트
    updateChart(result) {
        const canvas = document.getElementById('distribution-chart');
        const ctx = canvas.getContext('2d');

        // 기존 차트 제거
        if (this.chart) {
            this.chart.destroy();
        }

        // 새 차트 생성
        this.chart = new Chart(ctx, {
            type: 'doughnut',
            data: {
                labels: result.distributions.map(dist => dist.name),
                datasets: [{
                    data: result.distributions.map(dist => dist.finalAmount),
                    backgroundColor: [
                        '#667eea', '#764ba2', '#f093fb', '#f5576c',
                        '#4facfe', '#00f2fe', '#43e97b', '#38f9d7',
                        '#ffecd2', '#fcb69f', '#a8edea', '#fed6e3'
                    ]
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: {
                        position: 'bottom'
                    },
                    tooltip: {
                        callbacks: {
                            label: function(context) {
                                const value = context.parsed;
                                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                                const percentage = ((value / total) * 100).toFixed(1);
                                return `${context.label}: ${calculatorUtils.formatMeso(value)}메소 (${percentage}%)`;
                            }
                        }
                    }
                }
            }
        });
    }

    // 데이터 저장
    saveData() {
        const data = {
            bossId: this.calculator.currentBoss?.id,
            partyMembers: this.calculator.partyMembers,
            settings: this.calculator.settings,
            timestamp: Date.now()
        };

        calculatorUtils.saveToStorage('bossCalculatorData', data);
    }

    // 저장된 데이터 불러오기
    loadSavedData() {
        const data = calculatorUtils.loadFromStorage('bossCalculatorData');
        if (data) {
            // 보스 복원
            if (data.bossId) {
                document.getElementById('boss-select').value = data.bossId;
                this.onBossSelect(data.bossId);
            }

            // 설정 복원
            if (data.settings) {
                this.calculator.updateSettings(data.settings);
                document.getElementById('total-members').value = data.settings.totalMembers || 6;
                document.getElementById('round-down').checked = data.settings.roundDown !== false;
                document.getElementById('leader-remainder').checked = data.settings.leaderRemainder !== false;
            }

            console.log('📱 저장된 데이터 복원 완료');
        }
    }
}

// DOM 로드 완료 시 앱 초기화
document.addEventListener('DOMContentLoaded', () => {
    window.app = new BossDistributorApp();
});

// 개발 디버깅용 전역 함수
window.debugCalculation = function() {
    if (window.app) {
        return window.app.calculator.debugPrint();
    }
};