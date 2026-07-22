# Michael Gardanier — Personal Website

Personal website hosted at [https://michael.gardanier.dev](https://michael.gardanier.dev).

Built with **Astro** (SSG) in static output mode, rendering flat HTML, CSS, and JS assets deployed directly to AWS S3.

---

## 🚀 Local Development

### Prerequisites
- Node.js (v20+ recommended)
- npm

### Setup & Commands

```bash
# Install dependencies
npm install

# Start local development server (http://localhost:4321)
npm run dev

# Build flat static site for production (outputs to dist/)
npm run build

# Preview the production build locally
npm run preview
```

### Astro Dev Server Shortcuts
When running the development server (`npm run dev`), you can use these keyboard shortcuts in your terminal to manage it:
- **`r`** — Restarts the development server immediately (useful if newly created book files aren't showing up).
- **`c`** — Clears the terminal logs.
- **`o`** — Opens the development server URL in your browser
You can run commands to stop the server using `npx`
- `npx astro dev stop`

---

## 📝 Workflow for Adding Content or Making Changes

Follow these steps whenever you write a new book review or update site pages:

### Step 1: Create or Edit Files
1. Copy `book-template.md` to `src/content/books/` (e.g., `src/content/books/2026-my-new-book.md`).
2. Fill out the frontmatter fields (`title`, `author`, `year`, `dateRead`, `coverImage`, `amazonLink`, `rating`) and write your review notes.
3. If adding new images, place them in `public/assets/images/`.

### Step 2: Test Locally (Optional)
Run `npm run dev` and open `http://localhost:4321/books` in your browser to verify how the new content looks.

### Step 3: Stage, Commit, and Push
> ⚠️ **Important**: Always use `git add .` to ensure any newly created `.md` files or image assets are staged before committing.

```bash
# 1. Stage all changes (including new files)
git add .

# 2. Commit your changes
git commit -m "Add review for <Book Title>"

# 3. Push to GitHub
git push origin main
```

### Step 4: Automated Production Deployment
Once pushed to `main`, GitHub Actions automatically:
1. Runs `npm ci` and `npm run build`.
2. Syncs the compiled `dist/` directory to AWS S3.
3. Your changes will be live at [https://michael.gardanier.dev](https://michael.gardanier.dev) within 1-2 minutes!

---

## 📚 Book Reviews & Year Pages

Book reviews are organized into dedicated yearly pages (e.g., `/books/2025`, `/books/2026`). The main `/books` route displays the latest year's reading list directly.

### Frontmatter Schema

```markdown
---
title: "Book Title"
author: "Author Name"
year: 2026
dateRead: 2026-01-15
coverImage: "/assets/images/book_cover.jpg"
amazonLink: "https://www.amazon.com/..."
rating: 5
---

Write a short review or paragraph about your thoughts on the book.

#### Favorite Thoughts
* Key takeaway 1
* Key takeaway 2
```

---

## ⚙️ CI/CD & Deployment

Deployment to AWS S3 is fully automated using GitHub Actions ([.github/workflows/main.yml](.github/workflows/main.yml)) on every push to the `main` branch.

### CI/CD Workflow Steps
1. **Checkout Code & Node Setup**: Checks out the repository and sets up Node.js with caching.
2. **Build**: Executes `npm ci` and `npm run build` to compile the site into `dist/`.
3. **AWS Authentication**: Authenticates with AWS credentials stored in GitHub Repository Secrets:
   - `AWS_ACCESS_KEY`
   - `AWS_SECRET_ACCESS_KEY`
   - `AWS_REGION`
   - `S3_BUCKET_NAME`
4. **S3 Sync**: Syncs `dist/` directly to S3 with `--delete` (`aws s3 sync dist/ s3://${{ secrets.S3_BUCKET_NAME }}/ --delete`).
