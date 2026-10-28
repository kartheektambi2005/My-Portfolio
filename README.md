# Kartheek Tambi — Developer Portfolio

A static, responsive portfolio built with **HTML5, CSS3, Bootstrap 5 and vanilla JavaScript**.
It has no build step, backend, database or external APIs.

```
MyPortfolio/
├── index.html          Page structure (sections, navbar, footer)
├── css/style.css       Visual identity (dark theme, layout, animations)
├── js/config.js        Your details: quote, profile photo, contact links, skills
├── js/projects.js      Your projects (the cards are rendered from this array)
├── js/main.js          Rendering, filtering, navigation behaviour
└── assets/             Profile photo and project thumbnails
```

Scripts load in this order: `config.js` → `projects.js` → Bootstrap → `main.js`, so the data is ready before anything is rendered.

## Run it locally

Open `index.html` in a browser by double-clicking it. That works because nothing is fetched at runtime.

To serve it like a real website, run this from the project folder:

```bash
python -m http.server 8000
```

Then open http://localhost:8000.

## Replace images

| File | Used for | Suggested size |
|------|----------|----------------|
| `assets/profile.jpg` | Profile photo (shown in a circle) | Square, at least 400×400 |
| `assets/shophub.jpg` | ShopHub card | 1280×720 (16:9) |
| `assets/villa.jpg` | Villa Website card | 1280×720 |
| `assets/github-agent.jpg` | GitHub Agent card | 1280×720 |
| `assets/donark-ai.jpg` | Donark AI card | 1280×720 |

The current images are generated placeholders. Overwrite them with real screenshots that use the same file names.

- **Profile photo:** save your photo as `assets/profile.jpg`, or point `profileImage` in `js/config.js` at a different file. Crop it to a square around your face for the best result. If you use a tall photo, adjust `profileImagePosition` (for example `"50% 30%"`) to choose which part shows in the circle. If the file is missing, a "KT" monogram is shown.
- **Project images:** if an image is missing or fails to load, the card shows a styled monogram instead.

## Update contact details and skills

Edit `js/config.js`:

```js
contact: {
  email: "kartheektambi2@gmail.com",
  phone: "+91-9182490868",          // used for tel: and WhatsApp links
  github: "https://github.com/kartheektambi2005",
  linkedin: "https://www.linkedin.com/in/kartheektambi",
  showWhatsApp: true
}
```

Skills are listed in `skillGroups` in the same file. Add or remove strings, or add a whole new group.

## Add a new project

1. Put a screenshot in `assets/`, for example `assets/my-app.jpg`.
2. Add one object to the array in `js/projects.js`:

```js
{
  title: "My App",
  description: "One or two sentences about what it does.",
  technologies: ["Python", "FastAPI"],
  image: "assets/my-app.jpg",
  githubUrl: "https://github.com/kartheektambi2005/my-app",
  liveDemoUrl: "",          // leave empty to hide the Live Demo button
  featured: false           // true = badge + shown first
}
```

3. Reload the page. The card and any new technology filter buttons appear automatically.

> Note: this list is maintained by hand. Pushing a new repository to GitHub does **not** add it here automatically. You add the object yourself.

## Deploy with GitHub Pages

1. Create a repository, for example `portfolio`, and push these files to the root of the `main` branch:

   ```bash
   git init
   ```

   ```bash
   git add .
   ```

   ```bash
   git commit -m "Initial portfolio"
   ```

   ```bash
   git branch -M main
   ```

   ```bash
   git remote add origin https://github.com/kartheektambi2005/portfolio.git
   ```

   ```bash
   git push -u origin main
   ```

2. On GitHub, open **Settings → Pages**.
3. Under **Build and deployment**, choose **Deploy from a branch**, then select `main` and `/ (root)`, then **Save**.
4. After a minute or two, the site is live at `https://kartheektambi2005.github.io/portfolio/`.

   To serve it at `https://kartheektambi2005.github.io/` instead, name the repository `kartheektambi2005.github.io`.

All paths are relative, so the site works from a subfolder without changes. File names are case-sensitive on GitHub Pages, so `Profile.JPG` and `profile.jpg` are different files.
