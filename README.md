# Easter Chick Maze 🐥

A kid-friendly maths maze game, made for my kid. Drag the chick through
the maze to the egg with the right answer — or hop one square at a time
with arrow keys / WASD.

Play it live at https://ymll.github.io/maze-game

## How to play

- A maths question is shown at the top, e.g. `7 + 5 = ?`
- Two eggs sit in corners of the maze, each with a number on it.
- Drag the chick 🐥 through the maze to the egg with the **right** answer.
  Start dragging by touching the chick itself. Or use **arrow keys / WASD**
  to move one square at a time — walls block you, just like when dragging.
- Reach the wrong egg and you go back to the start. Hit a wall (with the
  Walls toggle on) and you go back to the start too — a big note pops up
  to explain what happened and that turning Walls off helps. Turn Walls
  off for an easier game: touching a wall no longer sends you back, and
  the chick follows your finger through the corridors — but if your finger
  crosses a wall, the chick stops and waits instead of walking the long
  way round. Arrow keys never cross a wall either way — with Walls
  off they just stop at the wall.
- Themes: pick Easter, Christmas, Halloween or Fall from the Theme row.
  Each theme changes the player, the target (egg / gift / pumpkin /
  apple), the colours and the wording. Your choice is saved in your
  browser. The target colours are randomised every round in every theme.
- Each level you complete is +10 points and the maze gets bigger.
- Levels 1–2 are addition. From level 3, subtraction is mixed in.
- Your furthest level is saved in your browser (localStorage), so you can
  come back and carry on. There is no account and nothing is sent anywhere.

The egg colours are randomised every round — colour never tells you which
egg is right, you have to do the maths.

## Run it locally

No build step, no dependencies to install. It is a single `index.html`
(with Tailwind via CDN and the Fredoka font from Google Fonts):

```sh
python3 -m http.server 8000
# then open http://localhost:8000/
```

## Files

| File | What it is |
| --- | --- |
| `index.html` | The whole game: HTML, CSS and JavaScript in one file |
| `manifest.json` | Web app manifest for Add to Home Screen / install |
| `sw.js` | Service worker — caches the app shell so the game works offline after one visit |

## PWA / install

- **iOS / iPadOS:** after about 2 seconds a footer slides up saying
  *Tap Share → Add to Home Screen*. There is no programmatic install on
  iOS, so the Install button is hidden there.
- **Android / Chrome:** the footer appears when the browser offers its
  install prompt, and Install triggers it directly (no pop-up alerts).

Known limitation: there are no PNG app icons in this repo yet, so
`manifest.json` has no `icons` entry. Android's install prompt needs a
192px (and ideally 512px) PNG icon to fire reliably — until someone adds
`icons/icon-192.png` and `icons/icon-512.png` and lists them in the
manifest, the Android footer may not appear. iOS Add to Home Screen is
unaffected. The old manifest listed those icon files (and screenshots)
that never existed, and was itself invalid JSON — that is fixed here by
removing the broken references rather than inventing files.
