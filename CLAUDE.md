# CLAUDE.md

Guidance for Claude Code working in this repo.

## What this is

The website for Auntie Chelle's, a one-person small-batch skincare business in
Asheville, NC. Two pages, two products, and two outbound Square Checkout links.
There is no cart, no payment code, no backend, and no customer data anywhere on
this site — Square handles all of it.

Plain HTML, CSS and one small JavaScript file. Served straight off GitHub Pages
from `main`. Nothing is compiled, bundled, minified or generated.

## The one hard rule: no build step

**Never introduce npm, a bundler, a static site generator, a framework, or a
GitHub Actions build.** Not to "clean things up", not to add a nice-to-have, not
because a change would be tidier with one.

This is a product decision, not a stylistic one. The business owner maintains
this site herself through GitHub's web pencil editor — she opens `index.html`,
changes `$40` to `$45`, and clicks Commit. A build step means the file she can
edit is no longer the file that gets served, which ends her ability to maintain
her own site. It also adds a dependency tree that will rot unattended.

If a task seems to require a build step, it is the wrong task. Say so.

## Read the README first

`README.md` is written **for the business owner**, not for developers. It is the
manual she actually uses, in plain English, and it makes specific promises about
where things live:

> | A price | `index.html` | `product-card__price` |

When you change the structure of the site, the README's tables and instructions
must stay true. A change that silently invalidates it has broken her workflow
even if the site still renders. Update the README in the same commit.

## Layout

```
index.html    home page
story.html    "My Story" page
styles.css    every style on the site; design tokens in :root at the top
site.js       phone menu + photo carousel. The only JS. Site works without it.
images/       ~3MB total, all pre-resized
CNAME         custom domain for GitHub Pages. Do not delete.
.nojekyll     stops Pages running Jekyll over the files. Do not delete.
```

## How the code is written

- **Colours and type** are CSS custom properties in `styles.css` `:root`. Change
  a colour there once, not at each use site. They came from the brand design
  system the site was built from.
- **Class names** are BEM-ish: `product-card`, `product-card__price`,
  `section-head__title`. Follow the existing pattern.
- **Icons** are an inlined SVG sprite at the top of each HTML file, referenced as
  `<svg class="icon"><use href="#i-name"/></svg>`. Originally Lucide 0.454.0.
  There is no icon CDN dependency and adding one would be a regression.
- **Fonts** are Google Fonts via a single `@import` at the top of `styles.css` —
  the one external resource the site loads.
- **JavaScript** is a single ES5-style IIFE with `"use strict"`, no libraries,
  and defensive null checks throughout so a missing element never throws. It
  progressively enhances: everything important works with JS disabled.
- **Section comments** in CAPITALS above each block are notes for the owner, and
  several tell her exactly what to edit. Keep them accurate; write one in the
  same voice for any section you add.
- **Images** are pre-resized to ~1200px wide and kept under ~550KB, ~3MB for the
  whole folder. Never commit a straight-off-the-phone photo.
- **Carousel slides** are plain `<div class="gallery__slide">` elements with a
  `data-caption`. Dots are generated from the slide count, so adding a slide in
  the HTML is the whole change.

## Deploying

Push to `main`. GitHub Pages rebuilds in about a minute. That's the entire
pipeline — there is no staging environment and no deploy workflow to run.

```
gh api repos/paulsena/auntiechelles-tallow/pages    # build + cert status
```

## Domain and HTTPS

`auntiechellestallow.com`, registered at Porkbun, with DNS also at Porkbun.

- **Apex** → four `A` records and four `AAAA` records pointing at GitHub Pages
  (`185.199.108-111.153`, `2606:50c0:8000-8003::153`).
- **`www`** → `CNAME` to `paulsena.github.io` (the account domain, no repo path).
  GitHub matches the request's `Host` header against the `CNAME` file in this
  repo to decide which site to serve, so both halves are required.
- **`MX` and `TXT`/SPF records** at the apex run email forwarding for
  `michelle@auntiechellestallow.com`. Leave them alone.
- **HTTPS** is a Let's Encrypt certificate that GitHub provisions and renews
  automatically. You cannot upload a certificate to GitHub Pages, and one from
  the registrar is unusable here. If issuance stalls, the documented fix is to
  remove and re-add the custom domain to re-queue the job.

**Never commit TLS key material.** `*.pem` and `*-ssl-bundle/` are gitignored
because this repo is public.

## Ownership

The repo currently lives under a personal account but is intended to transfer to
the business owner's own GitHub account, with the domain on her registrar login
and auto-renew enabled. Prefer changes that keep the site independently
maintainable by someone non-technical — that is the whole design goal here.
