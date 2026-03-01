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
- **Match Lifecycle:** 
    - **Past Matches:** Display actual results for completed games.
    - **Upcoming Matches:** Provide AI-powered result predictions for future games.
- **Match Schedule:** Display upcoming match dates and times.
- **League Standings:** Real-time league table showing rank, team, points, and stats, incorporating both actual results and predictions.
- **AI Prediction Engine:** A simulated prediction logic that analyzes "team stats" to suggest a score.
- **Multi-League Support:** Separate pages for K-League 1 and K-League 2.
- **Interactive Web Components:** Encapsulated `<match-card>` elements for each game.
- **Visual Feedback:** Elegant animations and hover effects for interactive elements.

### Technical Stack
- **Frontend:** Vanilla HTML5, CSS3 (Modern Baseline), ES6+ JavaScript.
- **Components:** Custom Web Components (Shadow DOM).
- **Icons:** SVG-based iconography for sharpness.

## Current Plan
1. **Update Data Structure:** Add `status`, `actualHScore`, and `actualAScore` to the match data.
2. **Refine Component Logic:** 
    - Display "RESULT" and actual scores for `finished` matches.
    - Display "AI PREDICTION" and interactive button for `upcoming` matches.
3. **Standings Integration:** Automatically calculate initial standings based on `finished` matches upon page load.
4. **UI Updates:** Add visual distinctions between finished and upcoming matches.
5. **Deployment:** Commit and push the updated application to GitHub.
