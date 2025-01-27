class MarkdownLoader {
    constructor() {
        this.blogPostsContainer = document.getElementById('blog-posts');
        this.postsDirectory = '../posts/'; // Directory where markdown files are stored
        this.debug = false; // Enable debug logging
    }

    log(message, error = false) {
        if (this.debug) {
            if (error) {
                console.error('MarkdownLoader:', message);
            } else {
                console.log('MarkdownLoader:', message);
            }
        }
    }

    // Load a single markdown file
    async loadMarkdownFile(filename) {
        try {
            this.log(`Attempting to load ${this.postsDirectory}${filename}`);
            const response = await fetch(this.postsDirectory + filename);

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const markdownContent = await response.text();
            this.log(`Successfully loaded ${filename}, content length: ${markdownContent.length}`);

            if (typeof marked === 'undefined') {
                throw new Error('marked library not loaded');
            }

            const htmlContent = marked.parse(markdownContent);
            this.log(`Successfully parsed markdown for ${filename}`);
            return htmlContent;
        } catch (error) {
            this.log(`Error loading markdown file ${filename}: ${error.message}`, true);
            return `<p>Error loading content: ${error.message}</p>`;
        }
    }

    // Load multiple markdown files and render them
    async loadBlogPosts(postFilenames) {
        this.log('Starting to load blog posts');
        this.log(`Files to load: ${postFilenames.join(', ')}`);

        this.blogPostsContainer.innerHTML = ''; // Clear existing content

        for (const filename of postFilenames) {
            const articleElement = document.createElement('article');
            articleElement.className = 'blog-post';

            // Show loading state
            articleElement.innerHTML = '<p>Loading...</p>';
            this.blogPostsContainer.appendChild(articleElement);

            // Load and render the content
            const htmlContent = await this.loadMarkdownFile(filename);
            articleElement.innerHTML = htmlContent;
        }
    }

    // Initialize the loader
    init(postFilenames = ["2025_books.md"]) {
        this.log('Initializing MarkdownLoader');

        // Check if marked is already loaded
        if (typeof marked !== 'undefined') {
            this.log('Marked library already loaded');
            this.loadBlogPosts(postFilenames);
            return;
        }

        this.log('Waiting for marked library to load...');

        // If marked isn't loaded yet, wait for it
        const checkMarked = setInterval(() => {
            if (typeof marked !== 'undefined') {
                clearInterval(checkMarked);
                this.log('Marked library loaded successfully');
                this.loadBlogPosts(postFilenames);
            }
        }, 100);

        // Set a timeout to stop checking after 5 seconds
        setTimeout(() => {
            clearInterval(checkMarked);
            if (typeof marked === 'undefined') {
                this.log('Marked.js failed to load after 5 seconds', true);
                this.blogPostsContainer.innerHTML = '<p>Error: Markdown parser failed to load.</p>';
            }
        }, 5000);
    }
}

// Wait for DOM to be ready before initializing
document.addEventListener('DOMContentLoaded', async () => {
    const markdownLoader = new MarkdownLoader();
    markdownLoader.init();
});