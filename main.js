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
        // Simple AI logic: weighted random based on team power
        const totalPower = this.homePower + this.awayPower;
        const homeWeight = this.homePower / totalPower;
        
        // Simulate match
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
                    padding: 2rem;
                    box-shadow: var(--shadow-elevated);
                    display: flex;
                    flex-direction: column;
                    gap: 1.5rem;
                    transition: transform 0.3s ease;
                    border: 1px solid oklch(90% 0.02 260);
                }

                .card:hover {
                    transform: translateY(-8px);
                }

                .match-info {
                    display: grid;
                    grid-template-columns: 1fr auto 1fr;
                    align-items: center;
                    gap: 1rem;
                    text-align: center;
                }

                .team {
                    display: flex;
                    flex-direction: column;
                    align-items: center;
                    gap: 0.75rem;
                }

                .logo-container {
                    width: 80px;
                    height: 80px;
                    background: oklch(95% 0.01 260);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    padding: 10px;
                }

                .logo-container img {
                    width: 100%;
                    height: 100%;
                    object-fit: contain;
                }

                .team-name {
                    font-weight: 700;
                    font-size: 1.1rem;
                    color: oklch(20% 0.02 260);
                }

                .score-display {
                    font-size: 3rem;
                    font-weight: 800;
                    color: var(--brand-primary);
                    font-family: 'Inter', sans-serif;
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }

                .score-display span {
                    opacity: ${isPredicted ? 1 : 0.2};
                    transition: opacity 0.5s ease;
                }

                .vs {
                    font-size: 0.8rem;
                    color: oklch(60% 0.02 260);
                    font-weight: 600;
                }

                .predict-btn {
                    background: oklch(95% 0.01 260);
                    color: oklch(20% 0.02 260);
                    border: none;
                    padding: 0.75rem;
                    border-radius: 8px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.2s;
                }

                .predict-btn:hover {
                    background: var(--brand-primary);
                    color: white;
                }

                .prediction-tag {
                    font-size: 0.7rem;
                    text-transform: uppercase;
                    letter-spacing: 0.05em;
                    color: var(--brand-primary);
                    font-weight: 800;
                    margin-bottom: -1rem;
                    visibility: ${isPredicted ? 'visible' : 'hidden'};
                }
            </style>
            <div class="card">
                <div class="prediction-tag">AI Prediction Result</div>
                <div class="match-info">
                    <div class="team">
                        <div class="logo-container">
                            <img src="${this.homeLogo}" alt="${this.homeTeam}">
                        </div>
                        <span class="team-name">${this.homeTeam}</span>
                    </div>
                    
                    <div class="score-display">
                        <span>${hScore}</span>
                        <div class="vs">VS</div>
                        <span>${aScore}</span>
                    </div>

                    <div class="team">
                        <div class="logo-container">
                            <img src="${this.awayLogo}" alt="${this.awayTeam}">
                        </div>
                        <span class="team-name">${this.awayTeam}</span>
                    </div>
                </div>
                <button class="predict-btn">${isPredicted ? '다시 예측하기' : 'AI 예측 실행'}</button>
            </div>
        `;

        this.shadowRoot.querySelector('.predict-btn').onclick = () => this.predict();
    }
}

customElements.define('match-prediction', MatchPrediction);

const matches = [
    { 
        home: '울산 HD', 
        away: '포항 스틸러스', 
        homeLogo: 'https://www.kleague.com/images/club/club_symbol_K01_2023.png', 
        awayLogo: 'https://www.kleague.com/images/club/club_symbol_K03_2023.png',
        homePower: 85,
        awayPower: 80
    },
    { 
        home: '전북 현대', 
        away: 'FC 서울', 
        homeLogo: 'https://www.kleague.com/images/club/club_symbol_K04_2023.png', 
        awayLogo: 'https://www.kleague.com/images/club/club_symbol_K09_2023.png',
        homePower: 75,
        awayPower: 78
    },
    { 
        home: '수원 FC', 
        away: '강원 FC', 
        homeLogo: 'https://www.kleague.com/images/club/club_symbol_K29.png', 
        awayLogo: 'https://www.kleague.com/images/club/club_symbol_K21_2023.png',
        homePower: 70,
        awayPower: 72
    },
    { 
        home: '광주 FC', 
        away: '인천 유나이티드', 
        homeLogo: 'https://www.kleague.com/images/club/club_symbol_K22.png', 
        awayLogo: 'https://www.kleague.com/images/club/club_symbol_K18_2023.png',
        homePower: 73,
        awayPower: 71
    }
];

const matchList = document.getElementById('match-list');
const predictAllBtn = document.getElementById('predict-all-btn');

function init() {
    matches.forEach(match => {
        const el = document.createElement('match-prediction');
        el.setAttribute('home-team', match.home);
        el.setAttribute('away-team', match.away);
        el.setAttribute('home-logo', match.homeLogo);
        el.setAttribute('away-logo', match.awayLogo);
        el.setAttribute('home-power', match.homePower);
        el.setAttribute('away-power', match.awayPower);
        matchList.appendChild(el);
    });

    predictAllBtn.onclick = () => {
        const allCards = document.querySelectorAll('match-prediction');
        allCards.forEach(card => card.predict());
    };
}

document.addEventListener('DOMContentLoaded', init);
