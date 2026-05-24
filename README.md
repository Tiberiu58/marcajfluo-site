# MarcajFluo

Site de prezentare pentru **MarcajFluo SRL** — firmă românească specializată în aplicarea marcajelor rutiere termoplastice fluorescente.

## Despre

Site one-page construit cu HTML, CSS și JavaScript vanilla. Animațiile de scroll sunt realizate cu [GSAP](https://gsap.com/) + ScrollTrigger.

## Stack

- HTML5 semantic
- CSS3 (Custom Properties, Grid, Flexbox)
- JavaScript ES6+
- GSAP 3.12 + ScrollTrigger + ScrollToPlugin
- Google Fonts (Inter, Fraunces, JetBrains Mono)

## Rulare locală

Site-ul e static — orice server HTTP simplu este suficient:

```bash
# Python
python -m http.server 8765

# sau Node
npx serve
```

Apoi deschide [http://localhost:8765](http://localhost:8765).

## Deploy

Site-ul este pregătit pentru deploy direct pe Vercel, Netlify sau orice host static.

## Structură

```
.
├── index.html       # Toate secțiunile site-ului
├── style.css        # Stiluri globale + responsive
├── script.js        # Animații GSAP + interacțiuni
├── logo.png         # Logo MarcajFluo
└── favicon.png      # Favicon
```

## Licență

© 2026 MarcajFluo SRL. Toate drepturile rezervate.
