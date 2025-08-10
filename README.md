# Sheikh Fahad Shaon — Portfolio

A modern, responsive personal portfolio with light/dark mode, mobile-first navigation, smooth scrolling, project filtering, and a clean visual system. Built with plain HTML/CSS/JS, progressively enhanced with Bootstrap utilities, and organized for easy customization.

This repository was modularized and improved using AI agents to accelerate refactors and add features while keeping the code simple to understand and extend.

## Features

- Light/Dark theme with a slider toggle
  - Respects system preference by default (prefers-color-scheme)
  - User choice persisted via localStorage
- Mobile navigation with overlay and close button
- Scrollspy: highlights the active section on scroll
- Smooth anchor scrolling with fixed-navbar offset
- Project filtering (by category) with simple UI
- Modular structure: `index.html`, `styles.css`, `script.js`
- Progressive Bootstrap 5 utilities for spacing/layout (optional)

## Tech Stack

- HTML5
- CSS3 with CSS variables for theming
- Vanilla JavaScript (no build step)
- Bootstrap 5 (CDN) — optional utilities and components
- Font Awesome (CDN) — icons

## Project Structure

```
Portfolio/
├─ index.html       # Main markup (sections, nav, content)
├─ styles.css       # Theme variables, layout, components
├─ script.js        # Nav, scrollspy, filters, theme toggle
├─ ProfilePhoto.png # Profile image (example)
├─ SheikhFahadShaonRUET.pdf # Resume (example)
└─ README.md
```

## How this was implemented using AI Agents

An AI coding assistant was used to:
- Extract inline CSS/JS into dedicated files and clean up structure
- Add a robust scrollspy and later optimize to a requestAnimationFrame-driven approach
- Implement light/dark theme with CSS variables, system detection, and persisted override
- Build a slider-style theme toggle with sun/moon icons
- Improve mobile UX with an overlay and a dedicated close button
- Introduce Bootstrap utilities for cleaner spacing and layout options
- Polish visual contrast in light mode (cards, inputs, borders)

The agent performed edits, verified the results, and iterated on feedback while keeping the code base simple.

## Getting Started

No build tools required. You can open the site locally in any browser.

1) Clone the repository

```bash
git clone https://github.com/<your-username>/<your-repo>.git
cd <your-repo>
```

2) Open locally

- Double-click `index.html` or
- Serve with a lightweight server (optional):

```bash
# Python 3
python3 -m http.server 5173
# then visit http://localhost:5173
```

## Customizing Your Portfolio

- Content: edit `index.html`
  - Update your name, summary, social links, and sections (About, Skills, Projects, Education, Contact)
  - Replace `ProfilePhoto.png` and your resume file if desired
- Appearance: edit `styles.css`
  - Theme variables live at the top (colors, surfaces, borders, chips, inputs)
  - Component styles (cards, tags, buttons) adapt to light/dark via CSS variables
- Behavior: edit `script.js`
  - Theme toggle and system detection
  - Scrollspy and smooth scrolling
  - Project filtering logic
  - Mobile menu open/close and overlay behavior

### Add or Edit Projects
- In `index.html`, duplicate a `.project-card` under `#projects` and set `data-category` (e.g., `web`, `backend`, `scraper`, `java`)
- Update title, description, tags, and links

### Adjust Theme Colors
- In `styles.css`, tweak variables under `:root[data-theme="light"]` and `:root[data-theme="dark"]`
- Keep contrast high in light mode by adjusting `--divider-color`, `--card-bg`, `--input-bg`, and `--input-border`

### Use More Bootstrap
The site already includes Bootstrap CSS (CDN). You can progressively add:
- Layout: `container`, `row`, `col`, and `g-*` utilities
- Spacing: `pt-*`, `pb-*`, `my-*` for consistent rhythm
- Components: cards, navbars, badges — while keeping your custom theme

## Deploying to GitHub Pages

1) Push your repository to GitHub
2) In your GitHub repo: Settings → Pages
3) Source: Deploy from a branch → `main` branch → `/ (root)`
4) Save; your site will build and a URL will appear (e.g., `https://<username>.github.io/<repo>/`)

## Make It Your Own (Template Guide)

- Fork this repository (or use it as a template)
- Replace personal assets (photo, resume), socials, and texts
- Edit projects and categories to reflect your work
- Commit and push, then enable GitHub Pages

## Notes & Tips

- Keep images optimized (use `.webp` where possible)
- Be mindful of alt text for accessibility
- Test both themes; ensure contrast in light mode
- Validate anchor links and section IDs for smooth scroll and scrollspy

## License

This project is provided as-is for personal portfolio use. You may reuse and modify it for your own site. If you publish a derivative, a reference back is appreciated but not required.
