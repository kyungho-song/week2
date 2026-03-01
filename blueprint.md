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
- **Match Schedule:** Display upcoming match dates and times.
- **League Standings:** Real-time league table showing rank, team, points, and stats.
- **AI Prediction Engine:** A simulated prediction logic that analyzes "team stats" to suggest a score.
- **Multi-League Support:** Separate pages for K-League 1 and K-League 2.
- **Interactive Web Components:** Encapsulated `<match-card>` elements for each game.
- **Visual Feedback:** Elegant animations and hover effects for interactive elements.

### Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Modern Baseline), ES6+ JavaScript.
- **Components:** Custom Web Components (Shadow DOM).
- **Icons:** SVG-based iconography for sharpness.

## Current Plan
1. **Add Schedule Data:** Include match dates and times in the data structure.
2. **Implement Standings Table:** Create a new section and component to display league rankings.
3. **Update UI:** 
    - Modify `index.html` and `k2.html` to include the standings section.
    - Update `style.css` for table styling.
4. **Refine Logic:** Calculate standings dynamically based on "current" mock data or static initial values.
5. **Deployment:** Commit and push the updated application to GitHub.
