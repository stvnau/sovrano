# SOVRANO

A single-page, static **coming-soon** site for **SOVRANO** — a print magazine
for the considered man, covering culture, style, history and dating.

It is **plain HTML and CSS** — no build step, no framework, no JavaScript, no
backend. The files in this repository root are exactly what gets served.

```
.
├── index.html      # the page (wordmark, a short note, social links)
├── styles.css      # all styling; design tokens at the top
├── favicon.svg     # serif "S" favicon
├── CNAME           # custom domain for GitHub Pages (sovranomag.com)
├── .nojekyll       # tells GitHub Pages to serve files as-is
└── README.md
```

---

## Preview locally

No tooling is required — just open the file, or serve it for the most accurate
result.

**Option A — open directly:** double-click `index.html`, or:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

**Option B — serve it.** Any static server works; with Python:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## What you may want to change

- **Social links:** the Instagram and X links point to `sovranomag`
  (`https://instagram.com/sovranomag`, `https://x.com/sovranomag`). Update the
  `href`s in `index.html` if a handle changes.
- **The note / tagline:** the short copy lives directly in `index.html`.
- **Open Graph image:** uncomment the `og:image` meta tag in `<head>` and add an
  `og-image.jpg` once you have share artwork.

---

## Deploy to GitHub Pages

**Publishing source: the repository root on the `main` branch.** (Everything is
already at the root, and `CNAME` + `.nojekyll` live there too.)

> ⚠️ Nothing has been pushed to `main`, no Pages config has been touched, and no
> DNS has been changed. The steps below are for you to run.

### 1. Push the site

```bash
# from the project directory
git remote add origin https://github.com/<your-username>/<your-repo>.git
git push -u origin main
```

(If your work currently lives on a feature branch, merge it into `main` first —
GitHub Pages will publish from `main`.)

### 2. Turn on Pages

In the repository on GitHub:

1. **Settings → Pages**
2. Under **Build and deployment → Source**, choose **Deploy from a branch**.
3. Set **Branch** to `main` and the folder to **`/ (root)`**, then **Save**.
4. Wait for the first deploy (a minute or two).

### 3. Custom domain — `sovranomag.com`

The `CNAME` file already contains `sovranomag.com`. Point DNS at GitHub **at your
registrar**:

**Apex domain (`sovranomag.com`)** — add four `A` records to GitHub's IPs:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

**`www` subdomain** — add a `CNAME` record:

```
CNAME   www   <your-username>.github.io.
```

Then, in **Settings → Pages**, confirm the custom domain is `sovranomag.com` and
that the DNS check passes.

### 4. Enforce HTTPS

Once GitHub finishes provisioning the TLS certificate, tick
**Settings → Pages → Enforce HTTPS**.

---

## Deployment checklist

- [ ] Social handles confirmed in `index.html`
- [ ] Site pushed to `main`
- [ ] Settings → Pages → Source = `main` / `/ (root)`
- [ ] DNS `A` records (apex) added at registrar
- [ ] DNS `CNAME` record (`www`) added at registrar
- [ ] Custom domain shows `sovranomag.com` with a passing DNS check
- [ ] **Enforce HTTPS** ticked once the certificate provisions
- [ ] (Optional) `og:image` added for social sharing

---

## Notes on craft

- **Palette** is defined as CSS custom properties at the top of `styles.css`
  (ink, oxblood, antique gold, cream, white).
- **Type:** Playfair Display (display) and EB Garamond (body), with Inter for
  small-caps labels — loaded via Google Fonts `<link>`.
- **Accessibility:** semantic markup, visible focus states, AA contrast, and
  `prefers-reduced-motion` support.

© 2026 Sovrano. All rights reserved.
