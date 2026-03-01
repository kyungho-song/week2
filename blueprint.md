# K-League Match Result Predictor Blueprint

## Overview
A high-performance, visually stunning web application for predicting K-League match results. This tool leverages modern web standards (Web Components, Baseline CSS) to provide an interactive and engaging experience for football fans.

## Project Outline
### Design & Aesthetics
- **Modern UI:** Clean, balanced layout with ample white space and consistent padding.
- **Color Palette:** Vibrant colors using `oklch` for perceptual uniformity. Primary: K-League Green, Secondary: Deep Navy.
- **Typography:** Using 'Inter' or 'Roboto' for a modern, professional look. High contrast for readability.
- **Texture & Depth:** Subtle noise texture on the background and multi-layered drop shadows for a "lifted" card effect.
- **Responsiveness:** Full mobile support using Container Queries and Flexbox/Grid.

### Features
- **Match Selection:** Browse through current 2026 K-League matches.
- **AI Prediction Engine:** A simulated prediction logic that analyzes "team stats" to suggest a score.
- **Multi-League Support:** Separate pages for K-League 1 and K-League 2.
- **Interactive Web Components:** Encapsulated `<match-card>` elements for each game.
- **Visual Feedback:** Elegant animations and hover effects for interactive elements.

### Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Modern Baseline), ES6+ JavaScript.
- **Components:** Custom Web Components (Shadow DOM).
- **Icons:** SVG-based iconography for sharpness.

## Current Plan
1. **Update Data for 2026:** Include all K1 and K2 teams and schedules.
2. **Multi-Page Implementation:** 
    - Modify `index.html` to be K1 focused with a nav to K2.
    - Create `k2.html` for K2 League.
3. **Refine `main.js`:** Update logic to handle league-specific data injection based on the current page.
4. **Enhanced UI:** Add navigation tabs for switching between leagues.
5. **Deployment:** Commit and push the updated application to GitHub.
