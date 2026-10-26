# Portfolio: Dhruthik S Gowda

Static single-page site: `index.html`, `style.css`, `script.js`, and `assets/` (resume PDF). No build step, no dependencies.

## Preview locally
Open `index.html` in a browser, or run:
```sh
python3 -m http.server 8000   # then visit http://localhost:8000
```

## Deploy free on GitHub Pages (URL: https://dhruthik0.github.io)
```sh
cd ~/Desktop/my_proj/portfolio
git init -b main && git add . && git commit -m "Add portfolio site"
gh repo create Dhruthik0/Dhruthik0.github.io --public --source=. --remote=origin --push
```
GitHub serves a repo named `<username>.github.io` automatically, usually within a minute or two. If it doesn't, enable Pages in the repo under Settings → Pages → "Deploy from a branch" → `main` / root.

## Updating
- Content is plain HTML in `index.html`. Each section is marked with a `====` comment.
- When your resume changes, replace `assets/Dhruthik_S_Gowda_Resume.pdf` (keep the file name).
- Then commit and push.
