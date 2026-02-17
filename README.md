# Valentines Day — Interactive Year in Review

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build](https://github.com/Zimmyzhuang/zimmyzhuang.github.io/actions/workflows/deploy.yml/badge.svg)](https://github.com/Zimmyzhuang/zimmyzhuang.github.io/actions)
[![Language](https://img.shields.io/github/languages/top/Zimmyzhuang/zimmyzhuang.github.io)](https://github.com/Zimmyzhuang/zimmyzhuang.github.io)
[![Maintained](https://img.shields.io/badge/Maintained-yes-green.svg)](https://github.com/Zimmyzhuang/zimmyzhuang.github.io)

A personalized interactive slideshow for your Valentine — photos, music, stats, a puzzle, and confetti. Built with React + Vite.

**Live demo:** [View on GitHub Pages](https://zimmyzhuang.github.io/)

---

## Features

- **Slideshow** — Intro, time spent together, top location, top artist, love aura, top moments
- **Photos & music** — Each slide can have its own image and background song
- **Puzzle** — Drag-and-swap tile puzzle before the final question
- **Bilingual** — English and Chinese support
- **Confetti** — Canvas confetti on completion
- **Easy config** — All content in a single config file

---

## Quick Start

### 1. Clone and install

```bash
git clone https://github.com/Zimmyzhuang/zimmyzhuang.github.io.git
cd Valentines_day
npm install
```

### 2. Add your assets

- **Photos:** Place images in `public/assets/` (e.g. `public/assets/us.jpg`)
- **Music:** Place MP3 files in `public/songs/` (e.g. `public/songs/our_song.mp3`)

### 3. Customize

Edit `src/config.js` — replace names, slide content, photo paths, song paths, and UI strings (Chinese and English).

### 4. Run locally

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

---

## Configuration

All personalization happens in [`src/config.js`](src/config.js):

| Section | What to edit |
|--------|---------------|
| `name` / `nameEn` | Recipient name (Chinese / English) |
| `volume` | Master volume (0.0–1.0) |
| `slides.intro` | Greeting, subtitle, photo, song |
| `slides.timeSpent` | Minutes together, photo, song |
| `slides.topLocation` | Location text, photo, song |
| `slides.topArtist` | Artist title, photo, song |
| `slides.aura` | Love aura, colors, photo, song |
| `slides.topMoments` | List of moments, photo, song |
| `slides.puzzle` | Puzzle photo, hint, solved text |
| `slides.finalAsk` | Question and button labels |
| `slides.thankYou` | Thank-you message, emoji |
| `strings` | All UI text (start button, footnotes, etc.) |

---

## Deployment

The project deploys to GitHub Pages on every push to `main` via [`.github/workflows/deploy.yml`](.github/workflows/deploy.yml).

If your Pages URL is `https://username.github.io/Valentines_day/`, ensure `vite.config.js` includes:

```js
base: '/Valentines_day/',
```

---

## Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start dev server |
| `npm run build` | Build for production |
| `npm run preview` | Preview production build locally |
| `npm run lint` | Run ESLint |

---

## Contributing

See [CONTRIBUTING.md](CONTRIBUTING.md) for setup and contribution guidelines.
