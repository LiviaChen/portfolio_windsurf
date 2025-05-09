// Function to load blog posts dynamically
async function loadBlogPosts() {
    try {
        const blogGrid = document.querySelector('.blog-grid');
        if (!blogGrid) {
            console.error('Blog grid container not found');
            return;
        }

        // Clear existing posts
        blogGrid.innerHTML = '';

        // List of blog posts (we need to manually specify them for GitHub Pages)
        const blogPosts = [
            {
                filename: 'my-tech-journey.html',
                title: 'My Tech Journey',
                meta: 'Posted on May 6, 2025 - Tech',
                excerpt: 'My journey into the world of technology began when I first started exploring programming...',
                imageUrl: '/portfolio_windsurf/images/tech-header.jpg'
            },
            {
                filename: 'life-in-japan.html',
                title: 'Life in Japan',
                meta: 'Posted on May 15, 2025 - Life',
                excerpt: 'My journey in Japan has been a fascinating blend of ancient traditions and modern innovations...',
                imageUrl: '/portfolio_windsurf/images/japan-header.jpg'
            },
            {
                filename: 'ml-workthrough.html',
                title: 'ML Workthrough',
                meta: 'Posted on May 7, 2025 - Machine Learning',
                excerpt: 'A comprehensive guide to machine learning concepts and practical implementations...',
                imageUrl: '/portfolio_windsurf/images/ml-header.jpg'
            },
            {
                filename: 'how-public-speaking-shape-me.html',
                title: 'How Public Speaking Shape Me',
                meta: 'Posted on May 15, 2025 - Life',
                excerpt: 'Actually what I am trying to say is ToastMaster journey...',
                //imageUrl: '/portfolio_windsurf/images/toastmaster-header.jpg'
            }
        ];

        // Sort posts by date (extracted from meta string)
        blogPosts.sort((a, b) => {
            const dateA = new Date(a.meta.split(' - ')[0]);
            const dateB = new Date(b.meta.split(' - ')[0]);
            return dateB - dateA; // Newest first
        });

        // Create blog post cards
        blogPosts.forEach(post => {
            const postElement = document.createElement('div');
            postElement.className = 'blog-post';

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
                        <div class="post-image" style="background-image: url('${post.imageUrl}')"></div>
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
                            <div class="post-image" style="background-image: url('${post.imageUrl}')"></div>
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
    } catch (error) {
        console.error('Error loading blog posts:', error);
    }
}

// Initialize blog posts when the page loads
document.addEventListener('DOMContentLoaded', () => {
    loadBlogPosts();
});

// Initialize blog posts when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPosts);

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
