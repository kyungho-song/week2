
class MatchPrediction extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        const homeTeam = this.getAttribute('home-team');
        const awayTeam = this.getAttribute('away-team');
        const homeLogo = this.getAttribute('home-logo');
        const awayLogo = this.getAttribute('away-logo');

        this.shadowRoot.innerHTML = `
            <style>
                .match {
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
                }
                .team img {
                    width: 50px;
                    height: 50px;
                    margin-bottom: 0.5rem;
                }
                .team-name {
                    font-weight: bold;
                    font-size: 1.1rem;
                }
                .score-predictor {
                    display: flex;
                    align-items: center;
                    gap: 0.5rem;
                }
                .score-input {
                    width: 40px;
                    text-align: center;
                    font-size: 1.2rem;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    padding: 0.25rem;
                }
                 button {
                    grid-column: 1 / -1;
                    background-color: var(--primary-color, #00A550);
                    color: white;
                    border: none;
                    padding: 0.75rem 1.5rem;
                    border-radius: 5px;
                    cursor: pointer;
                    font-size: 1rem;
                    margin-top: 1rem;
                    transition: background-color 0.3s;
                }

                button:hover {
                    background-color: #008f45;
                }
            </style>
            <div class="match">
                <div class="team">
                    <img src="${homeLogo}" alt="${homeTeam} logo">
                    <span class="team-name">${homeTeam}</span>
                </div>
                <div class="score-predictor">
                    <input type="number" class="score-input" min="0" value="0">
                    <span>-</span>
                    <input type="number" class="score-input" min="0" value="0">
                </div>
                <div class="team">
                    <img src="${awayLogo}" alt="${awayTeam} logo">
                    <span class="team-name">${awayTeam}</span>
                </div>
                 <button>Predict</button>
            </div>
        `;
    }
}

customElements.define('match-prediction', MatchPrediction);

const matches = [
    { home: 'Ulsan HD', away: 'Pohang Steelers', homeLogo: 'https://www.kleague.com/images/club/club_symbol_K01_2023.png', awayLogo: 'https://www.kleague.com/images/club/club_symbol_K03_2023.png' },
    { home: 'Jeonbuk Hyundai', away: 'FC Seoul', homeLogo: 'https://www.kleague.com/images/club/club_symbol_K04_2023.png', awayLogo: 'https://www.kleague.com/images/club/club_symbol_K09_2023.png' },
    { home: 'Suwon FC', away: 'Gangwon FC', homeLogo: 'https://www.kleague.com/images/club/club_symbol_K29.png', awayLogo: 'https://www.kleague.com/images/club/club_symbol_K21_2023.png' }
];

const app = document.getElementById('app');

matches.forEach(match => {
    const matchPrediction = document.createElement('match-prediction');
    matchPrediction.setAttribute('home-team', match.home);
    matchPrediction.setAttribute('away-team', match.away);
    matchPrediction.setAttribute('home-logo', match.homeLogo);
    matchPrediction.setAttribute('away-logo', match.awayLogo);
    app.appendChild(matchPrediction);
});
