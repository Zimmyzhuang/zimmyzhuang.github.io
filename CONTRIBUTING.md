# Contributing to Valentines Day

Thank you for your interest in contributing! This document explains how to get set up and submit changes.

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Local Setup

1. **Fork** this repository and clone your fork:
   ```bash
   git clone https://github.com/Zimmyzhuang/zimmyzhuang.github.io.git
   cd Valentines_day
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the dev server**:
   ```bash
   npm run dev
   ```

4. **Customize** the content in `src/config.js` — all text, photos, and song paths are defined there.

5. **Add your assets**:
   - Photos: place images in `public/assets/` and reference them as `/assets/photo.jpg` in the config
   - Music: place MP3 files in `public/songs/` and reference them as `/songs/song.mp3` in the config

## Making Changes

1. Create a new branch from `main`:
   ```bash
   git checkout -b feature/your-feature-name
   ```

2. Make your changes. Keep them focused and well-scoped.

3. Run the linter:
   ```bash
   npm run lint
   ```

4. Commit with a clear message:
   ```bash
   git commit -m "Add: brief description of your change"
   ```

5. Push to your fork and open a **Pull Request** against `main`.

## Configuration Reference

All personalization happens in `src/config.js`:

- **General**: Recipient name, volume
- **Slides**: Intro, time spent, location, artist, aura, moments, puzzle, final ask, thank-you
- **Strings**: UI text in Chinese and English

No build steps are needed beyond editing the config and adding assets.

## Questions?

Open an [Issue](https://github.com/Zimmyzhuang/zimmyzhuang.github.io/issues) and we can discuss.
