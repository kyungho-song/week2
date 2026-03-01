class MatchPrediction extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    static get observedAttributes() {
        return ['home-score', 'away-score', 'predicted'];
    }

    attributeChangedCallback() {
        this.render();
    }

    get homeTeam() { return this.getAttribute('home-team'); }
    get awayTeam() { return this.getAttribute('away-team'); }
    get homeLogo() { return this.getAttribute('home-logo'); }
    get awayLogo() { return this.getAttribute('away-logo'); }
    get homePower() { return parseInt(this.getAttribute('home-power') || '50'); }
    get awayPower() { return parseInt(this.getAttribute('away-power') || '50'); }

    predict() {
        const totalPower = this.homePower + this.awayPower;
        const homeWeight = this.homePower / totalPower;
        
        let hScore = Math.floor(Math.random() * 4 * (homeWeight + 0.5));
        let aScore = Math.floor(Math.random() * 4 * (1 - homeWeight + 0.5));

        this.setAttribute('home-score', hScore);
        this.setAttribute('away-score', aScore);
        this.setAttribute('predicted', 'true');
    }

    render() {
        const hScore = this.getAttribute('home-score') || '0';
        const aScore = this.getAttribute('away-score') || '0';
        const isPredicted = this.hasAttribute('predicted');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --card-bg: oklch(100% 0 0);
                    --brand-primary: oklch(62.67% 0.189 148.65);
                    --shadow-elevated: 0 20px 25px -5px oklch(0% 0 0 / 10%), 0 8px 10px -6px oklch(0% 0 0 / 10%);
                }
                .card {
                    background: var(--card-bg);
                    border-radius: 16px;
                    padding: 1.5rem;
                    box-shadow: var(--shadow-elevated);
                    display: flex;
                    flex-direction: column;
                    gap: 1rem;
                    transition: transform 0.3s ease;
                    border: 1px solid oklch(90% 0.02 260);
                }
                .card:hover { transform: translateY(-4px); }
                .match-info {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    gap: 0.5rem;
                    text-align: center;
                }
                .team { display: flex; flex-direction: column; align-items: center; gap: 0.5rem; }
                .logo-container {
                    width: 60px; height: 60px;
                    background: oklch(95% 0.01 260);
                    border-radius: 50%;
                    display: flex; align-items: center; justify-content: center;
                    padding: 8px;
                }
                .logo-container img { width: 100%; height: 100%; object-fit: contain; }
                .team-name { font-weight: 700; font-size: 0.9rem; color: oklch(20% 0.02 260); }
                .score-display {
                    font-size: 2rem; font-weight: 800;
                    color: var(--brand-primary);
                    display: flex; align-items: center; gap: 0.5rem;
                }
                .vs { font-size: 0.7rem; color: oklch(60% 0.02 260); font-weight: 600; }
                .predict-btn {
                    background: oklch(95% 0.01 260);
                    color: oklch(20% 0.02 260);
                    border: none; padding: 0.6rem; border-radius: 8px;
                    font-weight: 600; cursor: pointer; transition: all 0.2s;
                }
                .predict-btn:hover { background: var(--brand-primary); color: white; }
                .prediction-tag {
                    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.05em;
                    color: var(--brand-primary); font-weight: 800;
                    visibility: ${isPredicted ? 'visible' : 'hidden'};
                }
            </style>
            <div class="card">
                <div class="prediction-tag">AI Prediction</div>
                <div class="match-info">
                    <div class="team">
                        <div class="logo-container"><img src="${this.homeLogo}" alt="${this.homeTeam}"></div>
                        <span class="team-name">${this.homeTeam}</span>
                    </div>
                    <div class="score-display">
                        <span>${hScore}</span>
                        <div class="vs">VS</div>
                        <span>${aScore}</span>
                    </div>
                    <div class="team">
                        <div class="logo-container"><img src="${this.awayLogo}" alt="${this.awayTeam}"></div>
                        <span class="team-name">${this.awayTeam}</span>
                    </div>
                </div>
                <button class="predict-btn">${isPredicted ? '다시 예측' : 'AI 예측'}</button>
            </div>
        `;
        this.shadowRoot.querySelector('.predict-btn').onclick = () => this.predict();
    }
}

customElements.define('match-prediction', MatchPrediction);

const DATA = {
    K1: [
        { home: '울산 HD', away: '포항 스틸러스', hLogo: 'https://www.kleague.com/images/club/club_symbol_K01_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K03_2023.png', hPow: 88, aPow: 82 },
        { home: '전북 현대', away: 'FC 서울', hLogo: 'https://www.kleague.com/images/club/club_symbol_K04_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K09_2023.png', hPow: 80, aPow: 83 },
        { home: '광주 FC', away: '인천 유나이티드', hLogo: 'https://www.kleague.com/images/club/club_symbol_K22.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K18_2023.png', hPow: 78, aPow: 75 },
        { home: '강원 FC', away: '제주 유나이티드', hLogo: 'https://www.kleague.com/images/club/club_symbol_K21_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K20.png', hPow: 76, aPow: 74 },
        { home: '대구 FC', away: '대전 하나 시티즌', hLogo: 'https://www.kleague.com/images/club/club_symbol_K17.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K10.png', hPow: 72, aPow: 73 },
        { home: '수원 FC', away: '김천 상무', hLogo: 'https://www.kleague.com/images/club/club_symbol_K29.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K25.png', hPow: 71, aPow: 77 }
    ],
    K2: [
        { home: '수원 삼성', away: '부산 아이파크', hLogo: 'https://www.kleague.com/images/club/club_symbol_K02.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K06.png', hPow: 75, aPow: 72 },
        { home: '서울 이랜드', away: 'FC 안양', hLogo: 'https://www.kleague.com/images/club/club_symbol_K27.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K26.png', hPow: 70, aPow: 71 },
        { home: '성남 FC', away: '전남 드래곤즈', hLogo: 'https://www.kleague.com/images/club/club_symbol_K08.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K07.png', hPow: 68, aPow: 69 },
        { home: '부천 FC 1995', away: '경남 FC', hLogo: 'https://www.kleague.com/images/club/club_symbol_K23.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K19.png', hPow: 67, aPow: 66 },
        { home: '충남 아산', away: '김포 FC', hLogo: 'https://www.kleague.com/images/club/club_symbol_K30.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K31.png', hPow: 65, aPow: 64 },
        { home: '충북 청주', away: '천안 시티', hLogo: 'https://www.kleague.com/images/club/club_symbol_K32.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K33.png', hPow: 63, aPow: 62 },
        { home: '안산 그리너스', away: '휴식팀', hLogo: 'https://www.kleague.com/images/club/club_symbol_K28.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K00.png', hPow: 60, aPow: 0 }
    ]
};

function init() {
    const league = document.body.dataset.league;
    const matchList = document.getElementById('match-list');
    const predictAllBtn = document.getElementById('predict-all-btn');

    if (!matchList || !DATA[league]) return;

    DATA[league].forEach(match => {
        const el = document.createElement('match-prediction');
        el.setAttribute('home-team', match.home);
        el.setAttribute('away-team', match.away);
        el.setAttribute('home-logo', match.hLogo);
        el.setAttribute('away-logo', match.aLogo);
        el.setAttribute('home-power', match.hPow);
        el.setAttribute('away-power', match.aPow);
        matchList.appendChild(el);
    });

    predictAllBtn.onclick = () => {
        const allCards = document.querySelectorAll('match-prediction');
        allCards.forEach(card => card.predict());
    };
}

document.addEventListener('DOMContentLoaded', init);
