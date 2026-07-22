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

---

## 📚 Book Reviews & Year Pages

Book reviews are organized into dedicated yearly pages (e.g. `/books/2025`, `/books/2026`). The main `/books` route automatically redirects to the latest year page.

### Adding New Book Reviews

To add a new book review, create a Markdown file in `src/content/books/` (e.g. `src/content/books/2026-book-title.md`):

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

Astro automatically generates dedicated routes (`/books/<year>`) with tabbed year navigation pills for switching between years.

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