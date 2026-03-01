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
    get matchDate() { return this.getAttribute('match-date'); }
    get matchTime() { return this.getAttribute('match-time'); }
    get status() { return this.getAttribute('status') || 'upcoming'; }
    get homePower() { return parseInt(this.getAttribute('home-power') || '50'); }
    get awayPower() { return parseInt(this.getAttribute('away-power') || '50'); }

    predict() {
        if (this.status === 'finished') return;

        const totalPower = this.homePower + this.awayPower;
        const homeWeight = this.homePower / totalPower;
        
        let hScore = Math.floor(Math.random() * 4 * (homeWeight + 0.5));
        let aScore = Math.floor(Math.random() * 4 * (1 - homeWeight + 0.5));

        this.setAttribute('home-score', hScore);
        this.setAttribute('away-score', aScore);
        this.setAttribute('predicted', 'true');
        
        this.notifyUpdate(hScore, aScore);
    }

    notifyUpdate(hScore, aScore) {
        this.dispatchEvent(new CustomEvent('match-predicted', {
            bubbles: true,
            composed: true,
            detail: {
                home: this.homeTeam,
                away: this.awayTeam,
                hScore: hScore,
                aScore: aScore,
                status: this.status
            }
        }));
    }

    render() {
        const isFinished = this.status === 'finished';
        const hScore = this.getAttribute('home-score') || '0';
        const aScore = this.getAttribute('away-score') || '0';
        const isPredicted = this.hasAttribute('predicted');

        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    --card-bg: oklch(100% 0 0);
                    --brand-primary: oklch(62.67% 0.189 148.65);
                    --finished-color: oklch(55% 0.15 250);
                    --shadow-elevated: 0 20px 25px -5px oklch(0% 0 0 / 10%), 0 8px 10px -6px oklch(0% 0 0 / 10%);
                    --text-muted: oklch(50% 0.02 260);
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
                    ${isFinished ? 'border-left: 4px solid var(--finished-color);' : ''}
                }
                .card:hover { transform: translateY(-4px); }
                .match-meta {
                    text-align: center;
                    font-size: 0.8rem;
                    color: var(--text-muted);
                    font-weight: 600;
                }
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
                    font-size: 2.5rem; font-weight: 800;
                    color: ${isFinished ? 'var(--finished-color)' : 'var(--brand-primary)'};
                    display: flex; align-items: center; gap: 0.5rem;
                }
                .vs { font-size: 0.7rem; color: oklch(60% 0.02 260); font-weight: 600; }
                .status-tag {
                    font-size: 0.6rem; text-transform: uppercase; letter-spacing: 0.1em;
                    font-weight: 800; padding: 2px 8px; border-radius: 4px; align-self: center;
                    background: ${isFinished ? 'var(--finished-color)' : 'var(--brand-primary)'};
                    color: white;
                }
                .predict-btn {
                    background: oklch(95% 0.01 260);
                    color: oklch(20% 0.02 260);
                    border: none; padding: 0.6rem; border-radius: 8px;
                    font-weight: 600; cursor: pointer; transition: all 0.2s;
                    display: ${isFinished ? 'none' : 'block'};
                }
                .predict-btn:hover { background: var(--brand-primary); color: white; }
            </style>
            <div class="card">
                <div class="match-meta">${this.matchDate} ${this.matchTime}</div>
                <div class="status-tag">${isFinished ? 'Match Result' : 'AI Predict'}</div>
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
                ${!isFinished ? `<button class="predict-btn">${isPredicted ? '다시 예측' : '결과 예측하기'}</button>` : ''}
            </div>
        `;
        if (!isFinished) {
            this.shadowRoot.querySelector('.predict-btn').onclick = () => this.predict();
        }
    }
}

customElements.define('match-prediction', MatchPrediction);

const DATA = {
    K1: [
        // Finished Matches (Round 1 - Feb 2026)
        { date: '2026.02.21', time: '14:00', status: 'finished', home: '울산 HD', away: 'FC 서울', hLogo: 'https://www.kleague.com/images/club/club_symbol_K01_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K09_2023.png', hScore: 2, aScore: 1, hPow: 88, aPow: 83 },
        { date: '2026.02.21', time: '16:30', status: 'finished', home: '전북 현대', away: '포항 스틸러스', hLogo: 'https://www.kleague.com/images/club/club_symbol_K04_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K03_2023.png', hScore: 1, aScore: 1, hPow: 80, aPow: 82 },
        { date: '2026.02.22', time: '14:00', status: 'finished', home: '광주 FC', away: '강원 FC', hLogo: 'https://www.kleague.com/images/club/club_symbol_K22.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K21_2023.png', hScore: 3, aScore: 0, hPow: 78, aPow: 76 },
        // Upcoming Matches
        { date: '2026.03.01', time: '14:00', status: 'upcoming', home: '울산 HD', away: '포항 스틸러스', hLogo: 'https://www.kleague.com/images/club/club_symbol_K01_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K03_2023.png', hPow: 88, aPow: 82 },
        { date: '2026.03.01', time: '16:30', status: 'upcoming', home: '전북 현대', away: 'FC 서울', hLogo: 'https://www.kleague.com/images/club/club_symbol_K04_2023.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K09_2023.png', hPow: 80, aPow: 83 },
        { date: '2026.03.02', time: '14:00', status: 'upcoming', home: '광주 FC', away: '인천 유나이티드', hLogo: 'https://www.kleague.com/images/club/club_symbol_K22.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K18_2023.png', hPow: 78, aPow: 75 },
    ],
    K2: [
        // Finished Matches
        { date: '2026.02.22', time: '13:30', status: 'finished', home: '수원 삼성', away: '성남 FC', hLogo: 'https://www.kleague.com/images/club/club_symbol_K02.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K08.png', hScore: 2, aScore: 0, hPow: 75, aPow: 68 },
        // Upcoming Matches
        { date: '2026.03.01', time: '13:30', status: 'upcoming', home: '수원 삼성', away: '부산 아이파크', hLogo: 'https://www.kleague.com/images/club/club_symbol_K02.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K06.png', hPow: 75, aPow: 72 },
        { date: '2026.03.01', time: '16:00', status: 'upcoming', home: '서울 이랜드', away: 'FC 안양', hLogo: 'https://www.kleague.com/images/club/club_symbol_K27.png', aLogo: 'https://www.kleague.com/images/club/club_symbol_K26.png', hPow: 70, aPow: 71 },
    ]
};

const STANDINGS_DATA = {
    K1: [
        { team: '울산 HD', logo: 'https://www.kleague.com/images/club/club_symbol_K01_2023.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '포항 스틸러스', logo: 'https://www.kleague.com/images/club/club_symbol_K03_2023.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '전북 현대', logo: 'https://www.kleague.com/images/club/club_symbol_K04_2023.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: 'FC 서울', logo: 'https://www.kleague.com/images/club/club_symbol_K09_2023.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '광주 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K22.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '인천 유나이티드', logo: 'https://www.kleague.com/images/club/club_symbol_K18_2023.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '강원 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K21_2023.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '제주 유나이티드', logo: 'https://www.kleague.com/images/club/club_symbol_K20.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '대구 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K17.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '대전 하나 시티즌', logo: 'https://www.kleague.com/images/club/club_symbol_K10.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '수원 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K29.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '김천 상무', logo: 'https://www.kleague.com/images/club/club_symbol_K25.png', p: 0, w: 0, d: 0, l: 0, pts: 0 }
    ],
    K2: [
        { team: '수원 삼성', logo: 'https://www.kleague.com/images/club/club_symbol_K02.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '부산 아이파크', logo: 'https://www.kleague.com/images/club/club_symbol_K06.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '서울 이랜드', logo: 'https://www.kleague.com/images/club/club_symbol_K27.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: 'FC 안양', logo: 'https://www.kleague.com/images/club/club_symbol_K26.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '성남 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K08.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '전남 드래곤즈', logo: 'https://www.kleague.com/images/club/club_symbol_K07.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '부천 FC 1995', logo: 'https://www.kleague.com/images/club/club_symbol_K23.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '경남 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K19.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '충남 아산', logo: 'https://www.kleague.com/images/club/club_symbol_K30.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '김포 FC', logo: 'https://www.kleague.com/images/club/club_symbol_K31.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '충북 청주', logo: 'https://www.kleague.com/images/club/club_symbol_K32.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '천안 시티', logo: 'https://www.kleague.com/images/club/club_symbol_K33.png', p: 0, w: 0, d: 0, l: 0, pts: 0 },
        { team: '안산 그리너스', logo: 'https://www.kleague.com/images/club/club_symbol_K28.png', p: 0, w: 0, d: 0, l: 0, pts: 0 }
    ]
};

function renderStandings(league) {
    const tbody = document.getElementById('standings-body');
    if (!tbody) return;

    const data = [...STANDINGS_DATA[league]].sort((a, b) => b.pts - a.pts || b.w - a.w);
    
    tbody.innerHTML = data.map((team, index) => `
        <tr>
            <td class="rank">${index + 1}</td>
            <td class="team-cell">
                <img src="${team.logo}" alt="${team.team}">
                ${team.team}
            </td>
            <td>${team.p}</td>
            <td>${team.w}</td>
            <td>${team.d}</td>
            <td>${team.l}</td>
            <td class="points">${team.pts}</td>
        </tr>
    `).join('');
}

function updateStandings(league, result, isBatch = false) {
    const home = STANDINGS_DATA[league].find(t => t.team === result.home);
    const away = STANDINGS_DATA[league].find(t => t.team === result.away);

    if (home && away) {
        home.p++; away.p++;
        if (result.hScore > result.aScore) {
            home.w++; home.pts += 3; away.l++;
        } else if (result.hScore < result.aScore) {
            away.w++; away.pts += 3; home.l++;
        } else {
            home.d++; home.pts += 1; away.d++; away.pts += 1;
        }
    }
    if (!isBatch) renderStandings(league);
}

function init() {
    const league = document.body.dataset.league;
    const matchList = document.getElementById('match-list');
    const predictAllBtn = document.getElementById('predict-all-btn');

    // Reset standings to initial state (to be populated by finished matches)
    STANDINGS_DATA[league].forEach(t => { t.p=0; t.w=0; t.d=0; t.l=0; t.pts=0; });

    if (matchList && DATA[league]) {
        DATA[league].forEach(match => {
            const el = document.createElement('match-prediction');
            el.setAttribute('home-team', match.home);
            el.setAttribute('away-team', match.away);
            el.setAttribute('home-logo', match.hLogo);
            el.setAttribute('away-logo', match.aLogo);
            el.setAttribute('home-power', match.hPow);
            el.setAttribute('away-power', match.aPow);
            el.setAttribute('match-date', match.date);
            el.setAttribute('match-time', match.time);
            el.setAttribute('status', match.status);
            
            if (match.status === 'finished') {
                el.setAttribute('home-score', match.hScore);
                el.setAttribute('away-score', match.aScore);
                updateStandings(league, { home: match.home, away: match.away, hScore: match.hScore, aScore: match.aScore }, true);
            }
            matchList.appendChild(el);
        });
    }

    if (predictAllBtn) {
        predictAllBtn.onclick = () => {
            // Re-calculate starting from finished matches only
            STANDINGS_DATA[league].forEach(t => { t.p=0; t.w=0; t.d=0; t.l=0; t.pts=0; });
            DATA[league].filter(m => m.status === 'finished').forEach(m => {
                updateStandings(league, { home: m.home, away: m.away, hScore: m.hScore, aScore: m.aScore }, true);
            });

            const allCards = document.querySelectorAll('match-prediction[status="upcoming"]');
            allCards.forEach(card => card.predict());
            renderStandings(league);
        };
    }

    renderStandings(league);

    document.addEventListener('match-predicted', (e) => {
        if (e.detail.status === 'upcoming') {
            updateStandings(league, e.detail);
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
