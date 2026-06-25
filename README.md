# SOVRANO

A single-page, static marketing site for **SOVRANO** — a print magazine for the
considered man, covering culture, style, history and dating. This is the
pre-launch landing page: its job is to communicate the positioning and capture
email signups for Issue 01.

It is **plain HTML, CSS and vanilla JS** — no build step, no framework, no
backend. The files in this repository root are exactly what gets served.

```
.
├── index.html      # the page (all markup + section structure)
├── styles.css      # all styling, design tokens at the top
├── script.js       # header scroll state + signup form handling
├── favicon.svg     # serif "S" favicon
├── CNAME           # custom domain for GitHub Pages (sovranomag.com)
├── .nojekyll       # tells GitHub Pages to serve files as-is
└── README.md
```

---

## Preview locally

No tooling is required — just open the file, or serve it for the most accurate
result (so that relative paths and the form behave like production).

**Option A — open directly:** double-click `index.html`, or:

```bash
open index.html        # macOS
xdg-open index.html    # Linux
start index.html       # Windows
```

**Option B — serve it (recommended).** Any static server works; with Python:

```bash
python3 -m http.server 8000
# then visit http://localhost:8000
```

---

## Configure before launch

Three placeholders are intentionally left for you. Each is clearly commented in
the source.

### 1. The signup form endpoint — **required for signups to work**

The form posts to a form service (Formspree, Buttondown, Mailchimp, etc.). Open
`index.html`, find:

```html
<form class="signup" action="[FORM_ENDPOINT]" method="POST" ...>
```

Replace `[FORM_ENDPOINT]` with your service's POST URL, for example:

```html
<form class="signup" action="https://formspree.io/f/abcdwxyz" method="POST" ...>
```

- The form works **without JavaScript** (a normal browser POST). `script.js`
  progressively enhances it: it validates the email, submits via `fetch`, and
  shows inline success/error messages without leaving the page.
- A hidden **honeypot** field (`company`) catches bots — leave it as is.
- Until you set a real endpoint, the form will tell visitors the list isn't
  connected yet (and log a reminder to the browser console) rather than
  pretending to send.

> **Formspree note:** the `Accept: application/json` header is already sent, so
> Formspree returns JSON and the visitor stays on the page.

### 2. The hero photograph (optional)

In `index.html`, inside the hero, find the `HERO PHOTOGRAPH PLACEHOLDER`
comment and its `<figure class="hero__media" hidden>`. To use an image:

1. Drop the file in the repo (e.g. `images/hero.jpg`).
2. Remove the `hidden` attribute from the `<figure>`.
3. Set the `<img src>` and a descriptive `alt`.

The hero is designed to look complete as type only, so this is purely additive.
Recommended: a tall, desaturated, cinematic portrait.

### 3. The Muse portfolio image (optional)

In the **Muse** section, find the `MUSE PORTFOLIO IMAGE PLACEHOLDER` comment.
A diagonally-hatched placeholder shows until you add a real image:

1. Drop the file in the repo (e.g. `images/muse-01.jpg`).
2. Remove `hidden` from `<div class="muse__frame">` and set its `<img>` src/alt.
3. Delete (or leave) the `<div class="muse__placeholder">` — once a real frame
   is shown you'll want to remove the placeholder block.

Recommended: a 4:5 portrait, cinematic and restrained.

### Also worth updating

- **Social links:** in the footer, replace `href="#"` on the Instagram and X
  links with the real profile URLs.
- **Open Graph image:** uncomment the `og:image` meta tag in `<head>` and add an
  `og-image.jpg` once you have share artwork.

---

## Deploy to GitHub Pages

**Publishing source: the repository root on the `main` branch.** (Everything is
already at the root, and `CNAME` + `.nojekyll` live there too.)

> ⚠️ I have **not** pushed anything or touched DNS. The steps below are for you
> to run.

### 1. Push the site

If this isn't yet connected to a GitHub repo:

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
4. Wait for the first deploy (a minute or two). Your site appears at
   `https://<your-username>.github.io/<your-repo>/` and, once DNS resolves, at
   your custom domain.

### 3. Custom domain — `sovranomag.com`

The `CNAME` file already contains `sovranomag.com`, so GitHub will pick up the
custom domain automatically. You still need to point DNS at GitHub **at your
registrar**:

**Apex domain (`sovranomag.com`)** — add four `A` records to GitHub's IPs:

```
A   @   185.199.108.153
A   @   185.199.109.153
A   @   185.199.110.153
A   @   185.199.111.153
```

(Optionally also add the matching `AAAA`/IPv6 records from GitHub's docs.)

**`www` subdomain** — add a `CNAME` record:

```
CNAME   www   <your-username>.github.io.
```

Then, back in **Settings → Pages**, confirm the custom domain is
`sovranomag.com` and that the DNS check passes.

### 4. Enforce HTTPS

Once GitHub finishes provisioning the TLS certificate (can take a little while
after DNS resolves), tick **Settings → Pages → Enforce HTTPS**.

---

## Deployment checklist

- [ ] Form endpoint pasted into `index.html` (`[FORM_ENDPOINT]` replaced)
- [ ] Social links updated in the footer
- [ ] Site pushed to `main`
- [ ] Settings → Pages → Source = `main` / `/ (root)`
- [ ] DNS `A` records (apex) added at registrar
- [ ] DNS `CNAME` record (`www`) added at registrar
- [ ] Custom domain shows `sovranomag.com` with a passing DNS check
- [ ] **Enforce HTTPS** ticked once the certificate provisions
- [ ] (Optional) hero / Muse images added
- [ ] (Optional) `og:image` added for social sharing

---

## Notes on craft

- **Palette** is defined as CSS custom properties at the top of `styles.css`
  (ink, oxblood, antique gold, cream, white).
- **Type:** Playfair Display (display), EB Garamond (body), Inter (small-caps
  labels), loaded via Google Fonts `<link>`.
- **Accessibility:** semantic landmarks, a skip link, visible focus states, alt
  text hooks on every image, `aria-live` form status, and full
  `prefers-reduced-motion` support.
- Restraint is the brief. When editing, prefer removing something to adding it.

© 2026 Sovrano. All rights reserved.
