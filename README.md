# Auntie Chelle's — website

The site for [auntiechellestallow.com](https://auntiechellestallow.com).
Plain HTML and CSS. No build step, no accounts to log into, nothing to install.
Edit a file, save, and the site updates itself in about a minute.

---

## How to change something on the site

1. Go to the repository page on GitHub.
2. Click the file you want to change (`index.html` for the home page,
   `story.html` for the My Story page).
3. Click the **pencil icon** (✏️) in the top right.
4. Make your change.
5. Scroll to the bottom, click the green **Commit changes** button.

Wait about a minute and refresh the site. That's it.

**If something looks wrong,** go to the repository, click **Commits**, find your
change, and click **Revert**. That puts everything back the way it was.

---

## Where to find the common things

| What you want to change | File | Look for |
|---|---|---|
| A price | `index.html` | `product-card__price` |
| A "Buy" link | `index.html` | `square.link` |
| The green bar at the very top | `index.html`, `story.html` | `class="announce"` |
| Michelle's story text | `story.html` | `class="story-body"` |
| The email address | both files | `michelle@auntiechellestallow.com` |
| The Instagram link | both files | `instagram.com` |
| The mailing list button | `index.html` | `customer-programs` |

Each section of the page has a comment above it in CAPITALS explaining what it
is — those are notes for humans and never show up on the website.

### Changing a price

Find the line that looks like this and change `$40`:

```html
<span class="product-card__price">$40</span>
```

### Changing text

Anything sitting between `>` and `<` is text that shows on the page. In this line:

```html
<h2 class="feature__title">Rendered by hand</h2>
```

`Rendered by hand` is the part you can safely change. Leave the pointy brackets alone.

---

## Adding a photo

1. Make the photo smaller first — phone photos are far too big for a website.
   Anything over about 400KB will make the site slow. On a Mac you can open the
   photo in Preview → Tools → Adjust Size, set the width to 1200 pixels, and save.
2. In the repository, open the `images` folder and click **Add file → Upload files**.
3. Then edit `index.html` and point a line at your new file.

To add a photo to the sliding gallery, copy one of these lines in `index.html`
and change the filename and the caption:

```html
<div class="gallery__slide" style="background-image:url('images/YOUR-PHOTO.jpg')" data-caption="Your caption here" role="group" aria-label="Your caption here"></div>
```

The dots underneath the gallery add themselves automatically — you don't need to
touch anything else.

---

## What each file does

| File | What it is |
|---|---|
| `index.html` | The home page |
| `story.html` | The My Story page |
| `styles.css` | All the colours, fonts and spacing |
| `site.js` | The phone menu and the photo slider. Nothing else. |
| `images/` | Every photo on the site |
| `CNAME` | Tells GitHub the site lives at auntiechellestallow.com. Don't delete this. |
| `.nojekyll` | Stops GitHub trying to be clever with the files. Don't delete this. |

### Changing colours

All the colours live at the top of `styles.css` in the `:root` block. Changing
one there changes it everywhere on the site. For example, `--rosemary-700` is
the main green used for headings and buttons.

---

## Notes for whoever maintains this next

- Built from a Claude Design canvas export. The original export (with the
  `.dc.html` artboards and the `_ds/` design system) is kept outside this repo.
- The design tokens in `styles.css` `:root` came from that design system's
  `tokens/colors.css` — worth keeping in sync if the brand system changes.
- Fonts are Google Fonts (Kaushan Script, Dancing Script, Cormorant Garamond,
  Karla), loaded via `@import` at the top of `styles.css`. They are the closest
  matches to the label artwork; no original font files were supplied.
- Icons are inlined as an SVG sprite at the top of each HTML file. They were
  Lucide 0.454.0. There is no icon CDN dependency any more.
- Images were resized and re-encoded from the export's `assets/` folder
  (19MB → ~3MB). The originals are outside this repo.
- Checkout is handled entirely by Square Checkout links — there is no cart,
  no payment code, and no customer data on this site.
