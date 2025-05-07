// Function to load blog posts dynamically
async function loadBlogPosts() {
    const blogGrid = document.querySelector('.blog-grid');
    if (!blogGrid) return;

    // Get all HTML files in the blog/posts directory
    const response = await fetch('/blog/posts/');
    const text = await response.text();
    
    // Extract blog post filenames from the directory listing
    const filenames = text.match(/href="(.*\.html)"/g)
        .map(match => match.replace('href="', '').replace('"', ''))
        .filter(file => {
            // Ignore index.html and any files in the templates directory
            return file !== 'index.html' && !file.includes('templates');
        });

    // Fetch and parse each blog post
    const posts = await Promise.all(filenames.map(async filename => {
        // Update path for GitHub Pages
        const response = await fetch(`/portfolio_windsurf/blog/posts/${filename}`);
        const text = await response.text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(text, 'text/html');
        
        // Extract post information
        const title = doc.querySelector('.post-info h1').textContent;
        const meta = doc.querySelector('.post-info .meta').textContent;
        const excerpt = doc.querySelector('.content p').textContent;
        
        return {
            title,
            meta,
            excerpt,
            filename
        };
    }));

    // Sort posts by date (assuming date is in the meta string)
    posts.sort((a, b) => {
        const dateA = new Date(a.meta.split(' - ')[0]);
        const dateB = new Date(b.meta.split(' - ')[0]);
        return dateB - dateA; // Newest first
    });

    // Create blog post cards
    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'blog-post';
        
        // Try to get the header image from the blog post
        const doc = new DOMParser().parseFromString(text, 'text/html');
        const headerImage = doc.querySelector('.hero-image');
        const imageUrl = headerImage ? headerImage.style.backgroundImage.replace(/url\(['"]?(.*?)['"]?\)/, '$1') : null;

        // Create different layouts based on the current layout
        const layout = localStorage.getItem('blogLayout') || 'grid';
        
        if (layout === 'grid') {
            postElement.innerHTML = `
                <a href="/portfolio_windsurf/blog/posts/${post.filename}" class="post-link">
                    <div class="post-content">
                        <h3>${post.title}</h3>
                        <p class="meta">${post.meta}</p>
                        <p class="excerpt">${post.excerpt}</p>
                    </div>
                </a>
            `;
        } else if (layout === 'card') {
            postElement.innerHTML = `
                <a href="/portfolio_windsurf/blog/posts/${post.filename}" class="post-link">
                    <div class="post-image" style="background-image: url('${imageUrl}')"></div>
                    <div class="post-content">
                        <h3>${post.title}</h3>
                        <p class="meta">${post.meta}</p>
                        <p class="excerpt">${post.excerpt}</p>
                    </div>
                </a>
            `;
        } else if (layout === 'list') {
            postElement.innerHTML = `
                <a href="/portfolio_windsurf/blog/posts/${post.filename}" class="post-link">
                    <div class="post-content">
                        <div class="post-image" style="background-image: url('${imageUrl}')"></div>
                        <h3>${post.title}</h3>
                        <p class="meta">${post.meta}</p>
                        <p class="excerpt">${post.excerpt}</p>
                    </div>
                </a>
            `;
        }
        
        blogGrid.appendChild(postElement);
    });

    // Apply the current layout
    const currentLayout = localStorage.getItem('blogLayout') || 'grid';
    switchLayout(currentLayout);
}

// Function to switch layouts
function switchLayout(layout) {
    const blogGrid = document.querySelector('.blog-grid');
    const layoutButtons = document.querySelectorAll('.layout-button');
    
    // Remove all layout classes
    blogGrid.classList.remove('grid-layout', 'card-layout', 'list-layout');
    blogGrid.classList.add(`${layout}-layout`);
    
    // Update button states
    layoutButtons.forEach(button => {
        button.classList.remove('active');
        if (button.dataset.layout === layout) {
            button.classList.add('active');
        }
    });
    
    // Save the layout preference
    localStorage.setItem('blogLayout', layout);
}

// Add event listeners for layout buttons
document.addEventListener('DOMContentLoaded', () => {
    const layoutButtons = document.querySelectorAll('.layout-button');
    layoutButtons.forEach(button => {
        button.addEventListener('click', () => {
            switchLayout(button.dataset.layout);
        });
    });
    
    // Load blog posts
    loadBlogPosts();
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Add scroll-based animations
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

document.querySelectorAll('.blog-post').forEach(post => {
    observer.observe(post);
});

// Add scroll-based header effect
window.addEventListener('scroll', () => {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    } else {
        nav.style.background = 'rgba(255, 255, 255, 0.95)';
    }
});
